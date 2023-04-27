import {
  Box,
  Paper,
  Tooltip,
  Button,
  IconButton,
  InputBase,
  Divider,
  Grow,
  MenuList,
  MenuItem,
  Popper,
  ClickAwayListener,
} from '@mui/material';
import background from '../images/background.jpg';
import { Menu as MenuIcon ,Search as SearchIcon } from '@mui/icons-material';


import React from 'react';

const Search = () => {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === 'Escape') {
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <Box>
      <Paper
        sx={{
          background: `url(${background}) `,
          backgroundPosition: '0 65%',
          backgroundSize: 'cover',
          width: '100vw',
          height: '25vh',
        }}
      />
      <Paper
        component='form'
        sx={{
          p: 1,
          display: 'flex',
          position: 'relative',
          bottom: '30px',
          alignItems: 'center',
          width: { xs: '80%', sm: '50%' },
          margin: '0 auto',
        }}
      > 

       
        <IconButton
          ref={anchorRef}
          onClick={handleToggle}
        >
          <MenuIcon/>
        </IconButton>
        <Popper
          open={open}
          anchorEl={anchorRef.current}
          placement="bottom-start"
          transition
          disablePortal
          sx={{pt:'10px'}}
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === 'bottom-start' ? 'left top' : 'left bottom',
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList
                    autoFocusItem={open}
                    onKeyDown={handleListKeyDown}
                  >
                    <MenuItem onClick={handleClose}>All</MenuItem>
                    <MenuItem onClick={handleClose}>Title</MenuItem>
                    <MenuItem onClick={handleClose}>Author</MenuItem>
                    <MenuItem onClick={handleClose}>Publisher</MenuItem>
                    <MenuItem onClick={handleClose}>ISBN</MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
        


        <Divider orientation='vertical' variant="middle" flexItem  />
        <InputBase
          fullWidth
          placeholder='Search Books ... '
          autoFocus
          sx={{ ml: 1, flex: 1 }}
        />
        <Divider orientation='vertical' variant="middle" flexItem  />
        <Tooltip title='Search'>
          <IconButton>
            <SearchIcon />
          </IconButton>
        </Tooltip>

        
      </Paper>

    </Box>
  );
};

export default Search;
