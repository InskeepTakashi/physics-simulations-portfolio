import { useEffect, useState, useRef, useCallback } from 'react';

function Orbit({ border = "2px solid #444", borderRadius = '50%', diameter = 400 }) {
    const orbitStyle = {
        border: border,
        borderRadius: borderRadius,
        height: diameter,
        width: diameter,
        margin: 'auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
    };

    return <div style={orbitStyle}></div>;
}

function Planet({ x, y, size = 12, color = '#8A2BE2' }) {
    return (
        <div
            style={{
                position: 'absolute',
                backgroundColor: color,
                borderRadius: '50%',
                height: size,
                width: size,
                transform: `translate(${x - size / 2}px, ${y - size / 2}px)`,
                boxShadow: '0 0 10px rgba(138, 43, 226, 0.5)',
                transition: 'none', // Ensure smooth animation
                left: '50%',
                top: '50%',
                marginLeft: `-${size / 2}px`,
                marginTop: `-${size / 2}px`
            }}
        />
    );
}

export default function App() {
    const [period, setPeriod] = useState(6);
    const [isPlaying, setIsPlaying] = useState(false);
    const [time, setTime] = useState(0);

    const animationRef = useRef();
    const lastTimeRef = useRef(0);

    // Calculate orbital properties based on Kepler's third law
    const distance = 20 * Math.pow(period, 2 / 3);
    const radius = distance / 2;

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

    // Calculate position based on time and period
    const angle = (2 * Math.PI * time) / period;
    const x = radius * Math.cos(angle) + 6;
    const y = radius * -Math.sin(angle) + 6;

    const handlePeriodChange = (event) => {
        const newPeriod = parseFloat(event.target.value);
        setPeriod(newPeriod);
    };

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

    return (
        <div style={{
            fontFamily: 'Arial, sans-serif',
            backgroundColor: '#1a1a1a',
            margin: '1em 0',
            padding: '1em',
            borderRadius: '10px',
            color: '#fff',
            minHeight: '80vh'
        }}>
            <h2 style={{ textAlign: 'center', marginBottom: '0', marginTop: '0' }}>
                Orbital Mechanics Simulation
            </h2>

            <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 1fr 1fr',
                marginBottom: '10px',
                textAlign: 'center'
            }}>
                <div>
                    <strong>Period:</strong><br />
                    {period.toFixed(1)} s
                </div>
                <div>
                    <strong>Time:</strong><br />
                    {time.toFixed(2)} s
                </div>
                <div>
                    <strong>Orbital Radius:</strong><br />
                    {radius.toFixed(1)} px
                </div>
                <div>
                    <strong>Angular Velocity:</strong><br />
                    {(2 * Math.PI / period).toFixed(3)} rad/s
                </div>
            </div>

            <div>
                <label style={{ display: 'block', marginBottom: '10px' }}>
                    <strong>Orbital Period:</strong>
                </label>
                <input
                    type="range"
                    onChange={handlePeriodChange}
                    min="1"
                    max="100"
                    step="0.1"
                    value={period}
                    style={{
                        width: '100%',
                        height: '6px',
                        backgroundColor: '#333',
                        outline: 'none',
                        borderRadius: '3px'
                    }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginTop: '5px' }}>
                    <span>Fast (1)</span>
                    <span>Slow (100)</span>
                </div>
            </div>

            <div style={{ marginBottom: '0px', textAlign: 'center' }}>
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

            <div style={{
                position: 'relative',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: `${Math.max(distance, 460)}px`
            }}>
                <Orbit diameter={distance} />

                {/* Star */}
                <div style={{
                    position: 'absolute',
                    backgroundColor: '#ffffffff',
                    borderRadius: '50%',
                    height: 20,
                    width: 20,
                    boxShadow: '0 0 20px #ffffffff',
                    zIndex: 2
                }} />

                <Planet x={x} y={y} />

            </div>

            <div style={{
                padding: '15px',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '8px',
                fontSize: '14px'
            }}>
                <strong>About this simulation:</strong><br />
                This demonstrates Kepler's Third Law of planetary motion, where the orbital period is proportional to the 3/2 power of the semi-major axis.
                The animation uses requestAnimationFrame for smooth performance and accurate timing.
            </div>
        </div>
    );
}