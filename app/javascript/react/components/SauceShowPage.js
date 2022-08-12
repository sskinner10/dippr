import React, { useState, useEffect } from 'react'
import _ from 'lodash'
import ReviewForm from './ReviewForm'
import ReviewTile from './ReviewTile'

const SauceShowPage = (props) => {
    const [sauce, setSauce] = useState({})
    const [currentUser, setCurrentUser] = useState({})
    const [reviewFormExpanded, setReviewFormExpanded] = useState(false)
    
    useEffect(() => {
      fetchSauce()
    }, [])

    const fetchSauce = async () => {
      try {
        const response = await fetch(`/api/v1/sauces/${props.match.params.id}`)
        if (!response.ok) {
          const errorMessage = `${response.status} (${response.statusText})`
          const error = new Error (errorMessage)
          throw(error)
        }
        const sauceObject = await response.json()
        setSauce(sauceObject.sauce)
        
        if (sauceObject.sauce.current_user) {
          setCurrentUser(sauceObject.sauce.current_user)
        }
      } catch (error) {
        console.error(`Error in fetch: ${error.message}`)
      }
    }
    
    if (_.isEmpty(sauce)) {
      return null
    }

    const reviewTiles = sauce.reviews.map((review)=>{

      const hasUserVoted = review.votes.filter(vote => vote.user_id === currentUser.id)
      
      let currentUserVote = null
      
      if (hasUserVoted.length > 0) {
        currentUserVote = hasUserVoted.at(0).vote_type
      }
      
      return(
        <ReviewTile
          key={review.id}
          id={review.id}
          userAvatar={review.user.avatar.url}
          userHandle={review.user.dippr_handle}
          reviewUserId={review.user_id}
          title={review.title}
          rating={review.rating}
          heatIndex={review.heatIndex}
          body={review.body}
          createdAt={review.created_at}
          totalKarma={review.total_karma}
          currentUserVote={currentUserVote}
          currentUser={currentUser}
          sauce={sauce}
          setSauce={setSauce}
        />
      )  
    })
    
    let sauceDescription = sauce.description
    if (sauceDescription == "") {
      sauceDescription = "No description provided"
    }

    const reviewFormShowing = () => {
      if (reviewFormExpanded) {
        return (
          <ReviewForm setSauce={setSauce} sauce={sauce} setReviewFormExpanded={setReviewFormExpanded} />
        )
      } else {
        return (
          <div className='new-review-button'>
            <div className='button secondary expanded rounded mayo-text bold' onClick={expandForm}> Leave a Review for this Sauce </div>
          </div>
        )
      }
    }

    const expandForm = () => {
      setReviewFormExpanded(true)
    }
    
    return(
      <div className="grid-container">
        <div className="sauce-show-container grid-x grid-margin-x">
          
          <div className="now-font sauce-show-tile cell small-12 medium-4"> 
            <div className='sauce-show-image-wrapper' >
              <img className="sauce-show-image" src={sauce.sauce_image} alt={`${sauce.name} (${sauce.brand})`} />
            </div>
            <h3 className="now-font sauce-card-title ketchup-text" ><strong> {sauce.name} </strong></h3>
            <h4 className="now-font sauce-card-subtitle ketchup-text" ><strong> ({sauce.brand}) </strong></h4>
        
            <p className='sauce-show-description-container callout'>{sauceDescription}</p>
          </div>
          
          <div className='reviews-index-tile cell small-12 medium-8'>
            <hr/>
            <div> 
              {reviewFormShowing()}
            </div>
            <hr></hr>
            <div className='cell small-12 medium-8 large-7'>
              <h3 className='now-font'> Reviews: </h3>
              <div>
                {reviewTiles}          
              </div>
            </div>
          </div>
        </div>
      </div>
    )
}
    

export default SauceShowPage