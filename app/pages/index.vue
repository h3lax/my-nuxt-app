<template>
  <div>
    <h1 class="text-6xl text-center font-bold m-16">Wanna check a github?</h1>

    <section class="flex justify-center p-48">
      <fieldset class="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
        <legend class="fieldset-legend">Check someone</legend>
        <input
          type="text"
          class="input"
          v-model="login"
          placeholder="Enter GitHub login"
          @keyup.enter="goToUser"
        />
      </fieldset>
    </section>
  </div>
</template>

<script setup lang="ts">
    const { login, goToUser } = useLogin()
</script>
