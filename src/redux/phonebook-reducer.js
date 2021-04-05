import { createReducer } from '@reduxjs/toolkit'; //для создания редьюсера и рефакторинга кода с помощью функции из toolkit

import { combineReducers } from 'redux'; //для композиции редьюсеров, то есть совмещать много в один

//Data
import actions from './phonebook-actions'; //actions

// редьюсер для contacts with Toolkit. В createReducer() - 1 параметр - это начальное значение state; 2 - это объект кейсов, где каждый ключ это тип действия, а значение - это редюсер для этого типа
const items = createReducer([], {
  [actions.addContact]: (state, { payload }) => [...state, payload],

  [actions.deleteContact]: (state, { payload }) =>
    state.filter(contact => contact.id !== payload), //берем предыдущий contacts и отфильтровываем все элементы, кроме того у которого id совпадает
});

// редьюсер для filter with Toolkit. Когда state не нужен, он объявлен, но не используется, вместо него ставим _
const filter = createReducer('', {
  [actions.changeFilter]: (_, { payload }) => payload,
});

export default combineReducers({
  items,
  filter,
});
