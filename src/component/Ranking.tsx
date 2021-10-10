import React from 'react';
import { Flex, Text, Alert, Header } from "@fluentui/react-northstar";
import styled from 'styled-components';
import { useGetRankingDateQuery, useGetRankingCountQuery } from "../graphql/index.generated"
import RankingTable from './RankingTable';
import { TitlePanel, ArticlePanel } from './lib/Styled';

const Ranking = () => {
  const { loading: isDateLoading, error: dateError, data: dateData } = useGetRankingDateQuery();
  const { loading: isCountLoading, error: countError, data: countData } = useGetRankingCountQuery();

  return <ArticlePanel column>
    <TitlePanel>
      <Header content="某科学的动画排名" description="由 Bangumi 全体用户数据重新挖掘而得" />
    </TitlePanel>
    <Flex hAlign="end">
      <Text>排名更新日期：{dateData?.queryRankingDate?.substr(0, 10)}</Text>
    </Flex>
    {isCountLoading || <RankingTable count={countData?.queryRankingCount} />}
    {dateError && <Alert danger content="The date is not loaded correctly." />}
    {countError && <Alert danger content="The ranking list count is not loaded correctly." />}
  </ArticlePanel>
}

export default Ranking