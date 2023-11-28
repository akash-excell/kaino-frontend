import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import AdminParentByCountryContent from '@/Component/admin/RightNavContent/parents/AdminParentByCountryContent';
import { dispatch } from '@/redux/store';
import { setHeader } from '@/redux/slices/setHeaderTitle';

const ParentsByCountry = () => {
    const router = useRouter()
    const { country } = router.query

    useEffect(() => {
        dispatch(setHeader('Total Parents'))
    }, [])

    return (
        <AdminParentByCountryContent country={country} />
    );
};
export default ParentsByCountry;