import React, { useState, useEffect } from "react"

const ReviewTileContainer = (props) => {
  const [review, setReview] = useState({})
    const getReviews = async () => {
      const reviewId = props.match.params.id
      binding.pry
      try {
        const response = await fetch(`/api/v1/sauces/${reviewId}`)
        if (!response.ok) {
          const errorMessage = `${response.status} ${response.statusText}`
          const error = new Error(errorMessage)
          throw error 
        }
        const responseBody = await response.json()
        setReview(responseBody)
      } catch (error) {
        console.log("error in fetch:", error)
      }
    }

    useEffect(() => {
      getReviews()
    },[])

  return (
    <ReviewTile 
      id={review.id}
      title={review.title}
      rating={review.rating}
      heatIndex={review.heatIndex}
      description={review.description}
    />
  )
}

export default ReviewTileContainer