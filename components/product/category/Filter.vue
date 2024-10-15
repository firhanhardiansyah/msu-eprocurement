<script setup lang="ts">
const { getCategories } = useCategory();

const { toCapitalCase, removeEmptyElements, getFirstElement, getLastElement } =
  useHelper();

const route = useRoute();
const slug = removeEmptyElements(route.params.slug as string[]);

const firstSlug = getFirstElement(slug);
const lastSlug = getLastElement(slug);

const {
  data: categoriesData,
  status: categoriesStatus,
  error: categoriesError,
} = await useAsyncData("categories", () => getCategories());

const categoriesLinks = computed(() => {
  return categoriesData.value?.data?.map((item) => {
    const isOpen = item.url_slug == firstSlug;

    return {
      label: item.name,
      items: item.items,
      slug: item.url_slug,
      defaultOpen: isOpen,
    };
  });
});
</script>

<template>
  <div class="relative w-full">
    <div class="sticky top-28">
      <UCard
        :ui="{
          body: {
            padding: '',
          },
        }"
        class="py-2"
      >
        <div
          class="px-3 py-2 text-base font-semibold text-gray-800 dark:text-primary"
        >
          <h1>{{ $t("general.category") }}</h1>
        </div>

        <UAccordion variant="ghost" size="md" :items="categoriesLinks">
          <template #default="{ item, open }">
            <UButton
              color="gray"
              variant="ghost"
              class="border-b border-gray-100 dark:border-zinc-800 hover:text-primary"
              :ui="{ rounded: 'rounded-none', padding: { sm: 'p-3' } }"
            >
              <span class="truncate dark:text-primary">
                {{ toCapitalCase(item.label) }}
              </span>

              <template #trailing v-if="item.items.length > 0">
                <UIcon
                  name="i-heroicons-chevron-right-20-solid"
                  class="w-5 h-5 ms-auto transform transition-transform duration-200 dark:text-primary"
                  :class="[open && 'rotate-90']"
                />
              </template>
            </UButton>
          </template>

          <!-- Accordion Item -->
          <template #item="{ item }">
            <div
              v-for="childItem in item.items"
              @click="
                navigateTo(`/category/${item.slug}/${childItem.url_slug}`)
              "
              class="cursor-pointer"
            >
              <p
                class="text-gray-900 dark:text-primary pl-6 py-2 hover:bg-gray-100 hover:text-primary dark:hover:bg-zinc-800"
                :class="[
                  childItem.url_slug == lastSlug &&
                    'bg-primary-100 text-primary dark:bg-primary dark:text-zinc-950 dark:hover:text-primary',
                ]"
              >
                {{ childItem.name }}
              </p>
            </div>
          </template>
        </UAccordion>

        <div class="px-3">
          <div
            class="py-2 text-base font-semibold text-gray-800 dark:text-primary"
          >
            <h1>Cari di kategori ini</h1>
          </div>
          <UInput
            color="gray"
            variant="outline"
            placeholder="Search..."
            icon="i-heroicons-magnifying-glass-20-solid"
            trailing
          />
        </div>
      </UCard>
    </div>
  </div>
</template>
