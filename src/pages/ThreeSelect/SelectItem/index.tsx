import * as React from 'react';
import { forwardRef, useImperativeHandle } from 'react';
import { Select, Popconfirm, Button, Form } from 'sensd';
import { CloseOutlined } from '@sensd/icons';
import styles from './index.less';
import { uniqueId } from 'lodash';
interface ISelectItemProps {
  cityList: any;
  ref: any;
}

const SelectItem: React.FC<ISelectItemProps> = forwardRef(({ cityList }, itemRef) => {
  // 还是用 state 来存储， 每次调用完回调函数，把结果 onChange 回去给 form
  const { data } = cityList;
  console.log('cityList', data);
  const [provinces, setProvinces] = React.useState<string>('');
  const [cities, setCities] = React.useState<string>('');
  const [regions, setRegions] = React.useState<string>('');

  useImperativeHandle(itemRef, () => {
    return {
      onProvinceChange,
    };
  });
  const onProvinceChange = (value: string) => {
    setProvinces(value);
    setCities('');
    setRegions('');
  };
  const onCityChange = (value: string) => {
    setCities(value);
    setRegions('');
  };
  const onRegionChange = (value: string) => {
    setRegions(value);
  };
  const clearProvinceConfirm = (): void => {
   // 明天写一下两种方法，  1.用 form setFieldsValue   2. 用 state setState
    setProvinces('');
    setCities('');
    setRegions('');
  };
  const clearCityConfirm = (): void => {
    setCities('');
    setRegions('');
  };
  const clearRegionConfirm = (): void => {
    setRegions('');
  };

  const cityArr =
    data &&
    data.filter((item) => item.province === provinces).map((item) => item.cities) &&
    data.filter((item) => item.province === provinces).map((item) => item.cities)[0];
  //  ?.链式运算符报错  此处 ?. 会报错， 编译时 自动把 ? .分开了
  // const res = data && data.filter((item) => item.province === provinces).map(item => item.cities)?.[0]
  console.log(cityArr);

  const regionArr =
    data &&
    data.filter((item) => item.province === provinces).map((item) => item.cities) &&
    data.filter((item) => item.province === provinces).map((item) => item.cities)[0] &&
    data
      .filter((item) => item.province === provinces)
      .map((item) => item.cities)[0]
      .filter((item) => item.city === cities) &&
    data
      .filter((item) => item.province === provinces)
      .map((item) => item.cities)[0]
      .filter((item) => item.city === cities)
      .map((item) => item.region)[0];

  //  const regionArr = regionArr && regionArr.map(item => item.region)[0]
  console.log('regionArr', regionArr);

  return (
    <div className={styles['itemWrap']}>
      <div className={styles['first-select']}>
        <Popconfirm title="确认清空当前选择？" onConfirm={clearProvinceConfirm}>
          <Button icon={<CloseOutlined />}></Button>
        </Popconfirm>
          <Select size="middle" placeholder="请选择省份" value={provinces} showDropdownSearch onChange={onProvinceChange}>
            {data &&
              data.map((item) => (
                <Select.Option key={uniqueId()} value={item.province}>
                  {item.province}
                </Select.Option>
              ))}
          </Select>
      </div>
      <div className={styles['second-select']}>
        <Popconfirm title="确认清空当前选择？" onConfirm={clearCityConfirm}>
          <Button icon={<CloseOutlined />}></Button>
        </Popconfirm>
          <Select size="middle" placeholder="请选择城市" value={cities} showDropdownSearch onChange={onCityChange}>
            {cityArr &&
              cityArr.map((item) => (
                <Select.Option key={uniqueId()} value={item.city}>
                  {item.city}
                </Select.Option>
              ))}
          </Select>
      </div>
      <div className={styles['third-select']}>
        <Popconfirm title="确认清空当前选择？" onConfirm={clearRegionConfirm}>
          <Button icon={<CloseOutlined />}></Button>
        </Popconfirm>
          <Select size="middle" placeholder="请选择地区" value={regions} showDropdownSearch onChange={onRegionChange}>
            {regionArr &&
              regionArr.map((item) => (
                <Select.Option key={uniqueId()} value={item}>
                  {item}
                </Select.Option>
              ))}
          </Select>
      </div>
    </div>
  );
});

export default SelectItem;
