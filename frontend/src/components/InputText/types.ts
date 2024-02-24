import { InputProps } from 'antd';
import { CommonInputType } from '../../types/commonInput';

export type InputTextProps = InputProps & Omit<CommonInputType, 'required'>;
