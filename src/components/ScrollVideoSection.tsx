import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Scroll-scrubbed cinematic video: pinned to the viewport for the height of
 * this section, with the video's currentTime driven directly by scroll
 * progress (not autoplay/loop — the user's scroll IS the timeline).
 */
export default function ScrollVideoSection() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onLoaded = () => setReady(true);
    if (video.readyState >= 1) {
      setReady(true);
    } else {
      video.addEventListener('loadedmetadata', onLoaded);
    }
    return () => video.removeEventListener('loadedmetadata', onLoaded);
  }, []);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const video = videoRef.current;
    if (!wrapper || !video || !ready || !video.duration) return;

    const state = { time: 0 };

    const st = ScrollTrigger.create({
      trigger: wrapper,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.5,
      onUpdate: (self) => {
        gsap.to(state, {
          time: self.progress * video.duration,
          duration: 0.2,
          overwrite: true,
          onUpdate: () => {
            video.currentTime = state.time;
          },
        });
      },
    });

    return () => {
      st.kill();
    };
  }, [ready]);

  return (
    <section ref={wrapperRef} className="relative" style={{ height: '300vh', background: '#0C0C0C' }}>
      <div
        className="scroll-video-pin"
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          width: '100%',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#0C0C0C',
        }}
      >
        <video
          ref={videoRef}
          src="/scroll-cinematic.mp4"
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-contain"
        />
      </div>
    </section>
  );
}
