import api from "../axiosConfig/api";

export async function checkLogin(email, password) {
  const response = await api.get("/accounts", {
    params: {
      email: email, 
      password: password,
    },
  });

  if (Array.isArray(response.data) && response.data.length === 1) {
    return { success: true, user: response.data[0] };
  } else {
    return { success: false, message: "Sai email hoặc mật khẩu" };
  }
}
