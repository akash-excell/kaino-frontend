import React, { useEffect } from 'react';
import { setHeader } from '@/redux/slices/setHeaderTitle';
import { dispatch } from '@/redux/store';
import SchoolRollCallContent from '@/Component/school/RightNavContent/roll-call/SchoolRollCallContent';

const RollCall = () => {

    useEffect(() => {
        dispatch(setHeader("Roll-Call"))
    }, [])

    return (
        <SchoolRollCallContent />
    );
};
export default RollCall;