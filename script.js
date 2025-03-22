        const searchbox = document.querySelector(".input input");
        const srchimg = document.querySelector(".searchicon");
        const weatherIcon = document.getElementById("weather-icon");
    
        checkweather("Ghaziabad");
    
        async function checkweather(city) {
            try {
                // Get coordinates first
                const geoResponse = await fetch(
                    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=45693aabb4cb0ce40d6fb2dec9bad7f8`
                );
                
                if (!geoResponse.ok) throw new Error('City not found');
                const geoData = await geoResponse.json();
                
                // Get UV Index
                const uvResponse = await fetch(
                    `https://api.openweathermap.org/data/2.5/uvi?lat=${geoData.coord.lat}&lon=${geoData.coord.lon}&appid=45693aabb4cb0ce40d6fb2dec9bad7f8`
                );
                
                const uvData = await uvResponse.json();
                
                // Get weather data
                const weatherResponse = await fetch(
                    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=45693aabb4cb0ce40d6fb2dec9bad7f8&units=metric`
                );
                
                const weatherData = await weatherResponse.json();
    
                // Update all data
                document.querySelector(".temp").innerHTML = `${Math.round(weatherData.main.temp)}°C`;
                document.querySelector(".city").innerHTML = weatherData.name;
                document.querySelector(".four").innerHTML = `${weatherData.main.humidity}%`;
                document.querySelector(".two").innerHTML = `${weatherData.wind.speed} km/h`;
                document.querySelector(".uvi-value").innerHTML = uvData.value;
    
                // Update weather icon based on condition
                const weatherCondition = weatherData.weather[0].main;
                weatherIcon.src = getWeatherIcon(weatherCondition);
                
                document.querySelector('.full').classList.add('animated');
                
            } catch (error) {
                alert('Error: ' + error.message);
            }
        }
    
        function getWeatherIcon(condition) {
            const iconMap = {
                'Clear': 'https://cdn-icons-png.flaticon.com/512/6974/6974833.png',
                'Clouds': 'https://cdn-icons-png.flaticon.com/512/414/414825.png',
                'Rain': 'https://cdn-icons-png.flaticon.com/512/3351/3351979.png',
                'Thunderstorm': 'https://cdn-icons-png.flaticon.com/512/5901/5901803.png',
                'Snow': 'https://cdn-icons-png.flaticon.com/512/6421/6421583.png',
                'Mist': 'https://cdn-icons-png.flaticon.com/512/1197/1197102.png',
                'Smoke': 'https://cdn-icons-png.flaticon.com/512/4380/4380458.png',
                'Haze': 'https://cdn-icons-png.flaticon.com/512/1197/1197102.png',
                'Dust': 'https://cdn-icons-png.flaticon.com/512/4380/4380458.png',
                'Fog': 'https://cdn-icons-png.flaticon.com/512/1197/1197102.png',
                'Sand': 'https://cdn-icons-png.flaticon.com/512/4380/4380458.png',
                'Ash': 'https://cdn-icons-png.flaticon.com/512/4380/4380458.png',
                'Squall': 'https://cdn-icons-png.flaticon.com/512/648/648784.png',
                'Tornado': 'https://cdn-icons-png.flaticon.com/512/648/648790.png',
                'Drizzle': 'https://cdn-icons-png.flaticon.com/512/3076/3076129.png'
            };
            return iconMap[condition] || 'https://cdn-icons-png.flaticon.com/512/252/252035.png';
        }
    
        srchimg.addEventListener("click", () => {
            const city = searchbox.value.trim();
            if (city) checkweather(city);
        });
    
        searchbox.addEventListener("keypress", (e) => {
            if (e.key === "Enter") {
                const city = searchbox.value.trim();
                if (city) checkweather(city);
            }
        });