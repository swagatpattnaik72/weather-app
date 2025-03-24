const apiKey = '934d3a5f74268d6c4fd2bec41c6c2608'; // Replace with your API key
let records = [];
let idCounter = 1;

function fetchWeather() {
  const location = document.getElementById('locationInput').value.trim();

  if (!location) {
    alert('Please enter a location!');
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error('Location not found');
      }
      return response.json();
    })
    .then(data => {
      document.getElementById('latitudeInput').value = data.coord.lat;
      document.getElementById('longitudeInput').value = data.coord.lon;
      document.getElementById('temperatureInput').value = data.main.temp;
      document.getElementById('descriptionInput').value = data.weather[0].description;

      // Optionally set today's date as default start/end date
      const today = new Date().toISOString().split('T')[0];
      document.getElementById('startDateInput').value = today;
      document.getElementById('endDateInput').value = today;

      alert('Weather data fetched and form updated!');
    })
    .catch(error => {
      console.error('Error:', error);
      alert(error.message);
    });
}

function addRecord() {
  const location = document.getElementById('locationInput').value.trim();
  const latitude = document.getElementById('latitudeInput').value.trim();
  const longitude = document.getElementById('longitudeInput').value.trim();
  const temperature = document.getElementById('temperatureInput').value.trim();
  const startDate = document.getElementById('startDateInput').value;
  const endDate = document.getElementById('endDateInput').value;
  const description = document.getElementById('descriptionInput').value.trim();

  if (!location || !latitude || !longitude || !temperature || !startDate || !endDate || !description) {
    alert('Please fill all fields!');
    return;
  }

  const record = {
    id: idCounter++,
    location,
    latitude,
    longitude,
    startDate,
    endDate,
    description,
    temperature
  };

  records.push(record);
  displayRecords();
  clearForm();
}

function displayRecords() {
  const tbody = document.getElementById('recordsTableBody');
  tbody.innerHTML = '';

  if (records.length === 0) {
    tbody.innerHTML = `<tr><td colspan="9">No records found.</td></tr>`;
    return;
  }

  records.forEach(record => {
    const row = document.createElement('tr');

    row.innerHTML = `
      <td>${record.id}</td>
      <td>${record.location}</td>
      <td>${record.latitude}</td>
      <td>${record.longitude}</td>
      <td>${record.startDate}</td>
      <td>${record.endDate}</td>
      <td>${record.description}</td>
      <td>${record.temperature}</td>
      <td><button onclick="deleteRecord(${record.id})">Delete</button></td>
    `;

    tbody.appendChild(row);
  });
}

function deleteRecord(id) {
  records = records.filter(record => record.id !== id);
  displayRecords();
}

function clearForm() {
  document.getElementById('locationInput').value = '';
  document.getElementById('latitudeInput').value = '';
  document.getElementById('longitudeInput').value = '';
  document.getElementById('temperatureInput').value = '';
  document.getElementById('startDateInput').value = '';
  document.getElementById('endDateInput').value = '';
  document.getElementById('descriptionInput').value = '';
}

function toggleDarkMode() {
  document.body.classList.toggle('dark-mode');
  const btn = document.getElementById('darkModeBtn');
  btn.textContent = document.body.classList.contains('dark-mode') ? 'Light Mode' : 'Dark Mode';
}
