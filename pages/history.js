import { useAtom } from 'jotai';
import { searchHistoryAtom } from '../store';
import { useRouter } from 'next/router';
import { Card, ListGroup, Button } from 'react-bootstrap';
import styles from '@/styles/History.module.css'; // Import the CSS module

export default function History() {
    const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
    const router = useRouter();

    // Parse the search history into an array of objects
    const parsedHistory = [];
    searchHistory.forEach((h) => {
        const params = new URLSearchParams(h);
        const entries = params.entries();
        parsedHistory.push(Object.fromEntries(entries));
    });

    // Navigate to the selected search query
    const historyClicked = (e, index) => {
        e.stopPropagation();
        router.push(`/artwork?${searchHistory[index]}`);
    };

    // Remove a specific search query from the history
    const removeHistoryClicked = (e, index) => {
        e.stopPropagation();
        setSearchHistory((current) => {
            const updatedHistory = [...current];
            updatedHistory.splice(index, 1);
            return updatedHistory;
        });
    };

    return (
        <div className="container mt-4">
            <h1>Search History</h1>
            {parsedHistory.length === 0 ? (
                <Card>
                    <Card.Body>
                        <Card.Text>Nothing Here. Try searching for some artwork.</Card.Text>
                    </Card.Body>
                </Card>
            ) : (
                <ListGroup>
                    {parsedHistory.map((historyItem, index) => (
                        <ListGroup.Item
                            key={index}
                            className={styles.historyListItem}
                            onClick={(e) => historyClicked(e, index)}
                        >
                            {Object.keys(historyItem).map((key) => (
                                <span key={key}>
                                    {key}: <strong>{historyItem[key]}</strong>&nbsp;
                                </span>
                            ))}
                            <Button
                                className="float-end"
                                variant="danger"
                                size="sm"
                                onClick={(e) => removeHistoryClicked(e, index)}
                            >
                                &times;
                            </Button>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            )}
        </div>
    );
}
