import React, { useEffect } from 'react';
import AdminAllStudentsContent from '@/Component/admin/RightNavContent/students/AdminAllStudentsContent';
import { dispatch } from '@/redux/store';
import { setHeader } from '@/redux/slices/setHeaderTitle';

const AllStudents = () => {

    useEffect(() => {
        dispatch(setHeader('Total Students'))
    }, [])

    return (
        <AdminAllStudentsContent />
    );
};
export default AllStudents;