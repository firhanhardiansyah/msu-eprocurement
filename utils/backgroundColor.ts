export function getBackgroundColor(index: number): string {
  const colors = [
    "bg-rose-500 dark:bg-rose-500",
    "bg-orange-500 dark:bg-orange-500",
    "bg-amber-500 dark:bg-amber-500",
    "bg-lime-500 dark:bg-lime-500",
    "bg-teal-500 dark:bg-teal-500",
    "bg-sky-500 dark:bg-sky-500",
    "bg-blue-500 dark:bg-blue-500",
    "bg-purple-500 dark:bg-purple-500",
    "bg-pink-500 dark:bg-pink-500",
    "bg-green-500 dark:bg-green-500",
    "bg-red-500 dark:bg-red-500",
  ];

  return colors[index];
}
