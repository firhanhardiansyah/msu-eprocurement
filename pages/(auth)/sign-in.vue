<script setup lang="ts">
import type { FormErrorEvent, FormSubmitEvent } from "#ui/types";
import { object, string, type InferType } from "yup";

definePageMeta({
  layout: false,
});

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

const onSubmit = async (event: FormSubmitEvent<Schema>) => {
  isLoading.value = true;

  try {
    await signIn({
      username: event.data.email,
      password: event.data.password,
    });

    return navigateTo("/");
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
  } finally {
    isLoading.value = false;
  }
};

const onError = async (event: FormErrorEvent) => {
  const element = document.getElementById(event.errors[0].id);
  element?.focus();
  element?.scrollIntoView({ behavior: "smooth", block: "center" });
};

const testCookie = () => {
  // document.cookie =
  const cookies = document.cookie.split(";");

  for (const cookie of cookies) {
    const eqPos = cookie.indexOf("=");

    const name = eqPos > -1 ? cookie.substring(0, eqPos) : cookie;

    console.log("cookies");
    console.log(name);
    document.cookie =
      "username=John Doe; expires=Wed, 24 Oct 2024 01:00:00 UTC; path=/";

    // document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT';
  }
};

const user = useCookie("userInfo", {
  // Here we're using the default option to assign a default value for the cookie
  default: () => ({ score: 0 }),
  // And here we say that we don't want to watch for data changes in the cookie ref
  watch: false,
});

if (user.value && user.value !== null) {
  user.value.score++; // userInfo cookie not updated with this change
}
</script>

<template>
  <UButton label="cookie" @click="testCookie()" />
  <ClientOnly>
    <div>User score: {{ user?.score }}</div>
  </ClientOnly>
  <NuxtLayout name="auth">
    <UCard>
      <div class="flex flex-col gap-2 items-start">
        <UiLogo />
        <article class="prose prose-slate">
          <h3 class="mb-0">Login</h3>
          <p class="text-slate-400">
            Enter your credentials to access your account.
          </p>
        </article>

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
  </NuxtLayout>
</template>
