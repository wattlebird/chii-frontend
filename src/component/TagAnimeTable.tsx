import React, {useMemo} from 'react'
import styled from 'styled-components'
import _ from 'lodash';
import { useSearchSubjectByTagQuery } from "../graphql/index.generated";
import CustomTable from "./lib/CustomTable";
import doge from '../assets/dog3_4_tehe.png'

const EmptyPanel = styled.div`
  max-height: 720px;
  height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`

type TagAnimeTableProps = {
  tags: string[]
}

function sortSubject(a: number | null | undefined, b: number | null | undefined): number {
  if (typeof b !== "number") return -1
  else if (typeof a !== "number") return 1
  else return a - b
}

const TagAnimeTable = ({tags}: TagAnimeTableProps) => {
  const {loading, data} = useSearchSubjectByTagQuery({
    variables: {
      tags
    }
  })

  const dataSource = useMemo<object[]>(() => {
    let dataSource: object[] = []
    const parser = new DOMParser();
    if (data?.searchByTag) {
      dataSource = data.searchByTag.map(data => ({
        name: parser.parseFromString(data?.nameCN || data?.name || "", 'text/html').body.textContent,
        scirank: data?.sciRank,
        bgmrank: data?.rank
      }))
    }
    return dataSource
  }, [data?.searchByTag])

  const columns = [
    {key: "name", title: "番组动画", dataIndex: "name", width: 2},
    {key: "scirank", title: "本站排名", dataIndex: "scirank", sorter: (a: object, b: object) => sortSubject(_.get(a, 'scirank'), _.get(b, 'scirank'))},
    {key: "bgmrank", title: "Bangumi 排名", dataIndex: "bgmrank", sorter: (a: object, b: object) => sortSubject(_.get(a, 'bgmrank'), _.get(b, 'bgmrank'))},
  ]

  if (tags.length === 0) return <EmptyPanel>
    <img src={doge} alt="Please find anime by tags" height="150px" />
    <div>输入标签查找动画吧！</div>
  </EmptyPanel>

  return <CustomTable dataSource={dataSource} columns={columns} loading={loading} />
}

export default TagAnimeTable;