
const apiKey = "d129cdbcd94d4e27a27161418262409";

const searchBtn = document.getElementById("search-btn");
const cityInput = document.getElementById("city-input");
const cityName = document.getElementById("city-name");
const temp = document.getElementById("temp");
const description = document.getElementById("description");

// Función que consulta el tiempo en internet
async function getWeather(city) {
  if (!city) return;

  try {
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&lang=es`;
    const response = await fetch(url);
    const data = await response.json();

    if (data.error) {
      cityName.textContent = "Ciudad no encontrada";
      temp.textContent = "--°C";
      description.textContent = "Revisa el nombre e inténtalo de nuevo";
      return;
    }

    cityName.textContent = `${data.location.name}, ${data.location.country}`;
    temp.textContent = `${Math.round(data.current.temp_c)}°C`;
    description.textContent = data.current.condition.text;
  } catch (error) {
    description.textContent = "Error al conectar con el servidor";
  }
}

// Escuchar el clic en el botón
searchBtn.addEventListener("click", () => {
  getWeather(cityInput.value);
});

// Permitir buscar pulsando la tecla 'Enter'
cityInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    getWeather(cityInput.value);
  }
});