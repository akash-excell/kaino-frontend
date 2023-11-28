import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import AdminStudentByCountryContent from '@/Component/admin/RightNavContent/students/AdminStudentByCountryContent';
import { dispatch } from '@/redux/store';
import { setHeader } from '@/redux/slices/setHeaderTitle';

const StudentByCountry = () => {
    const router = useRouter()
    const { country } = router.query

    useEffect(() => {
        dispatch(setHeader('Total Students'))
    }, [])

    return (
        <AdminStudentByCountryContent country={country} />
    );
};
export default StudentByCountry;