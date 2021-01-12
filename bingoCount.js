const tableSet = document.querySelector("table");
const ROW = 5;
const COL = 5;

let bingoText = document.querySelector(".bingoNum");

function checkBingo(){
    let trList = document.querySelectorAll("tr");
    let tdList = [];
    for (let i =0;i<5;i++){
        let a = `#row${i}>td`;
        tdList.push(document.querySelectorAll(a));
    }
    console.log(tdList);
    let flag = 0;
    let cnt = 0;
    for (let i=0;i<trList.length;i++){
        flag=0;
        for (let j=0;j<tdList.length;j++){
            if (tdList[i][j].classList.contains("paint")===true){
                flag = 1;
            }else{
                flag = 0;
                break;
            }
        }
        if (flag === 1){
            cnt +=1;
        }
    }

    for(let i=0;i<trList.length;i++){
        flag=0;
        for(let j=0;j<tdList.length;j++){
            if (tdList[j][i].classList.contains("paint")===true){
                flag = 1;
            }else{
                flag = 0;
                break;
            }
        }
        if (flag === 1){
            cnt +=1;
        }
    }

    flag=0;
    for(let i=0;i<trList.length;i++){
        if (tdList[i][i].classList.contains("paint")===true){
            flag=1;
        }else{
            flag=0;
            break;
        }
    }
    if (flag === 1){
        cnt +=1;
    }

    flag=0;
    for (let i=0;i<tdList.length;i++){
        if (tdList[i][4-i].classList.contains("paint")===true){
            flag +=1;
        }
    }
    if (flag===5){cnt+=1;}

    bingoText.innerText=`Now ${cnt} Bingo.`;
}


function init(){
    tableSet.addEventListener("click",checkBingo);
}
init();