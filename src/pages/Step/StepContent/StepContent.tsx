import * as React from 'react';
import { Steps, Button, Form, Radio, RadioChangeEvent, Tag, Select, Input, InputNumber } from 'sensd';
import styles from './index.less';
import { uniqueId } from 'lodash';
import { TemplateCustomOutlined, TimeControllerOutlined } from '@sensd/icons';
import { ChangeEvent } from 'react';

const { Step } = Steps;

interface IStepContentProps {}

const StepContent: React.FC<IStepContentProps> = () => {
  const [radioValue, setRadioValue] = React.useState<number>(1);
  const [current, setCurrent] = React.useState<number>(0);

  // selectedValue 的值 需要根据 radioValue 的状态来变化  现在的 Bug 是 选择了第一步到了第二步 再返回第一步重新选择时， 第二步没有变化
  const [selectedValue, setSelectedValue] = React.useState<string>('');
  const [InputNumber, setInputNumber] = React.useState<string>('');

  const getDescription = (step: string) => {
    switch (step) {
      case '步骤 1': {
        return (
          <>
            <p style={{ paddingTop: '5px' }}>
              {radioValue === 1 ? <Tag color="steppeYellow">定时</Tag> : <Tag color="auroraGreen">触发</Tag>}
            </p>
          </>
        );
      }
      case '步骤 2': {
        return (
          <>
            <p style={{ paddingTop: '5px' }}>
              {radioValue === 1 ? (
                <Tag color="steppeYellow">{selectedValue}</Tag>
              ) : (
                <Tag color="auroraGreen">{selectedValue}</Tag>
              )}
            </p>
          </>
        );
      }
      // 校验通过，才显示数字
      case '步骤 3': {
        return (
          <>
            <p style={{ paddingTop: '5px' }}>
              <Tag color="orchidPurple">{InputNumber}</Tag>
            </p>
          </>
        );
      }
      default:
        break;
    }
  };
  const handleRadioButtonChange = (e: RadioChangeEvent) => {
    console.log(e.target.value);
    setRadioValue(e.target.value);
    setSelectedValue('');
  };
  const handleSelectChange = (value: string) => {
    console.log(value);
    setSelectedValue(value);
  };

  const validateInputNumber = (_, value) => {
    console.log('value', value);
    console.log('value', typeof value);
    let reg = /^[1-9]+[0-9]*]*$/; //判断字符串是否为数字 ，判断正整数用/^[1-9]+[0-9]*]*$/
    if (value) {
      if (reg.test(value)) {
        if (value > 10) {
          setInputNumber(value);
          return Promise.resolve();
        } else {
          return Promise.reject(new Error('输入的数字必须大于 10'));
        }
      } else {
        return Promise.reject(new Error('输入必须为数字'));
      }
    }else{
        setInputNumber('');
        return Promise.reject(new Error('请输入'));
    }
  };
  const steps = [
    {
      id: uniqueId(),
      title: '步骤 1',
      content: (
        <Form>
          <Form.Item name="radioButton">
            <Radio.Group onChange={handleRadioButtonChange} defaultValue={1} value={radioValue}>
              <Radio value={1}>
                <div className={`${styles['definedContent']} ${radioValue === 1 ? styles['titleActive'] : ''}`}>
                  <TimeControllerOutlined style={{ fontSize: '25px', color: '#00bf8a' }} />
                  <span className={styles.title}>定时</span>
                </div>
              </Radio>
              <Radio value={2}>
                <div className={`${styles['definedContent']} ${radioValue === 2 ? styles['titleActive'] : ''}`}>
                  <TemplateCustomOutlined style={{ fontSize: '25px', color: '#00bf8a' }} />
                  <span className={styles.title}>触发</span>
                </div>
              </Radio>
            </Radio.Group>
          </Form.Item>
        </Form>
      ),
    },
    {
      id: uniqueId(),
      title: '步骤 2',
      content: (
        <Form>
          <Form.Item name="selectDropdown" rules={[{ required: true }, { message: '请选择一项' }]}>
            {radioValue === 1 && (
              <div>
                <span className={styles['select-label']}>请进一步选择：</span>
                <Select
                  style={{ width: '150px' }}
                  size="large"
                  placeholder="请选择"
                  value={selectedValue}
                  onChange={handleSelectChange}
                >
                  <Select.Option value="定时单次">定时单次</Select.Option>
                  <Select.Option value="定时重复">定时重复</Select.Option>
                </Select>
              </div>
            )}
            {radioValue === 2 && (
              <div>
                <span className={styles['select-label']}>请进一步选择：</span>
                <Select
                  style={{ width: '150px' }}
                  size="large"
                  placeholder="请选择"
                  value={selectedValue}
                  onChange={handleSelectChange}
                >
                  <Select.Option value="完成触发">完成触发</Select.Option>
                  <Select.Option value="未完成触发">未完成触发</Select.Option>
                </Select>
              </div>
            )}
          </Form.Item>
        </Form>
      ),
    },
    {
      id: uniqueId(),
      title: '步骤 3',
      content: (
        <Form name="inputNumber" style={{ height: '50px' }}>
          <Form.Item
            name="inputNumber"
            rules={[{ validator: validateInputNumber }]}
          >
            <Input size="large" placeholder="请输入数字" />
          </Form.Item>
        </Form>
      ),
    },
  ];

  const handleOnChange = (current) => {
    console.log('onChange:', current);
    setCurrent(current);
  };

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  return (
    <>
      <Steps
        current={current}
        onChange={handleOnChange}
        className={styles['site-navigation-steps']}
        direction="vertical"
      >
        {steps.map((item, _) => (
          <Step
            key={item.id}
            title={item.title}
            description={getDescription(item.title)}
            className={styles['step-item']}
          />
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
          <Button className={styles['step-button']} onClick={() => prev()}>
            上一步
          </Button>
        )}
      </div>
    </>
  );
};

export default StepContent;
