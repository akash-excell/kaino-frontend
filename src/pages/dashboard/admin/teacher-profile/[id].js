import React, { useEffect } from 'react';
import TeacherProfileContent from '@/Component/admin/RightNavContent/teachers/TeacherProfileContent';
import { useRouter } from 'next/router';
import { setHeader } from '@/redux/slices/setHeaderTitle';
import { dispatch } from '@/redux/store';

const TeacherProfile = () => {
    const router = useRouter()
    const { id } = router.query

    useEffect(() => {
        dispatch(setHeader('Teacher Profile'))
    }, [])

    return (
        <TeacherProfileContent id={id} />
    );
};
export default TeacherProfile;