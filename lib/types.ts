export type Priority = "URGENT" | "HIGH" | "MEDIUM" | "LOW";
export type Task = { id: string; title: string; priority: Priority; dueDate?: string; labels: { name: string; color: string }[]; assignees: { initials: string; color: string }[]; checklist: [number, number]; comments: number; };
export type BoardColumn = { id: string; name: string; tasks: Task[] };
