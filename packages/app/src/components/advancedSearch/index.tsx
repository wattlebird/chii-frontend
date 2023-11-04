import * as React from 'react'
import { styled } from '@mui/material/styles'
import { TagSelector } from './TagSelector'
import { DateRangePicker } from './DateRange'

const Container = styled('div')(() => ({
  width: '100%',
  display: 'flex',
}))

const AdvancedSearchBar: React.FunctionComponent = React.memo(() => {
  return (
    <Container>
      <TagSelector />
      <DateRangePicker />
    </Container>
  )
})

AdvancedSearchBar.displayName = 'AdvancedSearchBar'

export { AdvancedSearchBar }
