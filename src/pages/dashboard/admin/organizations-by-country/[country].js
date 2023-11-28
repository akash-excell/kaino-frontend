import { Layout } from 'antd';
import React, { useEffect } from 'react';
import AdminLeftNav from '@/Component/Generic/LeftNavbar/AdminLeftNav';
import AdminHeader from '@/Component/Generic/Header/AdminHeader';
import RightContentWrapper from '@/Component/Generic/RightBarContent/RightContentWrapper';
import { useRouter } from 'next/router';
import AdminOrgnizationByCountryContent from '@/Component/admin/RightNavContent/orgnizations/AdminOrgnizationByCountryContent';
import { setHeader } from '@/redux/slices/setHeaderTitle';
import { dispatch } from '@/redux/store';

const OrgnizationsByCountry = () => {
    const router = useRouter()
    const { country } = router.query

    useEffect(() => {
        dispatch(setHeader('Total Orgnizations'))
    }, [])

    return (
        <AdminOrgnizationByCountryContent country={country} />
    );
};
export default OrgnizationsByCountry;