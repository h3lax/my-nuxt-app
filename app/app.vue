<template>
  <div>
    <NuxtRouteAnnouncer />
    <h1 class="text-6xl text-center font-bold" >Wanna check a github?</h1>

    <fieldset class="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
      <legend class="fieldset-legend">Check someone</legend>
      <input type="text" class="input"
        v-model="login"
        placeholder="Enter GitHub login"
        @keyup.enter="fetchUser"
      />
      <p class="label">fill the login of the account you want to revue</p>
    </fieldset>

    <div v-if="pending">Checking right now ...</div>

    <div v-else-if="error" class="error">
      Error: <pre>{{ extractError(error) }}</pre>
    </div>

    <div v-else-if="user">
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
          </div>
        </div>
      </div>
      <div class="repositories">
        <ul>
          <li v-for="repo in user.repositories.edges" :key="repo.name">
            <h3>{{ repo.node.name }}</h3>
            <p>{{ repo.node.description }}</p>
            <p v-if="repo.node.primaryLanguage">stack principale : {{ repo.node.primaryLanguage.name }}</p>
            <a href="repo.node.url">{{ repo.node.url }}</a>
            
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'

const login = ref('h3lax')       // reactive input
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

<style>
.error {
  color: white;
  margin: 1em 0;
  background-color: brown;
  padding: 20px;
}
</style>
