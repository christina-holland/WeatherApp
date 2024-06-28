//Creating the event listener that is triggered by the user's submission of the zip code
document.getElementById('weatherForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const zipCode = document.getElementById('zipCode').value;
    const apiKey = '02fe1f6f63aad0f750dbc62423976802';

//Fetching the weather data from teh api using the zip code and apikey
    fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${zipCode},us&units=imperial&appid=${apiKey}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            const date = new Date(data.dt * 1000).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
            const city = data.name;
            const temperature = data.main.temp;
            const feelsLike = data.main.feels_like;
            const description = data.weather[0].description;
            const tempMin = data.main.temp_min;
            const tempMax = data.main.temp_max;
            const humidity = data.main.humidity;

//Updating weather data on the DOM
            document.getElementById('date').textContent = date;
            document.getElementById('city').textContent = city;
            document.getElementById('temperature').textContent = temperature;
            document.getElementById('feelsLike').textContent = feelsLike;
            document.getElementById('description').textContent = description;
            document.getElementById('tempRange').textContent = `${tempMin} - ${tempMax}`;
            document.getElementById('humidity').textContent = humidity;
            
//Making the weather data appear on the webpage or logging an error if there was a problem
            document.getElementById('weatherInfo').classList.remove('d-none');
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            alert('Error - please try again');
        });
});
