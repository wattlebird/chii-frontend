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

export type AdvancedOptions = Pick<
  ISearchOptionsContext,
  'dateRange' | 'category' | 'celebSortBy' | 'subSortBy' | 'tags'
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
  const { dateRange, subSortBy, celebSortBy, category, tags } = options
  const [localDateRange, setLocalDateRange] = React.useState(dateRange)
  const [localCategory, setLocalCategory] = React.useState(category)
  const [localSubSortBy, setLocalSubSortBy] = React.useState(subSortBy)
  const [localCelebSortBy, setLocalCelebSortBy] = React.useState(celebSortBy)
  const [localTags, setLocalTags] = React.useState(tags)

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
      tags: localTags
    }
    onCommit(newOpt)
    setOpen(false)
  }, [localDateRange, localSubSortBy, localCelebSortBy, localCategory, localTags, onCommit])

  const onReset = React.useCallback(() => {
    setLocalDateRange(dateRange)
    setLocalCategory(category)
    setLocalSubSortBy(subSortBy)
    setLocalCelebSortBy(celebSortBy)
    setLocalTags(tags)
  }, [setLocalDateRange, setLocalCategory, setLocalSubSortBy, setLocalCelebSortBy, setLocalTags, dateRange, category, subSortBy, celebSortBy, tags])

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
            <SortByOption category={localCategory} subSortBy={localSubSortBy} celebSortBy={localCelebSortBy} setSubSortBy={setLocalSubSortBy} setCelebSortBy={setLocalCelebSortBy} />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Typography>日期</Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 8 }}>
            <DateRangeOption dateRange={localDateRange} setDateRange={setLocalDateRange} />
          </Grid>
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
