"use client";

import { useRef, useState } from "react";
import { MEDIA } from "../_data/media";

export default function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [playing, setPlaying] = useState(true);

  const toggle = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play();
      setPlaying(true);
    } else {
      v.pause();
      setPlaying(false);
    }
  };

  return (
    <section className="spc-hero" id="top">
      <video
        ref={videoRef}
        className="spc-hero__video"
        src={MEDIA.hero.video}
        poster={MEDIA.hero.poster}
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
      />
      <div className="spc-hero__scrim" />

      <div className="spc-container spc-hero__inner">
        <div className="spc-hero__stagger">
          <p className="spc-hero__kicker">A Retreat Sanctuary · Shinan</p>
          <h1 className="spc-hero__h1">머무는 것이 곧 영감이 된다</h1>
          <p className="spc-hero__desc">
            전남 신안, 천 개의 섬과 노을 사이에서 — 쉬고, 사유하고, 다시 세상으로
            나아가는 사람들의 자리.
          </p>
          <div>
            <a href="#connect" className="spc-btn spc-btn--light">
              방문 안내
            </a>
          </div>
        </div>
      </div>

      <button
        type="button"
        className="spc-hero__toggle"
        onClick={toggle}
        aria-label={playing ? "영상 일시정지" : "영상 재생"}
      >
        {playing ? "❚❚" : "▶"}
      </button>

      <a href="#story" className="spc-hero__scroll" aria-label="아래로 스크롤">
        SCROLL
      </a>
    </section>
  );
}
