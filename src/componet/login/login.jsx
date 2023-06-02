import React, { useState } from "react";
import "../register/register.css";
import Joi from "joi";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { auth } from "../Conf/Firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function Login({ saveUserData }) {
  let [userLogin, setUserLogin] = useState({
    email: "",
    password: "",
  });

  let navigator = useNavigate();
  let [loading, setLoading] = useState(false);
  let [apiError, setApiError] = useState("");
  let [validateError, setValidateError] = useState([]);
  function checkUser(e) {
    let userCheck = { ...userLogin };
    userCheck[e.target.name] = e.target.value;
    setUserLogin(userCheck);
  }
  async function submitUser(e) {
    e.preventDefault();
    let valid = validateData();
    if (valid.error == null) {
      setLoading(true);
      signInWithEmailAndPassword(auth, userLogin.email, userLogin.password)
        .then((res) => {
          setUserLogin(res._tokenResponse);
          navigator("/home");
          localStorage.setItem(
            "token",
            JSON.stringify(res._tokenResponse.idToken)
          );
          saveUserData();
          setLoading(false);
        })
        .catch((err) => {
          return setApiError(err?.message?.split("/")?.[1]?.split(")")?.[0]);
        });
      // let { data } = await axios.post(
      //   "https://sticky-note-fe.vercel.app/signin",
      //   userLogin
      // );
      // if (data.message === "success") {
      //   navigator("/home");
      //   localStorage.setItem("token", data.token);
      //   saveUserData();
      // } else {
      //   setApiError(data.message);
      // }
    } else {
      setValidateError(valid.error.details);
      setLoading(false);
    }
  }

  function validateData() {
    let schema = Joi.object({
      email: Joi.string()
        .required()
        .email({ tlds: { allow: ["com", "net"] } }),
      password: Joi.string()
        .required()
        .pattern(new RegExp(/^[A-Z][a-z]{3,9}[0-9]?$/))
        .message({
          "string.pattern.base":
            "Password should have a minimum length of 4 characters, first letter must be capital and At least 1 numeric character ,{firstName}",
        }),
    });
    return schema.validate(userLogin, { abortEarly: false });
  }

  return (
    <>
      <div className="register">
        <div className="container px-5">
          <h2>registration form</h2>
          <form className="form row" onSubmit={submitUser}>
            <div className="col-12 row mb-3">
              <label htmlFor="email" className="form-labels">
                email :
              </label>
              <input
                type="email"
                onChange={checkUser}
                className="form-inputs"
                name="email"
                id="email"
              />
              {validateError.map((e) => e.context.label === "email") ? (
                <div className="">
                  {validateError.filter((e) => e.context.label === "email")[0]
                    ?.message ? (
                    <div className="w-100 py-1 px-2 mb-0 alert alert-danger text-center mt-2 mx-0">
                      {
                        validateError.filter(
                          (e) => e.context.label === "email"
                        )[0]?.message
                      }
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              ) : (
                ""
              )}
            </div>
            <div className="col-12 row mb-3">
              <label htmlFor="password" className="form-labels">
                password :
              </label>
              <input
                type="password"
                className="form-inputs"
                onChange={checkUser}
                name="password"
                id="password"
              />
              {validateError.map((e) => e.context.label === "password") ? (
                <div className="">
                  {validateError.filter(
                    (e) => e.context.label === "password"
                  )[0]?.message ? (
                    <div className="w-100 py-1 px-2 mb-0 alert alert-danger text-center mt-2 mx-0">
                      {
                        validateError.filter(
                          (e) => e.context.label === "password"
                        )[0]?.message
                      }
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              ) : (
                ""
              )}
            </div>
            <div className="col-12 row">
              {apiError !== "" ? <p className="api-error"> {apiError}</p> : ""}
            </div>
            <div className="row justify-content-end">
              {loading ? (
                <span className="loading">
                  <i className="fa-solid fa-spinner fa-spin fs-5 col-md-2 col-sm-6">
                    {" "}
                  </i>
                </span>
              ) : (
                <button
                  id="login-btn"
                  type="submit"
                  className="col-md-2 col-sm-6"
                >
                  login
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
