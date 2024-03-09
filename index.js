const API_KEY = 'f522207a20db40e9b11113637240903'

const API = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=`
const ADD = '&days=3&aqi=no&alerts=no'

const city = document.getElementById("city")
const loader = document.getElementById("loader")
const form = document.getElementById("cForm")
const contents = document.getElementById("contents")


form.addEventListener("submit", (e) => {
    e.preventDefault()
    if (city.value){
        loadData(city.value)
    }
})

function loadData(str){
    loader.style.visibility = "visible"
    fetch(API+str+ADD, {mode: 'cors'}).then(response => {
        return response.json()
    }).then(response => {
        if (response && response.forecast){
            drawContent(response.forecast.forecastday)
        }
    }).catch(error => {
        drawError(error)
    })
}

function drawContent(data){
    contents.innerHTML = ""

    data.forEach(day => {
        const content = document.createElement("div")
        content.classList.add("content")

        const dates = document.createElement("div")
        dates.classList.add("dates")
        dates.innerHTML = day.date

        const flex = document.createElement("div")
        flex.classList.add("flex")

        const img = document.createElement("img")
        img.src = day.day.condition.icon

        const cel = document.createElement("h3")
        cel.innerHTML = day.day.avgtemp_c + " °C"

        flex.appendChild(img)
        flex.appendChild(cel)
        
        const text = document.createElement("div")
        text.classList.add("text")
        text.innerHTML = day.day.condition.text

        content.appendChild(dates)
        content.appendChild(flex)
        content.appendChild(text)

        contents.appendChild(content)
    })
    loader.style.visibility = "hidden"
}

function drawError(error){
    console.log(error)
    contents.innerHTML = ""

    const errDiv = document.createElement("div")
    errDiv.classList.add("error")

    errDiv.innerHTML = error

    contents.appendChild(errDiv)
    loader.style.visibility = "hidden"
}