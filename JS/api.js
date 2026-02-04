export async function fetchMovies() {
    const response = await fetch ('http://localhost:3000/movies');
    if(!response.ok) {
        throw new Error('Failed to fetch movies');
    }
    return await response.json();
    
}