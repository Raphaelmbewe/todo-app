/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import routeNames from "@/routes/routeNames.js";
import AddTask from "./AddTask";

const navigation = [
  {
    name: "All Tasks",
    href: routeNames.dashboard.home,
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        className="bi bi-list-task"
        viewBox="0 0 16 16"
      >
        {" "}
        <path
          fillRule="evenodd"
          d="M2 2.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5V3a.5.5 0 0 0-.5-.5H2zM3 3H2v1h1V3z"
        />{" "}
        <path d="M5 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM5.5 7a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1h-9zm0 4a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1h-9z" />{" "}
        <path
          fillRule="evenodd"
          d="M1.5 7a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H2a.5.5 0 0 1-.5-.5V7zM2 7h1v1H2V7zm0 3.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5H2zm1 .5H2v1h1v-1z"
        />{" "}
      </svg>
    ),
    current: true,
  },
  {
    name: "Open Tasks",
    href: routeNames.dashboard.open,
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        className="bi bi-unlock"
        viewBox="0 0 16 16"
      >
        {" "}
        <path d="M11 1a2 2 0 0 0-2 2v4a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h5V3a3 3 0 0 1 6 0v4a.5.5 0 0 1-1 0V3a2 2 0 0 0-2-2zM3 8a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1H3z" />{" "}
      </svg>
    ),
    current: false,
  },
  {
    name: "Completed Tasks",
    href: routeNames.dashboard.completed,
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        className="bi bi-lock"
        viewBox="0 0 16 16"
      >
        {" "}
        <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2zM5 8h6a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z" />{" "}
      </svg>
    ),
    current: false,
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const handleSetActive = (route) => {
    return location.pathname === route;
  };

  return (
    <nav
      aria-label="Sidebar"
      className="flex flex-col  bg-sub_secondary h-screen p-2 border-r border shadow"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="sm:hidden focus:outline-none"
      >
        <svg
          className="h-6 w-6 fill-current"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4 6H20V8H4zM4 11H20V13H4zM4 16H20V18H4z"
            fill="currentColor"
            fillRule="evenodd"
          />
        </svg>
      </button>
      <ul
        className={`${
          isOpen ? "block" : "hidden"
        } sm:flex sm:items-center sm:p-0`}
      >
        <ul className="flex-col sm:flex-row sm:justify-start sm:list-none sm:ml-auto sm:mt-0 sm:w-auto">
          <div className="pb-8 space-y-3 ">
            {navigation.map((item) => (
              <div
                key={item.name}
                className={classNames(
                  handleSetActive(item.href)
                    ? "bg-main_primary text-white"
                    : "text-solid_secondary  hover:bg-white",
                  "rounded-[6px] block relative"
                )}
              >
                <Link
                  to={item.href}
                  state={item.href}
                  aria-current={item.current ? "page" : undefined}
                  className="group flex items-center px-3 py-2 text-sm font-medium"
                >
                  <span
                    className={"flex-shrink-0 mr-3 h-8 w-8"}
                    aria-hidden="true"
                  >
                    {item.icon}
                  </span>
                  <span className="truncate">{item.name}</span>
                </Link>
              </div>
            ))}
          </div>
        </ul>
      </ul>
      <AddTask />
    </nav>
  );
};
export default Sidebar;
