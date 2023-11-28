import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import AdminTeacherByCountryContent from '@/Component/admin/RightNavContent/teachers/AdminTeacherByCountryContent';
import { dispatch } from '@/redux/store';
import { setHeader } from '@/redux/slices/setHeaderTitle';

const TeachersByCountry = () => {
    const router = useRouter()
    const { country } = router.query

    useEffect(() => {
        dispatch(setHeader('Total Teachers'))
    }, [])

    return (
        <AdminTeacherByCountryContent country={country} />
    );
};
export default TeachersByCountry;