import React, { useEffect, useState } from "react"
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons'

library.add(faArrowUp, faArrowDown);

const ReviewTile = props =>{
  const [selectedButton, setSelectedButton] = useState(null)
  const [reviewKarma, setReviewKarma] = useState(null)
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
          <img className="user-avatar-small" src={`${props.userAvatar}`} />
        </div>
        <div className="cell auto " >
          <h3 className="review-tile-title-text now-font"><strong>{props.title}</strong></h3>
          <div className="grid-x" >
            <h5 className="cell small-6 medium-5 now-font" > {`Rating: ${props.rating}/5`}</h5>
            <h5 className="cell auto now-font" >{`Heat Index: ${props.heatIndex}/10`}</h5>
          </div>
          </div>
      </div>
      <div className="callout review-body review-body-text" >
        <p className="review-poster-handle" > @{props.userHandle} writes: </p>
        <p >{props.body}</p>
      </div>
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
  )
}
export default ReviewTile