import React from 'react'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import TablePagination from '@mui/material/TablePagination';
import { useGetRankingDateQuery, useGetRankingListQuery } from '../graphql/index.generated'
import { Subject } from '../Types'
import { RankingTable } from '../components/RankingTable'
import { usePagination } from '../hooks/Pagination'

export const Ranking = () => {
  const { data: rankingDate, loading: dateLoading, error: dateError } = useGetRankingDateQuery()
  const { data, loading, error } = useGetRankingListQuery({
    variables: {
      type: 'anime',
    },
  })
  const { page, rowsPerPage, handleChangePage, handleChangeRowsPerPage } = usePagination(0, 20)
  const dateStr = rankingDate && rankingDate.queryRankingDate.split('T')[0]
  const rankList: Array<Subject> = data ? data.queryRankingList : []
  return (
    <Container maxWidth='lg' component='section'>
      <Typography variant='h4' component='h1' gutterBottom sx={{ fontWeight: 'bold', mt: '2rem' }}>
        某科学的动画排名
      </Typography>
      {!dateError && !dateLoading && (
        <Typography variant='body1' component='div' gutterBottom sx={{ textAlign: 'right' }}>
          排名生成时间：{dateStr}
        </Typography>
      )}
      {!loading && !error && (
        <>
          <RankingTable page={page} rowsPerPage={rowsPerPage} data={rankList} />
          <TablePagination
            rowsPerPageOptions={[20, 50, 100]}
            component='div'
            count={rankList.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </>
      )}
    </Container>
  )
}
