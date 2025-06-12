import React from 'react'
import { useSelector } from 'react-redux'

const Profile = () => {
  const user= useSelector((store) => store.user)
  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg">Loading...</p>
      </div>
    )
  }
  return (
    <div>
      <div className="flex justify-center items-center h-screen">
        <div className="card bg-primary text-primary-content w-96">
          <div className="card-body">
            <h2 className="card-title">Profile</h2>
            <p>Welcome to your profile page!</p>
            <div>
              {user.firstName ? <p>First Name: {user.firstName}</p> : null}
              {user.lastName ? <p>Last Name: {user.lastName}</p> : null}
              {user.emailId ? <p>Email: {user.emailId}</p> : null}
            </div>
            <div className="card-actions justify-end">
              <button className="btn">Edit Profile</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
