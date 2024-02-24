import { Button, Card, Flex, Typography } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import { Controller, useForm } from 'react-hook-form';
import { DatePicker, InputNumber, InputText, Select } from '../../components';
import './index.css';
import { FormFieldTypes } from './types';

const { Title } = Typography;

const Home = () => {
  const { control, watch, reset } = useForm<FormFieldTypes>({
    mode: 'onChange',
  });

  console.log(watch());

  return (
    <main>
      <Card>
        <Title level={3} className="center">
          Add Patient Data
        </Title>
        <form>
          <Flex gap={32} vertical>
            <Flex gap={16} vertical>
              <Controller
                control={control}
                name="name"
                rules={{
                  required: 'Please enter the patient name.',
                  pattern: {
                    value: /^(?![\s.]+$)[a-zA-Z\s.]*$/,
                    message:
                      'Invalid format for the patient name. Please use only letters and spaces.',
                  },
                }}
                render={({ field, fieldState: { error } }) => (
                  <InputText
                    {...field}
                    label="Patient Name"
                    placeholder="Input patient name"
                    errorText={error?.message}
                    size="large"
                  />
                )}
              />
              <Controller
                control={control}
                name="id"
                rules={{
                  required: 'Please enter the patient ID.',
                  pattern: {
                    value: /^([0-9])+$/,
                    message: 'Invalid format for the patient ID. Please use only numbers.',
                  },
                }}
                render={({ field, fieldState: { error } }) => (
                  <InputNumber
                    {...field}
                    label="Patient ID"
                    placeholder="Input patient ID"
                    errorText={error?.message}
                    size="large"
                    controls={false}
                    type="number"
                  />
                )}
              />
              <Controller
                control={control}
                name="treatmentDate"
                rules={{
                  required: 'Please select the treatment date.',
                }}
                render={({ field, fieldState: { error } }) => {
                  const value = (field.value ? dayjs(field.value, 'DD/MM/YYYY') : '') as Dayjs;

                  return (
                    <DatePicker
                      {...field}
                      value={value}
                      onChange={(_, dateString) => field.onChange(dateString)}
                      label="Treatment Date"
                      placeholder="Select treatment date"
                      errorText={error?.message}
                      size="large"
                    />
                  );
                }}
              />
              <Controller
                control={control}
                name="treatmentDescription"
                rules={{
                  required: 'Please select the treatment description.',
                }}
                render={({ field, fieldState: { error } }) => (
                  <Select
                    {...field}
                    mode="multiple"
                    size="large"
                    allowClear
                    label="Treatment Description"
                    placeholder="Select treatment description"
                    errorText={error?.message}
                    options={[
                      {
                        value: 'one',
                        label: 'One',
                      },
                      {
                        value: 'two',
                        label: 'Two',
                      },
                      {
                        value: 'three',
                        label: 'Three',
                      },
                      {
                        value: 'four',
                        label: 'Four',
                      },
                    ]}
                  />
                )}
              />
              <Controller
                control={control}
                name="medicationsPrescribed"
                rules={{
                  required: 'Please select the medications prescribed.',
                }}
                render={({ field, fieldState: { error } }) => (
                  <Select
                    {...field}
                    mode="multiple"
                    size="large"
                    allowClear
                    label="Medications Prescribed"
                    placeholder="Select medications prescribed"
                    errorText={error?.message}
                    options={[
                      {
                        value: 'one',
                        label: 'One',
                      },
                      {
                        value: 'two',
                        label: 'Two',
                      },
                      {
                        value: 'three',
                        label: 'Three',
                      },
                      {
                        value: 'four',
                        label: 'Four',
                      },
                    ]}
                  />
                )}
              />
              <Controller
                control={control}
                name="cost"
                rules={{
                  required: 'Please enter the treatment cost',
                  pattern: {
                    value: /^[0-9]\d*(\.\d{1,4})?$/,
                    message: 'Invalid format for the treatment cost.',
                  },
                }}
                render={({ field, fieldState: { error } }) => (
                  <InputNumber
                    {...field}
                    label="Treatment Cost"
                    placeholder="0"
                    errorText={error?.message}
                    size="large"
                    parser={(value) => value!.replace(',', '.')}
                  />
                )}
              />
            </Flex>
            <Flex gap={16}>
              <Button type="primary" htmlType="submit" className="full-width" size="large">
                Submit
              </Button>
              <Button htmlType="button" onClick={() => reset()} className="full-width" size="large">
                Reset
              </Button>
            </Flex>
          </Flex>
        </form>
      </Card>
    </main>
  );
};
export default Home;
