import React, { useEffect } from 'react';
import SchoolLessionFormContent from '@/Component/school/RightNavContent/lessons/SchoolLessionFormContent';
import { dispatch } from '@/redux/store';
import { setHeader } from '@/redux/slices/setHeaderTitle';

const AddLesson = () => {

    useEffect(() => {
        dispatch(setHeader('Add Lesson'))
    }, [])

    return (
        <SchoolLessionFormContent />
    );
};
export default AddLesson;