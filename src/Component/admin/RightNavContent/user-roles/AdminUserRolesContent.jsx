import { Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import styles from '@/styles/adminUserRoles.module.css'
import { Avatar, Tabs } from 'antd'
import { AiOutlineUser } from 'react-icons/ai'
import AdministratorsTable from '../../Table/AdministratorsTable'
import AddAdminModal from '../../Modal/AddAdminModal'
import { dispatch } from '@/redux/store'
import { getAllUsersRequest, getAllUsersReset } from '@/redux/slices/admin/getAllUsers'
import { useSelector } from 'react-redux'

function AdminUserRolesContent() {
    const getAllUsersState = useSelector(state => state.getAllUsers)

    const [data, setData] = useState([])
    const [response, setResponse] = useState()
    const [isModal, setIsModal] = useState(false)

    useEffect(() => {
        dispatch(getAllUsersRequest())
    }, [])

    useEffect(() => {
        if (getAllUsersState.isSuccess) {
            setResponse(getAllUsersState.data?.data)
            setData(getAllUsersState.data?.data?.results?.data)
            dispatch(getAllUsersReset())
        }
    }, [getAllUsersState.isSuccess])

    return (
        <div>
            {
                isModal && <AddAdminModal setIsModal={setIsModal} isModal={isModal} />
            }
            <div className={styles.role_btn}>
                <p className={styles.adminText}>Administrators</p>
                <Button variant='contained' size='large' onClick={() => setIsModal(true)}>Create User</Button>
            </div>
            <div className={styles.accounts_div}>
                <p className={styles.adminText} style={{ opacity: 0.9 }}>Administrator roles available</p>
                <p className={styles.cardDes}>A role provides access to predefined menus and features so that depending on the assigned role (Super Admin,
                    Content Creator, Findance and Head of Curriculum) an administrator can have access to what he needs. Learn more</p>
                <div className={styles.cardContainer}>

                    <div className={styles.card} style={{ background: '#4EAF96' }}>
                        <div style={{ display: "flex", justifyContent: 'space-between', flexWrap: 'wrap', gap: '5px' }}>
                            <p>{response?.results?.admin || 0} ACCOUNTS</p>
                            <div>
                                {
                                    data?.filter(item => item.role === 1).map((item, key) =>
                                        <Avatar
                                            key={key}
                                            size="small"
                                            src={item?.profile_img}
                                        />)
                                }
                            </div>
                        </div>
                        <p style={{ marginTop: "1rem", fontWeight: '700', fontSize: '1rem' }}>Super Admin</p>
                        <p style={{ marginTop: "1rem" }}>Learn more</p>
                    </div>

                    <div className={styles.card} style={{ background: '#3A93D6' }}>
                        <div style={{ display: "flex", justifyContent: 'space-between', flexWrap: 'wrap', gap: '5px' }}>
                            <p>{response?.results?.head_of_curicullum || 0} ACCOUNTS</p>
                            <div>
                                {
                                    data?.filter(item => item.role === 5).map((item, key) =>
                                        <Avatar
                                            key={key}
                                            size="small"
                                            src={item?.profile_img}
                                        />)
                                }
                            </div>
                        </div>
                        <p style={{ marginTop: "1rem", fontWeight: '700', fontSize: '1rem' }}>Head of Curicullum</p>
                        <p style={{ marginTop: "1rem" }}>Learn more</p>
                    </div>

                    <div className={styles.card} style={{ background: '#9E4EE0' }}>
                        <div style={{ display: "flex", justifyContent: 'space-between', flexWrap: 'wrap', gap: '5px' }}>
                            <p>{response?.results?.content_creater || 0} ACCOUNTS</p>
                            <dir>
                                {
                                    data?.filter(item => item.role === 6).map((item, key) =>
                                        <Avatar
                                            key={key}
                                            size="small"
                                            src={item?.profile_img}
                                        />)
                                }
                            </dir>
                        </div>
                        <p style={{ marginTop: "1rem", fontWeight: '700', fontSize: '1rem' }}>Content Creator</p>
                        <p style={{ marginTop: "1rem" }}>Learn more</p>
                    </div>
                    <div className={styles.card} style={{ background: '#EA8858' }}>
                        <div style={{ display: "flex", justifyContent: 'space-between', flexWrap: 'wrap', gap: '5px' }}>
                            <p>{response?.results?.finance || 0} ACCOUNT</p>
                            <div>
                                {
                                    data?.filter(item => item.role === 7).map((item, key) =>
                                        <Avatar
                                            key={key}
                                            size="small"
                                            src={item?.profile_img}
                                        />)
                                }
                            </div>
                        </div>
                        <p style={{ marginTop: "1rem", fontWeight: '700', fontSize: '1rem' }}>Finance</p>
                        <p style={{ marginTop: "1rem" }}>Learn more</p>
                    </div>
                </div>
            </div>
            <div style={{ marginTop: '2rem', paddingLeft: "1rem" }}>
                <p className={styles.adminText}>Administrator accounts</p>
                <p className={styles.associateText}>Find all of your company's administrator accounts and their associated roles.</p>
                <Tabs
                    defaultActiveKey="1"
                    style={{ marginTop: "2rem" }}
                    items={[
                        {
                            label: `All (${response?.count || 0})`,
                            key: '1',
                            children: <AdministratorsTable data={data} />,
                        },
                        {
                            label: `Super Admin (${response?.results?.admin || 0})`,
                            key: '2',
                            children: <AdministratorsTable data={data?.filter(item => item.role === 1)} />,
                        },
                        {
                            label: `Head of Curicullum (${response?.results?.head_of_curicullum || 0})`,
                            key: '3',
                            children: <AdministratorsTable data={data?.filter(item => item.role === 5)} />,
                        },
                        {
                            label: `Content Creator (${response?.results?.content_creater || 0})`,
                            key: '4',
                            children: <AdministratorsTable data={data?.filter(item => item.role === 6)} />,
                        },
                        {
                            label: `Finance(${response?.results?.finance || 0})`,
                            key: '5',
                            children: <AdministratorsTable data={data?.filter(item => item.role === 7)} />,
                        },
                    ]}
                />
            </div>
        </div>
    )
}

export default AdminUserRolesContent