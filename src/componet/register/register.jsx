import React, { useState } from "react";
import "./register.css";
import Joi from "joi";
import { useNavigate } from "react-router-dom";
import { auth } from "../Config/Firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import axios from "axios";
export default function Register() {
  let [userRegister, setUserRegister] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    age: "",
  });
  function addUser(e) {
    let myUser = { ...userRegister };
    myUser[e.target.name] = e.target.value;
    setUserRegister(myUser);
  }
  let navigator = useNavigate();
  let [loading, setLoading] = useState(false);
  let [apiError, setApiError] = useState("");
  let [validateError, setValidateError] = useState([]);

  async function submitUser(e) {
    e.preventDefault();
    let valid = validateData();
    if (valid.error == null) {
      setLoading(true);
      createUserWithEmailAndPassword(
        auth,
        userRegister.email,
        userRegister.password
      )
        .then((res) => res && navigator("/login"))
        .catch((err) => {
          return setApiError(err.message.split(" ").splice(2, 1));
        });
      // let data = await axios.post(
      //   "https://sticky-note-fe.vercel.app/signup",
      //   userRegister
      // );
      setLoading(false);
      // if (data.message === "success") {
      //   navigator("/login");
      // } else {
      //   setApiError(data.data.message);
      // }
    } else {
      setValidateError(valid.error.details);
      setLoading(false);
    }
  }
  console.log(apiError);

  function validateData() {
    let schema = Joi.object({
      first_name: Joi.string().required().min(3).max(10),
      last_name: Joi.string().required().min(3).max(10),
      email: Joi.string()
        .required()
        .email({ tlds: { allow: ["com", "net"] } }),
      age: Joi.number().required().min(16).max(60),
      password: Joi.string()
        .required()
        .pattern(new RegExp(/^[A-Z][a-z]{3,9}[0-9]?$/))
        .message({
          "string.pattern.base":
            "Password should have a minimum length of 4 characters, first letter must be capital and At least 1 numeric character ,{firstName}",
        }),
    });
    return schema.validate(userRegister, { abortEarly: false });
  }

  return (
    <>
      <div className="register">
        <div className="container px-5">
          <h2>registration form</h2>
          <form className="form row" onSubmit={submitUser}>
            <div className="col-12 row mb-3">
              <label htmlFor="first_name" className="form-labels">
                first name :
              </label>
              <input
                type="text"
                onChange={addUser}
                className="form-inputs"
                name="first_name"
                id="first_name"
              />
              {validateError.map((e) => e.context.label === "first_name") ? (
                <div className="">
                  {validateError.filter(
                    (e) => e.context.label === "first_name"
                  )[0]?.message ? (
                    <div className="w-100 py-1 px-2 mb-0 alert alert-danger text-center mt-2 mx-0">
                      {
                        validateError.filter(
                          (e) => e.context.label === "first_name"
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
              <label htmlFor="last_name" className="form-labels">
                last name :
              </label>
              <input
                type="text"
                onChange={addUser}
                className="form-inputs"
                name="last_name"
                id="last_name"
              />
              {validateError.map((e) => e.context.label === "last_name") ? (
                <div className="">
                  {validateError.filter(
                    (e) => e.context.label === "last_name"
                  )[0]?.message ? (
                    <div className="w-100 py-1 px-2 mb-0 alert alert-danger text-center mt-2 mx-0">
                      {
                        validateError.filter(
                          (e) => e.context.label === "last_name"
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
              <label htmlFor="email" className="form-labels">
                email :
              </label>
              <input
                type="email"
                onChange={addUser}
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
                onChange={addUser}
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
            <div className="col-12 row mb-3">
              <label htmlFor="age" className="form-labels">
                age :
              </label>
              <input
                type="age"
                onChange={addUser}
                className="form-inputs"
                name="age"
                id="age"
              />
              {validateError.map((e) => e.context.label === "age") ? (
                <div className="">
                  {validateError.filter((e) => e.context.label === "age")[0]
                    ?.message ? (
                    <div className="w-100 py-1 px-2 mb-0 alert alert-danger text-center mt-2 mx-0">
                      {
                        validateError.filter(
                          (e) => e.context.label === "age"
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
                <button id="signup" type="submit" className="col-md-2 col-sm-6">
                  sign up
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
