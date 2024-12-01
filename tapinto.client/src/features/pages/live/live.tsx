import MessagesPanel from "./messagesPanel";
import { Stack, Typography } from "@mui/joy";
import { useNavigate, useParams } from "react-router-dom";
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
import { response } from "../../../models/response/response";

export default function Live() {
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();
  const { user } = useAppSelector((state) => state.account);
  const { single_activity, chatHistory } = useAppSelector(
    (state) => state.activities
  );
  const navigate = useNavigate();
  const main_stack = useRef<HTMLDivElement>(null);
  const [connection, setConnection] = useState<HubConnection | null>(null);
  const [chats, setChats] = useState<Chats[]>(chatHistory ?? []);
  const [usersJoined, setUsersJoined] = useState<string[]>([]);

  useEffect(() => {
    dispatch(getAllActivityChatsAsync(+id!)).then((data) => {
      if (
        (data.payload as response<Chats[]>) &&
        ((data.payload as response<Chats[]>).data as Chats[])
      ) {
        setChats((data.payload as response<Chats[]>).data as Chats[]);
      }
    });
  }, [dispatch, id]);

  // onbeforeunload = function () {
  //   connection?.invoke("LeaveDiscussion", +id!, user?.email as string);
  //   connection?.stop().then(() => console.log("Connection was stopped!"));
  //   return true;
  // };

  const onLeaveDiscussion = () => {
    connection
      ?.invoke("LeaveDiscussion", +id!, user?.email as string)
      .then(() => {
        connection?.stop().then(() => console.log("Connection was stopped!"));
        navigate("/home/activity");
      });
  };

  const InitializeConnection = useCallback(async () => {
    const _connection = new HubConnectionBuilder()
      .withUrl("http://localhost:5169/live")
      .configureLogging(LogLevel.Information)
      .build();

    _connection.on("UpdateParticipants", (participants) => {
      setUsersJoined(participants);
      console.log(participants);
    });
    _connection.on("ReceiveMessage", (user, message) => {
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
  }, [dispatch, id]);

  return (
    <Stack
      direction="column"
      justifyContent="space-between"
      ref={main_stack}
      spacing={1}
      sx={{ mb: 0.25 }}
    >
      <Stack sx={{ alignItems: "center", pt: 3 }}>
        <AppLogo />
        <Typography sx={{ fontWeight: 700 }} level="title-lg">
          DISCUSSIONS
        </Typography>
      </Stack>
      <MessagesPanel
        onLeave={onLeaveDiscussion}
        sendMessage={sendMessage}
        discussionQuestion={single_activity?.activityContent ?? "-1"}
        id={+id!}
        usersJoined={usersJoined!}
        chats={chats}
        user={user!}
      />
    </Stack>
  );
}
