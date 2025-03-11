export  async function checkUser () {
  const headers = {
    "Content-Type": "application/json",
  };
  const response = await fetch("api/auth/current", { headers });
  if (!response.ok) {
    if (response.status === 401) {
      return null;
    }
    throw new Error("Network response was not ok");
  } else {
    return response.json();
  }
}