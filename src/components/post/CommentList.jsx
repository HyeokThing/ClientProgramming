import React, { useEffect, useState } from 'react'
import { app } from '../../firebase'
import { getFirestore, collection, query, orderBy, where, onSnapshot, doc, updateDoc, deleteDoc } from 'firebase/firestore'
import { Button, Col, Row } from 'react-bootstrap';

const CommentList = ({pid}) => {
    const login = sessionStorage.getItem('email');
    const db = getFirestore(app);
    const [list, setList] = useState([]);

    const [editId, setEditId] = useState(null);
    const [editContents, setEditContents] = useState('');

    const getList = () => {
        const q = query(collection(db, 'comment'),
            where('pid', '==', pid),
            orderBy('date', 'desc'));

        onSnapshot(q, snapshot => {
            let rows = [];
            snapshot.forEach(row => {
                rows.push({id: row.id, ...row.data()});
            });

            setList(rows);
        });
    };

    useEffect(() => {
        if (!pid) return;
        const q = query(
            collection(db, 'comment'),
            where('pid', '==', pid),
            orderBy('date', 'desc')
        );
        const unsubscribe = onSnapshot(q, snapshot => {
            const rows = [];
            snapshot.forEach(doc => rows.push({ id: doc.id, ...doc.data() }));
            setList(rows);
        });
        return () => unsubscribe();
    }, [db, pid]);

    const onStartEdit = (comment) => {
        setEditId(comment.id);
        setEditContents(comment.contents);
    };

    const onCancelEdit = () => {
        setEditId(null);
        setEditContents('');
    };

    const onSaveEdit = async () => {
        if (!editContents.trim()) {
            alert('내용을 입력해주세요.');
            return;
        }
        try {
            const docRef = doc(db, 'comment', editId);
            await updateDoc(docRef, { contents: editContents });
            setEditId(null);
            setEditContents('');
            alert('수정 완료!');
        } catch (error) {
            console.error('수정 실패:', error);
            alert('수정에 실패했습니다.');
        }
    };

    const onDelete = async (commentId) => {
        if (window.confirm('정말 삭제하시겠습니까?')) {
            try {
                await deleteDoc(doc(db, 'comment', commentId));
                alert('삭제되었습니다.');
            } catch (error) {
                console.error('삭제 실패:', error);
                alert('삭제에 실패했습니다.');
            }
        }
    };

    return (
        <Row className="justify-content-center mt-3">
            <Col md={10}>
                {list.map(comment => (
                    <div key={comment.id} style={{ marginBottom: '1rem', padding: '0.5rem', border: '1px solid #ccc' }}>
                        <div>
                            {comment.date} | {comment.email}
                        </div>
                        <div>
                            {editId === comment.id ? (
                                <textarea
                                    value={editContents}
                                    onChange={(e) => setEditContents(e.target.value)}
                                    rows={3}
                                    style={{ width: '100%' }}
                                />
                            ) : (
                                <p style={{ whiteSpace: 'pre-wrap' }}>{comment.contents}</p>
                            )}
                        </div>
                        {comment.email === login && (
                            <div style={{display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '0.5rem'}}>
                                {editId === comment.id ? (
                                    <>
                                        <Button
                                            size="sm"
                                            variant="link"
                                            onClick={onSaveEdit}
                                            disabled={editContents.trim() === '' || editContents === comment.contents}
                                            style={{color: editContents.trim() === '' || editContents === comment.contents ? '#aaa' : '#0d6efd'}}
                                            // disabled면 연한 회색, 활성화면 파랑
                                        >
                                            저장
                                        </Button>
                                        <Button
                                            size="sm"
                                            variant="link"
                                            onClick={onCancelEdit}
                                            style={{color: '#6c757d'}} // 회색
                                        >
                                            취소
                                        </Button>
                                    </>
                                ) : (
                                    <>
                                        <Button size="sm" variant="outline-success"
                                                onClick={() => onStartEdit(comment)}>
                                            수정
                                        </Button>
                                        <Button size="sm" variant="outline-danger" onClick={() => onDelete(comment.id)}>
                                            삭제
                                        </Button>
                                    </>
                                )}
                            </div>
                        )}
                    </div>
                ))}
            </Col>
        </Row>
    );
}

export default CommentList
