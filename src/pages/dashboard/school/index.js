import React, { useEffect } from 'react';
import SchoolDashboardContent from '@/Component/school/RightNavContent/dashboard-home/SchoolDashboardContent';
import { dispatch } from '@/redux/store';
import { setHeader } from '@/redux/slices/setHeaderTitle';

const SchoolHome = () => {

    useEffect(() => {
        dispatch(setHeader("Dashboard"))
    }, [])

    return (
        <SchoolDashboardContent />
    );
};
export default SchoolHome;