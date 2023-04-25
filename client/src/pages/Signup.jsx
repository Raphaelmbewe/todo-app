/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Button } from "@/components/Button";
import { TextField } from "@/components/Fields";
import { useDispatch, useSelector } from "react-redux";
import routeNames from "@/routes/routeNames.js";
import { useLocation, Navigate, useNavigate } from "react-router-dom";
import { authSelector, signUpUser, clearAuth } from "@/store/reducers/auth";
import Spinner from "@/components/Spinner";
import { toast } from "react-toastify";

const SignUp = () => {
  const { isLoading, error, success, signup } = useSelector(authSelector);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const location = useLocation();

  const handleNameChange = (event) => {
    event.preventDefault();
    setName(event.target.value);
  };
  const handleEmailChange = (event) => {
    event.preventDefault();
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    event.preventDefault();
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(
      signUpUser({
        name: name,
        email: email,
        password: password,
      })
    );
  };

  useEffect(() => {
    return () => {
      dispatch(clearAuth());
    };
  }, [dispatch]);


  useEffect(() => {
    if (success) {
      setName("");
      setEmail("");
      setPassword("");
      toast.success(success)
    }
    if (error) {
      toast.error(error);
    }
  }, [success, error]);

  if (!isLoading && signup) {
    return (
      <Navigate
      to={location.state?.from?.pathname || routeNames.dashboard.home}
      state={{ from: location }}
        replace
      />
    );
  }
  return (
    <section className="mx-auto flex w-full max-w-2xl flex-col px-4 sm:px-6">
      {isLoading ? (
        <div className="flex justify-center items-center h-screen w-full">
          <Spinner width={50} height={50} color={"#54D4A0"} />
        </div>
      ) : (
        <>
          <div className="-mx-4 mt-10 flex-auto bg-white py-10 px-4 shadow-xl shadow-gray-900/10 sm:mx-0 sm:flex-none sm:rounded-[6px] sm:p-24">
            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                <TextField
                  value={name}
                  onChange={handleNameChange}
                  label="Full Name"
                  id="name"
                  name="name"
                  type="name"
                  autoComplete="name"
                  required
                />
                <TextField
                  value={email}
                  onChange={handleEmailChange}
                  label="Email address"
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                />
                <TextField
                  value={password}
                  onChange={handlePasswordChange}
                  label="Password"
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                />
              </div>
              <Button type="submit" variant="solid" className="mt-8 w-full">
                Create an account
              </Button>
            </form>
            <div className="mt-4 flex space-x-2">
              <span className="text-[16px]">Already have an account?</span>
              <span
                onClick={() => navigate(routeNames.landing)}
                className="underline text-main_primary  cursor-pointer"
              >
                Login
              </span>
            </div>
          </div>
        </>
      )}
    </section>
  );
};
export default SignUp;
