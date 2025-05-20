// types/event.ts
export interface Event {
  id: number;
  organization_id: number;
  title: string;
  description: string | null;
  venue: string;
  date: string;
  price: string;
  max_attendees: number;
  status: 'draft' | 'published' | 'cancelled';
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}