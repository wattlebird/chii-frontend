import React, { FC, useCallback, useMemo, useState, useContext, useRef, useEffect } from 'react'
import { styled, useTheme, alpha } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import StarIcon from '@mui/icons-material/Star'
import FavoriteIcon from '@mui/icons-material/Favorite'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import CircularProgress from '@mui/material/CircularProgress'
import Stack from '@mui/material/Stack'
import DialogTitle from '@mui/material/DialogTitle'
import Dialog from '@mui/material/Dialog'
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
import { AuthTokenContext } from '../../store/auth'
import { SidebarFilters } from './SidebarFilters'
import { getCategoryEmoji } from '../../hooks/Utils'

const Cover = styled('img')(({ theme }) => ({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  borderRadius: theme.shape.borderRadius,
}))

const CoverContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: 100,
  height: 140,
  flexShrink: 0,
  borderRadius: theme.shape.borderRadius,
  overflow: 'hidden',
  cursor: 'pointer',
  boxShadow: theme.shadows[2],
}))

const TypeBadge = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 6,
  right: 6,
  backgroundColor: alpha(theme.palette.background.paper, 0.9),
  borderRadius: theme.shape.borderRadius,
  padding: '2px 6px',
  fontSize: '0.75rem',
}))

const EntryContainer = styled(Paper)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  gap: theme.spacing(2),
  padding: theme.spacing(2),
  borderRadius: theme.spacing(1.5),
  border: `2px solid transparent`,
  transition: 'all 0.2s ease-in-out',
  cursor: 'pointer',
  '&:hover': {
    borderColor: theme.palette.primary.main,
    boxShadow: theme.shadows[4],
    transform: 'translateY(-2px)',
  },
}))

const ContentContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
  minWidth: 0,
  gap: theme.spacing(0.5),
}))

const TitleRow = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  gap: theme.spacing(1),
}))

const RatingBadge = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(0.5),
  color: theme.palette.warning.main,
  flexShrink: 0,
}))

const MetaRow = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontSize: '0.875rem',
  lineHeight: 1.5,
  display: '-webkit-box',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
}))

const TagsContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  gap: theme.spacing(0.5),
  alignItems: 'center',
}))

const StatsRow = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  marginTop: 'auto',
  paddingTop: theme.spacing(1),
  fontSize: '0.75rem',
  color: theme.palette.text.secondary,
}))

const StatItem = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'showSeparator',
})<{ showSeparator?: boolean }>(({ theme, showSeparator = true }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(0.5),
  ...(showSeparator && {
    '&::after': {
      content: '"•"',
      marginLeft: theme.spacing(1),
    },
    '&:last-child::after': {
      content: '""',
      marginLeft: 0,
    },
  }),
}))

const MainLayoutContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(3),
  [theme.breakpoints.up('md')]: {
    flexDirection: 'row',
  },
}))

const SidebarWrapper = styled(Box)(({ theme }) => ({
  width: '100%',
  [theme.breakpoints.up('md')]: {
    width: '280px',
    flexShrink: 0,
  },
}))

const ResultsWrapper = styled(Box)(({ theme }) => ({
  flex: 1,
  minWidth: 0,
}))

interface SubjectSearchCardProps {
  sub: Subject
  urlprefix: BgmPrefix
  addTag: (tag: string) => void
  accessToken?: string
}

interface CelebritySearchCardProps {
  sub: Celebrity
  urlprefix: BgmPrefix
  accessToken?: string
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
  removeTag: (tag: string) => void
}

