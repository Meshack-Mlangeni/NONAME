import MessagesPanel from "./messagesPanel";
import { Stack, Typography } from "@mui/joy";
import { useParams } from "react-router-dom";
import { useCallback, useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/store/store";
import { Chats } from "../../../models/chats";
import {
  HubConnection,
  HubConnectionBuilder,
  LogLevel,
} from "@microsoft/signalr";
import {
  getAllActivityChatsAsync,
  getSingleActivityAsync,
} from "../homepage/subs/activity/activitySlice";
import AppLogo from "../../../app/navbar/AppLogo";
import convertToDateTimeAgo from "../../../helpers/convertToDateTimeAgo";

export default function Live() {
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();
  const { user } = useAppSelector((state) => state.account);
  const { single_activity, chatHistory } = useAppSelector(
    (state) => state.activities
  );
  const main_stack = useRef<HTMLDivElement>(null);
  const [connection, setConnection] = useState<HubConnection | null>(null);
  const [chats, setChats] = useState<Chats[]>(chatHistory ?? []);

  const InitializeConnection = useCallback(async () => {
    const _connection = new HubConnectionBuilder()
      .withUrl("http://localhost:5169/live")
      .configureLogging(LogLevel.Information)
      .build();

    _connection.on("ReceiveMessage", (user, message) => {
      console.log("Receive Message: ", message);
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
          timeStamp: convertToDateTimeAgo(chat.timeStamp),
          activityId: chat.activityId,
          fullNames: chat.fullNames,
        },
      ]);
    });

    try {
      await _connection.start();
      console.log("Connection Established!");

      await _connection
        .invoke("JoinLiveDiscussion", user?.email, +id!)
        .then((res) => console.log("connected: ", res))
        .catch((err) => console.log("failed: ", err));
    } catch (e) {
      console.log(e);
    }
    setConnection(_connection);

    return () => {
      if (_connection) {
        _connection.stop().then(() => console.log("Connection stopped"));
      }
    };
  }, [id, user?.email]);

  useEffect(() => {
    InitializeConnection();
  }, [InitializeConnection]);

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

  useEffect(() => {
    dispatch(getSingleActivityAsync(+id!));
    dispatch(getAllActivityChatsAsync(+id!));
  }, [dispatch, id]);

  return (
    <Stack
      direction="column"
      justifyContent="space-between"
      ref={main_stack}
      spacing={1}
      sx={{ mb: 0.25 }}
    >
      <Stack sx={{ alignItems: "center" }}>
        <AppLogo />
        <Typography level="title-lg">DISCUSSIONS</Typography>
      </Stack>
      <MessagesPanel
        sendMessage={sendMessage}
        discussionQuestion={single_activity?.activityContent ?? "-1"}
        id={+id!}
        chats={chats}
        user={user!}
      />
    </Stack>
  );
}
