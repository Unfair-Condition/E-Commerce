import React from 'react'
import {Link} from 'react-router-dom'
import {Card, CardMedia, CardContent, CardActions, Typography, IconButton} from '@material-ui/core';
import {AddShoppingCart} from '@material-ui/icons';

import useStyles from './styles';

const Product = ({product, onAddToCart}) => {

    const classes = useStyles();
    return (
        
        <Card className={classes.root}>
            <Link to={`/productdetails/${product.id}`} style={{textDecoration: "none"}}>
            <CardMedia className={classes.media} image={product.media.source} title={product.name}/>
            <CardContent style={{textDecoration: 'none'}}>
                <div className={classes.cardContent} style={{color: 'black'}}>
                    <Typography variant="h5" gutterBottom>
                        {product.name}
                    </Typography>
                    <Typography variant="h5" gutterBottom>
                        {product.price.formatted_with_symbol}
                    </Typography>
                </div>
                {/* <Typography dangerouslySetInnerHTML={{ __html: product.description}} variant="body2" color="textSecondary" /> */}
            </CardContent>
            </Link>
            <CardActions disableSpacing className={classes.cardActions}>
                <IconButton aria-label="Add to Cart" onClick={() => onAddToCart(product.id, 1)}>
                    <AddShoppingCart />
                </IconButton>
            </CardActions>
        </Card>
        
    )
}

export default Product
