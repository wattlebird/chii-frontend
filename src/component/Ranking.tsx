import React from 'react';
import { Flex, Text } from "@fluentui/react-northstar";
import styled from 'styled-components';
import { useGetRankingDateQuery, useGetRankingCountQuery } from "../graphql/index.generated"
import RankingTable from './RankingTable';

const RankPanel = styled(Flex)`
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

const Ranking = () => {
  const { loading: isDateLoading, error: dateError, data: dateData } = useGetRankingDateQuery();
  const { loading: isCountLoading, error: countError, data: countData } = useGetRankingCountQuery();

  return <RankPanel column>
    <Flex space="between">
      <Text>按名称过滤番组动画</Text>
      <Text>排名更新日期：{dateData?.queryRankingDate?.substr(0, 10)}</Text>
    </Flex>
    {isCountLoading || <RankingTable count={countData?.queryRankingCount} />}
  </RankPanel>
}

export default Ranking