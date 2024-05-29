/**/

let resulsection=document.getElementById("result-section")
document.getElementById("clear-btn").addEventListener("click",()=>{
    resulsection.style.display="none"
    resulsection.innerHTML=""
})
document.getElementById('search-btn')
.addEventListener("click",()=>{
    resulsection.innerHTML=""
    let searchkeyword=document.getElementById("search-input").value.toLowerCase()
    searchkeyword = ({"beach":"beaches","temple":"temples","country":"countries"})[searchkeyword]
    fetch("./travel_recommendation.json")
    .then(data=>data.json())
    .then(jsdata=>{
        console.log(searchkeyword)
        if(Object.keys(jsdata).findIndex(key=>{
            return key===searchkeyword}

        )!=-1){
            const res=jsdata[searchkeyword]
            let result=res
            if(res[0].cities){
                result=[]
                res.map(({cities})=>result=result.concat(cities))
            }
            console.log(JSON.stringify(result))
                result.map(destination=>{
                const {imageUrl,name,description}=destination
                const div=document.createElement("div")
                div.innerHTML=`
                <div class="recommendation">                            
                <img class="recommendation-img" src="./public/destinations/${imageUrl}">
                <div class="recommendation-description">
                    <h6>${name}</h6>
                    <p>${description}</p>
                    <button class="visit-btn">Visit</button>
                </div>
                
            </div>                `
                resulsection.appendChild(div)
            })
            resulsection.style.display='block'

        }
        
    })
    document.getElementById("result-section").style.display="block"
})
