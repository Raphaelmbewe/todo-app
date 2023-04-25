// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import { Button } from "@/components/Button";
import { TextField } from "@/components/Fields";
import { useDispatch, useSelector } from "react-redux";
import routeNames from "@/routes/routeNames.js";
import { useLocation, Navigate, useNavigate } from "react-router-dom";
import { authSelector, loginUser, clearAuth } from "@/store/reducers/auth";
import Spinner from "@/components/Spinner";
import { toast } from "react-toastify";

const Login = () => {
  const { isLoading, error, success, login } = useSelector(authSelector);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const location = useLocation();

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
      loginUser({
        email: email,
        password: password,
      })
    );
  };


  useEffect(() => {
    return () => {
      dispatch(clearAuth());
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  useEffect(() => {
    if (success) {
      setEmail("");
      setPassword("");
      toast.success(success);
    }
    if (error) {
      toast.error(error);
    }
  }, [success, error]);


  if (login) {
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
                Sign in to account
              </Button>
            </form>
            <div className="mt-4 flex space-x-2">
              <span className="text-[16px]">No account?</span>
              <span
                onClick={() => navigate(routeNames.authentication.signup)}
                className="underline text-main_primary  cursor-pointer"
              >
                Sign Up
              </span>
            </div>
          </div>
        </>
      )}
    </section>
  );
};
export default Login;
