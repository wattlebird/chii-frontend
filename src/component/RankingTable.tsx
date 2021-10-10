import React, {useEffect, useState, useMemo} from 'react';
import { Flex, Input, Label } from "@fluentui/react-northstar";
import { SearchIcon, LinkIcon } from '@fluentui/react-icons-northstar'
import _ from "lodash";
import { useDebounce } from './lib/Hooks'
import { useGetRankingListQuery, Maybe, SubjectFragment, TagFragment} from "../graphql/index.generated";
import CustomTable from './lib/CustomTable';

type DataSource <T> = Partial<T> & {key: string | number | undefined}

type RankingTableProps = {
  count?: Maybe<number>
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

  const parser = new DOMParser();
  const dataSource = useMemo(() => {
    let dataSource: DataSource<SubjectFragment>[] = [] 
    if (rankingData?.queryRankingList) {
      dataSource = rankingData.queryRankingList
        .filter(row => !debouncedKeyword || (row?.nameCN && row?.nameCN.includes(debouncedKeyword)) || row?.name.includes(debouncedKeyword))
        .map<DataSource<SubjectFragment>>(itm => ({...itm as SubjectFragment, key: itm?.id}))
    }
    return dataSource
  }, [rankingData?.queryRankingList, debouncedKeyword])

  const columns = [
    {key: "name", title: "番组动画", dataIndex: "name", width: 2, render: (_: any, rec: SubjectFragment) => <span>
      {parser.parseFromString(rec?.nameCN || rec?.name || "", 'text/html').body.textContent} <a href={`https://chii.in/subject/${rec.id}`} rel="noopener noreferrer" target="_blank"><LinkIcon /></a>
    </span>},
    {key: "scirank", title: "本站排名", dataIndex: "sciRank", sorter: (a: SubjectFragment, b: SubjectFragment) => sortSubject(_.get(a, 'sciRank'), _.get(b, 'sciRank'))},
    {key: "bgmrank", title: "Bangumi 排名", dataIndex: "rank", sorter: (a: SubjectFragment, b: SubjectFragment) => sortSubject(_.get(a, 'rank'), _.get(b, 'rank'))},
    {key: "tags", title: "标签", dataIndex: "tags", width: 4, render: (tags: TagFragment[], rec: SubjectFragment) => 
      <Flex hAlign="end" gap="gap.small">
        {tags?.map(tag => <Label key={`${rec?.id}_${tag?.tag}`} content={<span>{tag?.tag} <small>{tag?.tagCount}</small></span>} />)}
      </Flex>
    },
  ]

  return <Flex column id='searchbar'>
    <Input fluid icon={<SearchIcon />} onChange={onChangeKeyword} value={keyword} placeholder="输入想要搜索的番剧名称，如“莉兹与青鸟”" />
    <CustomTable dataSource={dataSource} columns={columns} loading={loading}/>
  </Flex>
}

export default RankingTable;