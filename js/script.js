const register = document.getElementById("submitButton");
const login = document.getElementById("loginButton");
register.addEventListener('submit',onSubmit);
login.addEventListener('submit',onLogin);

function validate(arr){
    for (let i=0;i<arr.length;i++){
        if (arr[i] === '') {
            return false;
        }
    }
    return true;
}

function clearLocalStorage(){
    const user = localStorage.getItem("activeUser");
    if (user==null) {
        return;
    }
    window.location.href = "dashboard.html";
}
// validate email

function alreadyUser(email,username){
    const userkey = localStorage.getItem("users");
    const users = JSON.parse(userkey);
    if (users === null) return false;
    if (users.length===0) return false;
    for (let i=0;i<users.length;i++){
        if (users[i].username === username || users[i].email === email){
            return true;
        }
    }
    return false;
}

function updateUserData(username,email,password){
    let userInfo = {};
    userInfo.username = username;
    userInfo.email = email;
    userInfo.password = password;
    return userInfo;
}

function setLocalSession(key,userInfo){
    const userkey = localStorage.getItem(key);
    let json = JSON.parse(userkey);
    if (json===null) {
        json = [];
    }
    json.push(userInfo);
    localStorage.setItem(key,JSON.stringify(json));
}

function checkUser(username,password){
    const session = localStorage.getItem("users");
    let value = JSON.parse(session);
    if (value.length===0){
        return 0;
    }
    else{
        for (let i=0;i<value.length;i++){
            console.log(i+" "+username+" "+password);
            if (value[i].username === username){
                if (value[i].password === password){
                    value[i] = updateUserData(value[i].username,value[i].email,value[i].password);
                    setLocalSession("activeUser",value[i]);
                    console.log(localStorage.getItem("activeUser"));
                    return 1;
                }
                else{
                    return -1;
                }
            }
        }
        return 0;
    }
}

function validatePassword(inputtxt){

    var regex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/;
    console.log(regex);
    if(inputtxt.match(regex)){ 
        return true;
    } else { 
        return false;
    }
}

function validateEmail(inputtxt){

    var regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    console.log(regex);
    if(inputtxt.match(regex)){ 
        return true;
    } else { 
        return false;
    }
}

function onSubmit(e){

    e.preventDefault();
    const username = document.getElementById("username");
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const confirm = document.getElementById("confirm");
    const msg = document.getElementById('errorMsg');
    let arr = [username.value,email.value,password.value,confirm.value];

    if (validate(arr)){
        if (validateEmail(email.value) === false){
            msg.innerText = "Invalid Email";
            msg.style.color = "red";
            setTimeout( ()=> msg.innerText='',3000);
            return;
        }
        if (validatePassword(password.value) === false){
            msg.innerText = "Enter Strong password";
            msg.style.color = "red";
            setTimeout( ()=> msg.innerText='',3000);
            return;
        }
        if (password.value===confirm.value){
            
            if (alreadyUser(email.value,username.value)){
                msg.innerText = "User Already registered";
                msg.style.color = "red";
                setTimeout( ()=> msg.innerText='',5000);
                return;
            }
            
            // user details in localstorage
            const userInfo = updateUserData(username.value,email.value,password.value);
            setLocalSession("users",userInfo);
            console.log(localStorage.getItem("users"));
            alert("Registered Successfully !!!");
            window.location.href = "index.html";
        }
        else{
            msg.innerText = "Password mismatch";
            msg.style.color = "red";
            setTimeout( ()=> msg.innerText='',4000);
        }
        
    }
    else{
        msg.innerText = "Enter all the fields";
        msg.style.color = "red";
        setTimeout( ()=> msg.innerText='',3000);
    }
}


// LOGIN ACTION

function onLogin(e){
    e.preventDefault();
    const uname = document.getElementById("uname");
    const pwd = document.getElementById("pwd");
    const msg = document.getElementById('error');
    const arr = [uname.value,pwd.value];
    if (validate(arr)){
        const flag = checkUser(uname.value,pwd.value);
        if (flag === -1){
            // invalid credentials
            msg.innerText = "Invalid Password";
            msg.style.color = "red";
            setTimeout( ()=> msg.innerText='',3000);
        }
        else if (flag === 0){
            // user not registered
            msg.innerText = "User Not registered";
            msg.style.color = "red";
            setTimeout( ()=> msg.innerText='',3000);
        }
        else{   
            window.open("dashboard.html",'_self');
        }
    }
    else{
        msg.innerText = "Enter All fields";
        msg.style.color = "red";
        setTimeout( ()=> msg.innerText='',5000);
        return;
    }
}