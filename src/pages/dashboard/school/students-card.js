import React, { useEffect } from 'react';
import SchoolStudentCardContent from '@/Component/school/RightNavContent/students/SchoolStudentCardContent';
import { dispatch } from '@/redux/store';
import { setHeader } from '@/redux/slices/setHeaderTitle';

const StudentCard = () => {

    useEffect(() => {
        dispatch(setHeader("Students"))
    }, [])

    return (
        <SchoolStudentCardContent />
    );
};
export default StudentCard;