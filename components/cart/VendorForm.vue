<script setup lang="ts">
const props = defineProps<{
  product?: Product;
}>();

const emits = defineEmits(["close"]);
const onClose = () => emits("close");

const { isMobile } = useHelper();

// Form
import type { FormSubmitEvent } from "#ui/types";
import { object, type InferType } from "yup";

interface FormState {
  project?: GeneralResponse;
  vendor?: GeneralResponse;
  unit_price?: string;
  qty?: string;
  total_price?: string;
  estimate_price?: string;
  location?: GeneralResponse;
  category?: GeneralResponse;
  unit?: GeneralResponse;
  type?: GeneralResponse;
  department?: GeneralResponse;
}

const schema = object<FormState>({
  location: object().required("Please select a location."),
  category: object().required("Please select a category."),
  unit: object().required("Please select a unit."),
  type: object().required("Please select a type."),
  department: object().required("Please select a department."),
});

type Schema = InferType<typeof schema>;

const state: FormState = reactive({
  project: undefined,
  vendor: undefined,
  unit_price: undefined,
  qty: undefined,
  total_price: undefined,
  estimate_price: undefined,
  location: undefined,
  category: undefined,
  unit: undefined,
  type: undefined,
  department: undefined,
});

const onSubmit = async (event: FormSubmitEvent<Schema>) => {
  // Do something with event.data
  console.log(event.data);
};

const { getSelectionData } = usePurchaseRequisition();

const stockAvailable = ref<number>(0);

// Analytic Account Selection
const projectLoading = ref(false);
const projectSelected = ref<GeneralResponse[]>([]);

const projectSearch = async (q: string) => {
  projectLoading.value = true;

  const response = await getSelectionData(SelectionType.AnalyticAccount, q);
  const data = response?.data?.analytic_account_ids ?? [];

  projectLoading.value = false;
  return data;
};

// Vendor Selection
const vendorSelected = ref<GeneralResponse>();

const vendorList = computed(() =>
  props.product?.seller_ids?.map((value) => {
    return {
      id: value.id,
      name: value.partner_id?.name,
      price: value.price,
    };
  })
);

const vendorChanged = (value: any) => {
  state.unit_price = currencyFormat(value.price);
  state.total_price = currencyFormat(value.price);

  state.qty = "1";

  // Max Stock
  stockAvailable.value = 999;

  state.vendor = vendorSelected.value;
};

// QTY
const qtyChanged = (qty: any) => {
  state.qty = qty;

  const total = qty * parseCurrency(state.unit_price);

  state.total_price = currencyFormat(total);
};

// Analytic Location Selection
const locationLoading = ref(false);
const locationSelected = ref<GeneralResponse>();

const locationSearch = async (q: string) => {
  locationLoading.value = true;

  const response = await getSelectionData(SelectionType.AnalyticLocation, q);
  const data = response?.data?.analytic_location_ids ?? [];

  locationLoading.value = false;
  return data;
};

// Analytic Category Selection
const categoryLoading = ref(false);
const categorySelected = ref<GeneralResponse>();

const categorySearch = async (q: string) => {
  categoryLoading.value = true;

  const response = await getSelectionData(SelectionType.AnalyticCategory, q);
  const data = response?.data?.analytic_category_ids ?? [];

  categoryLoading.value = false;
  return data;
};

// Analytic Unit Selection
const unitLoading = ref(false);
const unitSelected = ref<GeneralResponse>();

const unitSearch = async (q: string) => {
  unitLoading.value = true;

  const response = await getSelectionData(SelectionType.AnalyticUnit, q);
  const data = response?.data?.analytic_unit_ids ?? [];

  unitLoading.value = false;
  return data;
};

// Analytic Type Selection
const typeLoading = ref(false);
const typeSelected = ref<GeneralResponse>();

const typeSearch = async (q: string) => {
  typeLoading.value = true;

  const response = await getSelectionData(SelectionType.AnalyticType, q);
  const data = response?.data?.analytic_type_ids ?? [];

  typeLoading.value = false;
  return data;
};

// Analytic Department Selection
const departmentLoading = ref(false);
const departmentSelected = ref<GeneralResponse>();

