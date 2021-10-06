import React, {useMemo, useState}from 'react'
import { Dropdown, Flex, Text } from '@fluentui/react-northstar';
import styled from 'styled-components';
import { useGetTagListQuery } from "../graphql/index.generated"
import RelatedTags from './RelatedTags';
import TagAnimeTable from './TagAnimeTable'
import { TitlePanel } from './lib/Styled';

const TagsPanel = styled(Flex)`
  margin-top: 5rem;
  margin-bottom: 1rem;
  @media (min-width: 769px) {
    margin-left: 10rem;
    margin-right: 10rem;
  }
  @media (max-width: 768px) {
    margin-left: 1rem;
    margin-right: 1rem;
  }
`

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
  const initialTags: string[] = useMemo(() => {
    if (taglistData?.getTagList) {
      setItems(taglistData?.getTagList.map(itm => itm?.tag as string).slice(0, 20));
      return taglistData.getTagList.map(itm => itm?.tag as string)
    } else {
      return []
    }
  }, [taglistData, loading])
  const [tags, setTags] = useState<string[]>([])
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
    setTags(value)
  }

  const appendSearchTag = (tag: string) => {
    setTags(prev => {
      const nxt = [...prev];
      nxt.push(tag)
      return nxt
    })
  }
  
  return <TagsPanel column gap="gap.small">
    <TitlePanel>
      <Text size="largest" weight="bold">多标签搜索</Text>
    </TitlePanel>
    <Flex.Item grow><Dropdown multiple search fluid placeholder="输入标签，如“搞笑”，“日常”..." disabled={loading} items={items} value={tags} onSearchQueryChange={onSearch} onChange={onSelect} /></Flex.Item>
    {tags.length !== 0 &&
      <ResultPanel>
        <TablePanel>
          <TagAnimeTable tags={tags} />
        </TablePanel>
        <RelatedTagsPanel>
          <RelatedTags tags={tags} appendSearchTag={appendSearchTag} />
        </RelatedTagsPanel>
      </ResultPanel>
    }
  </TagsPanel>
}

export default Tags;