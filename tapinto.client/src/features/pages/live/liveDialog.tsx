import * as React from "react";
import Button from "@mui/joy/Button";
import Modal from "@mui/joy/Modal";
import ModalDialog, { ModalDialogProps } from "@mui/joy/ModalDialog";
import Stack from "@mui/joy/Stack";
import { Chip, LinearProgress } from "@mui/joy";

export default function LiveDialog() {
  const [layout, setLayout] = React.useState<
    ModalDialogProps["layout"] | undefined
  >(undefined);
  return (
    <React.Fragment>
      <Stack direction="row" spacing={1}>
        <Button
          variant="soft"
          color="danger"
          onClick={() => {
            setLayout("fullscreen");
          }}
        >
          <Chip color="danger">
            LIVE
            <LinearProgress
              variant="soft"
              color="danger"
              determinate={false}
              size="sm"
            />
          </Chip>{" "}
          &nbsp; Join Discussion Room
        </Button>
      </Stack>
      <Modal
        open={!!layout}
        onClose={() => {
          setLayout(undefined);
        }}
      >
        <ModalDialog layout={layout}></ModalDialog>
      </Modal>
    </React.Fragment>
  );
}
