import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import FormControl from "@mui/joy/FormControl";
import { Input } from "@mui/joy";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import { FieldValues, useForm } from "react-hook-form";

export type MessageInputProps = {
    textAreaValue: string;
    setTextAreaValue: (value: string) => void;
    onSubmit: () => void;
};

export default function MessageInput(props: MessageInputProps) {
    const {
        register,
    } = useForm({ mode: "onTouched" });
    const { setTextAreaValue } = props;
    const handleClick = (data: FieldValues) => {
        console.log(data);
    };
    return (
        <Box
            sx={{
                "--Input-gap": "15px",
                "--Input-radius": "8px",
                "--Input-placeholderOpacity": 7.5,
                "--Input-minHeight": "63px",
                "--Input-paddingInline": "32px",
                borderRadius: "sm",
                p:1,
                "--Input-decoratorChildHeight": "36px", bottom: 0, left: 0, right: 0
            }}
        >
            <FormControl>
                <Input
                    onKeyDown={(event) => {
                        if (event.key === "Enter" && (event.metaKey || event.ctrlKey)) {
                            handleClick({} as FieldValues);
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