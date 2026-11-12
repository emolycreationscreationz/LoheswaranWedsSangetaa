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
  dateShort: "DD · MM · 2027",                 // [TBC] shown on the opening doors
  countdownTo: "2027-01-24T09:00:00+08:00",    // [TBC] muhurtham start, Malaysia time (+08:00)

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

  // --- The Wedding ---
  // icon: "family" | "ring" | "mandap" | "sparkle" | "food"
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

  // --- The Reception (set reception: null to hide this section) ---
  reception: {
    title: "The Reception",
    subtitle: "An evening of joy, dinner and dancing as we celebrate our new beginning.",
    city: "City",                                                   // [TBC]
    days: [
      {
        day: "30", month: "JAN", weekday: "Saturday",               // [TBC]
        events: [
          { name: "Evening Celebration", time: "7:00 PM onwards", icon: "sparkle" }
        ]
      }
    ],
    venue: {
      name: "Reception Venue Name",                                 // [TBC]
      address: "Venue address, Postcode City",                      // [TBC]
      mapsUrl: "https://maps.google.com/"                           // [TBC]
    }
  },

  thankYou: "Your presence and blessings will make our celebration complete. We would be honoured to share this beautiful beginning with you.",

  // --- Background music (MP3 in assets/music/). Leave empty to hide the button. ---
  music: "",
  musicStart: 0
};
