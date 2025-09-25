<template>
      <div class="card-body bg-base flex-row justify-between gap-4 h-48 items-center">
        <div class="w-3/12">
          <h3 class="card-title text-lg">
          <a :href="repo?.url" target="_blank" class="link link-hover">
              {{ repo?.name }}
          </a>
          </h3>
          <p class="text-sm text-gray-400">{{ repo?.description }}</p>

          <div class="flex items-center gap-4 mt-2">
            <span v-if="repo?.primaryLanguage" class="badge" :style="{ backgroundColor: repo.primaryLanguage.color }">
                {{ repo.primaryLanguage.name }}
            </span>
          </div>
        </div>
        <div class="w-1/12 p-8">
          <div v-html="getTheGoodLogo(repo?.primaryLanguage?.name ?? '')"></div>
        </div>
        <div class="stats shadow w-7/12">
          <Stat :s="lastUpdate" />
          <Stat :s="stars" />
          <Stat :s="forks" />
          <Stat :s="commits" />
        </div>
      </div>
</template>

<script lang="ts" setup>
  import type { Language, Repository, Stat } from '~/types/github'
  import { getTheGoodLogo } from '~/services/getTheGoodLogo';

  const props = defineProps<{
    repo: Repository | null
  }>()

  function formatDate(iso: string | undefined) {
    if (!iso) return "—"
    return new Date(iso).toLocaleDateString("en-US", {
      year: "2-digit",
      month: "short",
      day: "numeric",
    })
  }

  function timeAgo(iso: string | undefined) {
    if (!iso) return "—"
    const diff = (Date.now() - new Date(iso).getTime()) / 1000
    const days = Math.floor(diff / 86400)
    if (days < 1) return "today"
    if (days === 1) return "yesterday"
    return `${days} days`
  }

  const stars : Stat = {
    d: "M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z",
    textColor: "text-secondary",
    topText: "Stars",
    lowerText: "on the repo",
    value: props.repo?.stargazerCount ?? "0"
  }

  const lastUpdate : Stat = {
    d: "M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99",
    textColor: "text-accent-content",
    topText: "Last Update",
    lowerText: formatDate(props.repo?.updatedAt),
    value: timeAgo(props.repo?.updatedAt)
  }

  const forks : Stat = {
    d: "M4.603 5.347l5.653 7.11a10.347 10.347 0 0 1 .477-1.022L5.397 4.741zM18.244 5H15V4h5v5h-1V5.656l-4.872 5.265A7.91 7.91 0 0 0 12 16.294V21h-1v-4.706a8.908 8.908 0 0 1 2.394-6.051z",
    textColor: "text-accent",
    topText: "Forks",
    lowerText: "of the proj",
    value: props.repo?.forkCount ?? "0"
  }

  const commits : Stat = {
    d: "M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z",
    textColor: "text-primary",
    topText: "Commits",
    lowerText: "global",
    value: props.repo?.totalCommits ?? "0"
  }

</script>