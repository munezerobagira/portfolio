(async () => {
  if (localDB.db.user.role == "admin") {
    const { messages } = (
      await apiRequest.get("messages?count=10000&published=false").send({})
    ).body;
    const { projects } = (
      await apiRequest.get("projects?count=10000&published=false").send({})
    ).body;
    const { articles } = (
      await apiRequest.get("articles?count=10000&published=false").send({})
    ).body;
    const { comments } = (
      await apiRequest.get("articles/comments?count=10000").send({})
    ).body;
    const adminArea = document.getElementById("admin-content");

    adminArea.innerHTML = `<div class="flex flex-wrap flex-between">
    <div class="card px-2">
        <h4><span class="color-primary">${articles.length}</span> posts</h4>
    </div>
    <div class="card px-2">
        <h4><span class="color-primary">${comments.length}</span> comments</h4>
    </div>
    <div class="card px-2">
        <h4><span class="color-primary">${projects.length}</span> projects</h4>
    </div>
    <div class="card px-2">
        <h4><span class="color-primary">${messages.length}</span> messages</h4>
    </div>
</div>`;
  }
})();

