'use strict';

//Log Out
const logoutButton = new LogoutButton();

logoutButton.action = () => {
ApiConnector.logout(response =>  {
    if (response.success) {
        location.reload();
    };
});
};

//Current User

ApiConnector.current (response => {
    if (response.success) {
        ProfileWidget.showProfile(response.data)
    }
});

//Current Rates

const ratesBoard = new RatesBoard();

const exchangeRates = () => {
    ApiConnector.getStocks (response => {
        if (response.success) {
            ratesBoard.clearTable();
            ratesBoard.fillTable(response.data);
        }
    })
}
    exchangeRates();
    setInterval(exchangeRates, 60000);

//Money Manager
//Пополнение счета

const moneyManager = new MoneyManager();

const serverResponse = (response, message) => {
  if (response.success) {
      moneyManager.setMessage (true, 'Счет успешно пополнен');
      ProfileWidget.showProfile(response.data);
  } else {
    moneyManager.setMessage(false, 'Произошла ошибка');
  }
}

moneyManager.addMoneyCallback = (data) => {
    ApiConnector.addMoney(data, (response) => {
      serverResponse(response.success, 'Счет успешно пополнен');
    })
};

//Конвертация
moneyManager.conversionMoneyCallback = (data) => {
    ApiConnector.convertMoney(data, (response) => {
      if (response.success) {
        moneyManager.setMessage(isSuccess, 'Конверсия выполнена успешно');
        ProfileWidget.showProfile(response.data);
       } else {
        moneyManager.setMessage('Не удалось конвертировать валюту. Попробуйте еще раз');
     } 
})
}
//Перевод валюты
moneyManager.sendMoneyCallback = (data) => {
    ApiConnector.transferMoney(data, (response) => {
        if (response.success) {
          moneyManager.setMessage(isSuccess, 'Перевод валюты выполнен успешно');
          ProfileWidget.showProfile(response.data);
          } else {
          moneyManager.setMessage('Не удалось осуществить перевод. Попробуйте еще раз');
    }    
})
}

//Favorites Widget

const favoritesWidget = new FavoritesWidget();

ApiConnector.getFavorites(response => {
    if (response.success) {
        favoritesWidget.clearTable();
        favoritesWidget.fillTable(response.data);
        moneyManager.updateUsersList(response.data);
    }
})

favoritesWidget.addUserCallback = (data) => {
    ApiConnector.addUserToFavorites (data, (response) => {
    if (response.success) {
        favoritesWidget.clearTable();
        favoritesWidget.fillTable(response.data);
        favoritesWidget.updateUsersList(response.data);
        setMessage(isSuccess)
    } else {
        setMessage('Пользователь не добавлен в список избранных');
    }
    })
}

favoritesWidget.removeUserCallback = (data) => {
    ApiConnector.removeUserFromFavorites(data, (response) => {
        if (response.success) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            favoritesWidget.updateUsersList(response.data);
            setMessage(isSuccess)
        } else {
            setMessage('Пользователь не удален');
        }
        })
        
}