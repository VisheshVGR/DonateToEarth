import React, { useState } from "react"
import { Route, Routes, Link } from "react-router-dom"
import { auth } from "./pages/Firebase.js"
import { signInWithRedirect, GoogleAuthProvider, signOut, onAuthStateChanged } from "firebase/auth";
import { Container, Row, Navbar, Button } from "react-bootstrap"
import './custom.scss';

import './App.css';

// IMPORTING PAGES
import Home from "./pages/Home"
import Donate from "./pages/Donate"
import Error from "./pages/Error";

const provider = new GoogleAuthProvider();

function App() {

  // USE STATE
  const [currUser, setCurrUser] = useState(null);


  const signInWithGoogle = async () => {
    try {
      await signInWithRedirect(auth, provider)
      // console.log("SUCCESFULLY LOGGED IN")
    } catch (e) {
      console.log("LOG IN ERROR", e)
    }
  }

  const signOutWithGoogle = () => {
    signOut(auth).then(() => {
      // console.log("SUCCESSFULLY LOGGED OUT")
    }).catch((error) => {
      console.log("LOG OUT ERROR", error)
    });
  }

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setCurrUser(user)
    } else {
      setCurrUser(null)
    }
  });

  // console.log(currUser)


  const Nav = () => {
    return (
      <>

        <Navbar bg="primary" variant="dark">
          <Container>
            <Link to="/">
              <Navbar.Brand><i className="fas fa-seedling"></i> Donate To Earth</Navbar.Brand>
            </Link>

            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
              <Navbar.Text>
                <Button variant="outline-success">
                  {currUser ?
                    <i onClick={signOutWithGoogle} className="fas fa-sign-out-alt sign-in-out-btn"> Sign Out</i>
                    :
                    <i onClick={signInWithGoogle} className="fas fa-sign-in-alt sign-in-out-btn"> Sign In</i>
                  }
                </Button>
              </Navbar.Text>
            </Navbar.Collapse>
          </Container>
        </Navbar>




      </>
    )
  }

  const Footer = () => {
    return (
      <footer className="w-100 p-4 d-flex flex-column justify-content-center align-items-center bg-dark">
        <div className="wrapper">
          <div className="button-social" onClick={() => window.open("https://www.instagram.com/vishesh22_17/")}>
            <div className="icon">
              <i className="fab fa-instagram"></i>
            </div>
            <span>Instagram</span>
          </div>

          <div className="button-social" onClick={() => window.open("https://www.linkedin.com/in/vishesh-vgr/")}>
            <div className="icon">
              <i className="fab fa-linkedin"></i>
            </div>
            <span>Linkedin</span>
          </div>

          <div className="button-social" onClick={() => window.open("https://github.com/VisheshVGR")}>
            <div className="icon">
              <i className="fab fa-github"></i>
            </div>
            <span>Github</span>
          </div>
        </div>

        <p className="text-white footer-logo pt-4">
          <Link to="/">
            <Navbar.Brand><i className="fas fa-seedling"></i> Donate To Earth</Navbar.Brand>
          </Link>
          2022 &#169; All Rights Reserved.
        </p>

      </footer>
    )
  }

  return (
    <>
      <Container fluid="xxl">
        <Row>
          <Nav />
        </Row>
        <Row>
          <Routes>
            <Route exact path="/donate" element={<Donate currUser={currUser} />}>
            </Route>
            <Route exact path="/" element={<Home />}>
            </Route>
            <Route path="*" element={<Error />}>
            </Route>
          </Routes>
        </Row>
        <Row>
          <Footer />
        </Row>
      </Container>

    </>
  );
}

export default App;
