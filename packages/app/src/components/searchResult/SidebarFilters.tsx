import React, { useContext, useMemo, useCallback } from 'react'
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import SortIcon from '@mui/icons-material/Sort'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import LeaderboardIcon from '@mui/icons-material/Leaderboard'
import StarIcon from '@mui/icons-material/Star'
import LocalOfferIcon from '@mui/icons-material/LocalOffer'
import TagIcon from '@mui/icons-material/Tag'
import CategoryIcon from '@mui/icons-material/Category'
import { SearchOptionsContext, ISearchOptionsContext } from '../../store/searchParams'
import { CategoryOption } from '../advancedSearch/CategoryOption'
import { SortByOption } from '../advancedSearch/SortByOption'
import { DateRangeOption } from '../advancedSearch/DateRangeOption'
import { RangeOption, MenuOption } from '../advancedSearch/RangeOption'
import { PublicTagsOption } from '../advancedSearch/PublicTagsOption'
import { isCelebrityCategory } from '../../hooks/Utils'
import { useGetRelatedTagsQuery } from '../../graphql/index.generated'

const SidebarContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  borderRadius: theme.spacing(1),
  position: 'sticky',
  top: theme.spacing(10),
  maxHeight: 'calc(100vh - 100px)',
  overflowY: 'auto',
}))

const FilterSection = styled(Accordion)(({ theme }) => ({
  boxShadow: 'none',
  '&:before': {
    display: 'none',
  },
  '&.Mui-expanded': {
    margin: 0,
  },
}))

const FilterSummary = styled(AccordionSummary)(({ theme }) => ({
  minHeight: 48,
  padding: theme.spacing(0, 1),
  '&.Mui-expanded': {
    minHeight: 48,
  },
  '& .MuiAccordionSummary-content': {
    alignItems: 'center',
    gap: theme.spacing(1),
    margin: theme.spacing(1, 0),
    '&.Mui-expanded': {
      margin: theme.spacing(1, 0),
    },
  },
}))

const FilterDetails = styled(AccordionDetails)(({ theme }) => ({
  padding: theme.spacing(0, 1, 2, 1),
}))

const ActiveTagsContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  gap: theme.spacing(0.5),
  marginBottom: theme.spacing(2),
}))

const StyledChip = styled(Chip)(({ theme }) => ({
  margin: theme.spacing(0.25),
}))

const RankRangeMenuOptions: MenuOption[] = [
  { key: 'default', value: 'default', display: '不限排名' },
  { key: '100', value: '100', display: '前 100 名', lte: 100 },
  { key: '1000', value: '1000', display: '前 1000 名', lte: 1000 },
  { key: 'custom', value: 'custom', display: '自定义排名范围' },
]

const DefaultRankRange = { gte: 1, lte: 10000 }

const ScoreRangeMenuOptions: MenuOption[] = [
  { key: 'default', value: 'default', display: '不限评分' },
  { key: '9', value: '9', display: '9 分以上', gte: 9.0 },
  { key: '7.5', value: '7.5', display: '7.5 分以上', gte: 7.5 },
  { key: 'custom', value: 'custom', display: '自定义分数范围' },
]

const DefaultScoreRange = { gte: 1, lte: 10 }

interface ISidebarFiltersProps {
  onRemoveTag: (tag: string) => void
  onAddTag: (tag: string) => void
}

