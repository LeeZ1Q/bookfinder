import { Box, Switch } from '@mui/material'
import { LightMode } from '@mui/icons-material'
import { useSelector, useDispatch } from 'react-redux'
import { toggleMode } from './DarkModeSlice'

const DarkMode = () => {
  const themeMode = useSelector((state) => state.darkmode.mode);
  const dispatch = useDispatch();

  return (
    <Box sx={{ display: 'flex', alignItems: 'center',mt:-3, ml:'80%'}}>
      <LightMode sx={{ color: 'text.primary' }} />
      <Switch
        color='warning'
        checked={themeMode === 'dark'}
        onChange={() => dispatch(toggleMode())}
      />
    </Box> 
  );
};

export default DarkMode;





