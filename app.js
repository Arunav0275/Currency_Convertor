const BASE_URL = "https://api.currencyapi.com/v3/latest?apikey=cur_live_ATOmlQFEU6LX8uU4LD8oUEQhjvkIhLqkN8bxlKFP";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg=document.querySelector(".msg");
for (let select of dropdowns) {
    for (let currCode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if (select.name === "from" && currCode === "USD") {
            newOption.selected = "selected";
        } else if (select.name === "to" && currCode === "INR") {
            newOption.selected = "selected";
        }
        select.append(newOption);
    }

    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    });
}

window.addEventListener("load",()=>{
    updateExchangeRate();
})

const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newsrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newsrc;
}

btn.addEventListener("click",(evt) => {
    evt.preventDefault();
    updateExchangeRate();
})

const updateExchangeRate=async()=>{
    let amount = document.querySelector(".amount input");
    let amtValue = amount.value;
    if (amtValue === "" || amtValue < 0) {
        amtValue = 1;
        amount.value = 1;
    }/*presing enter also changes the amount.value to 1 because of the default behaviour of the form
      When you press Enter inside an input field within a form, it triggers the form's submit event,
      which then triggers the button's click event because it's the default submit button for the form. */


    const URL = `${BASE_URL}&base_currency=${fromCurr.value}&currencies[]=${toCurr.value }`;
    let response=await fetch(URL);
    let data=await response.json();
    let rate=data.data[toCurr.value].value;
    let finaAmt=rate * amtValue;
    msg.innerText=`${amtValue} ${fromCurr.value} = ${finaAmt} ${toCurr.value}`;
}