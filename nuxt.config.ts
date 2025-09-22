import { defineNuxtConfig } from 'nuxt/config'
import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  modules: ['nuxt-graphql-client'],
  compatibilityDate: '2025-09-19',
  css: ['~/assets/app.css'],
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
  'graphql-client': {
    watch: true,
    autoImport: true,
    functionPrefix: 'Gql',
    documentPaths: ['./gql'],
    preferGETQueries: false,
    codegen: {
            silent: true,
            skipTypename: true,
            useTypeImports: true,
            dedupeFragments: true,
            onlyOperationTypes: true,
            avoidOptionals: false,
            disableOnBuild: false,
            maybeValue: 'T | null',
            scalars: {}
        },
    clients: {
        default: {
            host: 'https://api.github.com/graphql',

            token: {
                type: 'Bearer',
                name: 'Authorization',
                value: process.env.GITHUB_TOKEN
            },

            headers: {
                'Authorization': `Bearer ${process.env.GITHUB_TOKEN}`,
                'User-Agent': 'MyNuxtApp'
        }
        }
    }
  }
})
