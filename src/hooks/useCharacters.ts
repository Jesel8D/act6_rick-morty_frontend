import { useState, useEffect } from 'react';
import { CharactersResponse } from '../types/character';

interface UseCharactersResult {
    data: CharactersResponse | null;
    loading: boolean;
    error: string | null;
}

export const useCharacters = (): UseCharactersResult => {
    const [data, setData] = useState<CharactersResponse | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCharacters = async () => {
            try {
                setLoading(true);
                const bffUrl = process.env.NEXT_PUBLIC_BFF_URL || 'http://localhost:3000';

                // El frontend solo conoce la URL del BFF
                const response = await fetch(`${bffUrl}/characters`);

                if (!response.ok) {
                    throw new Error(`Failed to fetch characters. Status: ${response.status}`);
                }

                const jsonData: CharactersResponse = await response.json();
                setData(jsonData);
            } catch (err: any) {
                setError(err.message || 'An error occurred while fetching characters');
            } finally {
                setLoading(false);
            }
        };

        fetchCharacters();
    }, []);

    return { data, loading, error };
};
