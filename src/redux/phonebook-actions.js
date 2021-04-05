import { createAction } from '@reduxjs/toolkit';

import shortId from 'shortid'; //npm для создания уникальных ID

//  Возвращает {type: types.ADD, payload: ....}, но нам нужен более сложный тип payload с ID, name, number. В этом случае Prepare Callbacks (это 2 параметр createAction - prepareAction). createAction(types, prepareAction).
// Во 2 параметр createAction - мы передаем функцию, в которой можно подготовить формат payload
const addContact = createAction('phonebook/add', ({ name, number }) => {
  return {
    payload: {
      id: shortId.generate(), //присваиваем уникальный ID
      name,
      number,
    },
  };
});

const deleteContact = createAction('phonebook/delete');

const changeFilter = createAction('phonebook/changeFilter');

// eslint-disable-next-line import/no-anonymous-default-export
export default { addContact, deleteContact, changeFilter };
