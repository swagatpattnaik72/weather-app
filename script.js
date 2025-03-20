const apiKey = '934d3a5f74268d6c4fd2bec41c6c2608'; // Replace with your actual API key

// === WEATHER FUNCTIONS ===
function getWeather() {
  const location = document.getElementById('locationInput').value;
  if (!location) {
    alert("Please enter a location!");
    return;
  }

  fetchWeather(location);
  fetchForecast(location);
}

function getLocationWeather() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      fetchWeatherByCoords(lat, lon);
      fetchForecastByCoords(lat, lon);
    });
  } else {
    alert("Geolocation is not supported by your browser.");
  }
}

function fetchWeather(location) {
  showLoading();

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then(response => {
      hideLoading();
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => displayWeather(data))
    .catch(error => {
      hideLoading();
      console.error('Error fetching weather data:', error);
      document.getElementById('weatherResult').innerHTML = `<p>${error}</p>`;
    });
}

function fetchForecast(location) {
  showLoading();

  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then(response => {
      hideLoading();
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => displayForecast(data))
    .catch(error => {
      hideLoading();
      console.error('Error fetching forecast data:', error);
      document.getElementById('forecastResult').innerHTML = `<p>${error}</p>`;
    });
}

function fetchWeatherByCoords(lat, lon) {
  showLoading();

  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then(response => {
      hideLoading();
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => displayWeather(data))
    .catch(error => {
      hideLoading();
      console.error('Error fetching weather data:', error);
      document.getElementById('weatherResult').innerHTML = `<p>${error}</p>`;
    });
}

function fetchForecastByCoords(lat, lon) {
  showLoading();

  const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then(response => {
      hideLoading();
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => displayForecast(data))
    .catch(error => {
      hideLoading();
      console.error('Error fetching forecast data:', error);
      document.getElementById('forecastResult').innerHTML = `<p>${error}</p>`;
    });
}

// === DISPLAY FUNCTIONS ===
function displayWeather(data) {
  if (data.cod !== 200) {
    document.getElementById('weatherResult').innerHTML = `<p>Error: ${data.message}</p>`;
    return;
  }

  const weatherHTML = `
    <h2>Current Weather in ${data.name}, ${data.sys.country}</h2>
    <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="Weather Icon">
    <p>${data.weather[0].description}</p>
    <p>Temperature: ${data.main.temp} °C</p>
    <p>Humidity: ${data.main.humidity}%</p>
    <p>Wind Speed: ${data.wind.speed} m/s</p>
  `;

  document.getElementById('weatherResult').innerHTML = weatherHTML;
}

function displayForecast(data) {
  const forecastDiv = document.getElementById('forecastResult');
  forecastDiv.innerHTML = '';

  const dailyForecasts = data.list.filter(item => item.dt_txt.includes("12:00:00"));

  dailyForecasts.forEach(day => {
    const date = new Date(day.dt_txt).toDateString();
    const temp = day.main.temp;
    const desc = day.weather[0].description;
    const icon = day.weather[0].icon;

    const forecastHTML = `
      <div class="forecast-item">
        <h4>${date}</h4>
        <img src="http://openweathermap.org/img/wn/${icon}@2x.png" alt="Weather icon">
        <p>${desc}</p>
        <p>Temp: ${temp} °C</p>
      </div>
    `;

    forecastDiv.innerHTML += forecastHTML;
  });
}

// === INFO & TOGGLE FUNCTIONS ===
function showInfo() {
  alert("Product Manager Accelerator helps product professionals grow through coaching and community. Visit our LinkedIn page: https://www.linkedin.com/company/product-manager-accelerator/");
}

function toggleDarkMode() {
  const body = document.body;
  body.classList.toggle('dark-mode');

  const darkModeBtn = document.getElementById('darkModeBtn');
  darkModeBtn.textContent = body.classList.contains('dark-mode') ? 'Light Mode' : 'Dark Mode';
}

// === LOADING FUNCTIONS ===
function showLoading() {
  document.getElementById('loadingSpinner').classList.remove('hidden');
}

function hideLoading() {
  document.getElementById('loadingSpinner').classList.add('hidden');
}
