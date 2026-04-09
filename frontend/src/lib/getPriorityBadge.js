export function getPriorityBadge(priority) {
  if (priority === "high") return "badge-error";
  if (priority === "medium") return "badge-warning";
  return "badge-success";
}
