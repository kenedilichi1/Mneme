export type Category = 'All' | 'Books' | 'Audio' | 'Videos' | 'Notes';

export type MediaItem = {
  id: string;
  title: string;
  type: 'Book' | 'Audio' | 'Video' | 'Note';
  category: Category; // Maps item to tab selection
  metadata: string;
  statusText: string;
  isCompleted?: boolean;
}