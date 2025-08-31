import React, { FC, useCallback, useMemo, useState, useContext, useRef, useEffect } from 'react'
import { styled, useTheme } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import StarRateIcon from '@mui/icons-material/StarRate'
import BookmarkIcon from '@mui/icons-material/Bookmark'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import CircularProgress from '@mui/material/CircularProgress'
import Stack from '@mui/material/Stack'
import Collapse from '@mui/material/Collapse'
import DialogTitle from '@mui/material/DialogTitle'
import Dialog from '@mui/material/Dialog'
import Link from '@mui/material/Link'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import useMediaQuery from '@mui/material/useMediaQuery'
import _ from 'lodash'
import {
  useGetBangumiSubjectQuery,
  useGetBangumiPersonLazyQuery,
  useGetBangumiCharacterLazyQuery,
  Info,
} from '../../graphql/index.generated'
import defaultImg from '../../assets/no_icon_subject.png'
import { SettingsContext, BgmPrefix } from '../../store/setting'
import { Subject, Celebrity, Tag } from '../../graphql/index.generated'
import { SearchState } from '../../Types'

const Cover = styled('img')(({ theme }) => ({
  border: 1,
  borderRadius: theme.shape.borderRadius,
  padding: '2px',
  boxShadow: theme.shadows[2],
  cursor: 'pointer',
}))

const EntryContainer = styled(Paper, {
  shouldForwardProp(propName) {
    return propName !== 'elevation'
  },
})(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  boxShadow: 'none',
  '&:hover': {
    boxShadow: theme.shadows[2],
  },
  padding: theme.spacing(2),
  borderRadius: theme.spacing(1),
}))

const ImageContainer = styled(Box)(({ theme }) => ({
  marginRight: theme.spacing(1),
  maxWidth: '88px',
}))

interface SubjectSearchCardProps {
  sub: Subject
  urlprefix: BgmPrefix
  addTag: (tag: string) => void
}

interface CelebritySearchCardProps {
  sub: Celebrity
  urlprefix: BgmPrefix
}

interface TabBoxProps {
  tags: Tag[]
  addTag: (tag: string) => void
}

interface ISearchResultRendererProps {
  isCelebrity: boolean
  state: SearchState
  searchResult: (Subject | Celebrity)[]
  onScroll: () => void
  addTag: (tag: string) => void
}

const chineseName = (infoBox?: (Info | null)[] | null) => {
  if (!infoBox) return null
  const name = infoBox.find((item) => item?.key.includes('中文名'))
  return name?.value?.property ?? name?.value?.list?.[0]?.v
}

const description = (date: string | null | undefined, infobox?: (Info | null)[] | null) => {
  const fields = ['导演', '原作', '脚本', '作者', '出版社', '作曲', '编曲', '游戏类型', '平台', '开发', '编剧', '主演']
  const content = fields
    .map((field) => infobox?.find((itm) => itm?.key === field))
    .filter((x) => x)
    .map((obj) => {
      const stringfiedValue = obj?.value?.property
        ? obj.value.property
        : obj?.value?.list?.map((kv) => kv?.v).join('，')
      return `${obj?.key}：${stringfiedValue}`
    })
  if (date) content.splice(0, 0, `日期：${date}`)
  return content.join(' / ')
}

const celebrityProperty = (infobox?: (Info | null)[] | null) => {
  const fields = ['性别', '生日', '身高', '血型', '体重']
  const content = fields
    .map((field) => infobox?.find((itm) => itm?.key === field))
    .filter((x) => x)
    .map((obj) => {
      const stringfiedValue = obj?.value?.property ? obj.value.property : obj?.value?.list?.join('，')
      return `${obj?.key}：${stringfiedValue}`
    })
  return content.join(' / ')
}

const TabBox: FC<TabBoxProps> = ({ tags, addTag }) => {
  const sortedTags = useMemo(() => {
    if (tags && tags.length > 0) {
      return tags
        .filter((tag) => tag.userCount > 2)
        .sort((a, b) => (a.confidence === b.confidence ? b.userCount - a.userCount : b.confidence - a.confidence))
    } else {
      return []
    }
  }, [tags])

  return (
    <div>
      {sortedTags.map((tag) => (
        <Chip
          key={tag.content}
          label={
            <span>
              {tag.content} <small>{tag.userCount}</small>
            </span>
          }
          size='small'
          onClick={() => addTag(tag.content)}
        />
      ))}
    </div>
  )
}

