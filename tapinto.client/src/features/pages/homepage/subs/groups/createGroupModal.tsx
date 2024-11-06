import Button from "@mui/joy/Button";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import DialogTitle from "@mui/joy/DialogTitle";
import Stack from "@mui/joy/Stack";
import Add from "@mui/icons-material/Add";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { useAppDispatch } from "../../../../../app/store/store";
import { createGroupAsync } from "../activity/activitySlice";
import { setLoading } from "../../../../../app/store/appSlice";
import { DialogContent } from "@mui/joy";

export default function CreateGroupModal() {
  const [open, setOpen] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
  });

  const onGroupSubmit = async (data: FieldValues) => {
    await dispatch(setLoading(true));
    await dispatch(createGroupAsync(data)).finally(async () => {
      await dispatch(setLoading(false));
      setOpen(false);
    });
  };

  return (
    <>
      <Button
        color="primary"
        startDecorator={<Add />}
        onClick={() => setOpen(true)}
      >
        Create Group
      </Button>
      <Modal open={open} onClose={() => setOpen(true)}>
        <ModalDialog>
          <DialogTitle>Create new group</DialogTitle>
          <DialogContent>Maximum of 5 Groups</DialogContent>
          <form onSubmit={handleSubmit(onGroupSubmit)}>
            <Stack spacing={2}>
              <FormControl error={!!errors.groupName}>
                <FormLabel>Name</FormLabel>
                <Input
                  autoFocus
                  placeholder={
                    !!errors.groupName! && (errors.groupName!.message as string)
                  }
                  {...register("groupName", {
                    required: "Please enter group name",
                  })}
                />
              </FormControl>
              <FormControl error={!!errors.description}>
                <FormLabel>Description</FormLabel>
                <Input
                  placeholder={
                    !!errors.description! &&
                    (errors.description!.message as string)
                  }
                  {...register("description", {
                    required: "Please enter group description",
                  })}
                />
              </FormControl>
              <Stack spacing={1}>
                <Button disabled={!isValid} type="submit">
                  Submit
                </Button>
                <Button color="danger" onClick={() => setOpen(false)}>
                  Cancel
                </Button>
              </Stack>
            </Stack>
          </form>
        </ModalDialog>
      </Modal>
    </>
  );
}
