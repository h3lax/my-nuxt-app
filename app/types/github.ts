export interface Language {
  name: string
  color: string
}

export interface Repository {
  name: string
  description?: string
  url: string
  updatedAt: string
  stargazerCount: number
  forkCount: number
  primaryLanguage?: Language | null
  totalCommits: number
}

export interface User {
  login: string
  name?: string
  avatarUrl: string
  bio?: string

  // flattened "totals"
  totalFollowing: number
  totalFollowers: number
  totalContributions: number
  totalStars: number
  totalRepos: number

  // direct list of repos
  repositories: Repository[]
}