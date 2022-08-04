import React, { useState } from "react"

const ReviewForm = (props) => {
  const [newReview, setNewReview] = useState ({
    title:"",
    rating:"",
    heatIndex:"",
    description:""
  })

  const handleChange = (event) => {
    setNewReview ({
      ...newReview,
      [event.currentTarget.name]: event.currentTarget.value
    })
  }

  const handleFormSubmit = (event) => {
    event.preventDefault()
    props.addNewReview(newReview)

    setNewReview ({
      title:"",
      rating:"",
      heatIndex:"",
      description:""
    })
  }

  return (
    <form className="new-review-form" onSubmit={handleFormSubmit}>
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
          type="integer"
          onChange={handleChange}
          value={newReview.rating}
        />
      </label>
      <label> Heat Index:
        <input 
          name="heatIndex"
          id="heatIndex"
          type="integer"
          onChange={handleChange}
          value={newReview.heatIndex}
        />
      </label>
      <label> Description:
        <input 
          name="description"
          id="description"
          type="text"
          onChange={handleChange}
          value={newReview.description}
        />
      </label>
  
      <div className="button-group">
        <input className="button" type="submit" value="Submit Review" />
      </div>
    </form>
  )
}

export default ReviewForm