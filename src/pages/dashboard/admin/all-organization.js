import React, { useEffect } from 'react';
import { dispatch } from '@/redux/store';
import { setHeader } from '@/redux/slices/setHeaderTitle';
import AdminAllOrganizationsContent from '@/Component/admin/RightNavContent/orgnizations/AdminAllOrganizationsContent';

const AllOrgnizations = () => {

    useEffect(() => {
        dispatch(setHeader('Total Orgnizations'))
    }, [])

    return (
        <AdminAllOrganizationsContent />
    );
};
export default AllOrgnizations;