const SubjectSearchItem: FC<SubjectSearchCardProps> = ({ sub, urlprefix, addTag }) => {
  const { data } = useGetBangumiSubjectQuery({
    variables: { id: parseInt(sub.id, 10) },
  })
  const [expand, setExpand] = useState<boolean>(false)
  const [openImage, setOpenImage] = useState<boolean>(false)
  const handleOpenImage = useCallback(() => {
    setOpenImage(true)
  }, [setOpenImage])
  const handleCloseImage = useCallback(() => {
    setOpenImage(false)
  }, [setOpenImage])
  const expandTagHandler = () => setExpand((prev) => !prev)
  const mainTitle = sub.nameCN ? sub.nameCN : sub.name
  const subTitle = sub.nameCN === mainTitle ? sub.name : undefined
  const rateCnt = data?.queryBangumiSubject?.rating?.total
  const favCnt = data?.queryBangumiSubject?.collection
    ? Object.keys(data?.queryBangumiSubject?.collection).reduce(
        (pre, cur) => pre + (cur === '__typename' ? 0 : parseInt(data?.queryBangumiSubject?.collection[cur], 10)),
        0
      )
    : 0
  const coversrc = data?.queryBangumiSubject?.images?.medium ?? defaultImg
  const largecoversrc = data?.queryBangumiSubject?.images?.large ?? defaultImg
  const dateStr = sub && sub.date?.split('T')[0]
  return (
    <EntryContainer>
      <ImageContainer>
        <Cover src={coversrc} alt={`Cover for ${mainTitle}`} width={84} loading='lazy' onClick={handleOpenImage} />
      </ImageContainer>
      <Box sx={{ display: 'flex', flexFlow: 'column' }}>
        <Typography component='div' variant='subtitle1' sx={{ fontWeight: 'bold' }}>
          <Link href={`${urlprefix}/subject/${sub.id}`} target='_blank' rel='noopener noreferrer'>
            {_.unescape(mainTitle)}
          </Link>
          <Typography component='span' variant='subtitle2'>
            {' '}
            {_.unescape(subTitle)}
          </Typography>
        </Typography>
        <Typography component='div' variant='body2'>
          {description(dateStr, data?.queryBangumiSubject?.infobox)}
        </Typography>
        <Typography component='div' variant='body2'>
          {[sub.scientificRank && `本站排名：${sub.scientificRank}`, sub.rank && `Bangumi 排名：${sub.rank}`]
            .filter((x) => x)
            .join(' / ')}
        </Typography>
        <Stack spacing={1} direction='row' alignItems='center' sx={{ fontSize: 'small' }}>
          <StarRateIcon fontSize='small' color='primary' />
          <Typography component='span' variant='subtitle2'>
            {rateCnt}
          </Typography>
          <BookmarkIcon fontSize='small' color='secondary' />
          <Typography component='span' variant='subtitle2'>
            {favCnt}
          </Typography>
          <IconButton onClick={expandTagHandler}>
            {expand ? <ExpandLessIcon fontSize='small' /> : <ExpandMoreIcon fontSize='small' />}
          </IconButton>
        </Stack>
        <Collapse in={expand}>
          <TabBox tags={sub.tags || []} addTag={addTag} />
        </Collapse>
      </Box>
      <Dialog onClose={handleCloseImage} open={openImage}>
        <DialogTitle>{mainTitle}</DialogTitle>
        <img src={largecoversrc} alt={`Large cover for ${mainTitle}`} loading='lazy' />
      </Dialog>
    </EntryContainer>
  )
}

