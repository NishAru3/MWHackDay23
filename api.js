import users from "./database/realusers"




function makeUUID() {
    return crypto.randomUUID();
}


function getJSON(filename) {
    let data = null
    fetch('./data.json')
    .then((response) => response.json())
    .then((json) => {data = json});

    return data
}


const getUsers = () => {
    // let users =  getJSON("./database/users.json");
    // console.log(users)
    console.log(users)
}