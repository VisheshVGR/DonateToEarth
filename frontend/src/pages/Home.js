import React, { useState, useEffect } from "react"
import { db } from "./Firebase"
import { collection, query, orderBy, onSnapshot, limit} from "firebase/firestore";

import { Link } from "react-router-dom"
import { Button, Container } from "react-bootstrap"

const Home = () => {
    // USE STATE
    const [contributors, setContributors] = useState([
        {
            amount: "0",
            photoURL: "",
            displayName: "Sign In To See Top Contributors...",
            key: "key_99"
        }
    ])

    // USE EFFECT
    useEffect(() => {
        const messagesRef = collection(db, "donatetoearth-contributors")
        // const q = query(messagesRef, orderBy("createdAt", "desc"), limit(200))
        const q = query(messagesRef, orderBy("amount"),limit(50))

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const tempContributors = []
            querySnapshot.forEach((doc) => {
                tempContributors.push({ ...doc.data(), key: doc.id })
            });
            tempContributors.reverse()

            setContributors(tempContributors)
        });

        return () => {
            unsubscribe()
        }
    }, [])

    const Contributor = (props) => {
        // console.log(props.data)
        const { displayName, photoURL, amount } = props.data
        return (
            <>
                <div className="contributor">
                    <img className="col-2 d-inline-block" src={photoURL} alt="" />
                    <p className="col-8 d-inline-block">{displayName}</p>
                    <p className="col-2 d-inline-block">₹ {amount},000</p>
                </div>
            </>
        )
    }

    return (
        <>
            <Container className="col-md-10 mx-auto text-light">
                <h2 className="mt-5 col-md-6 bg-light p-5 fw-bolder text-dark">TOGETHER, WE CAN MAKE
                    THE WORLD A BETTER PLACE
                </h2>
                <Link to="/donate">
                    <Button variant="danger p-2 px-5 my-3 fw-bolder">Donate</Button>
                </Link>


                <section className="w-100 bg-light text-dark p-4 mt-5 opacity-75">
                    <h2 className="col-md-8 mb-3">OUR ACTIONS ARE DESTROYING OUR PLANET. TAKE ACTION NOW BEFORE IT’S TOO LATE.</h2>
                    <p>Less than 11 percent of Canada’s plastics get recycled. The rest end up in our lakes, parks, landfills, and oceans, destroying ecosystems and leaching toxic chemicals. If we don’t start protecting our planet we will jeopardize our future.
                    </p>
                    <h3 className="text-danger">FUNDING CONSERVATION INITIATIVES</h3>
                    <p>To ensure the survival of our environment, charities across the country are funding work that nurture the health, diversity, and sustainability of our environment through initiatives aimed at preserving and conserving our parks and forests. This includes natural parks, trails, and watersheds, forest conservancies, wildlife societies, and much more.
                        Without your help, they won’t be able to safeguard our planet.</p>
                    <h3 className="text-warning">JOIN US IN PROTECTING OUR WORLD</h3>
                    <p>We only have one earth. It’s up to us to save it and ensure its sustainability for future generations. Donate to the Protect the Environment Fund today. Your gift will help save our water, air, and natural habitats.</p>
                    <h3 className="text-info">ABOUT THE DONATE TO EARTH FUND</h3>
                    <p>The Protect the Donate To Earth Fund includes over 530 registered charities.  The charities in this Fund are selected through an algorithmic approach, taking the charity’s area of focus, mission, and description into account.</p>
                    <Link to="/donate">
                        <Button variant="danger p-2 px-5 my-3 fw-bolder mx-auto d-block">Donate</Button>
                    </Link>
                </section>


                <section className="w-100 bg-info p-4 text-dark my-4 opacity-75 contributor-section">
                    <h3 className="text-center text-danger text-decoration-underline">SEE WHO CONTRIBUTED TO THIS CAUSE
                    </h3>
                    <div className="contributor">
                        {/* <img className="col-2 d-inline-block" src={photoURL} alt="" /> */}
                        <img className="col-2 d-inline-block opacity-0" src="#" alt="" />
                        <p className="col-8 d-inline-block text-decoration-underline fw-bolder text-danger">Name</p>
                        <p className="col-2 d-inline-block text-decoration-underline fw-bolder text-danger">Amount</p>
                    </div>
                    {contributors && contributors.map((msg) => <Contributor key={msg.key} data={msg} />)}
                </section>

            </Container>
        </>
    )
}

export default Home