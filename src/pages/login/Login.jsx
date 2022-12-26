import React, { useState } from "react";
import { LoginForm } from "../../components/login/LoginForm";
import { SignUp } from "../../components/login/SignUp";
import { ReactComponent as WellcomeSVG } from "../../assets/undraw_doctors.svg";
import "./Login.scss";

export const Login = () => {
  const [isNew, setIsNew] = useState(false);
  const handleRegister = () => setIsNew((prev) => !prev);
  return (
    <div className="auth">
      <div className="auth_form">
        <div className="auth_form-content">
          {!isNew ? (
            <LoginForm handleRegister={handleRegister} />
          ) : (
            <SignUp handleRegister={handleRegister} />
          )}
        </div>
      </div>
      <div className="wellcome_content">
        <WellcomeSVG />
      </div>
    </div>
  );
};
