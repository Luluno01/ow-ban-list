# ow-ban-list

Overwatch ban list (China) fetcher

## Usage

```Typescript
import fetch from 'ow-ban-list'


(async function() {
  let { anns, errs } = await fetch()
  // ...
})()
```

The returned announcements `ann` would look like

```JSON
[
  {
    "name": "针对《守望先锋》外挂行为的处罚公告（2月1日更新）",
    "url": "http://bbs.ow.blizzard.cn/forum.php?mod=viewthread&tid=830941",
    "bans": [
      {
        "header": "本次永久封停处罚名单",
        "battleTags": [Array of banned Battle Tags]
      },
      // ...
    ]
  },
  // ...
]
```

If there are errors during the fetching process, the errors will be recorded in `errs`, which looks like

```JSON
{
  "5": [FetchError],
  // ...
}
```

## Types

See `src/global.d.ts`.