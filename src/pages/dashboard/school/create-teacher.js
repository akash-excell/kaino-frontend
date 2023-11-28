import React, { useEffect } from 'react';
import SchoolCreateTeacherContent from '@/Component/school/RightNavContent/teachers/SchoolCreateTeacherContent';
import { dispatch } from '@/redux/store';
import { setHeader } from '@/redux/slices/setHeaderTitle';

const CreateTeacher = () => {

    useEffect(() => {
        dispatch(setHeader("Create Teacher"))
    }, [])

    return (
        <SchoolCreateTeacherContent />
    );
};
export default CreateTeacher;