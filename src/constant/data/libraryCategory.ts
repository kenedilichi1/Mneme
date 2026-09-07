import Ionicons from "@expo/vector-icons/Ionicons";
import type { ComponentProps } from "react";

type LibraryCategory = {
  categoryName: string;
  icon: ComponentProps<typeof Ionicons>["name"];
  totalItems: number;
};

export const libraryCategory: LibraryCategory[] = [
  {
    categoryName: "Books",
    icon: "book",
    totalItems: 42,
  },
  {
    categoryName: "Articles",
    icon: "newspaper",
    totalItems: 15,
  },
  {
    categoryName: "Videos",
    icon: "videocam",
    totalItems: 8,
  },
];
