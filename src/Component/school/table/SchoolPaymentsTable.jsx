import { Button } from '@mui/material';
import { Table } from 'antd';
import { useRouter } from 'next/router';

const SchoolPaymentsTable = ({ data }) => {
    const router = useRouter()
    const columns = [
        {
            title: 'ID',
            dataIndex: 'invoice_id'
        },
        {
            title: 'Subscription',
            dataIndex: 'plan_name',
        },
        {
            title: 'Subscribed On',
            dataIndex: 'created_at',
        },
        {
            title: 'Due Date',
            dataIndex: 'end_date'
        },
        {
            title: 'Amount (UGX)',
            dataIndex: 'amount',
        },
        {
            title: 'Balance (UGX)',
            dataIndex: 'balance',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            render: (item) => (
                <button className='paid_btn' style={{ color: item === 'OverDue' ? '#5A9CFE' : item === 'Unpaid' ? '#FD9945' : '', background: item === 'Unpaid' ? '#FFECDC' : '' }}>{item}</button>
            ),
        },
        {
            title: 'Details',
            render: (item) => (
                <Button variant='outlined' size='medium' onClick={() => router.push(`/dashboard/school/invoiceView?id=${item.invoice_id}`)}>Details</Button>
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

export default SchoolPaymentsTable;
