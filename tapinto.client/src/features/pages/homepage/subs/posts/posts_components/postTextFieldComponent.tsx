/* eslint-disable @typescript-eslint/ban-ts-comment */
import {
    Box,
    Button,
    Chip,
    ChipDelete,
    Divider,
    IconButton,
    Textarea,
} from "@mui/joy";
import Labels from "../../../../../components/labelctr";
import { AttachFileOutlined, PhotoCameraOutlined, Send } from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "../../../../../../app/store/store";
import { getLabelsAsync, removeLabel } from "../postSlice";
import { toast } from "react-toastify";
import { FieldValues, useForm } from "react-hook-form";
import ShowTo from "./postVisibilityComponent";
import { useMediaQuery } from "@mui/material";
import { useEffect } from "react";

export default function PostTextField() {
    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            console.log(file.name);
        }
    };
    const Mobile = useMediaQuery("(min-width:600px)");
    const dispatch = useAppDispatch();
    const { selectedLabels } = useAppSelector((state) => state.posts);
    const { register, handleSubmit } = useForm({ mode: "onChange" });
    const onSubmit = (data: FieldValues) => {
        console.log(data);
    };

    useEffect(() => {
        dispatch(getLabelsAsync());
    }, [dispatch]);

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Box display="flex" alignItems="center">
                    <Textarea
                        placeholder="What's on your mind..."
                        minRows={1}
                        maxRows={4}
                        {...register("content")}
                        startDecorator={
                            <Box sx={{ display: "flex", gap: 0.5, flex: 1 }}>

                                <Labels />
                                <>
                                    {selectedLabels.map((lbl, idx) => (
                                        <Chip
                                            endDecorator={
                                                <ChipDelete
                                                    onDelete={() => {
                                                        dispatch(removeLabel(lbl.name));
                                                        toast.warn(`${lbl.name} label removed`);
                                                    }}
                                                />
                                            }
                                            // @ts-expect-error
                                            color={lbl.color ?? "danger"}
                                            key={idx}
                                        >
                                            {lbl.name}
                                        </Chip>
                                    ))}
                                </>
                            </Box>
                        }
                        sx={{ minWidth: 300, width: "100%" }}
                    />
                </Box>
                <Box sx={{ mt: 1 }} display="flex" alignItems="center">
                    <div>
                        <Button
                            type="submit"
                            size="sm"
                            sx={{ mr: 1 }}
                            variant="solid"
                        >
                            <Send /> &nbsp; Post
                        </Button>

                        <input
                            accept="*/*"
                            style={{ display: "none" }}
                            id="attach-file"
                            type="file"
                            onChange={handleFileUpload}
                        />
                        <label htmlFor="attach-file">
                            <IconButton size="sm" color="warning" component="span">
                                <AttachFileOutlined />
                            </IconButton>
                        </label>
                        <input
                            accept="image/*"
                            style={{ display: "none" }}
                            id="attach-photo"
                            type="file"
                            onChange={handleFileUpload}
                        />
                        <label htmlFor="attach-photo">
                            <IconButton size="sm" color="success" component="span">
                                <PhotoCameraOutlined />
                            </IconButton>
                        </label>
                    </div>
                    {Mobile && <br />}
                    <>
                        <Divider orientation="vertical" sx={{ ml: 1, mr: 1 }} />
                        <ShowTo />
                    </>
                </Box>
            </form>
        </>
    );
}
