'use client';

import React from 'react';
import Link from 'next/link';
import { useCharacters } from '../hooks/useCharacters';
import { CharacterCard } from '../components/CharacterCard';
import { CharacterCardSkeleton } from '../components/CharacterCardSkeleton';

export default function Home() {
  const { data, loading, error } = useCharacters();

  return (
    <main suppressHydrationWarning className="min-h-screen bg-gray-900 p-8">
      <div suppressHydrationWarning className="max-w-7xl mx-auto">
        {/* Nav Header */}
        <div suppressHydrationWarning className="flex items-center justify-between mb-12">
          <h1 className="text-4xl font-extrabold text-white">Rick and Morty</h1>
          <Link href="/favorites" className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold py-2 px-4 rounded-lg transition-colors">
            ⭐ Mis Favoritos
          </Link>
        </div>

        {error && (
          <div suppressHydrationWarning className="bg-red-500 text-white p-4 rounded-lg mb-8 text-center">
            {error}
          </div>
        )}

        <div suppressHydrationWarning className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {loading ? (
            // Show skeletons while loading
            Array.from({ length: 8 }).map((_, index) => (
              <CharacterCardSkeleton key={`skeleton-${index}`} />
            ))
          ) : (
            // Show characters once data is loaded
            data?.results.map((character) => (
              <CharacterCard key={character.id} character={character} />
            ))
          )}
        </div>
      </div>
    </main>
  );
}
