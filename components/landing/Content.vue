<script setup lang="ts">
const announcements = [
  {
    date: "Kamis, 08 Aug 2024",

    description:
      "PEKERJAAN DESIGN AND BUILD PERKUATAN DERMAGA BARAT JICT PELABUHAN TANJUNG PRIOK",
    location: "JICT, Pelabuhan Tanjung Priok, Jakarta, Indonesia",
  },
  {
    date: "Rabu, 07 Aug 2024",
    description:
      "TENDER ULANG PEKERJAAN PEMBANGUNAN INFRASTRUKTUR JALAN TAHAP 2 KAWASAN PENDUKUNG TERMINAL KIJING",
    location:
      "Kecamatan Sungai Kunyit Kabupaten Mempawah, Provinsi Kalimantan Barat",
  },
  {
    date: "Selasa, 06 Aug 2024",

    description:
      "PENGADAAN DAN PEMASANGAN KABEL SUPPLY PERALATAN DI PT TERMINAL TELUK LAMONG",
    location: "PT Terminal Teluk Lamong",
  },
  {
    date: "Senin, 05 Aug 2024",

    description:
      "PEKERJAAN PEMBANGUNAN PIPERACK KAWASAN PENDUKUNG TERMINAL KIJING TAHAP 1",
    location:
      "Kecamatan Sungai Kunyit Kabupaten Mempawah, Provinsi Kalimantan Barat",
  },
  {
    date: "Jum'at', 02 Aug 2024",

    description:
      "PENGADAAN 2 (DUA) UNIT QUAY CONTAINER CRANE (QCC) UKURAN POST PANAMAX DI TERMINAL PETIKEMAS BELAWAN DAN 2 (DUA) UNIT QUAY CONTAINER CRANE (QCC) UKURAN PANAMAX DI TERMINAL PETIKEMAS PERAWANG PT PELINDO TERMINAL PETIKEMAS",
    location: "TPK Belawan dan TPK Perawang",
  },
];
</script>

<template>
  <div class="my-6">
    <h1 class="text-2xl font-bold lg:mb-4">Pengumuman</h1>
    <div class="flex flex-col-reverse lg:flex lg:flex-row gap-4">
      <div class="basis-0 lg:basis-3/4">
        <div class="grid grid-cols-1 gap-4">
          <!-- Pemberitahuan Tenders -->
          <UCard class="cursor-pointer" v-for="announcement in announcements">
            <article class="prose prose-gray dark:prose-invert">
              <h4>{{ announcement.date }}</h4>
              <p class="text-base lowercase">
                {{ announcement.description }}
              </p>
            </article>

            <template #footer>
              <div class="flex items-center gap-2">
                <Icon name="map:postal-code" class="bg-red-600" />
                <h6>{{ announcement.location }}</h6>
              </div>
            </template>
          </UCard>
        </div>
      </div>
      <UDivider class="block lg:hidden" />
      <div class="basis-0 lg:basis-1/4 mt-4 lg:mt-0">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4">
          <UCard class="cursor-pointer">
            <article class="prose prose-slate dark:prose-invert">
              <h2>Berita</h2>
              <h4>06 Desember 2022</h4>
              <p class="text-base">Survey kepuasan vendor dan vendor award</p>
            </article>
          </UCard>
          <UCard>
            <article class="prose prose-slate dark:prose-invert">
              <h2>Himbauan</h2>
              <p class="text-base">
                PT Magma Sigma Utama (MSU) tidak pernah memungut biaya atau
                meminta uang dari calon penyedia barang/jasa dalam proses
                pendaftaran Vendor Management System (VMS) maupun dalam proses
                pengadaan barang/jasa.
              </p>
            </article>
          </UCard>
        </div>
      </div>
    </div>
  </div>
</template>
