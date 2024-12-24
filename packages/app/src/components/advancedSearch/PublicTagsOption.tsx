import React from 'react'
import { groupBy } from 'lodash'
import { Typography } from '@mui/material'
import Grid from '@mui/material/Grid2'
import Chip from '@mui/material/Chip'
import { styled } from '@mui/material/styles'

type PublicTag = {
  tag: string
  group: string
}

const AnimePublicTags: PublicTag[] = [
  { tag: 'TV', group: '分类' },
  { tag: 'WEB', group: '分类' },
  { tag: 'OVA', group: '分类' },
  { tag: '剧场版', group: '分类' },
  { tag: '动态漫画', group: '分类' },
  { tag: '其他', group: '分类' },

  { tag: '科幻', group: '类型' },
  { tag: '喜剧', group: '类型' },
  { tag: '百合', group: '类型' },
  { tag: '校园', group: '类型' },
  { tag: '惊悚', group: '类型' },
  { tag: '后宫', group: '类型' },
  { tag: '机战', group: '类型' },
  { tag: '悬疑', group: '类型' },
  { tag: '恋爱', group: '类型' },
  { tag: '奇幻', group: '类型' },
  { tag: '推理', group: '类型' },
  { tag: '运动', group: '类型' },
  { tag: '耽美', group: '类型' },
  { tag: '音乐', group: '类型' },
  { tag: '战斗', group: '类型' },
  { tag: '冒险', group: '类型' },
  { tag: '萌系', group: '类型' },
  { tag: '穿越', group: '类型' },
  { tag: '玄幻', group: '类型' },
  { tag: '乙女', group: '类型' },
  { tag: '恐怖', group: '类型' },
  { tag: '历史', group: '类型' },
  { tag: '日常', group: '类型' },
  { tag: '剧情', group: '类型' },
  { tag: '武侠', group: '类型' },
  { tag: '美食', group: '类型' },
  { tag: '职场', group: '类型' },

  { tag: '原创', group: '来源' },
  { tag: '漫画改', group: '来源' },
  { tag: '游戏改', group: '来源' },
  { tag: '小说改', group: '来源' },

  { tag: '欧美', group: '地区' },
  { tag: '日本', group: '地区' },
  { tag: '美国', group: '地区' },
  { tag: '中国', group: '地区' },
  { tag: '法国', group: '地区' },
  { tag: '韩国', group: '地区' },
  { tag: '俄罗斯', group: '地区' },
  { tag: '英国', group: '地区' },
  { tag: '苏联', group: '地区' },
  { tag: '中国香港', group: '地区' },
  { tag: '捷克', group: '地区' },
  { tag: '中国台湾', group: '地区' },
  { tag: '马来西亚', group: '地区' },

  { tag: 'BL', group: '受众' },
  { tag: 'GL', group: '受众' },
  { tag: '子供向', group: '受众' },
  { tag: '女性向', group: '受众' },
  { tag: '少女向', group: '受众' },
  { tag: '少年向', group: '受众' },
  { tag: '青年向', group: '受众' },
]

const BookPublicTags: PublicTag[] = [
  { tag: '漫画', group: '分类' },
  { tag: '小说', group: '分类' },
  { tag: '画集', group: '分类' },
  { tag: '绘本', group: '分类' },
  { tag: '公式书', group: '分类' },
  { tag: '写真', group: '分类' },
  { tag: '其他', group: '分类' },

  { tag: '系列', group: '系列' },
  { tag: '单行本', group: '系列' },
]

