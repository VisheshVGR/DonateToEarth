import React from "react"
import { Link } from "react-router-dom"
import { Button } from "react-bootstrap"

const Error = () => {
    return (
        <>
            <div className="col-md-6 m-5 p-5 mx-auto text-light bg-dark opacity-75 justify-content-center align-items-center error-page">
            <h2>
                404 : Page Not Found :-(
            </h2>
                <Link to="/">
                    <Button variant="outline-danger">Back to Home</Button>
                </Link>
            </div>

        </>
    )
}

export default Error