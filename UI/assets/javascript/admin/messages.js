(async () => {
  await isLoggedIn();
  const { user } = localDB.db;
  if (user.role != "admin") return false;
  const response = await apiRequest.get("messages").send({});
  if (response.status === 200) {
    const { messages } = response.body;
    const messageContainer = document.getElementById("message-container");
    console.log(messages);
    messageContainer.innerHTML = messages.reduce(
      (iterator, message) =>
        (iterator += `<div class="flex comment w-full" level="1">
    <div class="flex comment-wrapper">
      <div class="flex comment-body w-full  level="1">
        <div class="flex comment-body-header "">
          <div class="user flex px-2">
            <h5 class="name">${message.name}</h5>
            <small class="px-2">${new Date(
              message.createdAt
            ).toLocaleString()}</small>
          </div>
          <button class="silent button " onclick="replyMessage(
            '${message._id}'
          )">reply</button>
        </div>
        <p>
        ${message.message}
        </p>
        <p><small><b>Reply to:</b> ${message.email}</small></p>
      </div>
    </div>
  </div>`),
      ""
    );
  }
})();
async function replyMessage(id) {
  const reply = prompt();
  if (reply.trim()) {
    const response = await apiRequest
      .setHeaders({ "Content-type": "application/json" })
      .patch(`messages/${id}`)
      .send({
        object: { reply },
      });
    if (response.status == 200) {
      toast("You have successfully replied the message");
    } else {
      console.log(response.error);
      toast("An error occured while replying the message");
    }
  }
}

