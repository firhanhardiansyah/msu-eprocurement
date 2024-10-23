export function getBackgroundColor(index: number): string {
  const colors = [
    "bg-green-500 dark:bg-green-700",
    "bg-amber-500 dark:bg-amber-700",
    "bg-sky-500 dark:bg-sky-700",
    "bg-blue-500 dark:bg-blue-700",
    "bg-indigo-500 dark:bg-indigo-700",
    "bg-violet-500 dark:bg-violet-700",
    "bg-purple-500 dark:bg-purple-700",
    "bg-fuchsia-500 dark:bg-fuchsia-700",
    "bg-pink-500 dark:bg-pink-700",
    "bg-rose-500 dark:bg-rose-700",
    "bg-teal-500 dark:bg-teal-700",
    "bg-lime-500 dark:bg-lime-700",
    "bg-red-500 dark:bg-red-700",
    "bg-orange-500 dark:bg-orange-700",
  ];

  return colors[index];
}