const GamePublicTags: PublicTag[] = [
  { tag: '游戏', group: '分类' },
  { tag: '扩展包', group: '分类' },
  { tag: '软件', group: '分类' },
  { tag: '桌游', group: '分类' },
  { tag: '其他', group: '分类' },

  { tag: 'PC', group: '平台' },
  { tag: 'Web', group: '平台' },
  { tag: 'Windows', group: '平台' },
  { tag: 'Mac', group: '平台' },
  { tag: 'Linux', group: '平台' },
  { tag: 'PS5', group: '平台' },
  { tag: 'Xbox Series X/S', group: '平台' },
  { tag: 'Nintendo Switch', group: '平台' },
  { tag: 'iOS', group: '平台' },
  { tag: 'Android', group: '平台' },
  { tag: 'VR', group: '平台' },
  { tag: 'PSVR2', group: '平台' },
  { tag: '街机', group: '平台' },
  { tag: 'Xbox One', group: '平台' },
  { tag: 'Xbox', group: '平台' },
  { tag: 'Xbox 360', group: '平台' },
  { tag: 'GBA', group: '平台' },
  { tag: 'Wii', group: '平台' },
  { tag: 'NDS', group: '平台' },
  { tag: 'FC', group: '平台' },
  { tag: '3DS', group: '平台' },
  { tag: 'GBC', group: '平台' },
  { tag: 'GB', group: '平台' },
  { tag: 'N64', group: '平台' },
  { tag: 'NGC', group: '平台' },
  { tag: 'SFC', group: '平台' },
  { tag: 'Wii U', group: '平台' },
  { tag: 'PS4', group: '平台' },
  { tag: 'PSVR', group: '平台' },
  { tag: 'PS Vita', group: '平台' },
  { tag: 'PS3', group: '平台' },
  { tag: 'PSP', group: '平台' },
  { tag: 'PS2', group: '平台' },
  { tag: 'PS', group: '平台' },
  { tag: 'Dreamcast', group: '平台' },
  { tag: 'Sega Saturn', group: '平台' },
  { tag: 'MD', group: '平台' },
  { tag: 'Apple II', group: '平台' },
  { tag: 'Amiga', group: '平台' },
  { tag: 'DOS', group: '平台' },
  { tag: 'Symbian', group: '平台' },
  { tag: 'PC98', group: '平台' },
  { tag: 'PCE', group: '平台' },
  { tag: 'PC88', group: '平台' },
  { tag: 'X68000', group: '平台' },

  { tag: 'AAVG', group: '类型' },
  { tag: 'ACT', group: '类型' },
  { tag: 'ADV', group: '类型' },
  { tag: 'ARPG', group: '类型' },
  { tag: 'AVG', group: '类型' },
  { tag: 'CRPG', group: '类型' },
  { tag: 'DBG', group: '类型' },
  { tag: 'DRPG', group: '类型' },
  { tag: 'EDU', group: '类型' },
  { tag: 'FPS', group: '类型' },
  { tag: 'FTG', group: '类型' },
  { tag: 'Fly', group: '类型' },
  { tag: 'Horror', group: '类型' },
  { tag: 'JRPG', group: '类型' },
  { tag: 'MMORPG', group: '类型' },
  { tag: 'MOBA', group: '类型' },
  { tag: 'MUG', group: '类型' },
  { tag: 'PUZ', group: '类型' },
  { tag: 'Platform', group: '类型' },
  { tag: 'RAC', group: '类型' },
  { tag: 'RPG', group: '类型' },
  { tag: 'RTS', group: '类型' },
  { tag: 'RTT', group: '类型' },
  { tag: 'Roguelike', group: '类型' },
  { tag: 'SIM', group: '类型' },
  { tag: 'SLG', group: '类型' },
  { tag: 'SPG', group: '类型' },
  { tag: 'SRPG', group: '类型' },
  { tag: 'STG', group: '类型' },
  { tag: 'Sandbox', group: '类型' },
  { tag: 'Survival', group: '类型' },
  { tag: 'TAB', group: '类型' },
  { tag: 'TPS', group: '类型' },
  { tag: 'VN', group: '类型' },
  { tag: '休闲', group: '类型' },
  { tag: '卡牌对战', group: '类型' },

  { tag: 'Galgame', group: '受众' },
  { tag: 'BL', group: '受众' },
  { tag: '乙女', group: '受众' },

  { tag: '全年龄', group: '分级' },
  { tag: 'R18', group: '分级' },
]

