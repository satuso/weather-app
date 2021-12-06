const Header = ({ submitForm, userInput, handleChange, getLocation }) => {
  return (
    <div className="header">
      <h1><i className="fas fa-cloud-sun"></i>Weather</h1>
      <div className="search">
        <button 
          className="location-btn"
          alt="current location"
          onClick={getLocation}>
            <i className="fas fa-compass"></i>
        </button>
        <form onSubmit={submitForm}>
          <input
            type="text" 
            placeholder="search location"
            className="search-input"
            value={userInput}
            onChange={handleChange}
            onFocus={(e) => e.target.placeholder = ""}
          />
        </form>
      </div>
    </div>
  )
}
export default Header