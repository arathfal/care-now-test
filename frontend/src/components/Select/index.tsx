'use client';

import { ForwardedRef, forwardRef } from 'react';

import { Flex, RefSelectProps, Select as SelectAntd, Typography } from 'antd';
import { SelectProps } from './types';

const { Text } = Typography;

const Component = (
  { label, errorText, required, ...props }: SelectProps,
  ref: ForwardedRef<RefSelectProps>,
) => {
  return (
    <Flex vertical>
      {label && (
        <Text strong>
          {label}
          {required && <Text type="danger">*</Text>}
        </Text>
      )}
      <SelectAntd {...props} ref={ref} status={errorText ? 'error' : undefined} />
      {errorText && <Text type="danger">{errorText}</Text>}
    </Flex>
  );
};

const Select = forwardRef(Component);

export default Select;
