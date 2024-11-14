<script setup lang="ts">
import type { FormSubmitEvent } from "#ui/types";
import { object, string, type InferType } from "yup";

interface FormState {
  reason?: string;
  project_name?: string;
  vendor?: number;
  analytic_account?: number;
  delivery_date?: string;
  company?: number;
  warehouse?: number;
  location?: number;
  assessment_criteria?: number;
  estimate_price?: number;
  attachment?: any;
}

const state: FormState = reactive({
  reason: undefined,
  project_name: undefined,
  vendor: undefined,
  analytic_account: undefined,
  delivery_date: undefined,
  company: undefined,
  warehouse: undefined,
  location: undefined,
  assessment_criteria: undefined,
  estimate_price: undefined,
  attachment: undefined,
});

const schema = object({
  reason: string().required("Reason Required"),
  project_name: string().required("Project Name Required"),
  // vendor: string().required("Vendor Required"),
  analytic_account: string().required("Analytic Account Required"),
  delivery_date: string().required("Delivery Date Required"),
  company: string().required("Company Required"),
  warehouse: string().required("Warehouse Required"),
  location: string().required("Location Required"),
  assessment_criteria: string().required("Assessment Criteria Required"),
  estimate_price: string().required("Estimate Price Required"),
  attachment: string().required("Attachment Required"),
});

type Schema = InferType<typeof schema>;

const {
  listVendor,
  listAccount,
  listCompany,
  listWarehouse,
  listLocation,
  listAssessmentCriteria,
} = usePurchase();

const { getVendors } = usePurchaseRequisition();

const { vendors } = getVendors();

const selectedVendor = ref([]);
const selectedAccount = ref();
const selectedCompany = ref();
const selectedWarehouse = ref();
const selectedLocation = ref();
const selectedAssessmentCriteria = ref();

const estimatePriceFormat = ref("");

const priceFormat = (value: any) => {
  // Hanya izinkan angka
  const rawValue = value.replace(/\D/g, "");

  // Format nilai ke mata uang
  estimatePriceFormat.value = currencyFormat(rawValue);

  // Set nilai ke dalam form estimate price
  state.estimate_price = +rawValue;
};

async function onSubmit(event: FormSubmitEvent<Schema>) {
  // Do something with event.data
  console.log(event.data);
}

// Date Picker
import { format } from "date-fns";

const deliveryDate = ref(new Date());

onMounted(() => {
  state.delivery_date = format(deliveryDate.value, "y-MM-dd");
});
</script>

<template>
  <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
    <UFormGroup label="Reason" name="reason" required>
      <UTextarea
        v-model="state.reason"
        variant="outline"
        placeholder="Insert intent and purpose..."
        autocomplete="off"
      />
    </UFormGroup>

    <UFormGroup label="Project Name" name="project_name" required>
      <UInput
        autocomplete="off"
        placeholder="Insert project name..."
        v-model="state.project_name"
      />
    </UFormGroup>

    <UFormGroup label="Vendor" name="vendor" required>
      <USelectMenu
        placeholder="Select a vendor"
        multiple
        v-model="selectedVendor"
        searchable
        searchable-placeholder="Search a vendor..."
        :options="vendors"
        value-attribute="id"
        option-attribute="name"
      >
        <!-- <template #label>
          <span v-if="selectedVendor.length" class="truncate">
            {{ selectedVendor }}
          </span>
          <span v-else>Select people</span>
        </template> -->
      </USelectMenu>
    </UFormGroup>

    <UFormGroup label="Analytic Account" name="analytic_account" required>
      <USelectMenu
        placeholder="Select a account"
        v-model="selectedAccount"
        searchable
        searchable-placeholder="Search a account..."
        :options="listAccount"
        @change="state.analytic_account = selectedAccount"
        value-attribute="id"
        option-attribute="name"
      />
    </UFormGroup>

    <UFormGroup label="Order date to due date" name="order_to_due_date">
      <UiDateRangePicker
        @update:model-value="
          (value) => {
            console.log(value);
          }
        "
      />
    </UFormGroup>

    <UFormGroup label="Delivery Date" name="delivery_date" required>
      <UPopover :popper="{ placement: 'bottom-start' }">
        <UButton
          class="w-full"
          size="lg"
          color="white"
          :ui="{
            font: 'font-normal',
          }"
          :label="format(deliveryDate, 'd MMM, yyy')"
        />

        <template #panel="{ close }">
          <UiDatePicker
            v-model="deliveryDate"
            @update:model-value="(date: Date) => state.delivery_date = format(date, 'y-MM-dd')"
            is-required
            @close="close"
          />
        </template>
      </UPopover>
    </UFormGroup>

    <UFormGroup label="Company" name="company" required>
      <USelectMenu
        placeholder="Select a company"
        v-model="selectedCompany"
        searchable
        searchable-placeholder="Search a company..."
        :options="listCompany"
        value-attribute="id"
        option-attribute="name"
        @change="state.company = selectedCompany"
      />
    </UFormGroup>

    <UFormGroup label="Warehouse" name="warehouse" required>
      <USelectMenu
        placeholder="Select a warehouse"
        v-model="selectedWarehouse"
        searchable
        searchable-placeholder="Search a warehouse..."
        :options="listWarehouse"
        value-attribute="id"
        option-attribute="name"
        @change="state.warehouse = selectedWarehouse"
      />
    </UFormGroup>

    <UFormGroup label="Location" name="location" required>
      <USelectMenu
        placeholder="Select a location"
        v-model="selectedLocation"
        searchable
        searchable-placeholder="Search a location..."
        :options="listLocation"
        value-attribute="id"
        option-attribute="name"
        @change="state.location = selectedLocation"
      />
    </UFormGroup>

    <UFormGroup label="Assessment Criteria" name="assessment_criteria" required>
      <USelectMenu
        placeholder="Select a assessment criteria"
        v-model="selectedAssessmentCriteria"
        searchable
        searchable-placeholder="Search a assessment criteria..."
        :options="listAssessmentCriteria"
        value-attribute="id"
        option-attribute="name"
        @change="state.assessment_criteria = selectedAssessmentCriteria"
      />
    </UFormGroup>

    <UFormGroup label="Estimate Price" name="estimate_price" required>
      <UInput
        placeholder="Insert estimate price..."
        v-model="estimatePriceFormat"
        @keyup="priceFormat(estimatePriceFormat)"
      />
    </UFormGroup>

    <UFormGroup label="Attachment" name="attachment">
      <UInput
        type="file"
        size="sm"
        icon="i-heroicons-folder"
        v-model="state.attachment"
      />
    </UFormGroup>

    <UButton type="submit" size="lg" block> Submit </UButton>
  </UForm>
</template>
