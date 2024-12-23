import React from 'react'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import { CelebritySortBy, SubjectSortBy } from '../../graphql/index.generated'
import { isCelebrityCategory } from '../../hooks/Utils'

interface ISortByOptionProps {
  category: string
  subSortBy: SubjectSortBy
  setSubSortBy: (by: SubjectSortBy) => void
  celebSortBy: CelebritySortBy
  setCelebSortBy: (by: CelebritySortBy) => void
}

export const SortByOption = React.memo<ISortByOptionProps>(
  ({ category, subSortBy, celebSortBy, setSubSortBy, setCelebSortBy }) => {
    const typ = React.useMemo(() => {
      return isCelebrityCategory(category) ? 'celebrity' : 'subject'
    }, [category])
    const onChangeSubSortBy = (event: SelectChangeEvent) => {
      setSubSortBy(event.target.value as SubjectSortBy)
    }
    const onChangeCelebSortBy = (event: SelectChangeEvent) => {
      setCelebSortBy(event.target.value as CelebritySortBy)
    }
    return (
      <FormControl sx={{ m: 1, minWidth: 120 }} size='small'>
        {typ === 'subject' ? (
          <Select value={subSortBy} onChange={onChangeSubSortBy}>
            <MenuItem value={SubjectSortBy.Default}>默认</MenuItem>
            <MenuItem value={SubjectSortBy.CustomRank}>本站排名</MenuItem>
            <MenuItem value={SubjectSortBy.Rank}>Bangumi 排名</MenuItem>
            <MenuItem value={SubjectSortBy.Date}>日期</MenuItem>
            <MenuItem value={SubjectSortBy.Fav}>收藏数</MenuItem>
            <MenuItem value={SubjectSortBy.Hotness}>热度</MenuItem>
          </Select>
        ) : (
          <Select value={celebSortBy} onChange={onChangeCelebSortBy}>
            <MenuItem value={CelebritySortBy.Default}>默认</MenuItem>
            <MenuItem value={CelebritySortBy.Collects}>收藏数</MenuItem>
            <MenuItem value={CelebritySortBy.Comments}>讨论数</MenuItem>
          </Select>
        )}
      </FormControl>
    )
  }
)

SortByOption.displayName = 'SortByOption'
