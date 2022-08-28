/**
 * @file 数据的展示
 * @author  lizhengtai@sensordata.cn
 */
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

const MultiSelect: React.FC<ITestData> = ({ multiData }) => {
  // 下拉菜单的所有数据
  const [optionData, setOptionData] = React.useState<any>(() => {
    return sessionStorage.getItem('optionData') ? JSON.parse(sessionStorage.getItem('optionData') || '0') : [];
  });
  // 搜索结果的数据
  const [tableData, setTableData] = React.useState<DefaultOptionType[]>([]);
  // 下拉菜单选中的数据
  const [selectedValue, setSelectedValue] = React.useState<string[]>(() => {
    return sessionStorage.getItem('selectedValue') ? JSON.parse(sessionStorage.getItem('selectedValue') || '0') : [];
  });
  //  搜索框的 values
  const [searchValue, setSearchValue] = React.useState<string>('');

  // 此处onChange 返回的是 value，是 cname 相应的字段
  function onChange(value: string[], selectedOptions: DefaultOptionType[]) {
    console.log(value, selectedOptions);
    // setTableData(selectedOptions)，不展示选择的内容，只展示外层搜索的内容
    setSelectedValue(value);
    if (value) {
      // 如果在这里存的话，其他地方用到 selectedValue 的时候，可能又需要存一次， 所以最好放在 effect 中去存，根据依赖项，每次它改变都会存储，无论这个值在哪儿使用
      sessionStorage.setItem('selectedValue', JSON.stringify(value));
    }
  }

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };
  // 此处用 searchValue 去改变 selectedValue 的值就能改变下拉菜单选中的值了，因为它是受控，受 selectedValue 的控制
  const onSearch = (searchValue: string) => {
    function getSearchedArr(arr, val) {
      let newArr: any = [];
      arr.forEach((item) => {
        if (item.items && item.items.length) {
          let items = getSearchedArr(item.items, val);
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
    let result = getSearchedArr(optionData, searchValue);
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

export default MultiSelect;
