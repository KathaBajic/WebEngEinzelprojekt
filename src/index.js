import './styles/style.scss';

/*module.exports = {
    run: function () {
        new requestData();
    }
};
*/
let requestData = function() {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = responseHandler;
    xhttp.open("GET", "https://dog.ceo/api/breeds/list/all", true);
    xhttp.send();
}

let responseHandler = function () {
    if (this.readyState === 4 && this.status === 200) {
        let data = JSON.parse(this.responseText);
        renderRequestedData(data.message);
    }
}

let renderRequestedData = function (data) {
    let listContainer = document.getElementById("item-list");
    let count = 0;
    let maxItems = 25
    for (let key in data) {
        if (count === maxItems) {
            break;
        }

        let listItem = _createListItem(key, "Add to reminder list");
        listContainer.append(listItem);
        count++;
    }
}

/**
 * Creates a list element with specific text content and btn text
 * Returns the created element
 */
let _createListItem = function (itemText, btnText) {
    let li = document.createElement("li");      // creates a list element (node)
    let btn = document.createElement("button"); // creates a button element

    li.textContent = itemText;      // sets the textcontents of li
    btn.classList.add("btn-light"); // adds a class to the button element
    btn.textContent = btnText;      // sets the button text
    btn.addEventListener("click", function () {
        app.addItemToRemlist(this);
    });  // adds an eventlistener to the button with a public function from app

    li.append(btn); // appends the list element with the button

    return li;
}


let addItemToRemlist = function (btnElement) {
    let parentListItem = btnElement.closest("li");
    let clonedItem = parentListItem.cloneNode(true);    //clone the li node -> this removes all eventListeners from childnodes!

    let btn = clonedItem.getElementsByTagName("button")[0]; //get the button element
    btn.textContent = "x";
    btn.addEventListener("click", function () {
        removeItemFromList(this);
    })   //click event that removes the list element

    document.getElementById("remlist").append(clonedItem); //append li element to wishlist
}

let removeItemFromList = function (btnElement) {
    btnElement.closest("li").remove();
}

window.requestData = requestData;
