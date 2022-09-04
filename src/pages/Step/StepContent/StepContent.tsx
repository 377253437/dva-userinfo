import * as React from 'react';
import { Steps, Button, Form, Radio, Tag, Select, Input, message } from 'sensd';
import styles from './index.less';
import { uniqueId } from 'lodash';
import { TemplateCustomOutlined, TimeControllerOutlined } from '@sensd/icons';

const { Step } = Steps;

const StepContent: React.FC = () => {
  const [radioValue, setRadioValue] = React.useState<number>(1);
  const [current, setCurrent] = React.useState<number>(0);
  const [selectedValue, setSelectedValue] = React.useState<string>('');
  const [InputNumber, setInputNumber] = React.useState<string>('');

  const getDescription = (step: string) => {
    switch (step) {
      case 'Step1: Radio': {
        return (
          <>
            <p style={{ paddingTop: '5px' }}>
              {radioValue === 1 ? <Tag color="steppeYellow">定时</Tag> : <Tag color="auroraGreen">触发</Tag>}
            </p>
          </>
        );
      }
      case 'Step2: Select': {
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
      case 'Step3: Input': {
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

  const validateInputNumber = (_, value) => {
    let reg = /^[1-9]\d*|0$/; //判断字符串是否为正整数
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
    } else {
      setInputNumber('');
      return Promise.reject(new Error('请输入'));
    }
  };
  const handleOnChange = (current) => {
    setCurrent(current);
  };

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const [inputNumberForm] = Form.useForm();

  const [radioForm] = Form.useForm();

  const [selectForm] = Form.useForm();

  const inputNumberRef = React.useRef<any>()

  const handleSave = () => {
    radioForm.submit();
    inputNumberForm.submit();
    selectForm.submit();
    selectForm.validateFields().then(v=>console.log(v)).catch(error=> message.warn('Step2 没有选择'))
    console.log('radio', radioForm.getFieldsValue());
    console.log('number', inputNumberForm.getFieldsValue());
    console.log('select', selectForm.getFieldsValue());

  };
  const onRadioFinish = (values) => {
    console.log('radioFormFinished', values);
  };
  const onRadioChange = ({ radioButton }) => {
    setRadioValue(radioButton);
    setSelectedValue('')
    selectForm.setFieldsValue({selectDropdown:''})
  };
  const onSelectedChange = ({selectDropdown}) => {
    setSelectedValue(selectDropdown)
  }
  React.useEffect(() => {
    current === 2 && inputNumberRef.current!.focus()
  })
  const steps = [
    {
      id: uniqueId(),
      title: 'Step1: Radio',
      content: (
        <Form
          name="radioButtonForm"
          form={radioForm}
          onFinish={onRadioFinish}
          initialValues={{ radioButton: radioValue }}
          onValuesChange={onRadioChange}
          style={{ display: current === 0 ? 'block' : 'none' }}
        >
          <Form.Item name="radioButton">
            <Radio.Group>
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
      title: 'Step2: Select',
      content: (
        <Form name="selectDropdownForm" form={selectForm} style={{ display: current === 1 ? 'block' : 'none' }} onValuesChange={onSelectedChange}>
          <Form.Item>
            {radioValue === 1 && (
              <>
                <span className={styles['select-label']}>请进一步选择：</span>
                <Form.Item name="selectDropdown" rules={[{ required: true, message: '请选择一项' }]} noStyle>
                  <Select
                    style={{ width: '150px' }}
                    size="large"
                    placeholder="请选择"
                  >
                    <Select.Option value="定时单次">定时单次</Select.Option>
                    <Select.Option value="定时重复">定时重复</Select.Option>
                  </Select>
                </Form.Item>
              </>
            )}
            {radioValue === 2 && (
              <>
                <span className={styles['select-label']}>请进一步选择：</span>
                <Form.Item name="selectDropdown" rules={[{ required: true, message: '请选择一项' }]} noStyle>
                  <Select
                    style={{ width: '150px' }}
                    size="large"
                    placeholder="请选择"
                  >
                    <Select.Option value="完成触发">完成触发</Select.Option>
                    <Select.Option value="未完成触发">未完成触发</Select.Option>
                  </Select>
                </Form.Item>
              </>
            )}
          </Form.Item>
        </Form>
      ),
    },
    {
      id: uniqueId(),
      title: 'Step3: Input',
      content: (
        <Form
          name="inputNumberForm"
          style={{ height: '50px', display: current === 2 ? 'block' : 'none' }}
          form={inputNumberForm}
        >
          <Form.Item name="inputNumber" rules={[{ validator: validateInputNumber }]} >
            <Input size="large" placeholder="请输入数字" ref={inputNumberRef}/>
          </Form.Item>
        </Form>
      ),
    },
  ];

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
      <div className={styles['steps-content']}>{steps.map((item) => item.content)}</div>
      <div className={styles['steps-action']}>
        {current > 0 && (
          <Button className={styles['step-button']} onClick={() => prev()}>
            上一步
          </Button>
        )}
        {current < steps.length - 1 && (
          <Button type="primary" onClick={() => next()}>
            下一步
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button type="primary"  className={styles['save-button']} onClick={handleSave}>
            保存
          </Button>
        )}
      </div>
    </>
  );
};

export default StepContent;