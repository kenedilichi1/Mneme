/**
 * Filename helpers shared by the upload flow and the EPUB preview extractor,
 * which each carried their own copy of `getExtension`.
 */

export function getExtension(path: string): string {
  const name = path.split("/").pop() ?? path;
  const extensionIndex = name.lastIndexOf(".");
  return extensionIndex === -1
    ? ""
    : name.slice(extensionIndex + 1).toLowerCase();
}

/**
 * Turns `some_book -- author, 2019.epub` into `some book`. The ` -- ` marker is
 * the separator used by a few common ebook sources.
 */
export function extractBookTitle(fileName: string): string {
  const nameWithoutExtension = fileName.replace(/\.[^/.]+$/, "");
  const metadataSeparatorIndex = nameWithoutExtension.indexOf(" -- ");
  const title =
    metadataSeparatorIndex === -1
      ? nameWithoutExtension
      : nameWithoutExtension.slice(0, metadataSeparatorIndex);

  return title.replace(/[_-]+/g, " ").replace(/\s+/g, " ").trim();
}

export function formatFileSize(bytes: number): string {
  if (!bytes || bytes < 0) return "Unknown size";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

const DOCUMENT_LABELS: Record<string, string> = {
  pdf: "PDF",
  epub: "EPUB",
  mobi: "MOBI",
};

/** `PDF` / `EPUB` / `MOBI`, falling back to a generic label. */
export function documentLabel(fileName: string): string {
  return DOCUMENT_LABELS[getExtension(fileName)] ?? "Document";
}
