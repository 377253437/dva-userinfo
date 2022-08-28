/**
 * @file 数据的获取
 * @author  lizhengtai@sensordata.cn
 */

import * as React from 'react';
import { IData, initData, getAsyncMultiData } from './utils';
import MultiSelect from './MultiSelect';
import { cloneDeep } from 'lodash';

const getData = (data) => {
  // 将cname 和 count组合
  function handleCnameAddCount(source, level) {
    source.forEach((item) => {
      item.cname = `${item.cname} - ${level} - ${item.count}`;
      if (item.items) {
        handleCnameAddCount(item.items, level + 1);
      }
    });
  }
  const testData = cloneDeep(data);
  handleCnameAddCount(testData, 0);
  return testData;
};
let resultData: any = getData(initData);

const SelectWrap: React.FC = () => {
  const [multiData, setMultiData] = React.useState<IData[]>(resultData);
  React.useEffect(() => {
    const getResult = () => {
      getAsyncMultiData()
        .then((value: IData[]) => {
          let result = getData(value);
          setMultiData(result);
        })
        .catch((error) => console.log(error));
    };
    getResult();
  });

  return (
    <div>
      <MultiSelect multiData={multiData}></MultiSelect>
    </div>
  );
};

export default SelectWrap;
