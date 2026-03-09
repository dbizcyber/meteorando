import { randos } from "../data/randos.js";

export function remplirMenu() {

const select = document.getElementById("nomRando");

randos.forEach(r => {

const option = document.createElement("option");

option.value = r;
option.textContent = r;

select.appendChild(option);

});

}
