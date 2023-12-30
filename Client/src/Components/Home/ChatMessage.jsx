// ChatMessage.jsx
import React from "react";
import { IconButton } from "@mui/material";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";

function ChatMessage({ email, sender, message, onDelete }) {
  return (
    <>
      {sender == email ? (
        <div className="col-start-7 col-end-13 p-3 rounded-lg">
          <div className="flex items-center justify-start flex-row-reverse">
            <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
              <img
                src="771198_man_512x512.png"
                alt="Avatar"
                className="h-full w-full rounded-full"
              />
            </div>
            <div className="relative mr-3 w-2/3 md:w-1/3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl">
              <div className="break-words">
                {message ? message.message : ""}
              </div>
              <small className="text-xs pt-4 text-gray-400">
                {" "}
                {new Date(message?.createdAt).toLocaleString("en-US", {
                  hour: "numeric",
                  minute: "numeric",
                  hour12: true,
                })}
              </small>
              <IconButton onClick={onDelete} className="float-end">
                <DeleteSweepIcon />
              </IconButton>
            </div>
          </div>
        </div>
      ) : (
        <div className="col-start-1 col-end-7 p-3 rounded-lg">
          <div className="flex flex-row gap-x-3 items-center">
            <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
              <img
                src="771198_man_512x512.png"
                alt="Avatar"
                className="h-full w-full rounded-full"
              />
            </div>
            <div className="relative mr-3 w-2/3 md:w-1/3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl">
              <div className="break-words">
                {message ? message.message : ""}
              </div>
              <small className="text-xs text-gray-400">
                {" "}
                {new Date(message?.createdAt).toLocaleString("en-US", {
                  hour: "numeric",
                  minute: "numeric",
                  hour12: true,
                })}
              </small>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ChatMessage;
