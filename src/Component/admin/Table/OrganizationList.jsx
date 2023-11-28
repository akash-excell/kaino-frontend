import { Avatar, Table } from 'antd';
import { useRouter } from 'next/router';

const columns = [
    {
        title: 'ID',
        dataIndex: 'id',
        sorter: (a, b) => a.id - b.id,
        sortDirections: ['descend', 'ascend'],
    },
    {
        title: 'Name',
        render: (item) => (
            <p><Avatar src={item.logo} /> <span style={{ marginLeft: '8px' }}>{item.name}</span></p>
        ),
        sorter: (a, b) => a.name.localeCompare(b.name),
        sortDirections: ['descend', 'ascend'],
    },
    {
        title: 'Country',
        dataIndex: 'country',
        sorter: (a, b) => a.country.localeCompare(b.country),
        sortDirections: ['descend', 'ascend'],
    },
    {
        title: 'Schools',
        dataIndex: 'school',
        sorter: (a, b) => a.school - b.school,
        sortDirections: ['descend', 'ascend'],
    },
    {
        title: 'Email',
        dataIndex: 'email',
        sorter: (a, b) => a.email.localeCompare(b.email),
        sortDirections: ['descend', 'ascend'],
    },
];

const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: (record) => ({
        disabled: record.name === 'Disabled User',
        name: record.name,
    }),
};

const OrganizationList = ({ data }) => {
    const router = useRouter();
    return (
        <Table
            rowSelection={{
                type: 'checkbox',
                ...rowSelection,
            }}
            columns={columns}
            dataSource={data}
            pagination={false}
        />
    );
};

export default OrganizationList;
