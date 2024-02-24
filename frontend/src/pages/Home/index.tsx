import { Button, Card, Col, Flex, Grid, Row, Typography } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { DatePicker, InputNumber, InputText, Select, TimePicker } from '../../components';
import MEDICATIONS from '../../constants/medications';
import TREATMENTS from '../../constants/treatments';
import './index.css';
import { FormFieldTypes } from './types';

const { Title } = Typography;
const { useBreakpoint } = Grid;

const Home = () => {
  const screen = useBreakpoint();
  console.log(screen);

  const { control, reset, handleSubmit } = useForm<FormFieldTypes>({
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<FormFieldTypes> = (formData) => {
    console.log(formData);
  };

  return (
    <main>
      <Card>
        <Title level={3} className="center">
          Add Patient Data
        </Title>
        <form onSubmit={handleSubmit(onSubmit)}>
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
              <Row>
                <Col span={screen?.sm ? 15 : 13}>
                  <Controller
                    control={control}
                    name="date"
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
                          placeholder={`Ex: ${dayjs().format('DD/MM/YYYY')}`}
                          errorText={error?.message}
                          size="large"
                        />
                      );
                    }}
                  />
                </Col>
                <Col span={screen?.sm ? 8 : 10} offset={1}>
                  <Controller
                    control={control}
                    name="time"
                    rules={{
                      required: 'Please select the treatment time.',
                    }}
                    render={({ field, fieldState: { error } }) => {
                      const value = (field.value ? dayjs(field.value, 'HH:mm:ss') : '') as Dayjs;

                      return (
                        <TimePicker
                          {...field}
                          value={value}
                          onChange={(_, dateString) => field.onChange(dateString)}
                          label="Treatment Time"
                          placeholder={`Ex: ${dayjs().format('HH:mm:ss')}`}
                          errorText={error?.message}
                          size="large"
                        />
                      );
                    }}
                  />
                </Col>
              </Row>
              <Controller
                control={control}
                name="treatment_description"
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
                    options={TREATMENTS.map((treatment) => ({
                      value: treatment,
                      label: treatment,
                    }))}
                  />
                )}
              />
              <Controller
                control={control}
                name="medications_prescribed"
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
                    options={MEDICATIONS.map((medication) => ({
                      value: medication,
                      label: medication,
                    }))}
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