const departmentSearch = async (q: string) => {
  departmentLoading.value = true;

  const response = await getSelectionData(SelectionType.AnalyticDepartment, q);
  const data = response?.data?.analytic_department_ids ?? [];

  departmentLoading.value = false;
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
        base: 'flex flex-col h-auto max-h-lvh ',
      },
    }"
  >
    <template #header>
      <div class="flex justify-between items-center p-4">
        <p class="font-medium text-base">
          {{ props.product?.name }}
        </p>
        <UButton
          color="gray"
          icon="i-heroicons-x-mark-20-solid"
          square
          padded
          @click="onClose"
        />
      </div>
    </template>

    <div class="overflow-y-auto p-4 md:pb-20 lg:pb-4">
      <!-- Content -->
      <UForm
        :schema="schema"
        :state="state"
        class="space-y-3"
        @submit="onSubmit"
      >
        <div class="grid grid-cols-12 gap-3">
          <UFormGroup
            label="Project"
            name="project"
            class="col-span-12"
            required
          >
            <USelectMenu
              v-model="projectSelected"
              :loading="projectLoading"
              :searchable="projectSearch"
              placeholder="Search for a project..."
              trailing
              option-attribute="name"
              by="id"
              @change="state.project = projectSelected"
            />
          </UFormGroup>

          <UFormGroup label="Vendor" name="vendor" class="col-span-12" required>
            <USelectMenu
              v-model="vendorSelected"
              :options="vendorList"
              placeholder="Select a vendor"
              searchable
              searchable-placeholder="Search a vendor..."
              option-attribute="name"
              by="id"
              @change="vendorChanged"
            />
          </UFormGroup>
          <UFormGroup label="Unit Price" name="unit_price" class="col-span-8">
            <UInput disabled color="gray" v-model="state.unit_price" />
          </UFormGroup>

          <UFormGroup label="Qty" name="qty" class="col-span-4">
            <ProductInputQty
              block
              :qty="Number(state.qty)"
              :stock-available="stockAvailable"
              @update:qty="qtyChanged"
            />
          </UFormGroup>

          <!-- <UFormGroup label="Estimate Price" class="w-full" required>
          <UiCurrencyInput
            v-model="state.estimate_price"
            @changed="
              (value) => {
                console.log('value');
                console.log(value);
              }
            "
            :disabled="vendorSelected == null"
          />
        </UFormGroup> -->

          <UDivider class="col-span-12" />

          <UFormGroup
            label="Location"
            class="col-span-6"
            name="location"
            required
          >
            <USelectMenu
              v-model="locationSelected"
              :loading="locationLoading"
              :searchable="locationSearch"
              placeholder="Search for a location..."
              trailing
              option-attribute="name"
              by="id"
              @change="state.location = locationSelected"
              :disabled="vendorSelected == null"
              :color="vendorSelected == null ? 'gray' : 'white'"
              :popper="{ placement: isMobile ? 'top-start' : 'bottom-start' }"
            />
          </UFormGroup>

          <UFormGroup
            label="Category"
            class="col-span-6"
            name="category"
            required
          >
            <USelectMenu
              v-model="categorySelected"
              :loading="categoryLoading"
              :searchable="categorySearch"
              placeholder="Search category"
              trailing
              option-attribute="name"
              by="id"
              @change="state.category = categorySelected"
              :disabled="vendorSelected == null"
              :color="vendorSelected == null ? 'gray' : 'white'"
              :popper="{ placement: isMobile ? 'top-start' : 'bottom-start' }"
            />
          </UFormGroup>

          <UFormGroup label="Unit" class="col-span-6" name="unit" required>
            <USelectMenu
              v-model="unitSelected"
              :loading="unitLoading"
              :searchable="unitSearch"
              placeholder="Search unit"
              trailing
              option-attribute="name"
              by="id"
              @change="state.unit = unitSelected"
              :disabled="vendorSelected == null"
              :color="vendorSelected == null ? 'gray' : 'white'"
              :popper="{ placement: isMobile ? 'top-start' : 'bottom-start' }"
            />
          </UFormGroup>
          <UFormGroup label="Type" class="col-span-6" name="type" required>
            <USelectMenu
              v-model="typeSelected"
              :loading="typeLoading"
              :searchable="typeSearch"
              placeholder="Search type"
              trailing
              option-attribute="name"
              by="id"
              @change="state.type = typeSelected"
              :disabled="vendorSelected == null"
              :color="vendorSelected == null ? 'gray' : 'white'"
              :popper="{ placement: isMobile ? 'top-start' : 'bottom-start' }"
            />
          </UFormGroup>
          <UFormGroup
            label="Department"
            class="col-span-12"
            name="department"
            required
          >
            <USelectMenu
              v-model="departmentSelected"
              :loading="departmentLoading"
              :searchable="departmentSearch"
              placeholder="Search department"
              trailing
              option-attribute="name"
              by="id"
              @change="state.department = departmentSelected"
              :disabled="vendorSelected == null"
              :color="vendorSelected == null ? 'gray' : 'white'"
              :popper="{ placement: isMobile ? 'top-start' : 'bottom-start' }"
            />
          </UFormGroup>
        </div>

        <div class="flex flex-col gap-3">
          <UDivider />
          <div>
            <div class="flex justify-between items-center">
              <p class="text-sm text-gray-500">Qty</p>
              <p class="text-base">
                <span v-if="state.qty != undefined">{{ state.qty }} Item</span>
                <span v-else> - </span>
              </p>
            </div>
            <div class="flex justify-between items-center">
              <p class="text-sm text-gray-500">Unit Price</p>
              <p class="text-base">
                <span v-if="state.unit_price != undefined">
                  {{ state.unit_price }}
                </span>
                <span v-else> {{ currencyFormat(0) }} </span>
              </p>
            </div>
          </div>
          <UDivider />
          <div class="flex justify-between items-center">
            <p class="text-base text-gray-900 dark:text-gray-200">
              Total Price
            </p>
            <p class="font-bold text-lg">
              <span v-if="state.total_price != undefined">
                {{ state.total_price }}
              </span>
              <span v-else> {{ currencyFormat(0) }} </span>
            </p>
          </div>
        </div>

        <UButton
          type="submit"
          size="lg"
          label="Tambahkan ke keranjang"
          icon="i-heroicons-plus-solid"
          block
          :disabled="vendorSelected == null"
          :color="vendorSelected == null ? 'gray' : 'primary'"
        />
      </UForm>
      <!-- End Content -->
    </div>
  </UCard>
</template>
