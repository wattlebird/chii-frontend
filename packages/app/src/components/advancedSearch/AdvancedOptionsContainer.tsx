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
    setDateRange,
    setTags,
    setCategory,
    setSubSortBy,
    setCelebSortBy,
  } = React.useContext(SearchOptionsContext)
  const onCommit = React.useCallback(
    (params: AdvancedOptions) => {
      const { dateRange, tags, category, subSortBy, celebSortBy } = params
      setDateRange(dateRange)
      setTags(tags)
      setCategory(category)
      setSubSortBy(subSortBy)
      setCelebSortBy(celebSortBy)
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
    }),
    [dateRange, tags, category, subSortBy, celebSortBy]
  )
  return <AdvancedOptionsRenderer {...props} options={optionsBackup} onCommit={onCommit} />
})

AdvancedOptionsContainer.displayName = 'AdvancedOptionsContainer'

export { AdvancedOptionsContainer as AdvancedOptions }
