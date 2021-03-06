import React, { useState, useMemo } from 'react';
import { Flex, Input } from '@fluentui/react-northstar';
import { SearchIcon } from '@fluentui/react-icons-northstar';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import { DateSorter, RankSorter } from './lib/Utils';
import { useDebounce } from './lib/Hooks';
import { useGetRankingListQuery, Maybe, SubjectWithoutTagFragment } from '../graphql/index.generated';
import CustomTable from './lib/CustomTable';

type DataSource <T> = Partial<T> & {key: string | number | undefined}

type RankingTableProps = {
  count?: Maybe<number>
}

function RankingTable({ count = 0 }: RankingTableProps) {
  const { loading, data: rankingData } = useGetRankingListQuery({
    variables: {
      bysci: true,
      from: 0,
      step: count,
    },
  });
  const [keyword, setKeyword] = useState('');
  const debouncedKeyword = useDebounce(keyword, 500);
  const onChangeKeyword = ({ currentTarget: { value } }: any) => {
    setKeyword(value);
  };

  const parser = new DOMParser();
  const dataSource = useMemo(() => {
    let rtn: DataSource<SubjectWithoutTagFragment>[] = [];
    if (rankingData?.queryRankingList) {
      rtn = rankingData.queryRankingList
        .filter((row) => !debouncedKeyword
                         || (row?.nameCN && row?.nameCN.includes(debouncedKeyword))
                         || row?.name.includes(debouncedKeyword))
        .map<DataSource<SubjectWithoutTagFragment>>((itm) => ({
          ...itm as SubjectWithoutTagFragment,
          key: itm?.id,
        }));
    }
    return rtn;
  }, [rankingData?.queryRankingList, debouncedKeyword]);

  const columns = [
    {
      key: 'name',
      title: '番组动画',
      dataIndex: 'name',
      width: 2,
      render: (__: any, rec: SubjectWithoutTagFragment) => (
        <Link to={`/subject/${rec.id}`}>
          {parser.parseFromString(rec?.nameCN || rec?.name || '', 'text/html').body.textContent}
        </Link>
      ),
    },
    {
      key: 'scirank', title: '本站排名', dataIndex: 'sciRank', sorter: (a: SubjectWithoutTagFragment, b: SubjectWithoutTagFragment) => RankSorter(_.get(a, 'sciRank'), _.get(b, 'sciRank')),
    },
    {
      key: 'bgmrank', title: 'Bangumi 排名', dataIndex: 'rank', sorter: (a: SubjectWithoutTagFragment, b: SubjectWithoutTagFragment) => RankSorter(_.get(a, 'rank'), _.get(b, 'rank')),
    },
    {
      key: 'date',
      title: '日期',
      dataIndex: 'date',
      render: (val: string) => {
        if (val.startsWith('0001')) return null;
        return (new Date(val)).toLocaleDateString('zh-CN');
      },
      sorter: (a: SubjectWithoutTagFragment, b: SubjectWithoutTagFragment) => DateSorter(_.get(a, 'date'), _.get(b, 'date')),
    },
  ];

  return (
    <Flex column id="searchbar">
      <Input fluid icon={<SearchIcon />} onChange={onChangeKeyword} value={keyword} placeholder="输入想要搜索的番剧名称，如“莉兹与青鸟”" />
      <CustomTable dataSource={dataSource} columns={columns} loading={loading} />
    </Flex>
  );
}

export default RankingTable;
