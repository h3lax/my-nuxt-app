<template>
  <div>
    <NuxtRouteAnnouncer />
    <h1 class="text-6xl text-center font-bold m-16" >Wanna check a github?</h1>
    <section class="flex justify-center p-48">
      <fieldset class="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
        <legend class="fieldset-legend">Check someone</legend>
        <input type="text" class="input"
          v-model="login"
          placeholder="Enter GitHub login"
          @keyup.enter="fetchUser"
        />
      </fieldset>
    </section>

    <div v-if="pending">Checking right now ...</div>

    <div v-else-if="error" class="error">
      Error: <pre>{{ extractError(error) }}</pre>
    </div>

    <div v-else-if="user">
      <UserHero :user="user"/>
      <StatBar :user="user"/>
      <section class="flex-col justify-center p-24">
        <div v-if="user.repositories" class="card bg-base-200 shadow-xl my-4" v-for="repo in user.repositories" :key="repo.name">
            <RepositoryCard :repo="repo" />
        </div>
      </section>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ref, onMounted } from 'vue'
  import type { User, Repository } from '~/types/github'

  const login = ref('')       // reactive input
  const user = ref<any | null>(null) // only one data ref used by template
  const pending = ref(false)
  const error = ref<any | null>(null)

  const extractError = (err: any) => {
    if (!err) return null
    if (err.gqlErrors?.length) return err.gqlErrors.map((e: any) => e.message).join(', ')
    return err.message || JSON.stringify(err)
  }

  const fetchUser = async () => {
    pending.value = true
    error.value = null
    user.value = null

    try {
      const result = await useAsyncGql('getUser', { login: login.value })
      const raw = result?.data?.value ?? result?.data ?? null
      const u = raw?.user

      if (u) {
        user.value = {
          login: u.login,
          name: u.name,
          avatarUrl: u.avatarUrl,
          bio: u.bio,

          totalFollowing: u.following.totalCount,
          totalContributions: u.contributionsCollection.totalCommitContributions,
          totalStars: u.starredRepositories.totalCount,
          totalRepos: u.repositories.totalCount,
          totalFollowers: u.followers.totalCount,

          repositories: u.repositories?.edges?.map((edge: any): Repository => ({
            name: edge.node.name,
            description: edge.node.description,
            url: edge.node.url,
            updatedAt: edge.node.updatedAt,
            stargazerCount: edge.node.stargazerCount,
            forkCount: edge.node.forkCount,
            primaryLanguage: edge.node.primaryLanguage
          })) ?? []
        } as User
      }
      console.log({"User": u})
    } catch (err) {
      error.value = err
      console.error('fetchUser error', err)
    } finally {
      pending.value = false
    }
  }

  // initial fetch on mount
  onMounted(() => fetchUser())
</script>

