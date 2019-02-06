import getText from './helpers/getText'
import getAnnList from './helpers/getAnnList'
import parseAnn from './helpers/parseAnn'
import TaskQueue from './helpers/TaskQueue'
import { BAN_INDEX } from './config'


/**
 * @description Fetch ban announcements.
 * @param maxAnnouncement Optional. Max number of announcements to be fetched.
 * @param maxConcurrency Optional. Max number of concurrent tasks.
 * @param indexUrl Optional. URL of ban announcements index.
 */
export async function fetch(
  maxAnnouncement: number = 0,
  maxConcurrency: number = 5,
  indexUrl: string = BAN_INDEX
) {
  let html: string = await getText(indexUrl)
  let tasks = []
  let announcements: Announcement[] = []
  let i = 0
  for(let annMeta of getAnnList(html)) {
    // Push task
    announcements.push(annMeta)
    let index = i
    tasks.push(async function() {
      const text = await getText(annMeta.url)
      announcements[index].bans = parseAnn(text)
    })
    i++
    if(maxAnnouncement && i >= maxAnnouncement) break
  }
  // Start task
  let queue = new TaskQueue<void>(tasks, maxConcurrency)
  await queue.start()
  return {
    anns: announcements,
    errs: queue.errs
  }
}

export default fetch