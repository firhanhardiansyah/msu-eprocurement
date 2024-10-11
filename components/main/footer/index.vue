<script setup lang="ts"></script>

<template>
  <footer>
    <UDivider />
    <div class="bg-primary-100">
      <UContainer>
        <div class="flex flex-wrap md:gap-4 lg:gap-0 py-4">
          <div class="w-full md:w-full lg:w-1/3 flex flex-col gap-4">
            <h6 class="font-semibold">Categories</h6>
            <!-- <div class="flex flex-wrap">
              <div class="w-1/2" v-for="(item, index) in categories">
                <ul class="flex flex-col gap-2" v-for="category in item">
                  <li
                    class="inline-block hover:text-primary-600 text-sm text-gray-500 mb-2"
                  >
                    <a href="#">{{ category?.title }}</a>
                  </li>
                </ul>
              </div>
            </div> -->
          </div>

          <UDivider class="py-4" />

          <!-- Get Apps -->
          <div class="w-full py-3">
            <div
              class="flex items-center justify-center flex-col md:flex-row md:gap-4 md:justify-start"
            >
              <div
                class="flex items-center justify-center gap-1 text-slate-600 text-sm"
              >
                Get deliveries with
                <span class="text-green-600 font-semibold"> eCatalog </span>
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
    <div class="bg-primary-200">
      <UContainer>
        <div class="py-8 w-full">
          <p class="text-sm text-slate-500">
            <span>© </span>
            <NuxtTime :datetime="Date.now()" year="numeric" />
            <span class="text-green-600 font-semibold"> eCatalog</span>
            <span> Powered by</span>
            <span class="text-primary-600 font-semibold">
              PT. Magma Sigma Utama
            </span>
          </p>
        </div>
      </UContainer>
    </div>
  </footer>
</template>
