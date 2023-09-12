declare const elonbustUrl: string;
// declare const fancypenosiUrl: string;
// declare const transitionDuration: number;

type KanbanView = "kanbans" | "new-kanban";

interface Window {
  kanbanFocusView: (view: KanbanView) => void;
  kanbanCreate: (event: Event) => void;
}
