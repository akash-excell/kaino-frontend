import { Avatar, Spin, Table } from 'antd';
import { Button } from '@mui/material';
import styles from '@/styles/adminUserRoles.module.css'
import { rolesAccess } from '@/utils/constant';
import { dispatch } from '@/redux/store';
import { deleteUserRequest, deleteUserReset } from '@/redux/slices/admin/deleteUser';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getAllUsersRequest } from '@/redux/slices/admin/getAllUsers';
import { toast } from 'react-toastify';
import EditRoleModal from '../Modal/EditRoleModal';

const AdministratorsTable = ({ data }) => {
    const [delId, setDelId] = useState('')
    const deleteUserState = useSelector(state => state.deleteUser)
    const [isEditModal, setIsEditModal] = useState(false)
    const [editData, setEditData] = useState({})

    const handleDelete = ({ id }) => {
        setDelId(id)
        dispatch(deleteUserRequest(id))
    }

    useEffect(() => {
        if (deleteUserState.isSuccess) {
            toast.dismiss()
            toast.success('User disabled successfully')
            dispatch(deleteUserReset())
            setDelId('')
            dispatch(getAllUsersRequest())
        }
    }, [deleteUserState.isSuccess])

    const columns = [
        {
            title: 'Account',
            render: (item) => (
                <div style={{ display: "flex", gap: "10px", alignItems: 'center' }}>
                    <Avatar size={'large'} src={item?.profile_img} />
                    <p>{item?.first_name + " " + item?.last_name}</p>
                </div>
            ),
        },
        {
            title: 'Email Address',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Role',
            dataIndex: 'role',
            render: (id) => (
                <p>{
                    rolesAccess.find(item => item.id === id).name
                }</p>
            ),
        },
        {
            title: 'Access',
            dataIndex: 'role',
            render: (id) => (
                <p>{
                    rolesAccess.find(item => item.id === id).access
                }</p>
            ),
        },
        {
            title: 'Last Active',
            key: 'last_active',
            dataIndex: 'last_active',
        },
        {
            title: 'Activity',
            render: (item) => (
                <div style={{ display: 'flex', gap: "8px" }}>
                    <Button onClick={() => handleDelete(item)} className={styles.btn} variant='contained' size='medium'>
                        {deleteUserState.isLoading && delId === item.id ? <Spin /> : 'Remove'}
                    </Button>
                    <Button onClick={() => {
                        setIsEditModal(true)
                        setEditData(item)
                    }} variant='contained' size='medium'>
                        Edit
                    </Button>
                </div>
            ),
        },
    ];

    return (
        <>
            <div className={styles.tableContainer}>
                <Table columns={columns} dataSource={data} pagination={false} />
            </div>
            {
                isEditModal && <EditRoleModal setIsModal={setIsEditModal} isModal={isEditModal} editData={editData} />
            }
        </>
    )
};

export default AdministratorsTable;