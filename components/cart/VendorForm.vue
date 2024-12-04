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

const schema = object<ProductFormState>({
  analytic_location: object().required("Please select an analytic location."),
  analytic_category: object().required("Please select an analytic category."),
  analytic_unit: object().required("Please select an analytic unit."),
  analytic_type: object().required("Please select an analytic type."),
  analytic_department: object().required(
    "Please select an analytic department."
  ),
});

const state: ProductFormState = reactive({
  product: undefined,
  vendor: undefined,
  unit_price: undefined,
  qty: undefined,
  total_price: undefined,
  analytic_project: undefined,
  analytic_location: undefined,
  analytic_category: undefined,
  analytic_unit: undefined,
  analytic_type: undefined,
  analytic_department: undefined,
});

const unitPriceFormatted = computed({
  get(): string {
    return currencyFormat(state.unit_price || 0);
  },
  set(value: string) {
    state.unit_price = currencyParse(value) || 0;
  },
});
const totalPriceFormatted = computed({
  get(): string {
    return currencyFormat(state.total_price || 0);
  },
  set(value: string) {
    state.total_price = currencyParse(value) || 0;
  },
});

const { getSelectionData } = usePurchaseRequisition();

// Analytic Account Selection
const analitycProjectLoading = ref(false);
const analitycProjectSelected = ref<GeneralResponse>();

const analitycProjectSearch = async (q: string) => {
  analitycProjectLoading.value = true;

  const response = await getSelectionData(SelectionType.AnalyticAccount, q);
  const data = response?.data?.analytic_account_ids ?? [];

  analitycProjectLoading.value = false;
  return data;
};

// Vendor Selection
const vendorSelected = ref<ProductVendor>();

const vendorList = computed<ProductVendor[] | undefined>(() =>
  props.product?.seller_ids?.map((value) => {
    return {
      id: value.id,
      name: value.partner_id?.name,
      price: value.price,
    };
  })
);

const stockAvailable = ref<number>(0);

const vendorChanged = (value: ProductVendor | undefined) => {
  unitPriceFormatted.value = currencyFormat(value?.price ?? 0);

  state.qty = 1;
  state.total_price = (state.unit_price ?? 0) * state.qty;

  // Max Stock
  stockAvailable.value = 999;

  state.vendor = vendorSelected.value;
};

// QTY
const qtyChanged = (qty: any) => {
  state.qty = qty;

  state.total_price = (state.unit_price ?? 0) * (state.qty ?? 0);
};

// Analytic Location Selection
const analitycLocationLoading = ref(false);
const analitycLocationSelected = ref<GeneralResponse>();

const analitycLocationSearch = async (q: string) => {
  analitycLocationLoading.value = true;

  const response = await getSelectionData(SelectionType.AnalyticLocation, q);

  const data = response?.data?.analytic_location_ids ?? [];

  analitycLocationLoading.value = false;
  return data;
};

// Analytic Category Selection
const analitycCategoryLoading = ref(false);
const analitycCategorySelected = ref<GeneralResponse>();

const analitycCategorySearch = async (q: string) => {
  analitycCategoryLoading.value = true;

  const response = await getSelectionData(SelectionType.AnalyticCategory, q);
  const data = response?.data?.analytic_category_ids ?? [];

  analitycCategoryLoading.value = false;
  return data;
};

// Analytic Unit Selection
const analyticUnitLoading = ref(false);
const analyticUnitSelected = ref<GeneralResponse>();

const analyticUnitSearch = async (q: string) => {
  analyticUnitLoading.value = true;

  const response = await getSelectionData(SelectionType.AnalyticUnit, q);
  const data = response?.data?.analytic_unit_ids ?? [];

  analyticUnitLoading.value = false;
  return data;
};

// Analytic Type Selection
const analyticTypeLoading = ref(false);
const analyticTypeSelected = ref<GeneralResponse>();

