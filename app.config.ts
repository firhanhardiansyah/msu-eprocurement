export default defineAppConfig({
  ui: {
    primary: "amber",
    gray: "neutral",
    card: {
      header: {
        padding: "p-4",
      },
      footer: {
        base: "bg-gray-100 rounded-b-lg",
      },
      ring: "",
      divide: "divide-y divide-gray-100 dark:divide-gray-800",
    },
    checkbox: {
      base: "dark:checked:bg-primary-700",
    },
    notifications: {
      // Show toasts at the top right of the screen
      position: "top-0 bottom-[unset]",
    },

    input: {
      default: {
        size: "lg",
      },
    },
    select: {
      default: {
        size: "lg",
      },
    },
    selectMenu: {
      default: {
        size: "lg",
      },
    },
  },

  site: {
    name: "MSU eCatalog",
    description: "~",
    ogImage: "",
  },
});
