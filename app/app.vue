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
      <section class="flex-col justify-center p-24">
        <div v-if="user.repositories" class="card bg-base-200 shadow-xl my-4" v-for="repo in user.repositories.edges" :key="repo.name">
            <RepositoryCard :repo="repo.node" />
        </div>
      </section>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'

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
    // await useAsyncGql(...) returns an object that usually contains `data`
    // The `data` may be a ref or a plain object depending on the module version.
    // We handle both cases robustly below.
    const result = await useAsyncGql('getUser', { login: login.value })

    // result.data might be a ref (result.data.value) or plain object (result.data)
    const raw = result?.data?.value ?? result?.data ?? null

    user.value = raw?.user ?? null
  } catch (err) {
    // capture and keep error reactive
    error.value = err
    console.error('fetchUser error', err)
  } finally {
    pending.value = false
  }
}

// initial fetch on mount
onMounted(() => fetchUser())
</script>

