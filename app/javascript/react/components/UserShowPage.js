import React, { useEffect, useState } from "react";
import _ from "lodash";
const UserShowPage = (props) => {
    const [user, setUser] = useState({})
    
    useEffect(() =>{
        fetchUser()
    }, [])

    const fetchUser = async () => {
        try{
            const response = await fetch(`/api/v1/users/${props.match.params.id}`)
            if (!response.ok){
                const errorMessage = `${response.status} (${response.statusText})`
                const error = new Error (errorMessage)
                throw(error)
            }
            const userObject = await response.json()
            setUser(userObject)
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
    return (
      <div className="grid-container">
        <div className="grid-x">
          <div className="cell small-12 medium-4">
            <img src={user.avatar.url} alt= {`${user.dippr_handle}`} />
            <h4 className="sauce-title-text">{user.dippr_handle}</h4>
            <p className="sauce-title-text">Dipping since {formatDate()}</p>
          </div>
        </div>
      </div>
    )
}

export default UserShowPage