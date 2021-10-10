import React, {useMemo} from 'react'
import styled from 'styled-components'
import _ from 'lodash';
import { Alert } from "@fluentui/react-northstar";
import { LinkIcon } from '@fluentui/react-icons-northstar'
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
type DataSource <T> = Partial<T> & {key: string | number | undefined}

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
  const {loading, error, data} = useSearchSubjectByTagQuery({
    variables: {
      tags
    },
    fetchPolicy: "no-cache"
  })

  const dataSource = useMemo<DataSource<SubjectFragment>[]>(() => {
    let dataSource: DataSource<SubjectFragment>[] = []
    if (data?.searchByTag) {
      dataSource = data.searchByTag.map(itm => ({...itm, key: itm?.id}))
    }
    return dataSource
  }, [data?.searchByTag])

  const columns = [
    {key: "name", title: "番组动画", dataIndex: "name", width: 2, render: (_: string, rec: SubjectFragment) => <span>{parser.parseFromString(rec?.nameCN || rec?.name || "", 'text/html').body.textContent} <a href={`https://chii.in/subject/${rec.id}`} target="_blank" rel="noopener noreferrer"><LinkIcon /></a></span>},
    {key: "scirank", title: "本站排名", dataIndex: "sciRank", sorter: (a: SubjectFragment, b: SubjectFragment) => sortSubject(_.get(a, 'sciRank'), _.get(b, 'sciRank'))},
    {key: "bgmrank", title: "Bangumi 排名", dataIndex: "rank", sorter: (a: SubjectFragment, b: SubjectFragment) => sortSubject(_.get(a, 'rank'), _.get(b, 'rank'))},
  ]

  if (error) {
    if (error.message.startsWith("404")) return <EmptyPanel>未找到对应标签</EmptyPanel>
    else return <Alert danger content="Can't load the search result"/>
  }

  return <CustomTable dataSource={dataSource} columns={columns} loading={loading} />
}

export default TagAnimeTable;