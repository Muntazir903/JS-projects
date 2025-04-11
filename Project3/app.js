const BASE_URL = "https://latest.currency-api.pages.dev/v1/currencies/"


const dropdown = document.querySelectorAll(`.dropdown select`);
const fromCurr = document.querySelector(`.from select`);
const toCurr = document.querySelector(`.to select`);
const btn = document.querySelector(`.button`)
const amount = document.querySelector(`.amount input`);
const msg = document.querySelector(`.msg`)

for (let select of dropdown) {
    for (let country in countryList) {
        const newOption = document.createElement(`option`);
        newOption.innerText = country;
        newOption.value = country;
        if (select.name == "from" && country == "PKR") {
            newOption.selected = "selected";
        }
        if (select.name == "to" && country == "USD") {
            newOption.selected = "selected"
        }
        select.append(newOption);

    }
    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    })
}

const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    const img = element.parentElement.querySelector(`img`);
    img.src = newSrc;
}

const updateExchangeRate = async () => {

    let exgAmount = amount.value;
    if (exgAmount == "" || exgAmount < 1) {
        exgAmount = 0;
        amount.value = 0;
    
    }
    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`
    let response = await fetch(URL);
    let data = await response.json();

    const rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()]
    const exgRate = `${exgAmount} ${fromCurr.value} = ${(exgAmount*rate).toFixed(2)} ${toCurr.value}`;

    msg.innerText = exgRate;
}


btn.addEventListener("click", (evt) => {
    evt.preventDefault();
    updateExchangeRate();
});

window.addEventListener("load", () => {
    updateExchangeRate();
});




