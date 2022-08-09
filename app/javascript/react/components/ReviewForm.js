import React, { useState } from "react"
import ErrorDisplay from "./ErrorDisplay"

const ReviewForm = (props) => {
  const [newReview, setNewReview] = useState ({
    title:"",
    rating:"",
    heatIndex:"",
    body:""
  })
  const [errors, setErrors] = useState({})

  const postReview = async (formData) =>{
    
    try{
      const response = await fetch(`/api/v1/sauces/${props.sauce.id}/reviews`, {
        credentials: "same-origin",
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({review: formData})
      })
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.status.text})`
        const error = new Error(errorMessage)
        throw(error)
      }
      const reviewObject = await response.json()
      appendNewReview(reviewObject.review)

    } catch(error) {
      console.log(`Error in fetch: ${error}`)
    }
  }

  const handleChange = (event) => {
    setNewReview ({
      ...newReview,
      [event.currentTarget.name]: event.currentTarget.value
    })
  }

  const validForSubmission = () => {
    let submitErrors = {}
    const requiredFields = ["title", "rating", "heatIndex", "body"]
    requiredFields.forEach(field => {
      if (newReview[field].trim() == "") {
        submitErrors = {
          ...submitErrors,
          [field]: "cannot be blank"
        }
      }
      setErrors(submitErrors)
    })
    return errors
  }

  const handleFormSubmit = (event) => {
    event.preventDefault()
    
    if (validForSubmission()) {
      postReview(newReview)
      setNewReview ({
        title:"",
        rating:"",
        heatIndex:"",
        body:""
      })
    }
  }

  const appendNewReview = (reviewPayload) => {
    const newReviews = props.sauce.reviews
    newReviews.push(reviewPayload)
    const sauceWithNewReview = {
      ...props.sauce,
      reviews: newReviews
    }
    props.setSauce(sauceWithNewReview)
  }

  return (
    <form className="new-review-form" onSubmit={handleFormSubmit}>
      <ErrorDisplay 
        errors={errors}
      />
      <label> Title:
        <input
          name="title"
          id="title"
          type="text"
          onChange={handleChange}
          value={newReview.title}
        />
      </label>
      <label> Rating:
        <input 
          name="rating"
          id="rating"
          type="number"
          min="1"
          max="5"
          step="1"
          onChange={handleChange}
          value={newReview.rating}
        />
      </label>
      <label> Heat Index:
        <input 
          name="heatIndex"
          id="heatIndex"
          type="number"
          min="0"
          max="10"
          step="1"
          onChange={handleChange}
          value={newReview.heatIndex}
        />
      </label>
      <label> body:
        <input 
          name="body"
          id="body"
          type="text"
          onChange={handleChange}
          value={newReview.body}
        />
      </label>
  
      <div className="button-group">
        <input className="button" type="submit" value="Submit Review" />
      </div>
    </form>
  )
}

export default ReviewForm