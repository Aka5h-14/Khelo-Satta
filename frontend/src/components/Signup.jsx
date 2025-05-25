import bcrypt from "bcryptjs"
import { useRef, useContext, useEffect, useState } from "react";
import axios from "axios";
axios.defaults.withCredentials = true;
import { useNavigate, Link } from "react-router-dom";
import context from "./MyContext";
import logo from '../assets/logo.png'
import { checkAuthStatus } from "../utils/auth";

const numSaltRounds = 8;

export default function Signup() {

  const { API, setIsAuthenticated, setOpen,
    setAlertMsg,
    setAlertSeverity, } = useContext(context);

  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const nameInputRef = useRef();
  const phoneNumberInputRef = useRef();
  const passwordInputRef = useRef();
  const emailInputRef = useRef();

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
        
      }
    };

    verifyAuth();
  }, []);

  async function handleSignupForm() {
    const name = nameInputRef.current.value.trim();
    const phoneNumber = phoneNumberInputRef.current.value.trim();
    const password = passwordInputRef.current.value;
    const email = emailInputRef.current.value.trim();

    // Validate all fields
    if (!name) {
      setAlertMsg("Name is required");
      setAlertSeverity("error");
      setOpen(true);
      return;
    }

    if (!phoneNumber) {
      setAlertMsg("Phone number is required");
      setAlertSeverity("error");
      setOpen(true);
      return;
    }

    if (!password) {
      setAlertMsg("Password is required");
      setAlertSeverity("error");
      setOpen(true);
      return;
    }

    if (password.length < 6) {
      setAlertMsg("Password must be at least 6 characters long");
      setAlertSeverity("error");
      setOpen(true);
      return;
    }

    if (!email) {
      setAlertMsg("Email is required");
      setAlertSeverity("error");
      setOpen(true);
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setAlertMsg("Please enter a valid email address");
      setAlertSeverity("error");
      setOpen(true);
      return;
    }

    // Phone number validation (10 digits)
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phoneNumber)) {
      setAlertMsg("Please enter a valid 10-digit phone number");
      setAlertSeverity("error");
      setOpen(true);
      return;
    }

    try {
      const hashedPassword = bcrypt.hashSync(password, numSaltRounds);

      const send = await axios.post(API + "signup", {
        name: name,
        phoneNumber: phoneNumber,
        password: hashedPassword,
        email: email
      });

      if (send.data.success) {
        setAlertMsg("Signup successful");
        setAlertSeverity("success");
        setOpen(true);
        navigate("/");
      } else {
        if (send.data.msg == "enter a new phone number") {
          setAlertMsg("Phone number already exists");
          setAlertSeverity("error");
          setOpen(true);
        } else {
          setAlertMsg(`Signup failed\n${send.data.error.issues[0].message}\n${send.data.error.issues[0].path}`);
          setAlertSeverity("error");
          setOpen(true);
        }
      }
    } catch (error) {
      console.error("Signup error:", error);
      setAlertMsg("Failed to sign up. Please try again.");
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
            Create Your Account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-400">
            Join us and start playing today
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-5" onSubmit={(e) => {
            e.preventDefault();
            handleSignupForm();
          }}>
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="text"
                  className="block text-sm font-medium leading-6 text-gray-300"
                >
                  Name <span className="text-red-500">*</span>
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="text"
                  name="name"
                  type="text"
                  ref={nameInputRef}
                  required
                  placeholder="Enter your full name"
                  className="block w-full rounded-lg border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6 bg-gray-50/95 backdrop-blur-sm transition-all duration-200"
                  minLength={2}
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="tel"
                className="block text-sm font-medium leading-6 text-gray-300"
              >
                Phone Number <span className="text-red-500">*</span>
              </label>
              <div className="mt-2">
                <input
                  id="tel"
                  name="phoneNumber"
                  type="tel"
                  ref={phoneNumberInputRef}
                  required
                  pattern="[0-9]{10}"
                  autoComplete="tel"
                  placeholder="Enter your 10-digit phone number"
                  className="block w-full rounded-lg border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6 bg-gray-50/95 backdrop-blur-sm transition-all duration-200"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="pass"
                className="block text-sm font-medium leading-6 text-gray-300"
              >
                Create Password <span className="text-red-500">*</span>
              </label>
              <div className="mt-2 relative">
                <input
                  id="pass"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  ref={passwordInputRef}
                  required
                  minLength={6}
                  autoComplete="new-password"
                  placeholder="Create a strong password (min. 6 characters)"
                  className="block w-full rounded-lg border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6 bg-gray-50/95 backdrop-blur-sm transition-all duration-200 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-600 hover:text-gray-900 focus:outline-none"
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
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-300"
              >
                Email <span className="text-red-500">*</span>
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  ref={emailInputRef}
                  required
                  autoComplete="email"
                  placeholder="Enter your email address"
                  className="block w-full rounded-lg border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6 bg-gray-50/95 backdrop-blur-sm transition-all duration-200"
                />
              </div>
            </div>

            <div className="mt-6">
              <button
                type="submit"
                className="flex w-full justify-center rounded-lg bg-gradient-to-r from-indigo-600 to-indigo-500 px-3 py-2.5 text-sm font-semibold leading-6 text-white shadow-lg hover:from-indigo-500 hover:to-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-all duration-200 hover:shadow-xl"
              >
                Create Account
              </button>
            </div>
          </form>

          <p className="mt-8 text-center text-sm text-gray-400">
            Already have an account?{' '}
            <Link to="/" className="font-semibold text-indigo-400 hover:text-indigo-300 transition-colors duration-200">
              Sign in instead
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
