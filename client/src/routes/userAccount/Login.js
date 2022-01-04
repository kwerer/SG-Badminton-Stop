import React, { useEffect } from "react";
import axiosInstance from "../../commonComponents/AxiosInstance.js";

function Login() {
  async function getData() {
    const response = await axiosInstance.get(
      "login"
    );
  }
  useEffect(() => {
    getData();
  }, []);
  return <div>login page</div>;
}

export default Login;
