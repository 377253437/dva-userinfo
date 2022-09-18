import request from './request';
import { uniqueId } from 'lodash';
export const getData = () => {
  return request('http://mock.fe.sensorsdata.cn/mock/631c2adcd99b790020fb83be/city/city');
};

// 生成 0 - N 的隨機數
// 生成0 - N 個 Tab 的函數 tab 的名字 为「测试 X」，X 为随机整数，不可重复
// 提供函数对 tab 进行排序，根据 X 可选择从大到小或从小到大排序

const getRandomInteger = (max) => {
  const min = 0;
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 *
 * @param {number} count 传入的 n ,需要生成随机个数 tab 的上限
 * @returns 随机个数的 tabs 数组对象
 */
export const getRandomTabs = (n) => {
  const count = getRandomInteger(n);
  return Array.from({ length: count }, (_, index) => ({
    id: uniqueId(),
    cname: '测试',
    content: '测试的内容',
  }));
};

/**
 *
 * @param {string} sortString 控制排序方式的 string
 * @param {Array} arr 需要排序的数组对象
 * @returns 排序好的数组对象
 */
export const sortTabs = (sortString, arr, field) => {
  if (sortString === 'larToSml') {
    return arr.sort((a, b) => b[field] - a[field]);
  } else if (sortString === 'SmlToLar') {
    return arr.sort((a, b) => a[field] - b[field]);
  }
};
