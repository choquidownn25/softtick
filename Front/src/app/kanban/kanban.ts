export interface Todos {
  id: number;
  title: string;
  description: string;
  class?: string;
  date?: string;
  taskProperty?: string;
  property?: string;
  imageUrl?: string;
}
export interface KanbanTask {
  id: number;
  title: string;
  description: string;
  date: string;
  taskProperty: string;
  imageUrl: string;
}
