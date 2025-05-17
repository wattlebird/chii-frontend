import React from 'react'
import { SearchOptionsContext } from '../../store/searchParams'
import { AdvancedOptionsRenderer, AdvancedOptions, IAdvancedOptionsRendererProps } from './AdvancedOptionsRenderer'

type IAdvancedOptionsContainerProps = Pick<IAdvancedOptionsRendererProps, 'open' | 'setOpen'>

const AdvancedOptionsContainer = React.memo<IAdvancedOptionsContainerProps>((props) => {
  const {
    dateRange,
    tags,
    category,
    subSortBy,
    celebSortBy,
    rankRange,
    customRankRange,
    scoreRange,
    setDateRange,
    setTags,
    setCategory,
    setSubSortBy,
    setCelebSortBy,
    setRankRange,
    setCustomRankRange,
    setScoreRange,
  } = React.useContext(SearchOptionsContext)
  const onCommit = React.useCallback(
    (params: AdvancedOptions) => {
      const { dateRange, tags, category, subSortBy, celebSortBy, rankRange, customRankRange, scoreRange } = params
      setDateRange(dateRange)
      setTags(tags)
      setCategory(category)
      setSubSortBy(subSortBy)
      setCelebSortBy(celebSortBy)
      setRankRange(rankRange)
      setCustomRankRange(customRankRange)
      setScoreRange(scoreRange)
    },
    [setDateRange, setTags, setCategory, setSubSortBy, setCelebSortBy, setRankRange, setCustomRankRange, setScoreRange]
  )
  const optionsBackup = React.useMemo(
    () => ({
      dateRange,
      tags,
      category,
      subSortBy,
      celebSortBy,
      rankRange,
      customRankRange,
      scoreRange,
    }),
    [dateRange, tags, category, subSortBy, celebSortBy, rankRange, customRankRange, scoreRange]
  )
  return <AdvancedOptionsRenderer {...props} options={optionsBackup} onCommit={onCommit} />
})

AdvancedOptionsContainer.displayName = 'AdvancedOptionsContainer'

export { AdvancedOptionsContainer as AdvancedOptions }
