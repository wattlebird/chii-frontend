import React from 'react'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Grid from '@mui/material/Grid2'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import CloseIcon from '@mui/icons-material/Close'
import IconButton from '@mui/material/IconButton'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import { ISearchOptionsContext } from '../../store/searchParams'
import { DateRangeOption } from './DateRangeOption'
import { CategoryOption } from './CategoryOption'
import { SortByOption } from './SortByOption'
import { PublicTagsOption } from './PublicTagsOption'
import { isCelebrityCategory } from '../../hooks/Utils'
import { RankRangeOption } from './RankRangeOption'
import { CelebritySortBy, SubjectSortBy } from '../../graphql/index.generated'

export type AdvancedOptions = Pick<
  ISearchOptionsContext,
  'dateRange' | 'category' | 'celebSortBy' | 'subSortBy' | 'tags' | 'rankRange' | 'customRankRange'
>

export interface IAdvancedOptionsRendererProps {
  open: boolean
  setOpen: (o: boolean) => void
  options: AdvancedOptions
  onCommit: (params: AdvancedOptions) => void
}

const AdvancedOptionsDialog = styled(Dialog)(() => ({
  '& .MuiDialog-paper': {
    flexGrow: 1,
  },
}))

const AdvancedOptionsTitle = styled(DialogTitle)(() => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  '& button': {
    marginLeft: 'auto',
  },
}))

const AdvancedOptionsRenderer = React.memo<IAdvancedOptionsRendererProps>(({ open, setOpen, options, onCommit }) => {
  const { dateRange, subSortBy, celebSortBy, category, tags, rankRange, customRankRange } = options
  const [localDateRange, setLocalDateRange] = React.useState(dateRange)
  const [localCategory, setLocalCategory] = React.useState(category)
  const [localSubSortBy, setLocalSubSortBy] = React.useState(subSortBy)
  const [localCelebSortBy, setLocalCelebSortBy] = React.useState(celebSortBy)
  const [localTags, setLocalTags] = React.useState(tags)
  const [localRankRange, setLocalRankRange] = React.useState(rankRange)
  const [localCustomRankRange, setLocalCustomRankRange] = React.useState(customRankRange)

  React.useEffect(() => {
    setLocalCategory(category)
  }, [category, setLocalCategory])

  React.useEffect(() => {
    setLocalDateRange(dateRange)
  }, [dateRange, setLocalDateRange])

  React.useEffect(() => {
    setLocalSubSortBy(subSortBy)
  }, [subSortBy, setLocalSubSortBy])

  React.useEffect(() => {
    setLocalCelebSortBy(celebSortBy)
  }, [celebSortBy, setLocalCelebSortBy])

  React.useEffect(() => {
    setLocalTags(tags)
  }, [tags, setLocalTags])

  React.useEffect(() => {
    setLocalRankRange(rankRange)
  }, [rankRange, setLocalRankRange])

  React.useEffect(() => {
    setLocalCustomRankRange(customRankRange)
  }, [customRankRange, setLocalCustomRankRange])

  const onAddTag = (tag: string) => {
    setLocalTags([...localTags, tag])
  }
  const onRemoveTag = (tag: string) => {
    setLocalTags(localTags.filter((t) => t !== tag))
  }

  const onClose = React.useCallback(() => setOpen(false), [setOpen])

  const onSubmit = React.useCallback(() => {
    const newOpt = {
      dateRange: localDateRange,
      subSortBy: localSubSortBy,
      celebSortBy: localCelebSortBy,
      category: localCategory,
      tags: localTags,
      customRankRange: localCustomRankRange,
      rankRange: localRankRange,
    }
    onCommit(newOpt)
    setOpen(false)
  }, [
    localDateRange,
    localSubSortBy,
    localCelebSortBy,
    localCategory,
    localTags,
    localCustomRankRange,
    localRankRange,
    onCommit,
  ])

  const onReset = React.useCallback(() => {
    setLocalDateRange(undefined)
    setLocalCategory('anime')
    setLocalSubSortBy(SubjectSortBy.Default)
    setLocalCelebSortBy(CelebritySortBy.Default)
    setLocalTags(tags)
    setLocalRankRange(undefined)
    setLocalCustomRankRange(undefined)
  }, [
    setLocalDateRange,
    setLocalCategory,
    setLocalSubSortBy,
    setLocalCelebSortBy,
    setLocalTags,
    setLocalRankRange,
    setLocalCustomRankRange,
    tags,
  ])

  const displayPublicTags = React.useMemo(() => {
    return ['anime', 'book', 'game', 'real'].includes(localCategory)
  }, [localCategory])

  return (
    <AdvancedOptionsDialog open={open} onClose={onClose}>
      <AdvancedOptionsTitle>
        <Typography>高级搜索选项</Typography>
        <IconButton aria-label='close' onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </AdvancedOptionsTitle>
      <Divider />
      <DialogContent>
        <Grid container spacing={2} sx={{ alignItems: 'center' }}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Typography>类型</Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 8 }}>
            <CategoryOption category={localCategory} setCategory={setLocalCategory} />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Typography>排序</Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 8 }}>
            <SortByOption
              category={localCategory}
              subSortBy={localSubSortBy}
              celebSortBy={localCelebSortBy}
              setSubSortBy={setLocalSubSortBy}
              setCelebSortBy={setLocalCelebSortBy}
            />
          </Grid>
          {!isCelebrityCategory(localCategory) && (
            <>
              <Grid size={{ xs: 12, md: 4 }}>
                <Typography>日期</Typography>
              </Grid>
              <Grid size={{ xs: 12, md: 8 }}>
                <DateRangeOption dateRange={localDateRange} setDateRange={setLocalDateRange} />
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <Typography>Bangumi 排名</Typography>
              </Grid>
              <Grid size={{ xs: 12, md: 8 }}>
                <RankRangeOption id='rank-range' rankRange={localRankRange} setRankRange={setLocalRankRange} />
              </Grid>
            </>
          )}
          {localCategory === 'anime' && (
            <>
              <Grid size={{ xs: 12, md: 4 }}>
                <Typography>本站排名</Typography>
              </Grid>
              <Grid size={{ xs: 12, md: 8 }}>
                <RankRangeOption
                  id='custom-rank-range'
                  rankRange={localCustomRankRange}
                  setRankRange={setLocalCustomRankRange}
                />
              </Grid>
            </>
          )}
          {displayPublicTags && (
            <>
              <Grid size={{ xs: 12, md: 4 }}>
                <Typography>精选标签</Typography>
              </Grid>
              <Grid size={{ xs: 12, md: 8 }}>
                <PublicTagsOption addTag={onAddTag} removeTag={onRemoveTag} category={localCategory} tags={localTags} />
              </Grid>
            </>
          )}
        </Grid>
      </DialogContent>
      <Divider />
      <DialogActions>
        <Button variant='outlined' aria-label='reset to default' onClick={onReset}>
          重置
        </Button>
        <Button variant='contained' aria-label='apply' onClick={onSubmit}>
          应用
        </Button>
      </DialogActions>
    </AdvancedOptionsDialog>
  )
})

AdvancedOptionsRenderer.displayName = 'AdvancedOptionsRenderer'

export { AdvancedOptionsRenderer }
