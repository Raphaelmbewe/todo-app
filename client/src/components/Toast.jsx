import toast, { Toaster } from "react-hot-toast";
// eslint-disable-next-line react/prop-types
const Toast = ({ type, message }) => {
  const toastOptions = {
    duration: 8000, // duration in milliseconds
  };

  type === "success" ? toast.success(message, toastOptions) : toast.error(message, toastOptions);
  return (
    <div>
      <Toaster position="top-left"  />
    </div>
  );
};

export default Toast;