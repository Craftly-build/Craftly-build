import "../styles/loading.css"

const LoadingSpinner = ({ size = "medium", fullPage = false }) => {
  return (
    <div
      className={`loader ${size} ${fullPage ? "full-page" : ""}`}
      role="status"
      aria-live="polite"
      aria-label="Loading..."
    >
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <span className="sr-only">Loading...</span>
    </div>
  )
}

export default LoadingSpinner