const CelebritySearchItem: FC<CelebritySearchCardProps> = ({ sub, urlprefix }) => {
  const [getBangumiPerson, { data: personData }] = useGetBangumiPersonLazyQuery()
  const [getBangumiCharacter, { data: characterData }] = useGetBangumiCharacterLazyQuery()
  const [openImage, setOpenImage] = useState<boolean>(false)
  const handleOpenImage = useCallback(() => {
    setOpenImage(true)
  }, [setOpenImage])
  const handleCloseImage = useCallback(() => {
    setOpenImage(false)
  }, [setOpenImage])
  const type = useMemo(() => sub.id.split('_')[0], [sub])
  useEffect(() => {
    if (type === 'character') {
      getBangumiCharacter({
        variables: { id: parseInt(sub.id.split('_')[1], 10) },
      })
    } else {
      getBangumiPerson({
        variables: { id: parseInt(sub.id.split('_')[1], 10) },
      })
    }
  }, [type, sub.id])
  const data = useMemo(
    () => (type === 'character' ? characterData?.queryBangumiCharacter : personData?.queryBangumiPerson),
    [type, personData, characterData]
  )
  const mainTitle = sub.name
  const subTitle = chineseName(data?.infobox)
  const coversrc = data?.images?.medium ?? defaultImg
  const largecoversrc = data?.images?.large ?? defaultImg
  return (
    <EntryContainer>
      <ImageContainer>
        <Cover src={coversrc} alt={`Cover for ${mainTitle}`} width={84} loading='lazy' onClick={handleOpenImage} />
      </ImageContainer>
      <Box sx={{ display: 'flex', flexFlow: 'column' }}>
        <Typography component='div' variant='subtitle1' sx={{ fontWeight: 'bold' }}>
          <Link
            href={`${urlprefix}/${sub.id.split('_')[0]}/${sub.id.split('_')[1]}`}
            target='_blank'
            rel='noopener noreferrer'
          >
            {_.unescape(mainTitle)}
          </Link>
          <Typography component='span' variant='subtitle2'>
            {' '}
            {_.unescape(subTitle ?? '')}
          </Typography>
        </Typography>
        <Typography component='div' variant='body2'>
          {celebrityProperty(data?.infobox)}
        </Typography>
      </Box>
      <Dialog onClose={handleCloseImage} open={openImage}>
        <DialogTitle>{mainTitle}</DialogTitle>
        <img src={largecoversrc} alt={`Large cover for ${mainTitle}`} loading='lazy' />
      </Dialog>
    </EntryContainer>
  )
}

export const SearchResultRenderer: FC<ISearchResultRendererProps> = ({
  isCelebrity,
  searchResult,
  onScroll,
  addTag,
  state,
}) => {
  const { bgmPrefix } = useContext(SettingsContext)
  const lastItemRef = useRef<HTMLDivElement>(null)
  const thisRef = useRef<HTMLDivElement>(null)
  const theme = useTheme()
  const matchMobile = useMediaQuery(theme.breakpoints.down('md'))
  const loading = useMemo(() => {
    return state === 'Scrolling' || state === 'Searching'
  }, [state])
  useEffect(() => {
    const observer = new IntersectionObserver(
      () => {
        if (!matchMobile) {
          onScroll()
        }
      },
      {
        root: null,
        threshold: 0.5,
      }
    )

    if (lastItemRef.current) observer.observe(lastItemRef.current)

    return () => observer.disconnect()
  }, [lastItemRef.current, matchMobile])

  return (
    <Box ref={thisRef}>
      <Stack direction='column' spacing={2}>
        {searchResult.map((sub) =>
          isCelebrity ? (
            <CelebritySearchItem sub={sub as Celebrity} key={sub.id} urlprefix={bgmPrefix} />
          ) : (
            <SubjectSearchItem sub={sub as Subject} key={sub.id} urlprefix={bgmPrefix} addTag={addTag} />
          )
        )}
      </Stack>
      <Box ref={lastItemRef} sx={{ minHeight: '1px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {state === 'ResultAvailable' && matchMobile && (
          <Button variant='outlined' onClick={onScroll}>
            加载更多
          </Button>
        )}
      </Box>
      {(state === 'Complete' || state === 'Error') && (
        <Divider>
          <Typography color='#e0e0e0'>你来到了世界的尽头</Typography>
        </Divider>
      )}
      {loading && (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '8px' }}>
          <CircularProgress />
        </Box>
      )}
    </Box>
  )
}
