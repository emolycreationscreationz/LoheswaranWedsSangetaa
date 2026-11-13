/*
 * ============================================================
 *  WEDDING SETTINGS: edit this file to change the card's text
 * ============================================================
 *  Names, dates, events, venues, music and families all come from here.
 *  Anything marked [TBC] is a placeholder waiting for the client's details.
 */
window.WEDDING = {
  // --- Couple ---
  groom: {
    short: "Loheswaran",
    full: "Loheswaran",
    title: "",                                // e.g. "B.Eng." (shown small after the name)
    relation: "Son of",
    father: "Mr. Ganesan",
    mother: "Mrs. Lee Siew Chen",
    hometown: ""                              // optional, e.g. "Ipoh, Perak". Leave empty to hide.
  },
  bride: {
    short: "Sangetaa",
    full: "Sangetaa",
    title: "M.Ed.",
    relation: "Daughter of",
    father: "Late Mr. Subramaniam",
    mother: "Mrs. Meenachi",
    hometown: ""
  },

  quote: "“A Love Written by the Waves...”",

  // --- Dates ---
  dateShort: "13 · 12 · 2026",                 // shown on the opening doors
  countdownTo: "2026-12-13T19:31:00+08:00",    // reception, 7:31 PM Malaysia time (+08:00)

  // --- Hero background photo ---
  // Wide image for desktop (16:9, e.g. 1920x1080) and tall image for phones (9:16, e.g. 1080x1920).
  // Leave the left side (desktop) / top half (mobile) as soft empty haze for the names.
  // If the files are missing, the drawn beach-mandap scene is shown instead.
  heroImage: {
    desktop: "assets/hero/hero-desktop.webp",
    mobile: "assets/hero/hero-mobile.webp"
  },

  // --- Our Families ---
  familiesEyebrow: "Together with their families",
  familiesIntro: "With full hearts, we invite you to their wedding",

  // --- The Venue (page 3) ---
  venue: {
    label: "The Celebration Venue",
    name: "Gemersik Bayu Villa",
    area: "",                                           // [TBC] e.g. "Port Dickson, Negeri Sembilan". Empty = hidden.
    googleMaps: "https://share.google/rTHuXl7OQXmZ05BMh",
    waze: "https://waze.com/ul?q=Gemersik%20Bayu%20Villa&navigate=yes"
  },

  // --- Dress Code (page 4) ---
  dressCode: {
    title: "Wedding",
    script: "attire",
    video: "assets/dress/outfits.mp4",
    poster: "assets/dress/outfits-poster.jpg",
    couples: "assets/dress/couples.webp",
    palette: ["#3d4c35", "#9fae8b", "#ffeebf", "#f4cd6f"],
    message: "We'd love our guests to wear colours inspired by our palette",
    noteTitle: "A Gentle Note",
    note: "To complement our wedding palette, we kindly request our guests to refrain from wearing red or any shades of red"
  },

  // --- The Wedding ---
  // icon: "family" | "ring" | "mandap" | "sparkle" | "food"
  // Set showWedding: true once the ceremony details below are confirmed.
  showWedding: false,
  wedding: {
    subtitle: "Join us by the sea as the celebrations begin and two hearts become one.",
    city: "City",                                                   // [TBC]
    days: [
      {
        day: "23", month: "JAN", weekday: "Saturday",               // [TBC]
        events: [
          { name: "Groom Welcoming", time: "4:30 PM – 5:30 PM", icon: "family" },
          { name: "Engagement", time: "6:30 PM onwards", icon: "ring" }
        ]
      },
      {
        day: "24", month: "JAN", weekday: "Sunday",                 // [TBC]
        events: [
          { name: "Wedding Ceremony", time: "9:00 AM – 10:30 AM", icon: "mandap", highlight: true }
        ]
      }
    ],
    venue: {
      name: "Wedding Venue Name",                                   // [TBC]
      address: "Venue address, Postcode City",                      // [TBC]
      mapsUrl: "https://maps.google.com/"                           // [TBC]
    }
  },

  // --- The Reception (page 5). Set reception: null to hide this page. ---
  reception: {
    intro: ["With Full Hearts,", "We Invite You To Their Wedding Reception"],
    month: "December",
    weekday: "Sunday",
    day: "13",
    time: "7:31 PM",
    year: "2026",
    venue: ["Community Hall,", "Sungai Pelek"],
    googleMaps: "https://share.google/CHf3CGpm3InYVLLFY",
    waze: "https://waze.com/ul?q=Community%20Hall%20Sungai%20Pelek&navigate=yes"
  },

  // --- RSVP ---
  // apiUrl: the Google Apps Script Web App URL (see google-apps-script/Code.gs).
  // While empty, the form runs in demo mode (nothing is saved).
  rsvp: {
    apiUrl: "https://script.google.com/macros/s/AKfycbz9JprZLQ6ML8rE4-4p5Yhxqn5z_QRVJvXn4Xrmr069UDSnPWAF42WEFOyKJDPWBYJN/exec",
    eyebrow: "Kindly Respond",
    intro: "Please let us know if you can join us.",
    deadline: "RSVP by 30th November 2026",   // leave empty to hide
    maxPax: 10,
    thanks: "Your RSVP has been received. We can't wait to celebrate with you!"
  },

  // --- Closing (last page) ---
  closing: {
    photo: "assets/photos/couple.webp",
    message: ["We can't wait to celebrate", "our big day with you."],
    signoff: "With love,",
    names: "Loheswaran & Sangetaa"
  },

  // --- Background music (MP3 in assets/music/). Leave empty to hide the button. ---
  music: "",
  musicStart: 0
};
