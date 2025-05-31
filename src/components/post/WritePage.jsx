import React, {useState} from 'react'
import {Row, Form, Col, Button} from 'react-bootstrap'
import { app } from '../../firebase'
import { getFirestore, addDoc, collection } from 'firebase/firestore'
import {useNavigate} from "react-router-dom";
import moment from "moment";

const WritePage = () => {
    const navi = useNavigate()
    const db = getFirestore(app);
    const [form, setForm] = useState({
        email: sessionStorage.getItem('email'),
        date: '',
        title: '',
        body: ''
    });
    const {title, body} = form;
    const onChange = (e) => {
        setForm({
            ...form,
            [e.target.name]:e.target.value
        });
    }
    const onSubmit = async (e) => {
        e.preventDefault();
        if(title==='' || body===''){
            alert('제목과 내용을 입력하세요')
        } else {
            // 게시글 등록
            const date = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
            await addDoc(collection(db, 'post'), {...form, date});
            navi('/post');
        }
    }

    const onReset = (e) => {
        e.preventDefault();
        setForm({
           ...form,
           title:'',
           body:''
        })
    };

    return (
        <div>
            <h1 className='my-5 text-center'>글쓰기</h1>
            <Row className='justify-content-center'>
                <Col md={8}>
                    <Form onSubmit={onSubmit}>
                        <Form.Control className='mb-3' name='title' value={title} onChange={onChange} placeholder='제목을 입력하세요.' />
                        <Form.Control as='textarea' name='body' value={body} onChange={onChange} rows={10} placeholder='내용을 입력하세요.'/>
                        <div className='mt-3 text-center'>
                            <Button type='submit' className='px-5 mx-2'>등록</Button>
                            <Button type='reseet' className='px-5' variant='secondary' onClick={onReset}>취소</Button>
                        </div>
                    </Form>
                </Col>
            </Row>
        </div>
    )
}

export default WritePage
