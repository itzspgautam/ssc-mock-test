import React from "react";
import { useSelector } from "react-redux";
import { AdminLogin } from "../Pages/Admin";

const AdminProtected = (props) => {
  const { admin } = useSelector((state) => state.Admin);

  return (
    <>
      {admin ? (
        props.children
      ) : (
        <>
          <AdminLogin />
        </>
      )}
    </>
  );
};

export default AdminProtected;
