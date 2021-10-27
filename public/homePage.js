'use strict';

const { response } = require("express");

//Log Out
const logoutButton = new LogoutButton();

logoutButton.action = () => {
ApiConnector.logout(response =>  {
    if (response.success) {
        location.reload();
    }
})
}

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
    setInterval(exchangeRates(), 60000);

//Money Manager

const moneyManager = new MoneyManager();

moneyManager.addMoneyCallback = (data) => {
    ApiConnector.addMoney(data, (response) => {
      if (response.success) {
        showProfile(response.data) && setMessage(isSuccess);
      } else {
      setMessage('Баланс не пополнен');
    }
})
}

moneyManager.conversionMoneyCallback = (data) => {
    ApiConnector.convertMoney(data, (response) => {
      if (response.success) {
         showProfile(response.data) && setMessage(isSuccess);
       } else {
       setMessage('Конверсия не осуществлена');
     } 
})
}

moneyManager.sendMoneyCallback = (data) => {
    ApiConnector.transferMoney(data, (response) => {
        if (response.success) {
            showProfile(response.data) && setMessage(isSuccess);
          } else {
          setMessage('Валюта не переведена');
        }    
    })
}

//Favorites Widget

const favoritesWidget = new FavoritesWidget();

ApiConnector.getFavorites(response => {
    if (response.success) {
        favoritesWidget.clearTable();
        favoritesWidget.fillTable(response.data);
        favoritesWidget.updateUsersList(response.data);
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