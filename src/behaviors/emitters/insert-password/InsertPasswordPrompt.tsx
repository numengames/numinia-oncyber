import * as React from 'react';
import { useState } from 'react';

interface PasswordPromptProps {
  onSuccess: () => void;
  masterPassword: string;
}

const styles = `
  .ask-for-password-wrapper {
    background: radial-gradient(circle, rgba(0, 255, 255, 0.1), transparent 60%),
                radial-gradient(circle at top left, rgba(0, 255, 255, 0.15), transparent 70%),
                radial-gradient(circle at bottom right, rgba(0, 255, 255, 0.15), transparent 70%);
    background-color: #282c34;
    position: fixed;
    border: 1px solid #3e3e3e;
    border-radius: 15px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
    padding: 40px;
    left: 75%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 300px;
    overflow: hidden;
  }

  .ask-for-password-wrapper > button {
    position: absolute;
    right: 10px;
    top: 10px;
    border: none;
    background: none;
    color: #f8f8f8;
    font-size: 20px;
    cursor: pointer;
  }

  .ask-for-password-wrapper > button:hover {
    color: #416792;
  }

  .ask-for-password-form {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    z-index: 1;
  }

  .ask-for-password-form > h1 {
    font-size: 24px;
    color: #b3eaff;
    margin-bottom: 20px;
    text-shadow: 0 0 5px rgba(179, 234, 255, 0.7);
  }

  #ask-for-password-input {
    background-color: #1c1c1c;
    border: 2px solid #3e3e3e;
    border-radius: 4px;
    color: #f8f8f8;
    font-size: 16px;
    margin-bottom: 20px;
    padding: 10px 15px;
    transition: border-color 0.3s;
    width: 100%;
  }

  #ask-for-password-input:focus {
    border-color: #b3eaff;
    outline: none;
  }

  .ask-for-password-form > button {
    background: linear-gradient(135deg, #00d4ff, #00a6ff);
    border: none;
    border-radius: 4px;
    color: black;
    font-weight: bold;
    cursor: pointer;
    font-size: 18px;
    padding: 10px 15px;
    transition: background-color 0.3s ease, box-shadow 0.3s ease;
    width: 100%;
    box-shadow: 0 0 15px rgba(0, 255, 255, 0.4);
  }

  .ask-for-password-form > button:hover {
    background: linear-gradient(135deg, #00a6ff, #00d4ff);
    box-shadow: 0 0 25px rgba(0, 255, 255, 0.8);
  }

  .ask-for-password-form > span {
    color: #ff4d4d;
    margin-top: 20px;
    display: block;
    font-size: 16px;
  }
`;

const InsertPasswordPrompt = ({
  onSuccess,
  masterPassword,
}: PasswordPromptProps): JSX.Element | null => {
  const [password, setPassword] = useState('');
  const [isVisible, setIsVisible] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (password === masterPassword) {
      setIsVisible(false);
      onSuccess();
    } else {
      setPassword('');
      setErrorMessage('Incorrect password');
    }
  };

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <>
      <div className="ask-for-password-wrapper" aria-labelledby="password-prompt-title">
        <button onClick={handleClose} aria-label="Close password prompt">
          <span> x </span>
        </button>
        <form className="ask-for-password-form" aria-label="Password prompt form">
          <h1 id="password-prompt-title">Enter the Password</h1>
          <input
            type="password"
            name="password"
            id="ask-for-password-input"
            value={password}
            onChange={handleChange}
            placeholder="Type your password here"
            aria-label="Password input"
          />
          <button onClick={handleClick} aria-label="Unlock button">
            <span> Unlock </span>
          </button>
          {errorMessage && (
            <span role="alert" aria-live="assertive">
              {errorMessage}
            </span>
          )}
        </form>
      </div>
      <style>{styles}</style>
    </>
  );
};

export default InsertPasswordPrompt;
