import { useRef, useContext, useState, useEffect } from "react";
import context from "./MyContext";
import axios from "axios";
axios.defaults.withCredentials = true;
import { Link, useNavigate } from "react-router-dom";
import logo from '../assets/logo.png'
import { checkAuthStatus } from "../utils/auth";
import { paisaToRupees } from "../utils/money";

export default function Signin() {
  const [isLoading, setIsLoading] = useState(true);

  const { setCash, setgameOver, setIsAuthenticated, API, setOpen, setAlertMsg, setAlertSeverity } = useContext(context);

  const phoneNumberInputRef = useRef();
  const passwordInputRef = useRef();
  const navigate = useNavigate();

  // Check authentication status when component mounts
  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const isAuth = await checkAuthStatus(API);
        if (isAuth.isAuthenticated) {
          setIsAuthenticated(true);
          navigate('/mines');
        }
      } catch (error) {
        console.error('Auth verification error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    verifyAuth();
  }, []);

  async function handleLoginForm() {
    const phoneNumber = phoneNumberInputRef.current.value.trim();
    const password = passwordInputRef.current.value;

    if (!phoneNumber || !password) {
      setAlertMsg("Please fill in all fields");
      setAlertSeverity("error");
      setOpen(true);
      return;
    }

    try {
      const send = await axios.post(API+"signin", {
        phoneNumber: phoneNumber,
        password: password
      });
      
      if("balance" in send.data){
        setCash(send.data.balance);
        setIsAuthenticated(true);
        setAlertMsg("Successfully signed in");
        setAlertSeverity("success");
        setOpen(true);
        navigate("/mines");
      } else {
        setAlertMsg("Invalid credentials");
        setAlertSeverity("error");
        setOpen(true);
      }
    } catch (error) {
      console.error('Login error:', error);
      setAlertMsg("Failed to sign in. Please try again.");
      setAlertSeverity("error");
      setOpen(true);
    }
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-gradient-to-br from-gray-900 to-gray-800">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            alt="Khelo Satta"
            src={logo}
            className="mx-auto h-auto w-32 md:w-48 drop-shadow-xl"
          />
          <h2 className="mt-8 text-center text-2xl font-bold leading-9 tracking-tight bg-gradient-to-r from-indigo-200 to-indigo-100 bg-clip-text text-transparent">
            Welcome Back
          </h2>
          <p className="mt-2 text-center text-sm text-gray-400">
            Sign in to continue playing
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6">
            <div>
              <label htmlFor="tel2" className="block text-sm font-medium leading-6 text-gray-300">
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
                  className="block w-full rounded-lg border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6 bg-gray-50/95 backdrop-blur-sm transition-all duration-200"
                  placeholder="Enter your phone number"
                />
              </div>
            </div>

            <div>
              <label htmlFor="pass2" className="block text-sm font-medium leading-6 text-gray-300">
                Password
              </label>
              <div className="mt-2">
                <input
                  id="pass2"
                  name="password"
                  type="password"
                  ref={passwordInputRef}
                  required
                  autoComplete="current-password"
                  className="block w-full rounded-lg border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6 bg-gray-50/95 backdrop-blur-sm transition-all duration-200"
                  placeholder="Enter your password"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-lg bg-gradient-to-r from-indigo-600 to-indigo-500 px-3 py-2.5 text-sm font-semibold leading-6 text-white shadow-lg hover:from-indigo-500 hover:to-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-all duration-200 hover:shadow-xl"
                onClick={(e) => {
                  e.preventDefault();
                  handleLoginForm();
                }}
              >
                Sign in
              </button>
            </div>
          </form>
          <p className="mt-8 text-center text-sm text-gray-400">
            Don't have an account?{' '}
            <Link to="/signup" className="font-semibold text-indigo-400 hover:text-indigo-300 transition-colors duration-200">
              Create one now
            </Link>
          </p>
        </div>
      </div>
    </>
  )
}
  