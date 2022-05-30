// myboard.js
import { db } from "../../firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

// Actions
const LOAD = "myboard/LOAD";
const CREATE = "myboard/CREATE";
const UPDATE = "myboard/UPDATE";
const REMOVE = "myboard/REMOVE";

const initailState = {
  list: [],
};

// Action Creators
export function loadCard(card_data) {
  return { type: LOAD, card_data };
}

export function createCard(card_data) {
  return { type: CREATE, card_data };
}

export function updateCard(card_data) {
  return { type: UPDATE, card_data };
}

export function removeCard(card_index) {
  return { type: REMOVE, card_index };
}

//load
export const loadCardFB = () => {
  return async function (dispatch) {
    const card_data = await getDocs(collection(db, "word"));

    let card_list = [];
    card_data.forEach((doc) => {
      console.log(doc.data());
      card_list.push({ id: doc.id, ...doc.data() });
    });

    dispatch(loadCard(card_list));
  };
};

//CREATE
export const createCardFB = (word) => {
  return async function (dispatch) {
    const docRef = await addDoc(collection(db, "word"), word);
    const _card_data = await getDoc(docRef);
    const card_data = { id: _card_data.id, ..._card_data.data() };

    dispatch(loadCardFB(card_data));
  };
};

//UPDATE
export const updateCardFB = (card_id, card_list) => {
  return async function (dispatch) {
    const docRef = doc(db, "word", card_id);
    await updateDoc(docRef, card_list);
    dispatch(loadCardFB(card_list));
  };
};

//REMOVE
export const removeCardFB = (card_id) => {
  return async function (dispatch, getState) {
    if (!card_id) {
      return;
    }
    const docRef = doc(db, "word", card_id);
    await deleteDoc(docRef);
    const _card_list = getState().myboard.list;
    const card_index = _card_list.findIndex((b) => {
      return b.id === card_id;
    });

    dispatch(loadCardFB());
  };
};

// Reducer
export default function reducer(state = initailState, action = {}) {
  switch (action.type) {
    case "myboard/LOAD": {
      return { list: action.card_data };
    }

    case "myboard/CREATE": {
      const new_card_list = [...state.list, action.card_data];
      return { list: new_card_list };
    }

    case "myboard/UPDATE": {
      const new_card_list = [...state.list, action.card_data];
      return { list: new_card_list };
    }

    case "myboard/REMOVE": {
      console.log(action);
      const new_card_list = state.list.filter((l, idx) => {
        return parseInt(action.card_index) !== idx;
      });
      return { list: new_card_list };
    }
    default:
      return state;
  }
}
