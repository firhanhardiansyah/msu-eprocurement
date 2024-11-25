<script setup lang="ts">
const props = defineProps<{
  item: Product;
}>();

const { changeProductType } = useProduct();

const items = [
  {
    title: "Nama Produk",
    value: props.item?.name,
  },
  {
    title: "Product Type",
    value: changeProductType(props.item?.type),
  },
  {
    title: "Material Code",
    value: props.item?.default_code,
  },
  {
    title: "Unit Of Issue",
    value: props.item?.uom_id?.name,
  },
  {
    title: "Purchase Unit of Measure",
    value: props.item?.uom_po_id?.name,
  },
];
</script>

<template>
  <div class="bg-white dark:bg-black p-4 sm:p-0">
    <div class="flex flex-col gap-3">
      <div>
        <div class="text-lg font-bold mb-3">Detail Produk</div>
        <div v-for="(item, index) in items">
          <div class="flex flex-row max-w-lg gap-2">
            <div class="w-4/12">
              <div
                class="font-normal text-sm text-slate-500 dark:text-slate-50"
              >
                {{ item.title }}
              </div>
            </div>
            <div class="w-8/12">
              <div
                class="font-normal text-sm text-slate-900 dark:text-slate-50"
              >
                {{ item.value }}
              </div>
            </div>
          </div>
          <UDivider class="my-3" v-show="index != items.length - 1" />
        </div>
      </div>
      <div>
        <div class="text-lg font-bold mb-1">Deskripsi Produk</div>
        <p class="text-sm text-gray-500 line-clamp-3 dark:text-gray-300">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor ad,
          atque natus iusto enim consectetur reiciendis eius nostrum ex
          obcaecati fugit blanditiis rerum? Culpa autem neque molestiae nam
          aliquid iure!
        </p>
      </div>
    </div>
  </div>
</template>
