'use client';
import { ForwardedRef, forwardRef } from 'react';

import { DatePicker as DatePickerAntd, Flex, Typography } from 'antd';
import { PickerRef } from 'rc-picker';
import { DatePickerProps } from './types';

const { Text } = Typography;

const Component = (
  { errorText, format, label, required, ...props }: DatePickerProps,
  ref: ForwardedRef<PickerRef>,
) => {
  return (
    <Flex vertical>
      {label && (
        <Text strong>
          {label}
          {required && <Text type="danger">*</Text>}
        </Text>
      )}
      <DatePickerAntd {...props} ref={ref} required={required} format={format ?? 'DD/MM/YYYY'} />

      {errorText && <Text type="danger">{errorText}</Text>}
    </Flex>
  );
};

const DatePicker = forwardRef(Component);

export default DatePicker;
