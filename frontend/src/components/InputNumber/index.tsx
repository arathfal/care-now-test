import { ForwardedRef, forwardRef } from 'react';

import { InputNumber as InputNumberAntd, Typography } from 'antd';
import { InputNumberProps } from './types';

const { Text } = Typography;

const Component = (
  { label, required, errorText, ...props }: InputNumberProps,
  ref: ForwardedRef<HTMLInputElement>,
) => {
  return (
    <div>
      {label && (
        <Text strong>
          {label}
          {required && <Text type="danger">*</Text>}
        </Text>
      )}
      <InputNumberAntd {...props} ref={ref} status={errorText ? 'error' : undefined} />
      {errorText && <Text type="danger">{errorText}</Text>}
    </div>
  );
};

const InputNumber = forwardRef(Component);

export default InputNumber;
