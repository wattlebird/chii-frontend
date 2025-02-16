import * as React from 'react'
import Paper from '@mui/material/Paper'
import InputBase from '@mui/material/InputBase'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import NativeSelect from '@mui/material/NativeSelect'
import SearchIcon from '@mui/icons-material/Search'
import TagIcon from '@mui/icons-material/Tag'
import TuneIcon from '@mui/icons-material/Tune'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import { styled } from '@mui/material/styles'
import classNames from 'classnames'
import { SearchOptionsContext, ISearchOptionsContext } from '../../store/searchParams'
import { AdvancedOptions } from './AdvancedOptionsContainer'
import { CelebritySortBy, SubjectSortBy } from '../../graphql/index.generated'
import { isCelebrityCategory } from '../../hooks/Utils'
import { isEmpty } from 'lodash'
import { RankRangeOption } from './RankRangeOption'

interface ISimpleSearchBarProps {
  candidateTags?: string[]
  candidateQueries?: string[]
  onSearch: () => void
  addTag: (t: string) => void
  removeTag: (t: string) => void
  getAutoCompleteQuery: (q: string) => void
  getAutoCompleteTags: (tag: string) => void
  loadingCandidates: boolean
}

const StyledNativeSelect = styled(NativeSelect)(() => ({
  '&::before': {
    borderBottom: '0px',
  },
}))

const StyledSearchBarBox = styled(Paper)(() => ({
  p: '2px 4px',
  paddingLeft: 25,
  display: 'flex',
  alignItems: 'center',
  maxWidth: 800,
  height: 50,
  borderRadius: 25,
}))

const SearchBox = styled(Box)(() => ({
  flex: '1 1 auto',
  position: 'relative',
  display: 'flex',
  flexDirection: 'row',
}))

const StyledInput = styled(InputBase)(() => ({
  width: '100%',
}))

const Listbox = styled('ul')<{ expand: boolean }>(({ theme, expand }) => ({
  display: expand ? 'block' : 'none',
  width: '100%',
  margin: `2px 0 0`,
  padding: 0,
  position: 'absolute',
  top: '32px',
  listStyle: 'none',
  backgroundColor: `${theme.palette.mode === 'dark' ? '#141414' : '#fff'}`,
  overflow: 'auto',
  borderRadius: '4px',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
  zIndex: 1,

  '&.focus': {
    border: '2px solid currentcolor',
    borderRadius: '4px',
    padding: 0,
  },

  '& li': {
    padding: '5px 12px',
    display: 'flex',

    '& span': {
      flexGrow: 1,
    },
  },

  [`& li[role="option"].focused, & li[role="option"]:hover, & li[aria-selected='true']`]: {
    backgroundColor: `${theme.palette.mode === 'dark' ? '#003b57' : '#e6f7ff'}`,
    cursor: `pointer`,
  },

  '& li[role="presentation"]': {
    display: 'block',
    fontWeight: 'bold',
  },
}))

const useCandidateSelector = (category: string, cq?: string[], ct?: string[]) => {
  const iter = React.useRef(-1)
  const virtualCandidates = React.useMemo(() => {
    const rtn: string[] = []
    if (cq) {
      rtn.push(...cq.map((q) => `query:${q}`))
    }
    if (!isCelebrityCategory(category) && ct) {
      rtn.push(...ct.map((q) => `tag:${q}`))
    }
    return rtn
  }, [cq, ct])
  React.useEffect(() => {
    iter.current = -1
  }, [virtualCandidates])
  const onNext = React.useCallback<() => [string | undefined, number]>(() => {
    if (virtualCandidates.length <= 0) {
      return [undefined, -1]
    } else {
      if (iter.current >= virtualCandidates.length - 1) {
        iter.current = -1
      }
      iter.current++
      return [virtualCandidates[iter.current], iter.current]
    }
  }, [virtualCandidates])
  const onPrev = React.useCallback<() => [string | undefined, number]>(() => {
    if (virtualCandidates.length <= 0) {
      return [undefined, -1]
    } else {
      if (iter.current <= 0) {
        iter.current = virtualCandidates.length
      }
      iter.current--
      return [virtualCandidates[iter.current], iter.current]
    }
  }, [virtualCandidates])
  return [onNext, onPrev]
}

