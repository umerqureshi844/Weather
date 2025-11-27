const mp4 = document.getElementById("video")
let date = new Date().getHours()
if (date >= 6 && date < 18) {
    video.src = "could video mp-4.mp4"
}

else {
    video.src = "night video.mp4"
}

const apiKey = "d38cec8b06b123ba9d60ab4b8301abfa";

async function getWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        let res = await fetch(url);
        let data = await res.json();

        if (data.cod === "404") {
            document.querySelectorAll(".City-Name").forEach(inputBox => {
                inputBox.value = "";                  // input clear
                inputBox.style.outline = "3px solid orange";

                inputBox.placeholder = "";            // placeholder hide 
                // Jab user focus kare => placeholder wapis aa jaye
                inputBox.addEventListener("focus", () => {
                    inputBox.placeholder = "City-Name";
                    inputBox.style.outline = "none";
                });
            });
            // Error message show (input ke bahar)
            document.querySelectorAll(".Error").forEach(msg => {
                msg.textContent = "Write your correct city";
                msg.style.color = "orange";
                // msg.style.fontSize = "17px";

                msg.onclick = () => {
                    msg.textContent = ""; // hide on click
                };
            });
            return;
        }

        document.querySelectorAll(".box h3")[0].innerHTML = `🌡 Temp: ${data.main.temp}°C`;
        document.querySelectorAll(".box p")[0].innerHTML = `Temperature measures how hot or cold a substance is; it quantifies average kinetic energy of its particles.`
        document.querySelectorAll(".box h1")[0].innerHTML = ``

        document.querySelectorAll(".box h3")[1].innerHTML = `💧 Humidity: ${data.main.humidity}%`;
        document.querySelectorAll(".box p")[1].innerHTML = `Humidity is the amount of water vapor in the air, affecting comfort, temperature perception, and weather conditions.`
        document.querySelectorAll(".box h1")[1].innerHTML = ``

        document.querySelectorAll(".box h3")[2].innerHTML = `🌬 Wind: ${data.wind.speed} km/h`;
        document.querySelectorAll(".box p")[2].innerHTML = `Wind is moving air caused by atmospheric pressure differences, influencing weather patterns, temperature changes, and environmental conditions.`
        document.querySelectorAll(".box h1")[2].innerHTML = ``

        console.log(data);
    } catch (error) {
        alert("Error fetching data!");
        console.log(error);
    }
}
// search input
document.querySelectorAll(".City-Name").forEach(inputBox => {
    inputBox.nextElementSibling?.addEventListener("click", () => {
        const cityName = inputBox.value.trim();
        if (cityName) getWeather(cityName);
        inputBox.value = ""
        inputBox.style.outline = "none"
    });
});
// Top menu buttons
document.getElementById("east").addEventListener("click", () => getWeather("India"));
document.getElementById("west").addEventListener("click", () => getWeather("Saudi-Arabia"));
document.getElementById("north").addEventListener("click", () => getWeather("Afghanistan"));
document.getElementById("south").addEventListener("click", () => getWeather("Madagascar"));

let Search = document.querySelectorAll(".Search");

Search.forEach(btn => {
    btn.addEventListener("click", () => {

        let input = document.querySelectorAll(".City-Name"); // only TOP input

        input.value = "";
        input.placeholder = "Enter Your City";
        input.style.outline = "3px solid orange";

        input.addEventListener("focus", () => {
            input.style.outline = "none";
            input.placeholder = "City-Name";
        });

        input.addEventListener("blur", () => {
            if (input.value.trim() === "") {
                input.placeholder = "City-Name";
                input.style.outline = "none";
            }
        });
    });
});

