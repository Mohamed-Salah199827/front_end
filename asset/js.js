let login_user = localStorage.getItem('login_user');


if (login_user) {
    let user = JSON.parse(login_user);
     document.querySelector('#logname').textContent = user.name;

    if (user.type == 'admin') {
        let none=document.querySelectorAll('.con .nav .home ul .u');
        let li = document.querySelectorAll('.con .nav .home ul .messages');
        li.forEach(l => {
            l.style.display = 'flex';   


        })
        none.forEach(n => {
            n.style.display = 'none';
        }
        )
        

            
    
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
        password: {
            text: {
                required: "password is required"
            },
            color: "red"
        }
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
    let sign_name = document.getElementById("name");
    let sign_email = document.getElementById("emailu");
    let sign_pass = document.getElementById("passwordu");
    let err_name_sign = document.getElementById("err-name");
    let err_email_sign = document.getElementById("err_semail");
    let err_pass_sign = document.getElementById("err-spass");

    let validRegex = /^[a-zA-Z]{3,15}/
    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    let validation_pattern = {
        email: /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,
        name: /^[a-zA-Z]{3,15}$/,
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
    //    document.querySelector('form.add_news input[type=submit]').addEventListener('click', add_news);

        document.querySelector('form.add-message-form input[type=submit]').addEventListener('click', add_message);
        document.querySelector('form.login-form input[type=submit]').addEventListener('click', login)
        document.querySelector('form.signup-form input[type=submit]').addEventListener("click", signup);

    }

    function add_message(e) {
        e.preventDefault();
        let inputs = document.querySelectorAll('form.add-message-form input:not(input[type=submit]),textarea[name=message]');
        validation_pattern.message = /^[a-zA-Z0-9]{1}/;
        let error = validation(inputs, validation_pattern)
        console.log(error);
        if (!error) {
            let messages = localStorage.getItem('messages');
            let message = getUser(inputs);
            console.log(message);
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
    document

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
            parent_div.appendChild(div);
        }
    }

    function add_news(e) {
        e.preventDefault();
        let inputs = document.querySelectorAll('form.add-news-form input:not(input[type=submit]),textarea[name=message]');
        validation_pattern.message = /^[a-zA-Z0-9]{1}/;
        let error = validation(inputs, validation_pattern)
        console.log(error);
        if (!error) {
            let news = localStorage.getItem('news');
            let message = getUser(inputs);
            console.log(message);
            if (news) news = JSON.parse(news)
            else news = []
            news.push(message);
            localStorage.setItem('news', JSON.stringify(news));
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
    let inputs = document.querySelectorAll('form.add-news-form input:not(input[type=submit]),textarea[name=title]');
    console.log("🚀 ~ file: js.js ~ line 209 ~ add_news ~ inputs", inputs)
    validation_pattern.message = /^[a-zA-Z0-9]{1}/;
    let error = validation(inputs, validation_pattern)
    console.log(error);
    if (!error) {
        let news = localStorage.getItem('news');
        let ne = getUser(inputs);
        console.log(ne);
        if (news) news = JSON.parse(news)
        else news = []
        news.push(ne);
        localStorage.setItem('news', JSON.stringify(news));
    }
}

function getNews() {
    let news = localStorage.getItem('news');
    if (news) news = JSON.parse(news);
    else news = [];
    displayNews(news);



}
function displayNews(news) {
    for (const message of news) {

        let div = document.createElement('div');
        let h3 = document.createElement('h3');
        let p = document.createElement('p');
        let span = document.createElement('span');
        h3.textContent = message.name;
        p.textContent = message.email;
        span.textContent = message.message;
        div.append(h3, p, span);
        let parent_div = document.querySelector('.news-container');
        parent_div.appendChild(div);
    }
}