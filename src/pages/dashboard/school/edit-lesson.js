import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import SchoolEditLessonContent from '@/Component/school/RightNavContent/lessons/SchoolEditLessonContent';
import { setHeader } from '@/redux/slices/setHeaderTitle';
import { dispatch } from '@/redux/store';

const EditLesson = () => {
    const router = useRouter()
    const { id } = router.query

    useEffect(() => {
        dispatch(setHeader('Add Lesson'))
    }, [])

    return (
        <SchoolEditLessonContent id={id} />
    );
};
export default EditLesson;