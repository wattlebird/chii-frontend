import React, { FC, useCallback, useMemo, useContext } from 'react'
import Box from '@mui/material/Box'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableSortLabel from '@mui/material/TableSortLabel'
import { visuallyHidden } from '@mui/utils'
import { Order, Subject, SubjectKey } from '../Types'
import Link from '@mui/material/Link'
import { getComparator } from '../hooks/Utils'
import { SettingsContext, BgmPrefix } from '../store/setting'

interface RankingTableHeadProps {
  onRequestSort: (event: React.MouseEvent<unknown>, property: SubjectKey) => void
  order: Order
  orderBy: SubjectKey
}

interface RankingTableBodyProps {
  order: Order
  orderBy: SubjectKey
  page: number
  rowsPerPage: number
  data: Array<Subject>
}

interface RankingTableProps {
  page: number
  rowsPerPage: number
  data: Array<Subject>
}

const rankingTableHead = [
  { id: 'name', label: '番组名称', sortable: false },
  { id: 'scientificRank', label: '本站排名', sortable: true },
  { id: 'rank', label: 'Bangumi 排名', sortable: true },
]

const RankingTableHead: FC<RankingTableHeadProps> = ({ onRequestSort, order, orderBy }) => {
  const createSortHandler = useCallback(
    (property) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property)
    },
    [onRequestSort]
  )

  return (
    <TableHead>
      <TableRow>
        {rankingTableHead.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.id !== 'name' ? 'right' : 'left'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            {headCell.sortable ? (
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <Box component='span' sx={visuallyHidden}>
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </Box>
                ) : null}
              </TableSortLabel>
            ) : (
              headCell.label
            )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}

const RankingTableBody: FC<RankingTableBodyProps> = ({ order, orderBy, page, rowsPerPage, data }) => {
  const displayData = useMemo<Array<Subject>>(() => {
    return data
      .slice()
      .sort(getComparator(order, orderBy))
      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
  }, [order, orderBy, page, rowsPerPage, data])

  const { bgmPrefix } = useContext(SettingsContext)

  return (
    <TableBody>
      {displayData.map((row) => {
        return (
          <TableRow hover key={row.id}>
            <TableCell align='left'>
              <Link href={`${bgmPrefix}/subject/${row.id}`} target='_blank' rel='noopener noreferrer'>
                {row.nameCN || row.name}
              </Link>
            </TableCell>
            <TableCell align='right'>{row.scientificRank}</TableCell>
            <TableCell align='right'>{row.rank}</TableCell>
          </TableRow>
        )
      })}
    </TableBody>
  )
}

export const RankingTable: FC<RankingTableProps> = ({ page, rowsPerPage, data }) => {
  const [order, setOrder] = React.useState<Order>('asc')
  const [orderBy, setOrderBy] = React.useState<SubjectKey>('scientificRank')
  const handleRequestSort = (event: React.MouseEvent<unknown>, property: SubjectKey) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }
  return (
    <TableContainer>
      <Table sx={{ minWidth: 320 }}>
        <RankingTableHead order={order} orderBy={orderBy} onRequestSort={handleRequestSort} />
        <RankingTableBody order={order} orderBy={orderBy} page={page} rowsPerPage={rowsPerPage} data={data} />
      </Table>
    </TableContainer>
  )
}
