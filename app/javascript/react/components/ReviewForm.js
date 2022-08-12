import _ from "lodash"
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
    try {
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

      if (reviewObject.review) {
        appendNewReview(reviewObject.review)
      } else if (reviewObject.error) {
        setErrors({'error: ': reviewObject.error})
      }

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
    const requiredFields = ["title", "rating", "heatIndex"]
    requiredFields.forEach(field => {
      if (newReview[field].trim() == "") {
        submitErrors = {
          ...submitErrors,
          [field]: "cannot be blank"
        }
      }
    })
    if (_.isEmpty(submitErrors)) {
      return true
    } 
    setErrors(submitErrors)
    return false
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
    props.setSauce({
      ...props.sauce,
      reviews: newReviews
    })
    props.setReviewFormExpanded(false)
  }

  const closeForm = () => {
    props.setReviewFormExpanded(false)
  }

  return (
    <form className="callout napkin now-font new-review-form" onSubmit={handleFormSubmit}>
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
      <div className="grid-x grid-margin-x" >
        <label className="cell small-6" > Rating:
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
        <label className="cell small-6" > Heat Index:
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
      </div>
      <label> Body:
        <textarea
          rows={4}
          cols={50} 
          name="body"
          id="body"
          type="text"
          onChange={handleChange}
          value={newReview.body}
        />
      </label>
  
      <div className="button-group">
        <input className="button success" type="submit" value="Submit Review" />
        <div className="button alert" onClick={closeForm} > Close Form </div>
      </div>
    </form>
  )
}

export default ReviewForm