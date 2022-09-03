let login_user = localStorage.getItem('login_user');
let co= localStorage.getItem("color")
if (co) {
    document.documentElement.style.setProperty('--blue',co );

}
let button_co =document.getElementById("bu_co")
if (button_co)button_co.addEventListener("click", change_click)
function change_click() {
    window.location.href = './contact.html';
}


if (login_user) {
    let user = JSON.parse(login_user);
    document.querySelector('#logname').textContent = user.name;
    let mess = document.querySelectorAll('form.add-message-form input:not(input[type=submit]),label[for=email],label[for=name]');
    if (mess) {
        let na = document.querySelector('form.add-message-form #name_message');
        let em = document.querySelector('form.add-message-form #email_message');
        let a = document.getElementById("a")

        // a.style.display = "flex"
        if (na || em || a) {
            a.style.display = "flex"
            na.value = user.name;
            em.value = user.email;
        }
        mess.forEach(input => {
            input.style.display = 'none';


        });

    }
    if (user.type == 'admin') {
        let none = document.querySelectorAll('.con .nav .home ul .u');
        let li = document.querySelectorAll('.con .nav .home ul .messages');
        li.forEach(l => {
            l.style.display = 'flex';


        })
        none.forEach(n => {
            n.style.display = 'none';
        })




        // window.location.href = '../admin/add_news.html';

    }
}

let error_message = {
    "name": {
        text: {
            required: "name is required",
            type: "name must be string"
        },
        color: "red"
    },
    "email": {
        text: {
            required: "email is required",
            type: "email is not a valid email"
        },
        color: "red"
    },
    "password": {
        text: {
            required: "password is required"
        },
        color: "red"
    },

}


function toggle() {
    var login = document.getElementsByClassName("login")[0]
    var signup = document.getElementsByClassName("signup")[0]
    var c = (Array.from(login.classList).indexOf('none'));
    if (c == -1) {
        login.classList.add("none");
        signup.classList.remove("none");
    } else {
        signup.classList.add("none");
        login.classList.remove("none");

    }

}

// Validation signup


let validation_pattern = {
    email: /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,
    name: /^[a-zA-Z ]{3,15}$/,
    password: /^[a-zA-Z0-9]{6,15}$/,
    type: /^[a-zA-Z0-9]/
}

function signup(e) {
    e.preventDefault();
    let inputs = document.querySelectorAll('form.signup-form input:not(input[type=submit]) ,select');
    let = document.querySelectorAll('form.signup-form input:not(input[type=submit])');

    let error = validation(inputs, validation_pattern)
    if (!error) {
        let users = localStorage.getItem('users');
        if (users) users = JSON.parse(users);
        else users = [];
        let user = getUser(inputs);
        users.push(user);
        localStorage.setItem('users', JSON.stringify(users));
        savelogin(JSON.stringify(user))
    }
}

function getUser(inputs) {
    let user = {}
    inputs.forEach(input => {
        user[input.name] = input.value;

    })
    return user;
}

function savelogin(user) {
    localStorage.setItem('login_user', user);
    window.location.href = './index.html';
}

function validation(inputs, validation) {
    let error = false;
    inputs.forEach(input => {
        if (input.value.length == 0) {
            input.nextElementSibling.nextElementSibling.textContent = `${input.name} is required`;
            error = true;
        } else if (!validation[input.name].test(input.value)) {
            input.nextElementSibling.nextElementSibling.textContent = `${input.name} is not valid`
            error = true;
        } else {
            input.nextElementSibling.nextElementSibling.textContent = ""
        }
    })
    return error;
}

function login(e) {
    e.preventDefault();
    let inputs = document.querySelectorAll('form.login-form input:not(input[type=submit]) ,select');
    let error = validation(inputs, validation_pattern)
    if (!error) {
        let user = getUser(inputs)
        let users = localStorage.getItem('users');
        let not_found = false;
        if (users) {
            users = JSON.parse(users);
            let login_user = users.filter(u => u.email == user.email && u.password == user.password);
            if (login_user.length) {
                savelogin(JSON.stringify(login_user[0]))
                window.location.href = './index.html';
            } else not_found = true
        } else not_found = true;
        if (not_found) {
            Array.from(inputs).find(input => input.name == 'email')
                .nextElementSibling
                .nextElementSibling
                .textContent = "this cradentails doesn't match our records"
        }
    }
}
addInitEvents();

function addInitEvents() {
    let su_add_news = document.querySelector('form.add-news input[type=submit]')
    let su_add_mess = document.querySelector('form.add-message-form input[type=submit]')
    let su_sig = document.querySelector('form.signup-form input[type=submit]')
    let su_log = document.querySelector('form.login-form input[type=submit]')


    if (su_add_news) su_add_news.addEventListener('click', add_news)
    if (su_add_mess) su_add_mess.addEventListener('click', add_message)
    if (su_sig) su_sig.addEventListener('click', signup)
    if (su_log) su_log.addEventListener('click', login)
}






