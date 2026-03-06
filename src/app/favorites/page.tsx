'use client';

import React from 'react';
import Link from 'next/link';
import { useFavorites, type Favorite } from '../../hooks/useFavorites';

// ─── Skeleton Card ────────────────────────────────────────────────────────────
const FavoriteCardSkeleton: React.FC = () => (
    <div suppressHydrationWarning className="bg-gray-800 rounded-lg shadow-lg overflow-hidden animate-pulse flex flex-col">
        <div suppressHydrationWarning className="w-full h-52 bg-gray-700" />
        <div suppressHydrationWarning className="p-4 space-y-3">
            <div suppressHydrationWarning className="h-5 bg-gray-700 rounded w-3/4" />
            <div suppressHydrationWarning className="h-4 bg-gray-700 rounded w-1/2" />
            <div suppressHydrationWarning className="h-8 bg-gray-700 rounded w-full mt-2" />
        </div>
    </div>
);

// ─── Favorite Card ────────────────────────────────────────────────────────────
interface FavoriteCardProps {
    favorite: Favorite;
    onRemove: (id: number) => void;
}

const FavoriteCard: React.FC<FavoriteCardProps> = ({ favorite, onRemove }) => {
    const [removing, setRemoving] = React.useState(false);

    const handleRemove = async () => {
        setRemoving(true);
        await onRemove(favorite.id);
    };

    return (
        <div suppressHydrationWarning className="bg-gray-800 rounded-lg shadow-lg overflow-hidden flex flex-col hover:shadow-2xl transition-shadow duration-300">
            {/* Character image from Rick and Morty CDN by apiId */}
            <img
                src={`https://rickandmortyapi.com/api/character/avatar/${favorite.apiId}.jpeg`}
                alt={favorite.name}
                className="w-full h-52 object-cover"
            />
            <div suppressHydrationWarning className="p-4 flex-grow flex flex-col justify-between">
                <h2 className="text-lg font-bold text-white mb-1">{favorite.name}</h2>
                <p className="text-gray-400 text-sm mb-4">ID API: #{favorite.apiId}</p>
                <button
                    onClick={handleRemove}
                    disabled={removing}
                    className={`w-full py-2 px-4 rounded-lg text-sm font-semibold transition-colors duration-200 flex items-center justify-center gap-2 ${removing
                        ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                        : 'bg-red-600 hover:bg-red-700 text-white'
                        }`}
                >
                    {removing ? (
                        <>
                            <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                            </svg>
                            Eliminando...
                        </>
                    ) : '🗑️ Eliminar'}
                </button>
            </div>
        </div>
    );
};

// ─── Error State ──────────────────────────────────────────────────────────────
interface ErrorStateProps { message: string; onRetry: () => void; }
const ErrorState: React.FC<ErrorStateProps> = ({ message, onRetry }) => (
    <div suppressHydrationWarning className="flex flex-col items-center justify-center min-h-[50vh] gap-6">
        <div suppressHydrationWarning className="bg-red-900/40 border border-red-500 rounded-xl p-8 max-w-md text-center">
            <p className="text-4xl mb-4">💔</p>
            <h2 className="text-xl font-bold text-red-400 mb-2">Error al cargar favoritos</h2>
            <p className="text-gray-300 text-sm mb-6">{message}</p>
            <button
                onClick={onRetry}
                className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
            >
                🔄 Reintentar
            </button>
        </div>
    </div>
);

// ─── Empty State ──────────────────────────────────────────────────────────────
const EmptyState: React.FC = () => (
    <div suppressHydrationWarning className="flex flex-col items-center justify-center min-h-[50vh] gap-4 text-center">
        <p className="text-6xl">🌌</p>
        <h2 className="text-2xl font-bold text-white">Aún no tienes favoritos</h2>
        <p className="text-gray-400">Ve a la página principal y guarda algunos personajes.</p>
        <Link href="/" className="mt-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors">
            Explorar Personajes
        </Link>
    </div>
);

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function FavoritesPage() {
    const { favorites, loading, error, refetch, removeFavorite } = useFavorites();

    return (
        <main suppressHydrationWarning className="min-h-screen bg-gray-900 p-8">
            <div suppressHydrationWarning className="max-w-7xl mx-auto">
                {/* Header */}
                <div suppressHydrationWarning className="flex items-center justify-between mb-12">
                    <h1 className="text-4xl font-extrabold text-white">⭐ Mis Favoritos</h1>
                    <Link href="/" className="text-orange-400 hover:text-orange-300 text-sm font-medium transition-colors">
                        ← Volver al inicio
                    </Link>
                </div>

                {/* Loading State */}
                {loading && (
                    <div suppressHydrationWarning className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {Array.from({ length: 8 }).map((_, i) => (
                            <FavoriteCardSkeleton key={`sk-${i}`} />
                        ))}
                    </div>
                )}

                {/* Error State */}
                {!loading && error && <ErrorState message={error} onRetry={refetch} />}

                {/* Success + Empty State */}
                {!loading && !error && favorites.length === 0 && <EmptyState />}

                {/* Success State with data */}
                {!loading && !error && favorites.length > 0 && (
                    <div suppressHydrationWarning>
                        <p className="text-gray-400 text-sm mb-6">{favorites.length} personaje{favorites.length !== 1 ? 's' : ''} guardado{favorites.length !== 1 ? 's' : ''}</p>
                        <div suppressHydrationWarning className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {favorites.map((fav) => (
                                <FavoriteCard key={fav.id} favorite={fav} onRemove={removeFavorite} />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}
