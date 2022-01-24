import React from 'react'
import styled from 'styled-components'
import { Button, Flex, Dropdown, DropdownProps, Tooltip } from '@fluentui/react-northstar'
import { ChevronStartIcon, ChevronEndIcon } from '@fluentui/react-icons-northstar'

const PaginBar = styled(Flex)`
  ::before {
    content: '';
  }
`

const PaginDropdown = styled(Dropdown)`
  .ui-dropdown__container {
    width: 3rem;
  }
`

type PaginationProps = {
  current: number
  total: number
  disabled?: boolean
  pageSize: number
  pageSizeOptions: number[]
  // eslint-disable-next-line no-unused-vars
  onChange: (page: number, pageSize: number) => void
  // eslint-disable-next-line no-unused-vars
  onShowSizeChange: (currentPage: number, size: number) => void
}

function Pagination({
  current,
  total,
  disabled,
  pageSize,
  pageSizeOptions,
  onShowSizeChange,
  onChange
}: PaginationProps) {
  const lastpage = total === 0 ? 1 : Math.ceil(total / pageSize)
  const displaySkipForward = lastpage - current > 3
  const displaySkipBackward = current > 4

  const onChangePagelen = (_: any, { value }: DropdownProps) => {
    const newPagelen: number = value as number
    if (current * newPagelen > total) onChange(Math.ceil(total / newPagelen), newPagelen)
    onShowSizeChange(current, newPagelen)
  }

  const onJumpForward = () => {
    const landingpage = current + 5 > lastpage ? lastpage : current + 5
    onChange(landingpage, pageSize)
  }

  const onJumpBackward = () => {
    const landingpage = current - 5 < 1 ? 1 : current - 5
    onChange(landingpage, pageSize)
  }

  const onClickFactory = (page: number) => {
    const onClick = () => onChange(page, pageSize)
    return onClick
  }

  const buttons = [
    <Button
      key='prev'
      aria-label='上一页'
      content={<ChevronStartIcon />}
      iconOnly
      disabled={disabled || current === 1}
      onClick={onClickFactory(current - 1)}
    />,
    <Button
      key='1'
      aria-label='第1页'
      content='1'
      text={current === 1}
      {...(current === 1 && { 'aria-current': 'page' })}
      iconOnly
      disabled={disabled}
      onClick={onClickFactory(1)}
    />,
    <Button
      key='next'
      aria-label='下一页'
      content={<ChevronEndIcon />}
      iconOnly
      disabled={disabled || current === lastpage}
      onClick={onClickFactory(current + 1)}
    />
  ]
  const toinsert = [current - 2, current - 1, current, current + 1, current + 2]
    .filter((page) => page > 1 && page < lastpage)
    .map((page) => (
      <Button
        key={page}
        text={current === page}
        aria-label={`第${page}页`}
        {...(current === page && { 'aria-current': 'page' })}
        content={page}
        iconOnly
        disabled={disabled}
        onClick={onClickFactory(page)}
      />
    ))

  if (displaySkipBackward) {
    toinsert.unshift(
      <Tooltip
        key='jumpbackward'
        trigger={
          <Button
            key='jumpbackward'
            aria-label='向前5页'
            text
            content='《'
            iconOnly
            disabled={disabled}
            onClick={onJumpBackward}
          />
        }
        content='jump backward 5 pages'
      />
    )
  }
  if (displaySkipForward) {
    toinsert.push(
      <Tooltip
        key='jumpforward'
        trigger={
          <Button
            key='jumpforward'
            aria-label='向后5页'
            text
            content='》'
            iconOnly
            disabled={disabled}
            onClick={onJumpForward}
          />
        }
        content='jump forward 5 pages'
      />
    )
  }
  if (lastpage !== 1) {
    toinsert.push(
      <Button
        key={lastpage}
        text={current === lastpage}
        aria-label={`第${lastpage}页`}
        content={lastpage}
        iconOnly
        disabled={disabled}
        onClick={onClickFactory(lastpage)}
      />
    )
  }
  buttons.splice(2, 0, ...toinsert)

  return (
    <PaginBar gap='gap.medium' space='between' vAlign='start'>
      <Flex space='between' gap='gap.small'>
        {buttons}
      </Flex>
      <div>
        每页{' '}
        <PaginDropdown
          inline
          items={pageSizeOptions}
          value={pageSize}
          onChange={onChangePagelen}
          a11ySelectedItemsMessage={`每页${pageSize}例`}
        />
        例
      </div>
    </PaginBar>
  )
}

export default Pagination
