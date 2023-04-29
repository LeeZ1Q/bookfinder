import { Box ,ThemeProvider, createTheme} from '@mui/material';
import './App.css';
import Search from './features/Search/Search';
import Loading from './features/Loading/Loading';
import { useSelector } from 'react-redux';
import BookList from './features/BookList/BookList';
import DarkMode from './features/DarkMode/DarkMode';

function App() {
  const status = useSelector(state => state.search.status);
  const themeMode = useSelector((state) => state.darkmode.mode);

  let content;
  switch (status) {
    case 'loading':
      content = <Loading />;
      break;
    case 'fulfilled':
      content = <BookList />;
      break;
    case 'rejected':
      content = <h1>rejected</h1>;
      break;
  }

  const darkTheme = createTheme({
    palette: {
      mode: themeMode,
    },
  });

  return (
      <ThemeProvider theme={darkTheme}>
        <Box 
          className='App'
          bgcolor='background.default'
          sx={{ minHeight: '100vh'  }}
        >
          <Search />
          <DarkMode />
          {content}
        </Box>
      </ThemeProvider>
  );
}

export default App;
