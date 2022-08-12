import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"
import _ from "lodash";
import ReviewTile from "./ReviewTile";

const UserShowPage = (props) => {
    const [user, setUser] = useState({})
    
    useEffect(() =>{
        fetchUser()
    }, [])

    const fetchUser = async () => {
        try {
            const response = await fetch(`/api/v1/users/${props.match.params.id}`)
            if (!response.ok){
                const errorMessage = `${response.status} (${response.statusText})`
                const error = new Error (errorMessage)
                throw(error)
            }
            const userObject = await response.json()
            setUser(userObject.user)
        } catch (error){
            console.error(`Error in fetch: ${error.message}`)
        }
    }

    if (_.isEmpty(user)) {
        return null
    }

    const formatDate = () =>{    
        return new Date(user.created_at).toDateString()
    }

    const setSauce = (sauce) => {
      console.log(sauce)
    }

    const reviewTiles = user.reviews.map((review)=>{

      const hasUserVoted = review.votes.filter(vote => vote.user_id === user.id)
      
      let currentUserVote = null
      
      if (hasUserVoted.length > 0) {
        currentUserVote = hasUserVoted.at(0).vote_type
      }
      
      return(
        <div key={review.id} className="review-tile">
          <p className='now-font'> Review left at <Link className="ketchup-text" to={`/sauces/${review.my_sauce.id}`} > {review.my_sauce.name} </Link>. </p>
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
            currentUser={user}
            sauce={review.my_sauce}
            setSauce={setSauce}
          />
        </div>
      )  
    })
    
    return (
      <div className="user-profile-tile callout grid-container">
        <div className="grid-x grid-margin-x">

          <div className="cell small-12 medium-4">
            <div className="center" >
              <img src={user.avatar.url} alt= {`${user.dippr_handle}`} className="user-avatar-large" />
            </div>
            <h4 className="sauce-title-text">{user.dippr_handle}</h4>
            <p className="sauce-title-text">Dipping since {formatDate()}</p>
            <a className="button secondary edit-button" href={`/users/edit`} > Edit Profile </a>
          </div>

          <div className="reviews-index-tile cell small-12 medium-8">
            {reviewTiles}
          </div>

        </div>
      </div>
    )
}

export default UserShowPage