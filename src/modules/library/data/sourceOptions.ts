import Ionicons from "@expo/vector-icons/Ionicons";
import type { Href } from "expo-router";
import type { ComponentProps } from "react";

export type SourceOption = {
  readonly title: string;
  readonly description: string;
  readonly icon: ComponentProps<typeof Ionicons>["name"];
  /** Absent until the flow is built — the row renders as "coming soon". */
  readonly route?: Href;
};

export const SOURCE_OPTIONS: readonly SourceOption[] = [
  {
    title: "Upload book or PDF",
    description: "eBooks, documents",
    icon: "document-outline",
    route: "/library/upload",
  },
  {
    title: "Upload audio",
    description: "Lectures, podcasts, talks",
    icon: "musical-notes-outline",
  },
  {
    title: "Add video",
    description: "Upload a file or paste a link",
    icon: "play-outline",
  },
  {
    title: "Add link",
    description: "Articles, blog posts, papers",
    icon: "link-outline",
  },
  {
    title: "Record a voice note",
    description: "Capture your own thoughts",
    icon: "mic-outline",
  },
  {
    title: "Scan a document",
    description: "Use your camera",
    icon: "scan-outline",
  },
];
