import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr"

export const joinDiscussionRoom = async (userEmail: string, discussionId: number) => {
    try {
        const connection = new HubConnectionBuilder()
            .withUrl("http://localhost:5169/livehub")
            .configureLogging(LogLevel.Information)
            .build();
        connection.on("ReceiveMessage", (userEmail, msg) => {
            console.log("msg", msg);
        })

        await connection.start().then(() => console.info("connection successfully established..."));
        await connection.invoke("JoinLiveDiscussion", userEmail, discussionId)
        console.log("conn name: ", connection);
        console.log("userEmal: ", userEmail);
        console.log("discID: ", discussionId);

    } catch (error) {
        console.log(error);
    }
}