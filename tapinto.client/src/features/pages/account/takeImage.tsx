/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Camera } from "@mui/icons-material";
import { Button, Modal, ModalClose, Sheet, Typography } from "@mui/joy";
import React, { useRef, useState } from "react";

const MyCamera = () => {
  const videoRef = useRef(null);
  const [imgSrc, setImgSrc] = useState("");
  const [open, setOpen] = React.useState<boolean>(false);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      // @ts-expect-error
      videoRef.current.srcObject = stream;
    } catch (error) {
      console.error("Error accessing camera:", error);
    }
  };

  const capture = () => {
    const canvas = document.createElement("canvas");
    // @ts-expect-error
    canvas.width = videoRef.current.videoWidth;
    // @ts-expect-error
    canvas.height = videoRef.current.videoHeight;
    // @ts-expect-error
    canvas
      .getContext("2d")
      .drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    const imageSrc = canvas.toDataURL("image/jpeg");
    console.log(imageSrc);
    setImgSrc(imageSrc);
  };

  return (
    <>
      <Button
        sx={{ ml: 1 }}
        variant="outlined"
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
                    videoRef.current.srcObject = null;
                    if (
                      navigator.mediaDevices &&
                      (
                        await navigator.mediaDevices.getUserMedia({
                          video: true,
                        })
                      ).getTracks()
                    ) {
                      const tracks = (
                        await navigator.mediaDevices.getUserMedia({
                          video: true,
                        })
                      ).getTracks();
                      tracks.forEach((track) => track.stop());
                    }
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
                    await startCamera();
                  }}
                >
                  Reset
                </Button>
              </>
            ) : (
              <>
                <video
                  width={300}
                  style={{ transform: "scaleX(-1)", borderRadius: "12px" }}
                  ref={videoRef}
                  autoPlay
                />
                <br />
                <Button fullWidth sx={{ mt: 2, mb: 1 }} onClick={capture}>
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
