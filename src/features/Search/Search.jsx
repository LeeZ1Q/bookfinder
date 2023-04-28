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
import background from '../../images/background.jpg';
import { Menu as MenuIcon ,Search as SearchIcon } from '@mui/icons-material';
import React from 'react';
import { useDispatch } from 'react-redux';
import { fetchData } from './SearchSlice';

const Search = () => {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [searchBy, setSearchBy] = React.useState('all');


  const dispatch = useDispatch();
  let by;
  switch (searchBy) {
    case 'all':
      by = '';
      break;
    case 'title':
      by = 'by Title';
      break;
    case 'author':
      by = 'by Author';
      break;
    case 'publisher':
      by = 'by Publisher';
      break;
    case 'isbn':
      by = 'by ISBN';
  }

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSelect = (term) => {
    setOpen((prevOpen) => !prevOpen);
    setSearchBy(term);
  };

  const handelSubmit = (e) => {
    e.preventDefault();
    setSearchTerm('');
    dispatch(
      fetchData(
        `https://www.googleapis.com/books/v1/volumes?q=${searchTerm}+${searchBy}`
      )
    );
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
        onSubmit={handelSubmit}
      > 

        <Tooltip title='Search By' placement='top' disableFocusListener >
          <IconButton
            ref={anchorRef}
            onClick={handleToggle}
          >
            <MenuIcon/>
          </IconButton>
        </Tooltip>
        <Divider orientation='vertical' variant="middle" flexItem  />
        <InputBase
          fullWidth
          placeholder={`Search Books ${by}...` }
          autoFocus
          sx={{ ml: 1, flex: 1 }}
          value={searchTerm}
          onChange={(e) => handleChange(e)}
        />
        <Divider orientation='vertical' variant="middle" flexItem  />
        <Button
          color='primary'
          variant='contained'
          startIcon={<SearchIcon />}
          type='submmit'
          sx={{ display: { xs: 'none', sm: 'flex' } }}
        >
          Search
        </Button>
        
        
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
                    <MenuItem onClick={() => handleSelect('all')}>All</MenuItem>
                    <Divider variant='middle' />
                    <MenuItem onClick={() => handleSelect('title')}>Title</MenuItem>
                    <Divider variant='middle' />
                    <MenuItem onClick={() => handleSelect('author')}>Author</MenuItem>
                    <Divider variant='middle' />
                    <MenuItem onClick={() => handleSelect('publisher')}>Publisher</MenuItem>
                    <Divider variant='middle' />
                    <MenuItem onClick={() => handleSelect('isbn')}>ISBN</MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
        
        
      </Paper>

    </Box>
  );
};

export default Search;
