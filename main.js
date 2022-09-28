document.addEventListener("DOMContentLoaded", function (){
    const errorDiv = document.querySelector("#error");
    const mainDiv = document.querySelector(".container");

    const tryAgain = document.querySelector("#reset");
    tryAgain.addEventListener("click", function (){
        window.location.reload();
    })

    const myHeaders = new Headers();
        myHeaders.append("apikey", "YOUR_API_KEY");
    
    const startCurrency = document.querySelector("#startCurrency");
    const targetCurrency = document.querySelector("#targetCurrency");


    const requestOptions = {
            method: 'GET',
            redirect: 'follow',
            headers: myHeaders
        };
    
    fetch("https://api.apilayer.com/exchangerates_data/symbols", requestOptions)
        .then (handleErrors)
        .then(response => response.json())
        .then(data => fillOptionField(data.symbols))
        .catch(error => console.log('error', error));
   
    document.querySelector("form").onsubmit = function () {
        const startCurrencyValue = document.querySelector("#startCurrency").value;
        const targetCurrencyValue =  document.querySelector("#targetCurrency").value;;


        fetch(`https://api.apilayer.com/exchangerates_data/convert?to=${targetCurrencyValue}&from=${startCurrencyValue}&amount=1`, requestOptions)
            .then(response => response.json())
            .then(result => document.querySelector("#converted_Currency").innerHTML = `1 ${startCurrencyValue} =  ${result.info.rate.toFixed(5)} ${targetCurrencyValue}`)
            .catch(error => console.log("error", error));
        
    return false; 
}

    
function fillOptionField(currency) {
    const $select = $('#startCurrency').selectize();
    const startCurrency = $select[0].selectize;

    const $select2 = $('#targetCurrency').selectize();
    const targetCurrency = $select2[0].selectize;

    for (curr in currency){
        startCurrency.addOption({value: curr, text: curr});
        
    }
    for (curr in currency){
        targetCurrency.addOption({value: curr, text: curr});

    }
}

function handleErrors(response) {
    if (!response.ok) {
        mainDiv.style.display = "none";
        errorDiv.style.display = "flex";
    }
    return response;
}
});
