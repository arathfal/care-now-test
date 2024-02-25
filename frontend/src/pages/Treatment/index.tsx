import paths from '@/constants/paths';
import useGet from '@/hooks/useGet';
import { Button, Card, Flex, Table, TableProps, Typography } from 'antd';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import './index.css';
import { DataTableType, TreatmentResponse } from './types';

const { Text, Title } = Typography;

const columns: TableProps<DataTableType>['columns'] = [
  {
    title: 'Patient ID',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Patient Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Treatment Date',
    dataIndex: 'treatmentDate',
    key: 'treatmentDate',
  },
  {
    title: 'Treatment Description',
    key: 'treatmentDescriptions',
    dataIndex: 'treatmentDescriptions',
    render: (_, { treatmentDescriptions }) => <Text>{treatmentDescriptions?.join(', ')}</Text>,
  },
  {
    title: 'Medications Prescribed',
    key: 'medicationsPrescribed',
    dataIndex: 'medicationsPrescribed',
    render: (_, { medicationsPrescribeds }) => <Text>{medicationsPrescribeds?.join(', ')}</Text>,
  },
  {
    title: 'Cost',
    dataIndex: 'cost',
    key: 'cost',
    render: (_, { cost }) => <Text>Rp{Intl?.NumberFormat('id-ID')?.format(cost)}</Text>,
  },
];

const Treatment = () => {
  const navigate = useNavigate();

  const { data: treatments, loading } = useGet<TreatmentResponse>({
    path: 'treatment',
  });

  const dataSource = treatments?.data?.map((treatment) => {
    return {
      key: treatment?.documentId,
      id: treatment?.id,
      name: treatment?.name,
      treatmentDate: dayjs(treatment?.treatment_date).format('DD MMMM YYYY, HH:mm'),
      treatmentDescriptions: treatment?.treatment_description,
      medicationsPrescribeds: treatment?.medications_prescribed,
      cost: treatment?.cost,
    };
  });

  return (
    <main id="treatment">
      <Card>
        <Title level={3} className="center">
          List Treatments
        </Title>
        <Flex justify="flex-end" className="space-bottom">
          <Button
            type="primary"
            size="large"
            loading={loading}
            onClick={() => navigate(paths.TREATMENT_CREATE)}
          >
            Add Treatment
          </Button>
        </Flex>
        <Table
          columns={columns}
          dataSource={dataSource}
          loading={loading}
          pagination={{ hideOnSinglePage: true }}
        />
      </Card>
    </main>
  );
};

export default Treatment;
