import "./App.css";
import { useState } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [password, setPassword] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [useUppercase, setUseUppercase] = useState(true);
  const [useLowercase, setUseLowercase] = useState(true);
  const [useNumbers, setUseNumbers] = useState(true);
  const [useSymbols, setUseSymbols] = useState(true);

  function handleChange(event) {
    setLength(event.target.value);
  }

  function generatePassword() {
    const length = parseInt(document.getElementById("length").value);
    const useUppercase = document.getElementById("uppercase").checked;
    const useLowercase = document.getElementById("lowercase").checked;
    const useNumbers = document.getElementById("numbers").checked;
    const useSymbols = document.getElementById("symbols").checked;

    if (length > 50 || length < 8) {
      alert("Password length must be between 8 and 50 characters");
      return;
    }

    let charset = "";
    if (useUppercase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (useLowercase) charset += "abcdefghijklmnopqrstuvwxyz";
    if (useNumbers) charset += "0123456789";
    if (useSymbols) charset += "!@#$%^&*";

    if (charset.length < 1) {
      alert("Please select at least one option");
      return;
    }

    let password = "";
    for (let i = 0; i < length; i++) {
      password += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    setPassword(password);
  }

  function copyPassword() {
    if (password) {
      navigator.clipboard.writeText(password);
      setShowModal(true);

      setTimeout(() => {
        setShowModal(false);
      }, 1000);
    }
  }

  return (
    <div className="container">
      <h1>Password Generator</h1>
      <div className="password-field">
        <span id="password">{password}</span>
        <button
          className="btn"
          id="clipboard"
          title="Copy"
          onClick={copyPassword}
        >
          <i className="fa-regular fa-paste"></i>
        </button>
      </div>
      <div className={`modal ${showModal ? "show" : ""}`}>
        <div className="modal-content">Password copied!</div>
      </div>
      <div className="options">
        <div className="option">
          <label>Length (**8-50 characters**)</label>
          <input
            type="number"
            id="length"
            min="8"
            max="50"
            value={length}
            onChange={handleChange}
          />
        </div>
        <div className="option">
          <label>A-Z (UPPERCASE LETTERS)</label>
          <input
            type="checkbox"
            id="uppercase"
            checked={useUppercase}
            onChange={(e) => setUseUppercase(e.target.checked)}
          />
        </div>
        <div className="option">
          <label>a-z (lowercase letters)</label>
          <input
            type="checkbox"
            id="lowercase"
            checked={useLowercase}
            onChange={(e) => setUseLowercase(e.target.checked)}
          />
        </div>
        <div className="option">
          <label>0-9 (Digits)</label>
          <input
            type="checkbox"
            id="numbers"
            checked={useNumbers}
            onChange={(e) => setUseNumbers(e.target.checked)}
          />
        </div>
        <div className="option">
          <label>!@#$%^&* (Symbols)</label>
          <input
            type="checkbox"
            id="symbols"
            checked={useSymbols}
            onChange={(e) => setUseSymbols(e.target.checked)}
          />
        </div>
      </div>
      <button className="btn" id="generate" onClick={generatePassword}>
        Generate Password
      </button>
    </div>
  );
}

export default App;
