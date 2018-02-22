/*

  jsRubble Physics Engine - Core Library

  Source repository (at time of writing):
  https://github.com/tommccracken/jsRubble


  Copyright 2017 Thomas O. McCracken

  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.

*/

// Useful constants

const PI = Math.PI;

// Useful functions

function deg2rad(deg) {
  return deg * PI / 180;
}

function rad2deg(rad) {
  return rad * 180 / PI;
}

function get_time() {
  return Date.now();
}

function time_since(time) {
  return (get_time() - time);
}

// Vector (2D) math class

class Vector2 {

  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  magnitude_squared() {
    return this.x * this.x + this.y * this.y;
  }

  magnitude() {
    return Math.sqrt(this.magnitude_squared());
  }

  unit_vector() {
    return new Vector2(this.x / this.magnitude(), this.y / this.magnitude());
  }

  add(v) {
    return new Vector2(this.x + v.x, this.y + v.y);
  }

  subtract(v) {
    return new Vector2(this.x - v.x, this.y - v.y);
  }

  scale(scalar) {
    return new Vector2(scalar * this.x, scalar * this.y);
  }

  set_to(v) {
    this.x = v.x;
    this.y = v.y;
  }

  set_to_zero() {
    this.x = 0;
    this.y = 0;
  }

  rotate_about(v, angle) {
    let x,
      y;
    x = v.x + (this.x - v.x) * Math.cos(angle) - (this.y - v.y) * Math.sin(angle);
    y = v.y + (this.x - v.x) * Math.sin(angle) + (this.y - v.y) * Math.cos(angle);
    return new Vector2(x, y);
  }

  distance_from_squared(v) {
    return (v.x - this.x) * (v.x - this.x) + (v.y - this.y) * (v.y - this.y);
  }

  distance_from(v) {
    return Math.sqrt(this.distance_from_squared(v));
  }

  /* Other potentially useful vector methods for future functionality (not currently used)

  direction() {
    return Math.atan(this.y / this.x);
  }

  normal() {
    return new Vector2(-this.y, this.x);
  } // add mutable form

  mutable_unit_vector() {
    this.x = this.x / this.magnitude();
    this.y = this.y / this.magnitude();
  }

  normal_unit_vector() {
    return normal().unit_vector();
  } // add mutable form

  mutable_add(v) {
    this.x = this.x + v.x;
    this.y = this.y + v.y;
  }

  mutable_subtract(v) {
    this.x = this.x - v.x;
    this.y = this.y - v.y;
  }

  mutable_scale(scalar) {
    this.x = this.x * scalar;
    this.y = this.y * scalar;
  }

  mutable_rotate_about(v, angle) {

  }

  dot(v) {
    return this.x * v.x + this.y * v.y;
  }

  cross(v) {
    return this.x * v.y - this.y * v.x;
  }

  angle() {
    return Math.atan2(this.y, this.x);
  }

  angle_between(v) {
    return Math.atan2(this.cross(v), this.dot(v));
  }

  angle_about_between(v_anchor, v) {
    let v1, v2;
    v1 = this.subtract(v_anchor);
    v2 = v.subtract(v_anchor);
    return v1.angle_between(v2);
  }

  */

}

// Abstract world element class
class AbstractWorldElement {

  constructor() {
    // The length of time that the world ement has been in existance (number of simulation steps)
    this.age = 0;
    // The age at which the world element will be deleted, null if infinite life
    this.lifetime = null;
  }

  // Check to see wheather the age of a world element has reached its life
  is_lifetime_expired() {
    if (this.lifetime !== null && this.age >= this.lifetime) {
      return true;
    } else {
      return false;
    }
  }

}

// Particle class
class Particle extends AbstractWorldElement {

