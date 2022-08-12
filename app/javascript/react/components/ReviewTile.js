import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
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
      if (props.sauce.reviews) {
        props.setSauce({
          ...props.sauce,
          reviews: props.sauce.reviews.filter(review => review.id != props.id)
        })
      } else {
        props.setSauce()
      }
    } catch (error) {
      console.log(`Error in fetch: ${error}`)
    }
  }

  const deleteReviewClickHandler = (event) => {
    event.preventDefault()
    deleteReviewFetch()
  }

  let reviewDeleteButton = null

  if (props.sauce.reviews) {
    if (props.currentUser.role === 'admin' || props.currentUser.id === props.reviewUserId) {
      reviewDeleteButton = (
        <button className="button alert expanded" onClick={deleteReviewClickHandler}>Delete this review</button>
      )
    }
  }

  const errorDisplay = () => {
    if (error) {
      return (
        <p>{error}</p>
      )
    }
  }

  return(
    <div className="review-tile callout now-font napkin">
      <div className="grid-x">
        <div className="cell small-3 medium-2 review-poster-avatar" >
          <Link to={`/users/${props.reviewUserId}`} >
            <img className="user-avatar-small" src={`${props.userAvatar}`} />
          </Link>
        </div>
        <div className="cell auto " >
          <h3 className="review-tile-title-text now-font"><strong>{props.title}</strong></h3>
          <div className="grid-x" >
            <h5 className="cell small-12 medium-6 now-font scoring-cell" > {`Rating: ${props.rating}/5`}</h5>
            <h5 className="cell small-12 medium-6 now-font scoring-cell" >{`Heat Index: ${props.heatIndex}/10`}</h5>
          </div>
          </div>
      </div>
      <div className="callout review-body review-body-text" >
        <p className="review-poster-handle" > <Link to={`/users/${props.reviewUserId}`} className="ketchup-text" ><i> @{props.userHandle} </i></Link>writes: </p>
        <p >{props.body}</p>
      </div>
      <div>
        <div className="grid-x review-footer" >
          <FontAwesomeIcon id="upvote" onClick={karmaClickHandler} className={`${upvoteSelected} cell small-1 vote-arrows upvote`} icon="fa-solid fa-arrow-up" />
          <span className="cell small-1 text-center">{reviewKarma}</span>
          <FontAwesomeIcon id="downvote" onClick={karmaClickHandler} className={`${downvoteSelected} cell small-1 vote-arrows downvote`} icon="fa-solid fa-arrow-down" />  
          <p className="date-text cell auto text-right"><i> {dateString} </i></p>
        </div>
        <div className="error-display">
          {errorDisplay()}
        </div>
        <div>
          {reviewDeleteButton}
        </div>
      </div>
    </div>
  )
}

export default ReviewTile