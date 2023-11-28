import React, { useEffect } from 'react';
import { setHeader } from '@/redux/slices/setHeaderTitle';
import { dispatch } from '@/redux/store';
import EditSchoolContent from '@/Component/school/RightNavContent/school-profile/EditSchoolContent';

const SchoolEdit = () => {

    useEffect(() => {
        dispatch(setHeader("Edit Profile"))
    }, [])

    return (
        <EditSchoolContent />
    );
};
export default SchoolEdit;