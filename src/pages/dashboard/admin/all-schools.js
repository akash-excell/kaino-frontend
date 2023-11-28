import React, { useEffect } from 'react';
import AdminAllSchoolsContent from '@/Component/admin/RightNavContent/schools/AdminAllSchoolsContent';
import { dispatch } from '@/redux/store';
import { setHeader } from '@/redux/slices/setHeaderTitle';

const AllSchools = () => {

    useEffect(() => {
        dispatch(setHeader('Total Schools'))
    }, [])

    return (
        <AdminAllSchoolsContent />
    );
};
export default AllSchools;