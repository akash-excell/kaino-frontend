import React, { useEffect } from 'react';
import AdminUserRolesContent from '@/Component/admin/RightNavContent/user-roles/AdminUserRolesContent';
import { dispatch } from '@/redux/store';
import { setHeader } from '@/redux/slices/setHeaderTitle';

const UserRoles = () => {

    useEffect(() => {
        dispatch(setHeader("User Roles"))
    }, [])

    return (
        <AdminUserRolesContent />
    );
};
export default UserRoles;