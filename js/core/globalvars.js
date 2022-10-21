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
var MAX_HP = 4;

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
var music_volume = localStorage.getItem("music_volume")
  ? JSON.parse(localStorage.getItem("music_volume"))
  : 5;
var sound_effect_volume = localStorage.getItem("sound_effect_volume")
  ? JSON.parse(localStorage.getItem("sound_effect_volume"))
  : 5;
var master_volume = localStorage.getItem("master_volume")
  ? JSON.parse(localStorage.getItem("master_volume"))
  : 5;
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
var stop_menu_nav = false;

let playerColorKey = "default";

const colorsToRemap = {
    lightBandanna: {
        r: 139,
        g: 109,
        b: 156
    },
    darkBandanna: {
        r: 73,
        g: 77,
        b: 126
    }
}
const colorPalettes = {
    default: {
        light: {
            r: 139,
            g: 109,
            b: 156
        },
        dark: {
            r: 73,
            g: 77,
            b: 126
        },
        trail: PINK
    },
    green: {
        light: {
            r: 0,
            g: 255,
            b: 0
        },
        dark: {
            r: 0,
            g: 120,
            b: 0
        },
        trail: "#00FF00"
    },
    yellow: {
        light: {
            r: 255,
            g: 255,
            b: 0
        },
        dark: {
            r: 120,
            g: 120,
            b: 0
        },
        trail: "#FFFF00"
    },
    red: {
        light: {
            r: 255,
            g: 0,
            b: 0
        },
        dark: {
            r: 120,
            g: 0,
            b: 0
        },
        trail: "#FF0000"
    },
}