/*

  jsRubble Physics Engine - Demonstration App Scenes

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

var scenes = [

  [

    name = "Cloth-flexible",

    loader = function() {
      physics_frequency = 50;
      physics_period = 1 / physics_frequency;
      world_size = 10;
      physics_world = new PhysicsWorld(world_size, world_size, physics_period, 10);
      physics_world.gravitational_field.y = -9.81;
      physics_world.particle_to_particle_collisions = false;
      physics_world.damping_coefficient = 0;
      var top_left_particle_index = physics_world.particles.length;
      var top_right_particle_index = top_left_particle_index + 20;
      create_cloth(5, 7, 0, 5, 4, 20, 20, 10, 50, 0.9, false, null);
      physics_world.particles[top_left_particle_index].fixed = true;
      physics_world.particles[top_left_particle_index + (top_right_particle_index - top_left_particle_index) / 2].fixed = true;
    }

  ],

  [

    name = "Cloth-stiff",

    loader = function() {
      physics_frequency = 50;
      physics_period = 1 / physics_frequency;
      world_size = 10;
      physics_world = new PhysicsWorld(world_size, world_size, physics_period, 10);
      physics_world.gravitational_field.y = -9.81;
      physics_world.particle_to_particle_collisions = false;
      var top_left_particle_index = physics_world.particles.length;
      var top_right_particle_index = top_left_particle_index + 14;
      create_cloth(5, 7.5, 0, 5, 4, 14, 14, 20, 50, 1.0, false, null);
      physics_world.particles[physics_world.particles.length - 1].fixed = true;
      physics_world.particles[physics_world.particles.length - 1 - 14].fixed = true;
    }

  ],

  [

    name = "Cloth-breakable",

    loader = function() {
      physics_frequency = 50;
      physics_period = 1 / physics_frequency;
      world_size = 10;
      physics_world = new PhysicsWorld(world_size, world_size, physics_period, 10);
      physics_world.gravitational_field.y = -9.81;
      physics_world.particle_to_particle_collisions = false;
      physics_world.damping_coefficient = 0;
      var top_left_particle_index = physics_world.particles.length;
      var top_right_particle_index = top_left_particle_index + 14;
      create_cloth(5, 7, 0, 5, 4, 14, 14, 30, 50, 0.7, true, 1.1);
      physics_world.particles[top_left_particle_index].fixed = true;
      physics_world.particles[top_left_particle_index + 2].fixed = true;
      physics_world.particles[top_right_particle_index - 8].fixed = true;
      physics_world.particles[top_right_particle_index].fixed = true;
      physics_world.particles[top_left_particle_index + (top_right_particle_index - top_left_particle_index) / 2 - 1].fixed = true;
    }

  ],

  [

    name = "Flexible-blob-firm",

    loader = function() {
      physics_frequency = 50;
      physics_period = 1 / physics_frequency;
      world_size = 10;
      physics_world = new PhysicsWorld(world_size, world_size, physics_period, 10);
      physics_world.gravitational_field.y = -9.81;
      physics_world.particle_to_particle_collisions = false;
      create_blob(5, 6, 2 * PI / 20 * 3, 4, 4, 5, 5, 30, 50, 1.0, false, null);
    }

  ],

  [

    name = "Flexible-box-soft",

    loader = function() {
      physics_frequency = 50;
      physics_period = 1 / physics_frequency;
      world_size = 10;
      physics_world = new PhysicsWorld(world_size, world_size, physics_period, 10);
      physics_world.gravitational_field.y = -9.81;
      create_blob(5, 7, 2 * PI / 20 * 6, 4, 4, 5, 5, 30, 50, 0.6, false, null);
    }

  ],

  [

    name = "Flexible-box-random",

    loader = function() {
      physics_frequency = 50;
      physics_period = 1 / physics_frequency;
      world_size = 10;
      physics_world = new PhysicsWorld(world_size, world_size, physics_period, 10);
      physics_world.gravitational_field.y = -9.81;
      var random_width = Math.random() * 3 + 2;
      var random_height = Math.random() * 3 + 2;
      var random_angle = 2 * PI / 6 * Math.random();
      var random_stiffness = 0.5 + Math.random() * 0.5;
      create_blob(5, 5, random_angle, random_width, random_height, 5, 5, 50, 50, random_stiffness, false, null);
    }

  ],

  [

    name = "Flexible-box-breakable",

    loader = function() {
      physics_frequency = 50;
      physics_period = 1 / physics_frequency;
      world_size = 10;
      physics_world = new PhysicsWorld(world_size, world_size, physics_period, 10);
      physics_world.gravitational_field.y = -9.81;
      var random_size = Math.random() * 4 + 1
      var random_angle = 2 * PI / 6 * Math.random();
      create_blob(5, 6, PI / 6, 4, 4, 5, 5, 30, 50, 0.7, true, 0.12);
    }

  ],

  [

    name = "Particle-cluster",

    loader = function() {
      physics_frequency = 100;
      physics_period = 1 / physics_frequency;
      world_size = 10;
      physics_world = new PhysicsWorld(world_size, world_size, physics_period, 10);
      physics_world.gravitational_field.y = -9.81;
      create_square_cluster(5, 5, -2 * PI / 8, 4, 5, 12, 15, 90, 50);
    }

  ],

  [

    name = "Rope-stiff",

    loader = function() {
      physics_frequency = 50;
      physics_period = 1 / physics_frequency;
      world_size = 10;
      physics_world = new PhysicsWorld(world_size, world_size, physics_period, 10);
      physics_world.gravitational_field.y = -9.81;
      create_rope(5, 6, 9, 8, 15, 30, 10, 1.0);
    }

  ],

  [

    name = "Rope-stiff-with-ball",

    loader = function() {
      physics_frequency = 50;
      physics_period = 1 / physics_frequency;
      world_size = 10;
      physics_world = new PhysicsWorld(world_size, world_size, physics_period, 10);
      physics_world.gravitational_field.y = -9.81;
      create_rope_with_ball(5, 6, 9, 8, 15, 30, 10, 1.0, 100);
    }

  ],

  [

    name = "Rope-stretchy",

    loader = function() {
      physics_frequency = 50;
      physics_period = 1 / physics_frequency;
      world_size = 10;
      physics_world = new PhysicsWorld(world_size, world_size, physics_period, 10);
      physics_world.gravitational_field.y = -9.81;
      create_rope(5, 6, 9, 8, 15, 30, 10, 0.5);
    }

  ],

  [

    name = "Rope-stretchy-with-ball",

    loader = function() {
      physics_frequency = 50;
      physics_period = 1 / physics_frequency;
      world_size = 10;
      physics_world = new PhysicsWorld(world_size, world_size, physics_period, 10);
      physics_world.gravitational_field.y = -9.81;
      create_rope_with_ball(5, 8, 8, 8, 10, 30, 10, 0.95, 100);
    }

  ],

  [

    name = "Double Pendulum",

    loader = function() {
      physics_frequency = 50;
      physics_period = 1 / physics_frequency;
      world_size = 10;
      physics_world = new PhysicsWorld(world_size, world_size, physics_period, 10);
      physics_world.particle_to_particle_collisions = false;
      physics_world.damping_coefficient = 0;
      physics_world.gravitational_field.y = -9.81;
      physics_world.create_particle(5, 5, 0, 0, 0, 0, 0, 0, 100, 0.2, true);
      physics_world.create_particle(6.5, 6.5, 0, 0, 0, 0, 0, 0, 100, 0.5, false);
      physics_world.create_particle(8, 8, 0, 0, 0, 0, 0, 0, 100, 0.5, false);
      physics_world.particles[physics_world.particles.length - 1].pos_previous.x = 7.3;
      physics_world.create_distance_constraint(physics_world.particles[physics_world.particles.length - 2], physics_world.particles[physics_world.particles.length - 1]);
      physics_world.create_distance_constraint(physics_world.particles[physics_world.particles.length - 3], physics_world.particles[physics_world.particles.length - 2]);
    }

  ],

  [

    name = 'Cantilever',

    loader = function() {
      physics_frequency = 50;
      physics_period = 1 / physics_frequency;
      world_size = 10;
      physics_world = new PhysicsWorld(world_size, world_size, physics_period, 10);
      physics_world.gravitational_field.y = -9.81;
      var first_particle = physics_world.particles.length;
      create_blob(5, 9, 0, 7, 1, 7, 1, 20, 50, 1.0, false, null);
      physics_world.particles[first_particle].fixed = true;
      physics_world.particles[first_particle + 8].fixed = true;
      first_particle = physics_world.particles.length;
      create_blob(5, 6, 0, 7, 2, 7, 2, 20, 50, 1.0, false, null);
      physics_world.particles[first_particle].fixed = true;
      physics_world.particles[first_particle + 8].fixed = true;
      physics_world.particles[first_particle + 8 + 8].fixed = true;
      first_particle = physics_world.particles.length;
      create_blob(5, 2, 0, 7, 3, 7, 3, 20, 50, 1.0, false, null);
      physics_world.particles[first_particle].fixed = true;
      physics_world.particles[first_particle + 8].fixed = true;
      physics_world.particles[first_particle + 8 + 8].fixed = true;
      physics_world.particles[first_particle + 8 + 8 + 8].fixed = true;
    }

  ],

  [

    name = "Particle Attraction",

    loader = function() {
      physics_frequency = 50;
      physics_period = 1 / physics_frequency;
      world_size = 40;
      physics_world = new PhysicsWorld(world_size, world_size, physics_period, 10);
      physics_world.gravitational_field.y = 0;
      physics_world.particle_to_particle_collisions = true;
      physics_world.simple_world_boundary_collisions = true;
      physics_world.particle_to_particle_attraction_active = true;
      this.particle_attraction_coefficient = 30;
      physics_world.damping_coefficient = 0;

      physics_world.create_particle(20, 15, 0, 0, 0, 0, 0, 0, 4, 4, false);
      let previous_particle = physics_world.particles[physics_world.particles.length-1];
      previous_particle.attractive_strength=previous_particle.mass;

      physics_world.create_particle(12, 7, 0, 0, 0, 0, 0, 0, 1, 1, false);
      previous_particle = physics_world.particles[physics_world.particles.length-1];
      previous_particle.attractive_strength=previous_particle.mass;
      previous_particle.pos_previous = previous_particle.pos.subtract(new Vector2(-0.05, 0.05));

      physics_world.create_particle(14, 21, 0, 0, 0, 0, 0, 0, 1.5, 1.5, false);
      previous_particle = physics_world.particles[physics_world.particles.length-1];
      previous_particle.attractive_strength=previous_particle.mass;

      physics_world.create_particle(17, 7, 0, 0, 0, 0, 0, 0, 1.5, 1.5, false);
      previous_particle = physics_world.particles[physics_world.particles.length-1];
      previous_particle.attractive_strength=previous_particle.mass;
      previous_particle.pos_previous = previous_particle.pos.subtract(new Vector2(-0.05, 0.05));

      physics_world.create_particle(34, 30, 0, 0, 0, 0, 0, 0, 1.7, 1.7, false);
      previous_particle = physics_world.particles[physics_world.particles.length-1];
      previous_particle.attractive_strength=previous_particle.mass;
      previous_particle.pos_previous = previous_particle.pos.subtract(new Vector2(-0.05, 0.05));

    }

  ],

  [

    name = "Particle Cluster Attraction",

    loader = function() {
      physics_frequency = 50;
      physics_period = 1 / physics_frequency;
      world_size = 40;
      physics_world = new PhysicsWorld(world_size, world_size, physics_period, 10);
      physics_world.gravitational_field.y = 0;
      physics_world.particle_to_particle_collisions = true;
      physics_world.simple_world_boundary_collisions = true;
      physics_world.particle_to_particle_attraction_active = true;
      this.particle_attraction_coefficient = 30;
      physics_world.damping_coefficient = 0;

      create_square_cluster(20, 20, -2 * PI / 8, 25, 25, 10, 10, 60, 50);

      for (let i =0; i < physics_world.particles.length; i++){
          physics_world.particles[i].attractive_strength=physics_world.particles[i].mass/60;
      }
    }

  ],

  [

    name = "Elliptical Orbit",

    loader = function() {
      physics_frequency = 50;
      physics_period = 1 / physics_frequency;
      world_size = 100;
      physics_world = new PhysicsWorld(world_size, world_size, physics_period, 10);
      physics_world.gravitational_field.y = 0;
      physics_world.particle_to_particle_collisions = true;
      physics_world.simple_world_boundary_collisions = false;
      physics_world.particle_to_particle_attraction_active = true;
      this.particle_attraction_coefficient = 30;
      physics_world.damping_coefficient = 0;
      physics_world.create_particle(50, 50, 0, 0, 0, 0, 0, 0, 130, 10, false);
      let previous_particle = physics_world.particles[physics_world.particles.length-1];
      previous_particle.attractive_strength=previous_particle.mass;
      physics_world.create_particle(26, 20, 0, 0, 0, 0, 0, 0, 1, 1, false);
      previous_particle = physics_world.particles[physics_world.particles.length-1];
      previous_particle.attractive_strength=previous_particle.mass;
      previous_particle.pos_previous = previous_particle.pos.subtract(new Vector2(-0.1, 0.1));

    }

  ],

  [

    name = "Multiple Satellite Orbit",

    loader = function() {
      physics_frequency = 50;
      physics_period = 1 / physics_frequency;
      world_size = 100;
      physics_world = new PhysicsWorld(world_size, world_size, physics_period, 10);
      physics_world.gravitational_field.y = 0;
      physics_world.particle_to_particle_collisions = true;
      physics_world.simple_world_boundary_collisions = false;
      physics_world.particle_to_particle_attraction_active = true;
      this.particle_attraction_coefficient = 30;
      physics_world.damping_coefficient = 0;

      physics_world.create_particle(50, 50, 0, 0, 0, 0, 0, 0, 130, 10, false);
      let previous_particle = physics_world.particles[physics_world.particles.length-1];
      previous_particle.attractive_strength=previous_particle.mass;

      physics_world.create_particle(25, 25, 0, 0, 0, 0, 0, 0, 1, 1, false);
      previous_particle = physics_world.particles[physics_world.particles.length-1];
      previous_particle.pos_previous = previous_particle.pos.subtract(new Vector2(-0.15, 0.15));
      previous_particle.attractive_strength=previous_particle.mass;

      physics_world.create_particle(75, 75, 0, 0, 0, 0, 0, 0, 1, 1, false);
      previous_particle = physics_world.particles[physics_world.particles.length-1];
      previous_particle.pos_previous = previous_particle.pos.subtract(new Vector2(0.15, -0.15));
      previous_particle.attractive_strength=previous_particle.mass;

      physics_world.create_particle(25, 75, 0, 0, 0, 0, 0, 0, 1, 1, false);
      previous_particle = physics_world.particles[physics_world.particles.length-1];
      previous_particle.pos_previous = previous_particle.pos.subtract(new Vector2(0.15, 0.15));
      previous_particle.attractive_strength=previous_particle.mass;


    }

  ],

  [

    name = "Combo-1",

    loader = function() {
      physics_frequency = 50;
      physics_period = 1 / physics_frequency;
      world_size = 10;
      physics_world = new PhysicsWorld(world_size, world_size, physics_period, 10);
      physics_world.gravitational_field.y = -9.81;
      create_rope(1, 5, 9, 5, 30, 95, 40, 0.85);
      physics_world.particles[physics_world.particles.length - 1].fixed = true;
      physics_world.create_particle(4, 7, 0, 0, 0, 0, 0, 0, 150, 1, false);
    }

  ],

  [

    name = "Combo-2",

    loader = function() {
      physics_frequency = 100;
      physics_period = 1 / physics_frequency;
      world_size = 10;
      physics_world = new PhysicsWorld(world_size, world_size, physics_period, 10);
      physics_world.gravitational_field.y = -9.81;
      create_rope(1, 5, 9, 5, 40, 30, 10, 1.0);
      physics_world.particles[physics_world.particles.length - 1].fixed = true;
    }

  ],

  [

    name = "Combo-3",

    loader = function() {
      physics_frequency = 50;
      physics_period = 1 / physics_frequency;
      world_size = 10;
      physics_world = new PhysicsWorld(world_size, world_size, physics_period, 10);
      physics_world.gravitational_field.y = -9.81;
      create_rope(1, 6, 9, 5, 30, 30, 10, 0.8);
      physics_world.particles[0].fixed = false;
      physics_world.create_particle(3, 3.5, 0, 0, 0, 0, 0, 0, 100, 0.5, false);
      physics_world.particles[physics_world.particles.length - 1].fixed = true;
      physics_world.create_particle(6, 4, 0, 0, 0, 0, 0, 0, 100, 0.5, false);
      physics_world.particles[physics_world.particles.length - 1].fixed = true;
    }

  ],

  [

    name = "Combo-4",

    loader = function() {
      physics_frequency = 50;
      physics_period = 1 / physics_frequency;
      world_size = 10;
      physics_world = new PhysicsWorld(world_size, world_size, physics_period, 10);
      physics_world.gravitational_field.y = -9.81;
      create_rope(3, 9, 8, 9, 25, 30, 10, 0.8);
      physics_world.particles[0].fixed = false;
      physics_world.create_particle(physics_world.particles[physics_world.particles.length - 1].pos.x + 1, physics_world.particles[physics_world.particles.length - 1].pos.y, 0, 0, 0, 0, 0, 0, 50, 0.85, false);
      physics_world.create_distance_constraint(physics_world.particles[physics_world.particles.length - 1], physics_world.particles[physics_world.particles.length - 2], null, 1.0);
      physics_world.create_particle(physics_world.particles[0].pos.x - 1, physics_world.particles[0].pos.y, 0, 0, 0, 0, 0, 0, 50, 0.80, false);
      physics_world.create_distance_constraint(physics_world.particles[physics_world.particles.length - 1], physics_world.particles[0], null, 1.0);
      physics_world.create_particle(3.5, 5, 0, 0, 0, 0, 0, 0, 100, 0.5, false);
      physics_world.particles[physics_world.particles.length - 1].fixed = true;
      physics_world.create_particle(6.5, 5, 0, 0, 0, 0, 0, 0, 100, 0.5, false);
      physics_world.particles[physics_world.particles.length - 1].fixed = true;
    }

  ],

  [

    name = "Combo-5",

    loader = function() {
      physics_frequency = 50;
      physics_period = 1 / physics_frequency;
      world_size = 10;
      physics_world = new PhysicsWorld(world_size, world_size, physics_period, 10);
      physics_world.gravitational_field.y = -9.81;
      create_rope(0.5, 9, 9.5, 9, 35, 30, 10, 0.8);
      physics_world.particles[0].fixed = false;
      physics_world.create_particle(4.5, 2.5, 0, 0, 0, 0, 0, 0, 100, 0.5, true);
      //physics_world.create_point_constraint(physics_world.particles[physics_world.particles.length - 1], null, null, 1.0);
      physics_world.create_particle(6, 3, 0, 0, 0, 0, 0, 0, 100, 0.5, true);
      //physics_world.create_point_constraint(physics_world.particles[physics_world.particles.length - 1], null, null, 1.0);
      physics_world.create_particle(3, 3, 0, 0, 0, 0, 0, 0, 100, 0.5, true);
      //physics_world.create_point_constraint(physics_world.particles[physics_world.particles.length - 1], null, null, 1.0);
      physics_world.create_particle(2.5, 7.5, 0, 0, 0, 0, 0, 0, 100, 0.5, true);
      physics_world.create_particle(7, 7.5, 0, 0, 0, 0, 0, 0, 100, 0.5, true);
      physics_world.create_particle(4.5, 6, 0, 0, 0, 0, 0, 0, 100, 0.5, true);
    }

  ],

  [

    name = "Balls-many",

    loader = function() {
      physics_frequency = 100;
      physics_period = 1 / physics_frequency;
      world_size = 10;
      physics_world = new PhysicsWorld(world_size, world_size, physics_period, 10);
      physics_world.gravitational_field.y = -9.81;
      for (var i = 0; i < 100; i++) {
        var random_size;
        var random_pos;
        var overlapping = true;
        while (overlapping) {
          var random_size = 0.2 + Math.random() * 0.5;
          var random_pos = new Vector2(1 + Math.random() * (world_size - 2), 1 + Math.random() * (world_size - 2));
          overlapping = false;
          for (var k = 0; k < physics_world.particles.length; k++) {
            if ((Math.pow(physics_world.particles[k].pos.x - random_pos.x, 2) + Math.pow(physics_world.particles[k].pos.y - random_pos.y, 2)) < Math.pow(physics_world.particles[k].radius + random_size, 2)) {
              overlapping = true;
            }
          }
          if (!overlapping) {
            physics_world.create_particle(random_pos.x, random_pos.y, 0, 0, 0, 0, 0, 0, random_size * 10, random_size, false);
          }
        }
      }
    }

  ]

];
