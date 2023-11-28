import React, { useEffect } from 'react';
import { dispatch } from '@/redux/store';
import { setHeader } from '@/redux/slices/setHeaderTitle';
import SchoolBillingHistory from '@/Component/school/RightNavContent/subscriptions/SchoolBillingHistory';

const BillingHistory = () => {

    useEffect(() => {
        dispatch(setHeader("Payments"))
    }, [])

    return (
        <SchoolBillingHistory />
    );
};
export default BillingHistory;