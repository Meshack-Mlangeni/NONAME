import * as React from "react";
import Button from "@mui/joy/Button";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import DialogTitle from "@mui/joy/DialogTitle";
import DialogContent from "@mui/joy/DialogContent";
import { ModalClose } from "@mui/joy";
import { SxProps } from "@mui/material";

interface Props {
    buttonName: string;
    isOpen: boolean;
    title?: string;
    content?: string;
    children?: React.ReactNode;
    sx?: SxProps;
    buttonIcon?: React.ReactNode;
}

export default function Dialog({
    buttonName,
    isOpen,
    title,
    content,
    children,
    buttonIcon,
    sx,
}: Props) {
    const [open, setOpen] = React.useState<boolean>(isOpen);
    return (
        <React.Fragment>
            <Button
                variant='plain'
                sx={sx}
                startDecorator={<>{buttonIcon}</>}
                color="neutral"
                onClick={() => setOpen(true)}
            >
                {buttonName}
            </Button>
            <Modal open={open} onClose={() => setOpen(false)}>
                <ModalDialog>
                    <ModalClose variant="plain" sx={{ m: 1 }} />
                    <DialogTitle>{title}</DialogTitle>
                    <DialogContent>{content}</DialogContent>
                    {children}
                </ModalDialog>
            </Modal>
        </React.Fragment>
    );
}