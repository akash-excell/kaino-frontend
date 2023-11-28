import React, { useState, useEffect } from 'react'
import { getRole } from '@/utils/constant';
import jwtDecode from 'jwt-decode';
import AdminLeftNav from '@/Component/Generic/LeftNavbar/AdminLeftNav';
import AdminHeader from '@/Component/Generic/Header/AdminHeader';
import RightContentWrapper from '@/Component/Generic/RightBarContent/RightContentWrapper';
import { Layout } from 'antd';
import SchoolLeftNav from '@/Component/Generic/LeftNavbar/SchoolLeftNav';
import SchoolHeader from '@/Component/Generic/Header/SchoolHeader';

const AppLayout = ({ children }) => {

    const [role, setRole] = useState('')
    const token = typeof window !== 'undefined' && localStorage.getItem('token') || null

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
            const decoded = jwtDecode(token)
            setRole(getRole(decoded?.role))
        }
        else
            setRole('')
    }, [token])

    return (
        !role ? [children] :
            (
                <Layout style={{ overflow: "hidden", minHeight: '100vh' }}>
                    {
                        role === 'Admin' ?
                            <AdminLeftNav /> : <SchoolLeftNav />
                    }
                    <Layout className="site-layout" style={{ maxHeight: "100vh", overflow: 'scroll', overflowX: "hidden" }}>
                        {
                            role === 'Admin' ?
                                < AdminHeader /> : <SchoolHeader />

                        }
                        <RightContentWrapper padding='12px'>
                            {children}
                        </RightContentWrapper>
                    </Layout>
                </Layout>
            )
    )
}

export default AppLayout
