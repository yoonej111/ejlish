import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useRouter } from "next/router";
import Link from "next/link";


export default function Header() {

  return (
    <>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home" style={{paddingLeft: `100px`}}>EJLISH</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-aansweruto">
            <Link href="/answer">
               Answer
            </Link>
            <p style={{width: `20px`}}></p>
            <Link href="/question">
               Question
            </Link>
          </Nav>
        </Navbar.Collapse>

      </Navbar>
    </>

  );
}

