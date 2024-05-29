/**/

let resulsection=document.getElementById("result-section")
document.getElementById("clear-btn").addEventListener("click",()=>{
    resulsection.style.display="none"
    resulsection.innerHTML=""
})
let result=[]
document.getElementById('search-btn')
.addEventListener("click",()=>{
    resulsection.innerHTML=""
    let searchkeyword=document.getElementById("search-input").value.toLowerCase()
    let query=searchkeyword
    searchkeyword = ({"beach":"beaches","temple":"temples","country":"countries"})[searchkeyword]
    fetch("./travel_recommendation.json")
    .then(data=>data.json())
    .then(jsdata=>{
        console.log(searchkeyword)
        if(Object.keys(jsdata).findIndex(key=>{
            return key===searchkeyword}

        )!=-1){
            result=[]
            const res=jsdata[searchkeyword]
            result=res
            if(res[0].cities){
                result=[]
                res.map(({cities})=>result=result.concat(cities))
            }
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
        if(!result.length){
            console.log('###########')
            let res1=[]
            jsdata.temples.concat(jsdata.beaches).concat(jsdata.countries).map(dest=>{
                if(!dest.cities)res1.push(dest)
                else res1=res1.concat(dest.cities)
            })
            res1.map(destination=>{
                const {imageUrl,name,description}=destination
                if(!description.toLowerCase().includes(query) && !name.toLowerCase().includes(query)) return
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
        }

        
    })
    document.getElementById("result-section").style.display="block"
})
