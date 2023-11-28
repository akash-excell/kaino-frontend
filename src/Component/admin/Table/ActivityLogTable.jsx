import { Table } from 'antd';
import moment from 'moment';

const columns = [
    {
        title: 'Browser',
        dataIndex: 'browser',
        key: 'browser',
    },
    {
        title: 'IP Address',
        dataIndex: 'ip_address',
        key: 'ip_address',
    },

    {
        title: 'Date/Time',
        render: (item) => (
            <p>{moment(item?.date).format('MMMM Do YYYY, h:mm:ss a')}</p>
        )
    },
    {
        title: 'Action',
        dataIndex: 'action'
    },
];

const ActivityLogTable = ({ data }) => <div style={{ marginTop: "1rem", }}>
    <Table columns={columns} dataSource={data} pagination={false} />
</div>;

export default ActivityLogTable;