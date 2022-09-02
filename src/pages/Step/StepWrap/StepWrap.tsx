import * as React from 'react';
import StepContent from '../StepContent/StepContent';

import styles from './index.less';

const StepWrap: React.FC = () => {
  return (
    <div className={styles.wrap}>
      <StepContent />
    </div>
  );
};

export default StepWrap;
