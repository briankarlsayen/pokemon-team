import loadingIcon from '../images/loading.png'

function Loading() {
  return (
    <div className="loading__container">
      <img className="loading__icon" alt="loading icon" src={loadingIcon} />
    </div>
  )
}

export default Loading
