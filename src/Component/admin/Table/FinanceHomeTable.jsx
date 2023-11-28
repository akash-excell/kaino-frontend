import { Button } from '@mui/material';
import { Table } from 'antd';
import { useRouter } from 'next/router';

const FinanceHomeTable = ({ data }) => {
    const router = useRouter()

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id'
        },
        {
            title: 'Invoice from',
            dataIndex: 'school',
        },
        {
            title: 'Subscription',
            dataIndex: 'plan',
        },
        {
            title: 'Created On',
            dataIndex: 'start_date',
        },
        {
            title: 'Amount (UGX)',
            dataIndex: 'amount',
        },
        {
            title: 'Status',
            dataIndex: 'is_paid',
            render: (item) => (
                <button className='paid_btn'>{item === 1 ? 'Paid' : 'Unpaid'}</button>
            ),
        },
        {
            title: 'Details',
            render: (item) => (
                <Button variant='outlined' size='medium' onClick={() => router.push(`/dashboard/admin/invoiceView?id=${item.id}`)}>Details</Button>
            ),
        }
    ];

    return (
        <Table
            columns={columns}
            dataSource={data}
            pagination={false}
        />
    );
};

export default FinanceHomeTable;
