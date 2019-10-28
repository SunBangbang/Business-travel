import axios from "axios";

// 首页统计
export async function getRelease() {
  const result = axios.get(
    `api/requirements/release?target_user_id=1&pageSize=100`
  );
  return result;
}

// 需求发布
export async function release(data) {
  const result = axios.post("api/requirements/release", data);
  return result;
}
