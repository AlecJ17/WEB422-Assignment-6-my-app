import React from 'react';
import { useAtom } from 'jotai';
import { favouritesAtom } from '../store';
import ArtworkCard from '../components/ArtworkCard';
import { Container, Row, Col, Card } from 'react-bootstrap';

export default function Favourites() {
    const [favouritesList] = useAtom(favouritesAtom);

    return (
        <Container style={{ marginTop: '20px' }}>
            <Row className="gy-4">
                {favouritesList.length > 0 ? (
                    favouritesList.map(objectID => (
                        <Col key={objectID} sm={12} md={6} lg={4}>
                            <ArtworkCard objectID={objectID} />
                        </Col>
                    ))
                ) : (
                    <Col>
                        <Card>
                            <Card.Body>
                                <Card.Title><h4>Nothing Here</h4></Card.Title>
                                <Card.Text>Try adding some new artwork to the list.</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                )}
            </Row>
        </Container>
    );
}
