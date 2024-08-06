import { Button, Divider, Sheet, Table, Typography } from "@mui/joy";
import { useAppDispatch, useAppSelector } from "../../../../../app/store/store";
import { useEffect } from "react";
import { getAllSchoolUserGroupsAsync } from "../posts/postSlice";
import Input, { InputProps } from "@mui/joy/Input";
import Box from "@mui/joy/Box";
import React from "react";
import CreateGroupModal from "./createGroupModal";

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
  const { groups } = useAppSelector((state) => state.activities);
  const [debouncedValue, setDebouncedValue] = React.useState("");
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
          borderAxis="x"
          size="lg"
          stickyFooter
          stickyHeader
          stripe="none"
          variant="plain"
        >
          <thead>
            <tr>
              <th>Group Name</th>
              <th>Administrator</th>
              <th>Number of participants</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {groups &&
              groups.map((g) => (
                <tr>
                  <td>{g.groupName}</td>
                  <td>{g.userEmail}</td>
                  <td>{g?.users?.length ?? 0}</td>
                  <td>
                    <Button>Join</Button>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </Sheet>
    </>
  );
}
