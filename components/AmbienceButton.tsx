"use client";

import { Check, ChevronDown, ChevronLeft, ChevronRight, Pause, Play, Volume2, VolumeX } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { ostTracks } from "@/data/ost";

export function AmbienceButton() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const playerRef = useRef<HTMLDivElement | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [failed, setFailed] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const currentTrack = ostTracks[currentIndex];

  const loadTrack = useCallback(async (index: number, shouldPlay: boolean) => {
    const audio = audioRef.current;
    if (!audio || !ostTracks[index]) return;

    setCurrentIndex(index);
    setFailed(false);
    audio.src = ostTracks[index].url;
    audio.muted = muted;
    audio.load();

    if (shouldPlay) {
      try {
        await audio.play();
      } catch {
        setPlaying(false);
        setFailed(true);
      }
    }
  }, [muted]);

  const moveTrack = useCallback((direction: -1 | 1, forcePlay = false) => {
    const nextIndex = (currentIndex + direction + ostTracks.length) % ostTracks.length;
    void loadTrack(nextIndex, forcePlay || playing);
  }, [currentIndex, loadTrack, playing]);

  const togglePlayback = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (!audio.paused) {
      audio.pause();
    } else {
      if (!audio.currentSrc) {
        audio.src = currentTrack.url;
        audio.load();
      }
      void audio.play().catch(() => {
        setPlaying(false);
        setFailed(true);
      });
    }
  };

  const toggleMute = () => {
    const next = !muted;
    setMuted(next);
    if (audioRef.current) audioRef.current.muted = next;
  };

  const chooseTrack = (index: number) => {
    setMenuOpen(false);
    void loadTrack(index, true);
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (audio && !audio.currentSrc) {
      audio.src = ostTracks[0].url;
      audio.load();
    }
  }, []);

  useEffect(() => {
    const closeMenu = (event: PointerEvent) => {
      if (!playerRef.current?.contains(event.target as Node)) setMenuOpen(false);
    };
    const closeWithEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("pointerdown", closeMenu);
    document.addEventListener("keydown", closeWithEscape);
    return () => {
      document.removeEventListener("pointerdown", closeMenu);
      document.removeEventListener("keydown", closeWithEscape);
    };
  }, []);

  return (
    <div className="soundtrack soundtrack--compact" ref={playerRef}>
      <audio
        ref={audioRef}
        muted={muted}
        onPlay={() => { setPlaying(true); setFailed(false); }}
        onPause={() => setPlaying(false)}
        onEnded={() => moveTrack(1, true)}
        onError={() => { setPlaying(false); setFailed(true); }}
        preload="metadata"
      />
      <button
        className="soundtrack__selector"
        type="button"
        aria-expanded={menuOpen}
        aria-haspopup="menu"
        onClick={() => setMenuOpen((value) => !value)}
        title="Choose soundtrack"
      >
        <span>{failed ? "OST OFFLINE" : currentTrack.title}</span>
        <ChevronDown size={14} aria-hidden="true" />
      </button>
      <button className="music-control music-control--icon" type="button" onClick={() => moveTrack(-1)} aria-label="Previous soundtrack song" title="Previous song">
        <ChevronLeft size={19} />
      </button>
      <button className="music-control music-control--icon" type="button" onClick={togglePlayback} aria-label={playing ? "Pause soundtrack" : "Play soundtrack"} title={playing ? "Pause" : "Play"}>
        {playing ? <Pause size={17} fill="currentColor" /> : <Play size={17} fill="currentColor" />}
      </button>
      <button className="music-control music-control--icon" type="button" onClick={() => moveTrack(1)} aria-label="Next soundtrack song" title="Next song">
        <ChevronRight size={19} />
      </button>
      <button className="music-control music-control--icon" type="button" onClick={toggleMute} aria-label={muted ? "Unmute soundtrack" : "Mute soundtrack"} title={muted ? "Unmute" : "Mute"}>
        {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
      </button>
      {menuOpen && (
        <div className="soundtrack__catalogue" role="menu" aria-label="Choose a soundtrack song">
          <div className="soundtrack__catalogue-heading">
            <span>ITEM</span>
            <strong>OST SELECT</strong>
          </div>
          <div className="soundtrack__tracks">
            {ostTracks.map((item, index) => (
              <button
                key={item.title}
                type="button"
                role="menuitemradio"
                aria-checked={index === currentIndex}
                className={index === currentIndex ? "active" : ""}
                onClick={() => chooseTrack(index)}
              >
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{item.title}</strong>
                {index === currentIndex && <Check size={14} aria-hidden="true" />}
              </button>
            ))}
          </div>
          <p>* Choose a track. Playback begins immediately.</p>
        </div>
      )}
    </div>
  );
}
