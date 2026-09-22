import type { Category, MediaItem } from "../types/library.type";

export const MEDIA_DATA: readonly MediaItem[] = [
  {
    id: "1",
    title: "Designing Data-Intensive Apps",
    type: "Book",
    metadata: "Book",
    statusText: "42%",
  },
  {
    id: "2",
    title: "Distributed Systems Lecture 3",
    type: "Audio",
    metadata: "Audio · 1h 24m",
    statusText: "21%",
  },
  {
    id: "3",
    title: "System Design Crash Course",
    type: "Video",
    metadata: "Video · 18:42",
    statusText: "Watched",
    isCompleted: true,
  },
  {
    id: "4",
    title: "Thoughts on replication",
    type: "Note",
    metadata: "Note · today",
    statusText: "2 min",
    isCompleted: true,
  },
  {
    id: "5",
    title: "System Design Interview",
    type: "Book",
    metadata: "Book",
    statusText: "18%",
  },
];

export const CATEGORIES: readonly Category[] = [
  "All",
  "Books",
  "Audio",
  "Videos",
  "Notes",
];

export const RECENT_FILES = [
  { name: "kafka-definitive-guide.pdf", location: "On this device" },
  { name: "sre-book-google.epub", location: "iCloud Drive" },
] as const;
