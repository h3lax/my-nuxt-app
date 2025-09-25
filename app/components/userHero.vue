<template>
    <div class="hero bg-base-200 min-h-64 pt-32">
        <div class="hero-content flex-col lg:flex-row">
          <img
            :src="user.avatarUrl"
            class="max-w-sm rounded-lg shadow-2xl"
            :alt="user.login" width="150"
          />
          <div class="ml-4">
            <span class="inline-block text-nowrap">
                <h2><span class="text-5xl font-bold mr-4">{{ user.login }}</span><span class="text-3xl">| {{ user.name }}</span></h2>
            </span>              
            <p class="text-sm mt-4">
              {{ user.bio }}
            </p>
          </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import type { User } from '~/types/github'

defineProps<{
  user: User | null
}>()

</script>