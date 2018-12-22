/*

  jsRubble Physics Engine - Demonstration App

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

// The HTML5 canvas element
var canvas = document.getElementById("SketchCanvas");
// Create a graphics context
var ctx = canvas.getContext("2d");
// Target update rate in Hz
var physics_frequency = 50;
// Associated physics update period
var physics_period = 1 / physics_frequency;
// Rendering scaling variables
var draw_size;
var draw_scaling_factor;
var debug_mode = false;
// The physics world
var physics_world;
// The world size
var world_size;
// Declare loop timing variables
var time_now;
var time_prev;
var delta;
var paused;
// Used to debounce resize calcultions
var debounce;

function draw_world() {
  // Clear the scene
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // Draw border
  ctx.beginPath();
  ctx.rect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'black';
  ctx.stroke();
  // Draw the constraints
  for (var count = 0; count < physics_world.constraints.length; count++) {
    // Draw distance constraints
    if (physics_world.constraints[count] instanceof DistanceConstraint) {
      if (!(physics_world.constraints[count] instanceof ParticleContactConstraint) || debug_mode) {
        ctx.beginPath();
        ctx.moveTo(physics_world.constraints[count].p1.pos.x * draw_scaling_factor, world_size * draw_scaling_factor - physics_world.constraints[count].p1.pos.y * draw_scaling_factor);
        ctx.lineTo(physics_world.constraints[count].p2.pos.x * draw_scaling_factor, world_size * draw_scaling_factor - physics_world.constraints[count].p2.pos.y * draw_scaling_factor);
        ctx.strokeStyle = 'rgba(33,33,220,1)';
        ctx.stroke();
      }
    }
    /* Not used yet - //Draw angle constraints
    if (physics_world.constraints[count] instanceof AngleConstraint) {
      ctx.beginPath();
      ctx.arc(physics_world.constraints[count].p_anchor.pos.x * draw_scaling_factor, world_size * draw_scaling_factor - physics_world.constraints[count].p_anchor.pos.y * draw_scaling_factor, (physics_world.constraints[count].p_anchor.radius*1.35) * draw_scaling_factor, 0, 2 * Math.PI, false);
      ctx.fillStyle = 'rgba(255,0,0,0.3)';
      ctx.fill();
    }
    */
  }
  // Draw the particles
  for (var count = 0; count < physics_world.particles.length; count++) {
    ctx.beginPath();
    ctx.strokeStyle = 'rgba(53,53,53,1)';
    ctx.arc(physics_world.particles[count].pos.x * draw_scaling_factor, world_size * draw_scaling_factor - physics_world.particles[count].pos.y * draw_scaling_factor, physics_world.particles[count].radius * draw_scaling_factor, 0, 2 * Math.PI, false);
    if (physics_world.particles[count].fixed === true) {
      ctx.fillStyle = 'rgba(255,155,33,0.5)';
    } else {
      ctx.fillStyle = 'rgba(33,220,33,0.5)';
    }
    ctx.fill();
    ctx.stroke();
    if (debug_mode) {
      ctx.fillStyle = 'rgba(53,53,53,1)';
      ctx.font = draw_size * 0.03 + 'px ariel';
      ctx.fillText(count, physics_world.particles[count].pos.x * draw_scaling_factor - 4, world_size * draw_scaling_factor - physics_world.particles[count].pos.y * draw_scaling_factor + 3);
    }
  }
  // Draw debug information
  if (debug_mode) {
    ctx.font = draw_size * 0.03 + 'px ariel';
    ctx.fillStyle = 'black';
    ctx.fillText("Physics steps: " + physics_world.steps + ", Physics time: " + physics_world.time.toFixed(3) + "s, Physics dt: " + physics_world.time_step.toFixed(3) + "s", 7, 16);
    ctx.fillText("Number of particles: " + physics_world.particles.length + ", Number of constraints: " + physics_world.constraints.length, 7, 16 + draw_size * 0.04);
  }
}

function app_loop() {
  if (!paused) {
    draw_world();
    time_now = get_time();
    delta = delta + (time_now - time_prev);
    while (delta > (physics_period * 1000)) {
      delta = delta - (physics_period * 1000);
      physics_world.update();
    }
    time_prev = get_time();
    window.requestAnimationFrame(app_loop);
  }
}

function resize_canvas() {
  // Resize the canvas element to suit the current viewport size/shape
  var viewport_width = $(window).width();
  var viewport_height = $(window).height();
  draw_size = Math.round(0.80 * Math.min(viewport_width, 0.80 * viewport_height));
  ctx.canvas.height = draw_size;
  ctx.canvas.width = draw_size;
  // Recalculate the draw scaling factor
  draw_scaling_factor = draw_size / world_size;
  // Draw the world
  draw_world();
}

function initialise() {
  // Load the currently selected scene
  scenes[$("#scene_list").prop('selectedIndex')][1].call();
  // Resize the canvas
  resize_canvas();
  // Draw the world
  draw_world();
  // Initialise the loop timing variables
  time_now = get_time();
  time_prev = get_time();
  delta = 0;
  // Start the loop
  window.requestAnimationFrame(app_loop);
}

$('#scene_list').on('change', function () {
  // Re-initialise if a different scene has been selected. Give the garbage collector an opportunity to clear scenes with large numbers of world elements.
  let pause_state = paused;
  if (!paused) {
    paused = true;
  }
  setTimeout(function () { initialise(); paused = pause_state; }, 100);
});

$('#ResumePause').on('click', function (e) {
  if (paused) {
    paused = false;
    $('#ResumePause').text('Pause');
    $("#Step").addClass("disabled");
    time_now = get_time();
    time_prev = get_time();
    window.requestAnimationFrame(app_loop);
  } else {
    paused = true;
    $('#ResumePause').text('Resume');
    $('#Step').removeClass("disabled");
  }
  draw_world();
});

$('#Step').on('click', function (e) {
  physics_world.update();
  draw_world();
});

$('#Reset').on('click', function (e) {
  initialise();
});

$(window).resize(function () {
  clearTimeout(debounce);
  debounce = setTimeout(function () {
    resize_canvas();
  }, 50);
});

$(document).ready(function () {
  // Populate the scenes select list with the available scenes
  populate_select_list();
  // Set the initial state of debug_mode to false
  $('#debug_checkbox').prop('checked', false);
  debug_mode = false;
  // Ensure the width of the "Resume/Pause" button is consistent
  paused = false;
  var button_width = $('#ResumePause').width();
  $('#ResumePause').text('Pause');
  $('#ResumePause').width(button_width);
  // Initialise the scene
  initialise();
});

function populate_select_list() {
  for (var count = 0; count < scenes.length; count++) {
    //scene = scenes[count]
    $('#scene_list').append($('<option>', {
      value: scenes[count],
      text: scenes[count][0]
    }));
  }
  $("#scene_list").prop('selectedIndex', 0);
}

$('#debug_checkbox').change(function () {
  debug_mode = $(this).prop('checked');
  if (paused) {
    draw_world();
  }
});