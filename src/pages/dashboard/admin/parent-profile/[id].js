import React, { useEffect } from 'react';
import ParentProfileContent from '@/Component/admin/RightNavContent/parents/ParentProfileContent';
import { useRouter } from 'next/router';
import { dispatch } from '@/redux/store';
import { setHeader } from '@/redux/slices/setHeaderTitle';

const ParentProfile = () => {
    const router = useRouter()
    const { id } = router.query

    useEffect(() => {
        dispatch(setHeader('Parent Profile'))
    }, [])

    return (
        <ParentProfileContent id={id} />
    );
};
export default ParentProfile;