import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  decrement,
  increment,
  incrementByAmount,
} from "../../redux/counterSlice";

export default function About() {
  const { counter, age } = useSelector((store) => store.counterReducer);
  const dispatch = useDispatch();
  const inputval = useRef(null);
  return (
    <div className="container mx-auto mt-10 mb-24 px-5 text-center min-h-[60vh]">
      <h2 className="text-4xl">About Page</h2>
      <h3 className="text-3xl">Counter Value: {counter} </h3>
      <h3 className="text-3xl">Age Value: {age} </h3>
      <div className="flex justify-between w-1/4 mx-auto mt-5">
        <button
          onClick={() => dispatch(increment())}
          className="w-20 h-20 bg-amber-500  p-1 text-center block mx-auto"
        >
          {" "}
          Increment Counter
        </button>
        <button
          onClick={() => dispatch(decrement())}
          className="w-20 h-20 bg-amber-500  p-1 text-center block mx-auto"
        >
          {" "}
          Decrement Counter
        </button>
        <input type="number" ref={inputval} className="bg-amber-200" />
      </div>
      <button
        className=" w-20 h-20 bg-amber-500  p-1 text-center block mx-auto"
        onClick={() => {
          dispatch(incrementByAmount(parseInt(inputval.current.value)));
        }}
      >
        Add specific value
      </button>
    </div>
  );
}
