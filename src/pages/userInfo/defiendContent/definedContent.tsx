import * as React from 'react';
import { Input, Form, Radio, Button, Popconfirm } from 'sensd';
import { CloseOutlined } from '@sensd/icons';
import { DefinedValue } from '../userWrap/userWrap';

interface IDefinedContent {
  inputArr: DefinedValue[];
  setInputArr: React.Dispatch<React.SetStateAction<DefinedValue[]>>;
}
const DefinedContent: React.FC<IDefinedContent> = ({ inputArr, setInputArr }) => {
  const confirmDelete = (id: number) => {
    const newData = inputArr.filter((item) => item.id !== id);
    setInputArr(newData);
  };

  return (
    <div>
      {inputArr.map((item) => {
        if (item.type === 'input') {
          return (
            <div style={{ display: 'flex' }}>
              <Form.Item
                key={item.id}
                label={item.label}
                name={item.name}
                initialValue={item.initValue}
                rules={[{ required: true, message: `请输入${item.name}` }]}
              >
                <Input></Input>
              </Form.Item>
              <Popconfirm title="确认删除？" onConfirm={() => confirmDelete(item.id)}>
                <Button icon={<CloseOutlined />} style={{ marginLeft: '8px' }}></Button>
              </Popconfirm>
            </div>
          );
        } else if (item.type === 'select') {
          return (
            <Form.Item
              key={item.id}
              name={item.name}
              label={item.label}
              // initialValue={item.initValue}
              rules={[{ required: true, message: `请选择一项${item.name}` }]}
            >
              <Radio.Group>
                {Array.isArray(item.initValue) &&
                  item.initValue.map((item, index) => (
                    <Radio value={item} key={index}>
                      {item}
                    </Radio>
                  ))}
              </Radio.Group>
            </Form.Item>
          );
        }
      })}
    </div>
  );
};

export default DefinedContent;
