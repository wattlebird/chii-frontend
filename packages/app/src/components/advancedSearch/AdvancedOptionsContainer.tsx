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
    setDateRange,
    setTags,
    setCategory,
    setSubSortBy,
    setCelebSortBy,
    setRankRange,
    setCustomRankRange,
  } = React.useContext(SearchOptionsContext)
  const onCommit = React.useCallback(
    (params: AdvancedOptions) => {
      const { dateRange, tags, category, subSortBy, celebSortBy, rankRange, customRankRange } = params
      setDateRange(dateRange)
      setTags(tags)
      setCategory(category)
      setSubSortBy(subSortBy)
      setCelebSortBy(celebSortBy)
      setRankRange(rankRange)
      setCustomRankRange(customRankRange)
    },
    [setDateRange, setTags, setCategory, setSubSortBy, setCelebSortBy]
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
    }),
    [dateRange, tags, category, subSortBy, celebSortBy, rankRange, customRankRange]
  )
  return <AdvancedOptionsRenderer {...props} options={optionsBackup} onCommit={onCommit} />
})

AdvancedOptionsContainer.displayName = 'AdvancedOptionsContainer'

export { AdvancedOptionsContainer as AdvancedOptions }
