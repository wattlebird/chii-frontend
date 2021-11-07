import React, {useEffect, useMemo, useState}from 'react'
import { Dropdown, Flex, Header } from '@fluentui/react-northstar';
import { useLocation, useHistory } from 'react-router';
import styled from 'styled-components';
import { useGetTagListQuery } from "../graphql/index.generated"
import RelatedTags from './RelatedTags';
import TagTable from './TagTable'
import { TitlePanel, ArticlePanel } from './lib/Styled';

const ResultPanel = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  padding: 0.625rem 0;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`

const TablePanel = styled.div`
  flex: 3;
  margin-top: 0.625rem;
  @media (min-width: 769px) {
    margin-right: 0.625rem;
  }
`

const RelatedTagsPanel = styled.div`
  flex: 1;
  @media (max-width: 768px) {
    order: -1;
  }
`

const Tags = () => {
  const { loading, data: taglistData } = useGetTagListQuery();
  const [items, setItems] = useState<string[]>([])
  let location = useLocation();
  let history = useHistory();
  const initialTags: string[] = useMemo(() => {
    if (taglistData?.getTagList) {
      setItems(taglistData?.getTagList.map(itm => itm?.tag as string).slice(0, 20));
      return taglistData.getTagList.map(itm => itm?.tag as string)
    } else {
      return []
    }
  }, [taglistData, loading])
  const [tags, setTags] = useState<string[]>([])
  useEffect(() => {
    const qs = decodeURI(location.search)
    const queryTags = qs ? qs.slice(3).split(' ').filter(x => !!x) : []
    if (queryTags.length !== tags.length || queryTags.some((t, i) => t != tags[i])) setTags(queryTags);
  }, [location.search, tags, setTags])

  const onSearch = (_: any, {searchQuery: value}: any) => {
    if (!value) setItems(initialTags.slice(0, 20));
    const filteredTags = initialTags.filter(itm => itm.includes(value))
    if (filteredTags.length === 0) {
      setItems([value])
    } else {
      setItems(filteredTags.slice(0, 20))
    }
  }

  const onSelect = (_: any, {value}: any) => {
    if (value.length <= 0) {
      history.push(`/tags`)
      return;
    }
    history.push(`/tags?q=${encodeURI(value.join(" "))}`)
  }

  const appendSearchTag = (tag: string) => {
    const newtags = [...tags, tag]
    history.push(`/tags?q=${encodeURI(newtags.join(" "))}`)
  }
  
  return <ArticlePanel column gap="gap.small">
    <TitlePanel>
      <Header content="多标签搜索" />
    </TitlePanel>
    <Flex.Item grow><Dropdown multiple search fluid placeholder="输入标签，如“搞笑”，“日常”..." disabled={loading} items={items} value={tags} onSearchQueryChange={onSearch} onChange={onSelect} id='searchbar'/></Flex.Item>
    {tags.length !== 0 &&
      <ResultPanel>
        <TablePanel>
          <TagTable tags={tags} />
        </TablePanel>
        <RelatedTagsPanel>
          <RelatedTags tags={tags} appendSearchTag={appendSearchTag} />
        </RelatedTagsPanel>
      </ResultPanel>
    }
  </ArticlePanel>
}

export default Tags;