fetch("./travel_recommendation.json")
.then(data=>data.json())
.then(jsdata=>console.log(JSON.stringify(jsdata)))