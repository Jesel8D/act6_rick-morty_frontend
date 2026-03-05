import React from 'react';

export const CharacterCardSkeleton: React.FC = () => {
    return (
        <div suppressHydrationWarning className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
            <div suppressHydrationWarning className="w-full h-64 bg-gray-300"></div>
            <div suppressHydrationWarning className="p-4">
                <div suppressHydrationWarning className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
                <div suppressHydrationWarning className="h-4 bg-gray-300 rounded w-1/2 mb-4"></div>
                <div suppressHydrationWarning className="space-y-2">
                    <div suppressHydrationWarning className="h-4 bg-gray-300 rounded w-full"></div>
                    <div suppressHydrationWarning className="h-4 bg-gray-300 rounded w-5/6"></div>
                    <div suppressHydrationWarning className="h-4 bg-gray-300 rounded w-4/6"></div>
                </div>
            </div>
        </div>
    );
};
