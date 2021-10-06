import React, {useState, useMemo, useRef, useEffect} from 'react'
import { Skeleton, Table, Button, Flex, TableRowProps, TableCellProps } from "@fluentui/react-northstar";
import { ChevronDownIcon } from '@fluentui/react-icons-northstar';
import _ from 'lodash';
import Pagination from './Pagination'

type ColumnType = {
  key: string,
  dataIndex: string,
  title: string,
  sorter?: (a: any, b: any) => number,
  width?: number,
  render?: (text: any, record: any, index: number) => React.ReactNode
}

type CustomTableProps = {
  dataSource: object[],
  columns: ColumnType[],
  loading: boolean
}

type SortButtonProps = {
  lightup: boolean,
  onClick: (desc: boolean) => void
}

function useOnChange<T>(value: T, cb: () => void): void {
  const ref: any = useRef<T>();
  useEffect(() => {
    if (ref.current !== value) {
      cb();
    }
    ref.current = value;
  }, [value]);
}

const SortButton = ({lightup, onClick}: SortButtonProps) => {
  const [dir, setDir] = useState(180)
  const onButtonClick = () => {
    onClick(lightup ? dir === 0 : dir===180);
    if (lightup) setDir(180 - dir);
  }
  return <Button icon={<ChevronDownIcon size="small" rotate={dir} styles={{opacity: lightup ? 1 : 0.5}}/>} iconOnly text onClick={onButtonClick} />
}

const CustomTable = ({dataSource, columns, loading}: CustomTableProps) => {
  const [page, setPage] = useState(1);
  const [pagelen, setPagelen] = useState(20);
  const [sortCol, setSortCol] = useState("");
  const [isAsc, setIsAsc] = useState(false);
  useOnChange(dataSource, () => setPage(1));

  const header: TableRowProps = useMemo<TableRowProps>(() => ({
    key: "header",
    items: columns.map<TableCellProps>(itm => ({
      content: <span>{itm.title}{!!itm.sorter && <SortButton lightup={sortCol === itm.key} onClick={(desc) => {setSortCol(itm.key); setIsAsc(desc)}} />}</span>,
      key: itm.key,
      styles: itm.width ? {flex: itm.width} : undefined
    })),
    header: true
  }), [columns, sortCol, setSortCol, setIsAsc]);

  const rows: TableRowProps[] = useMemo<TableRowProps[]>(() => {
    const start = pagelen * (page - 1)
    const end = pagelen * page > dataSource.length ? dataSource.length : pagelen * page;
    if (sortCol !== "") {
      const sorter = columns.find(col => col.key === sortCol)?.sorter
      if (sorter) {
        const factor = isAsc ? 1 : -1;
        dataSource.sort((a, b) => factor * sorter(a, b))
      }
    }

    return dataSource.slice(start, end).map((itm, idx) => {
      const rowkey = _.get(itm, "key");
      return {
        key: rowkey,
        items: columns.map(col => ({
          key: `${rowkey}_${col.dataIndex}`,
          content: col.render ? col.render(_.get(itm, col.dataIndex), itm, idx) : _.get(itm, col.dataIndex),
          styles: col.width ? {flex: col.width} : undefined
        }))
      }
    })
  }, [dataSource, columns, sortCol, isAsc, page, pagelen]);

  const onChangePagelen = (current: number, size: number) => {
    setPagelen(size);
  }

  const onChange = (page: number, pageSize: number) => {
    setPage(page)
  }

  return <Flex column>
    <Table header={header} rows={rows} />
    {loading &&
      <Skeleton animation="wave">
        <Flex gap="gap.medium" column>
          <Skeleton.Text size="large" />
          <Skeleton.Text size="large" />
          <Skeleton.Text size="large" />
          <Skeleton.Text size="large" />
          <Skeleton.Text size="large" />
        </Flex>
      </Skeleton>
    }
    <Pagination current={page} total={dataSource.length} pageSize={pagelen} pageSizeOptions={[20, 50, 100]} onShowSizeChange={onChangePagelen} onChange={onChange} />
  </Flex>
}

export default CustomTable;