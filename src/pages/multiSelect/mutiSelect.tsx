import * as React from 'react';
import { Cascader } from 'sensd';
import { DefaultOptionType } from 'sensd/lib/cascader';
import { cloneDeep } from 'lodash';
import styles from './index.less';
import { IData, getMultiData, GetRandomNum } from './utils';
import { Table } from 'sensd';

const columns: any = [
  {
    title: 'id',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'cname',
    dataIndex: 'cname',
    key: 'cname',
  },
  {
    title: 'field',
    dataIndex: 'field',
    key: 'field',
  },
  {
    title: 'count',
    dataIndex: 'count',
    key: 'count',
  },
];

function filter(inputValue: string, path: DefaultOptionType[]) {
  return path.some((option) => option.cname.toLowerCase().includes(inputValue.toLowerCase()));
}

const getData = () => {
  function handleCnameAddCount(source) {
    let level = 0;
    source.forEach((item) => {
      item.cname = `${item.cname} - ${level} - ${item.count}`;
      if (item.items) {
        level++;
        handleCnameAddCount(item.items);
      }
    });
  }
  const RandomCount = GetRandomNum(5, 15);
  const Data = getMultiData(RandomCount);
  const testData = cloneDeep(Data);
  handleCnameAddCount(testData);
  return testData;
};
const data: IData[] = getData();

const MultiSelect: React.FC = () => {
  const [dataList, setDataList] = React.useState<IData[]>(data);

  const [tableData, setTableData] = React.useState<DefaultOptionType[]>(() => {
    return localStorage.getItem('tableData') ? JSON.parse(localStorage.getItem('tableData') || '0') : [];
  });

  // 每次刷新页面后，数据都会重新随机生成，就算我拿到了我选择时的数据，但是无法与新刷新的数据进行匹配
  const [selectedValue, setSelectedValue] = React.useState<string[]>([]);

  // 此处onChange 返回的是 value，是 cname 相应的字段
  function onChange(value: string[], selectedOptions: DefaultOptionType[]) {
    console.log(value, selectedOptions);
    setTableData(selectedOptions);
    setSelectedValue(value);
    // localStorage.setItem('tableData', JSON.stringify(selectedOptions));
  }

  React.useEffect(() => {
    setDataList(data);
  }, []);
  // console.log(dataList);
  console.log('selectedValue', selectedValue);
  return (
    <>
      <div className={styles.selectWrap}>
        <Cascader
          value={selectedValue}
          options={dataList}
          fieldNames={{ label: 'cname', value: 'field', children: 'items' }}
          style={{ width: '500px' }}
          size="large"
          onChange={onChange}
          placeholder="Please select"
          showSearch={{ filter }}
          expandTrigger="hover"
          // onSearch={(value) => console.log(value)}
        />
      </div>
      <div className={styles.tableBox}>
        <Table columns={columns} dataSource={tableData} className={styles.table} rowKey="id"></Table>
      </div>
    </>
  );
};

export default MultiSelect;
