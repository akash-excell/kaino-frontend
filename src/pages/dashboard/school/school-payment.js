import React, { useEffect } from 'react';
import { setHeader } from '@/redux/slices/setHeaderTitle';
import { dispatch } from '@/redux/store';
import SchoolPayment from '@/Component/school/RightNavContent/subscriptions/SchoolPayment';

const SchoolPayments = () => {

    useEffect(() => {
        dispatch(setHeader("Payments"))
    }, [])

    return (
        <SchoolPayment />
    );
};
export default SchoolPayments;