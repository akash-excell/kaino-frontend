import React, { useEffect } from 'react';
import { dispatch } from '@/redux/store';
import { setHeader } from '@/redux/slices/setHeaderTitle';
import SchoolAllClassesContent from '@/Component/school/RightNavContent/classes/SchoolAllClassesContent';

const AllClasses = () => {

    useEffect(() => {
        dispatch(setHeader("Classes"))
    }, [])

    return (
        <SchoolAllClassesContent />
    );
};

export default AllClasses;
