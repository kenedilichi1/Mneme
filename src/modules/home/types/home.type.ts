import type { ComponentProps } from "react";
import type Ionicons from "@expo/vector-icons/Ionicons";

export type LibraryCategory = {
  readonly categoryName: string;
  readonly icon: ComponentProps<typeof Ionicons>["name"];
  readonly totalItems: number;
};
