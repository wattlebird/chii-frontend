import React, {useMemo} from 'react'
import styled from 'styled-components'
import _ from 'lodash';
import { Alert } from "@fluentui/react-northstar";
import { Link } from 'react-router-dom';
import { RankSorter } from './lib/Utils';
import { SubjectWithoutTagFragment, useSearchSubjectByTagQuery } from "../graphql/index.generated";
import CustomTable from "./lib/CustomTable";

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

const TagAnimeTable = ({tags}: TagAnimeTableProps) => {
  const parser = new DOMParser();
  const {loading, error, data} = useSearchSubjectByTagQuery({
    variables: {
      tags
    }
  })

  const dataSource = useMemo<DataSource<SubjectWithoutTagFragment>[]>(() => {
    let dataSource: DataSource<SubjectWithoutTagFragment>[] = []
    if (data?.searchByTag) {
      dataSource = data.searchByTag.map(itm => ({...itm, key: itm?.id}))
    }
    return dataSource
  }, [data?.searchByTag])

  const columns = [
    {key: "name", title: "番组动画", dataIndex: "name", width: 2, render: (_: string, rec: SubjectWithoutTagFragment) => <Link to={`/subject/${rec.id}`}>{parser.parseFromString(rec?.nameCN || rec?.name || "", 'text/html').body.textContent}</Link>},
    {key: "scirank", title: "本站排名", dataIndex: "sciRank", sorter: (a: SubjectWithoutTagFragment, b: SubjectWithoutTagFragment) => RankSorter(_.get(a, 'sciRank'), _.get(b, 'sciRank'))},
    {key: "bgmrank", title: "Bangumi 排名", dataIndex: "rank", sorter: (a: SubjectWithoutTagFragment, b: SubjectWithoutTagFragment) => RankSorter(_.get(a, 'rank'), _.get(b, 'rank'))},
  ]

  if (error) {
    if (error.message.startsWith("404")) return <EmptyPanel>未找到对应标签</EmptyPanel>
    else return <Alert danger content="Can't load the search result"/>
  }

  return <CustomTable dataSource={dataSource} columns={columns} loading={loading} />
}

export default TagAnimeTable;