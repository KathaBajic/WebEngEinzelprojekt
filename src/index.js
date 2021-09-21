import './styles/style.scss';

let initHome = function () {
    let checkbtn = document.getElementById("submitbtn");
    checkbtn.addEventListener("click", function () {
        validateInput(this);
    })
}

let validateInput = function() {
    let validity = (
        document.getElementById("fname").checkValidity() &&
        document.getElementById("lname").checkValidity() &&
        document.getElementById("age").checkValidity() &&
        document.getElementById("email").checkValidity() &&
        document.getElementById("pass").checkValidity()
    );
    if (validity) {
        alert('Success');
    } else {
        alert('Error');
    }
}

window.initHome = initHome;