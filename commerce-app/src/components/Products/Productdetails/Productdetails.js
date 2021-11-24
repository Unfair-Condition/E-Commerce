import React, {useState,useEffect} from 'react';
import { ShoppingCart } from '@material-ui/icons';
import {commerce} from "../../../lib/commerce"
import {Grid, Button, Container, Typography} from "@material-ui/core";
import {Link} from 'react-router-dom';
import useStyles from './styles';

const Productdetails = ({onAddToCart}) => {
    const classes = useStyles();
    const [product, setProduct] = useState({});
    const [quantity, setQuantity] = useState(1);
    const [loading, setLoading] = useState(true);

    const fetchProduct = async (id) => {
        const response = await commerce.products.retrieve(id);
        const {name, price, media, quantity, description} = response;
        setProduct({id,name,quantity,description,src: media.source,price: price.formatted_with_symbol, })
        console.log(product);
        
    };

    useEffect(() => {
        const id = window.location.pathname.split("/");
        console.log(id);
        fetchProduct(id[2]);
    },[])

    const handleQuantity = (param) => {
        if(param==="increase") {
            setQuantity(quantity+1);
        }
        if(param==="decrease" && quantity>1) {
            setQuantity(quantity-1);
        }
    }

    return (
          
         <Container className={classes.productdetails}>
             <div className={classes.toolbar}/>
            <Grid container spacing={4} className={classes.imagewrapper}>
                <Grid item xs={12} md={8} >
                    <img 
                       onLoad={() => {
                           setLoading(false);
                       }}
                      src={product.src}
                      alt={product.name}
                      style={{width: '50%'}}
                    />
                </Grid>
                 <Grid item xs={12} md={4} className={classes.text}>
                     <Typography variant="h5" gutterBottom>{product.name}</Typography>
                     <Typography variant="body2" dangerouslySetInnerHTML={{ __html: product.description}} />
                     <Typography variant="h5" gutterBottom>{product.price}</Typography>
                     <Grid container spacing={4}>
                         <Grid item xs={12}>
                             <Button size="small" variant="contained" onClick={() => handleQuantity("increase")}>+</Button>
                        
                         </Grid>
                         <Grid item xs={12}>
                             <Typography variant="h4">
                                 Quantity: {quantity}
                             </Typography>
                         </Grid>
                         <Grid item xs={12}>
                             <Button size="small" variant="contained" color="secondary" onClick={() => handleQuantity("decrease")}>-</Button>
                         </Grid>
                         <Grid item xs={12} style={{display: 'flex', justifyContent: 'space-between'}}>
                             <Button size="large" variant="contained" onClick={() => onAddToCart(product.id, quantity)}>
                                 <ShoppingCart /> Add to cart
                             </Button>
                             <Button component={Link} to="/cart" size="large" variant="contained" color="secondary">
                                 Go to Cart
                             </Button>
                         </Grid>
                     </Grid>
                 </Grid>
             </Grid>
             {loading && <h1>Loading...</h1>}
         </Container>
    )
}

export default Productdetails
