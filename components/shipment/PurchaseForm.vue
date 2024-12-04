<script setup lang="ts">
/**
 * ! Codingan masih berantakan, setelah OK di check oleh user
 * ! Jangan lupa untuk di buat clean code.
 */

import type { FormSubmitEvent } from "#ui/types";
import type { DatePickerRangeObject } from "v-calendar/dist/types/src/use/datePicker.js";
import { object, string, type InferType } from "yup";

const { checkoutItems, getCheckedProducts } = useCartNew();

interface FormState {
  reason?: string;
  project_name?: string;

  order_to_due_date?: string;
  ordering_date?: string;
  due_date?: string;
  delivery_date?: string;
  company?: GeneralResponse;
  warehouse?: GeneralResponse;
  location?: GeneralResponse;
  assessment_criteria?: GeneralResponse;
  estimate_price?: number;
  attachment?: any;

  is_purchase_contract?: boolean;
  is_purchase_jasa?: boolean;
}

const state: FormState = reactive({
  reason: undefined,
  project_name: undefined,
  order_to_due_date: undefined,
  ordering_date: undefined,
  due_date: undefined,
  delivery_date: undefined,
  company: undefined,
  warehouse: undefined,
  location: undefined,
  assessment_criteria: undefined,
  estimate_price: undefined,
  is_purchase_contract: false,
  is_purchase_jasa: false,
});

const schema = object({
  reason: string().required("Reason Required"),
  project_name: string().required("Project Name Required"),

  order_to_due_date: string().required("Order to due date required"),
  delivery_date: string().required("Delivery Date Required"),
  company: object().required("Company Required"),
  warehouse: object<GeneralResponse>().required("Warehouse Required"),
  location: object().required("Location Required"),
  assessment_criteria: object().required("Assessment Criteria Required"),
  estimate_price: string().required("Estimate Price Required"),
  // attachment: string().required("Attachment Required"),
});

const dateRangePicker = ref<DatePickerRangeObject | undefined>();

type Schema = InferType<typeof schema>;

// Estimate price
const estimatePriceFormatted = ref("");

const priceFormat = (value: string) => {
  // Hanya izinkan angka
  const rawValue = value.replace(/\D/g, "");

  // Format nilai ke mata uang
  estimatePriceFormatted.value = currencyFormat(+rawValue);

  state.estimate_price = +rawValue;
};

const toast = useToast();

const modal = useModal();

const onSubmit = async (event: FormSubmitEvent<FormState>) => {
  // Do something with event.data
  // console.log(event.data);
  try {
    const {
      due_date,
      ordering_date,
      delivery_date,
      warehouse,
      assessment_criteria,
    } = event.data;

    const products = getCheckedProducts(checkoutItems.value);

    const productItems = products.map((product) => {
      const {} = product;

      return {
        product_id: product.product?.id,
        product_qty: product.qty,
        vendor_id: product.vendor?.id,
        product_uom_id: product.product?.uom_id?.id,
        schedule_date: "2023-11-27",
        account_analytic_id: product.analytic_project?.id,
        analytic_location_tag_id: product.analytic_location?.id,
        analytic_category_tag_id: product.analytic_category?.id,
        analytic_tag_id: product?.analytic_unit?.id,
        analytic_type_tag_id: product?.analytic_type?.id,
        analytic_department_tag_id: product.analytic_department?.id,
        price_unit: product?.unit_price,
        price_range: product?.unit_price,
        picking_type_id: warehouse?.id,
      };
    });

    const formResult = {
      date_end: formatToUTC(new Date()),
      ordering_date: ordering_date,
      due_date: due_date,
      schedule_date: delivery_date,
      picking_type_id: warehouse?.id,
      kriteria_rfq_id: assessment_criteria?.id,
      hps: state.estimate_price,
      description: state.reason,
      line_ids: productItems,
    };

    console.log(JSON.stringify(formResult));

    const response = await cretePR(formResult);

    // toast.add({
    //   title: response.data?.message,
    //   color: "green",
    // });

    modal.open(UiModalAlert, {
      description: response.data?.message,
      confirmLabel: "Kembali",
      onConfirm: (value) => {
        modal.close();

        navigateTo("/");
      },
    });
  } catch (error) {
    toast.add({
      title: `${error}`,
      color: "red",
    });
  }
};