const analyticTypeSearch = async (q: string) => {
  analyticTypeLoading.value = true;

  const response = await getSelectionData(SelectionType.AnalyticType, q);
  const data = response?.data?.analytic_type_ids ?? [];

  analyticTypeLoading.value = false;
  return data;
};

// Analytic Department Selection
const analyticDepartmentLoading = ref(false);
const analyticDepartmentSelected = ref<GeneralResponse>();

const analyticDepartmentSearch = async (q: string) => {
  analyticDepartmentLoading.value = true;

  const response = await getSelectionData(SelectionType.AnalyticDepartment, q);
  const data = response?.data?.analytic_department_ids ?? [];

  analyticDepartmentLoading.value = false;
  return data;
};

const { onAddToCart } = useCartNew();

type Schema = InferType<typeof schema>;

const onSubmit = (event: FormSubmitEvent<Schema>): void => {
  state.product = props.product;

  // Add to cart
  onAddToCart(event.data);

  emits("close");
};

const developMode = ref<boolean>(!false);

// Test;
onMounted(() => {
  if (developMode.value) {
    // Analytics Project Test
    analitycProjectSearch("").then((data) => {
      analitycProjectSelected.value = {
        id: data[0].id,
        name: data[0].name,
      };

      state.analytic_project = analitycProjectSelected.value;
    });

    // Vendor Test
    if (props.product?.seller_ids?.length !== 0) {
      const vendorSelectedTest = {
        id: props.product!.seller_ids![0].id,
        name: props.product!.seller_ids![0].partner_id?.name,
        price: props.product!.seller_ids![0].price,
      };

      vendorSelected.value = {
        id: props.product!.seller_ids![0].id,
        name: props.product!.seller_ids![0].partner_id?.name,
      };

      vendorChanged(vendorSelectedTest);
    }

    // Location
    analitycLocationSearch("").then((data) => {
      analitycLocationSelected.value = {
        id: data[0].id,
        name: data[0].name,
      };

      state.analytic_location = analitycLocationSelected.value;
    });

    // Category
    analitycCategorySearch("").then((data) => {
      analitycCategorySelected.value = {
        id: data[0].id,
        name: data[0].name,
      };

      state.analytic_category = analitycCategorySelected.value;
    });

    // Unit
    analyticUnitSearch("").then((data) => {
      analyticUnitSelected.value = {
        id: data[0].id,
        name: data[0].name,
      };

      state.analytic_unit = analyticUnitSelected.value;
    });

    // Type
    analyticTypeSearch("").then((data) => {
      analyticTypeSelected.value = {
        id: data[0].id,
        name: data[0].name,
      };

      state.analytic_type = analyticTypeSelected.value;
    });

    // Department
    analyticDepartmentSearch("").then((data) => {
      analyticDepartmentSelected.value = {
        id: data[0].id,
        name: data[0].name,
      };

      state.analytic_department = analyticDepartmentSelected.value;
    });
  }
});
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
            name="analytict_project"
            label="Analytic Project"
            class="col-span-12"
            required
          >
            <USelectMenu
              v-model="analitycProjectSelected"
              :loading="analitycProjectLoading"
              :searchable="analitycProjectSearch"
              placeholder="Search for analytic project"
              trailing
              option-attribute="name"
              by="id"
              @change="state.analytic_project = analitycProjectSelected"
            />
          </UFormGroup>

          <UFormGroup label="Vendor" name="vendor" class="col-span-12" required>
            <USelectMenu
              v-model="vendorSelected"
              :options="vendorList"
              placeholder="Choose the right vendor"
              searchable
              searchable-placeholder="Search vendor..."
              option-attribute="name"
              by="id"
              @change="vendorChanged"
            />
          </UFormGroup>
          <UFormGroup label="Unit Price" name="unit_price" class="col-span-8">
            <UInput
              disabled
              color="gray"
              v-model="unitPriceFormatted"
              placeholder="Unit price based on selected vendor"
            />
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
            label="Analytic Location"
            class="col-span-6"
            name="analytic_location"
            required
          >
            <USelectMenu
              v-model="analitycLocationSelected"
              :loading="analitycLocationLoading"
              :searchable="analitycLocationSearch"
              placeholder="Select analytic location"
              trailing
              option-attribute="name"
              by="id"
              @change="state.analytic_location = analitycLocationSelected"
              :disabled="vendorSelected == null"
              :color="vendorSelected == null ? 'gray' : 'white'"
              :popper="{ placement: isMobile ? 'top-start' : 'bottom-start' }"
            />
          </UFormGroup>

          <UFormGroup
            label="Analytic Category"
            class="col-span-6"
            name="analytic_category"
            required
          >
            <USelectMenu
              v-model="analitycCategorySelected"
              :loading="analitycCategoryLoading"
              :searchable="analitycCategorySearch"
              placeholder="Search analytic category"
              trailing
              option-attribute="name"
              by="id"
              @change="state.analytic_category = analitycCategorySelected"
              :disabled="vendorSelected == null"
              :color="vendorSelected == null ? 'gray' : 'white'"
              :popper="{ placement: isMobile ? 'top-start' : 'bottom-start' }"
            />
          </UFormGroup>

          <UFormGroup
            label="Analytic Unit"
            class="col-span-6"
            name="analytic_unit"
            required
          >
            <USelectMenu
              v-model="analyticUnitSelected"
              :loading="analyticUnitLoading"
              :searchable="analyticUnitSearch"
              placeholder="Search analytic unit"
              trailing
              option-attribute="name"
              by="id"
              @change="state.analytic_unit = analyticUnitSelected"
              :disabled="vendorSelected == null"
              :color="vendorSelected == null ? 'gray' : 'white'"
              :popper="{ placement: isMobile ? 'top-start' : 'bottom-start' }"
            />
          </UFormGroup>
          <UFormGroup
            label="Analytic Type"
            class="col-span-6"
            name="analytic_type"
            required
          >
            <USelectMenu
              v-model="analyticTypeSelected"
              :loading="analyticTypeLoading"
              :searchable="analyticTypeSearch"
              placeholder="Search analytic type"
              trailing
              option-attribute="name"
              by="id"
              @change="state.analytic_type = analyticTypeSelected"
              :disabled="vendorSelected == null"
              :color="vendorSelected == null ? 'gray' : 'white'"
              :popper="{ placement: isMobile ? 'top-start' : 'bottom-start' }"
            />
          </UFormGroup>
          <UFormGroup
            label="Analytic Department"
            class="col-span-12"
            name="analytic_department"
            required
          >
            <USelectMenu
              v-model="analyticDepartmentSelected"
              :loading="analyticDepartmentLoading"
              :searchable="analyticDepartmentSearch"
              placeholder="Search analytic department"
              trailing
              option-attribute="name"
              by="id"
              @change="state.analytic_department = analyticDepartmentSelected"
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
              <p class="text-sm">
                <span v-if="state.qty != undefined"
                  >{{ state.qty }} {{ props.product?.uom_id?.name }}</span
                >
                <span v-else> - </span>
              </p>
            </div>
            <div class="flex justify-between items-center">
              <p class="text-sm text-gray-500">Unit Price</p>
              <p class="text-sm">
                <span v-if="unitPriceFormatted != undefined">
                  {{ unitPriceFormatted }}
                </span>
                <span v-else> {{ currencyFormat(0) }} </span>
              </p>
            </div>
          </div>
          <UDivider />
          <div class="flex justify-between items-center">
            <p class="text-base font-medium text-gray-900 dark:text-gray-200">
              Total Price
            </p>
            <p class="font-bold text-lg">
              <span v-if="totalPriceFormatted != undefined">
                {{ totalPriceFormatted }}
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
