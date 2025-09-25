<template>
    <div class="navbar bg-base-100 shadow-sm pl-4 pr-4 fixed z-100">
        <div class="flex-1">
            <NuxtLink to="/" class="btn btn-ghost text-xl">Wanna check a github?</NuxtLink>
        </div>
        <div class="mr-16">
            <input type="checkbox" value="valentine" class="toggle theme-controller" />
        </div>
        <div class="flex-none">
            <input type="text" class="input" placeholder="Enter GitHub login"
            @keyup.enter="goToUser"
            v-model="login"
            >
        </div>
    </div>
</template>

<script lang="ts" setup>
    const { login, goToUser } = useLogin()
</script>