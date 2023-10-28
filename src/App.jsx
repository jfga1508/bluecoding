// @ts-nocheck
import { useRef, useState } from 'react';
import './App.scss';

function App() {
    const [gifs, setgifs] = useState({ loader: false });
    const [lightbox, setlightbox] = useState({
        state: false,
        nav: [],
    });
    const [keyword, setkeyword] = useState('');
    const lightboxImage = useRef(null);
    const [lightboxImageLoader, setlightboxImageLoader] = useState(false);

    // Submit the search keyword to the API and get the data
    const handleSubmit = async (e) => {
        e.preventDefault();
        setgifs({ loader: true });
        const key = keyword;
        const data = await fetch(
            'https://api.giphy.com/v1/gifs/search?api_key=' +
                import.meta.env.VITE_GIF_KEY +
                '&limit=12&q=' +
                key
        ).then((data) => data.json());

        setgifs({ ...data, loader: false });
    };

    // Set the lightmox image properties
    const setLightboxImage = (url, id) => {
        const image = lightboxImage.current;
        image.src = url;
        image.id = id;
        setlightboxImageLoader(true);
    };

    // Open lightbox function
    const openLightbox = (url, id) => {
        setLightboxImage(url, id);
        setlightbox({
            state: true,
            nav: gifs.data,
        });
    };

    // Close lightbox event
    const closeLightbox = (event) => {
        if (event.target !== event.currentTarget) return;
        setlightbox({
            ...lightbox,
            state: false,
        });
    };

    // Go to the previous lightbox image
    const previousImage = () => {
        const image = lightboxImage.current;
        for (var i = 0; i < gifs.data.length; i++) {
            if (gifs.data[i].id === image.id) {
                if (gifs.data[i - 1]) {
                    setLightboxImage(
                        gifs.data[i - 1].images.original.url,
                        gifs.data[i - 1].id
                    );
                    break;
                }
            }
        }
    };

    // Go to the next lightbox image
    const nextImage = () => {
        const image = lightboxImage.current;
        for (var i = 0; i < gifs.data.length; i++) {
            if (gifs.data[i].id === image.id) {
                if (gifs.data[i + 1]) {
                    setLightboxImage(
                        gifs.data[i + 1].images.original.url,
                        gifs.data[i + 1].id
                    );
                    break;
                }
            }
        }
    };

    return (
        <>
            <main className='p-3'>
                <h1>Search for GIPHY</h1>
                <form className='d-flex pt-3'>
                    <div className='form-group mx-sm-3 mb-2'>
                        <input
                            type='text'
                            className='form-control'
                            placeholder='Keyword'
                            name='keyword'
                            onChange={(e) => setkeyword(e.target.value)}
                        />
                    </div>
                    <button
                        type='submit'
                        className='btn btn-primary mb-2'
                        onClick={(e) => handleSubmit(e)}
                    >
                        Search Gif
                    </button>
                </form>

                <h2>Results</h2>
                <div className='d-flex flex-wrap gap-2 results'>
                    <span
                        className={
                            'loader ' + (gifs.loader ? 'd-inline' : 'd-none')
                        }
                    ></span>
                    {gifs.data &&
                        gifs.data.map((gif, index) => (
                            <div key={index}>
                                <img
                                    src={gif.images.fixed_height.url}
                                    onClick={() =>
                                        openLightbox(
                                            gif.images.original.url,
                                            gif.id
                                        )
                                    }
                                    onLoad={() => console.log('test')}
                                />
                            </div>
                        ))}
                </div>
                <div
                    className={
                        'lightboxContainer ' +
                        (lightbox.state ? 'd-block' : 'd-none')
                    }
                    onClick={(e) => closeLightbox(e)}
                >
                    <div className='lightbox mt-4'>
                        <div className='imageContainer'>
                            <button
                                className='close round'
                                onClick={() =>
                                    setlightbox({
                                        ...lightbox,
                                        state: false,
                                    })
                                }
                            >
                                X
                            </button>
                            <img
                                ref={lightboxImage}
                                className='mb-3'
                                onLoad={() => setlightboxImageLoader(false)}
                            />

                            <button
                                className='previous round'
                                onClick={() => previousImage()}
                            >
                                &#8249;
                            </button>

                            <button
                                className='next round'
                                onClick={() => nextImage()}
                            >
                                &#8250;
                            </button>
                            <span
                                className={
                                    'loader lightboxloader ' +
                                    (lightboxImageLoader ? 'd-block' : 'd-none')
                                }
                            ></span>
                        </div>

                        <div className='slider'>
                            <ul className='d-flex gap-2 nav slides'>
                                {lightbox.nav &&
                                    lightbox.nav.map((gif, index) => (
                                        <li
                                            className='slide'
                                            key={index}
                                            id={'slide' + index}
                                        >
                                            <img
                                                src={
                                                    gif.images.fixed_height.url
                                                }
                                                onClick={() =>
                                                    setLightboxImage(
                                                        gif.images.original.url,
                                                        gif.id
                                                    )
                                                }
                                            />
                                        </li>
                                    ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}

export default App;
