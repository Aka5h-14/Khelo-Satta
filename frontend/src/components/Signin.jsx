import { useRef, useContext, useEffect, useState } from "react";
import context from "./MyContext";
import axios from "axios";
axios.defaults.withCredentials = true;
import { Link, useNavigate } from "react-router-dom";
import logo from '../assets/logo.png'
import { checkAuthStatus } from "../utils/auth";

export default function Signin() {
  const { setCash, setIsAuthenticated, API, setOpen, setAlertMsg, setAlertSeverity } = useContext(context);
  const [showPassword, setShowPassword] = useState(false);

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
      }
    };

    verifyAuth();
  }, []);

  async function handleLoginForm(e) {
    if (e) e.preventDefault();
    
    const phoneNumber = phoneNumberInputRef.current.value.trim();
    const password = passwordInputRef.current.value;

    // Phone number validation (10 digits)
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phoneNumber)) {
      setAlertMsg("Please enter a valid 10-digit phone number");
      setAlertSeverity("error");
      setOpen(true);
      return;
    }

    // Password validation (minimum 6 characters)
    if (password.length < 6) {
      setAlertMsg("Password must be at least 6 characters long");
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
        setAlertMsg(send.data.msg || "Invalid credentials");
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

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleLoginForm} className="space-y-6">
            <div>
              <label htmlFor="phoneNumber" className="block text-sm font-medium leading-6 text-gray-200">
                Phone Number
              </label>
              <div className="mt-2">
                <input
                  ref={phoneNumberInputRef}
                  id="phoneNumber"
                  name="phoneNumber"
                  type="tel"
                  autoComplete="tel"
                  required
                  pattern="[0-9]{10}"
                  placeholder="Enter your 10-digit phone number"
                  className="block w-full rounded-md border-0 bg-white/5 py-1.5 px-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-200">
                  Password
                </label>
              </div>
              <div className="mt-2 relative">
                <input
                  ref={passwordInputRef}
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  minLength={6}
                  placeholder="Enter your password (min. 6 characters)"
                  className="block w-full rounded-md border-0 bg-white/5 py-1.5 px-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-300 focus:outline-none"
                >
                  {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              >
                Sign in
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-400">
            Not a member?{' '}
            <Link to="/signup" className="font-semibold leading-6 text-indigo-400 hover:text-indigo-300">
              Sign up now
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
  