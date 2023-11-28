import jwtDecode from 'jwt-decode';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const PrivateRoutes = ({ children }) => {
    const router = useRouter();
    const noAuthRoute = ['/', '/requestAccess', '/resetPassword']

    useEffect(() => {
        const token = localStorage.getItem('token');
        const isProtectedRoutes = noAuthRoute.includes(router.pathname);

        if (isProtectedRoutes && token) {
            const role = jwtDecode(token)?.role
            if (role === 1)
                router.push('/dashboard/admin');
            else
                router.push('/dashboard/school');
        } else if (!isProtectedRoutes && !token) {
            router.push('/');
        }
    }, [router.pathname]);

    return [children];
}

export default PrivateRoutes;
