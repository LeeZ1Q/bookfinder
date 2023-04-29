import { Box } from '@mui/material';
import './App.css';
import Search from './features/Search/Search';
import Loading from './features/Loading/Loading';
import { useSelector } from 'react-redux';
import BookList from './features/BookList/BookList';

function App() {
  const status = useSelector(state => state.search.status);

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

  return (
      <Box 
        className='App'
        bgcolor='background.default'
        sx={{ minHeight: '100vh' }}
      >
        <Search />
        {content}
      </Box>
  );
}

export default App;
