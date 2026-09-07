import { Category, MediaItem } from "../types/library.type";


// 2. Data Feed
export const MEDIA_DATA: MediaItem[] = [
  { id: '1', title: 'Designing Data-Intensive Apps', type: 'Book', category: 'Books', metadata: 'Book', statusText: '42%' },
  { id: '2', title: 'Distributed Systems Lecture 3', type: 'Audio', category: 'Audio', metadata: 'Audio · 1h 24m', statusText: '21%' },
  { id: '3', title: 'System Design Crash Course', type: 'Video', category: 'Videos', metadata: 'Video · 18:42', statusText: 'Watched', isCompleted: true },
  { id: '4', title: 'Thoughts on replication', type: 'Note', category: 'Notes', metadata: 'Note · today', statusText: '2 min', isCompleted: true },
  { id: '5', title: 'System Design Interview', type: 'Book', category: 'Books', metadata: 'Book', statusText: '18%' },
];

export const CATEGORIES: Category[] = ['All', 'Books', 'Audio', 'Videos', 'Notes'];
