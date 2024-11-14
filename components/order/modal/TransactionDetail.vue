<script setup lang="ts">
const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
});

const open = ref(props.isOpen);

const emits = defineEmits<{
  change: [value: boolean];
}>();

const onClose = () => {
  open.value = false;
  emits("change", false);
};

// Check Size Screen
const { isMobile } = useHelper();

// Dropdown Test
const openDropdown = ref(false);

// Shipment tracking data
const trackingHistory = ref([
  {
    title: "Delivered",
    date: "2024-11-07",
    description: "Your package has been delivered.",
    isCompleted: true,
  },

  {
    title: "Out for Delivery",
    date: "2024-11-06",
    description: "The package is out for delivery and will arrive soon.",
    isCompleted: false,
  },

  {
    title: "In Transit",
    date: "2024-11-04",
    description: "Your order is on its way to the destination.",
    isCompleted: false,
  },

  {
    title: "Order Processed",
    date: "2024-11-02",
    description: "Your order is being prepared for shipment.",
    isCompleted: false,
  },
  {
    title: "Order Placed",
    date: "2024-11-01",
    description: "Your order has been placed and is awaiting processing.",
    isCompleted: false,
  },
]);

// Helper function to check if the current index is the last item
const isLast = (index: number) => index === trackingHistory.value.length - 1;
</script>

