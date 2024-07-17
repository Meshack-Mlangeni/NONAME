import {
    Card,
    CardContent,
} from "@mui/joy";
import PostTextField from "./postTextFieldComponent";

///TODO input chips
export default function Post() {
    return (
        <Card>
            <CardContent>
                <PostTextField />
            </CardContent>
        </Card>
    );
}
