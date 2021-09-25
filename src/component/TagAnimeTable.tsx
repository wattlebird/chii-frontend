import React, {useMemo} from 'react'
import styled from 'styled-components'
import _ from 'lodash';
import { SubjectFragment, useSearchSubjectByTagQuery } from "../graphql/index.generated";
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
  const parser = new DOMParser();
  const {loading, data} = useSearchSubjectByTagQuery({
    variables: {
      tags
    }
  })

  const dataSource = useMemo<SubjectFragment[]>(() => {
    let dataSource: SubjectFragment[] = []
    if (data?.searchByTag) {
      dataSource = [...data.searchByTag] as SubjectFragment[];
    }
    return dataSource
  }, [data?.searchByTag])

  const columns = [
    {key: "name", title: "番组动画", dataIndex: "name", width: 2, render: (_: string, rec: SubjectFragment) => <a
      href={`https://chii.in/subject/${rec.id}`}
      target="_blank"
      rel="noopener noreferrer"
    >{parser.parseFromString(rec?.nameCN || rec?.name || "", 'text/html').body.textContent}</a>},
    {key: "scirank", title: "本站排名", dataIndex: "sciRank", sorter: (a: SubjectFragment, b: SubjectFragment) => sortSubject(_.get(a, 'sciRank'), _.get(b, 'sciRank'))},
    {key: "bgmrank", title: "Bangumi 排名", dataIndex: "rank", sorter: (a: SubjectFragment, b: SubjectFragment) => sortSubject(_.get(a, 'rank'), _.get(b, 'rank'))},
  ]

  if (tags.length === 0) return <EmptyPanel>
    <img src={doge} alt="Please find anime by tags" height="150px" />
    <div>输入标签查找动画吧！</div>
  </EmptyPanel>

  return <CustomTable dataSource={dataSource} columns={columns} loading={loading} />
}

export default TagAnimeTable;