import paths from '@/constants/paths';
import useDelete from '@/hooks/useDelete';
import useGet from '@/hooks/useGet';
import { Button, Card, Flex, Modal, Table, TableProps, Typography } from 'antd';
import dayjs from 'dayjs';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './index.css';
import { DataTableType, TreatmentResponse } from './types';

const { Text, Title } = Typography;

const Treatment = () => {
  const navigate = useNavigate();
  const [id, setId] = useState('');

  const [refetch, { data: treatments, loading }] = useGet<TreatmentResponse>({
    path: 'treatment',
  });

  const [onDelete] = useDelete({
    path: `treatment/${id}`,
    onCompleted: () => {
      setId('');
      refetch();
    },
  });

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
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      render: (_, record) => (
        <Button type="primary" onClick={() => setId(record?.documentId)} danger>
          Delete
        </Button>
      ),
    },
  ];

  const dataSource = treatments?.data?.map((treatment) => {
    return {
      key: treatment?.documentId,
      id: treatment?.id,
      name: treatment?.name,
      treatmentDate: dayjs(treatment?.treatment_date).format('DD MMMM YYYY, HH:mm'),
      treatmentDescriptions: treatment?.treatment_description,
      medicationsPrescribeds: treatment?.medications_prescribed,
      cost: treatment?.cost,
      documentId: treatment?.documentId,
    };
  });

  return (
    <main id="treatment">
      <Modal
        title="Delete Treatment"
        open={!!id}
        onOk={() => onDelete()}
        onCancel={() => setId('')}
        okText="Delete"
        cancelText="Cancel"
      >
        <p>Are you sure want to delete the treatment?</p>
      </Modal>
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
