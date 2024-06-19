import * as React from "react";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import FormControl from "@mui/joy/FormControl";
import { Input } from "@mui/joy";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import { useForm } from "react-hook-form";

export type MessageInputProps = {
    textAreaValue: string;
    setTextAreaValue: (value: string) => void;
    onSubmit: () => void;
};

export default function MessageInput(props: MessageInputProps) {
    const {
        register,
        formState: { isSubmitted, errors, isValid },
    } = useForm({ mode: "onTouched" });
    const { textAreaValue, setTextAreaValue, onSubmit } = props;
    const handleClick = (data: FieldValues) => {
        console.log(data);
    };
    return (
        <Box
            position={"fixed"}
            sx={{
                "--Input-gap": "15px",
                "--Input-radius": "8px",
                "--Input-placeholderOpacity": 0.5,
                "--Input-minHeight": "63px",
                "--Input-paddingInline": "32px",
                boxShadow: "lg",
                borderRadius: "sm",
                "--Input-decoratorChildHeight": "36px", bottom: 0, left: 0, right: 0
            }}
        >
            <FormControl>
                <Input
                    onKeyDown={(event) => {
                        if (event.key === "Enter" && (event.metaKey || event.ctrlKey)) {
                            handleClick();
                        }
                    }}
                    endDecorator={<Button onClick={handleClick} endDecorator={<SendRoundedIcon />}>Send</Button>}
                    placeholder="What's your opinion..."
                    autoFocus
                    {...register("message", { required: true })}
                    onChange={(e) => {
                        setTextAreaValue(e.target.value);
                    }}
                />
            </FormControl>
        </Box>
    );
}
