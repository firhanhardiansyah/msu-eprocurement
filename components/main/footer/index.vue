<script setup lang="ts"></script>

<template>
  <footer>
    <UDivider />
    <div class="bg-primary-100 dark:bg-black/20">
      <UContainer>
        <div class="flex flex-wrap md:gap-4 lg:gap-0 py-4">
          <div class="w-full md:w-full lg:w-1/3 flex flex-col gap-4">
            <UiChangeLang />
          </div>

          <UDivider class="py-4" />

          <!-- Get Apps -->
          <div class="w-full py-3">
            <div
              class="flex items-center justify-center flex-col md:flex-row md:gap-4 md:justify-start"
            >
              <div
                class="flex items-center justify-center gap-1 text-slate-600 text-sm dark:text-white"
              >
                {{ $t("general.get_deliveries") }}
                <span class="text-primary font-semibold"> eCatalog </span>
              </div>
              <div class="flex">
                <img
                  src="/images/app_button/app-store.svg"
                  alt="App Store"
                  class="w-28"
                />
                <img
                  src="/images/app_button/google-play1.svg"
                  alt="Play Store"
                  class="w-32"
                />
              </div>
            </div>
          </div>
        </div>
      </UContainer>
    </div>
    <div class="bg-primary-200 dark:bg-black/50">
      <UContainer>
        <div class="py-8 w-full">
          <p class="text-sm text-slate-500 dark:text-white">
            <span>© </span>
            <NuxtTime :datetime="Date.now()" year="numeric" />
            <span class="text-primary-600 font-semibold dark:text-primary-400">
              eCatalog</span
            >
            <span> Powered by</span>
            <span class="text-primary-600 font-semibold dark:text-primary-400">
              PT. Magma Sigma Utama
            </span>
          </p>
        </div>
      </UContainer>
    </div>
  </footer>
</template>
