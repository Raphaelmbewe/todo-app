/* eslint-disable no-unused-vars */
import React, { useState, useEffect} from "react";
import Modal from "@/components/Modal";
import { Button } from "@/components/Button";
import { TextField } from "@/components/Fields";
import { useDispatch, useSelector } from "react-redux";
import { taskSelector, createTask, clearTask, getTasks } from "@/store/reducers/task";
import { toast } from "react-toastify";

const AddTask = () => {
  const { error, success } = useSelector(taskSelector);
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const dispatch = useDispatch();

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };
  const handleTitleChange = (event) => {
    event.preventDefault();
    setTitle(event.target.value);
  };
  const handleDescChange = (event) => {
    event.preventDefault();
    setDesc(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(
      createTask({
        name: title,
        description: desc,
      })
    );
  };
  

  useEffect(() => {
      dispatch(clearTask());
  }, [dispatch]);

  useEffect(() => {
    if (success) {
      closeModal();
      setDesc('');
      setTitle('');
      dispatch(getTasks())
      toast.success(success);
    }
    if (error) {
      toast.error(error);
    }
  }, [success, error, dispatch]);

  return (
    <div>
      <div
        onClick={openModal}
        className="border border-main_secondary hover:border-main_primary rounded-[10px] py-1 px-4 cursor-pointer"
      >
        Add Task
      </div>
      <Modal
        show={isOpen}
        openModal={openModal}
        closeModal={closeModal}
        title={`ADD TASK`}
        className="z-[10000] inline-block py-6 my-8 w-[500px] overflow-hidden text-left align-top transition-all transform bg-white shadow-xl rounded-[6px]"
      >
         <form onSubmit={handleSubmit} className="flex flex-col px-4 gap-y-4">
          <TextField
            label="Title"
            value={title}
            onChange={handleTitleChange}
            id="title"
            name="title"
            type="text"
            autoComplete="title"
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

          <Button className="w-full mt-3" type="submit">
            Add Task
          </Button>
        </form>
      </Modal>
    </div>
  );
};
export default AddTask;
