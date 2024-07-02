import React, { useState, useEffect, useRef } from "react";
import "./Home.scss";
import { motion, useTransform, useMotionValue, m } from "framer-motion";
import ReactPlayer from "react-player";
import classNames from "classnames";

export default function Home() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [played, setPlayed] = useState(0);
  const [muted, setMuted] = useState(false);
  const [seeking, setSeeking] = useState(false);
  const [volume, setVolume] = useState(1);

  const playerRef = useRef(null);

  const playedMotionValue = useMotionValue(0);
  const volumeMotionValue = useMotionValue(1);
  const clipPathDuration = useTransform(
    playedMotionValue,
    [0, 1],
    ["inset(0 100% 0 0)", "inset(0 0% 0 0)"]
  );
  const clipPathVolume = useTransform(
    volumeMotionValue,
    [0, 1],
    ["inset(0 100% 0 0)", "inset(0 0% 0 0)"]
  );

  const handleDuration = (dur) => {
    setDuration(dur);
  };
  
  const handleProgress = (state) => {
    if (!seeking) {
      setPlayed(state.played);
      playedMotionValue.set(state.played);
    }
  };

  const handleMuted = () => {
    if(!muted) {
      setMuted(true);
      setVolume(0);
      volumeMotionValue.set(0)
    } else {
      setMuted(false);
      setVolume(1);
      volumeMotionValue.set(1)
    }
  };

  const handleVolumeChange = (event) => {
    setMuted(false);
    setVolume(event.target.value);
    volumeMotionValue.set(event.target.value)
  };

  const handleSeekMouseDown = () => {
    setSeeking(true);
  };

  const handleSeekChange = (e) => {
    const newValue = parseFloat(e.target.value);
    setPlayed(newValue);
    playedMotionValue.set(newValue);
  };

  const handleSeekMouseUp = (e) => {
    setSeeking(false);
    playerRef.current.seekTo(parseFloat(e.target.value));
  };

  return (
    <>
      <main className="home">
        <div className="video-wrapper">
          <ReactPlayer
            ref={playerRef}
            // url="https://vimeo.com/911568333"
            url="/media/KendrickLamar-CountMeOut.webm"
            className="video"
            playing={isPlaying}
            volume={volume}
            muted={muted}
            onEnded={() => setIsPlaying(false)}
            playsinline={true}
            onDuration={handleDuration}
            progressInterval={100}
            onProgress={handleProgress}
            
          />
          <div
            className={classNames("video__play-btn-wrapper", {
              "video__play-btn-wrapper--playing": isPlaying,
            })}
            onClick={() => setIsPlaying(!isPlaying)}
          >
            {!isPlaying ? (
              <svg
                viewBox="0 0 26 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="video__play-btn"
              >
                <path
                  d="M26 16L-1.37333e-06 32L0 -1.15754e-06L26 16Z"
                  fill="white"
                />
              </svg>
            ) : (
              <svg
                viewBox="0 0 571 894"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="video__play-btn"
              >
                <rect width="237" height="894" fill="white" />
                <rect x="334" width="237" height="894" fill="white" />
              </svg>
            )}
          </div>
          <div className="video-controll">
            <div className="video-thumb">
              <motion.span
                className="video__thumb-progress"
                style={{ clipPath: clipPathDuration }}
              />
              <input
                type="range"
                min={0}
                max={0.999999}
                step="any"
                value={played}
                onMouseDown={handleSeekMouseDown}
                onChange={handleSeekChange}
                onMouseUp={handleSeekMouseUp}
                className="video__thumb-progress--seek"
              />
            </div>
            <div className="video-volume">
              <div className="volume-thumb">
                <div className="volume-thumb__progress-wrapper">
                  <motion.span 
                    className="volume-thumb__progress"
                    style={{ clipPath: clipPathVolume }}
                  />
                  <span className="volume-thumb__progress--bg" />
                </div>
                <input
                  type="range"
                  min={0}
                  max={1}
                  step="any"
                  value={volume}
                  onChange={(event) => handleVolumeChange(event)}
                  className="video-volume__seek"
                />
              </div>
              <div className="button" onClick={() => handleMuted()}>
                {!muted && volume > 0 ? (
                  <>
                    {volume > 0.5 ? (
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M3 8.99998V15H7L12 20V3.99998L7 8.99998H3ZM16.5 12C16.4998 11.1621 16.2657 10.3409 15.824 9.62892C15.3823 8.91692 14.7506 8.34237 14 7.96998V16.02C15.48 15.29 16.5 13.77 16.5 12ZM14 3.22998V5.28998C16.89 6.14998 19 8.82998 19 12C19 15.17 16.89 17.85 14 18.71V20.77C18.01 19.86 21 16.28 21 12C21 7.71998 18.01 4.13998 14 3.22998Z"
                          fill="white"
                        />
                      </svg>
                    ) : (
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M3 9V15H7L12 20V4L7 9H3ZM16.5 12C16.4998 11.1621 16.2657 10.3409 15.824 9.62894C15.3823 8.91694 14.7506 8.34239 14 7.97V16.02C15.48 15.29 16.5 13.77 16.5 12Z"
                          fill="white"
                        />
                      </svg>
                    )}
                  </>
                ) : (
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M3 9V15H7L12 20V4L7 9H3Z" fill="white" />
                  </svg>
                )}
              </div>
            </div>
              <div className="video-volume-colu">
                <div className="volume-thumb">
                  <div className="volume-thumb__progress-wrapper">
                    <motion.span 
                      className="volume-thumb__progress"
                      style={{ clipPath: clipPathVolume }}
                    />
                    <span className="volume-thumb__progress--bg" />
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={1}
                    step="any"
                    value={volume}
                    onChange={(event) => handleVolumeChange(event)}
                    className="video-volume__seek"
                  />
                </div>
                <div className="button" onClick={() => handleMuted()}>
                  {!muted && volume > 0 ? (
                    <>
                      {volume > 0.5 ? (
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M3 8.99998V15H7L12 20V3.99998L7 8.99998H3ZM16.5 12C16.4998 11.1621 16.2657 10.3409 15.824 9.62892C15.3823 8.91692 14.7506 8.34237 14 7.96998V16.02C15.48 15.29 16.5 13.77 16.5 12ZM14 3.22998V5.28998C16.89 6.14998 19 8.82998 19 12C19 15.17 16.89 17.85 14 18.71V20.77C18.01 19.86 21 16.28 21 12C21 7.71998 18.01 4.13998 14 3.22998Z"
                            fill="white"
                          />
                        </svg>
                      ) : (
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M3 9V15H7L12 20V4L7 9H3ZM16.5 12C16.4998 11.1621 16.2657 10.3409 15.824 9.62894C15.3823 8.91694 14.7506 8.34239 14 7.97V16.02C15.48 15.29 16.5 13.77 16.5 12Z"
                            fill="white"
                          />
                        </svg>
                      )}
                    </>
                  ) : (
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M3 9V15H7L12 20V4L7 9H3Z" fill="white" />
                    </svg>
                  )}
                </div>
              </div>
          </div>
        </div>
      </main>
    </>
  );
}
