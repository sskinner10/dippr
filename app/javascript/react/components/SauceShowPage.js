import React, { useState, useEffect } from 'react'
import _ from 'lodash'
import ReviewTile from './ReviewTile'

const SauceShowPage = (props) => {
    const [sauce, setSauce] = useState({})
    // const [reviews, setReviews] = useState([])
  
    useEffect(() => {
        fetchSauce()
    }, [])

    const fetchSauce = async () => {
      try {
        const response = await fetch(`/api/v1/sauces/${props.match.params.id}`)
        if (!response.ok) {
          const errorMessage = `${response.status} (${response.statusText})`
          const error = new Error (errorMessage)
          throw(error)
        }
        const sauceObject = await response.json()
        setSauce(sauceObject)
      } catch (error) {
        console.error(`Error in fetch: ${error.message}`)
      }
    }

    // const fetchReview = async () => {
    //   try {
    //     const response = await fetch(`/api/v1/reviews/${props.match.params.id}`)
    //     if (!response.ok) {
    //       const errorMessage = `${response.status} (${response.statusText})`
    //       const error = new Error (errorMessage)
    //       throw(error)
    //     }
    //     const ReviewObject = await response.json()
    //     setReviews(ReviewObject)
    //   } catch (error) {
    //     console.error(`Error in fetch: ${error.message}`)
    //   }
    // }
    
    if (_.isEmpty(sauce)) {
      return null
    }
     
    // const reviewTiles = sauce.reviews.map((review)=>{
    //   return(
    //     <ReviewTile
    //     key = {review.id}
    //     id = {review.id}
    //     title = {review.title}
    //     rating = {review.rating}
    //     heatIndex = {review.heatIndex}
    //     description = {review.body}
    //     />
    //   )  
    // })

    return (
      <div className="grid-container">
        <div className="grid-x">
          <div className="cell small-12 medium-4"> 
            <img src={sauce.image_url} all={`${sauce.name} (${sauce.brand})`} />
            <h5 className="sauce-title-text">{sauce.name} ({sauce.brand})</h5>
            <p>{sauce.description}</p>
          </div>
          <div>Review form
            <div>
              {/* {reviewTiles} */}
            </div>
          </div>
        </div>
      </div>
    )
}

export default SauceShowPage