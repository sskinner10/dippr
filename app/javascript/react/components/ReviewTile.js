import React from "react";


const ReviewTile = props =>{
  return(
    <div className="review-tile">
      <h2>{props.title}</h2>
      <h3>{props.rating}</h3>
      <h3>{props.heatIndex}</h3>
      <p>{props.body}</p>
      <hr/>
    </div>
  )
}
export default ReviewTile