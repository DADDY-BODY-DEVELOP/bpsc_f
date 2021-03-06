import React, {createContext} from "react";
import {useImmerReducer} from "use-immer";
export const CounterContext = createContext({});

const initialState = {
  counter: 0,
};

const counterReducer = (draft, action) => {
  // eslint-disable-next-line
  switch (action.type) {
    case "ADD_COUNTER": {
      draft.counter = draft.counter + action.payload; // set state counter
      return;
    }

    case "SUB_COUNTER": {
      draft.counter = draft.counter - action.payload; // set state counter
      return;
    }

    case "NEW_COUNTER": {
      draft.counter = action.payload; // set state counter
      return;
    }
  }
};

export const CounterProvider = ({children}) => {
  const [counterState, counterDispatch] = useImmerReducer(counterReducer, initialState);

  const {counter} = counterState;

  const addCounter = (payload) => counterDispatch({type: "ADD_COUNTER", payload}); // ส่ง type ADD_COUNTER และ payload เพื่อให้ conterReducer ไปใช้งานต่อ
  const subCounter = (payload) => counterDispatch({type: "SUB_COUNTER", payload}); // ส่ง type SUB_COUNTER และ payload เพื่อให้ conterReducer ไปใช้งานต่อ
  const newCounter = (payload) => counterDispatch({type: "NEW_COUNTER", payload}); // ส่ง type SUB_COUNTER และ payload เพื่อให้ conterReducer ไปใช้งานต่อ

  return (
    <CounterContext.Provider value={{counter, addCounter, subCounter, newCounter}}>
      {children}
    </CounterContext.Provider>
  );
};
