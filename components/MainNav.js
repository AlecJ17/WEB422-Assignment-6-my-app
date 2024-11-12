import {Navbar, Nav, Form, FormControl, Button, Container} from 'react-bootstrap';
import Link from 'next/link';
import { useRouter } from 'next/router';


export default function MainNav() {
    const router = useRouter();
    const handleSearch = (event) => {
        event.preventDefault();
        const searchField = event.target.search.value;
        router.push(`/artwork?title=true&q=${searchField}`);
    };

    return (
        <>
            <Navbar bg="primary" variant="dark" fixed="top" className="navbar-dark">
                <Container>
                    <Navbar.Brand>Alec Josef Serrano</Navbar.Brand>
                    <Nav className="me-auto">
                        <Link href="/" passHref legacyBehavior>
                            <Nav.Link>Home</Nav.Link>
                        </Link>
                        <Link href="/search" passHref legacyBehavior>
                            <Nav.Link>Advanced Search</Nav.Link>
                        </Link>
                    </Nav>
                    <Form className="d-flex" onSubmit={handleSearch}>
                        <FormControl
                            type="search"
                            placeholder="Search"
                            className="me-2"
                            aria-label="Search"
                            name="search"
                        />
                        <Button type="submit" variant="outline-light">Search</Button>
                    </Form>
                </Container>
            </Navbar>
            <br />
            <br />
        </>
    );
}