<template>
  <UModal
    v-model="open"
    :fullscreen="isMobile"
    :ui="{
      width: 'w-full lg:max-w-2xl xl:max-w-3xl',
    }"
  >
    <div
      class="flex flex-col"
      :class="[isMobile && 'h-screen', !isMobile && 'max-h-[712px]']"
    >
      <!-- Header -->
      <div class="p-4 border-b dark:border-zinc-800">
        <div class="flex items-center justify-between">
          <h3 class="text-lg lg:text-xl font-semibold dark:text-primary">
            Detail Transaksi
          </h3>
          <UButton
            color="gray"
            icon="i-heroicons-x-mark-20-solid"
            class="dark:text-primary"
            @click="onClose()"
          />
        </div>
      </div>
      <!-- End Header  -->

      <!-- Body -->
      <main class="flex-grow overflow-y-auto dark:bg-zinc-900 py-2">
        <!-- Label -->
        <div class="flex justify-between">
          <div class="flex items-center gap-2">
            <div class="bg-blue-500 w-1 h-10 rounded-r-md mr-1" />
            <p class="text-base font-bold">Request Order</p>
          </div>
          <UButton
            label="Lihat Detail"
            variant="link"
            class="mr-2"
            @click="openDropdown = !openDropdown"
          />
        </div>

        <transition name="fade-scale">
          <transition name="fade-scale">
            <div
              v-if="openDropdown"
              class="border border-gray-300 rounded-lg mx-4 mb-2 p-3 pt-5"
            >
              <div class="container">
                <!-- Timeline Container -->
                <div class="relative">
                  <div
                    v-for="(status, index) in trackingHistory"
                    :key="index"
                    class="relative ml-6 pl-6"
                    :class="{
                      'border-l-2 border-gray-300 ': !isLast(index),
                    }"
                  >
                    <!-- Status Marker -->
                    <div
                      class="absolute -left-3 w-6 h-6 rounded-full flex items-center justify-center"
                      :class="
                        status.isCompleted ? 'bg-green-300' : 'bg-gray-300'
                      "
                    >
                      <div
                        class="w-3 h-3 rounded-full"
                        :class="
                          status.isCompleted ? 'bg-green-700' : 'bg-gray-500'
                        "
                      ></div>
                    </div>

                    <!-- Status Content -->
                    <div class="">
                      <h3
                        class="font-semibold text-base"
                        :class="
                          status.isCompleted
                            ? 'text-green-700'
                            : 'text-gray-700'
                        "
                      >
                        {{ status.title }}
                      </h3>
                      <p class="text-gray-500 text-sm">{{ status.date }}</p>
                      <p class="text-gray-600 text-sm pb-4">
                        {{ status.description }}
                      </p>
                    </div>
                  </div>
                </div>
                <!-- End Timeline -->
              </div>
            </div>
          </transition>
        </transition>

        <!-- Divider -->
        <div class="px-4 py-2">
          <UDivider />
        </div>

        <div class="flex flex-col gap-2">
          <!-- Invoice -->
          <div class="flex justify-between items-center ml-4 mr-2">
            <div class="flex items-center gap-2 max-w-52 break-all md:max-w-sm">
              <p class="text-sm text-gray-600 line-clamp-1">
                INV/20241111/AUX/21312445905/21312445905
              </p>
              <UButton
                icon="i-heroicons-clipboard-document-list"
                size="xs"
                variant="soft"
              />
            </div>
            <UButton label="Lihat Invoice" variant="link" />
          </div>

          <!-- Purchase Date -->
          <div class="flex justify-between items-center mx-4">
            <p class="text-sm text-gray-500">Tanggal Pembelian</p>
            <p class="text-sm text-gray-900">11 November 2024, 13:57 WIB</p>
          </div>
        </div>

        <!-- Divider -->
        <div class="p-4">
          <UDivider />
        </div>

        <!-- Details -->
        <div class="flex flex-col gap-4">
          <!-- Detail Produk -->
          <div class="px-4 flex flex-col gap-2">
            <p class="font-bold">Detail Produk</p>

            <div class="border border-gray-300 rounded-lg">
              <!-- Item -->
              <div class="flex flex-col gap-3 p-3">
                <div class="flex gap-3 items-center">
                  <div class="h-14 w-14 bg-gray-300 rounded-md" />
                  <div class="flex-1">
                    <p class="text-sm cursor-pointer">
                      ADJUSTER,WHEEL BRAKE,RR,PN S4490-E0140
                    </p>
                    <p class="text-sm font-semibold">1 x Rp485.000</p>
                  </div>
                </div>
              </div>
              <!-- End Item -->
              <div class="p-3 bg-gray-50 rounded-b-lg border-t-[1px]">
                <div class="flex justify-between text-sm">
                  <p>Total Harga</p>
                  <p class="font-semibold">Rp279.000.000</p>
                </div>
              </div>
            </div>
          </div>
          <!-- End Detail Produk -->

          <!-- Info Pengiriman -->
          <div class="px-4 flex flex-col gap-2">
            <p class="font-bold">Info Pengiriman</p>

            <div class="flex flex-col gap-2 text-sm">
              <div class="flex">
                <p class="min-w-24 text-gray-500">Kurir</p>
                <p class="w-4">:</p>
                <p class="w-8/12">Kurir Rekomendasi - Reguler</p>
              </div>
              <div class="flex">
                <p class="min-w-24 text-gray-500">No Resi</p>
                <p class="w-4">:</p>
                <p class="w-8/12">TKP01-KUEQ0HK8</p>
              </div>
              <div class="flex">
                <p class="min-w-24 text-gray-500">Alamat</p>
                <p class="w-4">:</p>
                <p class="w-8/12 flex flex-col">
                  <span class="font-bold">Fitrado Budi Ismaya</span>
                  <span>6285951346453</span>
                  <span>
                    Kencana Guest House, Jl Rengas 1 no.26, blok s kebayoran
                    baru, Jakarta Selatan, 12180 Kebayoran Baru, Kota
                    Administrasi Jakarta Selatan DKI Jakarta 12180
                  </span>
                </p>
              </div>
            </div>
          </div>
          <!-- End Info Pengiriman -->

          <!-- Rincian Pembayaran -->
          <div class="px-4 flex flex-col gap-2">
            <p class="font-bold">Rincian Pembayaran</p>

            <div class="flex flex-col gap-2 text-sm">
              <div class="flex justify-between">
                <p class="min-w-24 text-gray-500">Metode Pembayaran</p>
                <p class="text-end">
                  Mandiri Virtual Account GoPay GoPay Coins
                </p>
              </div>
              <div class="flex justify-between">
                <p class="min-w-24 text-gray-500">Total Harga (3 Barang)</p>
                <p class="text-end">Rp292.880</p>
              </div>
              <div class="flex justify-between">
                <p class="min-w-24 text-gray-500">
                  Total Biaya Proteksi (1 Polis)
                </p>
                <p class="text-end">Rp3.000</p>
              </div>
              <div class="flex justify-between">
                <p class="min-w-24 text-gray-500">Total Ongkos Kirim</p>
                <p class="text-end">Rp23.000</p>
              </div>
              <div class="flex justify-between">
                <p class="min-w-24 text-gray-500">Diskon Ongkos Kirim</p>
                <p class="text-end">-Rp23.000</p>
              </div>
              <div class="flex justify-between">
                <p class="min-w-24 text-gray-500">Total Diskon Barang</p>
                <p class="text-end">-Rp11.715</p>
              </div>
              <UDivider class="my-1" />
              <div class="flex justify-between font-bold">
                <p class="min-w-24 text-gray-500">Total Belanja</p>
                <p class="text-end">Rp284.165</p>
              </div>
            </div>
          </div>
          <!-- End Rincian Pembayaran -->
        </div>
        <!-- End Details -->
      </main>
      <!-- End Body -->
    </div>
  </UModal>
</template>

<style scoped>
/* Define the custom transition using Tailwind-style animations */
.fade-scale-enter-active,
.fade-scale-leave-active {
  transition: all 0.3s ease;
}

.fade-scale-enter-from,
.fade-scale-leave-to {
  opacity: 0;
  transform: scale(0.95);
}

.fade-scale-enter-to,
.fade-scale-leave-from {
  opacity: 1;
  transform: scale(1);
}
</style>
