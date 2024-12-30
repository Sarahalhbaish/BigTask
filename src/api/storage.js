import instance from "./index.js";

async function getCategories() {
  const data = await instance.get("/category");
  console.log("data", data);
  return data;
}
async function getRestaurants() {
  const data = await instance.get("/resturant");
  console.log("data", data);
  return data;
}

async function getRestaurantById(id) {
  const data = await instance.get(`/resturant/${id}`);
  console.log("data", data);
  return data;
}

async function addItem(id, newData) {
  console.log("Im here !");
  const data = await instance.get(`resturant/${id}/items`, newData);
  console.log("data", data);
  return data;
}

async function getItem(id) {
  const data = await instance.get(`/item/${id}`);
  console.log("deletePostById", data);
  return data;
}

async function apiLogin(newData) {
  const data = await instance.post(`/auth/login`, newData);
  console.log("data", data);
  return data;
}
async function register(newData) {
  const data = await instance.post(`/auth/register`, newData);
  console.log("data", data);
  return data;
}

async function getProfile() {
  const token = await getAuthToken();
  console.log("Im here !");
  const data = await instance.get(`/auth/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log("data", data);
  return data;
}

async function getAuthToken() {
  const token = await AsyncStorage.getItem("token");
  return token;
}


export {
  getCategories,
  getRestaurants,
  getRestaurantById,
  addItem,
  getItem,
  apiLogin,
  register,
  getProfile,
};
