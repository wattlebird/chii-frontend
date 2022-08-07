import React, { useMemo, useState, useCallback, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import TablePagination from '@mui/material/TablePagination'
import { useGetRelatedSubjectsQuery } from '../graphql/index.generated'
import { SearchResultList } from '../components/SearchResultList'
import { RelatedTags } from '../components/RelatedTags'
import { usePagination } from '../hooks/Pagination'
import { Subject, SubjectType } from '../Types'

const typeName: Record<SubjectType, string> = {
  anime: '动画',
  book: '书籍',
  music: '音乐',
  game: '游戏',
  real: '三次元',
}

interface SearchResultProps {
  tags: string[]
}

const SearchResultStack = styled(Stack)(({ theme }) => ({
  [theme.breakpoints.up('sm')]: {
    flexDirection: 'row',
  },
}))

const SearchResult: React.FC<SearchResultProps> = ({ tags }) => {
  const {
    data: relatedSubs,
    loading: loadingSubs,
    error: subsError,
  } = useGetRelatedSubjectsQuery({
    variables: { q: tags.join('+') },
  })
  const [resultType, setResultType] = useState<SubjectType>('anime')
  const handleResultType = useCallback(
    (_: React.SyntheticEvent, newValue: SubjectType) => {
      setResultType(newValue)
    },
    [setResultType]
  )
  const { page, rowsPerPage, handleChangePage, handleChangeRowsPerPage } = usePagination(0, 20)
  const searchResults = useMemo<Record<SubjectType, Array<Subject>>>(() => {
    const rtn: Record<SubjectType, Array<Subject>> = {
      anime: [],
      book: [],
      music: [],
      game: [],
      real: [],
    }
    Object.keys(rtn).forEach(
      (typ) =>
        (rtn[typ as SubjectType] = relatedSubs?.queryRelatedSubjects
          ? relatedSubs.queryRelatedSubjects.filter((sub) => sub.type === typ)
          : [])
    )
    return rtn
  }, [relatedSubs])
  useEffect(() => {
    const firstTyp = Object.keys(searchResults).find((typ) => searchResults[typ as SubjectType].length !== 0)
    if (firstTyp) setResultType(firstTyp as SubjectType)
  }, [searchResults])

  if (loadingSubs || subsError) return <></>

  if (relatedSubs?.queryRelatedSubjects && relatedSubs?.queryRelatedSubjects?.length <= 0) {
    return (
      <Typography variant='body1' component='div'>
        未找到
      </Typography>
    )
  }

  return (
    <SearchResultStack spacing={2}>
      <Box sx={{ flex: 3 }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={resultType} onChange={handleResultType} aria-label='Search result tab for types'>
            {(Object.keys(searchResults) as Array<SubjectType>)
              .filter((typ) => searchResults[typ].length > 0)
              .map((typ) => (
                <Tab label={typeName[typ]} key={typ} value={typ} />
              ))}
          </Tabs>
        </Box>
        <SearchResultList page={page} rowsPerPage={rowsPerPage} data={searchResults[resultType]} type={resultType} />
        <TablePagination
          rowsPerPageOptions={[20, 50, 100]}
          component='div'
          count={searchResults[resultType].length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>
      <Box sx={{ flex: 1 }}>
        <RelatedTags tags={tags} />
      </Box>
    </SearchResultStack>
  )
}

export const Search = () => {
  const [searchParams, _] = useSearchParams()
  const [tags, setTags] = useState<string[]>(() => searchParams.get('q')?.trim().split(' ') ?? [])
  useEffect(() => {
    setTags(searchParams.get('q')?.trim().split(' ') ?? [])
  }, [searchParams])
  const onDeleteTag = useCallback(
    (tag: string) => {
      const i = tags.findIndex((t) => t === tag)
      if (i !== -1) {
        const nxt = [...tags]
        nxt.splice(i, 1)
        setTags(nxt)
      }
    },
    [tags]
  )
  return (
    <Container maxWidth='lg' component='section'>
      <Typography variant='h4' component='h1' gutterBottom sx={{ fontWeight: 'bold', mt: '2rem' }}>
        多标签搜索
      </Typography>
      {tags.length > 0 && (
        <Stack direction='row' spacing={1}>
          {tags.map((t) => (
            <Chip label={t} onDelete={() => onDeleteTag(t)} key={t} />
          ))}
        </Stack>
      )}
      {tags.length > 0 && <SearchResult tags={tags} />}
      {tags.length === 0 && (
        <Typography variant='body1' component='div'>
          没有需要搜索的标签。请在右上角搜索框输入关键词开始搜索。
        </Typography>
      )}
    </Container>
  )
}
