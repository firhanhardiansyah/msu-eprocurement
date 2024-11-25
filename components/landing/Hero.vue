<template>
  <div class="bg-amber-400 dark:bg-amber-300 h-svh">
    <UContainer class="py-16">
      <div class="flex mb-10">
        <div class="w-7/12">
          <article class="prose prose-h1:mb-4">
            <h1 class="text-6xl uppercase">
              Your Latest
              <span>Incredible Deals.</span>
            </h1>
            <p class="text-base">
              Get Your one-stop-shop deals on the latest and greatest products
              available on eCatalog.
            </p>
          </article>
        </div>
        <div class="w-5/12 bg-black"></div>
      </div>
      <UButton
        label="Explore Shop"
        size="lg"
        color="black"
        class="rounded-full"
      />

      <div class="flex gap-3 mt-8">
        <div>
          <div class="text-3xl font-medium">500+</div>
          <div class="text-sm">Verified Products</div>
        </div>
        <UDivider
          orientation="vertical"
          size="2xs"
          :ui="{
            border: {
              base: 'border-black ',
            },
          }"
        />
        <div>
          <div class="text-3xl font-medium">20k+</div>
          <div class="text-sm">Collections</div>
        </div>
      </div>
    </UContainer>
  </div>
</template>
