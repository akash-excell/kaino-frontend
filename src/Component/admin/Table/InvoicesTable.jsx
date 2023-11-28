import { Button } from '@mui/material';
import { Table } from 'antd';
import { useRouter } from 'next/router';

const InvoicesTable = ({ data }) => {
    const router = useRouter()
    const columns = [
        {
            title: 'ID',
            dataIndex: 'id'
        },
        {
            title: 'Invoice To',
            dataIndex: 'invoice_to',
        },
        {
            title: 'Subscription',
            dataIndex: 'category_name',
        },
        {
            title: 'Created On',
            dataIndex: 'created_date',
        },
        {
            title: 'Due Date',
            dataIndex: 'due_date'
        },
        {
            title: 'Amount (UGX)',
            dataIndex: 'amount',
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
                <Button variant='outlined' size='medium' onClick={() => router.push(`/dashboard/admin/${item.status === 'Draft' ? 'new-invoice' : 'invoiceView'}?id=${item.id}`)}>Details</Button>
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

export default InvoicesTable;
