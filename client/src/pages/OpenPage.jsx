/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Container from "@/components/Container";
import Accordion from "@/components/Accordion";
import Spinner from "@/components/Spinner";
import { useSelector, useDispatch } from "react-redux";
import { taskSelector, getTasks } from "@/store/reducers/task";

const OpenPage = () => {
  const [isOpen, setOpen] = useState(null);
  const { tasks, isLoading } = useSelector(taskSelector);
  const dispatch = useDispatch();

  const accordionHandler = (index) => {
    setOpen(index === isOpen ? null : index);
  };

  useEffect(() => {
    dispatch(getTasks());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const openTasks = tasks?.filter((task) => task.status === "open");

  return (
    <div className="w-full">
      <div className="z-10 flex flex-col w-full h-full overflow-y-auto px-10 ">
        {isLoading ? (
          <Spinner width={40} height={40} color={"#54D4A0"} />
        ) : (
          <Container className="flex flex-col w-full">
            <p className="text-5xl font-medium tracking-tight text-solid_secondary lg:text-6xl my-8">
              Open Tasks.
            </p>
            {openTasks.length === 0 ? (
              <div className="text-center text-3xl font-medium tracking-tight text-solid_secondary lg:text-4xl my-8">
                NO OPEN TASKS
              </div>
            ) : (
              openTasks?.map((item, index) => (
                <Accordion
                  key={index}
                  title={item.name}
                  id={item.task_id}
                  position={index + 1}
                  content={item.description}
                  isOpen={isOpen === index}
                  toggle={() => accordionHandler(index)}
                />
              ))
            )}
          </Container>
        )}
      </div>
    </div>
  );
};
export default OpenPage;
