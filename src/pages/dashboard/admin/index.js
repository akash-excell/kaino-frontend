import React, { useEffect } from 'react';
import AdminDashboardContent from '@/Component/admin/RightNavContent/dashboard-home/AdminDashboardContent';
import { dispatch } from '@/redux/store';
import { setHeader } from '@/redux/slices/setHeaderTitle';

const AdminDashboard = () => {

    useEffect(() => {
        dispatch(setHeader("Dashboard"))
    }, [])

    return (
        <AdminDashboardContent />
    );
};
export default AdminDashboard;