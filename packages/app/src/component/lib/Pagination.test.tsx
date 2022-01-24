import React from 'react'
import { fireEvent, render } from '@testing-library/react'
import Pagination from './Pagination'

const mockOnChange = jest.fn()
const mockOnShowSizeChange = jest.fn()

const paginationProps = {
  current: 1,
  total: 1,
  pageSize: 1,
  pageSizeOptions: [1, 2, 3],
  onChange: mockOnChange,
  onShowSizeChange: mockOnShowSizeChange
}

beforeEach(() => jest.clearAllMocks())

it('Test pagination button render', () => {
  const { getByLabelText, rerender } = render(<Pagination {...paginationProps} />)
  expect(getByLabelText('上一页')).toHaveAttribute('disabled')
  expect(getByLabelText('下一页')).toHaveAttribute('disabled')
  expect(getByLabelText('第1页')).toBeTruthy()

  rerender(<Pagination {...paginationProps} disabled />)
  expect(getByLabelText('第1页')).toHaveAttribute('disabled')
})

it('Test pagination page change', () => {
  const additionProps = {
    current: 2,
    total: 100, // 100 items
    pageSize: 20,
    pageSizeOptions: [20, 30]
  }

  const { getByLabelText } = render(<Pagination {...paginationProps} {...additionProps} />)
  fireEvent.click(getByLabelText('下一页'))
  expect(mockOnChange).toHaveBeenCalledWith(3, 20)

  fireEvent.click(getByLabelText('上一页'))
  expect(mockOnChange).toHaveBeenCalledWith(1, 20)
})

it('Jump forward and backward', () => {
  const additionProps = {
    current: 10,
    total: 1000,
    pageSize: 20,
    pageSizeOptions: [20, 30]
  }

  const { getByLabelText } = render(<Pagination {...paginationProps} {...additionProps} />)
  fireEvent.click(getByLabelText('向后5页'))
  expect(mockOnChange).toHaveBeenCalledWith(15, 20)
  fireEvent.click(getByLabelText('向前5页'))
  expect(mockOnChange).toHaveBeenCalledWith(5, 20)
})

it('Jump forward and backward: cornercase', () => {
  const additionProps = {
    current: 1,
    total: 100, // 100 items
    pageSize: 20,
    pageSizeOptions: [20, 30]
  }

  const { getByLabelText, rerender } = render(<Pagination {...paginationProps} {...additionProps} />)
  fireEvent.click(getByLabelText('向后5页'))
  expect(mockOnChange).toHaveBeenCalledWith(5, 20)

  rerender(<Pagination {...paginationProps} {...additionProps} current={5} />)
  fireEvent.click(getByLabelText('向前5页'))
  expect(mockOnChange).toHaveBeenCalledWith(1, 20)
})