  constructor(px, py, vx, vy, ax, ay, fx, fy, mass, radius, fixed) {
    super();
    // The mass of the particle
    this.mass = mass;
    // The radius of the particle
    this.radius = radius;
    // This property defines whether the particle is allowed to move
    this.fixed = fixed;
    // A vector representing the current position of the particle
    this.pos = new Vector2(px, py);
    // A vector representing the previous position of the particle (necessary for Verlet integration)
    this.pos_previous = new Vector2(px, py);
    // A vector representing the current velocity of the particle (can also be determined implicitly from pos and prev_pos)
    this.vel = new Vector2(vx, vy);
    // A vector representing the current accelerattion of the particle (necessary for Verlet integration)
    this.acc = new Vector2(ax, ay);
    // A vector representing the net force acting on the particle
    this.force = new Vector2(fx, fy); // Note: this is actually not being used at this time
    // Represents whether a particle is permitted to collide with anything
    this.collides = true;
    // The lifetime of the particle
    this.lifetime = null;
    // The attractive field strength of the particle. This can be used to simulate gravatational effects.
    this.attractive_strength = 0;
  }

  integrate(time_step, damping_coefficient) {
    let temp_pos;
    if (!this.fixed) {
      this.acc = this.acc.add(this.force.scale(1 / this.mass));
      temp_pos = new Vector2(this.pos.x, this.pos.y);
      this.pos = this.pos.scale(2 - damping_coefficient).subtract(this.pos_previous.scale(1 - damping_coefficient)).add(this.acc.scale(time_step * time_step));
      this.vel = this.pos.subtract(this.pos_previous).add(this.acc.scale(time_step * time_step));
      return this.pos_previous.set_to(temp_pos);
    }

    // Todo: Implement other integration schemes

  }

  // Todo: Add a set velocity method

}

class AbstractConstraint extends AbstractWorldElement {

  constructor() {
    super();
    // Defines whether the constraint can be broken
    this.breakable = false;
    // The maximum allowable breaking strain of the constraint
    this.breaking_strain = 2.0;
  }

  has_broken() {
    return false;
  }

}

class DistanceConstraint extends AbstractConstraint {

  constructor(p1, p2, distance, stiffness) {
    super();
    this.p1 = p1;
    this.p2 = p2;
    this.distance = distance;
    this.stiffness = stiffness;
    this.current_distance = this.p2.pos.distance_from(this.p1.pos);
  }

  enforce(constraint_solver_iterations) {
    let adjusted_stiffness,
      delta,
      deltad,
      deltad1,
      deltad2,
      direction_unit_vector;
    this.current_distance = this.p2.pos.distance_from(this.p1.pos);
    if (this.current_distance !== this.distance) {
      delta = this.current_distance - this.distance;
      adjusted_stiffness = 1 - Math.pow(1 - this.stiffness, 1 / constraint_solver_iterations);
      deltad = (this.current_distance - this.distance) * adjusted_stiffness;
      direction_unit_vector = new Vector2(this.p2.pos.x - this.p1.pos.x, this.p2.pos.y - this.p1.pos.y).unit_vector();
      if (this.p2.fixed && !this.p1.fixed) {
        this.p1.pos = this.p1.pos.add(direction_unit_vector.scale(deltad));
      } else if (this.p1.fixed && !this.p2.fixed) {
        this.p2.pos = this.p2.pos.add(direction_unit_vector.scale(-deltad));
      } else if (!this.p2.fixed && !this.p1.fixed) {
        deltad1 = deltad * this.p1.mass / (this.p1.mass + this.p2.mass);
        deltad2 = deltad * this.p2.mass / (this.p1.mass + this.p2.mass);
        this.p1.pos = this.p1.pos.add(direction_unit_vector.scale(deltad2));
        this.p2.pos = this.p2.pos.add(direction_unit_vector.scale(-deltad1));
      }
    }

  }

  has_broken() {
    let delta,
      strain;
    if (this.breakable) {
      delta = this.current_distance - this.distance;
      strain = Math.abs(delta) / this.distance;
      if (strain > this.breaking_strain) {
        return true;
      }
    } else {
      return false;
    }
  }

}

class ParticleContactConstraint extends DistanceConstraint {

  constructor(p1, p2) {
    super(p1, p2, p1.radius + p2.radius, 1.0);
    this.lifetime = this.age;
  }

}

class PointConstraint extends AbstractConstraint {

  constructor(p1, x, y, stiffness) {
    super();
    this.p1 = p1;
    this.stiffness = stiffness;
    this.anchor = new Vector2(x, y);
  }

