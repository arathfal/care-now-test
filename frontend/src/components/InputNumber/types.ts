import { CommonInputType } from '@/types/commonInput';
import { InputNumberProps as InputNumberAntdProps } from 'antd';

export type InputNumberProps = InputNumberAntdProps & Omit<CommonInputType, 'required'>;
