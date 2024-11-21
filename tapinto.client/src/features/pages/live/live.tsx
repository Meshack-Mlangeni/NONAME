import { toast } from "react-toastify";
import MessagesPanel from "./messagesPanel";
import SelectedDiscussion from "./selectedDiscussion";
import { routes } from "../../../app/router/Routes";
import { Stack } from "@mui/joy";
import { useParams } from "react-router-dom";
import { useCallback, useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/store/store";

import { Chats } from "../../../models/chats";
import {
  HubConnection,
  HubConnectionBuilder,
  LogLevel,
} from "@microsoft/signalr";
import { getallActivityAsync } from "../homepage/subs/activity/activitySlice";

export default function Live() {
  const { id } = useParams<{ id: string }>();
  const { user } = useAppSelector((state) => state.account);
  const { single_activity } = useAppSelector((state) => state.activities);
  const main_stack = useRef<HTMLDivElement>(null);
  const [connection, setConnection] = useState<HubConnection | null>(null);
  const [chats, setChats] = useState<Chats[]>([]);
  const dispatch = useAppDispatch();

  const sendMessage = async (message: string) => {
    try {
      connection &&
        (await connection
          .invoke("SendMessage", message, user?.email, parseInt(id!))
          .then(() => {
            setChats([
              ...chats,
              {
                content: message,
                chatHistoryId: chats.length + 1,
                fullNames: user?.firstName + " " + user?.lastName,
                timeStamp: new Date().toString(),
                userEmail: user?.email ?? "No Email",
                activityId: +id!,
              },
            ]);
          }));
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
    const connection = new HubConnectionBuilder()
      .withUrl("http://localhost:5169/live")
      .configureLogging(LogLevel.Information)
      .withServerTimeout(Number.MAX_SAFE_INTEGER) //for now
      .build();
    setConnection(connection);
    await connection.start().then(() => console.log("Connection Established!"));
    console.log(id);
    await connection
      .invoke("JoinLiveDiscussion", user?.email.toString(), +id!)
      .then(
        (f) => console.log(f),
        (r) => console.log(r)
      );
    connection.on("ReceiveMessage", (user, message) => {
      let chat: Chats;
      if (typeof message === "string") {
        chat = {
          content: message,
          chatHistoryId: 1,
          timeStamp: "just now",
          userEmail: user,
          activityId: 1,
          fullNames: user,
        };
      } else chat = message as Chats;
      setChats((chats) => [
        ...chats,
        {
          chatHistoryId: chats.length + 1,
          content: chat.content,
          userEmail: chat.userEmail,
          timeStamp: chat.timeStamp,
          activityId: chat.activityId,
          fullNames: chat.fullNames,
        },
      ]);
      console.log("chats from receive: ", chats);
      document.documentElement.scrollTop! =
        document.documentElement.offsetHeight;
    });

    return () => connection.stop();
  }, [chats, id, user?.email]);

  useEffect(() => {
    initConnection();
  }, [dispatch, user?.email, id, initConnection]);

  return (
    <Stack
      direction="column"
      justifyContent="space-between"
      ref={main_stack}
      spacing={1}
      sx={{ mb: 0.25 }}
    >
      <SelectedDiscussion
        onLeave={async () => {
          await closeConnection();
          toast.success("You have left the chat", { autoClose: 1000 });
          await dispatch(getallActivityAsync(5));
          routes.navigate("/home/activity");
        }}
        contentOnDiscussion={single_activity?.activityContent ?? "-1"}
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
