'use strict';

const userForm = new UserForm();

const callBackFunction = (response, message) => {
  if (response.success) {
    location.reload();
  } else {
    message.call(userForm, response.error);
  }
}

userForm.loginFormCallback = (data) => {
ApiConnector.login(data, (response) => {
  callBackFunction(response, userForm.setLoginErrorMessage);
});
}

userForm.registerFormCallback = (data) => {
ApiConnector.register(data, (response) => {
  callBackFunction(response, userForm.setRegisterErrorMessage);
});
}