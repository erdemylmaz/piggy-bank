const alertBox = document.querySelector(".alert-box");
const closeAlertBoxBtn = document.querySelector(".close-box-btn");

const addingMoneyInput = document.querySelector(".adding-money");
const addMoneyBtn = document.querySelector(".add-money-btn");

const removingMoneyInput = document.querySelector(".removing-money");
const removeMoneyBtn = document.querySelector(".remove-money-btn");

const currentMoneyDOM = document.querySelector(".process-text");
const processPercentageDOM = document.querySelector(".process-percentage");

const processBar = document.querySelector(".process-bar");

let currentMoney = 200;
let goalMoney = 18000;

if (localStorage.getItem("piggyBankMoney")) {
  currentMoney = parseInt(localStorage.getItem("piggyBankMoney"));
}

// localStorage.removeItem("piggyBankMoney");

function init() {
  let percentage = (currentMoney / goalMoney) * 100;

  if (percentage > 100) {
    percentage = 100;
  }

  currentMoneyDOM.textContent = `${currentMoney} TL / ${goalMoney} TL`;
  processPercentageDOM.textContent = `${percentage.toFixed(2)}%`;

  processBar.style.width = `${percentage}%`;

  localStorage.setItem("piggyBankMoney", currentMoney);
}

init();

addMoney = () => {
  if (addingMoneyInput.value != "") {
    let addingMoney = parseInt(addingMoneyInput.value);

    currentMoney += addingMoney;

    init();
  }

  addingMoneyInput.value = "";
};

removeMoney = () => {
  let removingMoney = parseInt(removingMoneyInput.value);

  if (removingMoneyInput.value != "" && removingMoney <= currentMoney) {
    currentMoney -= removingMoney;
    init();
  } else if (removingMoney > currentMoney) {
    alertBox.style.visibility = "visible";
  }

  removingMoneyInput.value = "";
};

addMoneyBtn.addEventListener("click", addMoney);
removeMoneyBtn.addEventListener("click", removeMoney);
closeAlertBoxBtn.addEventListener("click", () => {
  alertBox.style.visibility = "hidden";
});

alertBox.addEventListener("click", (e) => {
  if (e.target.classList.contains("alert-box")) {
    alertBox.style.visibility = "hidden";
  }
});

// theme
const darkSide = document.querySelector(".dark-side");
const lightSide = document.querySelector(".light-side");
const toggleBtn = document.querySelector(".toggle-btn");

function switchToDark() {
  toggleBtn.classList.remove("slideToRight");
  toggleBtn.classList.add("slideToLeft");

  document.body.classList.add("dark");

  localStorage.setItem("piggyBankTheme", "dark");
}

function switchToLight() {
  toggleBtn.classList.remove("slideToLeft");
  toggleBtn.classList.add("slideToRight");

  document.body.classList.remove("dark");

  localStorage.removeItem("piggyBankTheme", "dark");
}

darkSide.addEventListener("click", switchToDark);
lightSide.addEventListener("click", switchToLight);

if (localStorage.getItem("piggyBankTheme")) {
  document.body.classList.add("dark");

  toggleBtn.classList.remove("slideToRight");
  toggleBtn.classList.add("slideToLeft");
}
