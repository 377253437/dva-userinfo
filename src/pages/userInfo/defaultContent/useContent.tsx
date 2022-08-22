import * as React from 'react';
// import styles from './index.less';
import { Input, Form, Radio, InputNumber } from 'sensd';


const DefaultContent: React.FC = () => {
  return (
    <>
      <Form.Item
        label="用户名"
        name="username"
        rules={[{ required: true, message: '请输入用户名', whitespace: true }]}
        validateTrigger="onBlur"
        hideErrorWhenChange
      >
        <Input></Input>
      </Form.Item>
      <Form.Item
        label="年龄"
        name="age"
        rules={[{ required: true, message: '请输入年龄' }]}
        validateTrigger="onBlur"
        hideErrorWhenChange
      >
        <InputNumber min={1}/>
      </Form.Item>
      <Form.Item
        label="性别"
        name="sex"
        rules={[{ required: true, message: '请选择性别' }]}
        validateTrigger="onBlur"
        hideErrorWhenChange
      >
        <Radio.Group>
          <Radio value="man">男性</Radio>
          <Radio value="woman">女性</Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item
        label="邮箱"
        name="email"
        rules={[{ required: true, message: '请输入邮箱' }]}
        validateTrigger="onBlur"
        hideErrorWhenChange
      >
        <Input></Input>
      </Form.Item>
      <Form.Item
        label="地址"
        name="address"
        rules={[{ required: true, message: '请输入地址' }]}
        validateTrigger="onBlur"
        hideErrorWhenChange
      >
        <Input></Input>
      </Form.Item>
    </>
  );
};

export default DefaultContent;
