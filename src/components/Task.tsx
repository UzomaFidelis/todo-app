import { TaskProps } from "../types";
import checkIcon from "../assets/images/icon-check.svg";
import { CSSTransition } from "react-transition-group";
import { useState, useRef, useEffect } from "react";
import "./task.css";

const Task = ({ task, completed, onMark, onDelete, id }: TaskProps) => {
  const [inProp, setInProp] = useState(false);
  const nodeRef = useRef<HTMLDivElement>(null);

  useEffect(() => setInProp(true), []);

  return (
    <CSSTransition
      nodeRef={nodeRef}
      in={inProp}
      timeout={400}
      classNames="task-item"
      onExited={() => console.log("I'm leaving")}
    >
      <div
        className="flex items-center pt-[0.89rem] pb-[0.93rem] bg-light-gray px-[1.2rem] dark:bg-gray-blue-600 md:pt-[1rem] md:pb-[1.04rem] md:px-[1.5rem] relative"
        ref={nodeRef}
      >
        <button
          onClick={onMark}
          className={`inline outline-none w-[1.35rem] h-[1.35rem] rounded-full border-[1px] border-gray-blue-50 overflow-hidden p-[0.2rem] dark:hover:border-bright-blue/80 md:w-[1.6rem] md:h-[1.6rem] md:p-[0.4rem] ${
            completed
              ? "bg-gradient-to-br from-[hsl(192,100%,67%)] to-[hsl(280,87%,65%)]"
              : ""
          }`}
        >
          {completed ? (
            <img src={checkIcon} className="w-full h-full" />
          ) : (
            <></>
          )}
        </button>
        <p
          className={`flex-1 text-[0.7rem] text-left pl-[0.7rem] relative top-[0.2rem] tracking-[0.018em] cursor-pointer md:text-[1.25rem] md:pl-[1.3rem] md:tracking-[-0.05em] ${
            completed
              ? "text-gray-blue-200 line-through dark:text-gray-blue-400"
              : "text-gray-blue-400 hover:text-gray-blue-500 dark:text-gray-blue-200 dark:hover:text-gray-blue-300"
          }`}
        >
          {task}
        </p>
        <button
          onClick={() => {
            setInProp(false);

            setTimeout(() => {
              onDelete(id);
            }, 500);
          }}
          className="inline outline-none w-[0.9rem] h-[0.9rem]"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18">
            <path
              fill="#494C6B"
              fillRule="evenodd"
              d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"
              className="w-full h-full dark:fill-gray-blue-100"
            />
          </svg>
        </button>
      </div>
    </CSSTransition>
  );
};

export default Task;
