import {
    Button,
    DialogContent,
    DialogTitle,
    FormControl,
    FormLabel,
    Input,
    Link,
    Modal,
    ModalDialog,
    Stack,
} from "@mui/joy";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";

export default function RequestSchoolForm() {
    const [open, setOpen] = useState<boolean>(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        mode: "onTouched",
    });

    const onSchoolSubmit = (data: FieldValues) => {
        console.log(data);
    };

    return (
        <>
            <Link variant="plain" onClick={() => setOpen(true)} level="title-sm">
                Request school to be added
            </Link>
            <>
                <Modal open={open} onClose={() => setOpen(false)}>
                    <ModalDialog>
                        <DialogTitle>Request School</DialogTitle>
                        <DialogContent>
                            Requests are approved by Administrators after investigation
                        </DialogContent>
                        <form onSubmit={handleSubmit(onSchoolSubmit)}>
                            <Stack spacing={2}>
                                <FormControl error={!!errors.schoolName?.message}>
                                    <FormLabel>School Name</FormLabel>
                                    <Input
                                        autoFocus
                                        placeholder={
                                            errors.schoolName?.message as string ?? "Please enter school name"
                                        }
                                        {...register("schoolName", {
                                            required: "Please enter school name",
                                        })}
                                    />
                                </FormControl>
                                <Button type="submit">Submit</Button>
                            </Stack>
                        </form>
                    </ModalDialog>
                </Modal>
            </>
        </>
    );
}