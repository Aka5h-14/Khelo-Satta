import bcrypt from "bcryptjs"
import { useRef, useContext } from "react";
import axios from "axios";
axios.defaults.withCredentials = true;
import { useNavigate } from "react-router-dom";
import context from "./MyContext";
import logo from '../assets/logo.png'

const numSaltRounds = 8;

export default function Signup() {

  const { array, setArray , cash,setCash, money,setMoney ,profit, setProfit, play,setPlay, mines,setMines, gameOver,setgameOver, clickedIndices, setClickedIndices,bet,setBet,isAuthenticated, setIsAuthenticated,API, handleSetArray,uploadAmount,uploadData,  requests  } = useContext(context);

  const navigate= useNavigate();

  const nameInputRef = useRef();
  const phoneNumberInputRef = useRef();
  const passwordInputRef = useRef();
  const emailInputRef = useRef();

  async function handleLoginForm() {
    const name = nameInputRef.current.value;
    const phoneNumber = phoneNumberInputRef.current.value;
    const password = passwordInputRef.current.value;
    const email = emailInputRef.current.value;

    const hashedPassword = bcrypt.hashSync(password, numSaltRounds);

    const send = await axios.post(API+"signup", {
        name: name,
        phoneNumber: phoneNumber,
        password: hashedPassword,
        email: email  
    });

    if(send.data.msg == "user created"){
      navigate("/");
    }
    else{
      alert(`signup failed\n${send.data.msg.issues[0].message}\n${send.data.msg.issues[0].path}`);
    }
  }

  return (
    <>
      {/*
          This example requires updating your template:
  
          ```
          <html class="h-full bg-white">
          <body class="h-full">
          ```
        */}
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-slate-100">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
              alt="Khelo Satta"
              src={logo}
              className="mx-auto h-auto w-40 md:w-60"
            />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Create account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6">
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="text"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Name
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="text"
                  name="name"
                  type="text"
                  ref={nameInputRef}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="tel"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Phone Number
              </label>
              <div className="mt-2">
                <input
                  id="tel"
                  name="phoneNumber"
                  type="tel"
                  ref={phoneNumberInputRef}
                  required
                  autoComplete="tel"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="pass"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Create Password
              </label>
              <div className="mt-2">
                <input
                  id="pass"
                  name="password"
                  type="password"
                  ref={passwordInputRef}
                  required
                  autoComplete="tel"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  ref={emailInputRef}
                  required
                  autoComplete="email"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={(e) => {
                  e.preventDefault();
                  handleLoginForm();
                }}
              >
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
