import React, { useEffect } from 'react';
import AdminSchoolByOrgContent from '@/Component/admin/RightNavContent/schools/AdminSchoolByOrgContent';
import { useRouter } from 'next/router';
import { dispatch } from '@/redux/store';
import { setHeader } from '@/redux/slices/setHeaderTitle';

const SchoolByOrg = () => {
    const router = useRouter()
    const { org } = router.query

    useEffect(() => {
        dispatch(setHeader('Schools'))
    }, [])

    return (
        <AdminSchoolByOrgContent org={org} />
    );
};
export default SchoolByOrg;