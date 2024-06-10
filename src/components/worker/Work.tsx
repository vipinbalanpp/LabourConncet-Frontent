import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material'
import image from '../../assets/plwork2.webp'
const Work = () => {
    return (
        <div className='hover:shadow-lg hover:scale-105 duration-300 mt-5'>

<Card sx={{ maxWidth: 405, maxHeight: 400 }}> 
            <CardActionArea>
          <CardMedia
            component="img"
            image={image}
            alt="green iguana"
            />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              L“Mauris eget lorem odio. Mauris convallis justo molestie metus aliquam lacinia. Suspendisse ut dui vulputate augue condimentum ornare. Morbi vitae tristique ante”
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
            </div>
    )
}

export default Work