function add_message(e) {
    e.preventDefault();
    let inputs = document.querySelectorAll('form.add-message-form input:not(input[type=submit]),textarea[name=message]');
    validation_pattern.message = /^[a-zA-Z0-9]{1}/;
    let error = validation(inputs, validation_pattern)
    if (!error) {
        let messages = localStorage.getItem('messages');
        let message = getUser(inputs);
        if (messages) messages = JSON.parse(messages)
        else messages = []
        messages.push(message);
        localStorage.setItem('messages', JSON.stringify(messages));
    }
}
getMessages();

function getMessages() {
    let messages = localStorage.getItem('messages');
    if (messages) messages = JSON.parse(messages);
    else messages = [];
    displayMessages(messages);
}


function displayMessages(messages) {
    for (const message of messages) {

        let div = document.createElement('div');
        let h3 = document.createElement('h3');
        let p = document.createElement('p');
        let span = document.createElement('span');
        h3.textContent = message.name;
        p.textContent = message.email;
        span.textContent = message.message;
        div.append(h3, p, span);
        let parent_div = document.querySelector('.messages-container');
        if (parent_div) {

            parent_div.appendChild(div);
        }
    }
}


// let hh = document.getElementById("hh")
// let g = localStorage.getItem('messages')
// g = JSON.parse(g)
// if (g) {
//     console.log();
//     g.forEach(element => {
//         console.log(Object.entries(element));
//         let f = document.createElement("div")
//         for (const [key, value] of Object.entries(element)) {
//             let h = document.createElement("h2")
//             h.innerHTML = value
//             f.appendChild(h)
//             document.querySelector('.messages-container').append(f);
//         }
//     });
// }
function add_news(e) {
    e.preventDefault();
    let inputs = document.querySelectorAll('form.add-news input:not(input[type=submit]),textarea[name=title]');
    validation_pattern.title = /^[a-zA-Z0-9]{1}/;
    let error = validation(inputs, validation_pattern)
    if (!error) {
        let news = localStorage.getItem('news');
        let new_news = getUser(inputs);
        if (news) news = JSON.parse(news)
        else news = []
        news.push(new_news);
        localStorage.setItem('news', JSON.stringify(news));
    }
}

function displayNews(news) {

    for (const ne of news) {
        let div_img = document.createElement("div");
        div_img.className = "img-container";
        let img = document.createElement('img')
        img.src = "img/news.jpg";
        div_img.append(img);
        let div = document.createElement('div');
        let h3 = document.createElement('h3');
        let p = document.createElement('p');
        let span = document.createElement('span');
        h3.textContent = "name: " + ne.name;
        span.textContent = "email: " + ne.email;
        p.innerHTML = "<h2>news</h2>" + "<br>" + ne.title;
        div.append(div_img, h3,  p);
        let parent_div = document.querySelector('.news-container');
        if (parent_div) {
            parent_div.appendChild(div);
        }


    }
}

function getNews() {
    let news = localStorage.getItem('news');
    if (news) news = JSON.parse(news);
    else news = [];
    displayNews(news);



}
getNews()


function get_mess_us() {
    let mess_us = localStorage.getItem("messages")

    if (mess_us) {
        mess_us = JSON.parse(mess_us);
        let mes = mess_us.filter(message => message.email == JSON.parse(login_user).email)
        console.log(mes);
    }
    displaymessus(mess_us)



}
function displaymessus(mess_us) {
    if (mess_us) {

        for (const message of mess_us) {

            let div = document.createElement('div');
            let h3 = document.createElement('h3');
            let p = document.createElement('p');
            let span = document.createElement('span');
            h3.textContent = message.name;
            p.textContent = message.email;
            span.textContent = message.message;
            div.append(h3, p, span);
            let parent_div = document.querySelector('.us_mess');
            if (parent_div) {
                parent_div.appendChild(div);
            }
        }
    }
}

get_mess_us()
// console.log(icon_p);
let icon_p = document.getElementById("icon-p").addEventListener("click", drop_list)
function drop_list() {
    let list = document.querySelector(".home")
    // list.style.display = "flex"
    list.classList.toggle("homee")
  
}

let cha = document.getElementById("gear").addEventListener('click', sett);
function sett() {
    let change_color = document.getElementById("change-color")
    change_color.classList.toggle("change2-color")


}

let color = document.querySelectorAll("#change-color .color-setting span")
color.forEach(element => {
    // console.log(element);
    
    element.addEventListener("click", function(){
        colors(element.getAttribute("id"))
         document.documentElement.style.setProperty('--blue',element.getAttribute("id") );
         localStorage.setItem("color",element.getAttribute("id"))

    } )
// console.log(element.getAttribute("id"));

});

function colors(color) {
    console.log(color);
    
}