// Date Picker
import { UiModalAlert } from "#components";
import { format } from "date-fns";

const deliveryDate = ref<Date | undefined>();

const deliveryDateFormat = computed(() => {
  if (deliveryDate.value === undefined) return undefined;

  return format(deliveryDate.value, "d MMM, yyy");
});

const { getSelectionData, cretePR } = usePurchaseRequisition();

// Company Selection
const companyLoading = ref(false);
const companySelected = ref<GeneralResponse>();

const companySearch = async (q: string) => {
  companyLoading.value = true;

  const response = await getSelectionData(SelectionType.Company, q);

  const data = response?.data?.company_ids ?? [];

  companyLoading.value = false;
  return data;
};

// Warehouse Selection
const warehouseLoading = ref(false);
const warehouseSelected = ref<GeneralResponse>();

const warehouseSearch = async (q: string) => {
  warehouseLoading.value = true;

  const response = await getSelectionData(SelectionType.Warehouse, q);

  const data = response?.data?.warehouse_ids ?? [];

  warehouseLoading.value = false;
  return data;
};

// Location Selection
const locationLoading = ref(false);
const locationSelected = ref<GeneralResponse>();

const locationSearch = async (q: string) => {
  locationLoading.value = true;

  const response = await getSelectionData(SelectionType.AnalyticLocation, q);

  const data = response?.data?.analytic_location_ids ?? [];

  locationLoading.value = false;
  return data;
};

// Location Selection
const criteriaLoading = ref(false);
const criteriaSelected = ref<GeneralResponse>();

const criteriaSearch = async (q: string) => {
  criteriaLoading.value = true;

  const response = await getSelectionData(SelectionType.RfqCriteria, q);

  const data = response?.data?.kriteria_rfq_ids ?? [];

  criteriaLoading.value = false;
  return data;
};

const parseDateRangeToDateObjects = (dateRangeString: string) => {
  const [start, end] = dateRangeString
    .split(" - ")
    .map((date) => new Date(date.trim()));

  return {
    start, // Tipe
    end, // Tipe
  };
};

const generateReasonDescription = computed<string>(() => {
  const isPurchaseContractResult: string = state.is_purchase_contract
    ? "Purchase Contract"
    : "Purcahase Non Contract";

  const companyResult = state.company?.name ?? "-";
  const projectNameResult = state.project_name ?? "-";

  let orderDateResult: string = "-";

  if (state.order_to_due_date !== undefined) {
    const parse = parseDateRangeToDateObjects(state.order_to_due_date);

    const dateFormat = dateRangeFormat(parse);

    state.ordering_date = format(parse.start, "y-MM-dd");
    state.due_date = format(parse.end, "y-MM-dd");

    orderDateResult = dateFormat;
  }

  const deliveryDateResult = deliveryDate.value
    ? format(deliveryDate.value, "d MMM y")
    : "-";

  return `Is ${isPurchaseContractResult}, ${companyResult}, ${projectNameResult}, ${orderDateResult}, Delivery : ${deliveryDateResult}, ${state.location?.name}`;
});

const dateRangeFormat = (date: DatePickerRangeObject): string => {
  const isSameMonth =
    format(date.start as Date, "MMM y") === format(date.end as Date, "MMM y");

  if (isSameMonth) {
    return `${format(date.start as Date, "d MMM")} - ${format(
      date.end as Date,
      "d MMM y"
    )}`;
  }

  return `${format(date.start as Date, "d MMM y")} - ${format(
    date.end as Date,
    "d MMM y"
  )}`;
};

watch(state, () => {
  state.reason = generateReasonDescription.value;

  console.log("state");
  console.log(typeof state.order_to_due_date);
});

