'use client';
import { ForwardedRef, forwardRef } from 'react';

import { Flex, TimePicker as TimePickerAntd, Typography } from 'antd';
import { PickerRef } from 'rc-picker';
import { TimePickerProps } from './types';

const { Text } = Typography;

const Component = (
  { errorText, format, label, required, ...props }: TimePickerProps,
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
      <TimePickerAntd {...props} ref={ref} required={required} format={format ?? 'HH:mm:ss'} />

      {errorText && <Text type="danger">{errorText}</Text>}
    </Flex>
  );
};

const TimePicker = forwardRef(Component);

export default TimePicker;
