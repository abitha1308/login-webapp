
function displayData(){
    const userList = localStorage.getItem("activeUser");
    if (userList === null){
        window.location.href = "index.html";
        return;
    }
    console.log(userList);
    const activeUser = JSON.parse(userList);
    const list = document.querySelector(".boxList");
    list.innerHTML = "<p>UserName: "+activeUser[0].username+"</p>";
    list.innerHTML += "<p>Email: "+activeUser[0].email+"</p>";
}

function clearSession(){
    localStorage.removeItem("activeUser");
    window.open("index.html",'_self');
}