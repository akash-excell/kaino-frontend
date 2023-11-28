import React, { useEffect } from 'react';
import AdminSchoolByCountryContent from '@/Component/admin/RightNavContent/schools/AdminSchoolByCountryContent';
import { useRouter } from 'next/router';
import { dispatch } from '@/redux/store';
import { setHeader } from '@/redux/slices/setHeaderTitle';

const SchoolByCountry = () => {
    const router = useRouter()
    const { country } = router.query

    useEffect(() => {
        dispatch(setHeader('Total Schools'))
    }, [])

    return (
        <AdminSchoolByCountryContent country={country} />
    );
};
export default SchoolByCountry;