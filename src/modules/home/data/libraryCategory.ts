import type { LibraryCategory } from "../types/home.type";

/**
 * Placeholder counts for the home summary. Lives in the home module because
 * that is its only consumer — it used to sit in `src/constant/data/`.
 */
export const libraryCategory: readonly LibraryCategory[] = [
  { categoryName: "Books", icon: "book", totalItems: 42 },
  { categoryName: "Articles", icon: "newspaper", totalItems: 15 },
  { categoryName: "Videos", icon: "videocam", totalItems: 8 },
];
