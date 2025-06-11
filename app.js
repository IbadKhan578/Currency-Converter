const baseUrl= "https://v6.exchangerate-api.com/v6/87277d0ab11efade7ae7ee83/latest/USD";

let dropdown= document.querySelectorAll(".dropdown select");
let btn = document.querySelector(".btn");
let fromcurr = document.querySelector(".from select") 
let tocurr = document.querySelector(".to select") 
let msg = document.querySelector(".msg")


for(let select of dropdown){

    for(currCode in countryList ){
let newOption= document.createElement("option");
newOption.innerText=currCode;
newOption.value=currCode;
if(select.name==="from" &&  currCode==="USD"){
    newOption.selected="selected"
}else if(select.name=="to" && currCode=="PKR"){
    newOption.selected="selected";
}



select.append(newOption);


    }

select.addEventListener("change",(evt)=>{
    updateflag(evt.target);
})

}

const updateflag=((element)=>{
    let currCode= element.value;
    let countrycode= countryList[currCode]
    let newSrc=`https://flagsapi.com/${countrycode}/flat/64.png`
let img= element.parentElement.querySelector("img");
img.src=newSrc;

})

btn.addEventListener("click", async (evt) => {
  evt.preventDefault();
  console.log("button was clicked");

  let input = document.querySelector(".amount input");
  let inputval = input.value;

  if (inputval === "" || inputval < 1) {
    inputval = 1;
    input.value = 1;
  }

  let fromCode = fromcurr.value.toLowerCase();
  let toCode = tocurr.value.toLowerCase();

  const url = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${fromCode.toLowerCase()}.json`;


    const res = await fetch(url);
    const data = await res.json();

    // const base = fromCode.toLowerCase();
    // const target = toCode.toLowerCase();
    const rate = data[fromCode][toCode];

    let finalAmount = inputval*rate;
// console.log(finalAmount);
    // console.log(rate)
    msg.innerText=`${inputval} ${fromcurr.value} = ${ finalAmount} ${tocurr.value}`;

 });
