import { useEffect, useState, useRef, useCallback } from 'react';

function Ball({ size = 20, time, isPlaying, gravity, bounce }) {
    // Generate random color for each ball instance
    const [ballColor] = useState(() => {
        const red = Math.floor(Math.random() * 256);
        const green = Math.floor(Math.random() * 256);
        const blue = Math.floor(Math.random() * 256);
        return `rgb(${red}, ${green}, ${blue})`;
    });

    // Initial position and velocity - only set once
    const initialState = useRef({
        x: Math.random() * (400 - size),
        y: Math.random() * (400 - size),
        vx: (Math.random() - 0.5) * 300, // Random velocity between -150 and 150
        vy: (Math.random() - 0.5) * 300,
        lastTime: 0
    });

    const [position, setPosition] = useState({
        x: initialState.current.x,
        y: initialState.current.y
    });

    // Animation loop for this ball
    useEffect(() => {
        if (!isPlaying) return;

        let animationId;
        const animate = () => {
            const currentTime = time;
            const deltaTime = currentTime - initialState.current.lastTime;
            initialState.current.lastTime = currentTime;

            if (deltaTime > 0) {
                // Apply gravity to Y velocity
                initialState.current.vy += gravity * deltaTime;

                // Update position based on velocity
                let newX = initialState.current.x + initialState.current.vx * deltaTime;
                let newY = initialState.current.y + initialState.current.vy * deltaTime;

                // Bounce off left and right walls
                if (newX <= 0) {
                    newX = 0;
                    initialState.current.vx = Math.abs(initialState.current.vx) * (bounce / 100);
                } else if (newX >= 400 - size) {
                    newX = 400 - size;
                    initialState.current.vx = -Math.abs(initialState.current.vx) * (bounce / 100);
                }

                // Bounce off top and bottom walls
                if (newY <= 0) {
                    newY = 0;
                    initialState.current.vy = Math.abs(initialState.current.vy) * (bounce / 100);
                } else if (newY >= 400 - size) {
                    newY = 400 - size;
                    initialState.current.vy = -Math.abs(initialState.current.vy) * (bounce / 100);
                }

                // Update stored position
                initialState.current.x = newX;
                initialState.current.y = newY;

                // Update React state to trigger re-render
                setPosition({ x: newX, y: newY });
            }

            animationId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            if (animationId) {
                cancelAnimationFrame(animationId);
            }
        };
    }, [time, isPlaying, size, gravity, bounce]);

    // Reset position when time resets
    useEffect(() => {
        if (time === 0) {
            const newX = Math.random() * (400 - size);
            const newY = Math.random() * (400 - size);
            initialState.current.x = newX;
            initialState.current.y = newY;
            initialState.current.vx = (Math.random() - 0.5) * 300;
            initialState.current.vy = (Math.random() - 0.5) * 300;
            initialState.current.lastTime = 0;
            setPosition({ x: newX, y: newY });
        }
    }, [time, size]);

    return (
        <div
            style={{
                position: 'absolute',
                backgroundColor: ballColor,
                border: '1px solid rgb(40, 40, 40)',
                borderRadius: '50%',
                height: size,
                width: size,
                left: position.x,
                top: position.y,
                transition: 'none',
            }}
        />
    );
}

