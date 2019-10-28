import axios from "axios";

// 注册
export function register(data) {
  const result = axios.post("api/common/user", data);
  return result;
}

// 登录
export function login(data) {
  const result = axios.post("api/user/login", data);
  return result;
}

// 退出登录
export function logout(data) {
  const result = axios.post("manage/logout", data);
  return result;
}
