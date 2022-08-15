import React, { FC, useCallback, useEffect, useMemo, useState, useContext } from 'react'
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import StarRateIcon from '@mui/icons-material/StarRate'
import BookmarkIcon from '@mui/icons-material/Bookmark'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import MenuItem from '@mui/material/MenuItem'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import Stack from '@mui/material/Stack'
import Collapse from '@mui/material/Collapse'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import DialogTitle from '@mui/material/DialogTitle'
import Dialog from '@mui/material/Dialog'
import Link from '@mui/material/Link'
import { useGetBangumiSubjectQuery, useGetSubjectQuery } from '../graphql/index.generated'
import { Subject, InfoBox, OrderKey, SubjectType } from '../Types'
import defaultImg from '../assets/no_icon_subject.png'
import { SettingsContext, BgmPrefix } from '../store/setting'
import { getComparator } from '../hooks/Utils'

const Cover = styled('img')(({ theme }) => ({
  border: 1,
  borderRadius: theme.shape.borderRadius,
  padding: '2px',
  boxShadow: theme.shadows[2],
  cursor: 'pointer',
}))

interface SubjectSearchCardProps {
  sub: Subject
  type: SubjectType
  urlprefix: BgmPrefix
}

interface TabBoxProps {
  id: number
}

interface SearchResultListProps {
  data: Array<Subject>
  page: number
  rowsPerPage: number
  type: SubjectType
}

const description = (date: string | null | undefined, infobox: InfoBox) => {
  const fields = ['导演', '原作', '脚本', '作者', '出版社', '作曲', '编曲', '游戏类型', '平台', '开发', '编剧', '主演']
  const content = fields
    .map((field) => infobox.find((itm) => itm.key === field))
    .filter((x) => x)
    .map(
      (obj) => `${obj?.key}：${typeof obj?.value === 'string' ? obj?.value : obj?.value?.map((v) => v.v).join('，')}`
    )
  if (date) content.push(`日期：${date}`)
  return content.join(' / ')
}

const TabBox: FC<TabBoxProps> = ({ id }) => {
  const { data, loading, error } = useGetSubjectQuery({
    variables: { id },
    fetchPolicy: 'no-cache',
  })
  const sortedTags = useMemo(() => {
    if (data?.querySubject?.tags) {
      return data.querySubject.tags
        .filter((tag) => tag.userCount > 2)
        .sort((a, b) => (a.confidence === b.confidence ? b.userCount - a.userCount : b.confidence - a.confidence))
    } else {
      return []
    }
  }, [data])
  if (loading || error) return <></>

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
        />
      ))}
    </div>
  )
}

const SubjectSearchItem: FC<SubjectSearchCardProps> = ({ sub, urlprefix }) => {
  const { data, loading, error } = useGetBangumiSubjectQuery({
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
  const infobox = JSON.parse(sub.infobox) as InfoBox
  const date = data?.queryBangumiSubject?.date
  const rateCnt = data?.queryBangumiSubject?.rating?.total
  const favCnt = data?.queryBangumiSubject?.collection
    ? Object.keys(data?.queryBangumiSubject?.collection).reduce(
        (pre, cur) => pre + (cur === '__typename' ? 0 : parseInt(data?.queryBangumiSubject?.collection[cur], 10)),
        0
      )
    : 0
  const coversrc = data?.queryBangumiSubject?.images?.common ?? defaultImg
  const largecoversrc = data?.queryBangumiSubject?.images?.large ?? defaultImg
  return (
    <Stack direction='row' spacing={1}>
      <Box sx={{ maxWidth: '88px' }}>
        <Cover src={coversrc} alt={`Cover for ${mainTitle}`} width={84} loading='lazy' onClick={handleOpenImage} />
      </Box>
      <Box sx={{ display: 'flex', flexFlow: 'column' }}>
        <Typography component='div' variant='subtitle1' sx={{ fontWeight: 'bold' }}>
          <Link href={`${urlprefix}/subject/${sub.id}`}>{mainTitle}</Link>
          <Typography component='span' variant='subtitle2'>
            {' '}
            {subTitle}
          </Typography>
        </Typography>
        <Typography component='div' variant='body2'>
          {description(date, infobox)}
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
          <TabBox id={parseInt(sub.id, 10)} />
        </Collapse>
      </Box>
      <Dialog onClose={handleCloseImage} open={openImage}>
        <DialogTitle>{mainTitle}</DialogTitle>
        <img src={largecoversrc} alt={`Large cover for ${mainTitle}`} loading='lazy' />
      </Dialog>
    </Stack>
  )
}

export const SearchResultList: FC<SearchResultListProps> = ({ data, page, rowsPerPage, type }) => {
  const [orderBy, setOrderBy] = useState<OrderKey>('score')
  const { bgmPrefix } = useContext(SettingsContext)
  const displayData = useMemo<Array<Subject>>(() => {
    return data
      .slice()
      .sort(getComparator(orderBy === 'score' ? 'desc' : 'asc', orderBy))
      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
  }, [orderBy, page, rowsPerPage, data])
  useEffect(() => {
    if (orderBy === 'scientificRank' && type !== 'anime') {
      setOrderBy('score')
    }
  }, [orderBy, type, setOrderBy])

  const handleChange = (event: SelectChangeEvent) => {
    setOrderBy(event.target.value as OrderKey)
  }

  return (
    <>
      <Box>
        <FormControl variant='standard' sx={{ m: 1, ml: 0, minWidth: 120 }}>
          <InputLabel id='ranking-method-label'>排序</InputLabel>
          <Select value={orderBy} labelId='ranking-method-label' label='排序' onChange={handleChange}>
            <MenuItem value='score'>默认排序</MenuItem>
            {type === 'anime' && <MenuItem value='scientificRank'>本站排名排序</MenuItem>}
            <MenuItem value='rank'>Bangumi 排名排序</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Stack direction='column' spacing={2}>
        {displayData.map((sub) => (
          <SubjectSearchItem sub={sub} type={type} key={sub.id} urlprefix={bgmPrefix} />
        ))}
      </Stack>
    </>
  )
}
