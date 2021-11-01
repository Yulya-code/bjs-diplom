'use strict';

//Log Out
const logoutButton = new LogoutButton();

logoutButton.action = () => {
ApiConnector.logout((response) =>  {
    if (response.success) {
        location.reload();
    };
});
};

//Current User

ApiConnector.current ((response) => {
    if (response.success) {
        ProfileWidget.showProfile(response.data)
    }
});

//Current Rates

const ratesBoard = new RatesBoard();

const exchangeRates = () => {
    ApiConnector.getStocks((response) => {
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

moneyManager.addMoneyCallback = (data) => {
    ApiConnector.addMoney(data, (response) => {
      if (response.success) {
        moneyManager.setMessage (true, 'Счет успешно пополнен');
        ProfileWidget.showProfile(response.data);
        } else {
          moneyManager.setMessage(false, 'Произошла ошибка');
        }
    })
};

//Конвертация
moneyManager.conversionMoneyCallback = (data) => {
    ApiConnector.convertMoney(data, (response) => {
      if (response.success) {
        moneyManager.setMessage(true, 'Конверсия выполнена успешно');
        ProfileWidget.showProfile(response.data);
       } else {
        moneyManager.setMessage(false, 'Не удалось конвертировать валюту. Проверьте правильность операции');
     } 
})
}
//Перевод валюты
moneyManager.sendMoneyCallback = (data) => {
    ApiConnector.transferMoney(data, (response) => {
        if (response.success) {
          moneyManager.setMessage(true, 'Перевод валюты выполнен успешно');
          ProfileWidget.showProfile(response.data);
          } else {
          moneyManager.setMessage(false, 'Не удалось осуществить перевод. Проверьте правильность операции');
    }    
})
}

//Favorites Widget

const favoritesWidget = new FavoritesWidget();

ApiConnector.getFavorites((response) => {
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
        moneyManager.updateUsersList(response.data);
        moneyManager.setMessage(true, 'Пользователь успешно добавлен')
    } else {
        moneyManager.setMessage(false, 'Пользователь не найден');
    }
    })
}

favoritesWidget.removeUserCallback = (data) => {
    ApiConnector.removeUserFromFavorites(data, (response) => {
        if (response.success) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            moneyManager.updateUsersList(response.data);
            moneyManager.setMessage(true, 'Пользователь удален')
        } else {
            moneyManager.setMessage(false, 'Удаляемый пользователь не найден');
        }
        })       
}