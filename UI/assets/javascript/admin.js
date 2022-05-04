if (!localDB.db.user.token) window.location.href = "/pages/login";
async function logout() {
  const response = await apiRequest
    .setHeaders({ authorization: `Bearer ${localDB.db.user.token}` })
    .patch("/auth/signout")
    .send({});
  if (response.status === 200) {
    toast("Signed out successfully", 3000);
    localDB.resetUser();
    window.location.href = "/pages/login";
  }
  if (response.status === 400) {
    if (response.error) console.log(response.error);
    return toast("Unknown error  occurred");
  }
}
document.getElementById("logoutBtn").addEventListener("click", (event) => {
  event.preventDefault();
  logout();
});

