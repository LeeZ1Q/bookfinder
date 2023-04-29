import { Box , Typography, } from '@mui/material';
import BookCard from '../BookCard/BookCard';
import { useSelector } from 'react-redux';
import { nanoid } from '@reduxjs/toolkit';


const BookList = () => {
  //过滤没有图片、描述的书的List
  const bookList = useSelector(state => state.search.books.items.filter(book => book.volumeInfo.imageLinks && book.volumeInfo.description));
  // const bookList = useSelector(state => state.search.books.items);
  const amountOfResults = useSelector((state) => state.search.books.totalItems);

  return (
    <Box
      sx={{
        width: { xs: '90%', sm: '70%' },
        margin: '0 auto',
      }}
    >
      <Box 
        sx={{ 
          display: 'flex', 
          mb: 1,
          mt : -3.5,
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography color='text.secondary' sx={{ ml: 1 }}>
          {amountOfResults} Results
        </Typography>
      </Box>
      {bookList ? (
        <Box
          sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: 1.5 
            }}
        >
          {bookList.map((book) => (
            <BookCard key={nanoid()} book={book} />
          ))}
        </Box>
      ):(
        <h1>Nothing Found</h1>
      )}
    </Box>
  );
};

export default BookList;

