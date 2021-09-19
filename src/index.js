import './styles/style.scss';

let requestData = function() {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = responseHandler;
    xhttp.open("GET", "https://hp-api.herokuapp.com/api/characters", true);
    xhttp.send();
}

let responseHandler = function () {
    if (this.readyState === 4 && this.status === 200) {
        let data = JSON.parse(this.responseText);
        renderRequestedData(data);
    }
}

let renderRequestedData = function (data) {
    let tableContainer = document.getElementById("carac-table");

    for (let idx in data) {
        let tableItem = _createTableItem(data[idx], "Add", addItemToRemlist);
        tableContainer.append(tableItem);
    }
}

/**
 * Creates a list element with specific text content and btn text
 * Returns the created element
 */
let _createTableItem = function (item, btnText, eventFunction) {
    let tr = document.createElement("tr");

    if (typeof item == "string") {
        let td_name = document.createElement("td");
        td_name.textContent = item;
        td_name.id = "character";
        tr.append(td_name);
    } else {
        let td_name = document.createElement("td");
        td_name.textContent = item["name"]
        td_name.id = "character"
        let td_species = document.createElement("td");
        td_species.textContent = item["species"]
        let td_house = document.createElement("td");
        td_house.textContent = item["house"]
        let td_birthdate = document.createElement("td");
        td_birthdate.textContent = item["dateOfBirth"]
        let td_patronus = document.createElement("td");
        td_patronus.textContent = item["patronus"]

        tr.append(td_name);
        tr.append(td_house);
        tr.append(td_species);
        tr.append(td_birthdate);
        tr.append(td_patronus);

    }

    let td_btn = document.createElement("td");
    let btn = document.createElement("button");
    btn.textContent = btnText;
    btn.addEventListener("click", function () {
        eventFunction(this);
    });

    td_btn.append(btn);
    tr.append(td_btn);

    return tr;
}

let addItemToRemlist = function (btnElement) {
    let nameItem = btnElement.parentNode.parentNode.children.namedItem("character");
    let tableItem = _createTableItem(nameItem.textContent, "Remove", removeItemFromList);
    document.getElementById("rem-table").append(tableItem); //append li element to wishlist
}

let removeItemFromList = function (btnElement) {
    let itemRemove = btnElement.parentNode.parentNode;
    itemRemove.remove();
}

window.requestData = requestData;
