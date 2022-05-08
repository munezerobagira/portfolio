const isLoggedIn = async () => {
  if (localDB.db.user.token) {
    response = await apiRequest.get("user/profile").send({});
    if (response.status === 200) {
      const user = response.body.user;
      localDB.updateUser({ ...user });
      return true;
    }

    if (response.status === 400 || response.status === 401) {
      if (response.error) console.log(response.error);
      localDB.resetUser();
      window.location.href = "/pages/login";
      toast("Unknown error  occurred");
    }
  } else {
    window.location.href = "/pages/login";
  }
};

async function logout() {
  const response = await apiRequest.patch("/auth/signout").send({});
  if (response.status === 200) {
    toast("Signed out successfully", 1000);
    localDB.resetUser();
    window.location.href = "/pages/login";
  }
  if (response.status === 400) {
    if (response.error) console.log(response.error);
    return toast("Unknown error  occurred");
  }
}
(async () => {
  await isLoggedIn();

  const userNameElement = document.getElementById("user-name");
  const loginBtn = document.getElementById("logoutBtn");
  loginBtn.addEventListener("click", logout);
  const adminArea = document.getElementById("admin-content");

  const { user } = localDB.db;
  userNameElement.textContent = user.name.trim().split(/\s/)[0];

  if (user.role != "admin")
    adminArea.innerHTML =
      "<h1>You can comment and and reply on the comments.</h1>";

  document.getElementById("sidebar-menu").innerHTML = `  <ul id="sidebar-menu">
  <li class="menu-list-item">
    <a class="silent" href="/pages/admin/posts/">Posts</a>
  </li>
  <li class="menu-list-item">
    <a class="silent" href="/pages/admin/projects/">Project</a>
  </li>
  <li class="menu-list-item">
    <a class="silent" href="/pages/admin/personal/">Edit personal info</a>
  </li>
  <li class="menu-list-item">
    <a href="/pages/admin/enquires/" class="silent">Personal enquiries </a>
  </li>
</ul>`;
})();