const formatCount = (count: number): string => {
  if (count >= 10000) {
    return `${(count / 10000).toFixed(1)} 万`
  } else if (count >= 1000) {
    return `${(count / 1000).toFixed(1)} 千`
  }
  return count.toString()
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

const SubjectSearchItem: FC<SubjectSearchCardProps> = ({ sub, urlprefix, addTag, accessToken }) => {
  const { data } = useGetBangumiSubjectQuery({
    variables: { id: parseInt(sub.id, 10), token: accessToken },
  })
  const [expand, setExpand] = useState<boolean>(false)
  const [openImage, setOpenImage] = useState<boolean>(false)
  
  const handleOpenImage = useCallback(() => {
    setOpenImage(true)
  }, [])
  
  const handleCloseImage = useCallback(() => {
    setOpenImage(false)
  }, [])
  
  const expandTagHandler = useCallback((e: React.MouseEvent) => {
    e.stopPropagation()
    setExpand((prev) => !prev)
  }, [])

  const mainTitle = sub.nameCN ? sub.nameCN : sub.name
  const subTitle = sub.nameCN === mainTitle ? sub.name : undefined
  
  // Data from BangumiSubject query
  const bangumiData = data?.queryBangumiSubject
  const ratingScore = bangumiData?.rating?.score
  const ratingTotal = bangumiData?.rating?.total
  const totalCollection = bangumiData?.collection
    ? Object.keys(bangumiData.collection).reduce(
        (pre, cur) => pre + (cur === '__typename' ? 0 : parseInt(bangumiData.collection[cur as keyof typeof bangumiData.collection] as unknown as string, 10) || 0),
        0
      )
    : 0
  const coversrc = bangumiData?.images?.medium ?? defaultImg
  const largecoversrc = bangumiData?.images?.large ?? defaultImg
  const dateStr = sub && sub.date?.split('T')[0]
  const episodes = bangumiData?.eps || bangumiData?.total_episodes
  const volumes = bangumiData?.volumes

  const handleCardClick = useCallback(() => {
    window.open(`${urlprefix}/subject/${sub.id}`, '_blank', 'noopener,noreferrer')
  }, [urlprefix, sub.id])

  return (
    <>
      <EntryContainer onClick={handleCardClick}>
        <CoverContainer onClick={(e) => { e.stopPropagation(); handleOpenImage(); }}>
          <Cover src={coversrc} alt={`Cover for ${mainTitle}`} loading='lazy' />
          <TypeBadge>{getCategoryEmoji(sub.type || '')}</TypeBadge>
        </CoverContainer>
        
        <ContentContainer>
          <TitleRow>
            <Box sx={{ minWidth: 0 }}>
              <Typography 
                variant='subtitle1' 
                sx={{ 
                  fontWeight: 'bold', 
                  lineHeight: 1.3,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {_.unescape(mainTitle)}
              </Typography>
              {subTitle && (
                <Typography 
                  variant='body2' 
                  color='text.secondary'
                  sx={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {_.unescape(subTitle)}
                </Typography>
              )}
            </Box>
            {ratingScore && ratingScore > 0 && (
              <RatingBadge>
                <StarIcon sx={{ fontSize: '1rem' }} />
                <Typography variant='subtitle2' sx={{ fontWeight: 'bold' }}>
                  {ratingScore.toFixed(1)}
                </Typography>
              </RatingBadge>
            )}
          </TitleRow>

          <MetaRow>
            {description(dateStr, bangumiData?.infobox)}
          </MetaRow>

          <Typography variant='body2' color='text.secondary' sx={{ fontSize: '0.8125rem' }}>
            {[sub.scientificRank && `本站排名：${sub.scientificRank}`, sub.rank && `Bangumi 排名：${sub.rank}`]
              .filter((x) => x)
              .join(' / ')}
          </Typography>

          <TagsContainer>
            {
              (sub.tags || [])
                .filter((tag) => tag.userCount > 2)
                .sort((a, b) => (a.confidence === b.confidence ? b.userCount - a.userCount : b.confidence - a.confidence))
                .filter((tag, idx) => expand ? true : idx < 5)
                .map((tag) => (
                  <Chip
                    key={tag.content}
                    label={(
                      <span>
                        {tag.content} <small>{tag.userCount}</small>
                      </span>
                    )}
                    size='small'
                    color='primary'
                    variant='outlined'
                    onClick={(e) => { e.stopPropagation(); addTag(tag.content); }}
                    sx={{ height: 22, fontSize: '0.75rem' }}
                  />
                ))
            }
            {sub.tags && sub.tags.length > 3 && (
              <IconButton size='small' onClick={expandTagHandler} sx={{ padding: 0.5 }}>
                {expand ? <ExpandLessIcon fontSize='small' /> : <ExpandMoreIcon fontSize='small' />}
              </IconButton>
            )}
          </TagsContainer>

          <StatsRow>
            {dateStr && (
              <StatItem>
                <span>{dateStr.split('-')[0]}</span>
              </StatItem>
            )}
            {(!!episodes && episodes > 0) && (
              <StatItem>
                <span>{episodes} 话</span>
              </StatItem>
            )}
            {(!!volumes && volumes > 0) && (
              <StatItem>
                <span>{volumes} 卷</span>
              </StatItem>
            )}
            {totalCollection > 0 && (
              <StatItem>
                <FavoriteIcon sx={{ fontSize: '0.875rem', color: 'error.main' }} />
                <span>{formatCount(totalCollection)}人收藏</span>
              </StatItem>
            )}
            {(!!ratingTotal && ratingTotal > 0) && (
              <StatItem>
                <StarIcon sx={{ fontSize: '0.875rem', color: 'warning.main' }} />
                <span>{formatCount(ratingTotal)}人评分</span>
              </StatItem>
            )}
          </StatsRow>
        </ContentContainer>
      </EntryContainer>

      <Dialog onClose={handleCloseImage} open={openImage} maxWidth='sm'>
        <DialogTitle>{mainTitle}</DialogTitle>
        <img src={largecoversrc} alt={`Large cover for ${mainTitle}`} loading='lazy' style={{ maxWidth: '100%' }} />
      </Dialog>
    </>
  )
}

const CelebritySearchItem: FC<CelebritySearchCardProps> = ({ sub, urlprefix, accessToken }) => {
  const [getBangumiPerson, { data: personData }] = useGetBangumiPersonLazyQuery()
  const [getBangumiCharacter, { data: characterData }] = useGetBangumiCharacterLazyQuery()
  const [openImage, setOpenImage] = useState<boolean>(false)
  
  const handleOpenImage = useCallback(() => {
    setOpenImage(true)
  }, [])
  
  const handleCloseImage = useCallback(() => {
    setOpenImage(false)
  }, [])
  
  const type = useMemo(() => sub.id.split('_')[0], [sub])
  
  useEffect(() => {
    if (type === 'character') {
      getBangumiCharacter({
        variables: { id: parseInt(sub.id.split('_')[1], 10), token: accessToken },
      })
    } else {
      getBangumiPerson({
        variables: { id: parseInt(sub.id.split('_')[1], 10), token: accessToken },
      })
    }
  }, [type, sub.id, accessToken, getBangumiCharacter, getBangumiPerson])
  
  const data = useMemo(
    () => (type === 'character' ? characterData?.queryBangumiCharacter : personData?.queryBangumiPerson),
    [type, personData, characterData]
  )
  
  const mainTitle = sub.name
  const subTitle = chineseName(data?.infobox)
  const coversrc = data?.images?.medium ?? defaultImg
  const largecoversrc = data?.images?.large ?? defaultImg

  const handleCardClick = useCallback(() => {
    window.open(`${urlprefix}/${sub.id.split('_')[0]}/${sub.id.split('_')[1]}`, '_blank', 'noopener,noreferrer')
  }, [urlprefix, sub.id])

  return (
    <>
      <EntryContainer onClick={handleCardClick}>
        <CoverContainer onClick={(e) => { e.stopPropagation(); handleOpenImage(); }}>
          <Cover src={coversrc} alt={`Cover for ${mainTitle}`} loading='lazy' />
          <TypeBadge>{getCategoryEmoji(type)}</TypeBadge>
        </CoverContainer>
        
        <ContentContainer>
          <TitleRow>
            <Box sx={{ minWidth: 0 }}>
              <Typography 
                variant='subtitle1' 
                sx={{ 
                  fontWeight: 'bold', 
                  lineHeight: 1.3,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {_.unescape(mainTitle)}
              </Typography>
              {subTitle && (
                <Typography 
                  variant='body2' 
                  color='text.secondary'
                  sx={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {_.unescape(subTitle)}
                </Typography>
              )}
            </Box>
          </TitleRow>

          <MetaRow>
            {celebrityProperty(data?.infobox)}
          </MetaRow>
        </ContentContainer>
      </EntryContainer>

      <Dialog onClose={handleCloseImage} open={openImage} maxWidth='sm'>
        <DialogTitle>{mainTitle}</DialogTitle>
        <img src={largecoversrc} alt={`Large cover for ${mainTitle}`} loading='lazy' style={{ maxWidth: '100%' }} />
      </Dialog>
    </>
  )
}

export const SearchResultRenderer: FC<ISearchResultRendererProps> = ({
  isCelebrity,
  searchResult,
  onScroll,
  addTag,
  removeTag,
  state,
}) => {
  const { bgmPrefix } = useContext(SettingsContext)
  const { accessToken } = useContext(AuthTokenContext)
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
  }, [lastItemRef.current, matchMobile, onScroll])

  return (
    <MainLayoutContainer ref={thisRef}>
      {/* Sidebar Filters */}
      <SidebarWrapper>
        <SidebarFilters onRemoveTag={removeTag} onAddTag={addTag} />
      </SidebarWrapper>

      {/* Results Section */}
      <ResultsWrapper>
        <Stack direction='column' spacing={2}>
          {searchResult.map((sub) =>
            isCelebrity ? (
              <CelebritySearchItem sub={sub as Celebrity} key={sub.id} urlprefix={bgmPrefix} accessToken={accessToken} />
            ) : (
              <SubjectSearchItem sub={sub as Subject} key={sub.id} urlprefix={bgmPrefix} accessToken={accessToken} addTag={addTag} />
            )
          )}
        </Stack>
        <Box ref={lastItemRef} sx={{ minHeight: '1px', display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 2 }}>
          {state === 'ResultAvailable' && matchMobile && (
            <Button variant='outlined' onClick={onScroll}>
              加载更多
            </Button>
          )}
        </Box>
        {(state === 'Complete' || state === 'Error') && (
          <Divider sx={{ mt: 2 }}>
            <Typography color='text.disabled'>你来到了世界的尽头</Typography>
          </Divider>
        )}
        {loading && (
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 2 }}>
            <CircularProgress />
          </Box>
        )}
      </ResultsWrapper>
    </MainLayoutContainer>
  )
}