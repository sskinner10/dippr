import React from "react";

const ReviewTile = props =>{

  const dateString = new Date(props.createdAt).toDateString()
  
  return(
    <div className="review-tile callout">
      <div className="">
        <h3 className="review-tile-title-text">{props.title}</h3>
        <div className="grid-x" >
          <h5 className="cell small-6 medium-4 review-tile-rating-text" > {`Rating: ${props.rating}/5`}</h5>
          <h5 className="cell small-6 medium-4 review-tile-rating-text" >{`Heat Index: ${props.heatIndex}/10`}</h5>
        </div>
      </div>
      <p className="callout review-body review-body-text">{props.body}</p>
      <p className="date-text"> {dateString} </p>
    </div>
  )
}
export default ReviewTile