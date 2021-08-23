import React, {useEffect, useState, useMemo} from 'react';
import { Flex, Input, Label } from "@fluentui/react-northstar";
import { SearchIcon } from '@fluentui/react-icons-northstar'
import _ from "lodash";
import { useGetRankingListQuery, Maybe} from "../graphql/index.generated";
import CustomTable from './lib/CustomTable';



type RankingTableProps = {
  count?: Maybe<number>
}

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(
    () => {
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);

      return () => {
        clearTimeout(handler);
      };
    },
    [value, delay]
  );

  return debouncedValue;
}


function sortSubject(a: number | null | undefined, b: number | null | undefined): number {
  if (typeof b !== "number") return -1
  else if (typeof a !== "number") return 1
  else return a - b
}

const RankingTable = ({count}: RankingTableProps) => {
  const {loading, data: rankingData} = useGetRankingListQuery({
    variables: {
      bysci: true,
      from: 0,
      step: count
    }
  })
  const [keyword, setKeyword] = useState("")
  const debouncedKeyword = useDebounce(keyword, 500)
  const onChangeKeyword = ({currentTarget: {value}}: any) => {
    setKeyword(value)
  }
  const dataSource = useMemo<object[]>(() => {
    let dataSource: object[] = []
    const parser = new DOMParser();
    if (rankingData?.queryRankingList) {
      const rst = rankingData.queryRankingList.filter(row => !debouncedKeyword || (row?.nameCN && row?.nameCN.includes(debouncedKeyword)) || row?.name.includes(debouncedKeyword));
      dataSource = rst.map(data => ({
        name: parser.parseFromString(data?.nameCN || data?.name || "", 'text/html').body.textContent,
        scirank: data?.sciRank,
        bgmrank: data?.rank,
        tags: <Flex hAlign="end" gap="gap.small">
          {data?.tags?.map(tag => <Label key={`${data?.id}_${tag?.tag}`} content={<span>{tag?.tag} <small>{tag?.tagCount}</small></span>} />)}
        </Flex>
      }))
    }
    return dataSource
  }, [rankingData?.queryRankingList, debouncedKeyword])

  const columns = [
    {key: "name", title: "番组动画", dataIndex: "name", width: 2},
    {key: "scirank", title: "本站排名", dataIndex: "scirank", sorter: (a: object, b: object) => sortSubject(_.get(a, 'scirank'), _.get(b, 'scirank'))},
    {key: "bgmrank", title: "Bangumi 排名", dataIndex: "bgmrank", sorter: (a: object, b: object) => sortSubject(_.get(a, 'bgmrank'), _.get(b, 'bgmrank'))},
    {key: "tags", title: "标签", dataIndex: "tags", width: 4},
  ]

  return <Flex column>
    <Input fluid icon={<SearchIcon />} onChange={onChangeKeyword} value={keyword}/>
    <CustomTable dataSource={dataSource} columns={columns} loading={loading}/>
  </Flex>
}

export default RankingTable;