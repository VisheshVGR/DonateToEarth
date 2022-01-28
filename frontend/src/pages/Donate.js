import React, { useEffect, useState } from "react"
import { db } from "./Firebase"
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom"
import { Button, Card, ButtonToolbar, ButtonGroup, Form } from "react-bootstrap"



const Donate = (props) => {
    const [amount, setAmount] = useState(1)
    const [userData, setUserData] = useState({
        displayName: "",
        email: "",
        photoURL: "",
        phoneNumber: ""
    })

    const navigate = useNavigate()
    const currUser = props.currUser
    // console.log(currUser)

    // USE EFFECT
    useEffect(() => {
        if (!currUser){
            navigate('/')
            alert("You must be Signed In to Donate!!!")
        }
        else {
            setUserData({
                ...userData,
                displayName: currUser.displayName,
                email: currUser.email,
                photoURL: currUser.photoURL
            })
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currUser, navigate])


    const displayRazorPay = async () => {
        const { email } = currUser

        const data = await fetch("/razorpay", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ amount: amount * 1000 })
        }).then((data) => data.json());

        // console.log(data)

        var options = {
            "key": data.key,
            "amount": data.amount,
            "currency": data.currrency,
            "name": "Donate To Earth",
            "description": "Donation to save planet Earth.",
            "image": "/logo.png",
            "order_id": data.id,
            "handler": function (response) {
                updateContributor(response.razorpay_payment_id,response.razorpay_order_id,response.razorpay_signature)
                alert("Payment Successfull")
            },
            "prefill": {
                "name": userData.displayName,
                "email": email,
                "contact" : `+91${userData.phoneNumber}`
            },
            "notes": {
                "address": "Razorpay Corporate Office"
            },
            "theme": {
                "color" : "#506AD4"
            }
        };
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
        paymentObject.on('payment.failed', function (response) {
            console.log(response.error.code);
            console.log(response.error.description);
            console.log(response.error.source);
            console.log(response.error.step);
            console.log(response.error.reason);
            console.log(response.error.metadata.order_id);
            console.log(response.error.metadata.payment_id);
            alert("Payment Failed")
        });

    }


    const updateContributor = async (razorpay_payment_id,razorpay_order_id,razorpay_signature) => {

        try {
                await addDoc(collection(db, "donatetoearth-contributors"), {
                createdAt: serverTimestamp(),
                uid: currUser.uid,
                photoURL: currUser.photoURL,
                displayName: userData.displayName,
                email: currUser.email,
                phoneNumber: userData.phoneNumber,
                amount: amount,
            });
            // console.log(docRef)
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }



    return (
        <>
            <Card bg="light opacity-75 my-5 mx-auto col-md-8">
                <Card.Header>#NURTURENATURE</Card.Header>
                <Card.Body>
                    <Card.Title>DONATE TODAY: SAVE THE PLANET</Card.Title>
                    <Card.Text>
                        Nature is vital. It provides our life support system and we cannot survive without it. But our world is now under threat like never before. In the last 44 years we have lost 60% of our wildlife populations. Globally we are all using the planet's resources faster than nature can restore itself. So we must all act right now to reverse the damage and restore nature. We have the solutions, we just need the collective will. This Earth Day, make a choice to change this.
                    </Card.Text>

                    <ButtonToolbar aria-label="Toolbar with button groups" className="my-5 d-block">
                        <p className="h3 w-100 text-center" >Choose your gift amount</p>
                        <Form>
                            <Form.Group className="mb-3" controlId="formBasicName">
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text" placeholder="Enter full name" value={userData.displayName} onChange={(e)=>setUserData({...userData, displayName : e.target.value})}/>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" disabled placeholder="Enter email"  value={userData.email}/>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPhoneNumber">
                                <Form.Label>Phone number</Form.Label>
                                <Form.Control type="number" placeholder="Enter phone number"  value={userData.phoneNumber} onChange={(e)=>setUserData({...userData, phoneNumber : e.target.value})}/>
                            </Form.Group>
                        </Form>

                        <ButtonGroup className="flex-wrap w-100" variant="primary" aria-label="First group">
                            <Button variant="outline-primary" onClick={() => setAmount(1)}>₹ 1,000</Button>
                            <Button variant="outline-primary" onClick={() => setAmount(2)}>₹ 2,000</Button>
                            <Button variant="outline-primary" onClick={() => setAmount(5)}>₹ 5,000</Button>
                            <Button variant="outline-primary" onClick={() => setAmount(10)}>₹ 10,000</Button>
                        </ButtonGroup>
                    </ButtonToolbar>

                </Card.Body>


                <Button variant="success my-4 w-50 mx-auto" onClick={displayRazorPay}>Donate ₹ {amount},000</Button>
                <Card.Footer className="text-muted text-center">Thanks for your support</Card.Footer>
            </Card>
        </>
    )
}

export default Donate