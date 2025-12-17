
import { useState, useEffect } from 'react';

export function useFetch(url, options) {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            try {
                const response = await fetch(url, options)
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`)
                }
                const result = await response.json()
                setData(result)
            } catch (err) {
                setError(err)
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [url]) // Removed options from dependency to avoid infinite loop if not memoized

    return { data, loading, error }
}