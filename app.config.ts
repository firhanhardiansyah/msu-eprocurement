export default defineAppConfig({
  ui: {
    primary: "amber",
    gray: "neutral",
    card: {
      header: {
        padding: "p-4",
      },
      body: { base: "" },
      ring: "",
      divide: "divide-y divide-gray-100 dark:divide-gray-800",
    },
    checkbox: {
      base: "dark:checked:bg-primary-700",
    },
  },

  site: {
    name: "MSU eCatalog",
    description: "~",
    ogImage: "",
  },
});
