import React, { useEffect, useState } from "react"
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons'

library.add(faArrowUp, faArrowDown);

const ReviewTile = props =>{
  const [selectedButton, setSelectedButton] = useState(null)
  const [reviewKarma, setReviewKarma] = useState(0)
  const [error, setError] = useState(null)

  const dateString = new Date(props.createdAt).toDateString()

  useEffect(() => {
    setReviewKarma(props.totalKarma)
    setSelectedButton(props.currentUserVote)
  }, [props.totalKarma, props.currentUserVote])

  const karmaClickHandler = (event) => {
    let formPayload = {
      review_id: props.id
    }
    if (event.currentTarget.id == "upvote") {
      formPayload = {
        vote_type: 1,
        ...formPayload
      }
      fetchKarma(formPayload)
    } else {
      formPayload = {
        vote_type: -1,
        ...formPayload
      }
      fetchKarma(formPayload)
    }
  }

  const fetchKarma = async (payload) => {
    try {
      const response = await fetch(`/api/v1/votes`, {
        credentials: "same-origin",
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      })
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        throw new Error(errorMessage)
      }
      const responseBody = await response.json()
      if (responseBody.error) {
        setError(responseBody.error)
      } else {
        setReviewKarma(responseBody.karma)
        setSelectedButton(responseBody.vote.vote_type)
        setError(null)
      }
    } catch (error) {
      console.error(`Error in Fetch: ${error.message}`)
    }
  }
  
  let upvoteSelected = ""
  let downvoteSelected = ""
  if (selectedButton > 0) {
    upvoteSelected = "upvote-selected"
  } else if (selectedButton < 0) {
    downvoteSelected = "downvote-selected"
  }

  const deleteReviewFetch = async () => {
    try {
      const response = await fetch(`/api/v1/sauces/${props.sauce.id}/reviews/${props.id}`,{
        credentials: "same-origin",
        method: "DELETE",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({user_id: props.reviewUserId})
      }) 
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.status.text})`
        const error = new Error(errorMessage)
        throw(error)
      }
      props.setSauce({
        ...props.sauce,
        reviews: props.sauce.reviews.filter(review => review.id != props.id)
      })
    } catch (error) {
      console.log(`Error in fetch: ${error}`)
    }
  }

  const deleteReviewClickHandler = (event) => {
    event.preventDefault()
    deleteReviewFetch()
  }

  let reviewDeleteButton = null

  if (props.currentUser.role === 'admin' || props.currentUser.id === props.reviewUserId) {
    reviewDeleteButton = (
      <button className="button" onClick={deleteReviewClickHandler}>Delete this review</button>
    )
  }

  const errorDisplay = () => {
    if (error) {
      return (
        <p>{error}</p>
      )
    }
  }

  return(
    <div className="review-tile callout">
      <div className="">
        <div className="grid-x align-justify">
          <h3 className="review-tile-title-text">{props.title}</h3>
          {reviewDeleteButton}
        </div>
        <div className="grid-x" >
          <h5 className="cell small-6 medium-4 review-tile-rating-text" > {`Rating: ${props.rating}/5`}</h5>
          <h5 className="cell small-6 medium-4 review-tile-rating-text" >{`Heat Index: ${props.heatIndex}/10`}</h5>
        </div>
          <p className="callout review-body review-body-text">{props.body}</p>
        <div>
          <div className="grid-x review-footer" >
            <FontAwesomeIcon id="upvote" onClick={karmaClickHandler} className={`${upvoteSelected} cell small-1 vote-arrows`} icon="fa-solid fa-arrow-up" />
            <span className="cell small-1 text-center">{reviewKarma}</span>
            <FontAwesomeIcon id="downvote" onClick={karmaClickHandler} className={`${downvoteSelected} cell small-1 vote-arrows`} icon="fa-solid fa-arrow-down" />  
            <p className="date-text cell auto text-right"> {dateString} </p>
          </div>
          <div className="error-display">
            {errorDisplay()}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReviewTile