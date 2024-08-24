import { toast } from "react-toastify";
import MessagesPanel from "./messagesPanel";
import SelectedDiscussion from "./selectedDiscussion";
import { routes } from "../../../app/router/Routes";
import { Stack } from "@mui/joy";
import { useParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/store/store";
import {
  getallActivityAsync,
  getSingleActivityAsync,
} from "../homepage/subs/posts/postSlice";
import { Chats } from "../../../models/chats";
import {
  HubConnection,
  HubConnectionBuilder,
  LogLevel,
} from "@microsoft/signalr";
import convertToDateTimeAgo from "../../../helpers/convertToDateTimeAgo";

export default function Live() {
  const { id } = useParams<{ id: string }>();
  const { user } = useAppSelector((state) => state.account);
  const { single_activity } = useAppSelector((state) => state.activities);
  const [connection, setConnection] = useState<HubConnection | null>(null);
  const [chats, setChats] = useState(single_activity?.chats ?? ([] as Chats[]));
  const dispatch = useAppDispatch();

  connection &&
    connection.on("ReceiveMessage", (user, message) => {
        let chat: Chats;
        if(typeof(message) === "string"){
            chat = {
                content: message,
                id: 1,
                timeStamp: "just now",
                userEmail: user,
                postId: 1
            };
        }else chat = message as Chats;
        setChats((chats) => [
            ...chats,
            {
              id: chats.length + 1,
              content: chat.content,
              userEmail: chat.userEmail,
              timeStamp: convertToDateTimeAgo(chat.timeStamp),
              postId: chat.postId,
            },
          ]);
    });

  connection &&
    connection.onclose(() => {
      setConnection(null);
      setChats([]);
    });
  const sendMessage = async (message: string) => {
    try {
      connection &&
        (await connection.invoke(
          "SendMessage",
          message,
          user?.email,
          parseInt(id!)
        ));
    } catch (e) {
      console.log(e);
    }
  };

  const closeConnection = async () => {
    try {
      connection && (await connection.stop());
    } catch (e) {
      console.log(e);
    }
  };

  const initConnection = useCallback(async () => {
    try {
      const connection = new HubConnectionBuilder()
        .withUrl("http://localhost:5169/livehub/")
        .configureLogging(LogLevel.Information)
        .build();

      await connection
        .start()
        .then(() => console.log("Connection Established!"));
      await connection.invoke("JoinLiveDiscussion", user?.email, parseInt(id!));
      setConnection(connection);
    } catch (error: any) {
      console.log(error);
    }
  }, [id, user?.email]);

  useEffect(() => {
    if (!single_activity) dispatch(getSingleActivityAsync(+id!));
    console.log("here");
    initConnection();
  }, [dispatch, user?.email, id, single_activity, initConnection]);

  return (
    <Stack
      direction="column"
      justifyContent="space-between"
      spacing={5}
      sx={{ mb: 0.25 }}
    >
      <SelectedDiscussion
        onLeave={async () => {
          await closeConnection();
          toast.success("You have left the chat", { autoClose: 1000 });
          await dispatch(getallActivityAsync(5));
          routes.navigate("/home/posts");
        }}
        contentOnDiscussion={single_activity?.postContent as string}
      />
      <MessagesPanel
        sendMessage={sendMessage}
        id={+id!}
        chats={chats}
        user={user!}
      />
    </Stack>
  );
}
