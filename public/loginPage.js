'use strict';

const { response } = require("express");

const userForm = new UserForm();

    userForm.loginFormCallback = ({data: {login, password}}) => {
        loginFormAction(data);
            ApiConnector.login = (data, response) => {
                if(response == success) {
                    location.reload();
                } else {
                setLoginErrorMessage(`Пользователь с логином ${this.login} и указанным 
                паролем не найден`);
            }
        }
    }
// вариант 2 (?)
       let xhr = new XMLHttpRequest();
        xhr.open('GET', URL, [true, user, password]);
        xhr.send(); 
        xhr.onload = function() {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                location.reload();
            } else {
                alert('ERROR!');
            }
       };


       userForm.registerFormCallback = ({data: {login, password}}) => {
        registerFormAction(data);
        ApiConnector.register = (data);
    }