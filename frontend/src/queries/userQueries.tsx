import { headers } from "./utils";
import { UserLogin, UserRegistration } from "../schemas/userSchemas";

export async function checkUser() {
  const token = localStorage.getItem("jwt_token");
  const response = await fetch("api/auth/current", { 
    method: "GET",
    headers: { ...headers, Authorization: `Bearer ${token}` },
  });
  if (!response.ok) {
    if (response.status === 401) {
      return null;
    }
    throw new Error("Network response was not ok");
  } else {
    const user = await response.json();
    return user;
  }
}

export async function createUser(data: UserRegistration) {
  let body = JSON.stringify({
    name: data.username,
    email: data.email,
    password: data.password,
  });

  const response = await fetch("api/auth/register", {
    method: "POST",
    headers,
    body,
  });

  if (!response.ok) {
    // Handle errors appropriately
    const errorData = await response.json();
    throw new Error(errorData.message || "Registration failed");
  }
}

export async function loginUser(data: UserLogin) {
  let body = JSON.stringify({
    email: data.email,
    password: data.password,
  });

  const response = await fetch("api/auth/login", {
    method: "POST",
    headers,
    body,
  });

  if (!response.ok) {
    // Handle errors appropriately
    const errorData = await response.json();
    throw new Error(errorData.message || "Registration failed");
  }

  return response.json();
}
