/* eslint-disable no-undef */
/* eslint-disable react/jsx-no-undef */
import * as React from 'react';
import { useState } from 'react';
import { Modal, Steps, Button, Input, Select, Form } from 'sensd';
import { TemplateTextOutlined, TemplateCustomOutlined } from '@sensd/icons';
import styles from './definedModal.less';
import { DefinedValue } from '../userWrap/userWrap';

const { Step } = Steps;
const { Option } = Select;

interface ITodoModalProps {
  handleOk: () => void;
  handleCancel: () => void;
  isModalVisible: boolean;
  changeDefined: number;
  handleInputClick: () => void;
  handleSelectClick: () => void;
  inputArr:DefinedValue[]
  setInputArr:React.Dispatch<React.SetStateAction<DefinedValue[]>>
}

const DefinedModal: React.FC<ITodoModalProps> = ({
  handleOk,
  handleCancel,
  isModalVisible,
  changeDefined,
  handleInputClick,
  handleSelectClick,
  inputArr,
  setInputArr
}) => {
  const [inputForm] = Form.useForm();

  const [inputValue, setInputValue] = useState<any>(null);

  const [current, setCurrent] = useState<number>(0);

  const [open, setOpen] = useState<boolean>(false);

  const [inputCount, setInputCount] = useState<number>(0);

  const onFinish = (value) => {
    console.log('value', value);
  };

  // const getValue = () => {
  //   const value = inputForm.getFieldsValue();
  //   setInputValue(value)
  //   console.log('GETVALUE', value);
  // };
  const inputCountFun = (count: number) => {
    return Array.from({ length: count }, (_, index) => (
      <Input size="small" key={index} style={{ width: '45%', marginRight: '12px', marginTop: '12px' }} />
    ));
  };

  const handleChange = (value: number, option: any) => {
    console.log(`selected ${value}`, option);
    setInputCount(value);
  };
  const steps = [
    {
      title: '第一步',
      content: (
        <div className={styles.titleBox}>
          <div
            className={`${styles['definedContent']} ${changeDefined === 1 ? styles['titleActive'] : ''}`}
            onClick={handleInputClick}
          >
            <TemplateTextOutlined style={{ fontSize: '20px', color: '#00bf8a', margin: '0 8px' }} />
            <span className={styles.title}>自定义文本框</span>
          </div>
          <div
            className={`${styles['definedSelect']} ${changeDefined === 2 ? styles['titleActive'] : ''}`}
            onClick={handleSelectClick}
          >
            <TemplateCustomOutlined style={{ fontSize: '20px', color: '#00bf8a', margin: '0 8px' }} />
            <span className={styles.title}>自定义选项类型</span>
          </div>
        </div>
      ),
    },
    {
      title: '第二步',
      content:
        changeDefined === 1 ? (
          <div>
            <Form form={inputForm} name="basic" onFinish={onFinish}>
              <span>请输入自定义属性名：</span>
              <Form.Item name="definedName">
                <Input></Input>
              </Form.Item>
              <span>请输入自定义属性值：</span>
              <Form.Item name="definedProp">
                <Input></Input>
              </Form.Item>
            </Form>
          </div>
        ) : (
          <div className={styles.definedSelectBox}>
            <div style={{ display: 'flex', marginTop: '10px' }}>
              <span>请输入自定义属性名：</span>
              <Input style={{ width: '50%', marginBottom: '10px' }} size="small"></Input>
            </div>
            <div>
              <span>选项值的个数(最多6个)：</span>
              <Select
                size="small"
                placeholder="请选择"
                onChange={handleChange}
                open={open}
                onDropdownVisibleChange={setOpen}
              >
                <Option value={1}>1</Option>
                <Option value={2}>2</Option>
                <Option value={3}>3</Option>
                <Option value={4}>4</Option>
                <Option value={5}>5</Option>
                <Option value={6}>6</Option>
              </Select>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>{inputCountFun(inputCount)}</div>
          </div>
        ),
    },
  ];

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const handleModalOk = () => {
    handleOk();
    const {definedName,definedProp} = inputForm.getFieldsValue();
    const tmp = {
      id:new Date().getTime(),
      type: changeDefined === 1?'input':'select',
      name:definedName,
      label:definedName,
      initValue:definedProp
    }
    const newData = [...inputArr,tmp]
    console.log(newData)
    setInputArr(newData)
    setCurrent(0)
  };

  const handleModalCancel = () => {
    handleCancel();
  };

  return (
    <>
      <Modal
        title="自定义用户信息"
        visible={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        forceRender
      >
        <Steps current={current}>
          {steps.map((item) => (
            <Step key={item.title} title={item.title} />
          ))}
        </Steps>
        <div className={styles['steps-content']}>{steps[current].content}</div>
        <div className={styles['steps-action']}>
          {current < steps.length - 1 && (
            <Button type="primary" onClick={() => next()}>
              下一步
            </Button>
          )}
          {current > 0 && (
            <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
              上一步
            </Button>
          )}
        </div>
      </Modal>
    </>
  );
};

export default DefinedModal;
