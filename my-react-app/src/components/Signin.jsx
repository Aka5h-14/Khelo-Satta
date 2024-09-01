
import { useRef,useContext } from "react";
import context from "./MyContext";
import axios from "axios";
axios.defaults.withCredentials = true;
import { Link,useNavigate } from "react-router-dom";


export default function Signin() {

  const { array, setArray , cash,setCash, money,setMoney ,profit, setProfit, play,setPlay, mines,setMines, gameOver,setgameOver, clickedIndices, setClickedIndices,bet,setBet,isAuthenticated, setIsAuthenticated,API, handleSetArray,uploadAmount,uploadData,  requests  } = useContext(context);

  const phoneNumberInputRef = useRef();
  const passwordInputRef = useRef();
  const navigate = useNavigate();

  async function handleLoginForm() {

    const phoneNumber = phoneNumberInputRef.current.value;
    const password = passwordInputRef.current.value;

    const send = await axios.post(API+"signin", {

      phoneNumber: phoneNumber,
      password: password
      
    });
    if("msg" in send.data){
      navigate("/mines");
      setIsAuthenticated(true);
      let money = send.data.balance;
      setCash(money);
    }
    else{
      alert("login failed")
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
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
              alt="Khelo Satta"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              className="mx-auto h-10 w-auto"
            />
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Sign in to your account
            </h2>
          </div>
  
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6">
              <div>
                <label htmlFor="tel2" className="block text-sm font-medium leading-6 text-gray-900">
                  Phone Number
                </label>
                <div className="mt-2">
                  <input
                    id="tel2"
                    name="phoneNumber"
                    type="tel"
                    ref={phoneNumberInputRef}
                    required
                    autoComplete="tel"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
  
              <div>
                <label htmlFor="pass2" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
                <div className="mt-2">
                  <input
                    id="pass2"
                    name="password"
                    type="password"
                    ref={passwordInputRef}
                    required
                    autoComplete="tel"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                  Sign in
                </button>
              </div>
            </form>
            <p className="mt-10 text-center text-sm text-gray-500">
            Dont have an account{' '}
            <Link to="/signup" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              Sign Up
            </Link>
          </p>
          </div>
        </div>
      </>
    )
  }
  