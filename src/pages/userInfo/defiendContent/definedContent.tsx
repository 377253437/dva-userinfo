import * as React from 'react';
import { Input, Form, Select, Radio, InputNumber } from 'sensd';
interface IDefinedContentProps {}

const inputarr = [
  {
    id: '1212313',
    type: 1,
    name: '阿斯顿撒旦',
    label: '阿斯顿撒旦',
    initValue: 'aaaaaaa',
  },
];

const DefinedContent: React.FC<IDefinedContentProps> = (props) => {
  return (
    <div>
      {inputarr.map((item) => {
        if (item.type === 1) {
          return (
            <Form.Item key={item.id} label={item.label} name={item.name} initialValue={item.initValue}>
              <Input></Input>
            </Form.Item>
          );
        } else if (item.type === 2) {
          return (
            <Form.Item key={item.id} label={item.label} name={item.name} initialValue={item.initValue}>
              <Input></Input>
            </Form.Item>
          );
        }
      })}
    </div>
  );
};

export default DefinedContent;