const SearchBar: React.FunctionComponent<ISimpleSearchBarProps> = React.memo(
  ({
    onSearch,
    addTag,
    removeTag,
    getAutoCompleteQuery,
    getAutoCompleteTags,
    candidateQueries: remoteCandidateQueries,
    candidateTags: remoteCandidateTags,
    loadingCandidates: loadingRemoteCandidates,
  }) => {
    const {
      query,
      tags,
      category,
      dateRange,
      subSortBy,
      celebSortBy,
      rankRange,
      customRankRange,
      setQuery,
      setCategory,
    } = React.useContext<ISearchOptionsContext>(SearchOptionsContext)
    const inputRef = React.useRef<HTMLInputElement>(null)
    const [localQuery, setLocalQuery] = React.useState('')
    const [expand, setExpand] = React.useState(false)
    const [selection, setSelection] = React.useState<string | undefined>()
    const [openAdvancedOptions, setOpenAdvancedOptions] = React.useState<boolean>(false)
    const candidateQueries = React.useMemo(() => {
      if (!localQuery && !remoteCandidateQueries) {
        return undefined
      } else if (!remoteCandidateQueries) {
        return [localQuery].filter((x) => !!x)
      } else {
        return [localQuery, ...remoteCandidateQueries.filter((x) => x !== localQuery)].filter((x) => !!x)
      }
    }, [localQuery, remoteCandidateQueries])
    const candidateTags = React.useMemo(() => {
      if (!localQuery && !remoteCandidateTags) {
        return undefined
      } else if (!remoteCandidateTags) {
        return [localQuery].filter((x) => !!x)
      } else {
        return [localQuery, ...remoteCandidateTags.filter((x) => x !== localQuery)].filter((x) => !!x)
      }
    }, [localQuery, remoteCandidateTags])
    const [onNext, onPrev] = useCandidateSelector(category, candidateQueries, candidateTags)

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setLocalQuery(e.target.value)
      getAutoCompleteQuery(e.target.value)
      if (!isCelebrityCategory(category)) {
        getAutoCompleteTags(e.target.value)
      }
    }
    const handleSelect = (value: string) => {
      const isep = value.indexOf(':')
      const typ = value.slice(0, isep)
      const q = value.slice(isep + 1)
      if (typ === 'tag') {
        addTag(q)
      } else if (inputRef.current) {
        inputRef.current.value = q
        setQuery(q)
      }
      setSelection(undefined)
      setExpand(false)
      // onSearch()
    }
    const onComboboxFocus = () => {
      setExpand(true)
    }
    const onComboboxBlur = () => {
      setTimeout(() => setExpand(false), 300)
    }
    const handleDeleteTag = (tag: string) => {
      removeTag(tag)
    }
    const onComboboxKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
      let flag = false
      const { value } = event.currentTarget
      switch (event.key) {
        case 'Enter':
          if (selection) {
            handleSelect(selection)
          } else if (inputRef.current) {
            handleSelect(`query:${inputRef.current.value}`)
          } else {
            onSearch()
          }
          flag = true
          break
        case 'Down':
        case 'ArrowDown':
          const [nxt] = onNext()
          setSelection(nxt)
          flag = true
          break
        case 'Up':
        case 'ArrowUp':
          const [pre] = onPrev()
          setSelection(pre)
          flag = true
          break
        case 'Esc':
        case 'Escape':
          if (expand) {
            setExpand(false)
          } else if (value && !!inputRef.current) {
            inputRef.current.value = ''
          }
          setSelection(undefined)
          flag = true
          break
        default:
      }
      if (flag) {
        event.preventDefault()
        event.stopPropagation()
      }
    }

    const onSelectType = (e: React.ChangeEvent<HTMLSelectElement>) => {
      setCategory(e.target.value)
    }

    const onClickSearch = () => {
      if (inputRef.current) {
        if (inputRef.current?.value !== query) {
          handleSelect(`query:${inputRef.current.value}`)
        } else {
          onSearch()
        }
      }
    }

    const highlightFilter = React.useMemo(() => {
      return (
        !!dateRange ||
        (subSortBy !== SubjectSortBy.Default && !isCelebrityCategory(category)) ||
        (celebSortBy !== CelebritySortBy.Default && isCelebrityCategory(category)) ||
        (!!rankRange && !isEmpty(rankRange)) ||
        (!!customRankRange && !isEmpty(customRankRange))
      )
    }, [dateRange, subSortBy, celebSortBy, category, rankRange, customRankRange])

    const onOpenAdvancedOptions = React.useCallback(() => setOpenAdvancedOptions(true), [setOpenAdvancedOptions])

    // React on new auto complete value
    React.useEffect(() => {
      if (
        (candidateQueries && candidateQueries.length > 0) ||
        (!isCelebrityCategory(category) && candidateTags && candidateTags)
      ) {
        setExpand(true)
      } else {
        setExpand(false)
      }
    }, [category, candidateQueries, candidateTags])

    // Keep query and input in sync from time to time
    React.useEffect(() => {
      if (inputRef.current) {
        inputRef.current.value = query
      }
    }, [query, tags])

    React.useEffect(() => {
      inputRef?.current?.focus()
    }, [])

    return (
      <StyledSearchBarBox>
        <StyledNativeSelect
          value={category}
          onChange={onSelectType}
          inputProps={{
            name: 'search-type',
          }}
        >
          <option value='subject'>条目</option>
          <option value='anime'>- 动画</option>
          <option value='book'>- 书籍</option>
          <option value='music'>- 音乐</option>
          <option value='game'>- 游戏</option>
          <option value='real'>- 三次元</option>
          <option value='celebrity'>人物</option>
          <option value='person'>- 现实人物</option>
          <option value='character'>- 虚拟人物</option>
        </StyledNativeSelect>
        <Divider sx={{ height: 28, m: 0.5 }} orientation='vertical' />
        <SearchBox>
          {tags.length > 0 && (
            <>
              {tags.map((tag) => (
                <Chip label={tag} key={tag} onDelete={handleDeleteTag.bind(this, tag)} />
              ))}
            </>
          )}
          <StyledInput
            onChange={handleSearchChange}
            inputProps={{
              ref: inputRef,
              onKeyDown: onComboboxKeyDown,
              onFocus: onComboboxFocus,
              onBlur: onComboboxBlur,
            }}
          />
          <Listbox expand={expand} aria-label='auto complete candidate queries and tags'>
            {candidateQueries && candidateQueries.length > 0 && <li role='presentation'>关键词</li>}
            {candidateQueries &&
              candidateQueries.length > 0 &&
              candidateQueries.map((cq) => {
                const key = `query:${cq}`
                return (
                  <li
                    role='option'
                    key={key}
                    onClick={() => handleSelect(key)}
                    className={classNames({ focus: key === selection })}
                    aria-selected={`${key === selection}`}
                  >
                    <SearchIcon aria-label='query' />
                    <span>{cq}</span>
                  </li>
                )
              })}
            {!isCelebrityCategory(category) && candidateTags && candidateTags.length > 0 && (
              <li role='presentation'>标签</li>
            )}
            {!isCelebrityCategory(category) &&
              candidateTags &&
              candidateTags.length > 0 &&
              candidateTags.map((ct) => {
                const key = `tag:${ct}`
                return (
                  <li
                    role='option'
                    key={key}
                    onClick={() => handleSelect(key)}
                    className={classNames({ focus: key === selection })}
                    aria-selected={`${key === selection}`}
                  >
                    <TagIcon aria-label='tag' />
                    <span>{ct}</span>
                  </li>
                )
              })}
          </Listbox>
        </SearchBox>
        <IconButton
          type='button'
          sx={{ p: '10px' }}
          aria-label='filters'
          onClick={onOpenAdvancedOptions}
          color={highlightFilter ? 'primary' : 'default'}
        >
          <TuneIcon />
        </IconButton>
        <IconButton type='button' sx={{ p: '10px' }} aria-label='search' onClick={onClickSearch}>
          <SearchIcon />
        </IconButton>
        <AdvancedOptions open={openAdvancedOptions} setOpen={setOpenAdvancedOptions} />
      </StyledSearchBarBox>
    )
  }
)

SearchBar.displayName = 'SearchBarRenderer'

export { SearchBar as SearchBarRenderer }
