const apiKey = '0d3d53b8b8fb2244becb927c5db988fe'; // Replace with your real API key

function getWeather() {
  const city = document.getElementById('cityInput').value.trim();
  const resultBox = document.getElementById('weatherResult');

  if (city === '') {
    resultBox.textContent = 'Please enter a city name.';
    return;
  }

  resultBox.textContent = 'Loading...';

  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error('City not found');
      }
      return response.json();
    })
    .then(data => {
      const weather = data.weather[0].description;
      const temp = data.main.temp;
      const cityName = data.name;

      resultBox.innerHTML = `
        <strong>${cityName}</strong><br/>
        ${weather}<br/>
        🌡️ ${temp}°C
      `;
    })
    .catch(error => {
      resultBox.textContent = 'Could not get weather data. Please check the city name.';
      console.error('Error:', error);
    });
}
