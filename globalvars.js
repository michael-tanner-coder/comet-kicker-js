// GLOBAL VARIABLES

// spawning
var spawn_timer = MAX_SPAWN_TIMER;
var collect_spawn_timer = MAX_COLLECT_SPAWN_TIMER;

// game state
var game_over = false;
var game_state = STATES.MENU;

// scores
var score = 0;
var enemy_point_value = 10;
var high_scores = window.localStorage.getItem("high_scores");
var max_high_score_list_length = 5;
var recent_scores = window.localStorage.getItem("recent_scores");

// game options
var render_hitboxes = false;
var fullscreen = false;
var current_language = "en";
var time_scale = 1;

// shield
var shield_spawned = false;
var shield_timer = 0;

// multiplier
var multiplier = 1;
var multiplier_timer = 200;
var start_combo = false;

// sounds
var music_volume = 1;
var sound_effect_volume = 1;
var song_playing = false;
var current_song_name = "test";
var current_song = {};

// game loop
var fps = 60;
var start_time = Date.now();
var frame_duration = 1000 / 62;
var lag = 0;

// object positions/tracking
var max_position_count = 15;
var object_position_map = {};
var object_id_counter = 0;
