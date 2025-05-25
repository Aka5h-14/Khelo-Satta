import { useRef, useContext, useEffect } from "react";
import context from "./MyContext";
import axios from "axios";
axios.defaults.withCredentials = true;
import { Link, useNavigate } from "react-router-dom";
import logo from '../assets/logo.png'
import { checkAuthStatus } from "../utils/auth";

export default function Signin() {
  const { setCash, setIsAuthenticated, API, setOpen, setAlertMsg, setAlertSeverity } = useContext(context);

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
              <div className="mt-2">
                <input
                  ref={passwordInputRef}
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  minLength={6}
                  placeholder="Enter your password (min. 6 characters)"
                  className="block w-full rounded-md border-0 bg-white/5 py-1.5 px-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                />
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
  