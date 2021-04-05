# Specification
Добавь в приложение Телефонной книги работу с бекендом для хранения контактов.
Создай локальный бекенд для разработки при помощи библиотеки json-server.
Используй этот db.json для базы данных, будет один ендпоинт /contacts.
Напиши Redux-операции для работы с асинхронными запросами по паттерну request, success и error.
Добавь селекторы в файл contacts-selectors.js и сделай мемоизацию селекторов там, где необходимо.

# REDUX

устанавливаем библиотеки npm i redux react-redux

## создаем структуру

=1 папка redux /actions /reducers store.js

=2 папка redux /contacts //actions //reducers

/filter //actions //reducers

store.js

## создаем экшены

const addContact = (contact) => { return { type: "ADD_QUERY", payload: { id:
contact.id, name: contact.name, phone: contact.phone }, }; };

## создаем редюсеры

const filterReducer = (state = "", action) => { switch (action.type) { case
"FILTER_CONTACT": return action.payload; default: return state; } };

## создаем стор

import { createStore, combineReducers } from "redux";

const rootReducer = combineReducers({ contacts: contactReducer, filter:
filterReducer });

const store = createStore( rootReducer, window.REDUX_DEVTOOLS_EXTENSION &&
window.REDUX_DEVTOOLS_EXTENSION() ); export default store;

## заворачиваем все приложение в компонент Provider

в index.js import { Provider } from "react-redux"; import store from
"./redux/store";

передаем store пропами через Provider

## получаем доступ к глобальному стору к компонентах через HOC connect

import {connect } from "react-redux";

заворачиваем экспорт компонента в HOC connect и передаем mapStateToProps для
передачи свойств mapDispatchToProps для передачи методов

## mapStateToProps

const mapStateToProps = (store) => { return { query: store.query, gallery:
store.gallery }; }

const mapDispatchToProps = { filterContact: filterAction.filterContacts };

connect(mapStateToProps, mapDispatchToProps)(Component)

connect(mapStateToProps)(Component) connect(null, mapDispatchToProps)(Component)

# TOOLKIT

## устанавливаем пакет

npm i @reduxjs/toolkit

## в файле store.js

вместо функции createStore будем использовать

import { configureStore } from '@reduxjs/toolkit';

которая уже у себя содержит подключение к тулзам в хроме вместо
window.REDUX_DEVTOOLS_EXTENSION && window.REDUX_DEVTOOLS_EXTENSION() или вместо
функции composeWithDevTools(), подключаемой из библиотеки
redux-devtools-extension

process.env.NODE_ENV = 'development' || 'production'

const store = configureStore({ reducer: {}, devTools: process.env.NODE_ENV =
'development', })

## npm i redux-logger

import { confugureStore, getDefaultMiddleware } from '@reduxjs/toolkit';

import logger from 'redux-logger';

const middleware = [...getDefaultMiddleware(), logger]

const store = confugureStore({ reducer: {}, middleware, devTools:
process.env.NODE_ENV = 'development', })

## createAction

import { createAction } from '@reduxjs/toolkit';

const createAction = createAction('CREATE') const deleteAction =
createAction('DELETE')

export default {createAction,deleteAction}

const updatePayload = createAction('ADD', ({email. pass})=>{ return { payload: {
id: genId(), email, pass } } })

const updatePayload = createAction(type.name, ({email. pass})=>({ payload: { id:
genId(), email, pass }, }))

## createReducer

import actions from './actions' import { createReducer } from
'@reduxjs/toolkit';

const deleteReducer = (state, action) => { return state.filter(({id})=> id !==
action.payload ) }

const initState = [] || '' || {}

### const pieceOfStore = createReducer(initState,

{ 'ADD': (state, {payload} )=>[...astate, payload], 'DELETE': deleteReducer,

})

### const pieceOfStore = createReducer(initState,

{ [actions.createAction]: (state, {payload} )=>[...astate, payload],
[actions.deleteAction]: deleteReducer,

})

const filter = createReducer('', { [actions.filter]: (\_, {payload})=>payload })

## npm i redux-persist

import {persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE,
REGISTER} from 'redux-persist' import storage from 'redux-persist/lib/storage'

### const persistConfig = { key: 'users', storage }

const rootReducer = combineReducers({ user: userReducer, allUsers:
allUsersReducer, });

### const persistedReducer = persistReducer(persistConfig,rootReducer)

const middleware = [...getDefaultMiddleware({ serializableCheck: {
ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER] }, }),
logger]

const store = confugureStore({ reducer: \*\*persistedReducer, middleware,
devTools: process.env.NODE_ENV = 'development', })

### const persistStore = persistStore(store)

export default {store, persistStore}

### в файле index.js

import {PersistGate} from 'redux-persist/integration/react'

ReactDOM.render( <React.StrictMode> </React.StrictMode>,
document.getElementById("root") );
