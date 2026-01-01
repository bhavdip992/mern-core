export interface Note {
  _id: string;
  title: string;
  content: string;
  category?: string;
  completed: boolean;
  updatedAt: string;
}
