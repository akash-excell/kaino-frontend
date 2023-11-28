import React, { useEffect } from 'react';
import AdminAllTeachersContent from '@/Component/admin/RightNavContent/teachers/AdminAllTeachersContent';
import { dispatch } from '@/redux/store';
import { setHeader } from '@/redux/slices/setHeaderTitle';

const AllTeachers = () => {

    useEffect(() => {
        dispatch(setHeader('Total Teachers'))
    }, [])

    return (
        <AdminAllTeachersContent />
    );
};
export default AllTeachers;