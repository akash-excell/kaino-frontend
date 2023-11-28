import { getRole } from '@/utils/constant';
import { Avatar, Table } from 'antd';
import { useRouter } from 'next/router';

const columns = [
    {
        title: 'ID',
        dataIndex: 'user',
        render: (text) => (
            <p>{text.id} </p>
        ),
        sorter: (a, b) => a.user.id - b.user.id,
        sortDirections: ['descend', 'ascend'],
    },
    {
        title: 'Name',
        dataIndex: 'user',
        render: (text) => (
            <p><Avatar size="medium" src={text.profile_img} style={{ marginRight: "8px" }} /> {text.first_name} {text.last_name}</p>
        ),
        sorter: (a, b) => a.user.first_name.localeCompare(b.user.first_name),
        sortDirections: ['descend', 'ascend'],
    },
    {
        title: 'Gender',
        dataIndex: 'user',
        render: (text) => (
            <p>{text.gender === 1 ? 'Male' : 'Female'} </p>
        ),
        sorter: (a, b) => a.user.gender - b.user.gender,
        sortDirections: ['descend', 'ascend'],
    },
    {
        title: 'Total Students',
        dataIndex: 'assigned_students',
        sorter: (a, b) => a.total_students - b.total_students,
        sortDirections: ['descend', 'ascend'],
    },
    {
        title: 'Total Schools',
        dataIndex: 'assigned_schools',
        sorter: (a, b) => a.total_schools - b.total_schools,
        sortDirections: ['descend', 'ascend'],
    },
    {
        title: 'Mobile Number',
        dataIndex: 'user',
        render: (text) => (
            <p>{text.mobile_no} </p>
        ),
        sorter: (a, b) => a.user.mobile_no.localeCompare(b.user.mobile_no),
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

const ParentsList = ({ data }) => {
    const router = useRouter();

    const onRow = (record) => {
        return {
            onClick: () => {
                router.push(`/dashboard/${getRole() === 'Admin' ? 'admin' : 'school'}/parent-profile/${record.user.id}`);
            },
        };
    };
    return (
        <Table
            rowSelection={{
                type: 'checkbox',
                ...rowSelection,
            }}
            columns={columns}
            onRow={onRow}
            dataSource={data}
            pagination={false}
        />
    );
};

export default ParentsList;
