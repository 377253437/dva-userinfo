/* eslint-disable no-undef */
import * as React from 'react';
import { useState, useCallback,useEffect } from 'react';
import { Button, Form } from 'sensd';
import { AddOutlined} from '@sensd/icons';
import DefaultContent from '../defaultContent/useContent';
import styles from './index.less';
import DefinedModal from '../definedModal/definedModal';
import DefinedContent from '../defiendContent/definedContent'

export interface DefinedValue {
  id:number;
  type:string;
  name:string;
  label:string;
  selectCount?:number;
  initValue:string | string[];
}

//默认值都放外面，只渲染一次
const initInputArr:DefinedValue[] =  [
  {
    id: 11,
    type: 'input',
    name: '阿斯顿撒旦11',
    label: '阿斯顿撒旦11',
    initValue: 'aaaaaaa',
  },
  {
    id: 22,
    type: 'select',
    name: '阿斯顿撒旦22',
    label: '阿斯顿撒旦22',
    selectCount:3,
    initValue: ['111','222','333']
  },
];

const UserWrap: React.FC = () => {

  const [inputArr,setInputArr] = useState<DefinedValue[]>(() => {
    return localStorage.getItem('inputArr') ? JSON.parse(localStorage.getItem('inputArr') || '0') : initInputArr;});
// Set localStorage
// 此处getItem的赋值的空值判断不能用’{}‘或’[]’,因为JSON.parse(’{}’)、JSON.parse(’[]’) 为true !!
  useEffect(() => {
    if (!inputArr.length) {
      localStorage.setItem('inputArr', JSON.stringify(initInputArr));
      setInputArr(JSON.parse(localStorage.getItem('initInputArr') || '0'));
    } else {
      localStorage.setItem('inputArr', JSON.stringify(inputArr));
    }
  }, [inputArr]);

  const [userDefaultForm] = Form.useForm()

  const [userDefinedForm] = Form.useForm()

  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const [changeDefined, setChangeDefined] = useState<number>(1);

  const handleInputClick = useCallback(() => {
    setChangeDefined(1);
  }, [changeDefined]);

  const handleSelectClick = useCallback(() => {
    setChangeDefined(2);
  }, [changeDefined]);

  const handleOk = useCallback(() => {
    setIsModalVisible(false);
    setChangeDefined(1);
  }, [isModalVisible]);

  const handleCancel = useCallback(() => {
    setIsModalVisible(false);
    setChangeDefined(1);
  }, [isModalVisible]);

  const handleAddClick = () => {
    setIsModalVisible(true);
  };

  // const onFinish = (values:any) => {
  //   console.log('values',values);
  // };

  const handleSave = () => {
      const defaultData = userDefaultForm.getFieldsValue()
      console.log('defaultData',defaultData)
      const definedData = userDefinedForm.getFieldsValue()
      console.log('definedData',definedData)
    }
  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
        <h1 className={styles.title}>用户信息录入</h1>
        <Button className={styles.button} type="primary" size="large" onClick={handleSave}>
          保存
        </Button>
      </div>
      <div className={styles.userTitle}>
        <div className={styles['borderLeft-userTitle']}></div>
        <span>用户基本信息</span>
      </div>
      <div className={styles.userInput}>
        <Form form={userDefaultForm} labelWidth={'80px'}  name='userDefault'>
          <DefaultContent></DefaultContent>
        </Form>
      </div>
      <div className={styles.userDefinedTitle}>
        <div className={styles['borderLeft-userDefinedTitle']}></div>
        <div>用户自定义信息</div>
        <Button type="primary" onClick={handleAddClick} icon={<AddOutlined />} size='small' className={styles.addDefinedButton}>
        </Button>
        <DefinedModal
          handleOk={handleOk}
          handleCancel={handleCancel}
          isModalVisible={isModalVisible}
          changeDefined={changeDefined}
          handleInputClick={handleInputClick}
          handleSelectClick={handleSelectClick}
          setInputArr={setInputArr}
          inputArr={inputArr}
        />
      </div>
      <div className={styles.userDefinedInput}>
        <Form form={userDefinedForm} labelWidth={'80px'} labelEllipsis={true} name='userDefined'>
          <DefinedContent inputArr={inputArr} setInputArr={setInputArr}></DefinedContent>
        </Form>
      </div>
    </div>
  );
};

export default UserWrap;
