export interface Language {
  name: string
  color: string
}

export interface Repository {
  name: string
  description?: string
  url: string
  updatedAt: string
  stargazerCount: string
  forkCount: string
  primaryLanguage?: Language | null
  totalCommits: string
}

export interface User {
  login: string
  name?: string
  avatarUrl: string
  bio?: string
  url?:string,

  // flattened "totals"
  totalFollowing: string
  totalFollowers: string
  totalContributions: string
  totalStars: string
  totalRepos: string

  // direct list of repos
  repositories: Repository[]
}

export interface Stat {
  d: string,
  textColor: string,
  topText: string,
  lowerText: string,
  value: string,
}