import axios from "axios";
const types = {
  ADMIN_LOGIN: "ADMIN_LOGIN",
  SET_ERROR: "SET_ERROR",
};

const adminLogin = (id, password) => async (dispatch) => {
  if (!id) {
    dispatch({
      type: types.SET_ERROR,
      payload: "Please enter username.",
    });
    return;
  }

  if (!password) {
    dispatch({
      type: types.SET_ERROR,
      payload: "Please enter password.",
    });
    return;
  }

  try {
    const loginRes = await axios.post("/api/v1/admin/login", { id, password });
    localStorage.setItem("admin_token", loginRes.data.token);
    dispatch({
      type: types.ADMIN_LOGIN,
      payload: loginRes.data.admin,
    });
  } catch (error) {
    dispatch({
      type: types.SET_ERROR,
      payload: error.response.data.message,
    });
  }
};

const verifyToken = async (token) => {
  if (!token) return { status: false, message: "Please provide token." };
  try {
    let tokenResponse = await axios.post(
      "/api/v1/admin/verify",
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return { status: true, admin: tokenResponse.data.admin };
  } catch (error) {
    localStorage.clear("token");
    return { status: false, message: "Connection to server failed." };
  }
};

const AdminAction = { adminLogin, verifyToken, types };
export default AdminAction;
