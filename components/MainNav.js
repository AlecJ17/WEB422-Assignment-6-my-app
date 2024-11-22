import { useState } from 'react';
import { Navbar, Nav, Form, FormControl, Button, Container, NavDropdown } from 'react-bootstrap';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAtom } from 'jotai';
import { searchHistoryAtom } from '../store';

export default function MainNav() {
    const router = useRouter();
    const [expanded, setExpanded] = useState(false);
    const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);

    const handleSearch = (event) => {
        event.preventDefault();
        const searchField = event.target.search.value;
        const queryString = `title=true&q=${searchField}`;
        router.push(`/artwork?${queryString}`);
        setSearchHistory(current => [...current, queryString]);
        setExpanded(false);
    };

    return (
        <>
            <Navbar bg="primary" variant="dark" fixed="top" expand="lg" expanded={expanded} className="navbar-dark">
                <Container>
                    <Navbar.Brand href="/">Alec Josef Serrano</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" onClick={() => setExpanded(!expanded)} />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link
                                as={Link}
                                href="/"
                                active={router.pathname === "/"}
                                onClick={() => setExpanded(false)}
                            >
                                Home
                            </Nav.Link>
                            <Nav.Link
                                as={Link}
                                href="/search"
                                active={router.pathname === "/search"}
                                onClick={() => setExpanded(false)}
                            >
                                Advanced Search
                            </Nav.Link>
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
                        <Nav>
                            <NavDropdown title="User Name" id="basic-nav-dropdown">
                                <NavDropdown.Item
                                    as={Link}
                                    href="/favourites"
                                    active={router.pathname === "/favourites"}
                                    onClick={() => setExpanded(false)}
                                >
                                    Favourites
                                </NavDropdown.Item>
                                <NavDropdown.Item
                                    as={Link}
                                    href="/history"
                                    active={router.pathname === "/history"}
                                    onClick={() => setExpanded(false)}
                                >
                                    Search History
                                </NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <br /><br />
        </>
    );
}
