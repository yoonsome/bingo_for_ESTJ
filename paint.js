const table = document.querySelector("table");

function paint(event){
    const cell = event.target;
    cell.classList.toggle('paint');
}


function init(){
    table.addEventListener("click",paint)
}

init();