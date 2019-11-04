window.addEventListener("load", () => {
    let long;
    let lat;

    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    let temperatureSection = document.querySelector('.temperature');
    const temperatureSpan = document.querySelector('.temperature span');




        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                console.log(position);
                long = position.coords.longitude;
                lat = position.coords.latitude;


              const proxy = "http://cors-anywhere.herokuapp.com/";
              const api = `${proxy}
              https://api.darksky.net/forecast/9cea347ceb5406e0dce3417a39c36b0d/${lat},${long}
              `;

              fetch(api)
                  .then(response => {
                      return response.json();

                  })
                  .then(data => {

                      const {temperature, summary, icon } = data.currently;
                      // set DOM element from API
                      temperatureDegree.textContext = temperature;
                      temperatureDescription.textContent = summary;
                      locationTimezone.textContent = data.timezone;
                      // forumula for celsius
                      let celsius = (temperature - 32) * (5 / 9);
                      //set Icon
                      setIcons(icon, document.querySelector(".icon"));

                      //change temperature to Celsius/Farenheit
                      temperatureSection.addEventListener('click', () => {
                          if(temperatureSpan.textContent === "F") {
                              temperatureSpan.textContent =="C";
                          }else {
                              temperatureSpan.textContent = "F";
                              temperatureDegree.textContent = temperature;
                         }
                      })
                  });

            });

        }
        function setIcons(icon, iconID) {
            const skycons = new skycons({ color: "white"});
            const currentIcon = icon.replace(/-/g, "_").toUpperCase();
            skycons.play();
            return skycons.set(iconID, Skycons[currentIcon]);
        }

});
