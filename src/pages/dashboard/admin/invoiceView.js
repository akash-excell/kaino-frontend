import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import AdminInvoiceViewContent from '@/Component/admin/RightNavContent/finance/AdminInvoiceViewContent';
import { dispatch } from '@/redux/store';
import { setHeader } from '@/redux/slices/setHeaderTitle';

const InvoiceView = () => {
    const router = useRouter()
    const { id } = router.query

    useEffect(() => {
        dispatch(setHeader('View Invoice'))
    }, [])

    return (
        <AdminInvoiceViewContent id={id} />
    );
};
export default InvoiceView;