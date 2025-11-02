import React from "react";
import imgError from "../../assets/img/error.svg";
export default function NotFound() {
  return (
    <div className="h-[88vh] flex justify-center items-center">
      <img src={imgError} alt="404 Not Found" />
    </div>
  );
}
