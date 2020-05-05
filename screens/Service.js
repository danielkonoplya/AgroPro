const api = 'a7975ce9c26da70b307e89479f58df39'

export default {
    API(q){
        return fetch(`https://samples.openweathermap.org/data/2.5/weather?q=${q}&appid=${api}`)
        .then((res)=>res.json())
        .catch((err)=>console.log(err));
    }
}