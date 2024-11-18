// const baseurl =   "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/US/IN";
const baseurl = "https://latest.currency-api.pages.dev/v1/currencies"
const dropdown = document.querySelectorAll(".dropdown select");
const button = document.querySelector("form button");
const fromcurr = document.querySelector(".from select");
const tocurr = document.querySelector(".to select");
const msg =document.querySelector(".msg");

for (let select of dropdown) {
    for (currencyCode in countryList) {
        let newoption = document.createElement("option");
        newoption.innerText = currencyCode;
        newoption.value = currencyCode;
        if (select.name === "from" && currencyCode == "USD") {
            newoption.selected = "selected";
        } else if (select.name == "to" && currencyCode == "INR") {
            newoption.selected = "selected";
        }
        select.append(newoption);
    }
    select.addEventListener("change", (e) => {
        updateFlag(e.target)
    })
}


const updateFlag = (element) => {
    let currcode = element.value;
    let countrycode = countryList[currcode];
    let newsrc = `https://flagsapi.com/${countrycode}/flat/64.png`
    let img = element.parentElement.querySelector("img");
    img.src = newsrc;
}

button.addEventListener("click", async (e) => {
    e.preventDefault();
    let amount = document.querySelector(".amount input")
    let amountValue = amount.value;
    if (amountValue == "" || amountValue < 1) {
        amountValue = 1;
        amount.value = 1;
    }
    const fromvalue = fromcurr.value.toLowerCase();
    const tovalue = tocurr.value.toLowerCase();
    const fromResponse = await fetch(`${baseurl}/${fromvalue}.json`);   
    const fromData = await fromResponse.json();

    const from = fromData[fromvalue]; // Base rate for "fromCurrency"
    const rate = from[tovalue];
    let finalAmount =rate*amountValue;
   msg.innerText = `${amountValue} ${fromvalue} = ${finalAmount.toFixed(2)} ${tovalue}`;
})