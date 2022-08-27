import * as React from 'react';
import { Cascader, Input, message } from 'sensd';
import { DefaultOptionType } from 'sensd/lib/cascader';
import styles from './index.less';
import { IData } from './utils';
import { Table } from 'sensd';
const { Search } = Input;
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

interface ITestData {
  multiData: IData[];
}

const TestData: React.FC<ITestData> = ({ multiData }) => {
  const [tableData, setTableData] = React.useState<DefaultOptionType[]>([]);

  const [optionData, setOptionData] = React.useState<any>(() => {
    return sessionStorage.getItem('optionData') ? JSON.parse(sessionStorage.getItem('optionData') || '0') : [];
  });

  // 每次刷新页面后，数据都会重新随机生成，就算我拿到了我选择时的数据，但是无法与新刷新的数据进行匹配，已解决：先保存 optionData
  const [selectedValue, setSelectedValue] = React.useState<string[]>(() => {
    return sessionStorage.getItem('selectedValue') ? JSON.parse(sessionStorage.getItem('selectedValue') || '0') : [];
  });

  const [searchValue, setSearchValue] = React.useState<string>('');

  // 此处onChange 返回的是 value，是 cname 相应的字段
  function onChange(value: string[], selectedOptions: DefaultOptionType[]) {
    console.log(value, selectedOptions);
    // setTableData(selectedOptions)，不展示选择的内容，只展示外层搜索的内容
    setSelectedValue(value);
    if (value) {
      sessionStorage.setItem('selectedValue', JSON.stringify(value));
    }
  }

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };
  // 此处用 searchValue 去改变 selectedValue 的值就能改变下拉菜单选中的值了，因为它是受控，受 selectedValue 的控制
  const onSearch = (searchValue: string) => {
    function onRecursionData(arr, val) {
      let newArr: any = [];
      arr.forEach((item) => {
        if (item.items && item.items.length) {
          let items = onRecursionData(item.items, val);
          let obj: any = {
            ...item,
            items,
          };
          if (items && items.length) {
            newArr.push(obj);
          }
        } else {
          if (item.cname.includes(val)) {
            newArr.push(item);
          }
        }
      });
      return newArr;
    }
    let result = onRecursionData(optionData, searchValue).flat(Infinity);
    if (result.length) {
      setTableData(result);
      message.success('下拉菜单搜索结果在下方表格中显示', 1);
    } else {
      message.error('很抱歉，下拉菜单没有搜索的结果', 1);
    }
    console.log(result);
    setSearchValue('');
  };

  // 对数据的存储，防止每次渲染都生成重新的一批随机的值
  React.useEffect(() => {
    if (!optionData.length) {
      sessionStorage.setItem('optionData', JSON.stringify(multiData));
      setOptionData(JSON.parse(sessionStorage.getItem('optionData') || '0'));
    } else {
      sessionStorage.setItem('optionData', JSON.stringify(optionData));
    }
  }, []);
  return (
    <>
      <div className={styles.searchWrap}>
        <h2 style={{ verticalAlign: 'middle', marginTop: '8px', width: '130px' }}>请输入搜索的内容：</h2>
        <Search
          placeholder="search"
          allowClear
          value={searchValue}
          onChange={handleSearchChange}
          onSearch={onSearch}
          style={{ width: 500 }}
          size="large"
          enterButton
        ></Search>
      </div>
      <div className={styles.selectWrap}>
        <h2 style={{ verticalAlign: 'middle', marginTop: '8px', width: '130px' }}>下拉菜单：</h2>
        <Cascader
          value={selectedValue}
          options={optionData}
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
        <h1 style={{ fontSize: '19px' }}>搜索结果展示:</h1>
        <Table
          columns={columns}
          dataSource={tableData}
          className={styles.table}
          childrenColumnName="items"
          indentSize={5}
          rowKey="id"
        ></Table>
      </div>
    </>
  );
};

export default TestData;
