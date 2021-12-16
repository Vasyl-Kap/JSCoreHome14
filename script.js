let form = document.forms.myForm;
let getS = selector => document.querySelector(selector);

let loginRegExp = /^[a-zA-Z]{4,16}$/;

function validLogin() {
    let testLogin = loginRegExp.test(form.login.value);
    if (testLogin) {
        form.login.style.border = '1px solid silver';
    }
    else {
        form.login.style.border = '2px solid red';
    }
};

let passRegExp = /^[a-zA-Z0-9_.-]{4,16}$/;

function validPassword() {
    let testPass = passRegExp.test(form.password.value);
    if (testPass) {
        form.password.style.border = '1px solid silver';
    }
    else {
        form.password.style.border = '2px solid red';
    }   
};

let mailRegExp = /^[a-zA-Z0-9.-]*@[a-zA-Z]*\.[a-zA-Z]*$/;

function validEmail() {
    let testMail = mailRegExp.test(form.email.value);
    if (testMail) {
        form.email.style.border = '1px solid silver';
        if (loginRegExp.test(form.login.value) && passRegExp.test(form.password.value)) {
            getS('.btn1').disabled = false;
        }
        else {
            getS('.btn1').disabled = true;
        }
    }
    else {
        form.email.style.border = '2px solid red';
        getS('.btn1').disabled = true;
    }  
};

let users = [];
 
function addUser() {
    let user = {
        num: 0,
        login: form.login.value,
        password: form.password.value,
        email: form.email.value,
        edit: '<input type="button" onclick="editUser()" class="btnEdit" value="Edit"',
        del: '<input type="button" onclick="deleteUser()" class="btnDel" value="Delete"'
    };
    users.push(user);
    form.login.value ="";
    form.password.value ="";
    form.email.value ="";
    getS('.btn1').disabled = true;
    render();
}

function render() {
    let addUser = document.querySelectorAll('.addUser');
    if (addUser != null) {
        for (let i=0; i<addUser.length; i++) {
            addUser[i].remove();
        }
    }
    for (let i=0; i<users.length; i++) {
        users[i].num = i+1;
        let row = document.createElement('tr');
        row.classList.add('addUser');
        for (key in users[i]) {
            row.innerHTML += `<td>${users[i][key]}</td>`;
            getS('table').appendChild(row);
        }
    }
}

function deleteUser() {
    let listUsers = document.querySelectorAll('.addUser');
    for (let i=0; i<listUsers.length; i++) {
        listUsers[i].addEventListener('click', function() {
            users.splice(i, 1);
            render();
        });
    }
} 

let userIndex;

function editUser() {
    let listUsers = document.querySelectorAll('.addUser');
    for (let i=0; i<listUsers.length; i++) {
        listUsers[i].addEventListener('click', function() {
            userIndex = i;
            form.login.value = users[i].login;
            form.password.value = users[i].password;
            form.email.value = users[i].email;
            getS('.btn1').hidden = true;
            getS('.btn2').hidden = false;
            if (loginRegExp.test(form.login.value) && passRegExp.test(form.password.value)) {
                getS('.btn2').disabled = false;
            }
            else {
                getS('.btn2').disabled = true;
            }
        });
    }
}

function saveEditUser() {
    class editUser {
        constructor(num, login, password, email, edit, del) {
            this.num = num;
            this.login = login;
            this.password = password;
            this.email = email;
            this.edit = edit;
            this.del = del;
        }
    }
    let newUser = new editUser(userIndex + 1, form.login.value, form.password.value, form.email.value, '<input type="button" onclick="editUser()" class="btnEdit" value="Edit"', '<input type="button" onclick="deleteUser()" class="btnDel" value="Delete"');
    users[userIndex] = newUser;
    form.login.value ="";
    form.password.value ="";
    form.email.value ="";
    getS('.btn2').disabled = true;
    getS('.btn2').hidden = true;
    getS('.btn1').hidden = false;
    render();   
}