export default function App() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [time, setTime] = useState(0);
    const [gravity, setGravity] = useState(0); // Default gravity value
    const [bounce, setBounce] = useState(100); // Default bounce value

    const animationRef = useRef();
    const lastTimeRef = useRef(0);

    const togglePlayPause = () => {
        setIsPlaying(!isPlaying);
        if (!isPlaying) {
            lastTimeRef.current = 0; // Reset timing when resuming
        }
    };

    const resetAnimation = () => {
        setTime(0);
        lastTimeRef.current = 0;
    };

    const handleGravityChange = (event) => {
        setGravity(parseFloat(event.target.value));
    };

    const handleBounceChange = (event) => {
        setBounce(parseFloat(event.target.value));
    };

    // Use requestAnimationFrame for smoother animation
    const animate = useCallback((currentTime) => {
        if (lastTimeRef.current === 0) {
            lastTimeRef.current = currentTime;
        }

        const deltaTime = currentTime - lastTimeRef.current;
        lastTimeRef.current = currentTime;

        if (isPlaying) {
            setTime(prevTime => prevTime + deltaTime * 0.001); // Convert ms to seconds
        }

        animationRef.current = requestAnimationFrame(animate);
    }, [isPlaying]);

    useEffect(() => {
        animationRef.current = requestAnimationFrame(animate);
        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [animate]);

    return (
        <div style={{
            backgroundColor: '#1a1a1a',
            margin: '1em 0',
            padding: '1em',
            borderRadius: '10px',
        }}>
            <h2
                style={{
                    margin: '4px',
                    padding: '0',
                    color: 'white',
                }}
            >
                Physics Ball Bounce Simulation
            </h2>
            <div
                style={{
                    paddingBottom: '10px',
                    color: 'white',
                }}
            >
                Time: {Math.floor(time / (25 / 144)).toString(12).toUpperCase()}
            </div>

            <div style={{ marginBottom: '10px' }}>
                <div style={{ color: 'white', marginBottom: '5px' }}>
                    Gravity: {gravity} pixels/s<sup>2</sup>
                </div>
                <input
                    type="range"
                    min={0}
                    max={1000}
                    step={10}
                    value={gravity}
                    onChange={handleGravityChange}
                    style={{
                        width: '200px',
                        marginRight: '10px',
                    }}
                />
                <div style={{ color: 'white', marginBottom: '5px' }}>
                    Bounce: {bounce}%
                </div>
                <input
                    type="range"
                    min={0}
                    max={100}
                    step={10}
                    value={bounce}
                    onChange={handleBounceChange}
                    style={{
                        width: '200px',
                        marginRight: '10px',
                    }}
                />
            </div>

            <div>
                <button
                    onClick={togglePlayPause}
                    style={{
                        padding: '10px 20px',
                        margin: '1em',
                        backgroundColor: isPlaying ? '#dc3545' : '#28a745',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        fontSize: '14px',
                        width: '120px',
                    }}
                >
                    {isPlaying ? '⏸️ Pause' : '▶️ Play'}
                </button>
                <button
                    onClick={resetAnimation}
                    style={{
                        padding: '10px 20px',
                        backgroundColor: '#6c757d',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        fontSize: '14px',
                        width: '120px',
                    }}
                >
                    🔄 Reset
                </button>
            </div>
            <div
                id='displayScreen'
                style={{
                    backgroundColor: 'black',
                    margin: 'auto',
                    marginTop: '10px',
                    height: '400px',
                    width: '400px',
                    position: 'relative',
                }}
            >
                <Ball time={time} isPlaying={isPlaying} gravity={gravity} bounce={bounce} />
                <Ball time={time} isPlaying={isPlaying} gravity={gravity} bounce={bounce} />
                <Ball time={time} isPlaying={isPlaying} gravity={gravity} bounce={bounce} />
                <Ball time={time} isPlaying={isPlaying} gravity={gravity} bounce={bounce} />
                <Ball time={time} isPlaying={isPlaying} gravity={gravity} bounce={bounce} />
                <Ball time={time} isPlaying={isPlaying} gravity={gravity} bounce={bounce} />
                <Ball time={time} isPlaying={isPlaying} gravity={gravity} bounce={bounce} />
                <Ball time={time} isPlaying={isPlaying} gravity={gravity} bounce={bounce} />
                <Ball time={time} isPlaying={isPlaying} gravity={gravity} bounce={bounce} />
                <Ball time={time} isPlaying={isPlaying} gravity={gravity} bounce={bounce} />
                <Ball time={time} isPlaying={isPlaying} gravity={gravity} bounce={bounce} />
                <Ball time={time} isPlaying={isPlaying} gravity={gravity} bounce={bounce} />
            </div>
        </div>
    )
}