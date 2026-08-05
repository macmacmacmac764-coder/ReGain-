Export interface FocusSession {
  Id: string
  startedAt: number
  endedAt?: number
  duration: number
  sitesBlocked: number
  completed: boolean
}

Export interface BlockedSite {
  Id: string
  url: string
  label: string
  enabled: boolean
}
