import React, { useState } from "react"
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons'

library.add(faArrowUp, faArrowDown);

const ReviewTile = props =>{
  const [selectedButton, setSelectedButton] = useState("")
  const [reviewKarma, setReviewKarma] = useState(props.totalKarma)

  const dateString = new Date(props.createdAt).toDateString()

  const karmaClickHandler = (event) => {
    let formPayload = {
      review_id: props.id
    }
    if(event.currentTarget.id == "upvote") {
      formPayload = {
        vote_type: 1,
        ...formPayload
      }
      props.fetchKarma(formPayload)
    } else {
      formPayload = {
        vote_type: -1,
        ...formPayload
      }
      props.fetchKarma(formPayload)
    }

  }
  
  return(
    <div className="review-tile callout">
      <div className="">
        <h3 className="review-tile-title-text">{props.title}</h3>
        <div className="grid-x" >
          <h5 className="cell small-6 medium-4 review-tile-rating-text" > {`Rating: ${props.rating}/5`}</h5>
          <h5 className="cell small-6 medium-4 review-tile-rating-text" >{`Heat Index: ${props.heatIndex}/10`}</h5>
        </div>
          <p className="callout review-body review-body-text">{props.body}</p>
        <div>
          <div className="grid-x review-footer" >
            <FontAwesomeIcon id="upvote" onClick={karmaClickHandler} className="cell small-1 vote-arrows" icon="fa-solid fa-arrow-up" />
            <span className="cell small-1 text-center">{reviewKarma}</span>
            <FontAwesomeIcon id="downvote" onClick={karmaClickHandler} className="cell small-1 vote-arrows" icon="fa-solid fa-arrow-down" />  
            <p className="date-text cell auto text-right"> {dateString} </p>
          </div>
        </div>
      </div>
    </div>
  )
}
export default ReviewTile