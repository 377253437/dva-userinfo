import * as React from 'react';
import { Steps, Button, Form, Radio, RadioChangeEvent } from 'sensd';
import styles from './index.less';
import { uniqueId } from 'lodash';
import { TemplateCustomOutlined, TimeControllerOutlined } from '@sensd/icons';

const { Step } = Steps;

interface IStepContentProps {}

const StepContent: React.FC<IStepContentProps> = (props) => {
  const [radioValue, setRadioValue] = React.useState<number>(1);
  const [current, setCurrent] = React.useState<number>(0);

  const getDescription = (step: string) => {
    if (step === '步骤 1') {
      return (
        <>
          <h1>{radioValue}</h1>
        </>
      );
    }
  };
  const handleRadioButtonChange = (e: RadioChangeEvent) => {
    setRadioValue(e.target.value);
  };
  const steps = [
    {
      id: uniqueId(),
      title: '步骤 1',
      content: (
        <Form>
          <Form.Item name="radioButton">
            <Radio.Group onChange={handleRadioButtonChange} value={radioValue} style={{ marginTop: '7%' }}>
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
      content: 'Second-content',
    },
    {
      id: uniqueId(),
      title: '步骤 3',
      content: 'Last-content',
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
