import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { dispatch } from '@/redux/store';
import { setHeader } from '@/redux/slices/setHeaderTitle';
import SchoolInvoiceView from '@/Component/school/RightNavContent/subscriptions/SchoolInvoiceView';

const InvoiceViewSchool = () => {
    const router = useRouter()
    const { id } = router.query

    useEffect(() => {
        dispatch(setHeader('View Invoice'))
    }, [])

    return (
        <SchoolInvoiceView id={id} />
    );
};
export default InvoiceViewSchool;