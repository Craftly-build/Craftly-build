import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import '../styles/ReviewsSection.css'


const ReviewsSection = () => {

    const location = useLocation()
    const product = location.state?.product
    const [comments, setComments] = useState(1)

  const reviews = [
     {
        id: 1,
        name: 'Jem Love' ,
        rating: 4,
        review: 'Efficient service! My car was fixed in no time.'
        
     },
     {
        id: 2,
        name: 'Olamide Ola' ,
        rating: 5,
        review: 'Amazing work! My car is as good as new.'
        
     },
     {  
        id: 3,
        name: 'Jemmimah Ola' ,
        rating: 5,
        review: 'Great service, but it took a bit longer than expected.'
        
     },
     {
        id: 4,
        name: 'Craftly team' ,
        rating: 4.5,
        review: 'Great service, but it took a bit longer than expected.'
        
     },
     {
        id: 5,
        name: 'Craftly team 2' ,
        rating: 4.5,
        review: 'Amazing work! My car is as good as new.'
        
     },
     {
        id: 6,
        name: 'Craftly team 3' ,
        rating: 2.5,
        review: 'Do not buy'
        
     },


  ]

  const ReviewsPerPage = 3
  const displayedReviews = reviews.slice(0, comments * ReviewsPerPage)
  const totalReviews = reviews.length

  const showAll = () => {
    setComments(prev => prev + 1);

  }
 const recommended = reviews.filter(review => review.rating >=3.5).length

 const percentageRecommended = (recommended/totalReviews) * 100


  return (


    <div className='review-container'>
       <div className='review-header'>
            <h4>Reviews</h4>

            <div className='stars-rating'>
            <div className="stars">
              {[...Array(5)].map((_, i) => (
                <span key={i} className={i < Math.floor(product.rating) ? "star filled" : "star"}>★</span>
                  ))}
                </div>
                <span className='ratings-product'>{product.rating}</span>
            </div>
             <p className='total-reviews'>({totalReviews})</p>

            <p> {percentageRecommended.toFixed(1)}% of customers recommended this product</p>


        </div>   
        {  
            reviews.length === 0 ? (
                <div className="no-results">
                <p>No products found matching your criteria.</p>
              </div> 
            ) : ( 
                <div>
                      {displayedReviews.map((review) => 
                    (
                        
                    <div key={review.id} className='review-card'>
                       <div className='name-rating'>
            
                      <strong>{review.name}</strong>
                        <div className='stars-rating'>
                        <div className="star">
                          {[...Array(5)].map((_, i) => (
                            <span key={i} className={i < Math.floor(review.rating) ? "star filled" : "star"}>★</span>
                              ))}
                            </div>
                        </div>
            
            
                       </div>
                       
                        <p>{review.review}</p>
                        <button className='read-more'>Read more 
            
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M10.0001 12.7589L14.8176 7.94262L13.9339 7.05762L10.0001 10.9914L6.06762 7.05762L5.18262 7.94262L10.0001 12.7589Z" fill="#A35444"/>
                        </svg>
            
                         
                        </button>
            
            
            
                    </div>
            
                    ) ) }
            
                </div>

            )
        }

        <div className='all-review-buttons'>
      <button
      onClick={showAll}
      
      >
        View all Reviews
        </button>

        </div>
        <hr />
  

    </div>
 

  )
}

export default ReviewsSection