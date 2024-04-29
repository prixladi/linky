export type LinkWithStats = {
  id: number;
  path: string;
  url: string;
  createdAt: Date;
  totalHitCount: number;
  hitRecords: { hitCount: number; date: Date }[];
};
