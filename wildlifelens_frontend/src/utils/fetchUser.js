export const fetchUser = () => {
  const userInfo =
    JSON.parse(localStorage.getItem("user")) !== "undefined"
      ? JSON.parse(localStorage.getItem("user"))
      : localStorage.clear();

  return userInfo;
}
