import React, { useEffect } from 'react';
import AdminAccountSettingsContent from '@/Component/admin/RightNavContent/settings/AdminAccountSettingsContent';
import { dispatch } from '@/redux/store';
import { setHeader } from '@/redux/slices/setHeaderTitle';

const AccountSettings = () => {

    useEffect(() => {
        dispatch(setHeader('Setting'))
    }, [])

    return (
        <AdminAccountSettingsContent />
    );
};
export default AccountSettings;