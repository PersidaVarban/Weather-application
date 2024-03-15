// Register a listener for the DOMContentLoaded event. This is triggered when the HTML is loaded and the DOM is constructed.
// We are doing this because the script is loaded in the head of the document, so the DOM is not yet constructed when the script is executed.
document.addEventListener("DOMContentLoaded", (_event) => {
  //alert("After DOM has loaded");
  // todo: Add code here that updates the HTML, registers event listeners, calls HTTP endpoints, etc.

  const apiKey = "f19da403d02a4cd1661c2c05b05866fa";
  const apiUrl =
    "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
  const forecastURL = "https://api.openweathermap.org/data/2.5/forecast?q=";
  const pexelsApi = "OkyaKpNuhjYgkpb3Ox3xwXPxPDnv4nWsaq0bYd8nKspfXdHFPpzDt3lo";
  const cityApi = "1fcf36edfb92487cb241ace32ac265e8";
  const searchBox = document.querySelector(".search input");
  const searchBtn = document.querySelector(".search button");
  const weatherIcon = document.querySelector(".weather-icon");

  //autocomplete
  function renderDatalist(data) {
    let datalist = document.createElement("datalist");
    datalist.id = "list";
    searchBox.setAttribute("list", datalist.id);
    let fragment = document.createDocumentFragment();
    for (let city of data) {
      let option = document.createElement("option");
      option.textContent = city.properties.formatted;
      fragment.append(option);
    }
    datalist.append(fragment);
    searchBox.after(datalist);
  }

  //autocomplete
  async function fetchCities(city) {
    try {
      const cityUrl = `https://api.geoapify.com/v1/geocode/autocomplete?text=${city}&apiKey=${cityApi}`;
      const response = await fetch(cityUrl);
      const data = await response.json();
      if (data.features && data.features.length > 0) {
        renderDatalist(data.features);
      } else {
        console.error("No result.");
      }
    } catch (error) {
      console.error("Error while searching for the city");
    }
  }

  //show background
  function applyBackground(imageUrl) {
    document.body.style.backgroundImage = `url(${imageUrl})`;
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center";
  }

  //for the current forecast
  async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    var data = await response.json();

    const pexelUrl = `https://api.pexels.com/v1/search?query=${city}&per_page=1`;
    const headers = { headers: { Authorization: `\ ${pexelsApi}` } };
    try {
      const response = await fetch(pexelUrl, headers);
      const data = await response.json();

      if (data.photos && data.photos.length > 0) {
        const imageUrl = data.photos[0].src.original;
        applyBackground(imageUrl);
      } else {
        console.error(`No image found for ${city}`);
      }
    } catch (error) {
      console.error(`Error fetching image for ${city}:`, error);
    }

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML =
      Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";
    document.querySelector(".weather-text").innerHTML = data.weather[0].main;

    if (data.weather[0].main == "Clouds") {
      weatherIcon.src = "photos/clouds.png";
    } else if (data.weather[0].main == "Clear") {
      weatherIcon.src = "photos/clear.png";
    } else if (data.weather[0].main == "Rain") {
      weatherIcon.src = "photos/rain.png";
    } else if (data.weather[0].main == "Dizzle") {
      weatherIcon.src = "photos/dizzle.png";
    } else if (data.weather[0].main == "Mist") {
      weatherIcon.src = "photos/mist.png";
    } else if (data.weather[0].main == "Fog") {
      weatherIcon.src = "photos/fog.png";
    } else if (data.weather[0].main == "Snow") {
      weatherIcon.src = "photos/snow.png";
    }
    document.querySelector(".weather").style.display = "block";
    document.querySelector(".days-forecast").style.display = "block";
  }

  //4-days forecast
  async function updateCard(city) {
    //day1
    const response = await fetch(forecastURL + city + `&appid=${apiKey}`);
    var data = await response.json();
    const weatherIcon1 = document.querySelector(".weather-icon1");
    document.querySelector(".day1").innerHTML = data.list[8].dt_txt;
    document.querySelector(".temp1").innerHTML =
      Math.round(data.list[8].main.temp - 273.15) + "°C";
    document.querySelector(".weather-text1").innerHTML =
      data.list[8].weather[0].main;
    document.querySelector(".humidity1").innerHTML =
      "Humidity: " + data.list[8].main.humidity + "%";
    document.querySelector(".wind1").innerHTML =
      "Wind Speed: " + data.list[8].wind.speed + "km/h";
    if (data.list[8].weather[0].main == "Clouds") {
      weatherIcon1.src = "photos/clouds.png";
    } else if (data.list[8].weather[0].main == "Clear") {
      weatherIcon1.src = "photos/clear.png";
    } else if (data.list[8].weather[0].main == "Rain") {
      weatherIcon1.src = "photos/rain.png";
    } else if (data.list[8].weather[0].main == "Dizzle") {
      weatherIcon1.src = "photos/dizzle.png";
    } else if (data.list[8].weather[0].main == "Mist") {
      weatherIcon1.src = "photos/mist.png";
    } else if (data.list[8].weather[0].main == "Fog") {
      weatherIcon1.src = "photos/fog.png";
    } else if (data.list[8].weather[0].main == "Snow") {
      weatherIcon1.src = "photos/snow.png";
    }

    //day2
    const weatherIcon2 = document.querySelector(".weather-icon2");
    document.querySelector(".day2").innerHTML = data.list[16].dt_txt;
    document.querySelector(".temp2").innerHTML =
      Math.round(data.list[16].main.temp - 273.15) + "°C";
    document.querySelector(".weather-text2").innerHTML =
      data.list[16].weather[0].main;
    document.querySelector(".humidity2").innerHTML =
      "Humidity: " + data.list[16].main.humidity + "%";
    document.querySelector(".wind2").innerHTML =
      "Wind Speed: " + data.list[16].wind.speed + "km/h";
    if (data.list[16].weather[0].main == "Clouds") {
      weatherIcon2.src = "photos/clouds.png";
    } else if (data.list[16].weather[0].main == "Clear") {
      weatherIcon2.src = "photos/clear.png";
    } else if (data.list[16].weather[0].main == "Rain") {
      weatherIcon2.src = "photos/rain.png";
    } else if (data.list[16].weather[0].main == "Dizzle") {
      weatherIcon2.src = "photos/dizzle.png";
    } else if (data.list[16].weather[0].main == "Mist") {
      weatherIcon2.src = "photos/mist.png";
    } else if (data.list[16].weather[0].main == "Fog") {
      weatherIcon2.src = "photos/fog.png";
    } else if (data.list[16].weather[0].main == "Snow") {
      weatherIcon2.src = "photos/snow.png";
    }

    //day3
    const weatherIcon3 = document.querySelector(".weather-icon3");
    document.querySelector(".day3").innerHTML = data.list[24].dt_txt;
    document.querySelector(".temp3").innerHTML =
      Math.round(data.list[24].main.temp - 272.15) + "°C";
    document.querySelector(".weather-text3").innerHTML =
      data.list[24].weather[0].main;
    document.querySelector(".humidity3").innerHTML =
      "Humidity: " + data.list[24].main.humidity + "%";
    document.querySelector(".wind3").innerHTML =
      "Wind Speed: " + data.list[24].wind.speed + "km/h";
    if (data.list[24].weather[0].main == "Clouds") {
      weatherIcon3.src = "photos/clouds.png";
    } else if (data.list[24].weather[0].main == "Clear") {
      weatherIcon3.src = "photos/clear.png";
    } else if (data.list[24].weather[0].main == "Rain") {
      weatherIcon3.src = "photos/rain.png";
    } else if (data.list[24].weather[0].main == "Dizzle") {
      weatherIcon3.src = "photos/dizzle.png";
    } else if (data.list[24].weather[0].main == "Mist") {
      weatherIcon3.src = "photos/mist.png";
    } else if (data.list[24].weather[0].main == "Fog") {
      weatherIcon3.src = "photos/fog.png";
    } else if (data.list[24].weather[0].main == "Snow") {
      weatherIcon3.src = "photos/snow.png";
    }

    //day4
    const weatherIcon4 = document.querySelector(".weather-icon4");
    document.querySelector(".day4").innerHTML = data.list[32].dt_txt;
    document.querySelector(".temp4").innerHTML =
      Math.round(data.list[32].main.temp - 273.15) + "°C";
    document.querySelector(".weather-text4").innerHTML =
      data.list[32].weather[0].main;
    document.querySelector(".humidity4").innerHTML =
      "Humidity: " + data.list[32].main.humidity + "%";
    document.querySelector(".wind4").innerHTML =
      "Wind Speed: " + data.list[32].wind.speed + "km/h";
    if (data.list[32].weather[0].main == "Clouds") {
      weatherIcon4.src = "photos/clouds.png";
    } else if (data.list[32].weather[0].main == "Clear") {
      weatherIcon4.src = "photos/clear.png";
    } else if (data.list[32].weather[0].main == "Rain") {
      weatherIcon4.src = "photos/rain.png";
    } else if (data.list[32].weather[0].main == "Dizzle") {
      weatherIcon4.src = "photos/dizzle.png";
    } else if (data.list[32].weather[0].main == "Mist") {
      weatherIcon4.src = "photos/mist.png";
    } else if (data.list[32].weather[0].main == "Fog") {
      weatherIcon4.src = "photos/fog.png";
    } else if (data.list[32].weather[0].main == "Snow") {
      weatherIcon4.src = "photos/snow.png";
    }
  }

  //show loader
  function showLoader() {
    document.getElementById("loader").style.display = "inline-block";
  }

  //to make the loader button disappear
  function hideLoader() {
    document.getElementById("loader").style.display = "none";
  }

  let favouriteCity = [];
  //fav list
  function addCity(city) {
    if (!favouriteCity.includes(city)) {
      favouriteCity.push(city);
      showCity();
    } else {
      alert("The city is already added to the list.");
    }
  }

  //show the city from fav list
  function showCity() {
    document.querySelector(".favourite-list").style.display = "block";
    const listaElement = document.getElementById("fav-list");
    listaElement.innerHTML = "";
    const city = searchBox.value;
    favouriteCity.forEach((city) => {
      const listItem = document.createElement("li");
      listItem.textContent = city;
      listaElement.appendChild(listItem);
    });
  }

  //if the heart button is pressed, the city is added to the favorites
  document
    .querySelector(".heart-button")
    .addEventListener("click", function () {
      const city = searchBox.value;
      addCity(city);
    });

  //if you click on the items in the favorites list, the weather forecast for the selected city is shown
  document
    .getElementById("fav-list")
    .addEventListener("click", function (event) {
      const listItem = event.target.closest('li');
      if (listItem) {
        showLoader();
        setTimeout(() => {
          hideLoader();
          checkWeather(listItem.textContent);
          updateCard(listItem.textContent);
        }, 1000);
      }
    });

  //autocomplete for the city searched for in the search box
  searchBox.addEventListener("input", function () {
    const city = searchBox.value.trim().toLowerCase();
    if (city) {
      fetchCities(city);
    }
  });

  //when the search button is pressed, the weather forecast appears
  searchBtn.addEventListener("click", () => {
    showLoader();
    setTimeout(() => {
      hideLoader();
      checkWeather(searchBox.value);
      updateCard(searchBox.value);
    }, 1000);
  });
});
