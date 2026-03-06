import { useState, useCallback } from 'react';

type SaveState = 'idle' | 'saving' | 'saved' | 'error';

interface UseFavoriteResult {
    state: SaveState;
    errorMsg: string | null;
    saveFavorite: (apiId: number, name: string) => Promise<void>;
}

export const useFavorite = (): UseFavoriteResult => {
    const [state, setState] = useState<SaveState>('idle');
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    const saveFavorite = useCallback(async (apiId: number, name: string) => {
        const bffUrl = process.env.NEXT_PUBLIC_BFF_URL || 'http://localhost:3001';
        setState('saving');
        setErrorMsg(null);

        try {
            const response = await fetch(`${bffUrl}/favorites`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ apiId, name }),
            });

            if (response.status === 409) {
                throw new Error('¡Este personaje ya está en favoritos!');
            }
            if (!response.ok) {
                throw new Error(`Error al guardar. Código: ${response.status}`);
            }

            setState('saved');
            // Reset to idle after 3 seconds
            setTimeout(() => setState('idle'), 3000);
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : 'Error desconocido al guardar favorito';
            setErrorMsg(message);
            setState('error');
            // Reset to idle after 4 seconds
            setTimeout(() => setState('idle'), 4000);
        }
    }, []);

    return { state, errorMsg, saveFavorite };
};
