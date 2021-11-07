import React, {useEffect, useMemo, useState} from 'react'
import styled from 'styled-components'
import _ from 'lodash';
import { Alert, Pill } from "@fluentui/react-northstar";
import { Link } from 'react-router-dom';
import { RankSorter } from './lib/Utils';
import { SubjectWithoutTagFragment, useSearchSubjectByTagQuery, SubjectType } from "../graphql/index.generated";
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

type TagTableProps = {
  tags: string[]
}

type CategoryStat = {
  [K in SubjectType]?: number
}

type CategoryTableProps = {
  category: CategoryStat,
  dataSource: object[],
  loading: boolean,
}

const catNameLut = {
  "ANIME": "动画",
  "BOOK": "书籍",
  "MUSIC": "音乐",
  "GAME": "游戏",
  "REAL": "三次元",
}

const CategoryTable = ({category, dataSource, loading}: CategoryTableProps) => {
  const [typ, setTyp] = useState("");
  useEffect(() => {
    setTyp(Object.keys(category).shift() as string)
  }, [category, setTyp])
  const filteredDataSource = useMemo(() => dataSource.filter(itm => _.get(itm, "type") === typ), [typ, dataSource])
  const categorySwitcher = Object.keys(category).map(itm => <Pill appearance={typ === itm ? "outline" : "filled"} content={`${catNameLut[itm as SubjectType]} ${category[itm as SubjectType]}`} onClick={() => setTyp(itm)}/>)

  const parser = new DOMParser();
  const columns = [
    {key: "name", title: "番组动画", dataIndex: "name", width: 2, render: (_: string, rec: SubjectWithoutTagFragment) => <Link to={`/subject/${rec.id}`}>{parser.parseFromString(rec?.nameCN || rec?.name || "", 'text/html').body.textContent}</Link>},
    {key: "bgmrank", title: "Bangumi 排名", dataIndex: "rank", sorter: (a: SubjectWithoutTagFragment, b: SubjectWithoutTagFragment) => RankSorter(_.get(a, 'rank'), _.get(b, 'rank'))},
  ]
  if (typ === "ANIME") columns.splice(1, 0, {key: "scirank", title: "本站排名", dataIndex: "sciRank", sorter: (a: SubjectWithoutTagFragment, b: SubjectWithoutTagFragment) => RankSorter(_.get(a, 'siRank'), _.get(b, 'sciRank'))})
  return <>
    <div>{categorySwitcher}</div>
    <CustomTable dataSource={filteredDataSource} columns={columns} loading={loading} />
  </>
}

const TagTable = ({tags}: TagTableProps) => {
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

  const categoryCount = useMemo(() => {
    const rst: CategoryStat = {};
    if (data?.searchByTag) {
      data.searchByTag.forEach(itm => {
        if (itm?.type) {
          rst[itm.type] = _.has(rst, itm.type) ? (rst[itm.type] as number) + 1 : 1
        }
      })
    }
    return rst;
  }, [data?.searchByTag])


  if (error) {
    if (error.message.startsWith("404")) return <EmptyPanel>未找到对应标签</EmptyPanel>
    else return <Alert danger content="Can't load the search result"/>
  }

  return <CategoryTable category={categoryCount} dataSource={dataSource} loading={loading} />
}

export default TagTable;