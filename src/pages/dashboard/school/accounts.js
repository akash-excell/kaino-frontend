import React, { useEffect } from 'react';
import { dispatch } from '@/redux/store';
import { setHeader } from '@/redux/slices/setHeaderTitle';
import SchoolAccountContent from '@/Component/school/RightNavContent/accounts/SchoolAccountContent';

const Accounts = () => {

    useEffect(() => {
        dispatch(setHeader("Account"))
    }, [])

    return (
        <SchoolAccountContent />
    );
};
export default Accounts;