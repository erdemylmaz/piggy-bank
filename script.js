const alertBox = document.querySelector(".alert-box");
const closeAlertBoxBtn = document.querySelector(".close-box-btn");

const addingMoneyInput = document.querySelector(".adding-money");
const addMoneyBtn = document.querySelector(".add-money-btn");

const removingMoneyInput = document.querySelector(".removing-money");
const removeMoneyBtn = document.querySelector(".remove-money-btn");

const currentMoneyDOM = document.querySelector(".process-text");
const processPercentageDOM = document.querySelector(".process-percentage");

const processBar = document.querySelector(".process-bar");
const header = document.querySelector(".header");

const headerText = document.querySelector(".header-text");

const sidebarBtn = document.querySelector(".menu-btn");
const sidebar = document.querySelector(".sidebar");
const closeSidebarBtn = document.querySelector(".close-sidebar-btn");

function showSidebar() {
  sidebar.classList.add("show-sidebar");
}

function hideSidebar() {
  sidebar.classList.remove("show-sidebar");
}

sidebarBtn.addEventListener("click", showSidebar);
closeSidebarBtn.addEventListener("click", hideSidebar);

// setup

let isSettedUp = false;

let count = 0;

let currency = "₺";

let currentMoney = 0;
let goalMoney = 0;
let goalsName = "";

if (localStorage.getItem("isSettedUp")) {
  isSettedUp = localStorage.getItem("isSettedUp");

  goalsName = localStorage.getItem("piggyBankName");
  goalMoney = parseInt(localStorage.getItem("piggyBankGoalMoney"));
}

// localStorage.removeItem("isSettedUp");

const setupDOM = document.querySelector(".setup");
const piggyBankDOM = document.querySelector(".container");

const goalsNameInput = document.querySelector(".goals-name");
const goalsPriceInput = document.querySelector(".goals-price");

const goalNameBtn = document.querySelector(".goal-name-btn");
const goalPriceBtn = document.querySelector(".goal-price-btn");

const resetBtn = document.querySelector(".reset-btn");
const nextBtn = document.querySelector(".next-btn");

function setName() {
  goalsName = goalsNameInput.value;

  goalsNameInput.classList.add("setup-input-active");
  goalNameBtn.classList.add("setup-active");

  count += 1;
}

function setPrice() {
  goalMoney = parseInt(goalsPriceInput.value);

  goalsPriceInput.classList.add("setup-input-active");
  goalPriceBtn.classList.add("setup-active");

  count += 1;
}

function resetInputs() {
  goalsName = "";
  goalsMoney = 0;

  goalsNameInput.value = "";
  goalsPriceInput.value = "";

  goalsNameInput.classList.remove("setup-input-active");
  goalsPriceInput.classList.remove("setup-input-active");

  goalNameBtn.classList.remove("setup-active");
  goalPriceBtn.classList.remove("setup-active");
}

function next() {
  if (count == 2) {
    setupDOM.style.display = "none";
    piggyBankDOM.style.display = "flex";

    currentMoneyDOM.textContent = `${currentMoney} ${currency} / ${goalMoney} ${currency} `;
    headerText.innerHTML = `Piggy Bank for ${goalsName}`;
    processPercentageDOM.textContent = `0.00%`;

    processBar.style.width = "0%";

    isSettedUp = true;

    localStorage.setItem("piggyBankName", goalsName);
    localStorage.setItem("piggyBankGoalMoney", goalMoney);
    localStorage.setItem("isSettedUp", isSettedUp);
  }
}

// localStorage.removeItem("isSettedUp");

nextBtn.addEventListener("click", next);
resetBtn.addEventListener("click", resetInputs);

goalNameBtn.addEventListener("click", setName);
goalPriceBtn.addEventListener("click", setPrice);

// piggy bank

if (isSettedUp) {
  setupDOM.style.display = "none";
  piggyBankDOM.style.display = "flex";

  currentMoneyDOM.textContent = `${currentMoney} TL / ${goalMoney} TL `;
  headerText.innerHTML = `Piggy Bank for ${goalsName}`;
}

