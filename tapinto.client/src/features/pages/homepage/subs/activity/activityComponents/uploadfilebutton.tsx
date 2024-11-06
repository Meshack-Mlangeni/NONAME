/* eslint-disable @typescript-eslint/no-explicit-any */
import Button from "@mui/joy/Button";
import { Avatar, AvatarGroup, styled } from "@mui/joy";
import { CloudUploadTwoTone } from "@mui/icons-material";
import { Controller } from "react-hook-form";
import { useState } from "react";

const VisuallyHiddenInput = styled("input")`
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  bottom: 0;
  left: 0;
  white-space: nowrap;
  width: 1px;
`;

interface IFBProps {
    control: any;
}

export default function UpLoadFileButton({ control }: IFBProps) {
    const [fileList, setFileList] = useState<File[] | null>(null);
    return (
        <Controller
            control={control}
            name={"file"}
            render={({ field: { value, onChange, ...field } }) => {
                return (
                    <Button
                        size={"sm"}
                        component="label"
                        role={undefined}
                        tabIndex={-1}
                        variant="soft"
                        color={fileList ? "success" : "neutral"}
                        startDecorator={
                            !fileList ? (
                                <CloudUploadTwoTone />
                            ) : (
                                <AvatarGroup>
                                    {fileList!.map((f) => {
                                        try {
                                            if ((f.type! as string).includes("image")) {
                                                const url = URL.createObjectURL(f!);
                                                return (
                                                    <Avatar style={{ height: 20, width: 20 }} src={url} />
                                                );
                                            } else {
                                                return (
                                                    <Avatar style={{ height: 20, width: 20 }}>F</Avatar>
                                                );
                                            }
                                        } catch (error) {
                                            return;
                                        }
                                    })}{" "}
                                </AvatarGroup>
                            )
                        }
                    >
                        {fileList ? "Staged" : "Upload"}
                        <VisuallyHiddenInput
                            {...field}
                            value={value?.fileName}
                            onChange={(event) => {
                                event.target && setFileList([...event.target.files!]);
                                onChange(event.target.files![0]);
                            }}
                            type="file"
                            id="picture"
                        />
                    </Button>
                );
            }}
        />
    );
}