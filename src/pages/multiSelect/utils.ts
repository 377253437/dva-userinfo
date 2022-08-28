/**
 * @file 数据的模拟
 * @author  lizhengtai@sensordata.cn
 */
import { uniqueId, cloneDeep } from 'lodash';

export interface IData {
  cname: string; // 显示名称
  field: string; // 字段名称
  count: number; // 数值
  items?: IData[]; // 子节点
}

const testData: IData[] = [
  {
    cname: '测试名称0',
    field: 'test0',
    count: 0,
  },
  {
    cname: '测试名称0',
    field: 'test0',
    count: 0,
    items: [
      {
        cname: '测试名称0',
        field: 'test0',
        count: 0,
      },
      {
        cname: '测试名称1',
        field: 'test1',
        count: 1,
        items: [
          {
            cname: '测试名称0',
            field: 'test0',
            count: 0,
          },
        ],
      },
    ],
  },
];

//生成随机数
const GetRandomNum = (Min, Max) => {
  let Range = Max - Min;
  let Rand = Math.random();
  return Min + Math.round(Rand * Range);
};

// 处理字段名字加上 count 方法二， 在前端去处理数据的渲染， 元数据不变
const getRandomObj = (count) => {
  const randomStr = () => Math.floor(Math.random() * 100000000).toString(32);
  return Array.from({ length: count }, (_, index) => ({
    id: uniqueId(),
    cname: randomStr(),
    field: randomStr(),
    count: index,
  }));
};

const getArr = (arr, level: number) => {
  if (!level) return arr;
  let randomNumber = GetRandomNum(5, 10);
  let randomCount = GetRandomNum(0, randomNumber - 1);
  // 创建一个随机个数的数组对象
  let randomArrObj: IData[] = getRandomObj(randomNumber);
  // 随机给某一个对象添加 item 属性
  randomArrObj[randomCount].items = [];
  // 收集每一次的数组对象
  arr.push(...randomArrObj);
  // 将随机数组对象中的 item 放入递归
  return getArr(arr[randomCount].items, level - 1);
};

const getMultiData = (deep: number) => {
  if (deep < 1 || deep > 23) {
    return [];
  }
  let result = [];
  getArr(result, deep);
  return result;
};

const getData = () => {
  const RandomCount = GetRandomNum(5, 15);
  const Data = getMultiData(RandomCount);
  const testData = cloneDeep(Data);
  return testData;
};

const initData: IData[] = getData();

const getAsyncMultiData = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(initData);
    }, 200);
  });
};

export { getMultiData, testData, GetRandomNum, initData, getAsyncMultiData };
