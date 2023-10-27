// @ts-nocheck
import { useState } from 'react';
import './App.scss';

function App() {
    const [gifs, setgifs] = useState([]);
    const [lightbox, setlightbox] = useState({
        state: false,
        image: '',
        nav: [],
    });
    const [keyword, setkeyword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const key = keyword;
        const data = await fetch(
            'https://api.giphy.com/v1/gifs/search?api_key=' +
                import.meta.env.VITE_GIF_KEY +
                '&limit=10&q=' +
                key
        ).then((data) => data.json());

        setgifs(data);
    };

    const openLightbox = (image) => {
        setlightbox({
            state: true,
            image: image,
            nav: gifs.data,
        });
    };

    return (
        <>
            <form>
                <input
                    type='text'
                    name='keyword'
                    onChange={(e) => setkeyword(e.target.value)}
                    placeholder='Keyword'
                />
                <button
                    className='btn btn-primary'
                    onClick={(e) => handleSubmit(e)}
                >
                    Search
                </button>
            </form>
            <div>
                <h1>Results</h1>
                <div className='d-flex flex-wrap'>
                    {gifs.data &&
                        gifs.data.map((gif, index) => (
                            <div key={index}>
                                <img
                                    className='mb-3'
                                    src={gif.images.fixed_height.url}
                                    onClick={() =>
                                        openLightbox(gif.images.original.url)
                                    }
                                />
                            </div>
                        ))}
                </div>
                <div className='lightboxContainer'>
                    <div className='lightbox'>
                        <img src={lightbox.image} className='mb-3' />

                        <ul className='d-flex nav'>
                            {lightbox.nav &&
                                lightbox.nav.map((gif, index) => (
                                    <li key={index}>
                                        <img
                                            src={gif.images.fixed_height.url}
                                            onClick={() =>
                                                setlightbox({
                                                    ...lightbox,
                                                    image: gif.images.original
                                                        .url,
                                                })
                                            }
                                        />
                                    </li>
                                ))}
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
}

export default App;
