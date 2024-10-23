<script setup lang="ts">
const route = useRoute();
const moveType = route.params.type;

const isFastMoving = ref(moveType === "fast-moving");
const isSlowMoving = ref(moveType === "slow-moving");
const isDeadStock = ref(moveType === "dead-stock");
</script>

<template>
  <div>
    <template v-if="isFastMoving">
      <UCard
        :ui="{
          background: 'bg-green-400 ',
          body: {
            padding: 'sm:p-0',
          },
        }"
      >
        <div class="flex justify-between items-start w-full gap-10">
          <!-- Description -->
          <article
            class="prose prose-h1:text-green-900 prose:text-green-950 dark:prose-headings:text-green-400 dark:text-green-400 sm:p-4 lg:p-6 lg:pt-10"
          >
            <h1 class="text-2xl lg:text-4xl">
              Top Picks: Fast-Selling Products
            </h1>
            <p>
              Explore our most popular products that sell out in days. Get the
              best items loved by customers before they're gone!
            </p>
          </article>

          <!-- Image -->
          <NuxtImg
            src="/images/illustration/undraw_logistics_x-4-dc.svg"
            class="hidden md:flex md:w-56 lg:w-96"
          />
        </div>
      </UCard>
    </template>

    <!-- Slow Mov -->
    <template v-if="isSlowMoving">
      <UCard
        :ui="{
          background: 'bg-yellow-500',
          body: {
            padding: 'sm:p-0',
          },
        }"
      >
        <div class="flex justify-between items-center w-full gap-4">
          <!-- Description -->
          <article
            class="prose prose-h1:text-yellow-900 prose:text-yellow-950 dark:prose-invert dark:prose-headings:text-primary-400 dark:text-primary-400 sm:p-4 md:p-6"
          >
            <h1 class="text-2xl lg:text-4xl">
              Slow Movers: Quality That Lasts
            </h1>
            <p>
              Good things take time, and these products are no exception. Browse
              through our slow-moving items that deliver quality and reliability
              for the long run
            </p>
          </article>

          <!-- Image -->
          <NuxtImg
            src="/images/illustration/undraw_delivery_truck_vt6p.svg"
            class="hidden md:flex md:w-64 lg:w-4/12 lg:pt-6"
          />
        </div>
      </UCard>
    </template>

    <!-- Dead Stock -->
    <template v-if="isDeadStock">
      <UCard
        :ui="{
          background: 'bg-red-300',
          body: {
            padding: 'sm:p-0',
          },
        }"
      >
        <div class="flex justify-between items-center w-full gap-4">
          <!-- Description -->
          <article
            class="prose prose-h1:text-red-900 prose:text-red-950 dark:prose-invert dark:prose-headings:text-red-400 dark:text-red-300 sm:p-4 md:p-6"
          >
            <h1 class="text-2xl lg:text-4xl">
              Last Chance: Dead Stock Clearance
            </h1>
            <p>
              These products are going fast! Our dead stock clearance offers
              amazing discounts on items that are no longer being replenished.
              Get them before they're gone for good
            </p>
          </article>

          <!-- Image -->
          <NuxtImg
            src="/images/illustration/undraw_heavy_box.svg"
            class="hidden md:flex md:w-64 lg:w-4/12 lg:pt-6"
          />
        </div>
      </UCard>
    </template>
  </div>
</template>
