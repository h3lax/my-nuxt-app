<template>
    <section class="flex justify-center bg-base-200 p-4">
        <div class="stats shadow">

            <Stat :s="commits"/>
            <Stat :s="repos"/>

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
                        d="M12 9.75A1 1 0 0012 2.25M12 21.75C14.75 21.75 17.202 21.123 19.5 20.1 19.388 16.97 15.242 13.298 12 13.25"
                        ></path>
                    </svg>
                </div>
                <div class="stat-figure text-accent-content">
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
                        d="M12 9.75A1 1 0 0112 2.25M12 21.75C9.25 21.75 6.8 21.123 4.5 20.1 4.5 16.97 8.75 13.298 12 13.25"
                        ></path>
                    </svg>
                </div>
                <div class="stat-title text-center">
                    Follo
                </div>
                <div class="stat-value">
                    <span class="w-2 inline-block"></span>
                    <span class="text-accent-content">{{ user?.totalFollowing }}</span>
                    <span class="w-4 inline-block text-base-content/30"></span>
                    <span class="text-secondary">{{ user?.totalFollowers }}</span>
                </div>
                <div class="stat-desc">
                    <span class="text-accent-content">wing</span>
                    <span class="w-4 inline-block"></span>
                    <span class="text-secondary">wers</span>
                </div>
            </div>
        </div>
    </section>
</template>

<script lang="ts" setup>
    import type { User, Stat } from '~/types/github'

    const props = defineProps<{
        user: User | null
    }>()

    const commits : Stat = {
        d: "M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z",
        textColor: "text-primary",
        topText: "Commits",
        lowerText: "this year",
        value: props.user?.totalContributions ?? "0"
    }

    const repos : Stat = {
        d: "M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25",
        textColor: "text-accent",
        topText: "Repos",
        lowerText: "total",
        value: props.user?.totalRepos ?? "0"
    }

    

</script>