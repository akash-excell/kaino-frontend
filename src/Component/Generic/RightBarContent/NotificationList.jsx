import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListSubheader from '@mui/material/ListSubheader';
import { Avatar } from 'antd';
import moment from 'moment/moment';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { dispatch } from '@/redux/store';
import { clearNotificationRequest, clearNotificationReset } from '@/redux/slices/clearNotification';
import { toast } from 'react-toastify';

export default function NotificationList({ data, isUnread, setIsUnread }) {
    const clearNotificationState = useSelector(state => state.clearNotification)
    useEffect(() => {
        if (clearNotificationState.isSuccess) {
            toast.dismiss()
            toast.success('Cleared')
            dispatch(clearNotificationReset())
            setIsUnread(false)
        }
    }, [clearNotificationState.isSuccess])

    return (
        <List
            sx={{
                width: '100%',
                maxWidth: 360,
                bgcolor: 'background.paper',
                position: 'absolute',
                overflow: 'auto',
                maxHeight: 360,
                '& ul': { padding: 0 },
                top: '3rem',
                right: '4rem',
                zIndex: '2',
                borderRadius: '10px',
                border: '1px solid #e4d2d2'
            }}
            subheader={<li />}
        >
            <li>
                <ul>
                    <ListSubheader sx={{ lineHeight: 0, padding: "2rem 1rem", paddingBottom: 1 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: '600' }}>
                            <p style={{ color: '#525252' }}>Notifications</p>
                            {
                                isUnread && <p style={{ color: '#62C8FB', cursor: 'pointer' }} onClick={() => {
                                    dispatch(clearNotificationRequest())
                                    toast.dismiss()
                                    toast.warn('Please wait..')
                                }}>Clear All</p>
                            }
                        </div>
                        <hr />
                    </ListSubheader>
                    {data.map((item, i) => (
                        <ListItem key={i}>
                            <div style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <Avatar size={'large'} src={null} />
                                <div>
                                    <p style={{ fontSize: '1rem', fontWeight: '500' }}>{item.sender} <span style={{ opacity: '.6', fontSize: '.8rem' }}>{item.message}</span></p>
                                    <p style={{ color: 'gray', fontSize: '.8rem', marginTop: '8px' }}>{moment(item.created_at).fromNow()}</p>
                                </div>
                            </div>
                        </ListItem>
                    ))}
                </ul>
                <ul>
                    <div style={{ textAlign: 'center' }}>
                        <p style={{ color: '#191919', fontWeight: '600', cursor: 'pointer' }} onClick={() => setIsUnread(isUnread ? false : true)}>View {isUnread ? 'All' : 'Unread'} Notifications</p>
                    </div>
                </ul>
            </li>
        </List>
    );
}
