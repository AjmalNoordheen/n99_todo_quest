import React, { useRef } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { IconButton } from "@mui/material";
import CachedIcon from "@mui/icons-material/Cached";

const LoginForm = ({
  submitForm,
  validateForm,
  valid,
  passValid,
  eye,
  setEye,
  spin,
  location,
}) => {
  return (
    <div
      className="w-3/4 h-[2.8rem] flex cursor-pointer hover:scale-105 hover:duration-300 bg-gradient-to-r
     from-red-500 via-orange-700 to-rose-700 justify-center items-center bg-[#7370f8]"
    >
      <p
        onClick={submitForm}
        className="text-center font-bold w-full text-white"
      >
        {spin ? (
          <CachedIcon className="animate-spin" />
        ) : location == "/signup" ? (
          "Register"
        ) : (
          "Login"
        )}
      </p>
    </div>
  );
};

export default LoginForm;
