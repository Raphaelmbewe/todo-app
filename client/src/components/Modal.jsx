/* eslint-disable react/prop-types */
import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";

const Modal = ({ show, closeModal, openModal, title, children, className }) => {
  return (
    <>
      <div>
        <button
          type="button"
          onClick={openModal}
          className="px-4 py-2 text-sm font-medium text-white bg-green-500  hover:bg-opacity-50 duration-300 shadow-xl sr-only"
        >
          Open Me
        </button>
      </div>

      <Transition appear show={show} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-[99999] overflow-y-auto"
          onClose={closeModal}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-solid_secondary bg-opacity-[0.5]" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className={className}>
                <Dialog.Title
                  as="div"
                  className="flex flex-row justify-between px-4"
                >
                  <div className="font-[600] text-[18px] leading-[24px] text-[#222]">
                    {title}
                  </div>
                  <div className="cursor-pointer" onClick={closeModal}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-x-lg text-solid_secondary hover:text-main_primary"
                      viewBox="0 0 16 16"
                    >
                      {" "}
                      <path
                        fillRule="evenodd"
                        d="M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0Z"
                      />{" "}
                      <path
                        fillRule="evenodd"
                        d="M2.146 2.146a.5.5 0 0 0 0 .708l11 11a.5.5 0 0 0 .708-.708l-11-11a.5.5 0 0 0-.708 0Z"
                      />{" "}
                    </svg>
                  </div>
                </Dialog.Title>
                <div className="mt-2">{children}</div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};
export default Modal;
