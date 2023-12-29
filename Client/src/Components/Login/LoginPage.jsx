import React, { useState } from "react";
import LoginForm from "./LoginForm";
import InputField from "./InputField";
import toast from "react-hot-toast";
import CachedIcon from "@mui/icons-material/Cached";
import { axiosInstance } from "../../Axios/UserAxios";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Login } from "../../Redux/Slice";

function LoginPage() {
  const [spin, setSpin] = useState(false);
  const [valid, setValid] = useState(null);
  const [passValid, setPassvalid] = useState(null);
  const [eye, setEye] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const dispatch = useDispatch('')

  const location = useLocation().pathname;
  const navigate = useNavigate("");
  //======= EMAIL VALIDATION =========

  const validateForm = (value) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    setEmail(value);
    try {
      if (emailRegex.test(value)) {
        setValid(true);
      } else {
        if (value == "") {
          setValid(null);
        } else {
          setValid(false);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  //======= PASSWORD VALIDATION =========
  const validPassword = (value) => {
    try {
      setPassword(value);
      let passRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z0-9!@#$%^&*]{6,100}$/;
      if (passRegex.test(value)) {
        setPassvalid(true);
      } else {
        console.log(value);
        if (value == "") {
          setPassvalid(null);
        } else {
          setPassvalid(false);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  //======= FORM SUBMISSION FUNCTION =========
  const handleSubmit = async () => {
    try {
      setSpin(true);
      const passRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z0-9!@#$%^&*]{6,100}$/;
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

      if (!passRegex.test(password) || !emailRegex.test(email)) {
        return toast.error("Invalid form submission");
      }

      const endpoint = location === "/signup" ? "/submitSignup" : "/submitLogin";

      const res = await axiosInstance.post(endpoint, {
        email,
        password,
      });

      res.data.status
        ? location === "/signup"
          ? (toast.success("Successfully Registered. Login to continue"),
            navigate("/"))
          : (toast.success("Successfully Logged-in"),dispatch(Login({email:email})),navigate("/home"))
        : toast.error(res.data.message);
    } catch (error) {
      console.error(error);
    } finally {
      setSpin(false);
      setEmail('')
      setPassword('')
    }
  };

  return (
    <div className="w-screen h-screen flex bg-[#1a1a1a] justify-center items-center">
      <div className="w-screen h-[65%]   sm:w-[85%] md:w-6/12 sm:h-4/5 lg:h-4/5 xl:h-4/5  lg:w-[30%]  bg-black flex flex-col items-center rounded">
        <h1 className="font-bold text-slate-200 py- mt-6 font-insta text-3xl">
          Let's Chat
        </h1>
        <div className="w-full h-2/3 font-semibold flex flex-col gap-y-4 justify-center items-center">
          <small className="font-secondFont  text-slate-400">
            {location == "/signup"
              ? "Create your Account"
              : "Sign in and use more feauters"}
          </small>
          <InputField
            type="email"
            value={email}
            onChange={(e) => validateForm(e.target.value)}
            valid={valid}
            setEye={setEye}
            eye={eye}
          />
          <InputField
            type="password"
            value={password}
            onChange={(e) => validPassword(e.target.value)}
            valid={passValid}
            setEye={setEye}
            eye={eye}
          />
          {passValid == false ? (
            <span className="text-red-400 text-xs  overflow-x-clip">
              must constain 6 length number 1-9 ,capital A-Z ,small a-z letters
            </span>
          ) : (
            ""
          )}
          <LoginForm
            submitForm={handleSubmit}
            validateForm={validateForm}
            valid={valid}
            passValid={passValid}
            eye={eye}
            setEye={setEye}
            spin={spin}
            location={location}
          />
          <div className="w-3/4  flex justify-between items-center">
            <span className="w-[45%] h-[0.5px] bg-white"></span>
            <small className="font-insta mb-[2px] text-white">or</small>
            <span className="w-[45%] h-[0.5px] bg-white"></span>
          </div>
        </div>
        <div className="w-3/4 h-fit cursor-pointer py-1 overflow-hidden flex border justify-center gap-2 mt-1">
          <small
            onClick={() =>
              location === "/signup" ? navigate("/") : navigate("/signup")
            }
            className="cursor-pointer pb-1 mt-1 ml-2 text-slate-500"
          >
            {location === "/signup"
              ? "Already have an account ?"
              : "Don't have an account ?"}

            <span className="ml-2 text-blue-600 font-bold">
              {location === "/signup" ? "Login" : "Sign-Up"}
            </span>
          </small>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
