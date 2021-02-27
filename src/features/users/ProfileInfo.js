export const ProfileInfo = ({ username, name, picUrl }) => {

  return (
    <div className="profile-info">
      <img className="pic" src={picUrl} alt="profile pic">
      </img>
      <div className="name">Welcome: {name}</div>
      <div className="username">username: {username}</div>
    </div>
  )
}