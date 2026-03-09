import { parkings } from "../data/parkings.js";

export function remplirMenuParkings() {

const select = document.getElementById("parking");

parkings.forEach(p => {

const option = document.createElement("option");

option.value = p;
option.textContent = p;

select.appendChild(option);

});

}
