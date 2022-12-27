import { useEffect, useState } from "react";
import LoadingBall from "../../../components/LoadingBall";
import apiRequest from "../../../util/apiRequest";
import toast from "../../../util/toast";

function Messages() {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
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
        console.log(response.body.error);
        toast("An error occured while replying the message");
      }
    }
  }
  useEffect(() => {
    (async () => {
      const response = await apiRequest.get("messages").send({});
      setIsLoading(false);
      if (response.status === 200) {
        let { messages } = response.body;
        setMessages(messages);
      }
    })();
  });
  if (isLoading) return <LoadingBall />;

  return (
    <div>
      <div className="flitter">
        <form className="flex width-full">
          <input type="text" className="control mr-1" />
          <button className="button">Search</button>
        </form>
      </div>
      <h1>Messages</h1>
      <div className="comment-group flex-row flex-wrap" id="message-container">
        {messages.map((message) => (
          <>
            <div className="flex comment w-full">
              <div className="flex comment-wrapper">
                <div className="flex comment-body w-full">
                  <div className="flex comment-body-header ">
                    <div className="user flex px-2">
                      <h5 className="name">{message.name}</h5>
                      <small className="px-2">
                        {new Date(message.createdAt).toLocaleString()}
                      </small>
                    </div>
                    <button
                      className="silent button "
                      onClick={() => replyMessage(message._id)}
                    >
                      reply
                    </button>
                  </div>
                  <p>{message.message}</p>
                  <p>
                    <small>
                      <b>Reply to:</b> {message.email}
                    </small>
                  </p>
                </div>
              </div>
            </div>
          </>
        ))}
      </div>
    </div>
  );
}

export default Messages;

