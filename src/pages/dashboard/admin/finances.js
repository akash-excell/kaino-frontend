import React, { useEffect } from 'react';
import AdminFinanceContent from '@/Component/admin/RightNavContent/finance/AdminFinanceContent';
import { dispatch } from '@/redux/store';
import { setHeader } from '@/redux/slices/setHeaderTitle';

const Finance = () => {

    useEffect(() => {
        dispatch(setHeader('Finances'))
    }, [])

    return (
        <AdminFinanceContent />
    );
};
export default Finance;