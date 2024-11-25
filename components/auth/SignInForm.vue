<script setup lang="ts">
import type { FormErrorEvent, FormSubmitEvent } from "#ui/types";
import { object, string, type InferType } from "yup";

const toast = useToast();

const { signIn } = useAuth();

const schema = object({
  email: string().required("Required"),
  password: string().required("Required"),
});

type Schema = InferType<typeof schema>;

const state = reactive({
  email: undefined,
  password: undefined,
});

const isLoading = ref(false);
const isShowPassword = ref(false);

const emits = defineEmits(["validation"]);

const onSubmit = async (event: FormSubmitEvent<Schema>) => {
  isLoading.value = true;

  try {
    await signIn({
      username: event.data.email,
      password: event.data.password,
    });

    emits("validation", true);

    // return navigateTo("/");
  } catch (error: any) {
    let errorMessage = (error?.data as ApiResponseError)?.error?.message as any;

    let firstKey: string | undefined;
    let firstValue: any;

    for (const key in errorMessage) {
      if (errorMessage.hasOwnProperty(key)) {
        firstKey = key;
        firstValue = errorMessage[key];
        break;
      }
    }

    toast.add({ title: firstValue });

    emits("validation", false);
  } finally {
    isLoading.value = false;
  }
};

const onError = async (event: FormErrorEvent) => {
  const element = document.getElementById(event.errors[0].id);
  element?.focus();
  element?.scrollIntoView({ behavior: "smooth", block: "center" });
};
</script>

<template>
  <UCard>
    <div class="flex flex-col gap-2 items-start">
      <article class="mb-2 w-full">
        <UiLogo />
        <div>
          <h3 class="text-2xl text-gray-900 dark:text-white font-bold">
            Login
          </h3>
          <p class="text-gray-500 dark:text-gray-400 mt-1">
            Enter your credentials to access your account.
          </p>
        </div>
      </article>

      <!-- Form -->
      <UForm
        :schema="schema"
        :state="state"
        class="space-y-4 w-full"
        @submit="onSubmit"
        @error="onError"
      >
        <UFormGroup label="Email" name="email" required>
          <UInput
            v-model="state.email"
            placeholder="Enter your email"
            icon="i-heroicons-envelope"
            size="lg"
            color="gray"
          />
        </UFormGroup>

        <UFormGroup label="Password" name="password" required>
          <UInput
            v-model="state.password"
            autocomplete="off"
            placeholder="Enter your password"
            icon="i-heroicons-lock-closed"
            :type="isShowPassword ? 'text' : 'password'"
            size="lg"
            color="gray"
            :ui="{ icon: { trailing: { pointer: '' } } }"
          >
            <template #trailing>
              <UButton
                variant="ghost"
                class="text-gray-400"
                :icon="
                  isShowPassword ? 'i-heroicons-eye' : 'i-heroicons-eye-slash'
                "
                :padded="false"
                @click="isShowPassword = !isShowPassword"
              />
            </template>
          </UInput>
        </UFormGroup>

        <UButton
          block
          type="submit"
          :loading="isLoading"
          size="lg"
          label="Sign In"
        />
      </UForm>
    </div>
  </UCard>
</template>
