let chartProfil

export function initProfilGPX(){

document
.getElementById("gpxFile")
.addEventListener("change", lireGPX)

}

async function lireGPX(event){

const file = event.target.files[0]

if(!file) return

/* appel API IBP */

calculIBP(file)

/* lecture GPX locale pour profil */

const text = await file.text()

const parser = new DOMParser()
const xml = parser.parseFromString(text,"text/xml")

const points = [...xml.getElementsByTagName("trkpt")]

let distances=[]
let altitudes=[]
let slopes=[]

let totalDist=0

for(let i=1;i<points.length;i++){

const lat1=parseFloat(points[i-1].getAttribute("lat"))
const lon1=parseFloat(points[i-1].getAttribute("lon"))
const ele1=parseFloat(points[i-1].getElementsByTagName("ele")[0].textContent)

const lat2=parseFloat(points[i].getAttribute("lat"))
const lon2=parseFloat(points[i].getAttribute("lon"))
const ele2=parseFloat(points[i].getElementsByTagName("ele")[0].textContent)

const dist=distance(lat1,lon1,lat2,lon2)

totalDist+=dist

const pente=((ele2-ele1)/(dist*1000))*100

distances.push(totalDist)
altitudes.push(ele2)
slopes.push(pente)

}

dessinerProfil(distances,altitudes,slopes)

}

/* distance haversine */

function distance(lat1,lon1,lat2,lon2){

const R=6371
const dLat=(lat2-lat1)*Math.PI/180
const dLon=(lon2-lon1)*Math.PI/180

const a=
Math.sin(dLat/2)*Math.sin(dLat/2)+
Math.cos(lat1*Math.PI/180)*
Math.cos(lat2*Math.PI/180)*
Math.sin(dLon/2)*Math.sin(dLon/2)

const c=2*Math.atan2(Math.sqrt(a),Math.sqrt(1-a))

return R*c

}

/* appel API IBP */

async function calculIBP(file){

const key=document.getElementById("ibpKey").value

if(!key) return

const formData=new FormData()

formData.append("key",key)
formData.append("file",file)

const rep=await fetch(
"https://www.ibpindex.com/api/",
{
method:"POST",
body:formData
})

const data=await rep.json()

const hike=data.hiking

/* affichage données */

document.getElementById("distanceGPX").textContent=
hike.totlengthkm

document.getElementById("denivele").textContent=
hike.accuclimb

document.getElementById("ibp").textContent=
hike.ibp

/* calcul durée marche */

calculDuree(hike.totlengthkm)

}

/* durée marche */

function calculDuree(distanceKm){

const vitesse=parseFloat(
document.getElementById("vitesse").value
)

if(!vitesse) return

const heures=distanceKm/vitesse

const h=Math.floor(heures)
const m=Math.round((heures-h)*60)

document.getElementById("dureeMarche").textContent=
`${h}h${m}`

}

/* couleur pente */

function couleurPente(p){

if(p>=20) return "rgb(200,0,0)"
if(p>=15) return "rgb(255,80,0)"
if(p>=10) return "rgb(255,150,0)"
return "rgb(255,220,0)"

}

/* profil altimétrique */

function dessinerProfil(dist,alt,slopes){

const ctx=document
.getElementById("profilAltitude")

const data=alt.map((a,i)=>({
x:dist[i],
y:a
}))

const colors=slopes.map(p=>couleurPente(p))

if(chartProfil) chartProfil.destroy()

chartProfil=new Chart(ctx,{
type:"line",
data:{
datasets:[{
label:"Profil altimétrique",
data:data,
borderColor:"black",
segment:{
borderColor:ctx=>colors[ctx.p0DataIndex]
},
pointRadius:0,
tension:0
}]
},

options:{
parsing:false,

plugins:{
tooltip:{
callbacks:{
label:function(ctx){

const d=ctx.raw.x.toFixed(2)
const alt=ctx.raw.y
const pente=slopes[ctx.dataIndex].toFixed(1)

return `Altitude ${alt} m | Dist ${d} km | pente ${pente}%`

}
}
}
},

scales:{
x:{
type:"linear",
title:{display:true,text:"Distance (km)"}
},
y:{
title:{display:true,text:"Altitude (m)"}
}
}

}
})

}
