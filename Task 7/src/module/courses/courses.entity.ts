export interface Course {
  id: number;
  title: string;
  description: string;
  image?: string;
  createdAt: Date;
  updatedAt: Date;
  creatorID: string;
}
