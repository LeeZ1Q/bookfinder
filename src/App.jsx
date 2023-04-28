import { Box } from '@mui/material';
import './App.css';
import Search from './features/Search/Search';
import Loading from './features/Loading/Loading';
import { useSelector } from 'react-redux';

function App() {
  const status = useSelector(state => state.search.status);

  let content;
  switch (status) {
    case 'loading':
      content = <Loading />;
      break;
    case 'fulfilled':
      content = <h1>fulfilled</h1>;
      break;
    case 'rejected':
      content = <h1>rejected</h1>;
      break;
  }

  return (
      <Box className='App'>
        <Search />
        {content}
      </Box>
  );
}

export default App;
