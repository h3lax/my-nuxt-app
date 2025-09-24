<template>
      <div class="card-body flex-row justify-between">
        <div>
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
        <div class="stats-shadow">
          <div class="stat">
                <div class="stat-figure text-secondary">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        class="inline-block h-8 w-8 stroke-current"
                    >
                        <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                    </svg>
                </div>
                <div class="stat-title">Commits</div>
                <div class="stat-value text-secondary">{{ repo.totalCommits }}</div>
                <div class="stat-desc">this year</div> 
            </div>
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