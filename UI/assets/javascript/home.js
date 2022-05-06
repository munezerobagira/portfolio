(async () => {
  const keywords = document.getElementById("keywords");
  const ownerImg = document.getElementById("owner-image");
  const ownerInfoDiv = document.getElementById("owner-info");
  const summaryDiv = document.getElementById("owner-summary");
  const aboutDiv = document.getElementById("about-owner");
  const response = await apiRequest.get("/owner").send({});
  if (response.status == 200) {
    const { user } = response.body;
    if (keywords) keywords.textContent = user.keywords;
    if (ownerImg) {
      ownerImg.src = user.profilePic.path;
      ownerImg.alt = user.name;
    }
    if (ownerInfoDiv) ownerInfoDiv.textContent = user.info;
    if (summaryDiv) summaryDiv.textContent = user.summary;
    if (aboutDiv) aboutDiv.textContent = user.about;
  }
})();

