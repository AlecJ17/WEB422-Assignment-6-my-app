import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { readToken } from '@/lib/authenticate';

const PUBLIC_PATHS = ['/login', '/', '/_error', '/register'];

export default function RouteGuard(props) {
    const router = useRouter();
    const [authorized, setAuthorized] = useState(false);

    useEffect(() => {
        authCheck(router.pathname);

        const handleRouteChange = (url) => {
            authCheck(url);
        };

        router.events.on('routeChangeComplete', handleRouteChange);

        return () => {
            router.events.off('routeChangeComplete', handleRouteChange);
        };
    }, [router]);

    function authCheck(url) {
        const path = url.split('?')[0];

        if (PUBLIC_PATHS.includes(path)) {
            setAuthorized(true);
            return;
        }

        const token = readToken();
        if (token) {
            setAuthorized(true);
        } else {
            setAuthorized(false);
            router.push('/login');
        }
    }

    return (
        <>
            {authorized ? props.children : null}
        </>
    );
}
