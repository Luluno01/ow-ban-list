import * as cheerio from 'cheerio'


/**
 * @description Parse announcement text to get ban blocks.
 * @param announcement Announcement text.
 */
export function parseAnn(text: string): BanBlock[] {
  let $ = cheerio.load(text)
  let comments = $('.pcb')
  let res: BanBlock[] = []
  comments.each((index, elem) => {
    let header = $(cheerio('h2', elem)[0]).text()
    let battleTags: string[] = []
    cheerio('blockquote > li', elem).each((index, elem) => {
      battleTags.push($(elem).text())
    })
    if(battleTags.length) res.push({
      header,
      battleTags
    })
  })
  return res
}

export default parseAnn