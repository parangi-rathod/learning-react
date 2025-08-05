import { useCallback, useEffect, useState } from "react";
import "./passwordGenerator.css";

export function PasswordGenerator() {
  const [password, setPassword] = useState("");
  const [lengthInput, setLengthInput] = useState(12);
  const [isNumberAllowed, setIsNumberAllowed] = useState(false);
  const [isSymbolAllowed, setIsSymbolAllowed] = useState(false);
  let charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

  const generatePassword = useCallback(() => {
    if (isNumberAllowed) {
      charset += "0123456789";
    }
    if (isSymbolAllowed) {
      charset += "!@#$%^&*()_+[]{}|;:,.<>?";
    }

    let newPassword = "";
    for (let i = 0; i < lengthInput; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      newPassword += charset[randomIndex];
    }
    setPassword(newPassword);
  }, [lengthInput, isNumberAllowed, isSymbolAllowed]);

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    setPassword((prevPassword) => prevPassword + charset[randomIndex]);
  }

  useEffect(() => {
    generatePassword();
    }, [lengthInput, isNumberAllowed, isSymbolAllowed]);

  return (
    <>
      <h2>Password Generator</h2>
      <div>
        <label>
          Password Length:
          <input
            type="number"
            minLength={8}
            value={lengthInput}
            onChange={(e) => setLengthInput(Number(e.target.value))}
          />
        </label>
        <label>
          Include Numbers:
          <input
            type="checkbox"
            checked={isNumberAllowed}
            onChange={(e) => setIsNumberAllowed(e.target.checked)}
          />
        </label>
        <label>
          Include Symbols:
          <input
            type="checkbox"
            checked={isSymbolAllowed}
            onChange={(e) => setIsSymbolAllowed(e.target.checked)}
          />
        </label>
        {/* <button onClick={generatePassword}>Generate Password</button> */}
      </div>
      <div>
        <h3>Generated Password:</h3>
        <p>{password}</p>
      </div>
    </>
  );
}
