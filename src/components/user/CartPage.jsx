import React, { useState, useEffect } from "react";
import { app } from "../../firebase";
import { getDatabase, ref, onValue, get, remove } from "firebase/database";
import { Table, Button } from "react-bootstrap";
import BookPage from "../BookPage";

const CartPage = () => {
    const db = getDatabase(app);
    const uid = sessionStorage.getItem("uid");
    const [loading, setLoading] = useState(false);
    const [books, setBooks] = useState([]);

    const getCart = () => {
        setLoading(true);
        onValue(ref(db, `cart/${uid}`), (snapshot) => {
            const rows = [];
            snapshot.forEach((row) => {
                rows.push({ key: row.key, ...row.val() });
            });
            setBooks(rows);
            setLoading(false);
        });
    };

    useEffect(() => {
        getCart();
    }, []);

    const onClickRemove = (book) => {
        if (window.confirm(`Delete '${book.title}'?`)) {
            remove(ref(db, `cart/${uid}/${book.isbn}`));
        }
    };

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center vh-100">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    return (
        <div>
            <h1 className="my-5 text-center">Cart</h1>
            <Table>
                <thead>
                <tr>
                    <th></th>
                    <th>Title</th>
                    <th>Date</th>
                    <th>Delete</th>
                </tr>
                </thead>
                <tbody>
                {books.map((book) => {
                    return (
                        <tr key={book.isbn}>
                            <td width={100}>
                                <BookPage book={book} />
                            </td>
                            <td>{book.title}</td>
                            <td>{book.date}</td>
                            <td>
                                <Button
                                    size="sm"
                                    variant="danger"
                                    onClick={() => onClickRemove(book)}
                                >
                                    Delete
                                </Button>
                            </td>
                        </tr>
                    );
                })}
                </tbody>
            </Table>
        </div>
    );
};

export default CartPage;
