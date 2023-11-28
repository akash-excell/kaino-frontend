import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import SchoolAllParents from '@/Component/school/RightNavContent/parents/SchoolAllParents';
import { dispatch } from '@/redux/store';
import { setHeader } from '@/redux/slices/setHeaderTitle';

const AllParents = () => {
    const router = useRouter()
    const { Class } = router.query

    useEffect(() => {
        dispatch(setHeader("Parents"))
    }, [])

    return (
        <SchoolAllParents Class={Class} />
    );
};
export default AllParents;