// Testing
onMounted(() => {
  // state.delivery_date = format(new Date(), "y-MM-dd");

  companySearch("").then((data) => {
    companySelected.value = {
      id: data[0].id,
      name: data[0].name,
    };

    state.company = companySelected.value;
  });

  warehouseSearch("").then((data) => {
    warehouseSelected.value = {
      id: data[0].id,
      name: data[0].name,
    };

    state.warehouse = warehouseSelected.value;
  });

  locationSearch("").then((data) => {
    locationSelected.value = {
      id: data[0].id,
      name: data[0].name,
    };

    state.location = locationSelected.value;
  });

  criteriaSearch("").then((data) => {
    criteriaSelected.value = {
      id: data[0].id,
      name: data[0].name,
    };

    state.assessment_criteria = criteriaSelected.value;
  });

  priceFormat("2000");
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

          <UFormGroup
            label="Order date to due date"
            name="order_to_due_date"
            required
          >
            <!-- <UiDateRangePicker
              v-model="dateRangePicker"
              placeholder="Enter order date until due date"
              @update:model-value="
                (date: DatePickerRangeObject) => {
                  state.ordering_date = format(date.start as Date, 'y-MM-dd');
                  state.due_date = format(date.end as Date, 'y-MM-dd');

                  state.order_to_due_date = state.ordering_date;

                  console.log('change date');
                  console.log(date);
                  
                }
              "
              block
            /> -->

            <UiDateRangePickerTest
              v-model="state.order_to_due_date"
              placeholder="Select order date until due date"
            />
          </UFormGroup>

          <UFormGroup label="Delivery Date" name="delivery_date" required>
            <UPopover :popper="{ placement: 'bottom-start' }">
              <UInput
                v-model="deliveryDateFormat"
                class="w-full"
                placeholder="Select delivery date"
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

          <UFormGroup
            label="Company"
            name="company"
            class="col-span-12"
            required
          >
            <USelectMenu
              v-model="companySelected"
              :loading="companyLoading"
              :searchable="companySearch"
              placeholder="Select a company"
              searchable-placeholder="Search a company..."
              trailing
              option-attribute="name"
              by="id"
              @change="state.company = companySelected"
            />
          </UFormGroup>

          <UFormGroup
            label="Warehouse"
            name="warehouse"
            class="col-span-12"
            required
          >
            <USelectMenu
              v-model="warehouseSelected"
              :loading="warehouseLoading"
              :searchable="warehouseSearch"
              placeholder="Select a warehouse"
              searchable-placeholder="Search a warehouse..."
              trailing
              option-attribute="name"
              by="id"
              @change="state.warehouse = warehouseSelected"
            />
          </UFormGroup>

          <UFormGroup
            label="Location"
            name="location"
            class="col-span-12"
            required
          >
            <USelectMenu
              v-model="locationSelected"
              :loading="locationLoading"
              :searchable="locationSearch"
              placeholder="Select a location"
              searchable-placeholder="Search a location..."
              trailing
              option-attribute="name"
              by="id"
              @change="state.location = locationSelected"
            />
          </UFormGroup>

          <UFormGroup
            label="Assessment Criteria"
            name="assessment_criteria"
            class="col-span-12"
            required
          >
            <USelectMenu
              v-model="criteriaSelected"
              :loading="criteriaLoading"
              :searchable="criteriaSearch"
              placeholder="Select a criteria"
              searchable-placeholder="Search a criteria..."
              trailing
              option-attribute="name"
              by="id"
              @change="state.assessment_criteria = criteriaSelected"
            />
          </UFormGroup>

          <UFormGroup label="Estimate Price" name="estimate_price" required>
            <UInput
              placeholder="Insert estimate price..."
              v-model="estimatePriceFormatted"
              @keyup="priceFormat(estimatePriceFormatted)"
            />
          </UFormGroup>

          <UFormGroup label="Purchase Type">
            <UCheckbox
              label="Is Purchase Contract?"
              v-model="state.is_purchase_contract"
            />
          </UFormGroup>
          <UFormGroup>
            <UCheckbox
              label="Is Purchase Jasa?"
              v-model="state.is_purchase_jasa"
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

          <UDivider />

          <UFormGroup label="Attachment" name="attachments" required>
            <UiDragDropFile />
          </UFormGroup>

          <UButton type="submit" size="lg" block> Submit </UButton>
        </UForm>
      </div>
    </template>
  </UCard>
</template>
