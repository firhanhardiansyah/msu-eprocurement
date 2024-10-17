<script setup lang="ts">
import type { FormSubmitEvent } from "#ui/types";
import { object, string, type InferType } from "yup";

const schema = object({
  email: string().email("Invalid email").required("Required"),
  password: string()
    .min(8, "Must be at least 8 characters")
    .required("Required"),
});

type Schema = InferType<typeof schema>;

const state = reactive({
  vendor: undefined,
});

const {
  listVendor,
  listAccount,
  listCompany,
  listWarehouse,
  listLocation,
  listAssessmentCriteria,
} = usePurchase();

const selectedVendor = ref();
const selectedAccount = ref();
const selectedCompany = ref();
const selectedWarehouse = ref();
const selectedLocation = ref();
const selectedAssessmentCriteria = ref();

const formattedPrice = ref("");

watch(formattedPrice, () => {
  formatPrice();
});

const formatPrice = () => {
  const cleanValue = formattedPrice.value.replace(/\D/g, "");
  const value = Number(cleanValue);

  formattedPrice.value = currencyFormat(value);
};

async function onSubmit(event: FormSubmitEvent<Schema>) {
  // Do something with event.data
  console.log(event.data);
}

// Date Picker
import { format } from "date-fns";

const date = ref(new Date());

const dateFormat = ref(format(date.value, "d MMM, yyy"));
</script>

<template>
  <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
    <UFormGroup label="Reason" name="reason">
      <UTextarea variant="outline" placeholder="Input intent and purpose..." />
    </UFormGroup>

    <UFormGroup label="Project Name" name="project_name">
      <UInput placeholder="Insert project name..." />
    </UFormGroup>

    <UFormGroup label="Vendor" name="vendor">
      <USelectMenu
        placeholder="Select a vendor"
        v-model="selectedVendor"
        searchable
        searchable-placeholder="Search a vendor..."
        :options="listVendor"
        value-attribute="id"
        option-attribute="name"
      />
    </UFormGroup>

    <UFormGroup label="Analytic Account" name="account">
      <USelectMenu
        placeholder="Select a account"
        v-model="selectedAccount"
        searchable
        searchable-placeholder="Search a account..."
        :options="listAccount"
        value-attribute="id"
        option-attribute="name"
      />
    </UFormGroup>

    <UFormGroup label="Order date to due date">
      <UiDateRangePicker />
    </UFormGroup>

    <UFormGroup label="Delivery Date">
      <UPopover :popper="{ placement: 'bottom-start' }">
        <UInput class="w-full" v-model="dateFormat" />

        <template #panel="{ close }">
          <UiDatePicker v-model="date" is-required @close="close" />
        </template>
      </UPopover>
    </UFormGroup>

    <UFormGroup label="Company" name="company">
      <USelectMenu
        placeholder="Select a company"
        v-model="selectedCompany"
        searchable
        searchable-placeholder="Search a company..."
        :options="listCompany"
        value-attribute="id"
        option-attribute="name"
      />
    </UFormGroup>

    <UFormGroup label="Warehouse" name="warehouse">
      <USelectMenu
        placeholder="Select a warehouse"
        v-model="selectedWarehouse"
        searchable
        searchable-placeholder="Search a warehouse..."
        :options="listWarehouse"
        value-attribute="id"
        option-attribute="name"
      />
    </UFormGroup>

    <UFormGroup label="Location" name="location">
      <USelectMenu
        placeholder="Select a location"
        v-model="selectedLocation"
        searchable
        searchable-placeholder="Search a location..."
        :options="listLocation"
        value-attribute="id"
        option-attribute="name"
      />
    </UFormGroup>

    <UFormGroup label="Assessment Criteria" name="assessment_criteria">
      <USelectMenu
        placeholder="Select a assessment criteria"
        v-model="selectedAssessmentCriteria"
        searchable
        searchable-placeholder="Search a assessment criteria..."
        :options="listAssessmentCriteria"
        value-attribute="id"
        option-attribute="name"
      />
    </UFormGroup>

    <UFormGroup label="Estimate Price" name="estimate_price">
      <UInput
        placeholder="Insert estimate price..."
        v-model.number="formattedPrice"
      />
    </UFormGroup>

    <UFormGroup label="Attachment" name="attachment">
      <UInput type="file" size="sm" icon="i-heroicons-folder" />
    </UFormGroup>

    <UButton type="submit" size="lg" block> Submit </UButton>
  </UForm>
</template>