  enforce(constraint_solver_iterations) {
    let adjusted_stiffness,
      current_distance,
      deltad,
      direction_unit_vector,
      strain;
    current_distance = this.p1.pos.distance_from(this.anchor);
    if (current_distance !== 0) {
      adjusted_stiffness = 1 - Math.pow(1 - this.stiffness, 1 / constraint_solver_iterations);
      deltad = current_distance * adjusted_stiffness;
      direction_unit_vector = new Vector2(this.p1.pos.x - this.anchor.x, this.p1.pos.y - this.anchor.y).unit_vector();
      this.p1.pos = this.p1.pos.add(direction_unit_vector.scale(-deltad));
    }
  }

  has_broken() {
    let current_distance = this.p1.pos.distance_from(this.anchor);
    if (current_distance !== 0) {
      let strain = Math.abs(current_distance);
      if (this.breakable && (strain > this.breaking_strain)) {
        return true;
      }
    }

  }

}

class ParticleEdgeContactConstraint extends PointConstraint {

  constructor(p1) {
    super(p1, p1.x, p1.y, 1.0);
    this.lifetime = this.age;
  }
}

class AngleConstraint extends AbstractConstraint {

  constructor(p_anchor, p1, p2, angle, stiffness) {
    super();
    this.p_anchor = p_anchor;
    this.p1 = p1;
    this.p2 = p2;
    this.angle = angle;
    this.stiffness = stiffness;
  }

  enforce(constraint_solver_iterations) {
    /*
    // Todo: Implement angle constraint enforcement
    */
  }

}

class Collision {

  constructor(b1, b2) {
    this.b1 = b1;
    this.b2 = b2;
  }

}

class PhysicsWorld {

  constructor(width, height, time_step, constraint_solver_iterations) {
    this.width = width;
    this.height = height;
    this.time_step = time_step;
    this.particles = [];
    this.constraints = [];
    this.collisions = [];
    this.boundaries = [];
    this.time = 0;
    this.steps = 0;
    this.gravitational_field = new Vector2(0, -90.81);
    this.constraint_solver_iterations = constraint_solver_iterations;
    this.particle_to_particle_attraction_active = false;
    this.particle_attraction_coefficient = 30; // Scaling factor for particle attractive forces
    this.simple_world_boundary_collisions = true;
    this.damping_coefficient = 0.005;
    this.coeffieicnt_of_restitution = 0.7;
    this.particle_to_particle_collisions = true;
  }

  create_particle(px, py, vx, vy, ax, ay, fx, fy, mass, radius, fixed) {
    this.particles.push(new Particle(px, py, vx, vy, ax, ay, fx, fy, mass, radius, fixed));
  }

  create_distance_constraint(p1, p2, distance, stiffness) {
    if (distance == null) {
      distance = p2.pos.distance_from(p1.pos);
    }
    if (stiffness == null) {
      stiffness = 0.9;
    }
    this.constraints.push(new DistanceConstraint(p1, p2, distance, stiffness));
  }

  /* Not used yet
  create_angle_constraint(p_anchor, p1, p2, angle, stiffness) {
    if (angle == null) {
      // Todo: Implement angle initialisation collide
    }
    if (stiffness == null) {
      stiffness = 0.9;
    }
    this.constraints.push(new AngleConstraint(p_anchor, p1, p2, angle, stiffness));
  }
  */

  create_point_constraint(p1, x, y, stiffness) {
    if (x == null) {
      x = p1.pos.x;
    }
    if (y == null) {
      y = p1.pos.y;
    }
    if (stiffness == null) {
      stiffness = 0.9;
    }
    this.constraints.push(new PointConstraint(p1, x, y, stiffness));
  }

  create_particle_contact_constraint(p1, p2) {
    this.constraints.push(new ParticleContactConstraint(p1, p2));
  }

  // Not used for now
  //create_particle_edge_contact_constraint(p1) {
  //  this.constraints.push(new ParticleEdgeContactConstraint(p1));
  //}

