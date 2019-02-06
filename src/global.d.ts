type BanBlock = {
  header: string
  battleTags: string[]
}

type Announcement = {
  name: string
  url: string
  bans?: BanBlock[]
}

type BanRecord = {
  battleTag: string
  header: string
  url: string
  announcementName: string
}