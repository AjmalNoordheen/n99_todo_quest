import React from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { IconButton } from "@mui/material";

const InputField = ({ type, value, onChange, valid, setEye, eye }) => (
  <form
    action=""
    className="w-full flex flex-col justify-center items-center h-auto"
  >
    <div
      className={
        valid
          ? "w-3/4 h-[2.8rem] border border-green-600 bg-black relative"
          : valid === false
          ? "w-3/4 h-[2.8rem] border border-red-600 bg-black relative"
          : "w-3/4 h-[2.8rem] bg-black relative"
      }
    >
      <input
        onChange={onChange}
        type={type === "password" ? (eye ? "text" : "password") : "email"}
        value={value}
        className={
          valid
            ? "w-full h-full bg-[#404447] outline-none border border-green-600 text-[#dddde0] text-start pl-2"
            : valid === false
            ? "w-full h-full bg-[#404447] outline-none border border-red-600 text-[#dddde0] text-start pl-2"
            : "w-full h-full bg-[#404447] outline-none text-[#dddde0] text-start pl-2"
        }
        placeholder={type === "password" ? "Password" : "Email"}
      />
      {type === "password" && (
        <IconButton
          onClick={() => setEye((prev) => !prev)}
          className="absolute bottom-[2.5rem] left-[87%]"
        >
          {eye ? (
            <VisibilityOffIcon fontSize="small" className="text-slate-400" />
          ) : (
            <VisibilityIcon fontSize="small" className="text-slate-400" />
          )}
        </IconButton>
      )}
    </div>
  </form>
);

export default InputField;
