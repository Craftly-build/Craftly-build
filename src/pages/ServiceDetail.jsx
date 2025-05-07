import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import '../styles/DetailPage.css'
import PayLogos from '../components/PayLogos';
import ServiceReviewSection from '../components/ServiceReviewSection'
import eyeicon from '../assets/eyeicon.png'


const ServiceDetail = () => {
 
  
 const location = useLocation()
const product = location.state?.product
const review = location.state?.review
const [views, setViews]= useState(0)

 useEffect(() => {
     const productViews = Math.floor(Math.random() * (100 ));
     setViews (productViews); } , []
 )


 if (!product) {return <p>No product found</p>}

  return (
    <div className='service-detail-container'>
      <div className='rating-review-container'>
        <div>
          <div className='currently-viewed'>
            <img src={eyeicon} alt='eyeIcon'/>
            <p>{views} people have booked this service recently</p>
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
          <h3>{product.name}</h3>
          <p>Price Available on request</p>
          <p>Sold by: {product.artisan}</p>
          Service Details

            <ul>
              <li>Includes</li>
            </ul>

            {product.details.map((detail, index) => (
              <li key={index}>{detail}</li>

            )

            )
            
            }

          <bold>Service Available: </bold>
          {/* <p>{review.rating}</p> */}
          <p>{product.availableDays}  </p>
          
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
            <div> <button className="request-btn">Request Services</button> </div>
            <div> <button className="chat-btn">Chat with Provider</button> </div>
          </div>

        </div>

      </div>


<hr />
<ServiceReviewSection
review={review}

/>


         <PayLogos/>
       
    </div>

   
  )
  

}

export default ServiceDetail