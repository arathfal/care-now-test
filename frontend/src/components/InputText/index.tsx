import { ForwardedRef, forwardRef } from 'react';

import { Input, InputRef, Typography } from 'antd';
import { InputTextProps } from './types';

const { Text } = Typography;

const Component = (
  { label, required, errorText, ...props }: InputTextProps,
  ref: ForwardedRef<InputRef>,
) => {
  return (
    <div>
      {label && (
        <Text strong>
          {label}
          {required && <Text type="danger">*</Text>}
        </Text>
      )}
      <Input {...props} ref={ref} status={errorText ? 'error' : undefined} />
      {errorText && <Text type="danger">{errorText}</Text>}
    </div>
  );
};

const InputText = forwardRef(Component);

export default InputText;
