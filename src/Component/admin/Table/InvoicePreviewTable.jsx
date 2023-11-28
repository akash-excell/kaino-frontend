import { Box, TextField, InputAdornment } from '@mui/material';
import { Table } from 'antd';
import { AiOutlineDelete, AiOutlinePlusCircle } from 'react-icons/ai';
import { BiCopy } from 'react-icons/bi';

const InvoicePreviewTable = ({ data }) => {

    const columns = [
        {
            title: 'Items',
            dataIndex: 'item_name'
        },
        {
            title: 'Category',
            dataIndex: 'plan'
        },

        {
            title: 'Rate/Item',
            dataIndex: 'price'
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity'
        },
        {
            title: 'Discount',
            dataIndex: 'discount'
        },
        {
            title: 'Amount',
            dataIndex: 'amount'
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

export default InvoicePreviewTable;
