import React, { useState, useEffect } from 'react'
import _ from 'lodash'
import ReviewForm from './ReviewForm'

const SauceShowPage = (props) => {
    const [sauce, setSauce] = useState({})

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
            setSauce(sauceObject)
        } catch (error) {
            console.error(`Error in fetch: ${error.message}`)
        }
    }

    if (_.isEmpty(sauce)) {
      return null
    }

    return (
      <div className="grid-container">
        <div className="grid-x">
          <div className="cell small-12 medium-4"> 
            <img src={sauce.image_url} all={`${sauce.name} (${sauce.brand})`} />
            <h5 className="sauce-title-text">{sauce.name} ({sauce.brand})</h5>
            <p>{sauce.description}</p>
          </div>
          <div> 
            <ReviewForm setSauce = {setSauce} sauce = {sauce} />
            <div>
              <h1>
              Review Tile goes here 
              </h1>
            </div>
          </div>
        </div>
      </div>
    )
}

export default SauceShowPage