import React, { useEffect } from 'react';
import SchoolManageLessionsContent from '@/Component/school/RightNavContent/lessons/SchoolManageLessionsContent';
import { dispatch } from '@/redux/store';
import { setHeader } from '@/redux/slices/setHeaderTitle';

const ManageLessons = () => {

    useEffect(() => {
        dispatch(setHeader('Lessons'))
    }, [])

    return (
        <SchoolManageLessionsContent />
    );
};
export default ManageLessons;