export const SidebarFilters: React.FC<ISidebarFiltersProps> = ({ onRemoveTag, onAddTag }) => {
  const {
    category,
    setCategory,
    tags,
    dateRange,
    setDateRange,
    subSortBy,
    setSubSortBy,
    celebSortBy,
    setCelebSortBy,
    rankRange,
    setRankRange,
    customRankRange,
    setCustomRankRange,
    scoreRange,
    setScoreRange,
  } = useContext<ISearchOptionsContext>(SearchOptionsContext)

  const isCelebrity = useMemo(() => isCelebrityCategory(category), [category])
  const displayPublicTags = useMemo(() => ['anime', 'book', 'game', 'real'].includes(category), [category])

  // Related tags query
  const { data: relatedTagsData, loading: relatedTagsLoading } = useGetRelatedTagsQuery({
    variables: { tags },
    skip: tags.length === 0,
  })

  const handleAddTag = useCallback(
    (tag: string) => {
      if (!tags.includes(tag)) {
        onAddTag(tag)
      }
    },
    [tags, onAddTag]
  )

  return (
    <SidebarContainer elevation={0} variant="outlined">
      {/* Active Tags Display */}
      {tags.length > 0 && (
        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
            <TagIcon fontSize="small" color="primary" />
            已选标签
          </Typography>
          <ActiveTagsContainer>
            {tags.map((tag) => (
              <StyledChip
                key={tag}
                label={tag}
                size="small"
                color="primary"
                onDelete={() => onRemoveTag(tag)}
              />
            ))}
          </ActiveTagsContainer>
        </Box>
      )}

      {/* Category Filter */}
      <FilterSection defaultExpanded>
        <FilterSummary expandIcon={<ExpandMoreIcon />}>
          <CategoryIcon fontSize="small" color="action" />
          <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
            类型
          </Typography>
        </FilterSummary>
        <FilterDetails>
          <CategoryOption category={category} setCategory={setCategory} />
        </FilterDetails>
      </FilterSection>

      {/* Sort By Filter */}
      <FilterSection defaultExpanded>
        <FilterSummary expandIcon={<ExpandMoreIcon />}>
          <SortIcon fontSize="small" color="action" />
          <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
            排序方式
          </Typography>
        </FilterSummary>
        <FilterDetails>
          <SortByOption
            category={category}
            subSortBy={subSortBy}
            celebSortBy={celebSortBy}
            setSubSortBy={setSubSortBy}
            setCelebSortBy={setCelebSortBy}
          />
        </FilterDetails>
      </FilterSection>

      {/* Date Range Filter - Only for subjects */}
      {!isCelebrity && (
        <FilterSection defaultExpanded>
          <FilterSummary expandIcon={<ExpandMoreIcon />}>
            <CalendarMonthIcon fontSize="small" color="action" />
            <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
              日期范围
            </Typography>
          </FilterSummary>
          <FilterDetails>
            <DateRangeOption dateRange={dateRange} setDateRange={setDateRange} />
          </FilterDetails>
        </FilterSection>
      )}

      {/* Bangumi Rank Range - Only for subjects */}
      {!isCelebrity && (
        <FilterSection defaultExpanded>
          <FilterSummary expandIcon={<ExpandMoreIcon />}>
            <LeaderboardIcon fontSize="small" color="action" />
            <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
              Bangumi 排名
            </Typography>
          </FilterSummary>
          <FilterDetails>
            <RangeOption
              id="sidebar-rank-range"
              range={rankRange}
              defaultRange={DefaultRankRange}
              setRange={setRankRange}
              menuOptions={RankRangeMenuOptions}
              defaultOptionKey="default"
            />
          </FilterDetails>
        </FilterSection>
      )}

      {/* Custom Rank Range - Only for anime */}
      {category === 'anime' && (
        <FilterSection defaultExpanded>
          <FilterSummary expandIcon={<ExpandMoreIcon />}>
            <LeaderboardIcon fontSize="small" color="secondary" />
            <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
              本站排名
            </Typography>
          </FilterSummary>
          <FilterDetails>
            <RangeOption
              id="sidebar-custom-rank-range"
              range={customRankRange}
              defaultRange={DefaultRankRange}
              setRange={setCustomRankRange}
              menuOptions={RankRangeMenuOptions}
              defaultOptionKey="default"
            />
          </FilterDetails>
        </FilterSection>
      )}

      {/* Score Range Filter - Only for subjects */}
      {!isCelebrity && (
        <FilterSection defaultExpanded>
          <FilterSummary expandIcon={<ExpandMoreIcon />}>
            <StarIcon fontSize="small" color="action" />
            <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
              评分范围
            </Typography>
          </FilterSummary>
          <FilterDetails>
            <RangeOption
              id="sidebar-score-range"
              range={scoreRange}
              defaultRange={DefaultScoreRange}
              setRange={setScoreRange}
              menuOptions={ScoreRangeMenuOptions}
              defaultOptionKey="default"
            />
          </FilterDetails>
        </FilterSection>
      )}

      {/* Public Tags - Only for anime/book/game/real */}
      {displayPublicTags && (
        <FilterSection>
          <FilterSummary expandIcon={<ExpandMoreIcon />}>
            <LocalOfferIcon fontSize="small" color="action" />
            <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
              精选标签
            </Typography>
          </FilterSummary>
          <FilterDetails>
            <PublicTagsOption
              category={category}
              tags={tags}
              addTag={handleAddTag}
              removeTag={onRemoveTag}
            />
          </FilterDetails>
        </FilterSection>
      )}

      {/* Related Tags */}
      {tags.length > 0 && !relatedTagsLoading && relatedTagsData?.queryRelatedTags && relatedTagsData.queryRelatedTags.length > 0 && (
        <FilterSection>
          <FilterSummary expandIcon={<ExpandMoreIcon />}>
            <TagIcon fontSize="small" color="action" />
            <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
              相似标签
            </Typography>
          </FilterSummary>
          <FilterDetails>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {relatedTagsData.queryRelatedTags.slice(0, 30).map((tag) => (
                <StyledChip
                  key={tag.content}
                  label={
                    <span>
                      {tag.content} <small>{tag.userCount}</small>
                    </span>
                  }
                  size="small"
                  variant="outlined"
                  onClick={() => handleAddTag(tag.content)}
                />
              ))}
            </Box>
            {relatedTagsData.queryRelatedTags.length > 30 && (
              <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                还有 {relatedTagsData.queryRelatedTags.length - 30} 个相似标签
              </Typography>
            )}
          </FilterDetails>
        </FilterSection>
      )}
    </SidebarContainer>
  )
}

SidebarFilters.displayName = 'SidebarFilters'