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
        title: 'Class',
        dataIndex: 'main_class',
        sorter: (a, b) => a.main_class.localeCompare(b.main_class),
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
        title: 'Mobile Number',
        dataIndex: 'user',
        render: (text) => (
            <p>{text.mobile_no} </p>
        ),
        sorter: (a, b) => a.user.mobile_no - b.user.mobile_no,
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

const TeacherList = ({ data }) => {
    const router = useRouter();

    const onRow = (record) => {
        return {
            onClick: () => {
                router.push(`/dashboard/${getRole() === 'Admin' ? 'admin' : 'school'}/teacher-profile/${record.user.id}`);
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

export default TeacherList;
