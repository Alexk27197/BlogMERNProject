import React, { useState, useEffect } from "react";
import Layout from "../sections/Layout";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, reset } from "../redux/features/auth/authSlice";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [errors, setErrors] = useState({});
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const { status, isLoading, user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleInputField = (e) => {
    setUserData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  useEffect(() => {
    if (status) {
      dispatch(reset());
      toast.success("Login successfuly");
      setUserData({
        email: "",
        password: "",
      });

      navigate("/");
    }
  }, [status]);

  useEffect(() => {
    console.log("user", user);
  }, [user]);

  const fetchLogin = async (e) => {
    e.preventDefault();
    try {
      dispatch(
        loginUser({ email: userData.email, password: userData.password })
      );
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        setErrors(error.response.data.errors);
      }
    }
  };

  return (
    <Layout title={"Login"}>
      <div className="flex flex-col justify-center items-center w-full h-screen">
        <form
          onSubmit={(e) => fetchLogin(e)}
          className="shadow-lg flex flex-col w-[300px] min-h-min p-4 pb-9 gap-4 border border-neutral-400 rounded-md px-4"
        >
          <h1 className="text-center text-2xl m-2 my-4 sm:text-3xl sm:m-4">
            Login
          </h1>

          <div className="flex flex-col justify-center items-center gap-1">
            <input
              onChange={handleInputField}
              name="email"
              type="email"
              placeholder="Enter Email"
              className="w-full border focus:border-zinc-900 focus:border-2 sm:text-lg outline-none px-2 py-1 border-zinc-900 rounded-md"
            />
            {errors && (
              <div className="text-red-500">
                {errors.wrongEmail || errors.emailError}
              </div>
            )}
          </div>

          <div className="flex flex-col justify-center items-center gap-1">
            <input
              onChange={handleInputField}
              name="password"
              type="password"
              placeholder="Enter Password"
              className="w-full border focus:border-zinc-900 focus:border-2 sm:text-lg outline-none px-2 py-1 border-zinc-900 rounded-md"
            />
            {errors && (
              <div className="text-red-500">
                {errors.wrongPassword || errors.passwordError}
              </div>
            )}
          </div>

          <button
            type="submit"
            className="bg-amber-400 hover:bg-amber-300 p-2 rounded-md text-lg shadow-md"
          >
            Login
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Login;
