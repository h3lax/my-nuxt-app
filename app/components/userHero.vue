<template>
    <div class="hero bg-base-200 min-h-128">
        <div class="hero-content flex-col lg:flex-row">
          <img
            :src="user.avatarUrl"
            class="max-w-sm rounded-lg shadow-2xl"
            :alt="user.login" width="150"
          />
          <div>
            <h2 class="text-5xl font-bold">{{ user.login }}</h2>
            <p class="py-6">
              {{ user.name }}
            </p>
            <p>
              {{ user.bio }}
            </p>
          </div>
        </div>
      </div>
</template>

<script lang="ts" setup>
interface User {
  login: string
  name?: string
  bio?: string
  avatarUrl: string
}


defineProps<{
  user: User | null
}>()

</script>