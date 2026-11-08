import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';

export default function VideoDialog({ open, onClose, src, title }) {
    const dialog = useRef(null);
    useEffect(() => {
        if (open) dialog.current?.showModal();
        else dialog.current?.close();
    }, [open]);
    if (typeof document === 'undefined') return null;
    return createPortal(
        <dialog ref={dialog} onCancel={onClose} onClose={onClose} aria-label={title}
            className="site-video-dialog w-[min(94vw,1100px)] max-w-none rounded-2xl border border-white/20 bg-[#0d0c12] p-4 text-white backdrop:bg-black/85">
            <div className="mb-3 flex items-center justify-between gap-4">
                <h2 className="text-lg font-semibold">{title}</h2>
                <button autoFocus type="button" onClick={onClose} aria-label="Close film" className="rounded-lg p-3 hover:bg-white/10"><X /></button>
            </div>
            {open && <iframe src={src} title={title} className="aspect-video w-full border-0" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowFullScreen />}
        </dialog>, document.querySelector('.app-shell') || document.body
    );
}
