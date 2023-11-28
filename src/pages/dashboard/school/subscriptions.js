import React, { useEffect } from 'react';
import { dispatch } from '@/redux/store';
import { setHeader } from '@/redux/slices/setHeaderTitle';
import SchoolSubscriptions from '@/Component/school/RightNavContent/subscriptions/SchoolSubscriptions';

const Subscriptions = () => {

    useEffect(() => {
        dispatch(setHeader("Subscriptions"))
    }, [])

    return (
        <SchoolSubscriptions />
    );
};
export default Subscriptions;