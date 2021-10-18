import React, {useMemo} from 'react'
import { useParams, useHistory } from 'react-router';
import styled from 'styled-components';
import { Header, Text, Label, Divider, Loader } from '@fluentui/react-northstar';
import { TagFragment, useGetBangumiSubjectQuery, useGetSubjectQuery } from "../graphql/index.generated";
import { ArticlePanel, LoadingPanel } from './lib/Styled';

const SubjectPanel = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 2rem;
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
  @media (min-width: 769px) {
    flex-direction: row;
    align-items: flex-start;
  }
`

const LeftPanel = styled.div`
  margin-right: 2rem;
  margin-bottom: 2rem;
`

const RightPanel = styled.div`
  flex-basis: 380px;
`

const TagPanel = styled.div`
  margin: 2rem 0;
`

function datestr(type: string | undefined, date: string | undefined | null) {
  if (!date || date?.startsWith("0000")) return ""
  switch(type) {
    case "2":
    case "6":
      return `放送开始：${date}`;
    case "3":
      return `发售日期：${date}`;
    case "4":
      return `发行日期：${date}`;
    default:
      return "";
  }
}

function rankstr(type: string | undefined, rank: number | null | undefined) {
  if (!rank) return "";
  switch (type) {
    case "1":
      return `Bangumi 书籍排名：${rank}`
    case "2":
      return `Bangumi 番组排名：${rank}`
    case "3":
      return `Bangumi 音乐排名：${rank}`
    case "4":
      return `Bangumi 游戏排名：${rank}`
    case "6":
      return `Bangumi 三次元排名：${rank}`
  }
}

function tagsorter(a: TagFragment | undefined | null, b: TagFragment | undefined | null) {
  if (!a) return !!b ? -1 : 0;
  if (!b) return 1;
  return b.tagCount - a.tagCount;
}

function Subject() {
  const {id} = useParams<{id: string}>();
  const {loading, error, data: subjectData} = useGetSubjectQuery({
    variables: {id: parseInt(id)},
  });
  const {loading: bgmLoading, error: bgmError, data: bgmSubjectData} = useGetBangumiSubjectQuery({
    variables: {id: parseInt(id)}
  });
  let history = useHistory();
  const tags = useMemo(() => {
    return subjectData?.querySubject?.tags
    ?.filter(tag => tag && tag?.confidence > 1e-3)
    .sort(tagsorter)
    .map(itm => <Label circular key={itm?.tag}
      content={<span>{itm?.tag} <small>{itm?.tagCount}</small></span>}
      styles={{margin: "0.25rem", cursor: "pointer"}}
      onClick={() => {if (itm?.tag) history.push(`/tags?q=${encodeURI(itm?.tag)}`)}}
    />)
  }, [subjectData?.querySubject?.tags])
  const dateStr = datestr(bgmSubjectData?.queryBangumiSubject?.type, bgmSubjectData?.queryBangumiSubject?.air_date);
  const rankStr = rankstr(bgmSubjectData?.queryBangumiSubject?.type, subjectData?.querySubject?.rank);

  return <ArticlePanel>
    <SubjectPanel>
      <LeftPanel>
        <Header content={subjectData?.querySubject?.name} description={subjectData?.querySubject?.nameCN} />
        <Text content={bgmSubjectData?.queryBangumiSubject?.summary} style={{whiteSpace: "pre-line"}}/>
        {bgmLoading && 
          <LoadingPanel>
            <Loader label="加载中..." />
          </LoadingPanel>
        }
      </LeftPanel>
      <RightPanel>
        <img width="320" src={bgmSubjectData?.queryBangumiSubject?.images?.large} alt={subjectData?.querySubject?.name} />
        <br />
        <Text content="Bangumi 番组计划链接：" />
        <a href={`https://chii.in/subject/${id}`} rel="noopener noreferrer" target="_blank">https://chii.in/subject/{id}</a>
        {dateStr && <br />}
        {dateStr && <Text content={dateStr} />}
        <br />
        <Text content={`${subjectData?.querySubject?.favnum}人标记`} />
        {subjectData?.querySubject?.sciRank && <br />}
        {subjectData?.querySubject?.sciRank && <Text content={`本站排名：${subjectData?.querySubject?.sciRank}`} />}
        {rankStr && <br />}
        {rankStr && <Text content={rankStr} />}
      </RightPanel>
    </SubjectPanel>
    <Divider />
    <TagPanel>
      <Text content="标签：" />
      {tags}
      {tags?.length === 0 && <Text content="暂时没有有意义的标签，哭哭哦" />}
    </TagPanel>
  </ArticlePanel>
}

export default Subject;