  delete_particle_by_index(count) {
    // If particle was part of a constraint, delete the constraint too
    let p1 = this.particles[count];
    let number_of_iterations = this.constraints.length;
    for (let i = 0; i < number_of_iterations; i++) {
      if (this.constraints[i]instanceof DistanceConstraint) {
        if ((this.constraints[i].p2 === p1) || (this.constraints[i].p1 === p1)) {
          this.delete_constraint_by_index(i);
          if (i > 0) {
            i = i - 1;
          }
          number_of_iterations-- // Need to test this;
        }
      } else if (this.constraints[i]instanceof PointConstraint) {
        if (this.constraints[i].p1 === p1) {
          this.delete_constraint_by_index(i);
          number_of_iterations--;
        }
        // Not used yet
      } else if (this.constraints[i]instanceof AngleConstraint) {
        if (this.constraints[i].p1 === p1 || this.constraints[i].p2 === p1 || this.constraints[i].p_anchor === p1) {
          this.delete_constraint_by_index(i);
          number_of_iterations--;
        }
      }

    }
    this.particles.splice(count, 1);
  }

  delete_particle_by_reference(p1) {
    let count = this.particles.indexOf(p1);
    this.delete_particle_by_index(count);
  }

  delete_constraint_by_index(count) {
    this.constraints.splice(count, 1);
  }

  delete_constraint_by_reference(c1) {
    let count = this.constraints.indexOf(c1);
    this.delete_constraint_by_index(count);
  }

  update() {
    this.clean_up();
    this.accumulate_forces();
    this.collision_detection_and_response();
    this.constraint_resolution();
    // Todo: Implement impulse preservation code
    this.integrate();
    this.time = this.time + this.time_step;
    this.steps = this.steps + 1;
  }

  clean_up() {
    let number_of_iterations = 0;
    // Clear all collisions
    this.collisions.length = 0;
    // Increase age, check for end of life, delete if necessary
    number_of_iterations = this.constraints.length;
    for (let i = 0; i < number_of_iterations; i++) {
      this.constraints[i].age = this.constraints[i].age + 1;
      if (this.constraints[i].is_lifetime_expired()) {
        this.delete_constraint_by_index(i);
        number_of_iterations--;
      }
    }
    // Increase age, check for end of life, delete if necessary
    number_of_iterations = this.particles.length;
    for (let i = 0; i < number_of_iterations; i++) {
      // Increase age of particles and check for end of life
      this.particles[i].age = this.particles[i].age + 1;
      //this.particles[i].check_lifetime();
      if (this.particles[i].is_lifetime_expired()) {
        //if (this.particles[i].lifetime !== void 0 && this.particles[i].age > this.particles[i].lifetime) {
        this.delete_particle_by_index(i);
        number_of_iterations--;
      } else {
        // Reset force to zero
        this.particles[i].force.set_to_zero();
        // Reset acceleration to zero
        this.particles[i].acc.set_to_zero();
      }
    }
  }

  accumulate_forces() { // Currently only dealing with accelerations
    // Apply gravitational field accelerations (not forces)
    for (let i = 0; i < this.particles.length; i++) {
      this.particles[i].acc = this.particles[i].acc.add(this.gravitational_field);
    }
    /* In future replace with the following more elegant code (for now this does not transpile well for IE11).
    for (let particle of this.particles) {
      particle.acc = particle.acc.add(this.gravitational_field);
    }
    */

    // Apply particle attractive accelerations
    if (this.particle_to_particle_attraction_active) {
      for (let i = 0; i < this.particles.length; i++) {
        let attractive_force = new Vector2(0, 0);
        for (let j = 0; j < this.particles.length; j++) {
          if (j != i) {
            let separation_distance = this.particles[j].pos.subtract(this.particles[i].pos);
            let separation_distance_unit_vector = separation_distance.unit_vector();
            let attractive_force_magnitude = this.particle_attraction_coefficient * this.particles[i].attractive_strength * this.particles[j].attractive_strength / separation_distance.magnitude_squared();
            attractive_force = attractive_force.add(separation_distance_unit_vector.scale(attractive_force_magnitude));
          }
        }
        this.particles[i].acc = this.particles[i].acc.add(attractive_force.scale(1/this.particles[i].mass));
      }
    }

    // Todo: Apply other force types

  }

