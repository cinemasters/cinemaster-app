import {useSelector} from "react-redux";
import {Navigate} from "react-router-dom";

export default function AuthorizeView(props) {
    let isAuthenticated = useSelector((state) => state.account.isAuthenticated);

    return (
        <>
            {
                isAuthenticated ? <>{props.children}</> : <Navigate to="/login"/>
            }
        </>
    )
}