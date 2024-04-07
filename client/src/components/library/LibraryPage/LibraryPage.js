import React, { useState } from "react";
import './LibraryPage-CSS.css'
import Modal from '../Modal/Modal'
import { Form, Button } from 'react-bootstrap';

const LibraryPage = () => {
    const [localURL, setLocalURL] = useState('');
    const [fileName, setFileName] = useState('');

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setLocalURL(URL.createObjectURL(file));
        setFileName(file.name);
    }

    const handleUpload = () => {
        console.log(localURL);
        console.log(fileName);
    }
    const [modalActive, setModalActive] = useState(false);
    return (
        <div class='library-component'>
            <div className='library-info'>
                <div class="library-options">
                    <h2 class="library-title">Библиотека</h2>
                </div>
                <div class="library-button">
                    <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={() => setModalActive(true)}>
                        <circle cx="25" cy="25" r="25" fill="white" />
                        <g clip-path="url(#clip0_39_60)">
                            <path d="M42.6471 26.4706H26.4707V42.6471H23.5295V26.4706H7.35303V23.5294H23.5295V7.35294H26.4707V23.5294H42.6471V26.4706Z" fill="black" />
                        </g>
                        <defs>
                            <clipPath id="clip0_39_60">
                                <rect width="35.2941" height="35.2941" fill="white" transform="translate(7.35303 7.35294)" />
                            </clipPath>
                        </defs>
                    </svg>
                </div>
            </div>
            <div class='library-sort'>
                <span class='sort-title'>Сортировать по: <span class='sort-menu'>почему-то</span></span>
            </div>
            <div class="library-filmCard">
                <h1>Пока пусто</h1>
            </div>
            <Modal active={modalActive} setActive={setModalActive}>
                <h1 style={{ color: 'black', fontWeight: 500 }}>Загрузите фильм</h1>
                <Form>
                    <Form.Control
                        type='file'
                        size='lg'
                        className="mt-3"
                        onChange={handleFileChange}
                    />
                    <Button onClick={handleUpload} size='lg' style={{ radius: 2000, backgroundColor: '#E84A5F', color: 'white', width: '100%' }} className='mt-3' variant={"outline-succes"}>
                        Загрузить
                    </Button>
                </Form>
            </Modal>
        </div>
    );
};

export default LibraryPage;