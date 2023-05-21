import "./Spinner.css";

const Spinner = ({loadSpinner}) => {
  return (
    (loadSpinner === true)?
    <div className="spinner-container">
      <div className="loading-spinner">

      </div>
    </div>
    : null
  )
}

export default Spinner
