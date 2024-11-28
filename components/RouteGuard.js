import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAtom } from 'jotai';
import { favouritesAtom, searchHistoryAtom } from '@/store';
import { getFavourites, getHistory } from '@/lib/userData';



const PUBLIC_PATHS = ['/register', '/login'];

export default function RouteGuard({ children }) {
    const router = useRouter();
    const [favourites, setFavourites] = useAtom(favouritesAtom);
    const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token);  // Update login state

        if (!token && !PUBLIC_PATHS.includes(router.pathname)) {
            router.push('/login');
            return;
        }

        const updateAtoms = async () => {
            try {
                const favs = await getFavourites();
                const history = await getHistory();
                setFavourites(favs);
                setSearchHistory(history);
            } catch (error) {
                console.error("Error fetching favourites or history:", error);
                setError("Failed to load your data. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        updateAtoms();
    }, [router.pathname, setFavourites, setSearchHistory]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return <>{children}</>;
}
