import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'

const WelcomePage = () => {
  const [user, setUser] = useState(null)
  const { id } = useParams()

  useEffect(() => {
    axios.get(`/api/users/getcurrent/${id}`)
      .then(res => {
        console.log(res.data)
        setUser(res.data)
      })
      .catch(err => console.error(err))
  }, [])

  return (
    <div>
      {user && (
        <h1>Hai {user.name}</h1>
      )}
    </div>
  )
}

export default WelcomePage