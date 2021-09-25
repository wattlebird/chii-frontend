import React from 'react'
import styled from 'styled-components'
import { Button, Flex, Dropdown, DropdownProps, Tooltip } from "@fluentui/react-northstar";
import { ChevronStartIcon, ChevronEndIcon } from '@fluentui/react-icons-northstar'

const PaginBar = styled(Flex)`
  ::before {
    content: ""
  }
`

const PaginDropdown = styled(Dropdown)`
  .ui-dropdown__container {
    width: 3rem
  }
`

type PaginationProps = {
  current: number,
  total: number,
  disabled?: boolean,
  pageSize: number,
  pageSizeOptions: number[],
  onChange: (page: number, pageSize: number) => void,
  onShowSizeChange: (currentPage: number, size: number) => void
}

const Pagination = ({current, total, disabled, pageSize, pageSizeOptions, onShowSizeChange, onChange}: PaginationProps) => {
  const lastpage = total === 0 ? 1 : Math.ceil(total/pageSize)
  const displaySkipForward = lastpage - current > 3
  const displaySkipBackward = current > 4

  const onChangePagelen = (_: any, {value}: DropdownProps) => {
    const newPagelen : number = value as number;
    if (current * newPagelen > total) onChange(Math.ceil(total / newPagelen), newPagelen)
    onShowSizeChange(current, newPagelen);
  }

  const onJumpForward = () => {
    const landingpage = current + 5 > lastpage ? lastpage : current + 5
    onChange(landingpage, pageSize)
  }

  const onJumpBackward = () => {
    const landingpage = current - 5 < 1 ? 1 : current - 5
    onChange(landingpage, pageSize)
  }

  const buttons = [
    <Button key="prev" content={<ChevronStartIcon />} iconOnly disabled={disabled || current===1} onClick={() => onChange(current - 1, pageSize)} />,
    <Button key="1" content="1" text={current === 1} iconOnly disabled={disabled} onClick={() => onChange(1, pageSize)} />,
    <Button key="next" content={<ChevronEndIcon />} iconOnly disabled={disabled || current===lastpage} onClick={() => onChange(current + 1, pageSize)} />
  ]
  const toinsert = [current - 2, current - 1, current, current + 1, current + 2]
    .filter(page => page > 1 && page < lastpage)
    .map(page => <Button key={`${page}`} text={current === page} content={page} iconOnly disabled={disabled} onClick={() => onChange(page, pageSize)} />)
  
  if (displaySkipBackward) {
    toinsert.unshift(<Tooltip trigger={<Button key="jumpbackward" text content="《" iconOnly disabled={disabled} onClick={onJumpBackward} />} content="jump backward 5 pages" />)
  }
  if (displaySkipForward) {
    toinsert.push(<Tooltip trigger={<Button key="jumpforward" text content="》" iconOnly disabled={disabled} onClick={onJumpForward} />} content="jump forward 5 pages" />)
  }
  if (lastpage !== 1) {
    toinsert.push(<Button key={`${lastpage}`} text={current === lastpage} content={lastpage} iconOnly disabled={disabled} onClick={() => onChange(lastpage, pageSize)} />)
  }
  buttons.splice(2, 0, ...toinsert)


  return <PaginBar gap="gap.medium" space="between" vAlign="start">
  <Flex space="between" gap="gap.small">{buttons}</Flex>
  <div>每页{" "}<PaginDropdown inline items={pageSizeOptions} value={pageSize} onChange={onChangePagelen}/>例</div>
</PaginBar>

}

export default Pagination;