/* eslint-disable no-undef */
import * as React from 'react';
import { useState, useCallback } from 'react';
import { Button, Form } from 'sensd';
import UserContent from '../userContent/useContent';
import styles from './index.less';
import DefinedModal from '../definedModal/definedModal';
interface IUserWrapProps {}

const UserWrap: React.FC<IUserWrapProps> = (props) => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const [changeDefined, setChangeDefined] = React.useState(0);

  const handleInputClick = useCallback(() => {
    setChangeDefined(1);
  }, [changeDefined]);

  const handleSelectClick = useCallback(() => {
    setChangeDefined(2);
  }, [changeDefined]);

  const handleOk = useCallback(() => {
    setIsModalVisible(false);
    setChangeDefined(0);
  }, [isModalVisible]);

  const handleCancel = useCallback(() => {
    setIsModalVisible(false);
    setChangeDefined(0);
  }, [isModalVisible]);

  const handleAddClick = () => {
    setIsModalVisible(true);
  };

  const onFinish = (values) => {
    console.log(values);
  };
  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
        <h1 className={styles.title}>用户信息录入</h1>
        <Button className={styles.button} type="primary" size="large" onClick={onFinish}>
          保存
        </Button>
      </div>
      <div className={styles.userTitle}>
        <div className={styles['borderLeft-userTitle']}></div>
        <span>用户基本信息</span>
      </div>
      <div className={styles.userInput}>
        <Form labelWidth={'67px'} onFinish={onFinish}>
          <UserContent></UserContent>
        </Form>
      </div>
      <div className={styles.userDefinedTitle}>
        <div className={styles['borderLeft-userDefinedTitle']}></div>
        <div>用户自定义信息</div>
        <Button type="primary" onClick={handleAddClick}>
          添加
        </Button>
        <DefinedModal
          handleOk={handleOk}
          handleCancel={handleCancel}
          isModalVisible={isModalVisible}
          changeDefined={changeDefined}
          handleInputClick={handleInputClick}
          handleSelectClick={handleSelectClick}
        />
      </div>
    </div>
  );
};

export default UserWrap;