  constraint_resolution() {
    // Enforce all constraints, repeat for as many constraint solver iterations have been specified
    for (let i = 0; i < this.constraint_solver_iterations; i++) {
      // Enforce constraints
      for (let i = 0; i < this.constraints.length; i++) {
        this.constraints[i].enforce(this.constraint_solver_iterations);
      }
      /* In future replace with the following more elegant code (for now this does not transpile well for IE11).
      for (let constraint of this.constraints) {
        constraint.enforce(this.constraint_solver_iterations);
      }
      */
      // Enforce world boundaries
      for (let i = 0; i < this.particles.length; i++) {
        if (this.simple_world_boundary_collisions) {
          if (this.particles[i].pos.y + this.particles[i].radius > this.height) {
            this.particles[i].pos.y = this.height - this.particles[i].radius;
          } else if (this.particles[i].pos.y - this.particles[i].radius < 0) {
            this.particles[i].pos.y = 0 + this.particles[i].radius;
          }
          if (this.particles[i].pos.x + this.particles[i].radius > this.width) {
            this.particles[i].pos.x = this.width - this.particles[i].radius;
          } else if (this.particles[i].pos.x - this.particles[i].radius < 0) {
            this.particles[i].pos.x = 0 + this.particles[i].radius;
          }
        }
      }
      /* In future replace with the following more elegant code (for now this does not transpile well for IE11).
      for (let particle of this.particles) {
        if (this.simple_world_boundary_collisions) {
          if (particle.pos.y + particle.radius > this.height) {
            particle.pos.y = this.height - particle.radius;
          } else if (particle.pos.y - particle.radius < 0) {
            particle.pos.y = 0 + particle.radius;
          }
          if (particle.pos.x + particle.radius > this.width) {
            particle.pos.x = this.width - particle.radius;
          } else if (particle.pos.x - particle.radius < 0) {
            particle.pos.x = 0 + particle.radius;
          }
        }
      }
      */
    }
    // Check whether constraint has broken, if so, delete
    let number_of_iterations = this.constraints.length;
    for (let i = 0; i < number_of_iterations; i++) {
      if (this.constraints[i].has_broken()) {
        this.delete_constraint_by_index(i);
        number_of_iterations--;
      }
    }
  }

