import React, { useState } from 'react';

const MEDIA_BASE = 'https://video.gumlet.io/64b781e9fccf18bce9351dee';

export default function GumletFilm({ assetId, title }) {
    const [failed, setFailed] = useState(false);
    const media = `${MEDIA_BASE}/${assetId}`;
    return (
        <div className="gumlet-film">
            <video
                className="clean-video"
                aria-label={title}
                src={`${media}/main.mp4`}
                controls
                playsInline
                preload="none"
                poster={`${media}/thumbnail-1-0.png`}
                onError={() => setFailed(true)}
                onPlaying={() => setFailed(false)}
            />
            {failed && <p role="status">This player couldn’t load the film. Try opening it in Gumlet.</p>}
            <a className="gumlet-film-link" href={`https://play.gumlet.io/embed/${assetId}`} target="_blank" rel="noopener noreferrer" aria-label={`Open ${title} in Gumlet`}>
                Open in Gumlet
            </a>
        </div>
    );
}
