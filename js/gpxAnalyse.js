const API_KEY = "TA_CLE_API_IBP"

export function initGPX(){

const input = document.getElementById("gpxFile")

input.addEventListener("change", analyserGPX)

}

async function analyserGPX(event){

const file = event.target.files[0]

if(!file) return

const formData = new FormData()
formData.append("file", file)

const response = await fetch(
"https://www.ibpindex.com/ibpindex/api/v1/analyze",
{
method:"POST",

headers:{
"Authorization":"Bearer " + API_KEY
},

body:formData
}
)

const data = await response.json()

}
