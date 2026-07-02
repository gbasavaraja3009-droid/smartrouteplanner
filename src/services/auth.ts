export const demoUser = {
  name: "Demo User",
  email: "demo@smartroute.com",
  password: "demo123",
};

export function login(email: string, password: string) {
  if (
    email === demoUser.email &&
    password === demoUser.password
  ) {
    localStorage.setItem(
      "user",
      JSON.stringify({
        name: demoUser.name,
        email: demoUser.email,
      })
    );
    localStorage.setItem("loggedIn", "true");

    return true;
  }

  return false;
}

export function logout() {
  localStorage.removeItem("user");
}

export function getUser() {
  const user = localStorage.getItem("user");

  return user ? JSON.parse(user) : null;
}