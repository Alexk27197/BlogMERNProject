import React, { useState, useEffect } from "react";
import Layout from "../sections/Layout";
import { AiOutlineUpload } from "react-icons/ai";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import userDefault from "../assets/user.png";
const Register = () => {
  const [imgSrc, setImgSrc] = useState(null);
  const [file, setFile] = useState(null);
  const [errors, setErrors] = useState({});

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const handleInputField = (e) => {
    setUserData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFileInput = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    const fileReader = new FileReader();

    fileReader.onloadend = () => {
      setImgSrc(fileReader.result);
    };

    if (selectedFile) {
      fileReader.readAsDataURL(selectedFile);
    }
  };

  const fetchRegister = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", userData.name);
      formData.append("password", userData.password);
      formData.append("email", userData.email);
      if (file) {
        formData.append("userAvatar", file);
      } else {
        setFile(userDefault);
      }
      const { data } = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/auth/register`,
        formData
      );

      if (data.success) {
        toast.success("Register successfuly");
        setUserData({
          name: "",
          email: "",
          password: "",
        });
        setFile(null);
        navigate("/login");
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        setErrors(error.response.data.errors);
      }
    }
  };

  return (
    <Layout title={"Register"}>
      <div className="flex flex-col justify-center items-center w-full h-screen">
        <form
          onSubmit={(e) => fetchRegister(e)}
          className="shadow-lg flex flex-col w-[300px] min-h-min p-4 pb-9 gap-4 border border-neutral-400 rounded-md px-4"
        >
          <h1 className="text-center text-2xl m-2 my-4 sm:text-3xl sm:m-4">
            Registration
          </h1>

          <div className="flex flex-col justify-center items-center gap-1">
            <input
              type="text"
              onChange={handleInputField}
              name="name"
              placeholder="Enter Name"
              className="border focus:border-zinc-900 focus:border-2 sm:text-lg outline-none px-2 py-1 border-zinc-900 rounded-md"
            />
            {errors && <div className="text-red-500">{errors.nameError}</div>}
          </div>
          <div className="flex flex-col justify-center items-center gap-1">
            <input
              onChange={handleInputField}
              name="password"
              type="password"
              placeholder="Enter Password"
              className="border focus:border-zinc-900 focus:border-2 sm:text-lg outline-none px-2 py-1 border-zinc-900 rounded-md"
            />
            {errors && (
              <div className="text-red-500">{errors.passwordError}</div>
            )}
          </div>
          <div className="flex flex-col justify-center items-center gap-1">
            <input
              onChange={handleInputField}
              name="email"
              type="email"
              placeholder="Enter Email"
              className="border focus:border-zinc-900 focus:border-2 sm:text-lg outline-none px-2 py-1 border-zinc-900 rounded-md"
            />
            {errors && <div className="text-red-500">{errors.emailError}</div>}
          </div>
          <div className="flex justify-center items-center gap-2 bg-slate-300 hover:bg-slate-200 cursor-pointer">
            <label
              htmlFor="avatar"
              className="my-2 flex flex-col justify-center items-center gap-2 "
            >
              <span>Upload Avatar</span>
              <AiOutlineUpload size={24} />
              <input
                onChange={(e) => handleFileInput(e)}
                type="file"
                id="avatar"
                hidden
              />
            </label>
          </div>
          {imgSrc && (
            <div className="flex justify-center items-center">
              <img src={imgSrc} width={80} height={80} alt="Uploaded Preview" />
            </div>
          )}

          <button
            type="submit"
            className="bg-amber-400 hover:bg-amber-300 p-2 rounded-md text-lg shadow-md"
          >
            Register
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Register;
