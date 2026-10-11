window.PORTFOLIO_DATA = {
  genres: {
    "sound-art": { label: "Sound Art/Media Art", works: ["self-amplifier", "self-listening-circuit", "no-name-sound"] },
    "music": { label: "Music", works: [], status: "掲載準備中" },
    "live-set": { label: "Live Set", works: ["live-set"] },
    "instrument-digital": { label: "Instrument(Digital)", works: [], status: "掲載準備中" },
    "instrument-analog": { label: "Instrument(Analog)", works: [], status: "掲載準備中" },
    "plugin": { label: "Plugin", works: [], status: "掲載準備中" },
    "design": { label: "Design", works: [], status: "掲載準備中" },
    // Keep the original URL working for existing bookmarks; it is not in the navigation.
    "synth": { label: "Instrument(Analog)", works: [], status: "掲載準備中" }
  },

  works: {
    "self-amplifier": {
      title: "自己増幅器",
      genre: "sound-art",
      image: "assets/works/self-amplifier.jpg"
    },
    "self-listening-circuit": {
      title: "自己聴取回路",
      genre: "sound-art",
      image: "assets/works/self-listening-circuit.jpg"
    },
    "no-name-sound": {
      title: "NO NAME SOUND",
      genre: "sound-art",
      image: "assets/works/no-name-sound.jpg"
    },
    "live-set": {
      title: "Live Set",
      genre: "live-set",
      externalUrl: "https://youtu.be/gomq4a4tauA"
    }
  }
};
