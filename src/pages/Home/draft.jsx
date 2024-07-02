
function Home2() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [played, setPlayed] = useState(0);
  const [playedSeconds, setPlayedSeconds] = useState(0);

  const playedMotionValue = useMotionValue(0);
  const clipPath = useTransform(playedMotionValue, [0, duration], ["inset(0 100% 0 0)", "inset(0 0% 0 0)"]);
  const playerRef = useRef(null);

  useEffect(() => {
    const updateProgress = () => {
      if (isPlaying && playerRef.current) {
        setPlayedSeconds(playerRef.current.getCurrentTime());
        requestAnimationFrame(updateProgress);
      }
    };
    if (isPlaying) {
      requestAnimationFrame(updateProgress);
    }
  }, [isPlaying]);

  useEffect(() => {
    playedMotionValue.set(playedSeconds);
  }, [playedSeconds, playedMotionValue]);

  const handleDuration = (dur) => {
    setDuration(dur);
  };

  const handleProgress = (state) => {
    if (!seeking) {
      setPlayed(state.played);
      // playedMotionValue.set(state.played);
    }
  };

  const [seeking, setSeeking] = useState(false);

  const handleSeekMouseDown = () => {
    setSeeking(true);
  };

  const handleSeekChange = (e) => {
    const newValue = parseFloat(e.target.value);
    setPlayed(newValue);
    // playedMotionValue.set(newValue);
  };

  const handleSeekMouseUp = (e) => {
    setSeeking(false);
    playerRef.current.seekTo(parseFloat(e.target.value));
  };

  return (
    <>
      <main className="home">
        <div className="video-wrapper" >
          <ReactPlayer
            ref={playerRef}
            url="/media/KendrickLamar-CountMeOut.mp4"
            className="video"
            playing={isPlaying}
            // onClick={() => setIsPlaying(!isPlaying)}
            
            onEnded={() => setIsPlaying(false)}
            playsinline={true}
            onDuration={handleDuration}
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
                  fill="black"
                />
              </svg>
            ) : (
              <svg
                viewBox="0 0 571 894"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="video__play-btn"
              >
                <rect width="237" height="894" fill="black" />
                <rect x="334" width="237" height="894" fill="black" />
              </svg>
            )}
          </div>
          <div className="video-thumb">
            <motion.span className="video__thumb-progress" style={{ clipPath }} />
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
        </div>
      </main>
    </>
  );
}

function Home1() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [playedSeconds, setPlayedSeconds] = useState(0);
  const playedMotionValue = useMotionValue(0);
  const clipPath = useTransform(playedMotionValue, [0, duration], ["inset(0 100% 0 0)", "inset(0 0% 0 0)"]);

  const playerRef = useRef(null);

  useEffect(() => {
    const updateProgress = () => {
      if (isPlaying && playerRef.current) {
        setPlayedSeconds(playerRef.current.getCurrentTime());
        requestAnimationFrame(updateProgress);
      }
    };
    if (isPlaying) {
      requestAnimationFrame(updateProgress);
    }
  }, [isPlaying]);

  useEffect(() => {
    playedMotionValue.set(playedSeconds);
  }, [playedSeconds, playedMotionValue]);

  const handleDuration = (dur) => {
    setDuration(dur);
  };

  return (
    <>
      <main className="home">
        <h1 style={{ position: "absolute", top: "0" }}>{playedSeconds.toFixed(2)}</h1>
        <div className="video-wrapper" onClick={() => setIsPlaying(!isPlaying)}>
          <ReactPlayer
            ref={playerRef}
            url="/media/KendrickLamar-CountMeOut(1).mp4"
            className="video"
            playing={isPlaying}
            onClick={() => setIsPlaying(!isPlaying)}
            onEnded={() => setIsPlaying(false)}
            playsinline={true}
            onDuration={handleDuration}
          />

          <div
            className={classNames("video__play-btn-wrapper", {
              "video__play-btn-wrapper--playing": isPlaying,
            })}
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
                  fill="black"
                />
              </svg>
            ) : (
              <svg
                viewBox="0 0 571 894"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="video__play-btn"
              >
                <rect width="237" height="894" fill="black" />
                <rect x="334" width="237" height="894" fill="black" />
              </svg>
            )}
          </div>
          <div className="video-controll">
            <motion.span className="video__thumb-progress" style={{ clipPath }} />
          </div>
        </div>
      </main>
    </>
  );
}