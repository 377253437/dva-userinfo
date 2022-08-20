import * as React from 'react';
import styles from './index.less';
import { Input, Form, Select, Radio, InputNumber } from 'sensd';
interface IUserContentProps {
  // onChange: any;
  // value: any;
}

const UserContent: React.FC<IUserContentProps> = () => {
  // const handleOnchange = (value) => {
  //   onChange(value)
  // }
  return (
    <>
      <Form.Item
        label="用户名"
        name="username"
        // rules={[{ required: true, message: 'Please input your username!', whitespace: true }]}
        validateTrigger="onBlur"
        hideErrorWhenChange
      >
        <Input></Input>
      </Form.Item>
      <Form.Item
        label="年龄"
        name="age"
        // rules={[{ required: true, message: 'Please input your username!' }]}
        validateTrigger="onBlur"
        hideErrorWhenChange
      >
        <InputNumber min={1}/>
      </Form.Item>
      <Form.Item
        label="性别"
        name="sex"
        // rules={[{ required: true, message: 'Please input your username!' }]}
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
        // rules={[{ required: true, message: 'Please input your username!' }]}
        validateTrigger="onBlur"
        hideErrorWhenChange
      >
        <Input></Input>
      </Form.Item>
      <Form.Item
        label="地址"
        name="address"
        rules={[{ required: true, message: 'Please input your username!' }]}
        validateTrigger="onBlur"
        hideErrorWhenChange
      >
        <Input></Input>
      </Form.Item>
    </>
  );
};

export default UserContent;
