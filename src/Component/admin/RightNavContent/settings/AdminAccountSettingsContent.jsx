import React, { useEffect, useState } from 'react'
import styles from '@/styles/adminSettingContent.module.css'
import { Switch } from 'antd'
import { Button } from '@mui/material'
import ActivityLogTable from '../../Table/ActivityLogTable'
import ChangePasswordModal from '../../Modal/ChangePasswordModal'
import { useSelector } from 'react-redux'
import { dispatch } from '@/redux/store'
import { getActivityLogRequest, getActivityLogReset } from '@/redux/slices/admin/getActivityLog'
import { Modify2F_LogsRequest, Modify2F_LogsReset } from '@/redux/slices/admin/Modify2F_Logs'
import { toast } from 'react-toastify';
import { get2fStatusRequest, get2fStatusReset } from '@/redux/slices/admin/get2fStatus'

function AdminAccountSettingsContent() {
    const getActivityLogState = useSelector(state => state.getActivityLog)
    const Modify2F_LogsState = useSelector(state => state.Modify2F_Logs)
    const get2fStatusState = useSelector(state => state.get2fStatus)

    const [status, setStatus] = useState({})
    const [response, setResponse] = useState({})
    const [data, setData] = useState([])
    const [isModal, setIsModal] = useState(false)

    useEffect(() => {
        dispatch(getActivityLogRequest())
        dispatch(get2fStatusRequest())
    }, [])

    useEffect(() => {
        if (getActivityLogState.isSuccess) {
            setResponse(getActivityLogState.data?.data)
            setData(getActivityLogState.data?.data?.results)
            dispatch(getActivityLogReset())
        }
    }, [getActivityLogState.isSuccess])

    useEffect(() => {
        if (get2fStatusState.isSuccess) {
            setStatus(get2fStatusState.data?.data)
            dispatch(get2fStatusReset())
        }
    }, [get2fStatusState.isSuccess])

    const handleModifyLogs = (checked) => {
        const payload = {
            is_activity_log: checked ? 1 : 0
        }
        dispatch(Modify2F_LogsRequest(payload))
        toast.warn('Please wait...')
    }

    const handleModify2F = (bool) => {
        const payload = {
            is_two_factor: bool ? 1 : 0
        }
        dispatch(Modify2F_LogsRequest(payload))
        toast.dismiss()
        toast.warn('Please wait...')
    }

    useEffect(() => {
        if (Modify2F_LogsState.isSuccess) {
            toast.dismiss()
            toast.success('Updated successfully')
            dispatch(Modify2F_LogsReset())
            dispatch(get2fStatusRequest())
        }
    }, [Modify2F_LogsState.isSuccess])

    return (
        <>
            {isModal && <ChangePasswordModal isModal={isModal} setIsModal={setIsModal} />}

            <div style={{ padding: "0 2rem" }}>
                <p style={{ fontSize: '1.3rem', fontWeight: '600' }}>Account Setting</p>
                <p style={{ fontSize: '1rem', marginTop: '1rem' }}>Security Setting</p>
                <hr />
                <div className={styles.cardContainer}>
                    <div className={styles.card}>
                        <div className={styles.activityContainer}>
                            <p className={styles.activityText}>Activity Logs</p>
                            <Switch checked={status?.is_activity_log} style={{ borderRadius: '4px' }} onChange={(checked) => handleModifyLogs(checked)} />
                        </div>
                        <p style={{ fontSize: "1rem" }}>You can save your all activity logs including unusual activity detected.</p>
                    </div>
                    <div className={styles.card}>
                        <div className={styles.activityContainer}>
                            <p className={styles.activityText}>Change Password</p>
                            <Button variant='contained' size='large' sx={{ background: "#25B5B5", color: "#fff", border: 'none', fontSize: "12x" }} onClick={() => setIsModal(true)}>Change Password</Button>
                        </div>
                        <p style={{ fontSize: "1rem" }}>Set a unique password to protect your account.</p>
                    </div>
                </div>
                <div className={styles.card} style={{ width: "100%", marginTop: '2rem' }}>
                    <div className={styles.activityContainer}>
                        <p className={styles.activityText}>2 Step Verification</p>
                        <Button onClick={() => handleModify2F(status?.is_two_factor ? false : true)} variant='contained' size='large'
                            sx={{ background: status?.is_two_factor ? '#00cc44' : "#FF2829", color: "#fff", border: 'none' }}
                        >
                            {status?.is_two_factor ? 'Enabled' : 'Disabled'}
                        </Button>
                    </div>
                    <p style={{ fontSize: "1rem" }}>Secure your account with 2 Step security. When it is activated you will need to enter not only your password, but also a special code using app. You can</p>
                </div>
                <p style={{ fontSize: '1.3rem', marginTop: '2rem' }}>Activity Log</p>

                <ActivityLogTable data={data} />
            </div>
        </>
    )
}

export default AdminAccountSettingsContent