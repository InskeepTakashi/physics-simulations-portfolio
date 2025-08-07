
// Planetary Ring System Visualizer
// Developed by Takashi Inskeep
// With Claude AI troubleshooting assistance

import { useEffect, useState } from 'react';

function Ring() {
    // Moon orbital inclination
    const [inclination, setInclination] = useState(15);
    // Current position of moon in orbit around gas giant
    const [orbitAngle, setOrbitAngle] = useState(0);
    // Current angle of moon below planet's orbital plane
    const [rise, setRise] = useState(0);
    // Gas giant ring tilt as viewed from moon
    const [rock, setRock] = useState(15);

    // Timer
    const [count, setCount] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [userInteracting, setUserInteracting] = useState(false);

    // Helper function to update rise and rock from orbit angle
    function updateFromOrbitAngle(angle) {
        const newRise = inclination * Math.sin(toRadians(angle));
        setRise(newRise);
        const newRock = inclination * Math.cos(toRadians(angle));
        setRock(newRock);
    }

    useEffect(() => {
        let interval;

        if (isPlaying && !userInteracting) {
            interval = setInterval(() => {
                setCount(prevCount => prevCount + 1);
                setOrbitAngle(prevAngle => {
                    const newAngle = (prevAngle + 0.1) % 360;
                    updateFromOrbitAngle(newAngle);
                    return newAngle;
                });
            }, 1); // Update every 1 ms for smooth animation
        }

        // Cleanup function - this runs when component unmounts OR when dependencies change
        return () => {
            if (interval) {
                clearInterval(interval);
            }
        };
    }, [isPlaying, userInteracting, inclination]); // Dependencies: restart interval if these change

    // Update play button to toggle the timer
    function togglePlay() {
        setIsPlaying(!isPlaying);
    }

    function toRadians(degrees) {
        return degrees * (Math.PI / 180);
    }

    function changeOrbitAngle({ target }) {
        const newOrbitAngle = parseFloat(target.value);
        setOrbitAngle(newOrbitAngle);
        updateFromOrbitAngle(newOrbitAngle);
    }

    function changeInclination({ target }) {
        const newInclination = target.value;
        setInclination(newInclination);
        const newRise = newInclination * Math.sin(toRadians(orbitAngle));
        setRise(newRise);
        const newRock = newInclination * Math.cos(toRadians(orbitAngle));
        setRock(newRock);
    }

    function changeRock({ target }) {
        const newRock = target.value;
        setRock(newRock);
    }

    function handleSliderMouseDown() {
        setUserInteracting(true);
    }

    function handleSliderMouseUp() {
        setUserInteracting(false);
    }

    return (
        <div
            style={{
                backgroundColor: '#1a1a1a',
                margin: '1em 0',
                padding: '1em',
                borderRadius: '10px',
            }}
        >
            <h2>Planetary Ring System Visualizer</h2>
            <div
                id='display-screen'
                style={{
                    backgroundColor: 'black',
                    backgroundImage: 'linear-gradient(black, navy)',
                    margin: 'auto',
                    height: '400px',
                    width: '400px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative'
                }}
            >
                <div
                    id='ring'
                    style={{
                        border: `none`,
                        borderRadius: '100%',
                        margin: '0',
                        height: `240px`,
                        width: '240px',
                        transform: `rotate(${rock}deg) scaleY(${rise / 90})`,
                        backgroundColor: 'transparent',
                        boxShadow: `
                            0 0 0 5px rgba(255,255,255,0.4),
                            0 0 0 10px rgba(200,200,200,0.2),
                            0 0 0 15px rgba(255,255,255,0.5),
                            0 0 0 20px rgba(180,180,180,0.3),
                            0 0 0 25px rgba(255,255,255,0.3),
                            0 0 0 30px rgba(160,160,160,0.2),
                            0 0 0 35px rgba(255,255,255,0.4),
                            0 0 0 40px rgba(140,140,140,0.3),
                            0 0 0 45px rgba(255,255,255,0.5),
                            0 0 0 50px rgba(120,120,120,0.2),
                            0 0 0 55px rgba(255,255,255,0.3),
                            0 0 0 60px rgba(200,200,200,0.4),
                            0 0 0 65px rgba(255,255,255,0.2),
                            0 0 0 70px rgba(180,180,180,0.3),
                            0 0 0 75px rgba(255,255,255,0.4),
                            0 0 0 80px rgba(160,160,160,0.2)
                        `,
                        opacity: 0.2,
                    }}
                >
                </div>
                <div
                    id="planet"
                    style={{
                        backgroundColor: 'cyan',
                        borderRadius: '100%',
                        opacity: '0.5',
                        height: '160px',
                        width: '160px',
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)'
                    }}
                >
                </div>
            </div>
            <br />
            <div>Inclination: {inclination}&deg;</div>
            <div>
                <input
                    type="range"
                    min={0}
                    max={90}
                    onInput={changeInclination}
                    onMouseDown={handleSliderMouseDown}
                    onMouseUp={handleSliderMouseUp}
                    onTouchStart={handleSliderMouseDown}  // For mobile
                    onTouchEnd={handleSliderMouseUp}      // For mobile

                    value={inclination}
                />
            </div>
            <div>Orbit Angle: {Math.round(orbitAngle)}&deg;</div>
            <div>
                <input
                    type="range"
                    min={0}
                    max={360}
                    onInput={changeOrbitAngle}
                    onMouseDown={handleSliderMouseDown}
                    onMouseUp={handleSliderMouseUp}
                    onTouchStart={handleSliderMouseDown}  // For mobile
                    onTouchEnd={handleSliderMouseUp}      // For mobile
                    value={orbitAngle}
                />
            </div>
            <div>Rise: {Math.round(rise)}&deg;</div>
            <div>Rock: {Math.round(rock)}&deg;</div>
            <button
                onClick={togglePlay}
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
        </div>
    )
}

export default Ring;