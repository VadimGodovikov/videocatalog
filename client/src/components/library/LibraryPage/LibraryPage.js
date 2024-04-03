import React from "react";
import './LibraryPage-CSS.css'

const LibraryPage = () => {
    return (
        <div class='library-component'>
            <div className='library-info'>
                <div class="library-options">
                    <h2 class="library-title">Библиотека</h2>
                </div>
                <div class="library-button">
                    <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
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
        </div>
    );
};

export default LibraryPage;