var Name = document.getElementById("NamelSignUp"); 
var EmailGn = document.getElementById("EmailSignUp");
var PasswordGn = document.getElementById("PasswordSignUp");
var EmailIn = document.getElementById("EmailIn");
var PasswordIN = document.getElementById("PasswordIN");

var Welcome = document.getElementById("Welcome");
var error = document.getElementById("ERROR");
var errorGN = document.getElementById("ERRORGN");
var arrsign = [];
var test = 0;

function signDatauser() {
    var usersign = {
        namegn: Name.value.trim(),
        Emailgn: EmailGn.value.trim(),
        passwordgn: PasswordGn.value.trim()
    };
    arrsign = JSON.parse(localStorage.getItem("datauser"));

    for (var i = 0; i < arrsign.length; i++) {
        if (arrsign[i].Emailgn === EmailGn.value.trim()) {
            test = 1;
            break;
        }
    }
    validationGN();

    if (test === 1) {
        test = 0;
        return;
    }

    arrsign.push(usersign);

    SaveToLocalstorage();
    clearinput();
}

function loginDatauser() {
    var arr = JSON.parse(localStorage.getItem("datauser"));
    var email = EmailIn.value.trim();
    var password = PasswordIN.value.trim();

    for (var i = 0; i < arr.length; i++) {
        if (email === arr[i].Emailgn && password === arr[i].passwordgn) {
            localStorage.setItem("currentUser", JSON.stringify(arr[i]));
            window.location.href = "./html/index3.html"; 
            return true;
        }
    }

    validationIN(); 
    return false;
}

function clearinput() {
    if (Name) Name.value = "";
    if (EmailGn) EmailGn.value = "";
    if (PasswordGn) PasswordGn.value = "";
}

function SaveToLocalstorage() {
    localStorage.setItem("datauser", JSON.stringify(arrsign));
}

function validationIN() {
    if (EmailIn.value.trim() === "" || PasswordIN.value.trim() === "") {
        error.innerHTML = `
            <p class="text-danger text-center d-block">All inputs are required</p>`;
    } else {
        error.innerHTML = `
            <p class="text-danger text-center d-block">Incorrect email or password</p>`;
    }
}

function validationGN() {
    if (
        Name.value.trim() !== " " &&
        EmailGn.value.trim() !== " " &&
        PasswordGn.value.trim() !== " "
    ) {
        errorGN.innerHTML = `
            <p class="text-success text-center d-block my-2">Success</p>`;
    } 
    if (
        Name.value.trim() == " " ||
        EmailGn.value.trim() == " " ||
        PasswordGn.value.trim() == " "
    ) {
        errorGN.innerHTML = `
            <p class="text-danger text-center d-block">All inputs are required</p>`;
    }
    if (test == 1) {
        errorGN.innerHTML = `
            <p class="text-danger text-center d-block">email already exists</p>`;
        test = 0;
    }
}

if (Welcome) {
    var user = JSON.parse(localStorage.getItem("currentUser"));
    if (user) {
        Welcome.innerHTML = `
            <div class="login_system text-center">
                <h1>Welcome ${user.namegn}</h1>
            </div>`;
    } else {
        window.location.href = "../index.html";
    }
}
