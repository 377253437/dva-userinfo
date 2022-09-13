import * as React from 'react';
import SelectItem from '../SelectItem';
import SelectItemForm from '../SelectItemForm';
import SelectItemFormTest from '../SelectItemForm/indexTest.jsx'
import styles from './index.less';
import { getData } from '../utils';
import { Popconfirm, Button, Form, message } from 'sensd';

export interface Cities {
  city: string;
  region: Array<string>;
}

export interface ICityList {
  province: string;
  cities: Array<Cities>;
}

export interface ICityValues {
  provinceValue: string | undefined;
  cityValue: string | undefined;
  regionValue: string | undefined;
}

const SelectWrap: React.FC = () => {
  const [cityList, setCityList] = React.useState<ICityList[]>([]);
  const itemRef = React.useRef<any>();
  const [selectedForm] = Form.useForm();
  // 子组件设计应该是受我传入的 数据控制。我在这里数据清空，那么子组件的值也会清空
  const clearAll = (): void => {
    itemRef.current!.clearProvinceConfirm();
  };
  const handleValueChange = (_, allValue: ICityValues): void => {
    console.log(allValue);
  };
  const handleClick = (): void => {
    selectedForm.submit();
  };
  const onSelectFinish = (values: ICityValues): void => {
    const {cityValue ,provinceValue,regionValue} = values
    message.success(`提交成功：${cityValue}-${provinceValue}-${regionValue}`)
    itemRef.current!.saveSelectedValues()
    console.log('finishedValues', values);
  };

  React.useEffect(() => {
    const getTmpData = () => {
      getData().then((v) => {
        const { data } = v;
        setCityList(data);
      });
    };
    getTmpData();
  }, []);

  return (
    <div className={styles.boxWrap}>
      <Popconfirm className={styles['clear-button']} title="确认清空所有选择？" onConfirm={clearAll}>
        <Button type="primary">重置所有</Button>
      </Popconfirm>
      <Button type="primary" className={styles['submit-button']} onClick={handleClick}>
        提交
      </Button>
      <Form onValuesChange={handleValueChange} form={selectedForm} onFinish={onSelectFinish}>
        {/* <SelectItem cityList={cityList} ref={itemRef}></SelectItem> */}
        <SelectItemForm cityList={cityList} ref={itemRef} selectedForm={selectedForm}></SelectItemForm>
        {/* <SelectItemFormTest cityList={cityList} ref={itemRef} selectedForm={selectedForm}></SelectItemFormTest> */}
      </Form>
    </div>
  );
};

export default SelectWrap;
