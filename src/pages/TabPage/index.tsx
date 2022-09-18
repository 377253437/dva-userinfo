import * as React from 'react';
import { Tabs, Tooltip, InputNumber, Button, Select, Popconfirm, Form, message } from 'sensd';
import { InfoOutlined } from '@sensd/icons';
import styles from './index.less';
import { getRandomTabs, sortTabs } from '../../utils/utils.js';

interface ITabData {
  id: string;
  cname: string;
  content: string;
}
const { TabPane } = Tabs;
const { Option } = Select;
const initData = getRandomTabs(12);

const TabPage: React.FC = () => {
  const [randomCount, setRandomCount] = React.useState<number>(0);
  const [currentTab, setCurrentTab] = React.useState<string>(() => {
    return localStorage.getItem('currentTab') ? JSON.parse(localStorage.getItem('currentTab') || '0') : '1';
  });
  const [selectedSort, setSelectedSort] = React.useState<string>('');
  const [tabData, setTabData] = React.useState<ITabData[]>(() => {
    return localStorage.getItem('tabData') ? JSON.parse(localStorage.getItem('tabData') || '0') : [];
  });

  const onSelectedChange = (value: string) => {
    setSelectedSort(value);
    const sortData = sortTabs(value, tabData, 'id');
    setTabData(sortData);
  };
  const onInputNumberChange = (e: number) => {
    setRandomCount(e);
  };
  const onTabChange = (value: string) => {
    setCurrentTab(value);
    value && localStorage.setItem('currentTab', value);
  };
  const resetData = React.useMemo(() => {
    return getRandomTabs(randomCount);
  }, [randomCount]);

  const resetTabsConfirm = () => {
    if (randomCount) {
      const initCurrentTab = resetData[0].id;
      localStorage.setItem('tabData', JSON.stringify(resetData));
      setTabData(resetData);
      initCurrentTab && localStorage.setItem('currentTab', JSON.stringify(initCurrentTab));
      setCurrentTab(initCurrentTab);
    } else {
      message.warn('请先输入数字');
    }
  };
  React.useEffect(() => {
    if (!tabData.length) {
      localStorage.setItem('tabData', JSON.stringify(initData));
      setTabData(JSON.parse(localStorage.getItem('tabData') || '0'));
    } else {
      localStorage.setItem('tabData', JSON.stringify(tabData));
    }
  }, [tabData]);

  return (
    <>
      <div className={styles['actions']}>
        <Form.Item rules={[{}]} noStyle>
          <InputNumber placeholder="请输入" min={1} size="middle" onChange={onInputNumberChange} />
        </Form.Item>
        <Tooltip title="重置的 Tabs 个数为：0 ~ 输入的数字之间的随机数">
          <InfoOutlined className={styles['icon']} />
        </Tooltip>
        <Popconfirm title="确认重置 Tabs 数据？" onConfirm={resetTabsConfirm}>
          <Button className={styles['reset-button']} size="middle" type="primary">
            重置数据
          </Button>
        </Popconfirm>
        <div className={styles['sort-box']}>
          <span>排序：</span>
          <Select value={selectedSort} defaultValue={null} showConfirm onChange={onSelectedChange} placeholder="请选择排序方式">
            <Option value="larToSml">从大到小</Option>
            <Option value="SmlToLar">从小到大</Option>
          </Select>
        </div>
      </div>
      <div className={styles['wrap']}>
        {tabData.length === 0 ? (
          <h1>对不起，目前没有数据</h1>
        ) : (
          <Tabs activeKey={currentTab.toString()} style={{ height: 220 }} className={styles['tab-box']} onChange={onTabChange}>
            {tabData.map((item, i) => (
              <TabPane tab={`${item.cname} ${item.id}`} key={item.id}>
                {item.content} {item.id}
              </TabPane>
            ))}
          </Tabs>
        )}
      </div>
    </>
  );
};

export default TabPage;
