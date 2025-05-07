
import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import '../styles/DetailPage.css'
import PayLogos from '../components/PayLogos';
import eyeicon from '../assets/eyeicon.png'
import ProductsReviewsSection from '../components/ProductsReviewsSection'



const ProductDetail = () => {
 
  
 const location = useLocation()
const product = location.state?.product

const [views, setViews]= useState(0)

 useEffect(() => {
     const productViews = Math.floor(Math.random() * (100 ));
     setViews (productViews); } , []
 )

 if (!product) {return <p>No product found</p>}

  return (
    
    <div className='product-detail-container'>
      <div className='rating-review-container'>
       <div className='currently-viewed'>
        <img src={eyeicon} alt='eyeIcon'/>
       <p>{views} people have viewed this products recently</p>
       </div>

       <div className='star-rating'>
            <div className="stars">
              {[...Array(1)].map((_, i) => (
                <span key={i} className={i < Math.floor(product.rating) ? "star filled" : "star"}>★</span>
                  ))}
                </div>

               <p>{product.rating}</p> 
           </div>
        
      </div>

      <div className='image-detail-container'>


        <div className='image-container'> 
        <img src= {product.image} alt={product.name} />
        
        <div className='gallery-container'>
        <img src= {product.gallery} alt={product.name} width={100}  height={100}/>
        <img src= {product.gallery} alt={product.name} width={100}  height={100} />
        <img src= {product.gallery} alt={product.name} width={100}  height={100} />

        </div>


        </div>

        <div className='detail-container'>
          <p  className='productheader'>{product.name}</p>
          <h4 className='price'>N {product.price}</h4>   
        <p>Sold by: {product.artisan}</p>

         <bold>Product Details </bold>
         
          <li>Material: {product.details?.material}</li>
          <li>Color: {product.details?.color}</li>
          <li>Height: {product.details?.height}</li>
          <li>Care Instructions: {product.details?.careInstructions}</li>

         
          <bold>Variations Available</bold>
          <div className='variations'>
            <div>{product.variations?.size1}</div>
            <div>{product.variations?.size2}</div>
            <div>{product.variations?.size3}</div>

          </div>
          <div className='stars-rating'>
            <div className="stars">
              {[...Array(5)].map((_, i) => (
                <span key={i} className={i < Math.floor(product.rating) ? "star filled" : "star"}>★</span>
                  ))}
                </div>
                <span className='ratings-product'>({product.rating})</span>
          </div>
          
          <p className='description-text'>{product.description}</p>
         
          <div className='the-buttons'>
            <div> <button className="request-btn">Add to Cart</button> </div>
            <div> <button className="chat-btn">Chat with Seller</button> </div>
          </div>

        </div>

      </div>

      <hr />
      <ProductsReviewsSection />

         <PayLogos/>
    
    </div>

   
  )
  


}

export default ProductDetail;