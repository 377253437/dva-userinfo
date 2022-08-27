import * as React from 'react';
import { initData, IData } from './utils';
import TestData from './TestData';

const initialData: IData[] = initData;

const SelectWrap: React.FC = () => {
  const [multiData, _] = React.useState<IData[]>(initialData);
  return (
    <div>
      <TestData multiData={multiData}></TestData>
    </div>
  );
};

export default SelectWrap;
