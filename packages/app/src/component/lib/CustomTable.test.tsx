import React from 'react'
import { fireEvent, prettyDOM, render, within } from '@testing-library/react'
import _ from 'lodash'
import CustomTable from './CustomTable'

const mockColumns = [
  {
    key: 'mocktitlekey',
    dataIndex: 'item',
    title: 'mocktitle',
    sorter: jest.fn((a, b) => a - b)
  }
]

const mockData = _.range(0, 100).map((itm) => ({ key: itm, item: itm }))

beforeEach(() => jest.clearAllMocks())

it('When loading a table', () => {
  const { getByText } = render(<CustomTable columns={mockColumns} dataSource={[]} loading />)
  expect(getByText(/加载中.../)).toBeVisible()
})

it('When display data', () => {
  const { getByRole, getAllByRole, getByLabelText } = render(
    <CustomTable columns={mockColumns} dataSource={mockData} />
  )

  // header
  const columnheader = getByRole('columnheader')
  expect(within(columnheader).getByText('mocktitle')).toBeVisible()
  expect(within(columnheader).getByLabelText('顺序排列mocktitle')).toBeVisible()

  // rows
  let rows = getAllByRole('row')
  expect(rows).toHaveLength(21)
  expect(within(rows[1]).getByRole('cell', { name: /0/i })).toBeVisible()

  fireEvent.click(getByLabelText('下一页'))
  rows = getAllByRole('row')
  expect(rows).toHaveLength(21)
  expect(within(rows[1]).getByRole('cell', { name: /20/i })).toBeVisible()
})

it('When sort data', () => {
  const columns = [
    {
      key: 'mocktitlekey',
      dataIndex: 'item',
      title: 'mocktitle',
      sorter: (a: object, b: object) => _.get(a, 'item') - _.get(b, 'item')
    }
  ]
  const { getAllByRole, getByLabelText } = render(<CustomTable columns={columns} dataSource={mockData} />)
  fireEvent.click(getByLabelText('顺序排列mocktitle'))
  let rows = getAllByRole('row')
  expect(within(rows[1]).getByRole('cell', { name: /0/i })).toBeVisible()

  fireEvent.click(getByLabelText('顺序排列mocktitle'))
  expect(getByLabelText('逆序排列mocktitle')).toBeVisible()
  rows = getAllByRole('row')
  expect(within(rows[1]).getByRole('cell', { name: /99/i })).toBeVisible()
})

it('Test render function', () => {
  const mockRender = jest.fn()
  const column = [
    {
      key: 'mocktitlekey',
      dataIndex: 'item',
      title: 'mocktitle',
      width: 2,
      render: mockRender
    }
  ]
  render(<CustomTable columns={column} dataSource={mockData} />)
  expect(mockRender).toHaveBeenCalledTimes(20)
})

it('Test scroll functionality', () => {
  const { getByLabelText } = render(<CustomTable columns={mockColumns} dataSource={mockData} />)

  global.window.scrollY = 1000
  fireEvent.click(getByLabelText('下一页'))
})
