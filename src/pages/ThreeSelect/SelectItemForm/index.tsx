import * as React from 'react';
import { forwardRef, useImperativeHandle } from 'react';
import { Select, Popconfirm, Button, Form } from 'sensd';
import { CloseOutlined } from '@sensd/icons';
import { ICityList } from '../SelectWrap';
import styles from './index.less';
import { uniqueId } from 'lodash';
import { FormInstance } from 'rc-field-form/lib/interface';
interface ISelectItemProps {
  cityList: ICityList[];
  ref: any;
  selectedForm: FormInstance<any>;
}

const SelectItem: React.FC<ISelectItemProps> = forwardRef(({ cityList, selectedForm }, itemRef) => {
  // 还是用 state 来存储， 每次调用完回调函数，把结果 onChange 回去给 form
  const data = cityList;
  console.log('cityList', data);
  // 存储两个状态时为了用状态值与其他组件进行条件渲染，如果要条件渲染应该还是用 state 比 getFieldValue 更好

  const [selectedProvince, setSelectedProvince] = React.useState<string>(() => {
    return localStorage.getItem('provinces') ? JSON.parse(localStorage.getItem('provinces') || '0') : [];
  });

  const [selectedCity, setSelectedCity] = React.useState<string>('');

  const [selectedRegion, setSelectedRegion] = React.useState<string>('');

  const [selectedCityArr, setSelectedCityArr] = React.useState<any>(() => {
    return localStorage.getItem('cityArr') ? JSON.parse(localStorage.getItem('cityArr') || '0') : [];
  });

  const [selectedRegionArr, setSelectedRegionArr] = React.useState<any>(() => {
    return localStorage.getItem('regionArr') ? JSON.parse(localStorage.getItem('regionArr') || '0') : [];
  });

  // 重置所有两种方法， 1. 父组件调用子组件方法 使用 forwardRef 和 useImperativeHandle. 2. 利用 form 的 setFieldsValue
  useImperativeHandle(itemRef, () => {
    return {
      clearProvinceConfirm,
      saveSelectedValues,
    };
  });
  const onProvinceChange = (value: string) => {
    setSelectedProvince(value);
    selectedForm.setFieldsValue({ cityValue: '', regionValue: '' });
    localStorage.removeItem('cities');
    localStorage.removeItem('regions');
    localStorage.removeItem('regionArr');
    if (value) {
      // localStorage.setItem('provinces', JSON.stringify(value));
      const cityArr = data.filter((item) => item.province === value).map((item) => item.cities)[0];
      // data &&
      // data.filter((item) => item.province === value).map((item) => item.cities) &&
      // localStorage.setItem('cityArr', JSON.stringify(cityArr));
      setSelectedCityArr(cityArr);
    }
  };
  const onCityChange = (value: string) => {
    selectedForm.setFieldsValue({ regionValue: '' });
    setSelectedCity(value);
    localStorage.removeItem('regions');
    if (value) {
      // localStorage.setItem('cities', JSON.stringify(value));
      const regionArr = data
        .filter((item) => item.province === selectedProvince)
        .map((item) => item.cities)[0]
        .filter((item) => item.city === value)
        .map((item) => item.region)[0];
      // localStorage.setItem('regionArr', JSON.stringify(regionArr));
      setSelectedRegionArr(regionArr);
    }
  };
  const onRegionChange = (value: string) => {
    setSelectedRegion(value);
    // if (value) {
    //   localStorage.setItem('regions', JSON.stringify(value));
    // }
  };

  const saveSelectedValues = () => {
    localStorage.setItem('provinces', JSON.stringify(selectedProvince));
    const cityArr = data.filter((item) => item.province === selectedProvince).map((item) => item.cities)[0];
    // data &&
    // data.filter((item) => item.province === value).map((item) => item.cities) &&
    localStorage.setItem('cityArr', JSON.stringify(cityArr));
    setSelectedCityArr(cityArr);

    localStorage.setItem('cities', JSON.stringify(selectedCity));
    const regionArr = data
      .filter((item) => item.province === selectedProvince)
      .map((item) => item.cities)[0]
      .filter((item) => item.city === selectedCity)
      .map((item) => item.region)[0];
    localStorage.setItem('regionArr', JSON.stringify(regionArr));
    setSelectedRegionArr(regionArr);
    localStorage.setItem('regions', JSON.stringify(selectedRegion));
  };

  const clearProvinceConfirm = (): void => {
    // 明天写一下两种方法，  1.用 form setFieldsValue   2. 用 state setState
    selectedForm.setFieldsValue({ provinceValue: '', cityValue: '', regionValue: '' });
    // 还需要清空 localStorage
    // localStorage.removeItem('myCat');
    setSelectedCityArr([]);
    setSelectedRegionArr([]);
    localStorage.removeItem('provinces');
    localStorage.removeItem('cities');
    localStorage.removeItem('regions');
    localStorage.removeItem('cityArr');
    localStorage.removeItem('regionArr');
  };
  const clearCityConfirm = (): void => {
    selectedForm.setFieldsValue({ cityValue: '', regionValue: '' });
    setSelectedRegionArr([]);
    localStorage.removeItem('cities');
    localStorage.removeItem('regions');
    localStorage.removeItem('regionArr');
  };
  const clearRegionConfirm = (): void => {
    selectedForm.setFieldsValue({ regionValue: '' });
    localStorage.removeItem('regions');
  };
  //?.，称为可选链接，只对读取/调用有用，对设置无效。从文档中：

// 在其核心，可选链接允许我们编写代码，如果遇到null或undefined，TypeScript可以立即停止运行某些表达式。

// 所以你可以这样解释const foobarbaz = foo?.bar?.baz：

  // if (data?.filter((item) => item.province === selectedProvince).map((item) => item.cities)?.[0]) {
  //   console.log('aaaaaaaaaaa');
  // }

  // 每次刷新后，调用一次，展示选中的数据
  React.useEffect(() => {
    const selectedProvince = localStorage.getItem('provinces') ? JSON.parse(localStorage.getItem('provinces') || '0') : '';
    const selectedCities = localStorage.getItem('cities') ? JSON.parse(localStorage.getItem('cities') || '0') : '';
    const selectedRegions = localStorage.getItem('regions') ? JSON.parse(localStorage.getItem('regions') || '0') : '';
    selectedForm.setFieldsValue({ provinceValue: selectedProvince, cityValue: selectedCities, regionValue: selectedRegions });
  }, []);

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
            {selectedCityArr &&
              selectedCityArr.map((item) => (
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
          <Select size="middle" placeholder="请选择地区" showDropdownSearch onChange={onRegionChange}>
            {selectedRegionArr &&
              selectedRegionArr.map((item) => (
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

export default SelectItem;
