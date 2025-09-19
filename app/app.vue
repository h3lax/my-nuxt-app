<template>
  <div>
    <NuxtRouteAnnouncer />
    <h2>Wanna check a github?</h2>

    <input
      v-model="login"
      placeholder="Enter GitHub login"
      @keyup.enter="fetchUser"
    />

    <div v-if="pending">Checking right now ...</div>

    <div v-else-if="error" class="error">
      Error: <pre>{{ extractError(error) }}</pre>
    </div>

    <div v-else-if="user">
      <p><strong>Login:</strong> {{ user.login }}</p>
      <p><strong>Name:</strong> {{ user.name }}</p>
      <p><strong>Bio:</strong> {{ user.bio }}</p>
      <img :src="user.avatarUrl" :alt="user.login" width="150" />
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
