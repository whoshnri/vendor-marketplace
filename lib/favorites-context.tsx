'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

export interface FavoriteItem {
    id: string
    name: string
    vendor: string
    price: number
    image: string
    category: string
    rating?: number
    reviews?: number
}

interface FavoritesContextType {
    favorites: FavoriteItem[]
    toggleFavorite: (item: FavoriteItem) => void
    isFavorite: (id: string) => boolean
    removeFavorite: (id: string) => void
    favoriteCount: number
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined)

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
    const [favorites, setFavorites] = useState<FavoriteItem[]>([])
    const [mounted, setMounted] = useState(false)

    // Load from localStorage on mount
    useEffect(() => {
        const savedFavorites = localStorage.getItem('freshmarket-favorites')
        if (savedFavorites) {
            try {
                setFavorites(JSON.parse(savedFavorites))
            } catch (error) {
                console.error('Failed to load favorites:', error)
            }
        }
        setMounted(true)
    }, [])

    // Save to localStorage whenever favorites change
    useEffect(() => {
        if (mounted) {
            localStorage.setItem('freshmarket-favorites', JSON.stringify(favorites))
        }
    }, [favorites, mounted])

    const toggleFavorite = (item: FavoriteItem) => {
        setFavorites((prev) => {
            const exists = prev.find((f) => f.id === item.id)
            if (exists) {
                return prev.filter((f) => f.id !== item.id)
            }
            return [...prev, item]
        })
    }

    const isFavorite = (id: string) => {
        return favorites.some((f) => f.id === id)
    }

    const removeFavorite = (id: string) => {
        setFavorites((prev) => prev.filter((f) => f.id !== id))
    }

    const favoriteCount = favorites.length

    return (
        <FavoritesContext.Provider
            value={{
                favorites,
                toggleFavorite,
                isFavorite,
                removeFavorite,
                favoriteCount,
            }}
        >
            {children}
        </FavoritesContext.Provider>
    )
}

export function useFavorites() {
    const context = useContext(FavoritesContext)
    if (context === undefined) {
        throw new Error('useFavorites must be used within a FavoritesProvider')
    }
    return context
}
