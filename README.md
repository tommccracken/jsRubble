# jsRubble
A particle based 2D physics engine for the web.

[Link ](https://tommccracken.github.io/jsRubble/) to demonstration.

## About
The aim of this project is to develop a 2D particle based constrained dynamics physics engine for web based animation.

The dynamic behavior of different forms of matter can be approximated using various arrangements of particles, constraints and world boundaries. This includes the behavior of single particles, flexible bodies (eg string/rope, cloth, jelly), pseudo rigid bodies (to-do) and fluids (eg water). This pure particle based approach, where dynamic complexity emerges from carefully configured collections of simple elements, enables the physics engine to be relatively light weight.

Key features of the physics engine include the following:
- Pure particle based approach to modelling matter
- Robust time integration scheme (Verlet with implicit velocities)
- Constraint types
    - Distance (equality)
    - Point (equality)
    - Contact (inequality)
- Collision types
    - Particle vs particle
    - Particle vs domain boundary
- Force based effects including:
    - Fluid simulation using Smoothed Particle Hydrodynamics (SPH)
    - N-body attraction
    - Arbitrary force fields

The engine is not intended to be used for scientific simulation/analysis.

The physics engine, including the demonstration/documentation web page, is hosted on GitHub and licensed under the permissive open source Apache 2.0 License.

## Usage

TBA.

## Future

The following functionality may be implemented in the future:

- Angle constraints
- Arbitrary boundaries
- More efficient vector math (reduced object construction/destruction)
- Friction
- Fluid surface tension effects
- Improved collision detection and response (implement particle-particle collision response)
- Improved documentation
- Collision detection optimisation using spatial partitioning
- Pseudo rigid bodies
- Particle emitters and destroyers
- Particle portals
- Physics world import/export

[Link](https://github.com/tommccracken/jsRubble/) to source repository.

Copyright 2017 Thomas O. McCracken
