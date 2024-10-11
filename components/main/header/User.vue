<script setup lang="ts">
const { isAuthenticated, user, signOut } = useAuth();
</script>

<template>
  <!-- Hidden in mobile -->
  <div v-if="!isAuthenticated" class="hidden lg:flex">
    <div class="border-l-[1px] pl-2">
      <div class="flex gap-2">
        <UButton label="Sign In" color="gray" @click="navigateTo('/sign-in')" />
        <UButton
          label="Sign Up"
          color="primary"
          variant="solid"
          @click="navigateTo('/sign-up')"
        />
      </div>
    </div>
  </div>

  <div v-if="!isAuthenticated" class="flex lg:hidden">
    <UPopover
      mode="hover"
      :popper="{
        placement: 'top-end',
      }"
    >
      <UButton icon="i-heroicons-arrow-right-end-on-rectangle" color="gray" />

      <template #panel>
        <div class="py-2">
          <UVerticalNavigation
            :links="[
              [
                {
                  label: 'Sign In',
                  icon: 'i-heroicons-arrow-right-start-on-rectangle',
                  to: '/sign-in',
                },
              ],
              [
                {
                  label: 'Sign Up',
                  icon: 'i-heroicons-rocket-launch',
                  to: '/sign-up',
                },
              ],
            ]"
          />
        </div>
      </template>
    </UPopover>
  </div>

  <div v-if="isAuthenticated">
    <UPopover
      mode="hover"
      :popper="{
        placement: 'top-end',
      }"
    >
      <UButton icon="i-heroicons-user-circle" color="gray" />

      <template #panel>
        <div class="py-2">
          <div v-if="user === null" class="flex flex-col gap-2 px-2">
            <USkeleton class="h-4 w-[250px]" />
            <USkeleton class="h-4 w-[200px]" />
          </div>
          <template v-else>
            <UVerticalNavigation
              :links="[
                [
                  {
                    label: user?.res_user?.name ?? 'User',
                    avatar: {
                      src: 'https://avatars.githubusercontent.com/u/739984?v=4',
                    },
                  },
                ],
                [
                  {
                    label: 'Keluar',
                    icon: 'i-heroicons-arrow-right-start-on-rectangle',
                    click: () => signOut(),
                  },
                ],
              ]"
            />
          </template>
        </div>
      </template>
    </UPopover>
  </div>
</template>
