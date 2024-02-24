import { InputNumberProps as InputNumberAntdProps } from 'antd';
import { CommonInputType } from '../../types/commonInput';

export type InputNumberProps = InputNumberAntdProps & Omit<CommonInputType, 'required'>;
