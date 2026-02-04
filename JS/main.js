import { fetchMovies } from './api.js';
import {  } from '/movie.js';


const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');

const countElement = document.getElementById('count');
const totalElement = document.getElementById('total');

const movieSelect = document.getElementById('movie');

let ticketPrice = 0;

async function populateMovies() {
    try{
        const movies = await fetchMovies();
        movies.forEach((movie) => {
            const option = document.createElement('option');
            option.value = movie.price;
            option.textContent = `${movie.name} (${movie.price} kr)`;
            movieSelect.append(option);
        });
            
    } catch(error) {
        console.error('Error fetching movies:', error);
    }
    
}

function updateSelectedCount() {
    const selectedSeats = document.querySelectorAll('.row .seat.selected');

    const selectedSeatsCount = selectedSeats.length;

    countElement.innerText = selectedSeatsCount;
    totalElement.innerText = selectedSeatsCount * ticketPrice;
}

container.addEventListener('change', (event) => {
    ticketPrice =+ event.target.value;
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
