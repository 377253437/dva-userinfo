import * as React from 'react';
import { IData, getAsyncMultiData } from './utils';
import TestData from './TestData';

const SelectWrap: React.FC = () => {
  const [multiData, setMultiData] = React.useState<IData[]>([]);
  React.useEffect(() => {
    getAsyncMultiData()
      .then((value: IData[]) => setMultiData(value))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div>
      <TestData multiData={multiData}></TestData>
    </div>
  );
};

export default SelectWrap;
