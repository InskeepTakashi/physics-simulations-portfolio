
Physics Ball Bounce Simulation
    Developed by Takashi Inskeep
    With Claude AI troubleshooting assistance

Description:
    An interactive physics simulation featuring multiple bouncing balls with realistic 
    gravity and collision detection. Each ball maintains independent physics states 
    while sharing global parameters like gravity and bounce elasticity. Built with 
    React using advanced performance optimization techniques for smooth 60fps animation.
    This app features a base-12 time counter, because I love to create alternate
    timekeeping and numbering systems.

Key Features:
    * Multi-ball physics simulation (12 independent balls)
    * Real-time gravity adjustment (0-1000 pixels/s²)
    * Variable bounce elasticity (0-100%)
    * Realistic collision detection with walls
    * Random ball colors and initial velocities
    * Smooth 60fps animation using requestAnimationFrame
    * Play/pause and reset functionality
    * Responsive physics calculations

Technical Skills:
    * Advanced React component architecture
    * Physics simulation and collision detection
    * Performance optimization for multiple animated objects
    * Complex state management across components
    * Real-time parameter adjustment
    * Memory management and cleanup
    * Mathematical modeling of physical systems

Technical Implementation:
    * useRef for persistent physics state without re-renders
    * useCallback and useEffect for optimized animation loops
    * Component composition with prop drilling for shared physics
    * Independent animation loops for each ball instance
    * Delta-time calculations for frame-rate independent physics
    * Efficient collision detection algorithms
    * Random number generation for initial conditions

Learning Outcomes:
    * Building complex multi-object simulations in React
    * Optimizing performance for computationally intensive animations
    * Managing independent object states within a shared system
    * Implementing realistic physics behaviors in web applications
    * Creating intuitive user controls for scientific parameters
    * Understanding frame-rate independent animation techniques

