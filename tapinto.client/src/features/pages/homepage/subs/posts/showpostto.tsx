import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { GroupWorkRounded, LocalLibraryRounded, PublicRounded } from '@mui/icons-material';


interface Prop{
    def: string
}

export default function ShowPostTo({def}: Prop ) {

  const [open, setOpen] = React.useState(false);
  const [access, setAccess] = React.useState<string>(def);

  const handleChange = (event: SelectChangeEvent<typeof access>) => {
    setAccess(event.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (_event: React.SyntheticEvent<unknown>, reason?: string) => {
    if (reason !== 'backdropClick') {
      setOpen(false);
    }
  };

  return (
    <div>
      <Button color='inherit' sx={{fontSize: "12px"}} onClick={handleClickOpen}>
        {access === 'Public' ? <PublicRounded/> : access === 'Groups Only' ? <GroupWorkRounded/> : <LocalLibraryRounded/>}
        &nbsp; {access}
      </Button>
      <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
        <DialogTitle>Change post privacy</DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap' }}>
            <FormControl sx={{ m: 1, minWidth: 300 }}>
              <Select
               size='small'
                value={access}
                onChange={handleChange}
              >
                <MenuItem selected={true} value="Public">Public</MenuItem>
                <MenuItem value="Groups Only">Groups Only</MenuItem>
                <MenuItem value="My School">My School</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Ok</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
