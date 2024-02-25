import { CommonInputType } from '@/types/commonInput';
import { InputProps } from 'antd';

export type InputTextProps = InputProps & Omit<CommonInputType, 'required'>;
