import React from "react";
import "../styles/ErrorMsg.scss";

function ErrorMsg() {
  return (
    <div className="form-error">
      <p>Coś poszło nie tak...</p>
      <p>Spróbuj ponownie</p>
    </div>
  );
}

export default ErrorMsg;
