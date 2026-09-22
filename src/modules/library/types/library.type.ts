/** Tab values, including the `All` pseudo-filter. */
export type Category = "All" | "Books" | "Audio" | "Videos" | "Notes";

/**
 * The category an item can actually belong to. `All` is a filter, never a
 * property of an item — `MediaItem.category` used to accept it.
 */
export type ItemCategory = Exclude<Category, "All">;

export type MediaType = "Book" | "Audio" | "Video" | "Note";

export type MediaItem = {
  readonly id: string;
  readonly title: string;
  readonly type: MediaType;
  readonly metadata: string;
  readonly statusText: string;
  readonly isCompleted?: boolean;
};

/**
 * Single source of truth for the type/category pairing. These used to be two
 * independent fields on every item (`'Book'` + `'Books'`), free to disagree.
 */
const CATEGORY_BY_TYPE: Record<MediaType, ItemCategory> = {
  Book: "Books",
  Audio: "Audio",
  Video: "Videos",
  Note: "Notes",
};

export function categoryOf(item: MediaItem): ItemCategory {
  return CATEGORY_BY_TYPE[item.type];
}
