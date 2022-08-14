import React, { useCallback, useState } from 'react'

export function usePagination(start: number, step: number) {
  const [page, setPage] = useState(start)
  const [rowsPerPage, setRowsPerPage] = useState(step)
  const handleChangePage = useCallback(
    (event: unknown, newPage: number) => {
      setPage(newPage)
    },
    [setPage]
  )
  const handleChangeRowsPerPage = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setRowsPerPage(parseInt(event.target.value, 10))
      setPage(0)
    },
    [setPage, setRowsPerPage]
  )
  return { page, rowsPerPage, handleChangePage, handleChangeRowsPerPage }
}
