import React, { useEffect } from 'react';
import SchoolProfileContent from '@/Component/admin/RightNavContent/schools/SchoolProfileContent';
import { useRouter } from 'next/router';
import { dispatch } from '@/redux/store';
import { setHeader } from '@/redux/slices/setHeaderTitle';

const SchoolProfile = () => {
    const router = useRouter()
    const { id } = router.query

    useEffect(() => {
        dispatch(setHeader('School Profile'))
    }, [])

    return (
        <SchoolProfileContent id={id} />
    );
};
export default SchoolProfile;