/*

  jsRubble Physics Engine - Helper Functions

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

function create_blob(pos_x, pos_y, angle, width, height, divisions_width, divisions_height, filling_percent, density, stiffness, breakable, breaking_strain) {

  var centre = new Vector2(pos_x, pos_y);
  var index = 0;
  var particle_mass = density * width * height / (divisions_width + 1) / (divisions_height + 1);
  // Note: density is in kg / sq. m
  var spacing_width = width / divisions_width;
  var spacing_height = height / divisions_height;
  var radii = filling_percent / 200 * 0.99 * Math.min(spacing_width, spacing_height);
  var start_point = physics_world.particles.length;

  for (var count = 0; count < divisions_height + 1; count++) {
    for (var count2 = 0; count2 < divisions_width + 1; count2++) {

      physics_world.create_particle((centre.x - width / 2) + count2 * spacing_width, (centre.y + height / 2) - count * spacing_height, 0, 0, 0, 0, 0, 0, particle_mass, radii, false);
      physics_world.particles[physics_world.particles.length - 1].pos = physics_world.particles[physics_world.particles.length - 1].pos.rotate_about(centre, angle);
      physics_world.particles[physics_world.particles.length - 1].pos_previous.set_to(physics_world.particles[physics_world.particles.length - 1].pos);

      if ((0 < count2 && count2 < (divisions_width + 1))) {
        physics_world.create_distance_constraint(physics_world.particles[start_point + index], physics_world.particles[start_point + index - 1], null, stiffness);
        if (breakable && breaking_strain != null) {
          physics_world.constraints[physics_world.constraints.length - 1].breakable = true;
          physics_world.constraints[physics_world.constraints.length - 1].breaking_strain = breaking_strain;
        }
      }

      if ((0 < count && count < (divisions_height + 1))) {
        physics_world.create_distance_constraint(physics_world.particles[start_point + index], physics_world.particles[start_point + index - (divisions_width + 1)], null, stiffness);
        if (breakable && breaking_strain != null) {
          physics_world.constraints[physics_world.constraints.length - 1].breakable = true;
          physics_world.constraints[physics_world.constraints.length - 1].breaking_strain = breaking_strain;
        }
      }

      if ((0 < count && count < (divisions_height + 1))) {
        if ((0 <= count2 && count2 < (divisions_width))) {
          physics_world.create_distance_constraint(physics_world.particles[start_point + index], physics_world.particles[start_point + index - (divisions_width)], null, stiffness);
          if (breakable && breaking_strain != null) {
            physics_world.constraints[physics_world.constraints.length - 1].breakable = true;
            physics_world.constraints[physics_world.constraints.length - 1].breaking_strain = breaking_strain;
          }
        }
      }

      if ((0 < count && count < (divisions_height + 1))) {
        if ((0 < count2 && count2 < (divisions_width + 1))) {
          physics_world.create_distance_constraint(physics_world.particles[start_point + index], physics_world.particles[start_point + index - (divisions_width + 2)], null, stiffness);
          if (breakable && breaking_strain != null) {
            physics_world.constraints[physics_world.constraints.length - 1].breakable = true;
            physics_world.constraints[physics_world.constraints.length - 1].breaking_strain = breaking_strain;
          }
        }
      }

      index++;

    }
  }

}

function create_cloth(pos_x, pos_y, angle, width, height, divisions_width, divisions_height, filling_percent, density, stiffness, breakable, breaking_strain) {

  var centre = new Vector2(pos_x, pos_y);
  var index = 0;
  var particle_mass = density * width * height / (divisions_width + 1) / (divisions_height + 1);
  // Note: density is in kg / sq. m
  var spacing_width = width / divisions_width;
  var spacing_height = height / divisions_height;
  var radii = filling_percent / 200 * 0.99 * Math.min(spacing_width, spacing_height);
  var start_point = physics_world.particles.length;

  for (var count = 0; count < divisions_height + 1; count++) {
    for (var count2 = 0; count2 < divisions_width + 1; count2++) {

      physics_world.create_particle((centre.x - width / 2) + count2 * spacing_width, (centre.y + height / 2) - count * spacing_height, 0, 0, 0, 0, 0, 0, particle_mass, radii, false);
      physics_world.particles[physics_world.particles.length - 1].pos = physics_world.particles[physics_world.particles.length - 1].pos.rotate_about(centre, angle);
      physics_world.particles[physics_world.particles.length - 1].pos_previous.set_to(physics_world.particles[physics_world.particles.length - 1].pos);

      if ((0 < count2 && count2 < (divisions_width + 1))) {
        physics_world.create_distance_constraint(physics_world.particles[start_point + index], physics_world.particles[start_point + index - 1], null, stiffness);
        if (breakable && breaking_strain != null) {
          physics_world.constraints[physics_world.constraints.length - 1].breakable = true;
          physics_world.constraints[physics_world.constraints.length - 1].breaking_strain = breaking_strain;
        }
      }

      if ((0 < count && count < (divisions_height + 1))) {
        physics_world.create_distance_constraint(physics_world.particles[start_point + index], physics_world.particles[start_point + index - (divisions_width + 1)], null, stiffness);
        if (breakable && breaking_strain != null) {
          physics_world.constraints[physics_world.constraints.length - 1].breakable = true;
          physics_world.constraints[physics_world.constraints.length - 1].breaking_strain = breaking_strain;
        }
      }

      index++;

    }
  }

}

function create_square_cluster(pos_x, pos_y, angle, width, height, divisions_width, divisions_height, filling_percent, density) {

  var centre = new Vector2(pos_x, pos_y);
  var index = 0;
  var particle_mass = density * width * height / (divisions_width + 1) / (divisions_height + 1);
  // Note: density is in kg / sq. m
  var spacing_width = width / divisions_width;
  var spacing_height = height / divisions_height;
  var radii = filling_percent / 200 * 0.99 * Math.min(spacing_width, spacing_height);
  var start_point = physics_world.particles.length;

  for (var count = 0; count < divisions_height + 1; count++) {
    for (var count2 = 0; count2 < divisions_width + 1; count2++) {
      physics_world.create_particle((centre.x - width / 2) + count2 * spacing_width, (centre.y + height / 2) - count * spacing_height, 0, 0, 0, 0, 0, 0, particle_mass, radii, false);
      physics_world.particles[physics_world.particles.length - 1].pos = physics_world.particles[physics_world.particles.length - 1].pos.rotate_about(centre, angle);
      physics_world.particles[physics_world.particles.length - 1].pos_previous.set_to(physics_world.particles[physics_world.particles.length - 1].pos);
    }
  }

}

function create_fluid_cluster(pos_x, pos_y, angle, width, height, divisions_width, divisions_height, filling_percent, density, collides){
  var centre = new Vector2(pos_x, pos_y);
  var index = 0;
  var particle_mass = density * width * height / (divisions_width + 1) / (divisions_height + 1);
  // Note: density is in kg / sq. m
  var spacing_width = width / divisions_width;
  var spacing_height = height / divisions_height;
  var radii = filling_percent / 200 * 0.6 * Math.min(spacing_width, spacing_height);
  var start_point = physics_world.particles.length;

  for (var count = 0; count < divisions_height + 1; count++) {
    for (var count2 = 0; count2 < divisions_width + 1; count2++) {
      physics_world.create_particle((centre.x - width / 2) + count2 * spacing_width, (centre.y + height / 2) - count * spacing_height, 0, 0, 0, 0, 0, 0, particle_mass, radii, false);
      physics_world.particles[physics_world.particles.length - 1].pos = physics_world.particles[physics_world.particles.length - 1].pos.rotate_about(centre, angle);
      physics_world.particles[physics_world.particles.length - 1].pos_previous.set_to(physics_world.particles[physics_world.particles.length - 1].pos);
      physics_world.particles[physics_world.particles.length - 1].SPH_particle = true;
      physics_world.particles[physics_world.particles.length -1].collides = collides;
    }
  }

}

function create_rope(start_x, start_y, end_x, end_y, divisions, filling_ratio, density, stiffness) {

  var start_v = new Vector2(start_x, start_y);
  var end_v = new Vector2(end_x, end_y);
  var length = end_v.distance_from(start_v);
  var direction = end_v.subtract(start_v).unit_vector();
  var segment_length = length / divisions;
  var particle_mass = density * segment_length;
  // Note: density is in kg / m
  var particle_radius = filling_ratio / 200 * 0.99 * segment_length;

  for (var i = 0; i < divisions; i++) {
    next_point = start_v.add(direction.scale(segment_length * i));
    physics_world.create_particle(next_point.x, next_point.y, 0, 0, 0, 0, 0, 0, particle_mass, particle_radius, false);
    if (i == 0) {
      physics_world.particles[physics_world.particles.length - 1].fixed = true;
    } else {
      physics_world.create_distance_constraint(physics_world.particles[physics_world.particles.length - 1], physics_world.particles[physics_world.particles.length - 2], null, stiffness);
    }
  }

}

function create_rope_with_ball(start_x, start_y, end_x, end_y, divisions, filling_ratio, density, stiffness, ball_mass) {

  create_rope(start_x, start_y, end_x, end_y, divisions, filling_ratio, density, stiffness);
  // Note: density is in kg / m
  var start_v = new Vector2(start_x, start_y);
  var end_v = new Vector2(end_x, end_y);
  var direction = end_v.subtract(start_v).unit_vector();
  var length = end_v.distance_from(start_v);
  var segment_length = length / divisions;
  var next_point = start_v.add(direction.scale(segment_length * (divisions + 1)));
  physics_world.create_particle(next_point.x, next_point.y, 0, 0, 0, 0, 0, 0, ball_mass, 0.5, false);
  physics_world.create_distance_constraint(physics_world.particles[physics_world.particles.length - 1], physics_world.particles[physics_world.particles.length - 2], null, stiffness);

}