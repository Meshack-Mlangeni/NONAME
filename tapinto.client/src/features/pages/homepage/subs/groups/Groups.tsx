import { Button, Divider, Sheet, Table, Typography } from "@mui/joy";
import { useAppDispatch, useAppSelector } from "../../../../../app/store/store";
import { useEffect } from "react";
import { getAllSchoolUserGroupsAsync } from "../activity/activitySlice";
import Input, { InputProps } from "@mui/joy/Input";
import Box from "@mui/joy/Box";
import React from "react";
import CreateGroupModal from "./createGroupModal";
import { Group } from "../../../../../models/group";

//Debounced code kindly borrowed from MUI

type DebounceProps = {
  handleDebounce: (value: string) => void;
  debounceTimeout: number;
};

function DebounceInput(props: InputProps & DebounceProps) {
  const { handleDebounce, debounceTimeout, ...rest } = props;
  const timerRef = React.useRef<ReturnType<typeof setTimeout>>();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      handleDebounce(event.target.value);
    }, debounceTimeout);
  };

  return <Input {...rest} onChange={handleChange} />;
}

export default function Groups() {
  const { user } = useAppSelector((state) => state.account);
  function isAdmin(group: Group) {
    if (user) return user!.email === group.userEmail;
    else return false;
  }
  const { groups } = useAppSelector((state) => state.activities);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [debouncedVal, setDebouncedValue] = React.useState("");
  const handleDebounce = (value: string) => {
    setDebouncedValue(value);
  };

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getAllSchoolUserGroupsAsync());
  }, [dispatch]);

  return (
    <>
      <Typography sx={{ mt: 2 }} level="h2">
        Groups at <Typography color="primary">{user?.school}</Typography>
      </Typography>

      {/* {groups && (groups as Group[]).map((g) => <h3>{g.groupName}</h3>)} */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          mt: 2,
          mb: 2,
          gap: "0.5rem",
        }}
      >
        <DebounceInput
          placeholder="Type To Search Group…"
          debounceTimeout={1000}
          handleDebounce={handleDebounce}
        />
        <Divider orientation="vertical" />
        <CreateGroupModal />
      </Box>

      <Sheet>
        <Table
          sx={{ mt: 3 }}
          borderAxis="both"
          size="md"
          stripe="even"
          variant="soft"
          color="neutral"
        >
          <thead>
            <tr>
              <th>Group Name</th>
              <th>Participants</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {groups &&
              groups
                .filter((g) => {
                  return !debouncedVal
                    ? g
                    : g.groupName.includes(debouncedVal) ||
                        g.userEmail.includes(debouncedVal) ||
                        g.groupName.startsWith(debouncedVal) ||
                        g.groupName.endsWith(debouncedVal);
                })
                .map((g) => (
                  <tr>
                    <td style={{ fontSize: "18px" }}>
                      {g.groupName}
                      {isAdmin(g) && (
                        <span style={{ fontWeight: 600 }}>{" [Admin]"}</span>
                      )}
                    </td>
                    <td>
                      <Button
                        disabled={!isAdmin(g)}
                        variant="plain"
                        sx={{ m: 1 }}
                      >
                        See all {g?.users?.length ?? 0} Participants
                      </Button>
                    </td>
                    <td>
                      <Button disabled={isAdmin(g)} sx={{ m: 1 }}>
                        Join
                      </Button>
                      <Button disabled={!isAdmin(g)} sx={{ m: 1 }}>
                        Remove Group
                      </Button>
                    </td>
                  </tr>
                ))}
          </tbody>
        </Table>
      </Sheet>
    </>
  );
}
