// GLOBAL VARIABLES
// dev mode
var debug_mode = false;

// spawning
var spawn_timer = MAX_SPAWN_TIMER;
var collect_spawn_timer = MAX_COLLECT_SPAWN_TIMER;
var platform_spawn_timer = MAX_PLATFORM_SPAWN_TIMER;
var start_platform_spawn_timer = false;

// game state
var game_over = false;
var game_state = STATES.INTRO;

// scores
var score = 0;
var enemy_point_value = 10;
var high_scores = window.localStorage.getItem("high_scores");
var max_high_score_list_length = 5;
var recent_scores = window.localStorage.getItem("recent_scores");
var max_recent_score_list_length = 10;

// game options
var render_hitboxes = false;
var fullscreen = false;

// search browser preferences for the first language that matches one of the game's accepted languages
let preferred_language = navigator.languages.find((lang_pref) =>
  ACCEPTED_LANGUAGES.find((lang) => lang === lang_pref)
);

// default to english if no preferred language is available
var current_language = "en";

// if preferred_language is available, set our current_language to the user's preference
if (preferred_language) {
  current_language = preferred_language;
}

var time_scale = 1;
var game_speed = 1;
var screen_shake_on = true;
var invincible_mode = false;

// shield
var shield_spawned = false;
var shield_timer = 0;

// multiplier
var multiplier = 1;
var multiplier_timer = 200;
var start_combo = false;

// sounds
var music_volume = localStorage.getItem('music_volume') ? JSON.parse(localStorage.getItem('music_volume')) : 5;
var sound_effect_volume = localStorage.getItem('sound_effect_volume') ? JSON.parse(localStorage.getItem('sound_effect_volume')) : 5;
var master_volume = localStorage.getItem('master_volume') ? JSON.parse(localStorage.getItem('master_volume')) : 5;
var song_playing = false;
var current_song_name = "title_music";
var current_song = {};

// game loop
var fps = 60;
var start_time = Date.now();
var frame_duration = 1000 / 62;
var lag = 0;
var dt = 0;
var current_time = Date.now();
var game_timer = 0;

// object positions/tracking
var max_position_count = 15;
var object_position_map = {};
var object_id_counter = 0;

// menus
stop_menu_nav = false;