  collision_detection_and_response() {
    let particle_index = 0;
    let particle2_index = 0;
    for (let i = 0; i < this.particles.length; i++) {
      // Only proceed if a particle is allowed to collide
      if (this.particles[i].collides) {
        // First check for particle-particle collisions (but only proceed if current particle is allowed to collide with another particle)
        if (this.particle_to_particle_collisions) {
          particle2_index = 0;
          for (let j = 0; j < this.particles.length; j++) {
            if (particle2_index > particle_index) {
              if ((Math.pow(this.particles[particle_index].pos.x - this.particles[particle2_index].pos.x, 2) + Math.pow(this.particles[particle_index].pos.y - this.particles[particle2_index].pos.y, 2)) < Math.pow(this.particles[particle_index].radius + this.particles[particle2_index].radius, 2)) {
                // A particle-particle collision has been detected, create a contact constraint
                this.create_particle_contact_constraint(this.particles[particle_index], this.particles[particle2_index]);
              }
            }
            particle2_index++;
          }
        }
        /* In future replace with the following more elegant code (for now this does not transpile well for IE11).
        for (let particle of this.particles) {
          // Only proceed if a particle is allowed to collide
          if (particle.collides) {
            // First check for particle-particle collisions (but only proceed if current particle is allowed to collide with another particle)
            if (this.particle_to_particle_collisions) {
              particle2_index = 0;
              for (let particle2 of this.particles) {
                if (particle2_index > particle_index) {
                  if ((Math.pow(this.particles[particle_index].pos.x - this.particles[particle2_index].pos.x, 2) + Math.pow(this.particles[particle_index].pos.y - this.particles[particle2_index].pos.y, 2)) < Math.pow(this.particles[particle_index].radius + this.particles[particle2_index].radius, 2)) {
                    // A particle-particle collision has been detected, create a contact constraint
                    this.create_particle_contact_constraint(this.particles[particle_index], this.particles[particle2_index]);
                  }
                }
                particle2_index++;
              }
            }
        */
        /* Not used for now
            // Next check for particle-boundary collisions
            if (this.simple_world_boundary_collisions) {
              if (particle.pos.y + particle.radius > this.height) {
                particle.pos.y = this.height - particle.radius;
                particle.pos_previous.y = particle.pos.y;
                //this.create_particle_edge_contact_constraint(particle);
                //this.constraints[this.constraints.length].lifetime = this.constraints[this.constraints.length].age;
                //particle.pos_previous.y = particle.pos.y + temp_vely * this.time_step;
              } else if (particle.pos.y - particle.radius < 0) {
                particle.pos.y = 0 + particle.radius;
                particle.pos_previous.y = particle.pos.y;
                //alert(this.constraints[this.constraints.length-1].lifetime);
                //this.create_point_constraint(particle, null, null, 1.0);
                //this.constraints[this.constraints.length-1].lifetime = this.constraints[this.constraints.length-1].age;
                //particle.pos_previous.y = particle.pos.y + temp_vely * 0.5 * this.time_step;
              }
              if (particle.pos.x + particle.radius > this.width) {
                particle.pos.x = this.width - particle.radius;
                particle.pos_previous.x = particle.pos.x;
                //particle.pos_previous.x = particle.pos.x + temp_velx * this.time_step;
              } else if (particle.pos.x - particle.radius < 0) {
                particle.pos.x = 0 + particle.radius;
                particle.pos_previous.x = particle.pos.x;
                //particle.pos_previous.x = particle.pos.x + temp_velx * this.time_step;
              }
              //this.create_particle_edge_contact_constraint(particle);
            }
        if (this.simple_world_boundary_collisions) {
          if (particle.pos.y + particle.radius > this.height) {
            temp_vely = (particle.pos.y - particle.pos_previous.y) / this.time_step;
            adjustment = offset / 100000000;
            particle.pos.y = this.height - particle.radius;
            particle.pos_previous.y = particle.pos.y + temp_vely * this.time_step;
          } else if (particle.pos.y - particle.radius < 0) {
            temp_vely = (particle.pos.y - particle.pos_previous.y) / this.time_step;
            offset = Math.abs(particle.pos.y);
            adjustment = offset / 100000;
            if (particle.pos_previous.x < particle.pos.x) {
              if (particle.pos_previous.x + adjustment > particle.pos.x) {
                particle.pos_previous.x = particle.pos.x;
              } else {
                particle.pos_previous.x = particle.pos_previous.x + adjustment;
              }
            } else if (particle.pos_previous.x > particle.pos.x) {
              if (particle.pos_previous.x - adjustment < particle.pos.x) {
                particle.pos_previous.x = particle.pos.x;
              } else {
                particle.pos_previous.x = particle.pos_previous.x - adjustment;
              }
            }
            particle.pos.y = 0 + particle.radius;
            particle.pos_previous.y = particle.pos.y + temp_vely * 0.5 * this.time_step;
          }
          if (particle.pos.x + particle.radius > this.width) {
            temp_velx = (particle.pos.x - particle.pos_previous.x) / this.time_step;
            offset = Math.abs(particle.pos.x - this.width);
            particle.pos.x = this.width - particle.radius;
            particle.pos_previous.x = particle.pos.x + temp_velx * this.time_step;
          } else if (particle.pos.x - particle.radius < 0) {
            temp_velx = (particle.pos.x - particle.pos_previous.x) / this.time_step;
            offset = Math.abs(particle.pos.x - 0);
            particle.pos.x = 0 + particle.radius;
            particle.pos_previous.x = particle.pos.x + temp_velx * this.time_step;
          }
        }
        */
      }
      particle_index++;
    }
  }

  integrate() {
    for (let i = 0; i < this.particles.length; i++) {
      this.particles[i].integrate(this.time_step, this.damping_coefficient);
    }
    /* In future replace with the following more elegant code (for now this does not transpile well for IE11).
    for (let particle of this.particles) {
      particle.integrate(this.time_step, this.damping_coefficient);
    }
    */
  }

}
