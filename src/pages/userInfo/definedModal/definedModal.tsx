/* eslint-disable react/jsx-no-undef */
import * as React from 'react';
import { useState } from 'react';
import { Modal, Steps, Button, message, Input, Select, SelectTransfer } from 'sensd';
import { TemplateTextOutlined, TemplateCustomOutlined } from '@sensd/icons';
import styles from './definedModal.less';
const { Step } = Steps;
const { Option } = Select;

// 点击选中某个触达方式, 更新当前选中值
// 默认选中第一个可用的通道
//传入名称返回一个选项框

interface ITodoModalProps {
  handleOk: () => void;
  handleCancel: () => void;
  isModalVisible: boolean;
  changeDefined: number;
  handleInputClick: () => void;
  handleSelectClick: () => void;
}

const DefinedModal: React.FC<ITodoModalProps> = ({
  handleOk,
  handleCancel,
  isModalVisible,
  changeDefined,
  handleInputClick,
  handleSelectClick,
}) => {
  const [current, setCurrent] = useState(0);

  const [open, setOpen] = useState(false);

  const [inputCount, setInputCount] = useState(0);

  const inputCountFun = (count) => {
    return Array.from({ length: count }, (_, index) => <Input size='small' key={index} style={{width:'45%',marginRight: '12px',marginTop:'12px' }}/>);
  };

  const handleChange = (value, option) => {
    console.log(`selected ${value}`, option);
    setInputCount(value);
  };
  const steps = [
    {
      title: 'First',
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
      title: 'Second',
      content:
        changeDefined === 1 ? (
          <div >
            <span>请输入自定义属性名：</span>
            <Input></Input>
            <span>请输入自定义属性值：</span>
            <Input></Input>
          </div>
        ) : (
          <div className={styles.definedSelectBox}>
            <div style={{display:'flex',marginTop:'10px'}}>
            <span>请输入自定义属性名：</span>
            <Input style={{width:'50%',marginBottom:'10px'}} size='small'></Input>
            </div>
            <div>
            <span>选项值的个数(最多6个)：</span>
            <Select size='small' placeholder="请选择" onChange={handleChange} open={open} onDropdownVisibleChange={setOpen}>
              <Option value={1}>1</Option>
              <Option value={2}>2</Option>
              <Option value={3}>3</Option>
              <Option value={4}>4</Option>
              <Option value={5}>5</Option>
              <Option value={6}>6</Option>
            </Select>
            </div>
            <div style={{display:'flex',flexWrap:'wrap'}}>{inputCountFun(inputCount)}</div>
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
          {current === steps.length - 1 && (
            <Button type="primary" onClick={() => message.success('Processing complete!')}>
              完成
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
