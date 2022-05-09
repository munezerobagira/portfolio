//check if there is an id
const stringQuery = window.location.search;
const searchParams = new URLSearchParams(stringQuery);
const token = searchParams.get("token");
const verifyContainer = document.getElementById("verify");

(async () => {
  if (token) {
    verifyContainer.innerHTML = "Please wait while we verify your account";
    response = await apiRequest
      .patch(`user/profile/verification?token=${token}`)
      .send({});
    if (response.status == 200) {
      toast("Account successful verified");
      window.location.href = "/pages/login";
    }
  } else {
    verifyContainer.innerHTML = `<h1 class="text-center w-full" >The link is broken try again</h1>`;
  }
})();

