# Physics Simulations Portfolio

**Developed by Takashi Inskeep**  
*With Claude AI troubleshooting assistance*

🔗 [Live Demo](https://physics-simulations-portfolio.vercel.app/)
📁 [GitHub Repository](https://github.com/InskeepTakashi/physics-simulations-portfolio)

## About This Project

An interactive portfolio showcasing three physics simulations built with React, demonstrating mathematical programming, real-time animations, and advanced state management. Each simulation explores different aspects of physics and astronomy through interactive visualizations.

## Featured Simulations

### 🪐 Planetary Ring System Visualizer
An astronomical simulation demonstrating how planetary rings appear from different orbital perspectives. Users can adjust orbital inclination and watch real-time changes in ring appearance as viewed from a moon's surface.

**Key Features:**
- Real-time orbital mechanics calculations using trigonometry
- Interactive parameter controls with smooth animations
- 60fps performance optimization
- Mobile-responsive touch controls
- Mathematically accurate astronomical relationships

### 🌍 Orbital Mechanics Simulation
A physics-based demonstration of Kepler's Third Law showing the relationship between orbital period and distance. Features a planet orbiting a central star with adjustable orbital parameters.

**Key Features:**
- Implementation of Kepler's Third Law (T² ∝ a³)
- Smooth animations using requestAnimationFrame
- Real-time calculation display (period, radius, angular velocity)
- Interactive orbital period adjustment
- Dynamic orbit visualization that scales with distance

### ⚽ Physics Ball Bounce Simulation
A multi-object physics engine featuring bouncing balls with realistic gravity and collision detection. Each ball maintains independent physics while sharing global parameters.

**Key Features:**
- Multi-ball physics simulation (12 independent objects)
- Real-time gravity adjustment (0-1000 pixels/s²)
- Variable bounce elasticity (0-100%)
- Realistic collision detection with boundaries
- Random ball colors and initial velocities

## Technical Skills Demonstrated

- **React Expertise:** Advanced hooks (useState, useEffect, useRef, useCallback)
- **Mathematical Programming:** Trigonometry, physics calculations, orbital mechanics
- **Performance Optimization:** requestAnimationFrame, efficient state management
- **Component Architecture:** Reusable components, prop handling, composition patterns
- **Animation Systems:** Smooth 60fps animations, delta-time calculations
- **User Interface Design:** Responsive controls, intuitive parameter adjustment
- **Physics Simulation:** Collision detection, gravity systems, realistic motion

## Technologies Used

- **React 18** - Component framework and state management
- **JavaScript ES6+** - Modern JavaScript features
- **CSS3** - Animations, transforms, and responsive design
- **HTML5** - Semantic markup and canvas-like visualizations
- **Mathematical Libraries** - Custom physics and orbital calculations

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager

### Installation & Running
```bash
# Clone the repository
git clone [your-repo-url]
cd physics-simulations-portfolio

# Install dependencies
npm install

# Start development server
npm run dev

# Open in browser
# Navigate to http://localhost:3000
```

### Building for Production
```bash
npm run build
```

## Project Structure
```
src/
├── components/
│   ├── Ring.jsx              # Planetary ring simulator
│   ├── Orbit.jsx             # Kepler's law demonstration
│   └── Bounce.jsx            # Multi-ball physics engine
├── App.jsx                   # Main portfolio container
└── index.js                  # Application entry point
```

## What I Learned

**Advanced React Patterns:**
- Managing complex state across multiple animated components
- Optimizing performance for computationally intensive real-time simulations
- Creating reusable component architectures for physics objects

**Mathematical Programming:**
- Implementing real-world physics equations in JavaScript
- Converting mathematical concepts into interactive visualizations
- Handling frame-rate independent animations and calculations

**Performance Optimization:**
- Using requestAnimationFrame for smooth 60fps animations
- Managing memory efficiently with multiple animated objects
- Minimizing re-renders while maintaining responsive user interactions

**User Experience Design:**
- Creating intuitive controls for complex scientific parameters
- Designing responsive interfaces that work across devices
- Balancing visual appeal with educational value

## Future Enhancements

- Add more physics simulations (pendulum, wave motion, particle systems)
- Implement 3D visualizations using Three.js
- Add data export functionality for educational use
- Create preset scenarios for each simulation
- Add touch gestures for mobile interaction

## Contact

**Takashi Inskeep**  
kashiins@gmail.com | (https://www.linkedin.com/in/takashi-inskeep-525202b7/) | https://github.com/InskeepTakashi/

---

*This portfolio demonstrates proficiency in React development, mathematical programming, and interactive visualization design. Each simulation showcases different aspects of modern web development and physics programming.*

