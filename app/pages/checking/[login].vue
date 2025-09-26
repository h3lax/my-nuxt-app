<template>
    <div class="text-6xl text-center font-bold m-16" v-if="pending">Checking right now ...</div>

    <div v-else-if="error" class="error">
      Error: <pre>{{ extractError(error) }}</pre>
    </div>

    <div v-else-if="user">
        <NavBar />
        <UserHero :user="user"/>
        <StatBar :user="user"/>
        <section class="flex-col justify-center p-24">
        <div v-if="user.repositories" class="card bg-base-200 shadow-xl my-4" v-for="repo in user.repositories" :key="repo.name">
            <RepositoryCard :repo="repo" />
        </div>
        </section>
    </div>

</template>

<script setup lang="ts">
    import type { User, Repository } from '~/types/github'
    import { useRoute } from 'vue-router'

    const route = useRoute()

    const showMe = () => console.log("result")

    // Pour Nuxt attention à utiliser pluôt que OnMounted useAsyncData (runs SSR + CSR)
    const { data: user, pending, error } = await useAsyncData(
        () => `user-${route.params.login}`, // ???
        async () => {
            const login = route.params.login as string
            if (!login) return null

            const result = await useAsyncGql('getUser', { login })
            const raw = result?.data?.value ?? result?.data ?? null
            const u = raw?.user

            if (!u) return null

            return {
                login: u.login,
                name: u.name,
                url: u.url,
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
                    primaryLanguage: edge.node.primaryLanguage,
                    totalCommits: edge.node.defaultBranchRef.target.history.totalCount
                })) ?? []
            }
        }
    )
</script>