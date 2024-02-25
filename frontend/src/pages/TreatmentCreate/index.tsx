import { DatePicker, InputNumber, InputText, Select, TimePicker } from '@/components';
import MEDICATIONS from '@/constants/medications';
import paths from '@/constants/paths';
import TREATMENTS from '@/constants/treatments';
import usePost from '@/hooks/usePost';
import useToast from '@/hooks/useToast';
import { ApiResponse } from '@/types/commonApi';
import { Button, Card, Col, Flex, Grid, Row, Typography } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import './index.css';
import { CreateTreatmentResponse, FormFieldTypes } from './types';

const { Title, Text } = Typography;
const { useBreakpoint } = Grid;

const TreatmentCreate = () => {
  const navigate = useNavigate();
  const screen = useBreakpoint();
  const { setNotif, contextHolder } = useToast();

  const { control, handleSubmit } = useForm<FormFieldTypes>({
    mode: 'onChange',
  });

  const [onPost, { loading }] = usePost<CreateTreatmentResponse>({
    path: 'treatment',
    onCompleted: (res) => {
      const documentId = res?.documentId;
      setNotif({
        title: 'Create Treatment Success',
        description: (
          <span>
            Treatment created successfully by id: <strong>{documentId}</strong>
          </span>
        ),
      });
      setTimeout(() => navigate(paths.TREATMENT), 300);
    },
    onError: (err) => {
      const errors = err as ApiResponse['errors'];
      setNotif({
        type: 'error',
        title: 'Create Treatment Failed',
        description: (
          <>
            <Text>There are some error on your input:</Text>
            <ul>
              {errors?.map((e, i) => {
                return (
                  <li key={i.toString() + e}>
                    <Text type="danger">{e?.message}</Text>
                  </li>
                );
              })}
            </ul>
          </>
        ),
      });
    },
  });

  const onSubmit: SubmitHandler<FormFieldTypes> = async (formData) => {
    await onPost({
      ...formData,
      date: dayjs(formData?.date, 'DD/MM/YYYY').format('YYYY/MM/DD'),
    });
  };

  return (
    <main id="treatment-create">
      {contextHolder}
      <Card>
        <Title level={3} className="center">
          Add Treatment Data
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
                    mode="tags"
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
              <Button
                type="primary"
                htmlType="submit"
                className="full-width"
                size="large"
                loading={loading}
              >
                Submit
              </Button>
              <Button
                htmlType="button"
                onClick={() => navigate(paths.TREATMENT)}
                className="full-width"
                size="large"
              >
                Cancel
              </Button>
            </Flex>
          </Flex>
        </form>
      </Card>
    </main>
  );
};
export default TreatmentCreate;
