import { MdError } from "react-icons/md"
import "./errorHandler.css";

function ErrorHandle({message , onRetry}) {
    return (
    <div className="error-handler">
        <div className="err-msg">
        <MdError />
        <h2>{message}</h2>
        </div>
        {onRetry && <button onClick={onRetry}>Retry</button>}
    </div>
    )
}

export default ErrorHandle