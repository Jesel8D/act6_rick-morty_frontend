'use client';

import React from 'react';
import { Character } from '../types/character';
import { useFavorite } from '../hooks/useFavorite';

interface CharacterCardProps {
    character: Character;
}

export const CharacterCard: React.FC<CharacterCardProps> = ({ character }) => {
    const { state, errorMsg, saveFavorite } = useFavorite();

    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case 'alive': return 'bg-green-500';
            case 'dead': return 'bg-red-500';
            default: return 'bg-gray-500';
        }
    };

    const handleSave = () => {
        saveFavorite(character.id, character.name);
    };

    const renderButton = () => {
        switch (state) {
            case 'saving':
                return (
                    <button
                        disabled
                        className="w-full flex items-center justify-center gap-2 mt-4 py-2 px-4 rounded-lg bg-orange-400 text-white cursor-not-allowed opacity-80"
                    >
                        {/* Spinner */}
                        <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                        </svg>
                        Guardando...
                    </button>
                );
            case 'saved':
                return (
                    <button
                        disabled
                        className="w-full flex items-center justify-center gap-2 mt-4 py-2 px-4 rounded-lg bg-green-500 text-white cursor-default"
                    >
                        ✅ ¡Guardado!
                    </button>
                );
            case 'error':
                return (
                    <div className="mt-4 space-y-2">
                        <p className="text-red-400 text-xs text-center">{errorMsg}</p>
                        <button
                            onClick={handleSave}
                            className="w-full py-2 px-4 rounded-lg bg-red-500 hover:bg-red-600 text-white text-sm transition-colors"
                        >
                            ⚠️ Reintentar
                        </button>
                    </div>
                );
            default:
                return (
                    <button
                        onClick={handleSave}
                        className="w-full mt-4 py-2 px-4 rounded-lg bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold transition-colors duration-200"
                    >
                        ⭐ Guardar Favorito
                    </button>
                );
        }
    };

    return (
        <div suppressHydrationWarning className="bg-gray-800 rounded-lg shadow-lg overflow-hidden flex flex-col hover:shadow-2xl transition-shadow duration-300">
            <img
                src={character.image}
                alt={character.name}
                className="w-full h-64 object-cover"
            />
            <div suppressHydrationWarning className="p-4 flex-grow flex flex-col justify-between">
                <div suppressHydrationWarning>
                    <h2 className="text-xl font-bold text-white mb-1 hover:text-orange-400 cursor-pointer">
                        {character.name}
                    </h2>
                    <div suppressHydrationWarning className="flex items-center text-sm font-medium text-white mb-4">
                        <span className={`w-2.5 h-2.5 rounded-full mr-2 ${getStatusColor(character.status)}`}></span>
                        {character.status} - {character.species}
                    </div>
                </div>

                <div suppressHydrationWarning className="space-y-4">
                    <div suppressHydrationWarning>
                        <span className="text-gray-400 text-sm block">Last known location:</span>
                        <a href={character.location.url} className="text-white hover:text-orange-400 text-sm">
                            {character.location.name}
                        </a>
                    </div>
                    <div suppressHydrationWarning>
                        <span className="text-gray-400 text-sm block">First seen in:</span>
                        <a href={character.origin.url} className="text-white hover:text-orange-400 text-sm">
                            {character.origin.name}
                        </a>
                    </div>
                </div>

                {renderButton()}
            </div>
        </div>
    );
};
