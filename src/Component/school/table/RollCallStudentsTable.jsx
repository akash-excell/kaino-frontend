import { Avatar, Table } from 'antd';

const columns = [
    {
        title: 'Student ID',
        dataIndex: 'id',
        sorter: (a, b) => a.id - b.id,
        sortDirections: ['descend', 'ascend'],
    },
    {
        title: 'Name',
        render: (text) => (
            <p><Avatar size="medium" src={text.profile_img} style={{ marginRight: "8px" }} /> {text.name}</p>
        ),
        sorter: (a, b) => a.user.name.localeCompare(b.user.name),
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
        dataIndex: 'dob',
        sorter: (a, b) => a.user.dob - b.user.dob,
        sortDirections: ['descend', 'ascend'],
    },
    {
        title: 'Gender',
        dataIndex: 'gender',
        render: (text) => (
            <p> {text == 1 ? 'Male' : text == 2 ? 'Female' : ''}</p>
        ),
        sorter: (a, b) => a.gender.localeCompare(b.gender),
        sortDirections: ['descend', 'ascend'],
    },
    {
        title: 'Total Days Present',
        dataIndex: 'total_days_present',
    },

    {
        title: 'Total Days Absent',
        dataIndex: 'total_days_absent',
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

const RollCallStudentsTable = ({ data }) => {

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

export default RollCallStudentsTable;
