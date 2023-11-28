import React, { useEffect } from 'react';
import SchoolParentCard from '@/Component/school/RightNavContent/parents/SchoolParentCard';
import { setHeader } from '@/redux/slices/setHeaderTitle';
import { dispatch } from '@/redux/store';

const ParentCard = () => {

    useEffect(() => {
        dispatch(setHeader("Parents"))
    }, [])

    return (
        <SchoolParentCard />
    );
};
export default ParentCard;