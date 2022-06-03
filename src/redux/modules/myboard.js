// myboard.js
import { db } from "../../firebase";
import { collection, doc, getDoc, getDocs, addDoc, updateDoc, deleteDoc } from "firebase/firestore";

// Actions
const LOAD = "myboard/LOAD";
const CREATE = "myboard/CREATE";
const UPDATE = "myboard/UPDATE";
const DELETE = "myboard/DELETE";

const initailState = {
  list: [
    // {
    //   word: "竝",
    //   desc: "나란히 병, 곁 방, 땅 이름 반",
    //   exam: "병,방,반",
    // },
  ],
};

// Action Creators
// 불러올 데이터
export function loadCard(card_data) {
  return { type: LOAD, card_data };
}
// 입력한 데이터
export function createCard(card_data) {
  return { type: CREATE, card_data };
}
// 수정한 데이터
export function updateCard(card_data) {
  return { type: UPDATE, card_data };
}
// 삭제할 글의 인덱스
export function deleteCard(card_index) {
  return { type: DELETE, card_index };
}

//LOAD
export const loadCardFB = () => {
  return async function (dispatch) {
    //모든 데이터 가져오기 getDocs()
    const card_data = await getDocs(collection(db, "word"));
    let card_list = [];
    // 여기서 forEach는 Array 내장 메서드가 아니다.
    // firebase 객체에서 제공하는 메서드
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
    // 하나의 데이터 추가하기 addDoc(), getDoc()
    // 데이터 추가하기
    // const docRef = await addDoc(collection(db, '컬렉션명'), 추가할 데이터)
    const docRef = await addDoc(collection(db, "word"), word);
    // console.log(docRef);
    const _card_data = await getDoc(docRef);
    // 데이터를 추가하는데 addDoc()과 getDoc()이 같이 쓰이는 이유는
    // 새롭게 생성된 데이터의 고유 id값을 참조하기 위해서 쓴다.
    const card_data = { id: _card_data.id, ..._card_data.data() };
    // console.log(card_data);
    // _card_data.id = 생성된 고유 id
    dispatch(loadCardFB(card_data));
  };
};

//UPDATE
export const updateCardFB = (card_id, card_list) => {
  return async function (dispatch) {
    //데이터 변경하기 updateDoc(), doc()
    const docRef = doc(db, "word", card_id);
    // console.log(docRef);
    await updateDoc(docRef, card_list);
    dispatch(loadCardFB(card_list));
  };
};

//DELETE
export const deleteCardFB = (card_id) => {
  return async function (dispatch, getState) {
    if (!card_id) {
      return;
    }
    //데이터 삭제하기 doc(), deleteDoc()
    const docRef = doc(db, "word", card_id);
    await deleteDoc(docRef);
    // console.log(docRef.id);
    // 삭제하고자 하는 데이터를 참조하기위해서 doc() 함수를 사용한다. 
    // deleteDoc() 로 참조해온 데이터를 가지고있는 docRef를 넣어주고 삭제한다.
    dispatch(loadCardFB());
  };
};

// Reducer
export default function reducer(state = initailState, action = {}) {
  // 파라미터 state은 배열, action은 딕셔너리
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

    case "myboard/DELETE": {
      const new_card_list = state.list.filter((idx) => {
        return parseInt(action.card_index) !== idx;
      });
      return { list: new_card_list };
    }
    // do reducer stuff
    default:
      return state;
  }
}
