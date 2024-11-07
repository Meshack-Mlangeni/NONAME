/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Camera } from "@mui/icons-material";
import { Button, Modal, ModalClose, Sheet, Typography } from "@mui/joy";
import React, { useRef, useState } from "react";
import { toast } from "react-toastify";

interface ITakeImage {
    imageData: [string, React.Dispatch<React.SetStateAction<string>>];
}

const MyCamera = ({ imageData }: ITakeImage) => {
    const videoRef = useRef(null);
    const [disabled, setDisabled] = useState(true);
    const [imgSrc, setImgSrc] = useState("");
    const [open, setOpen] = React.useState<boolean>(false);
    const [streamData, setStreamData] = React.useState<MediaStream | null>(null);

    const startCamera = async () => {
        try {
            setImgSrc("");
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            stream && setDisabled(false);
            setStreamData(stream);
            // @ts-expect-error
            videoRef.current.srcObject = stream;
        } catch (error) {
            toast.error("Error accessing camera: " + error);
        }
    };

    const capture = () => {
        const canvas = document.createElement("canvas");
        if (videoRef.current) {
            // @ts-expect-error
            canvas.width = videoRef.current.videoWidth;
            // @ts-expect-error
            canvas.height = videoRef.current.videoHeight!;
            canvas
                ?.getContext("2d")
                ?.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
            const imageSrc = canvas.toDataURL("image/jpeg");
            setImgSrc(imageSrc);
            imageData[1](imageSrc);
            streamData?.getTracks().forEach((t) => t.stop());
        }
    };

    return (
        <>
            <Button
                sx={{ ml: 1 }}
                onClick={async () => {
                    setOpen(true);
                    await startCamera();
                }}
            >
                <Camera />
                Take A Picture
            </Button>
            <Modal
                aria-labelledby="close-modal-title"
                open={open}
                onClose={() => {
                    setOpen(false);
                }}
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Sheet
                    variant="outlined"
                    sx={{
                        minWidth: 300,
                        borderRadius: "md",
                        p: 3,
                    }}
                >
                    <ModalClose variant="outlined" />
                    <Typography
                        component="h2"
                        id="close-modal-title"
                        level="h4"
                        textColor="inherit"
                        fontWeight="lg"
                    >
                        Capture SACE Image
                    </Typography>
                    <>
                        {imgSrc ? (
                            <>
                                <img
                                    width={300}
                                    style={{ transform: "scaleX(-1)", borderRadius: "12px" }}
                                    src={imgSrc}
                                    alt="Captured"
                                />
                                <br />
                                <Button
                                    fullWidth
                                    sx={{ mt: 2, mb: 1 }}
                                    onClick={async () => {
                                        await (streamData?.getTracks().some((e) => e.enabled) &&
                                            streamData?.getTracks().forEach((t) => t.stop()));
                                        setOpen(false);
                                        setDisabled(true);
                                    }}
                                >
                                    Save and continue
                                </Button>
                                <Button
                                    color="danger"
                                    fullWidth
                                    sx={{ mb: 1 }}
                                    onClick={async () => {
                                        setImgSrc("");
                                        setDisabled(true);
                                        await startCamera().then(() => setDisabled(false));
                                    }}
                                >
                                    Reset
                                </Button>
                            </>
                        ) : (
                            <>
                                <video
                                    id="video"
                                    width={300}
                                    style={{ transform: "scaleX(-1)", borderRadius: "12px" }}
                                    ref={videoRef}
                                    autoPlay
                                />
                                <br />
                                <Button
                                    disabled={disabled}
                                    fullWidth
                                    sx={{ mt: 2, mb: 1 }}
                                    onClick={capture}
                                >
                                    Capture Photo
                                </Button>
                            </>
                        )}
                    </>
                </Sheet>
            </Modal>
        </>
    );
};

export default MyCamera;