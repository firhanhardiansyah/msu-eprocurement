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
  // analytic_account: string().required("Analytic Account Required"),
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

const { getSelectionData } = usePurchaseRequisition();

// Vendor Selection
const vendorLoading = ref(false);
const vendorSelected = ref<GeneralResponse[]>([]);

const vendorSearch = async (q: string) => {
  vendorLoading.value = true;

  const response = await getSelectionData(SelectionType.Vendor, q);
  const data = response?.data?.vendor_ids ?? [];

  vendorLoading.value = false;

  return data;
};

// Analytic Account Selection
const analyticAccountLoading = ref(false);
const analyticAccountSelected = ref<GeneralResponse[]>([]);

const analyticAccountSearch = async (q: string) => {
  analyticAccountLoading.value = true;

  const response = await getSelectionData(SelectionType.AnalyticAccount, q);
  const data = response?.data?.analytic_account_ids ?? [];

  analyticAccountLoading.value = false;
  return data;
};
</script>

<template>
  <UCard
    :ui="{
      header: {
        padding: '',
      },
      body: {
        padding: '',
      },
    }"
  >
    <template #header>
      <div class="px-4 py-3">
        <p class="text-base font-semibold">Purchase Requisition</p>
      </div>
    </template>
    <template #default>
      <div class="px-4 py-3">
        <UForm
          :schema="schema"
          :state="state"
          class="space-y-4"
          @submit="onSubmit"
        >
          <UFormGroup label="Project Name" name="project_name" required>
            <UInput
              autocomplete="off"
              placeholder="Insert project name..."
              v-model="state.project_name"
            />
          </UFormGroup>

          <UFormGroup label="Vendor" name="vendor" required>
            <template v-if="vendorSelected.length > 0">
              <div class="mb-2 flex flex-wrap gap-2">
                <UBadge
                  v-for="(select, index) in vendorSelected"
                  variant="subtle"
                >
                  <div class="flex gap-2 items-center justify-center">
                    <span>{{ select.name }}</span>

                    <UButton
                      size="xs"
                      icon="i-heroicons-x-mark-solid"
                      variant="ghost"
                      :padded="false"
                      @click="vendorSelected.splice(index, 1)"
                    />
                  </div>
                </UBadge>
              </div>
            </template>

            <USelectMenu
              v-model="vendorSelected"
              :loading="vendorLoading"
              :searchable="vendorSearch"
              placeholder="Search for a vendor..."
              option-attribute="name"
              multiple
              trailing
              by="id"
              @change="state.vendor = vendorSelected"
            >
              <template #label>
                <span v-if="vendorSelected.length" class="truncate">
                  <div class="flex flex-col">
                    {{ vendorSelected.length }} Selected
                  </div>
                </span>
                <span v-else>Select vendor</span>
              </template>
            </USelectMenu>
          </UFormGroup>

          <UFormGroup label="Analytic Account" name="analytic_account" required>
            <!-- Badges -->
            <template v-if="analyticAccountSelected.length > 0">
              <div class="mb-2 flex flex-wrap gap-2">
                <UBadge
                  v-for="(select, index) in analyticAccountSelected"
                  variant="subtle"
                >
                  <div class="flex gap-2 items-center justify-center">
                    <span>{{ select.name }}</span>

                    <UButton
                      size="xs"
                      icon="i-heroicons-x-mark-solid"
                      variant="ghost"
                      :padded="false"
                      @click="analyticAccountSelected.splice(index, 1)"
                    />
                  </div>
                </UBadge>
              </div>
            </template>

            <USelectMenu
              v-model="analyticAccountSelected"
              :loading="analyticAccountLoading"
              :searchable="analyticAccountSearch"
              placeholder="Search for a vendor..."
              option-attribute="name"
              multiple
              trailing
              by="id"
              @change="state.analytic_account = analyticAccountSelected"
            >
              <template #label>
                <span v-if="analyticAccountSelected.length" class="truncate">
                  <div class="flex flex-col">
                    {{ analyticAccountSelected.length }} Selected
                  </div>
                </span>
                <span v-else>Select analytic account</span>
              </template>
            </USelectMenu>
          </UFormGroup>

          <UFormGroup label="Order date to due date" name="order_to_due_date">
            <UiDateRangePicker
              @update:model-value="
                (value) => {
                  console.log(value);
                }
              "
              block
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

          <UFormGroup
            label="Assessment Criteria"
            name="assessment_criteria"
            required
          >
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

          <UFormGroup label="Reason" name="reason" required>
            <UTextarea
              v-model="state.reason"
              variant="outline"
              placeholder="Insert intent and purpose..."
              autocomplete="off"
            />
          </UFormGroup>

          <!-- <UFormGroup label="Attachment" name="attachment">
            <UInput
              type="file"
              size="sm"
              icon="i-heroicons-folder"
              v-model="state.attachment"
            />
          </UFormGroup> -->

          <UFormGroup label="Attachment" name="attachments" required>
            <UiDragDropFile />
          </UFormGroup>

          <UButton type="submit" size="lg" block> Submit </UButton>
        </UForm>
      </div>
    </template>
  </UCard>
</template>
