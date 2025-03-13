import { headers } from "./utils";
import { UserLogin, UserRegistration } from "../schemas/userSchemas";

export async function checkUser() {
  const response = await fetch("api/auth/current", { 
    credentials: "include", 
    headers 
  });
  if (!response.ok) {
    if (response.status === 401) {
      return null;
    }
    throw new Error("Network response was not ok");
  } else {
    return response.json();
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
}
