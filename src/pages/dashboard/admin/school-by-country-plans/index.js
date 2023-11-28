import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import AdminPlansCountrySchoolContent from '@/Component/admin/RightNavContent/schools/AdminPlansCountrySchoolContent';
import { dispatch } from '@/redux/store';
import { setHeader } from '@/redux/slices/setHeaderTitle';

const SchoolByCountry = () => {
    const router = useRouter()
    const { country, plans } = router.query

    useEffect(() => {
        dispatch(setHeader('Total Schools'))
    }, [])

    return (
        <AdminPlansCountrySchoolContent country={country} plans={plans} />
    );
};
export default SchoolByCountry;