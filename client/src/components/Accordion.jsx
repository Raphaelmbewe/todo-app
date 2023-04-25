/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import Modal from "@/components/Modal";
import { Button } from "@/components/Button";
import { SelectField, TextField } from "@/components/Fields";
import { useSelector, useDispatch } from "react-redux";
import {
  taskSelector,
  updateTask,
  deleteTask,
  clearTask,
  getTasks
} from "@/store/reducers/task";
import { toast } from "react-toastify";

const Accordion = ({  id, content, title, position, isOpen, toggle }) => {
  const Edit = () => {
    const { error, success } = useSelector(taskSelector);
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);
    const [name, setName] = useState("");
    const [desc, setDesc] = useState("");
    const [status, setStatus] = useState("");


    const handleNameChange = (event) => {
      event.preventDefault();
      setName(event.target.value);
    };
    const handleDescChange = (event) => {
      event.preventDefault();
      setDesc(event.target.value);
    };
    const handleStatusChange = (event) => {
      event.preventDefault();
      setStatus(event.target.value);
    };

    const closeModal = () => {
      setIsOpen(false);
    };

    const openModal = () => {
      setIsOpen(true);
    };

    const handleSubmit = (event) => {
      event.preventDefault();
      dispatch(
        updateTask(
          {
            name: title || title,
            description: content || desc,
            status: status,
            favorite: true,
          },
          id
        )
      );
      closeModal();
    };

    const handleDeleteTask = () => {
      dispatch(deleteTask(id));
    };

    useEffect(() => {
        dispatch(clearTask());
    }, []);

    useEffect(() => {
      if (success) {
        closeModal();
        dispatch(getTasks())
        toast.success(success);
      }
      if (error) {
       toast.error(error)
      }
    }, [success, error, dispatch]);
    return (
      <div>
        <div
          onClick={openModal}
          className="w-[50px] flex justify-center border border-main_secondary hover:border-main_primary rounded-[5px] mb-4 px-4 cursor-pointer"
        >
          Edit
        </div>
        <Modal
          show={isOpen}
          openModal={openModal}
          closeModal={closeModal}
          title={`EDIT OR DELETE TASK`}
          className="z-[10000] inline-block py-6 my-8 w-[500px] overflow-hidden text-left align-top transition-all transform bg-white shadow-xl rounded-[6px]"
        >
          <form onSubmit={handleSubmit} className="flex flex-col px-4 gap-y-4">
            <TextField
              label="Title"
              value={name}
              onChange={handleNameChange}
              id="name"
              name="name"
              type="text"
              autoComplete="name"
            />
            <TextField
              label="Description"
              value={desc}
              onChange={handleDescChange}
              id="desc"
              name="desc"
              type="text"
              autoComplete="desc"
            />
            <SelectField
              label="Task Status"
              value={status}
              onChange={handleStatusChange}
              id="status"
              name="status"
              type="text"
            >
              <option value="" className="hidden">
                Status* (Please select)
              </option>
              <option value="open">open</option>
              <option value="complete">complete</option>
            </SelectField>

            <div className="flex space-x-10">
              <Button
                className="w-full mt-3"
                onClick={handleDeleteTask}
                type="button"
              >
                Delete
              </Button>
              <Button className="w-full mt-3" type="submit">
                Update
              </Button>
            </div>
          </form>
        </Modal>
      </div>
    );
  };

  return (
    <div
      className={`${
        isOpen ? "border border-main_primary " : "group border-main_secondary"
      } border hover:border-main_primary rounded-[6px] bg-white mb-2`}
    >
      <div
        className={`flex flex-row items-center justify-between px-4 cursor-pointer ease-in-out duration-300 ${
          isOpen ? "h-[60px]" : "h-[50px]"
        }`}
        onClick={toggle}
      >
        <div className="flex flex-row items-center space-x-[10px] group">
          <div
            className={`${
              isOpen
                ? "hover:border-main_primary "
                : "group-hover:border-main_primary "
            } group-hover:border-main_primary flex flex-none border border-solid_secondary w-[24px] h-[24px] rounded-[50%] justify-center items-center`}
          >
            <span className="text-[12px] group-hover:text-main_primary text-solid_secondary flex-none">
              {position}
            </span>
          </div>
          <h3
            className={`${
              isOpen
                ? "hover:text-main_primary"
                : "group-hover:text-main_primary"
            } text-[16px] leading-[20px] font-[600] text-solid_secondary`}
          >
            {title}
          </h3>
        </div>
        {isOpen ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-chevron-down text-main_primary group-hover:text-main_primary ease-in-out duration-300 flex-none"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-chevron-right text-main_secondary group-hover:text-main_primary ease-in-out duration-300 flex-none"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
            />
          </svg>
        )}
      </div>
      {isOpen && (
        <div className="py-1 px-12 mb-4 text-solid_secondary">
          <Edit/>
          {content}
        </div>
      )}
    </div>
  );
};

export default Accordion;
