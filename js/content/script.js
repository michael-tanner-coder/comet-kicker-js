const BEAT = {
  title: "",
  text: {
    en: "",
    es: "",
    fr: "",
    zh: "",
  },
  image: "",
  music: "",
  speed: 3,
};
const INTRO_SCRIPT = [
  {
    ...BEAT,
    text: {
      en: "Long ago, deep in the far reaches of space,",
      es: "",
      fr: "",
      zh: "",
    },
    image: "intro_1",
  },
  {
    ...BEAT,
    text: {
      en: "there lived a young boy known only as 'Kicker'.",
      es: "",
      fr: "",
      zh: "",
    },
    image: "intro_2",
    music: "intro_music_1"
  },
  {
    ...BEAT,
    text: {
      en: "In his youth, Kicker discovered he had immense, near-infinite power -",
      es: "",
      fr: "",
      zh: "",
    },
  },
  {
    ...BEAT,
    text: {
      en: "- power so great it could destroy the world around him -",
      es: "",
      fr: "",
      zh: "",
    },
    image: "intro_3",
  },
  {
    ...BEAT,
    text: {
      en: "- and cause great harm to the people he loved.",
      es: "",
      fr: "",
      zh: "",
    },
  },
  {
    ...BEAT,
    text: {
      en: "To keep his loved ones safe, Kicker isolated himself to train every day.",
      es: "",
      fr: "",
      zh: "",
    },
    image: "intro_4",
  },
  {
    ...BEAT,
    text: {
      en: "He hoped to control his powers before he could ever hurt anyone.",
      es: "",
      fr: "",
      zh: "",
    },
  },
  {
    ...BEAT,
    text: {
      en: "But in his absence, a dark force crept over their galaxy.",
      es: "",
      fr: "",
      zh: "",
    },
    speed: 2,
    image: "intro_5",
    music: "intro_music_2",
  },
  {
    ...BEAT,
    text: {
      en: "The Agents of the Cosmos - followers of the Big Comet - were determined to take control of the universe.",
      es: "",
      fr: "",
      zh: "",
    },
    image: "intro_6",
    music: "intro_music_2_2",
  },
  {
    ...BEAT,
    text: {
      en: "Now, Kicker must emerge from his training and defend his home.",
      es: "",
      fr: "",
      zh: "",
    },
    image: "intro_7",
  },
  {
    ...BEAT,
    text: {
      en: "But was his training enough?",
      es: "",
      fr: "",
      zh: "",
    },
    speed: 4,
    image: "intro_8",
  },
  {
    ...BEAT,
    text: {
      en: "Can he control his powers and save the galaxy?",
      es: "",
      fr: "",
      zh: "",
    },
    speed: 4,
  },
  {
    ...BEAT,
    text: {
      en: "Or will he only destroy himself and everyone around him?",
      es: "",
      fr: "",
      zh: "",
    },
    speed: 4,
  },
  {
    ...BEAT,
    text: {
      en: "Is he powerful enough to become … ",
      es: "",
      fr: "",
      zh: "",
      speed: 1,
    },
    image: "intro_9",
  },
];
const OUTRO_SCRIPT = [
  {
    ...BEAT,
    text: {
      en: "With the Big Comet defeated, Kicker saved his home.",
      es: "",
      fr: "",
      zh: "",
    },
    image: "outro_1",
  },
  {
    ...BEAT,
    text: {
      en: "Kicker returned to his family, fully in command of his powers.",
      es: "",
      fr: "",
      zh: "",
    },
    image: "outro_2",
  },
  {
    ...BEAT,
    text: {
      en: "He had proven he could control his powers and defeat any evil lurking deep in the galaxy.",
      es: "",
      fr: "",
      zh: "",
    },
    image: "intro_1",
  },
  {
    ...BEAT,
    text: {
      en: "He no longer had to be separated from his loved ones, no longer scared he'd hurt them all.",
      es: "",
      fr: "",
      zh: "",
    },
    image: "outro_2",
    speed: 2,
  },
  {
    ...BEAT,
    text: {
      en: "Finally ... he was safe.",
      es: "",
      fr: "",
      zh: "",
    },
    image: "outro_3",
    speed: 1,
  },
  {
    ...BEAT,
    text: {
      en: "- CREDITS - ",
      es: "",
      fr: "",
      zh: "",
    },
    image: "",
  },
  {
    ...BEAT,
    text: {
      en: "LEAD, CODE, ART, MUSIC, SCRIPT, & DESIGN                - Michael Monty - ",
      es: "",
      fr: "",
      zh: "",
    },
    image: "",
  },
  {
    ...BEAT,
    text: {
      en: "CODE, DESIGN FEEDBACK, TESTING - Patrick Moffett - ",
      es: "",
      fr: "",
      zh: "",
    },
    image: "",
  },
  {
    ...BEAT,
    text: {
      en: "CODE, DEV SUPPORT, ACCESSIBILITY                 - Mike DG - ",
      es: "",
      fr: "",
      zh: "",
    },
    image: "",
  },
  {
    ...BEAT,
    text: {
      en: "ADDITIONAL MUSIC, SOUND, & ART - Rodrigo Bonzerr Lopez - ",
      es: "",
      fr: "",
      zh: "",
    },
    image: "",
  },
  {
    ...BEAT,
    text: {
      en: 'CODE, VFX, GAMEPAD SUPPORT     - Christer "McFunkypants" Kaitila -',
      es: "",
      fr: "",
      zh: "",
    },
    image: "",
  },
  {
    ...BEAT,
    text: {
      en: "ADDITIONAL CODE & SOUND, MANDARIN TRANSLATION          - Jared Rigby -",
      es: "",
      fr: "",
      zh: "",
    },
    image: "",
  },
  {
    ...BEAT,
    text: {
      en: "MANDARIN TRANSLATION          - Tammy Tran -",
      es: "",
      fr: "",
      zh: "",
    },
    image: "",
  },
  {
    ...BEAT,
    text: {
      en: "- PLAYTESTERS -",
      es: "",
      fr: "",
      zh: "",
    },
    image: "",
  },
  {
    ...BEAT,
    text: {
      en: "Klaim (A. Joël Lamotte)",
      es: "",
      fr: "",
      zh: "",
    },
    image: "",
  },
  {
    ...BEAT,
    text: {
      en: "Cassidy Noble",
      es: "",
      fr: "",
      zh: "",
    },
    image: "",
  },
  {
    ...BEAT,
    text: {
      en: "Patrick J. Thompson",
      es: "",
      fr: "",
      zh: "",
    },
    image: "",
  },
  {
    ...BEAT,
    text: {
      en: "Mike DG",
      es: "",
      fr: "",
      zh: "",
    },
    image: "",
  },
  {
    ...BEAT,
    text: {
      en: "Patrick McKeown",
      es: "",
      fr: "",
      zh: "",
    },
    image: "",
  },
  {
    ...BEAT,
    text: {
      en: "Rodrigo Bonzerr Lopez",
      es: "",
      fr: "",
      zh: "",
    },
    image: "",
  },
  {
    ...BEAT,
    text: {
      en: "Rohit Narwal Kumar",
      es: "",
      fr: "",
      zh: "",
    },
    image: "",
  },
  {
    ...BEAT,
    text: {
      en: "Tor Andreas Johnsen",
      es: "",
      fr: "",
      zh: "",
    },
    image: "",
  },
  {
    ...BEAT,
    text: {
      en: "Thank you for playing!",
      es: "",
      fr: "",
      zh: "",
    },
    image: "",
  },
];
