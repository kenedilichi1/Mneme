export function extractBookTitle(fileName: string) {
  const nameWithoutExtension = fileName.replace(/\.[^/.]+$/, "");
  const metadataSeparatorIndex = nameWithoutExtension.indexOf(" -- ");
  const title =
    metadataSeparatorIndex === -1
      ? nameWithoutExtension
      : nameWithoutExtension.slice(0, metadataSeparatorIndex);

  return title.replace(/[_-]+/g, " ").replace(/\s+/g, " ").trim();
}