const RealPublicTags: PublicTag[] = [
  { tag: '日剧', group: '分类' },
  { tag: '欧美剧', group: '分类' },
  { tag: '华语剧', group: '分类' },
  { tag: '电视剧', group: '分类' },
  { tag: '电影', group: '分类' },
  { tag: '演出', group: '分类' },
  { tag: '综艺', group: '分类' },
  { tag: '其他', group: '分类' },

  { tag: '犯罪', group: '题材' },
  { tag: '悬疑', group: '题材' },
  { tag: '推理', group: '题材' },
  { tag: '喜剧', group: '题材' },
  { tag: '爱情', group: '题材' },
  { tag: '特摄', group: '题材' },
  { tag: '科幻', group: '题材' },
  { tag: '音乐', group: '题材' },
  { tag: '校园', group: '题材' },
  { tag: '美食', group: '题材' },
  { tag: '奇幻', group: '题材' },
  { tag: '动作', group: '题材' },
  { tag: '家庭', group: '题材' },
  { tag: '战争', group: '题材' },
  { tag: '玄幻', group: '题材' },
  { tag: '西部', group: '题材' },
  { tag: '歌舞', group: '题材' },
  { tag: '历史', group: '题材' },
  { tag: '传记', group: '题材' },
  { tag: '剧情', group: '题材' },
  { tag: '纪录片', group: '题材' },
  { tag: '恐怖', group: '题材' },
  { tag: '惊悚', group: '题材' },
  { tag: '职场', group: '题材' },
  { tag: '武侠', group: '题材' },
  { tag: '古装', group: '题材' },
  { tag: '布袋戏', group: '题材' },
  { tag: '灾难', group: '题材' },
  { tag: '冒险', group: '题材' },
  { tag: '少儿', group: '题材' },
  { tag: '运动', group: '题材' },
  { tag: '同性', group: '题材' },

  { tag: '日本', group: '地区' },
  { tag: '欧美', group: '地区' },
  { tag: '美国', group: '地区' },
  { tag: '中国', group: '地区' },
  { tag: '华语', group: '地区' },
  { tag: '英国', group: '地区' },
  { tag: '韩国', group: '地区' },
  { tag: '中国香港', group: '地区' },
  { tag: '中国台湾', group: '地区' },
  { tag: '加拿大', group: '地区' },
  { tag: '法国', group: '地区' },
  { tag: '俄罗斯', group: '地区' },
  { tag: '泰国', group: '地区' },
  { tag: '意大利', group: '地区' },
  { tag: '新西兰', group: '地区' },
]

interface IPublicTagsOptionProps {
  category: string
  tags: string[]
  addTag: (t: string) => void
  removeTag: (t: string) => void
}

const Tag = styled(Chip)(() => ({
  margin: '0 2px 1px 0',
}))

export const PublicTagsOption = React.memo<IPublicTagsOptionProps>(({ category, addTag, removeTag, tags }) => {
  const publicTags = React.useMemo(() => {
    if (category === 'anime') {
      return groupBy(AnimePublicTags, (itm) => itm.group)
    } else if (category === 'book') {
      return groupBy(BookPublicTags, (itm) => itm.group)
    } else if (category === 'game') {
      return groupBy(
        GamePublicTags.filter((itm) => itm.group !== '平台'),
        (itm) => itm.group
      )
    } else if (category === 'real') {
      return groupBy(RealPublicTags, (itm) => itm.group)
    } else {
      return {}
    }
  }, [category])

  return (
    <Grid container spacing={2}>
      {Object.keys(publicTags).map((group) => (
        <Grid key={`${category}-${group}`}>
          <Typography>{group}</Typography>
          {publicTags[group].map((itm) => (
            <Tag
              key={itm.tag}
              label={itm.tag}
              onClick={() => addTag(itm.tag)}
              onDelete={tags.includes(itm.tag) ? () => removeTag(itm.tag) : undefined}
              variant={tags.includes(itm.tag) ? 'filled' : 'outlined'}
            />
          ))}
        </Grid>
      ))}
    </Grid>
  )
})

PublicTagsOption.displayName = 'PublicTagsOption'
