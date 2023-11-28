import { getRole } from '@/utils/constant';
import { Avatar, Table } from 'antd';
import { useRouter } from 'next/router';

const columns = [
    {
        title: 'Student ID',
        dataIndex: 'id_no',
        sorter: (a, b) => a.id_no.localeCompare(b.id_no),
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
        title: 'Class',
        dataIndex: '_class',
        sorter: (a, b) => a._class.localeCompare(b._class),
        sortDirections: ['descend', 'ascend'],
    },
    {
        title: 'DOB',
        dataIndex: 'user',
        sorter: (a, b) => a.user.dob - b.user.dob,
        render: (text) => (
            <p>{text.dob}</p>
        ),
        sortDirections: ['descend', 'ascend'],
    },
    {
        title: 'Parent',
        dataIndex: 'parent',
        sorter: (a, b) => a.parent.localeCompare(b.parent),
        sortDirections: ['descend', 'ascend'],
    },
    {
        title: 'Mobile Number',
        dataIndex: 'user',
        render: (text) => (
            <p>{text.mobile_no} </p>
        )
    },

    {
        title: 'Address',
        render: (text) => (
            <p>{text.address} {text.city} {text.country}</p>
        ),
        sorter: (a, b) => a.address.localeCompare(b.address),
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

const StudentsList = ({ data }) => {
    const router = useRouter();

    const onRow = (record) => {
        return {
            onClick: () => {
                router.push(`/dashboard/${getRole() === 'Admin' ? 'admin' : 'school'}/student-profile/${record.user.id}`);
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

export default StudentsList;
