"use client";

import { Pause, Play, Volume2, VolumeX } from "lucide-react";
import { useCallback, useRef, useState } from "react";
import { ostTracks, type OstTrack } from "@/data/ost";

export function AmbienceButton() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const catalogueRef = useRef<OstTrack[]>(ostTracks);
  const currentIndexRef = useRef(-1);
  const queueRef = useRef<number[]>([]);
  const [track, setTrack] = useState("RANDOM OST");
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [failed, setFailed] = useState(false);

  const playRandom = useCallback(async () => {
    const audio = audioRef.current;
    const tracks = catalogueRef.current;
    if (!audio || tracks.length === 0) return;

    if (queueRef.current.length === 0) {
      const queue = tracks.map((_, index) => index);
      for (let index = queue.length - 1; index > 0; index -= 1) {
        const swapWith = Math.floor(Math.random() * (index + 1));
        [queue[index], queue[swapWith]] = [queue[swapWith], queue[index]];
      }

      const nextPosition = queue.length - 1;
      if (queue.length > 1 && queue[nextPosition] === currentIndexRef.current) {
        [queue[0], queue[nextPosition]] = [queue[nextPosition], queue[0]];
      }
      queueRef.current = queue;
    }

    const next = queueRef.current.pop();
    if (next === undefined) return;
    currentIndexRef.current = next;
    audio.src = tracks[next].url;
    audio.muted = muted;
    setTrack(tracks[next].title);
    try {
      await audio.play();
      setPlaying(true);
      setFailed(false);
    } catch {
      setPlaying(false);
      setFailed(true);
    }
  }, [muted]);

  const togglePlayback = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      void playRandom();
    }
  };

  const toggleMute = () => {
    const next = !muted;
    setMuted(next);
    if (audioRef.current) audioRef.current.muted = next;
  };

  return (
    <div className="soundtrack soundtrack--compact">
      <audio ref={audioRef} onEnded={() => void playRandom()} onError={() => { setPlaying(false); setFailed(true); }} preload="none" />
      <span className="soundtrack__now" title={track}>{failed ? "OST OFFLINE" : track}</span>
      <button className="music-control music-control--icon" onClick={togglePlayback} aria-label={playing ? "Pause soundtrack" : "Play a random soundtrack song"} title={playing ? "Pause" : "Play a random song"}>
        {playing ? <Pause size={17} fill="currentColor" /> : <Play size={17} fill="currentColor" />}
      </button>
      <button className="music-control music-control--icon" onClick={toggleMute} aria-label={muted ? "Unmute soundtrack" : "Mute soundtrack"} title={muted ? "Unmute" : "Mute"}>
        {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
      </button>
    </div>
  );
}
