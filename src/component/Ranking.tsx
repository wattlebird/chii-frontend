import React from 'react';
import { Flex, Text, Alert } from "@fluentui/react-northstar";
import styled from 'styled-components';
import { useGetRankingDateQuery, useGetRankingCountQuery } from "../graphql/index.generated"
import RankingTable from './RankingTable';
import { TitlePanel, FootnotePanel } from './lib/Styled';

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
    <TitlePanel>
      <Text content="某科学的动画排名" size="largest" weight="bold" />
      <Text className="sub" content="由 Bangumi 全体用户数据重新挖掘而得" size="large" />
    </TitlePanel>
    <Flex hAlign="end">
      <Text>排名更新日期：{dateData?.queryRankingDate?.substr(0, 10)}</Text>
    </Flex>
    {isCountLoading || <RankingTable count={countData?.queryRankingCount} />}
    {dateError && <Alert danger content="The date is not loaded correctly." />}
    {countError && <Alert danger content="The ranking list count is not loaded correctly." />}
  </RankPanel>
}

export default Ranking