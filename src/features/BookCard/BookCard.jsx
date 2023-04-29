/* eslint-disable react/prop-types */
import { MenuBook } from '@mui/icons-material';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Stack,
  Typography,
  Skeleton,
} from '@mui/material';

const BookCard = ({ book }) => {
  return (
    <Card
      sx={{
        width: '100%',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'center',
        p: 1,
        gap: 3,
      }}
    > 
      <Box>
        {book.volumeInfo.imageLinks ? (
          <CardMedia
            component='img'
            image={book.volumeInfo.imageLinks.smallThumbnail}
            sx={{
              width: { xs: '150px', sm: '100px' },
              maxHeight: 200,
              borderRadius: 1,
            }}
          />
        ) : (
        <Skeleton
          variant='rounded'
          animation={false}
          sx={{
            width: { xs: '150px', sm: '100px' },
            maxHeight: 200,
          }}
        />
      )}
      </Box>
      <Box sx={{ ml:1 }}>
        <Typography
          variant='h6'
          component='a'
          href={book.volumeInfo.infoLink}
          target='_blank'
          sx={{ 
            color: 'text.primary', 
            ':hover': { color: 'primary.dark' } ,
            lineHeight: 1.2,
          }}
        >
          {book.volumeInfo.title}
        </Typography>
        <CardContent sx={{ p: 0, mt: 0.5 }}>
          {book.volumeInfo.authors && (
            <Typography variant='span' color='text.secondary'>
              {book.volumeInfo.authors[0]}
            </Typography>
          )}
          {book.volumeInfo.authors?.length > 1 && (
            <Typography variant='span' color='text.secondary' sx={{ ml: 0.8 }}>
              Et al.
            </Typography>
          )}
          {book.volumeInfo.publishedDate && (
            <Typography variant='span' color='text.secondary' >
              {' · '+ book.volumeInfo.publishedDate.slice(0, 4)}
            </Typography>
          )}
        </CardContent>
        <Typography
          variant='body2'
          color='text.secondary'
          sx={{ mt:1,width:{ xs:'100%', sm:'95%'}}}
        >
          {book.volumeInfo.description?.slice(0,180) + '...'}
        </Typography>
        <Stack direction='row' spacing={2} sx={{ p:1 }}>
          {book.volumeInfo.categories && (
            <Chip
              label={book.volumeInfo.categories[0]}
              size='small'
              variant='outlined'
              color='primary'
            />
          )}
          {book.volumeInfo.pageCount && (
            <Chip
              label={'Page: ' + book.volumeInfo.pageCount}
              size='small'
              variant='outlined'
              color='warning'
            />
          )}
          {book.volumeInfo.industryIdentifiers && (
            <Chip
              label={
                'ISBN: ' + book.volumeInfo.industryIdentifiers[0].identifier
              }
              size='small'
              variant='outlined'
              color='success'
            />
          )}
        </Stack>
      </Box>
      <Box>
        <Button
            variant='outlined'
            startIcon={<MenuBook />}
            href={book.volumeInfo.previewLink}
            target='_blank'
            sx={{ display: { xs: 'none', sm: 'flex' },textTransform: 'none',position:'relative',top:'50%',transform:'translateY(-50%)' ,mr:1 }}
          >
            Preview
          </Button>
      </Box>
      
    </Card>
  );

};

export default BookCard;
