import { useState, useEffect, useCallback } from 'react';

export interface Favorite {
    id: number;
    apiId: number;
    name: string;
}

interface UseFavoritesResult {
    favorites: Favorite[];
    loading: boolean;
    error: string | null;
    refetch: () => void;
    removeFavorite: (id: number) => Promise<void>;
}

export const useFavorites = (): UseFavoritesResult => {
    const [favorites, setFavorites] = useState<Favorite[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const bffUrl = process.env.NEXT_PUBLIC_BFF_URL || 'http://localhost:3001';

    const fetchFavorites = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`${bffUrl}/favorites`);
            if (!response.ok) {
                throw new Error(`Error al obtener favoritos. Código: ${response.status}`);
            }
            const data: Favorite[] = await response.json();
            setFavorites(data);
        } catch (err: unknown) {
            setError(
                err instanceof Error
                    ? err.message
                    : 'No se pudo conectar al BFF. Verifica que el servidor esté corriendo.',
            );
        } finally {
            setLoading(false);
        }
    }, [bffUrl]);

    useEffect(() => {
        fetchFavorites();
    }, [fetchFavorites]);

    const removeFavorite = useCallback(async (id: number) => {
        try {
            const response = await fetch(`${bffUrl}/favorites/${id}`, { method: 'DELETE' });
            if (!response.ok && response.status !== 204) {
                throw new Error('Error al eliminar el favorito');
            }
            // Optimistic UI update – remove from local state immediately
            setFavorites((prev) => prev.filter((f) => f.id !== id));
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : 'Error al eliminar';
            setError(message);
        }
    }, [bffUrl]);

    return { favorites, loading, error, refetch: fetchFavorites, removeFavorite };
};
