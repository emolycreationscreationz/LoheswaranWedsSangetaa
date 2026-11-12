(function () {
  "use strict";
  var W = window.WEDDING || {};

  function get(path) {
    return path.split(".").reduce(function (o, k) { return o == null ? o : o[k]; }, W);
  }
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  // ---------- derived values ----------
  W.couple = (W.groom && W.groom.short) + " & " + (W.bride && W.bride.short);
  ["groom", "bride"].forEach(function (k) {
    var p = W[k];
    if (p) p.parentsHtml = esc(p.father) + ' <em>&amp;</em> ' + esc(p.mother);
  });

  if (W.reception) {
    var lines = function (arr) { return (arr || []).map(esc).join("<br>"); };
    W.reception.introHtml = lines(W.reception.intro);
    W.reception.venueHtml = lines(W.reception.venue);
  }

  if (W.closing) W.closing.messageHtml = (W.closing.message || []).map(esc).join("<br>");

  // ---------- bind text ----------
  document.querySelectorAll("[data-bind]").forEach(function (el) {
    var v = get(el.getAttribute("data-bind"));
    if (v != null && v !== "") el.textContent = v;
    else if (el.matches(".person__home, .person__title, .eyebrow, .venue-page__area, .dress__note, .dress__intro")) el.remove();
  });
  document.querySelectorAll("[data-bind-html]").forEach(function (el) {
    var v = get(el.getAttribute("data-bind-html"));
    if (v != null) el.innerHTML = v;
  });
  document.querySelectorAll("[data-src-bind]").forEach(function (el) {
    var v = get(el.getAttribute("data-src-bind"));
    if (v) el.src = v; else el.closest(".closing__frame").remove();
  });
  document.querySelectorAll("[data-href]").forEach(function (el) {
    var v = get(el.getAttribute("data-href"));
    if (v) el.href = v; else el.hidden = true;
  });

  // ---------- schedules ----------
  var ICONS = {
    family: '<svg viewBox="0 0 24 24"><circle cx="9" cy="8" r="3"/><circle cx="17" cy="9" r="2.4"/><path d="M3 19c0-3.3 2.7-5.5 6-5.5s6 2.2 6 5.5M14.5 14.2c.8-.4 1.6-.6 2.5-.6 2.5 0 4 1.7 4 4.4"/></svg>',
    ring: '<svg viewBox="0 0 24 24"><circle cx="12" cy="15" r="5.5"/><path d="M9.5 4h5l1.5 2.5-4 3-4-3z"/></svg>',
    mandap: '<svg viewBox="0 0 24 24"><path d="M3 9c3-3 6-4.5 9-5 3 .5 6 2 9 5zM5 9v11M19 9v11M9 9v11M15 9v11M3 20h18"/></svg>',
    sparkle: '<svg viewBox="0 0 24 24"><path d="M10 3l1.6 4.4L16 9l-4.4 1.6L10 15l-1.6-4.4L4 9l4.4-1.6zM18 13l.9 2.1L21 16l-2.1.9L18 19l-.9-2.1L15 16l2.1-.9z"/></svg>',
    food: '<svg viewBox="0 0 24 24"><path d="M4 14h16a8 8 0 0 1-16 0zM12 6v3M8 4.5v2M16 4.5v2"/></svg>'
  };
  var CLOCK = '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/></svg>';

  function renderSchedule(id, data) {
    var host = document.getElementById(id);
    if (!host || !data || !data.days) return;
    host.innerHTML = data.days.map(function (d) {
      var evs = d.events.map(function (e) {
        return '<div class="event' + (e.highlight ? " event--hl" : "") + '">' +
          '<span class="event__icon">' + (ICONS[e.icon] || ICONS.sparkle) + '</span>' +
          '<div><h4 class="event__name">' + esc(e.name) + '</h4>' +
          '<p class="event__time">' + CLOCK + esc(e.time) + '</p></div>' +
          (e.highlight ? '<span class="event__heart">♥</span>' : '') +
          '</div>';
      }).join("");
      return '<div class="day">' +
        '<div class="day__date"><b>' + esc(d.day) + '</b><span>' + esc(d.month) + '</span><small>' + esc(d.weekday) + '</small></div>' +
        '<div class="day__events">' + evs + '</div></div>';
    }).join("");
  }
  renderSchedule("weddingSchedule", W.wedding);
  if (!W.reception) { var r = document.getElementById("reception"); if (r) r.remove(); }

  // ---------- dress code ----------
  (function () {
    var dc = W.dressCode;
    var sec = document.getElementById("dress-code");
    if (!dc) { if (sec) sec.remove(); return; }
    var pal = document.getElementById("dressPalette");
    if (pal) {
      if (dc.palette && dc.palette.length) {
        pal.innerHTML = dc.palette.map(function (c) {
          return '<div class="swatch"><span class="swatch__dot" style="background:' + esc(c.hex) + '"></span><small>' + esc(c.name) + '</small></div>';
        }).join("");
      } else pal.remove();
    }
    var out = document.getElementById("dressOutfits");
    if (out) {
      out.innerHTML = (dc.outfits || []).map(function (o) {
        var pic = o.image
          ? '<img class="outfit__photo" src="' + esc(o.image) + '" alt="' + esc(o.label + ": " + o.title) + '" loading="lazy">'
          : '<img class="outfit__art" src="' + esc(o.art) + '" alt="" aria-hidden="true">';
        return '<article class="outfit reveal">' +
          '<div class="outfit__frame">' + pic + '</div>' +
          '<p class="eyebrow">' + esc(o.label) + '</p>' +
          '<h3 class="outfit__title">' + esc(o.title) + '</h3>' +
          '<p class="outfit__text">' + esc(o.text) + '</p></article>';
      }).join("");
    }
  })();

  // ---------- hero photo (falls back to the drawn scene if missing) ----------
  (function () {
    var img = W.heroImage || {};
    var hero = document.getElementById("top");
    var isDesk = window.matchMedia("(min-width: 900px)").matches;
    var src = (isDesk ? img.desktop : img.mobile) || img.desktop || img.mobile;
    if (!src || !hero) return;
    var probe = new Image();
    probe.onload = function () {
      var abs = function (u) { return 'url("' + new URL(u, location.href).href + '")'; };
      hero.style.setProperty("--hero-desktop", abs(img.desktop || img.mobile));
      hero.style.setProperty("--hero-mobile", abs(img.mobile || img.desktop));
      hero.classList.add("has-photo");
    };
    probe.src = src;
  })();

  // ---------- opening doors ----------
  var gate = document.getElementById("gate");
  var openBtn = document.getElementById("openGate");
  openBtn.addEventListener("click", function () {
    gate.classList.add("is-open");
    document.body.classList.remove("is-locked");
    playMusic();
    setTimeout(function () { gate.classList.add("is-gone"); }, 2600);
    setTimeout(function () { gate.remove(); }, 3600);
  });

  // ---------- music ----------
  var audio = document.getElementById("bgm");
  var musicBtn = document.getElementById("musicBtn");
  if (W.music) {
    audio.src = W.music;
    musicBtn.hidden = false;
    audio.addEventListener("error", function () { musicBtn.hidden = true; });
  }
  function playMusic() {
    if (!W.music) return;
    try {
      if (W.musicStart && audio.currentTime < W.musicStart) audio.currentTime = W.musicStart;
    } catch (e) {}
    var p = audio.play();
    if (p && p.catch) p.catch(function () {});
  }
  audio.addEventListener("play", function () { musicBtn.classList.add("is-playing"); });
  audio.addEventListener("pause", function () { musicBtn.classList.remove("is-playing"); });
  musicBtn.addEventListener("click", function () {
    if (audio.paused) playMusic(); else audio.pause();
  });

  // ---------- countdown ----------
  var target = new Date(W.countdownTo).getTime();
  var cd = {};
  document.querySelectorAll("[data-cd]").forEach(function (el) { cd[el.getAttribute("data-cd")] = el; });
  function pad(n) { return (n < 10 ? "0" : "") + n; }
  function tick() {
    var diff = Math.max(0, target - Date.now());
    var s = Math.floor(diff / 1000);
    cd.d.textContent = pad(Math.floor(s / 86400));
    cd.h.textContent = pad(Math.floor(s % 86400 / 3600));
    cd.m.textContent = pad(Math.floor(s % 3600 / 60));
    cd.s.textContent = pad(s % 60);
  }
  if (!isNaN(target)) { tick(); setInterval(tick, 1000); }

  // ---------- RSVP ----------
  (function () {
    var cfg = W.rsvp, form = document.getElementById("rsvpForm");
    if (!cfg || !form) { var sec = document.getElementById("rsvp"); if (sec && !cfg) sec.remove(); return; }
    var paxSel = document.getElementById("rsvpPax");
    var opts = '<option value="" disabled selected>Select</option>';
    for (var i = 1; i <= (cfg.maxPax || 10); i++) opts += '<option value="' + i + '">' + i + (i === 1 ? " person" : " people") + '</option>';
    paxSel.innerHTML = opts;

    var err = document.getElementById("rsvpError"), btn = document.getElementById("rsvpSubmit");
    var thanks = document.getElementById("rsvpThanks");
    function fail(msg) { err.textContent = msg; err.hidden = false; }
    form.addEventListener("input", function () { err.hidden = true; });
    form.addEventListener("change", function () { err.hidden = true; });

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      err.hidden = true;
      var f = form.elements;
      var data = {
        name: f.name.value.trim(),
        phone: f.phone.value.trim(),
        pax: f.pax.value,
        meal: (form.querySelector('input[name="meal"]:checked') || {}).value || "",
        wishes: f.wishes.value.trim()
      };
      if (!data.name) return fail("Please enter your name."), f.name.focus();
      if (!/^[+\d][\d\s-]{6,}$/.test(data.phone)) return fail("Please enter a valid phone number."), f.phone.focus();
      if (!data.pax) return fail("Please choose the number of pax."), f.pax.focus();
      if (!data.meal) return fail("Please choose a meal preference.");

      btn.disabled = true; btn.textContent = "Sending...";
      var done = function () {
        form.hidden = true; thanks.hidden = false; thanks.focus();
        var intro = document.querySelector(".rsvp__intro"); if (intro) intro.hidden = true;
      };
      if (!cfg.apiUrl) { setTimeout(done, 600); return; }   // demo mode
      fetch(cfg.apiUrl, { method: "POST", body: JSON.stringify(data) })
        .then(function (r) { return r.json(); })
        .then(function (res) {
          if (res && res.ok) done();
          else throw new Error(res && res.error);
        })
        .catch(function () {
          fail("Sorry, something went wrong. Please try again.");
          btn.disabled = false; btn.textContent = "Send RSVP";
        });
    });
  })();

  // ---------- closing petals ----------
  (function () {
    var host = document.querySelector(".closing__petals");
    if (!host || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    var colours = ["#f6e7c8", "#e9c98a", "#f3c6b8", "#fffaf0"];
    for (var i = 0; i < 16; i++) {
      var p = document.createElement("span");
      p.style.left = (Math.random() * 100) + "%";
      p.style.background = colours[i % colours.length];
      p.style.animationDuration = (9 + Math.random() * 8) + "s";
      p.style.animationDelay = (-Math.random() * 16) + "s";
      p.style.setProperty("--drift", (Math.random() * 80 - 40) + "px");
      p.style.setProperty("--size", (6 + Math.random() * 7) + "px");
      host.appendChild(p);
    }
  })();

  // ---------- closing sparkles ----------
  (function () {
    var host = document.querySelector(".closing__sparkles");
    if (!host) return;
    for (var i = 0; i < 18; i++) {
      var sp = document.createElement("span");
      sp.style.left = (4 + Math.random() * 92) + "%";
      sp.style.top = (3 + Math.random() * 94) + "%";
      sp.style.animationDelay = (-Math.random() * 4) + "s";
      sp.style.animationDuration = (2.6 + Math.random() * 2.4) + "s";
      sp.style.setProperty("--s", (6 + Math.random() * 10) + "px");
      host.appendChild(sp);
    }
  })();

  // ---------- reveal on scroll ----------
  var items = document.querySelectorAll(".reveal, .reveal-photo");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add("is-in"); });
  }
})();
