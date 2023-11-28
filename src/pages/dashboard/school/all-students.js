import React, { useEffect } from 'react';
import SchoolAllStudentsContent from '@/Component/school/RightNavContent/students/SchoolAllStudentsContent';
import { useRouter } from 'next/router';
import { dispatch } from '@/redux/store';
import { setHeader } from '@/redux/slices/setHeaderTitle';

const AllStudents = () => {
    const router = useRouter()
    const { Class, Gender } = router.query

    useEffect(() => {
        dispatch(setHeader("Students"))
    }, [])

    return (
        <SchoolAllStudentsContent Class={Class} Gender={Gender} />
    );
};
export default AllStudents;