if (localStorage.getItem("piggyBankMoney")) {
  currentMoney = parseInt(localStorage.getItem("piggyBankMoney"));
}

function init() {
  let percentage = (currentMoney / goalMoney) * 100;

  if (percentage > 100) {
    percentage = 100;
  }

  currentMoneyDOM.textContent = `${currentMoney} ${currency} / ${goalMoney} ${currency}`;
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

// THEME
const darkSide = document.querySelector(".dark-side");
const lightSide = document.querySelector(".light-side");
const toggleBtn = document.querySelector(".toggle-btn");

function switchToDark() {
  document.body.classList.add("dark");

  localStorage.setItem("piggyBankTheme", "dark");
  darkSide.classList.add("dark-active");
  lightSide.classList.add("de-active");
}

function switchToLight() {
  document.body.classList.remove("dark");

  lightSide.classList.remove("de-active");
  darkSide.classList.remove("dark-active");

  localStorage.removeItem("piggyBankTheme", "dark");
}

darkSide.addEventListener("click", switchToDark);
lightSide.addEventListener("click", switchToLight);

if (localStorage.getItem("piggyBankTheme")) {
  document.body.classList.add("dark");

  switchToDark();
}

// btt button
const bttBtn = document.querySelector(".btt-btn");

window.addEventListener("scroll", () => {
  let headersPosition = header.offsetTop;
  let headersHeight = header.getBoundingClientRect().height;
  let currentPosition = window.pageYOffset;

  if (currentPosition > headersPosition + headersHeight) {
    bttBtn.style.visibility = "visible";
  } else {
    bttBtn.style.visibility = "hidden";
  }
});

bttBtn.addEventListener("click", () => {
  window.scrollTo({
    left: 0,
    top: 0,
  });
});

// sidebar elements
const resetNameBtn = document.querySelector(".reset-name-btn");
const resetPriceBtn = document.querySelector(".reset-price-btn");
const resetPiggyBankBtn = document.querySelector(".reset-piggy-bank-btn");

// reset money
const moneyAlertBox = document.querySelector(".money-alertbox");
const moneyInput = document.querySelector(".new-goalMoney-input");
const moneyConfirmBtn = document.querySelector(".money-yes-btn");
const moneyCloseBtn = document.querySelector(".close-moneybox-btn");

function changeMoney() {
  goalMoney = moneyInput.value;

  currentMoneyDOM.textContent = `${currentMoney} TL / ${goalMoney} TL`;

  moneyAlertBox.style.visibility = "hidden";

  init();

  localStorage.setItem("piggyBankGoalMoney", goalMoney);
}

moneyConfirmBtn.addEventListener("click", changeMoney);
resetPriceBtn.addEventListener("click", () => {
  moneyAlertBox.style.visibility = "visible";

  moneyInput.value = goalMoney;
});

moneyCloseBtn.addEventListener("click", () => {
  moneyAlertBox.style.visibility = "hidden";
});

// reset name
const nameAlertBox = document.querySelector(".name-alertbox");
const nameInput = document.querySelector(".new-goalName-input");
const nameConfirmBtn = document.querySelector(".name-yes-btn");
const nameCloseBtn = document.querySelector(".close-namebox-btn");

function changeName() {
  goalsName = nameInput.value;

  headerText.textContent = `Piggy Bank for ${goalsName}`;

  nameAlertBox.style.visibility = "hidden";

  localStorage.setItem("piggyBankName", goalsName);
}

nameConfirmBtn.addEventListener("click", changeName);
resetNameBtn.addEventListener("click", () => {
  nameAlertBox.style.visibility = "visible";

  nameInput.value = goalsName;
});

nameCloseBtn.addEventListener("click", () => {
  nameAlertBox.style.visibility = "hidden";
});

// RESET BUTTONS
const piggyAlertBox = document.querySelector(".piggy-alertbox");
const piggyNoBtn = document.querySelector(".piggy-no-btn");
const piggyConfirmBtn = document.querySelector(".piggy-yes-btn");
const piggyCloseBtn = document.querySelector(".close-piggybox-btn");

function resetPiggyBank() {
  setupDOM.style.display = "flex";
  piggyBankDOM.style.display = "none";

  piggyAlertBox.style.visibility = "hidden";

  localStorage.removeItem("piggyBankMoney");
  localStorage.removeItem("isSettedUp");

  hideSidebar();
  resetInputs();

  count = 0;
  goalsName = "";
  goalMoney = 0;
}

piggyConfirmBtn.addEventListener("click", resetPiggyBank);
piggyNoBtn.addEventListener("click", () => {
  piggyAlertBox.style.visibility = "hidden";
});

piggyCloseBtn.addEventListener("click", () => {
  piggyAlertBox.style.visibility = "hidden";
});

resetPiggyBankBtn.addEventListener("click", () => {
  piggyAlertBox.style.visibility = "visible";
});

window.addEventListener("click", (e) => {
  if (e.target.classList.contains("alertb")) {
    alertBox.style.visibility = "hidden";
    nameAlertBox.style.visibility = "hidden";
    piggyAlertBox.style.visibility = "hidden";
  }
});

// LIST
const showDivBtn = document.querySelector(".item-add-btn");
const addItemDiv = document.querySelector(".add-item-div");
const listItems = document.querySelector(".list-items");

showDivBtn.addEventListener("click", () => {
  if (addItemDiv.classList.contains("show-add-div")) {
    addItemDiv.classList.remove("show-add-div");
    showDivBtn.textContent = "Add item";

    setTimeout(() => {
      listItems.style.height = "66vh";
    }, 750);
  } else {
    addItemDiv.classList.add("show-add-div");
    showDivBtn.textContent = "Hide!";
    listItems.style.height = "50vh";
  }
});

// add item
const itemsNameInput = document.querySelector(".add-item-name-input");
const itemsPriceInput = document.querySelector(".add-item-price-input");
const addItemBtn = document.querySelector(".add-item-submit-btn");

let itemList = [];
let allItems = [];

if (localStorage.getItem("piggyBankItems")) {
  itemList = JSON.parse(localStorage.getItem("piggyBankItems"));
  allItems = JSON.parse(localStorage.getItem("piggyAllItems"));
}

itemList.map((item) => {
  let div = document.createElement("div");

  div.classList.add("list-item");
  div.dataset.id = item.id;

  div.innerHTML = `
    <div class="item-name">${item.name}</div>
    <div class="item-price"><span class="items-price">${item.price}</span> ${currency}</div>

    <div class="item-icons">
        <i class="fas fa-pen icon edit-item-btn"></i>
        <i class="fas fa-check-circle icon confirm-item-btn" style="display: none;"></i>
        <i class="fas fa-trash icon delete-item-btn"></i>
    </div>
    `;

  listItems.appendChild(div);

  if (itemList.length >= 7) {
    listItems.classList.add("show-scrollbar");
  }
});

let deleteButtons = document.querySelectorAll(".delete-item-btn");
let editButtons = document.querySelectorAll(".edit-item-btn");
let confirmButtons = document.querySelectorAll(".confirm-item-btn");

deleteItem = (e) => {
  let itemsId = parseInt(e.target.parentNode.parentNode.dataset.id);
  let item = e.target.parentNode.parentNode;

  for (let x = 0; x < allItems.length; x++) {
    if (x == itemsId) {
      itemList.splice(x, 1);

      for (let x = 0; x < itemList.length; x++) {
        itemList[x].id = x;
      }

      console.log(itemList, allItems);

      localStorage.setItem("piggyBankItems", JSON.stringify(itemList));

      deleteButtons = document.querySelectorAll(".delete-item-btn");
      editButtons = document.querySelectorAll(".edit-item-btn");
    }
  }

  if (itemList.length < 7) {
    listItems.classList.remove("show-scrollbar");
  }

  listItems.removeChild(item);
};

deleteButtons.forEach((btn) => {
  btn.addEventListener("click", deleteItem);
});

editItem = (e) => {
  let item = e.target.parentElement.parentElement;
  let itemsId = parseInt(item.dataset.id);
  let itemNameDOM = item.querySelector(".item-name");
  let itemPriceDOM = item.querySelector(".items-price");
  let confirmBtn = item.querySelector(".confirm-item-btn");

  itemNameDOM.innerHTML = `<input type="text" class="edit-item-name-input item-input" placeholder="Name" value=${itemNameDOM.textContent} />`;
  itemPriceDOM.innerHTML = `<input type="number" class="edit-item-price-input item-input" placeholder="Price" value=${itemPriceDOM.textContent} />`;

  e.target.style.display = "none";
  confirmBtn.style.display = "inline-flex";
};

confirmEdit = (e) => {
  let item = e.target.parentElement.parentElement;
  let itemsId = parseInt(item.dataset.id);
  let itemNameDOM = item.querySelector(".item-name");
  let itemPriceDOM = item.querySelector(".items-price");
  let penBtn = item.querySelector(".edit-item-btn");

  let itemNameInput = item.querySelector(".edit-item-name-input");
  let itemPriceInput = item.querySelector(".edit-item-price-input");

  itemNameDOM.textContent = itemNameInput.value;
  itemPriceDOM.textContent = itemPriceInput.value;

  for (let x = 0; x < allItems.length; x++) {
    if (x == itemsId) {
      let item = itemList[x];

      item.name = itemNameInput.value;
      item.price = itemPriceInput.value;

      localStorage.setItem("piggyBankItems", JSON.stringify(itemList));
    }
  }

  e.target.style.display = "none";
  penBtn.style.display = "inline-flex";
};

confirmButtons.forEach((btn) => {
  btn.addEventListener("click", confirmEdit);
});

editButtons.forEach((btn) => {
  btn.addEventListener("click", editItem);
});

let id = itemList.length;

addItem = () => {
  itemsName = itemsNameInput.value;
  itemsPrice = parseInt(itemsPriceInput.value);

  if (itemsName != "" && itemsPrice != "") {
    itemList.push({
      name: itemsName,
      price: itemsPrice,
      id: id,
    });

    allItems.push({
      name: itemsName,
      price: itemsPrice,
      id: id,
    });

    let div = document.createElement("div");

    div.classList.add("list-item");
    div.dataset.id = id;

    div.innerHTML = `
    <div class="item-name">${itemsName}</div>
    <div class="item-price"><span class="items-price">${itemsPrice}</span> ${currency}</div>

    <div class="item-icons">
        <i class="fas fa-pen icon edit-item-btn"></i>
        <i class="fas fa-check-circle icon confirm-item-btn" style="display: none;"></i>
        <i class="fas fa-trash icon delete-item-btn"></i>
    </div>
    `;

    listItems.appendChild(div);

    let deleteButtons = document.querySelectorAll(".delete-item-btn");
    let editButtons = document.querySelectorAll(".edit-item-btn");
    let confirmButtons = document.querySelectorAll(".confirm-item-btn");

    deleteButtons.forEach((btn) => {
      btn.addEventListener("click", deleteItem);
    });

    editButtons.forEach((btn) => {
      btn.addEventListener("click", editItem);
    });

    confirmButtons.forEach((btn) => {
      btn.addEventListener("click", confirmEdit);
    });

    localStorage.setItem("piggyBankItems", JSON.stringify(itemList));
    localStorage.setItem("piggyAllItems", JSON.stringify(allItems));

    if (itemList.length >= 7) {
      listItems.classList.add("show-scrollbar");
    }

    id++;
  }
};

addItemBtn.addEventListener("click", addItem);

// localStorage.removeItem("piggyBankItems");
