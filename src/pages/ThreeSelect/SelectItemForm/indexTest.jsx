import * as React from 'react';
import { forwardRef, useImperativeHandle } from 'react';
import { Select, Popconfirm, Button, Form } from 'sensd';
import { CloseOutlined } from '@sensd/icons';
import styles from './index.less';
import { uniqueId } from 'lodash';

const SelectItemTest = forwardRef(({ cityList, selectedForm }, itemRef) => {
  // 还是用 state 来存储， 每次调用完回调函数，把结果 onChange 回去给 form
  const data = cityList;
  console.log('cityList', data);
  // 存储两个状态时为了用状态值与其他组件进行条件渲染，如果要条件渲染应该还是用 state 比 getFieldValue 更好
  const [provinces, setProvinces] = React.useState('');
  const [cities, setCities] = React.useState('');

  // 重置所有两种方法， 1. 父组件调用子组件方法 使用 forwardRef 和 useImperativeHandle. 2. 利用 form 的 setFieldsValue
  useImperativeHandle(itemRef, () => {
    return {
      clearProvinceConfirm,
    };
  });
  const onProvinceChange = (value) => {
    setProvinces(value);
    selectedForm.setFieldsValue({ cityValue: '', regionValue: '' });
  };
  const onCityChange = (value) => {
    setCities(value);
    selectedForm.setFieldsValue({ regionValue: '' });
  };

  const clearProvinceConfirm = () => {
    // 明天写一下两种方法，  1.用 form setFieldsValue   2. 用 state setState
    selectedForm.setFieldsValue({ provinceValue: '', cityValue: '', regionValue: '' });
  };
  const clearCityConfirm = () => {
    selectedForm.setFieldsValue({ cityValue: '', regionValue: '' });
  };
  const clearRegionConfirm = () => {
    selectedForm.setFieldsValue({ regionValue: '' });
  };

  //   const cityArr =
  //     data &&
  //     data.filter((item) => item.province === provinces).map((item) => item.cities) &&
  //     data.filter((item) => item.province === provinces).map((item) => item.cities)[0];
  //  ?.链式运算符报错  此处 ?. 会报错， 编译时 自动把 ? .分开了
  // const res = data && data.filter((item) => item.province === provinces).map((item) => item.cities)?.[0];
  // const res2 = (data && data.filter((item) => item.province === provinces).map((item) => item.cities)) ?? 'as'
  const cityArr = data?.filter((item) => item.province === provinces).map((item) => item.cities)?.[0];
  console.log(cityArr);

  //   const regionArr =
  //     data &&
  //     data.filter((item) => item.province === provinces).map((item) => item.cities) &&
  //     data.filter((item) => item.province === provinces).map((item) => item.cities)[0] &&
  //     data
  //       .filter((item) => item.province === provinces)
  //       .map((item) => item.cities)[0]
  //       .filter((item) => item.city === cities) &&
  //     data
  //       .filter((item) => item.province === provinces)
  //       .map((item) => item.cities)[0]
  //       .filter((item) => item.city === cities)
  //       .map((item) => item.region)[0];

  //  const regionArr = regionArr && regionArr.map(item => item.region)[0]
  const regionArr = data
    ?.filter((item) => item.province === provinces)
    .map((item) => item.cities)?.[0]
    ?.filter((item) => item.city === cities)
    ?.map((item) => item.region)[0];

  console.log('regionArr', regionArr);

  return (
    <div className={styles['itemWrap']}>
      <div className={styles['first-select']}>
        <Popconfirm title="确认清空当前选择？" onConfirm={clearProvinceConfirm}>
          <Button icon={<CloseOutlined />}></Button>
        </Popconfirm>
        <Form.Item name="provinceValue" rules={[{ required: true, message: '请选择一项' }]}>
          <Select size="middle" placeholder="请选择省份" showDropdownSearch onChange={onProvinceChange}>
            {data &&
              data.map((item) => (
                <Select.Option key={uniqueId()} value={item.province}>
                  {item.province}
                </Select.Option>
              ))}
          </Select>
        </Form.Item>
      </div>
      <div className={styles['second-select']}>
        <Popconfirm title="确认清空当前选择？" onConfirm={clearCityConfirm}>
          <Button icon={<CloseOutlined />}></Button>
        </Popconfirm>
        <Form.Item name="cityValue" rules={[{ required: true, message: '请选择一项' }]}>
          <Select size="middle" placeholder="请选择城市" showDropdownSearch onChange={onCityChange}>
            {cityArr &&
              cityArr.map((item) => (
                <Select.Option key={uniqueId()} value={item.city}>
                  {item.city}
                </Select.Option>
              ))}
          </Select>
        </Form.Item>
      </div>
      <div className={styles['third-select']}>
        <Popconfirm title="确认清空当前选择？" onConfirm={clearRegionConfirm}>
          <Button icon={<CloseOutlined />}></Button>
        </Popconfirm>
        <Form.Item name="regionValue" rules={[{ required: true, message: '请选择一项' }]}>
          <Select size="middle" placeholder="请选择地区" showDropdownSearch>
            {regionArr &&
              regionArr.map((item) => (
                <Select.Option key={uniqueId()} value={item}>
                  {item}
                </Select.Option>
              ))}
          </Select>
        </Form.Item>
      </div>
    </div>
  );
});

export default SelectItemTest;
