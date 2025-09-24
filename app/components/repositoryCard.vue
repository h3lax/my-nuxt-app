<template>
      <div class="card-body">
          <h3 class="card-title text-lg">
          <a :href="repo.url" target="_blank" class="link link-primary">
              {{ repo.name }}
          </a>
          </h3>
          <p class="text-sm text-gray-400">{{ repo.description }}</p>

          <div class="flex items-center gap-4 mt-2">
            <span v-if="repo.primaryLanguage" class="badge" :style="{ backgroundColor: repo.primaryLanguage.color }">
                {{ repo.primaryLanguage.name }}
            </span>
            <span class="badge badge-outline">⭐ {{ repo.stargazerCount }}</span>
            <span class="badge badge-outline">🍴 {{ repo.forkCount }}</span>
          </div>
      </div>
</template>

<script lang="ts" setup>

  interface Language {
    name: string
    color: string
  }

  interface Repository {
    name: string
    description?: string
    url: string
    stargazerCount: number
    forkCount: number
    primaryLanguage?: Language | null
  }

  defineProps<{
    repo: Repository | null
  }>()

</script>