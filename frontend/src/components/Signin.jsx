
import { useRef,useContext } from "react";
import context from "./MyContext";
import axios from "axios";
axios.defaults.withCredentials = true;
import { Link,useNavigate } from "react-router-dom";
import logo from '../assets/logo.png'


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
    if("balance" in send.data){
      navigate("/mines");
      setIsAuthenticated(true);
      let money = send.data.balance;
      setCash(money);
      await new Promise((resolve) => setTimeout(resolve, 800));
      alert("How to play\n1) Enter the bet amount\n2) Click the add bet button\n3) Enter the number of mines\n4) Click the play button\n5) Play the game by clicking on the tiles\n \nYou can cashout the amount using the Cash Out button")
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
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-slate-100">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
              alt="Khelo Satta"
              src={logo}
              className="mx-auto h-auto w-40 md:w-60"
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
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"
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
  