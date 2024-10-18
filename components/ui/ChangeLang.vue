<script setup lang="ts">
const { locale, locales, setLocale } = useI18n();

const availableLocales = computed(() => {
  return locales.value.filter((i) => i.code !== locale.value);
});

const onChangeLocale = (val: any) => {
  setLocale(val);
};
</script>

<template>
  <USelectMenu
    v-model="locale"
    :options="locales"
    :key="locale"
    placeholder="Select locales"
    value-attribute="code"
    option-attribute="name"
    @change="onChangeLocale(locale)"
  />
</template>
