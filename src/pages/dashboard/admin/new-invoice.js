import React, { useEffect } from 'react';
import AdminNewInvoiceContent from '@/Component/admin/RightNavContent/finance/AdminNewInvoiceContent';
import { useRouter } from 'next/router';
import { dispatch } from '@/redux/store';
import { setHeader } from '@/redux/slices/setHeaderTitle';

const NewInvoice = () => {
    const router = useRouter()
    const { id } = router.query

    useEffect(() => {
        dispatch(setHeader("New Invoice"))
    }, [])

    return (
        <AdminNewInvoiceContent id={id} />
    );
};
export default NewInvoice;
