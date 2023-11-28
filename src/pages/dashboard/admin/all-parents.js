import React, { useEffect } from 'react';
import AdminAllParentsContent from '@/Component/admin/RightNavContent/parents/AdminAllParentsContent';
import { dispatch } from '@/redux/store';
import { setHeader } from '@/redux/slices/setHeaderTitle';

const AllParents = () => {

    useEffect(() => {
        dispatch(setHeader('Total Parents'))
    }, [])

    return (
        <AdminAllParentsContent />
    );
};
export default AllParents;