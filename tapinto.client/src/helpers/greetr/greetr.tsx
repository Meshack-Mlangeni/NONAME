import { Avatar, Box } from "@mui/material";

interface Props {
    name: string;
    surname?: string;
    tag: string;
}

export default function Greetr({ name, surname = "", tag }: Props) {
    return (
        <div className="mb-2">
            <Box display="flex" alignItems="center">
                <Avatar sx={{ width: 42, height: 42 }}>
                    {name && name.toUpperCase()[0]}
                    {surname && surname.toUpperCase()[0]}
                </Avatar>
                <div className="ms-2">
                    <span className="fw-bold">
                        {name} {surname}
                    </span>
                    <span className="text-muted ms-2">| {tag}</span>
                </div>
            </Box>
        </div>
    );
}