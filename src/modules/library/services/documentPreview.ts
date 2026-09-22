import { Directory, File, Paths } from "expo-file-system";
import { strFromU8, unzipSync } from "fflate";

import { getExtension } from "../utils/fileName";

const previewDirectory = new Directory(Paths.cache, "mneme-previews");

export async function extractDocumentPreview(
  uri: string,
  fileName: string,
): Promise<string | null> {
  const extension = getExtension(fileName);

  if (extension !== "epub") {
    return null;
  }

  try {
    const archive = unzipSync(await new File(uri).bytes());
    const containerXml = getTextEntry(archive, "META-INF/container.xml");

    if (!containerXml) return null;

    const opfPath = getAttributeValue(containerXml, "rootfile", "full-path");
    if (!opfPath) return null;

    const opfXml = getTextEntry(archive, opfPath);
    if (!opfXml) return null;

    const coverHref = findCoverHref(opfXml);
    if (!coverHref) return null;

    const coverPath = resolvePath(getDirectory(opfPath), coverHref);
    const coverBytes = archive[coverPath];
    if (!coverBytes) return null;

    previewDirectory.create({ idempotent: true, intermediates: true });
    const coverExtension = getExtension(coverPath) || "jpg";
    const previewFile = new File(
      previewDirectory,
      `cover-${Date.now()}.${coverExtension}`,
    );
    previewFile.create({ overwrite: true });
    previewFile.write(coverBytes);

    return previewFile.uri;
  } catch {
    return null;
  }
}

function findCoverHref(opfXml: string) {
  const coverId = getMetaContent(opfXml, "cover");
  if (coverId) {
    const coverItem = findManifestItem(opfXml, coverId);
    if (coverItem) return getAttributeValue(coverItem, "item", "href");
  }

  const imageWithCoverProperty = execFirst(
    /<item\b[^>]*properties=["'][^"']*cover-image[^"']*["'][^>]*>/i,
    opfXml,
  );
  if (imageWithCoverProperty) {
    return getAttributeValueFromTag(imageWithCoverProperty[0], "href");
  }

  const firstImage = execFirst(
    /<item\b[^>]*media-type=["']image\/[^"']+["'][^>]*>/i,
    opfXml,
  );
  return firstImage ? getAttributeValueFromTag(firstImage[0], "href") : null;
}

function findManifestItem(opfXml: string, id: string) {
  const escapedId = escapeRegExp(id);
  return execFirst(
    new RegExp(String.raw`<item\b[^>]*\bid=["']${escapedId}["'][^>]*>`, "i"),
    opfXml,
  );
}

function getMetaContent(xml: string, name: string) {
  const tag = execFirst(
    new RegExp(String.raw`<meta\b[^>]*\bname=["']${name}["'][^>]*>`, "i"),
    xml,
  );
  return tag ? getAttributeValueFromTag(tag, "content") : null;
}

function getAttributeValue(
  xml: string,
  tagName: string,
  attributeName: string,
) {
  const tag = execFirst(new RegExp(String.raw`<${tagName}\b[^>]*>`, "i"), xml);
  return tag ? getAttributeValueFromTag(tag, attributeName) : null;
}

function getAttributeValueFromTag(tag: string, attributeName: string) {
  return (
    execMatch(
      new RegExp(String.raw`\b${attributeName}=["']([^"']+)["']`, "i"),
      tag,
    )?.[1] ?? null
  );
}

function execFirst(pattern: RegExp, value: string) {
  return execMatch(pattern, value)?.[0] ?? null;
}

function execMatch(pattern: RegExp, value: string) {
  return pattern.exec(value);
}

function getTextEntry(archive: Record<string, Uint8Array>, path: string) {
  const entry = archive[path];
  return entry ? strFromU8(entry) : null;
}

function getDirectory(path: string) {
  const separatorIndex = path.lastIndexOf("/");
  return separatorIndex === -1 ? "" : path.slice(0, separatorIndex);
}

function resolvePath(directory: string, href: string) {
  const decodedHref = decodeURIComponent(href.split("#")[0]);
  const parts = `${directory}/${decodedHref}`.split("/");
  const resolved: string[] = [];

  for (const part of parts) {
    if (!part || part === ".") continue;
    if (part === "..") resolved.pop();
    else resolved.push(part);
  }

  return resolved.join("/");
}

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, (match) => `\\${match}`);
}
