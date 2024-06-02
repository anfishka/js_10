function createElem(name, place) {
  let elem = document.createElement(name);
  elem.classList.add(name);

  if (place) {
    place.appendChild(elem);
  }

  return elem;
}


let main = document.getElementsByClassName("main")[0];
const cards_container = createElem("cards_container", main);
const exchange_container = createElem("exchange_container", main);
const bubble_container = createElem("bubble_container", main);

function flyingCurrencyBg() {
    let currency_sign = ["€", "$", "CURRENCY EXCHANGE", "¥", "£"];
    let animation_durations = [5, 11, 9, 13, 15];

    for (let i = 0; i < currency_sign.length; i++) {
      
        if (i === 2)
        {
            bubble = createElem(`bubble_name`, bubble_container);
            bubble.textContent = `${currency_sign[i]}`;
            
        } else {
              let bubble = createElem(`bubble`, bubble_container);
      bubble.textContent = `${currency_sign[i]}`;

        bubble.style.animationDuration = `${animation_durations[i % animation_durations.length]}s`;
          }
  }
}

function createCurrencyCard(item) {
  const card = createElem("card", cards_container);
  card.style.backgroundImage = `url("./glitter${
    item.currencyCodeA === 840 ? "1" : ""
  }.jpg")`; // Use conditional logic for image based on currencyCodeA

  const currencyAbInner = createElem("currency_ab_inner", card);
  const currencyAb = createElem("currency_ab", currencyAbInner);
  currencyAb.textContent = item.currencyCodeA === 840 ? "USD" : "EUR";

  const currencySign = createElem("currency_sign", currencyAbInner);
  currencySign.textContent = item.currencyCodeA === 840 ? "$" : "€";

  const cardsContainerInner = createElem("cards_container_inner", card);

  const buyCurrency = createElem("buyCurrency", cardsContainerInner);
  buyCurrency.textContent = `buy: ${item.rateBuy}`;

  const br = document.createElement("br");
  buyCurrency.appendChild(br);

  const sellCurrency = createElem("sellCurrency", cardsContainerInner);
  sellCurrency.textContent = `sell: ${item.rateSell.toFixed(2)}`;

  return card;
}

function fetchCurrencyData() {
  fetch("https://api.monobank.ua/bank/currency")
    .then((response) => response.json())
    .then((data) => {
      data.forEach((item) => {
        if (
          item.currencyCodeA === 840 ||
          (item.currencyCodeA === 978 && item.currencyCodeB === 980)
        ) {
          createCurrencyCard(item);
        }
      });
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}

function createExchangeForm() {
  const exchangeForm = createElem("form", exchange_container);
  exchangeForm.classList.add("currency_exchange_form");

  const currencyIn = document.createElement("textarea");
  currencyIn.setAttribute("placeholder", "Enter amount");
  currencyIn.classList.add("currencyIn");
  exchangeForm.appendChild(currencyIn);
  currencyIn.addEventListener("change", (e) => {
    currencyIn.textContent = e.target.value;
  });

  const btnChangeCurrency = document.createElement("button");
  btnChangeCurrency.classList.add("btn_change_exchanged_curr");
  exchangeForm.appendChild(btnChangeCurrency);

  const currencyOut = document.createElement("textarea");
  currencyOut.setAttribute("placeholder", "0.00");
  currencyOut.classList.add("currencyOut");
  currencyOut.readOnly = true; 
  exchangeForm.appendChild(currencyOut);
  currencyOut.addEventListener("change", (e) => {
    currencyOut.textContent = e.target.value;
  });

  const btnSubmitExchange = document.createElement("button");
  btnSubmitExchange.classList.add("btn_submit_exchange");
  btnSubmitExchange.textContent = "Exchange currency";
  exchangeForm.appendChild(btnSubmitExchange);

  // Implement logic for handling currency exchange based on user input and fetched data
}

// Check if DOM is loaded before creating elements
if (document.body) {
     flyingCurrencyBg();
  fetchCurrencyData();
    createExchangeForm();
    
} else {
  window.addEventListener("DOMContentLoaded", () => {
    flyingCurrencyBg();
    fetchCurrencyData();
    createExchangeForm();
  });
}

