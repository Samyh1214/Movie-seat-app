import { fetchMovies } from './api.js';
import Movie from './movies.js';


const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');

const countElement = document.getElementById('count');
const totalElement = document.getElementById('total');

const movieSelect = document.getElementById('movie');

const serverStatusMessage = document.createElement('p');
document.body.insertBefore(serverStatusMessage, document.body.firstChild);

let ticketPrice = 0;

const fallbackMovies = [
    new Movie(1, 'Fast and Furious 6', 100),
    new Movie(2, 'The Mummy Returns', 50),
    new Movie(3, 'Jumanji: Welcome to the Jungle', 70),
    new Movie(4, 'Rampage', 40),
];

function populateMovieSelect(movies) {
    movieSelect.innerHTML = '';
    movies.forEach((movie) => {
        const option = document.createElement('option');
        option.value = movie.price;
        option.textContent = `${movie.name} (${movie.price} kr)`;
        movieSelect.append(option);
    });
}

async function populateMovies() {
    try{
        const moviesData = await fetchMovies();
        const movieObjects = moviesData.map(m => new Movie(m.id, m.name, m.price));
        populateMovieSelect(movieObjects);

        serverStatusMessage.textContent = 'Movies loaded from server.';
        serverStatusMessage.style.color = 'green';
           
    } catch(error) {
        console.error('Error fetching movies from JSON-server:', error);
        console.warn('Using fallback movies instead.');
        populateMovieSelect(fallbackMovies);

        serverStatusMessage.textContent = 'Failed to load movies from server. Using fallback data.';
        serverStatusMessage.style.color = 'red';
    }   
    setInitialTicketPrice();
    
}
function setInitialTicketPrice() {
    ticketPrice = parseInt(movieSelect.value, 10)
    updateSelectedCount();
}

function updateSelectedCount() {
    const selectedSeats = document.querySelectorAll('.row .seat.selected');
    const selectedSeatsCount = selectedSeats.length;

    countElement.innerText = selectedSeatsCount;
    totalElement.innerText = selectedSeatsCount * ticketPrice;
}

movieSelect.addEventListener('change', (event) => {
    ticketPrice = parseInt(event.target.value, 10);
    updateSelectedCount();
});

container.addEventListener('click', (event) => {
    const target = event.target;
    if (
        target.classList.contains('seat') &&
        !target.classList.contains('occupied')
    ) {
        target.classList.toggle('selected');
        updateSelectedCount();
    }
});

populateMovies();
