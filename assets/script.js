"use strict";

/* =========================================
   SMARTLINK ONLINE CYBER SERVICES
   MAIN JAVASCRIPT
========================================= */

/* =========================================
   1. MOBILE NAVIGATION
========================================= */

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

function closeMenu() {
  if (!menuToggle || !navLinks) return;

  navLinks.classList.remove("open");
  menuToggle.classList.remove("is-open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Open navigation menu");

  document.body.classList.remove("menu-open");
}

function toggleMenu() {
  if (!menuToggle || !navLinks) return;

  const isOpen = navLinks.classList.toggle("open");

  menuToggle.classList.toggle("is-open", isOpen);
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute(
    "aria-label",
    isOpen ? "Close navigation menu" : "Open navigation menu",
  );

  document.body.classList.toggle("menu-open", isOpen);
}

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", toggleMenu);

  navLinks.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", closeMenu);
  });

  window.addEventListener("resize", function () {
    if (window.innerWidth > 900) closeMenu();
  });

  document.addEventListener("click", function (event) {
    const inside =
      navLinks.contains(event.target) || menuToggle.contains(event.target);

    if (!inside) closeMenu();
  });
}

/* =========================================
   2. ACTIVE NAVIGATION LINKS
========================================= */

if (navLinks) {
  const navItems = navLinks.querySelectorAll('a[href^="#"]');

  navItems.forEach(function (link) {
    link.addEventListener("click", function () {
      navItems.forEach(function (item) {
        item.classList.remove("active");
      });

      link.classList.add("active");
    });
  });
}

/* =========================================
   3. SMARTLINK SERVICE DATABASE
========================================= */

const serviceDetails = {
  kra: {
    title: "KRA Services",
    intro: "Choose the KRA service you need.",
    items: [
      "KRA PIN Registration",
      "KRA Returns Filing (Nil & Employed)",
      "Tax Compliance Certificate (TCC)",
      "Lost KRA PIN Retrieval",
      "KRA email change",
      "KRA Certificate Reprinting",
      "eTims",
    ],
  },

  ecitizen: {
    title: "eCitizen Services",
    intro: "Choose the eCitizen service you need.",
    items: [
      "Certificate of Good Conduct / Police Clearance cert.",
      "Passport Application",
      "Driving License Renewal / NTSA",
      "Business Name Registration",
      "Birth certificate, marriage certificate",
    ],
  },

  education: {
    title: "Education Services",
    intro: "Choose the education service you need.",
    items: [
      "KUCCPS Application & Revision",
      "HELB Application",
      "TSC Registration / TPAD",
      "KMTC / University Applications",
      "KNEC Results & Registration",
      "Teachers TSC & TSC No.",
    ],
  },

  jobs: {
    title: "Job Applications",
    intro: "Choose the job application assistance you need.",
    items: ["All Jobs application assistance"],
  },

  sha: {
    title: "SHA / NHIF & NSSF",
    intro: "Choose the SHA, NHIF or NSSF service you need.",
    items: [
      "SHA registration",
      "Adding Dependants",
      "SHA/SHIF Services",
      "NSSF Registration & Statements",
    ],
  },

  other: {
    title: "Other Online Services",
    intro: "Choose the other online service you need.",
    items: [
      "Students attachment Insurance cover",
      "Web development and Graphics design",
      "Project proposals",
      "Professional CV & Cover letters",
      "Logo Design",
      "Businesses cards",
      "Posters, flyers",
      "All Video and photo services",
      "Invitation cards (wedding, engagement etc.)",
    ],
  },
};

/* =========================================
   4. SERVICE POPUP ELEMENTS
========================================= */

const serviceModal = document.getElementById("serviceModal");
const serviceModalTitle = document.getElementById("serviceModalTitle");
const serviceModalIntro = document.getElementById("serviceModalIntro");
const serviceSelect = document.getElementById("serviceSelect");
const serviceSelectionHint = document.getElementById("serviceSelectionHint");
const serviceWhatsApp = document.getElementById("serviceWhatsApp");
const closeServiceButton = document.getElementById("closeServiceModal");

let previousServiceFocus = null;
let activeServiceCategory = "";

/* =========================================
   5. OPEN SERVICE POPUP
========================================= */

function openServiceModal(category) {
  if (!serviceModal || !serviceSelect) return;

  const details = serviceDetails[category];

  if (!details) return;

  previousServiceFocus = document.activeElement;
  activeServiceCategory = details.title;

  closeMenu();

  serviceModalTitle.textContent = details.title;
  serviceModalIntro.textContent = details.intro;

  // Reset dropdown
  serviceSelect.innerHTML = '<option value="">-- Choose a service --</option>';

  // Add services to dropdown
  details.items.forEach(function (service) {
    const option = document.createElement("option");

    option.value = service;
    option.textContent = service;

    serviceSelect.appendChild(option);
  });

  // Reset WhatsApp button
  updateServiceWhatsApp();

  serviceModal.classList.add("on");
  serviceModal.setAttribute("aria-hidden", "false");

  document.body.style.overflow = "hidden";

  serviceSelect.focus();
}

/* =========================================
   6. UPDATE WHATSAPP MESSAGE
========================================= */

function updateServiceWhatsApp() {
  if (!serviceWhatsApp || !serviceSelect) return;

  const selectedService = serviceSelect.value;

  if (!selectedService) {
    serviceWhatsApp.href = "#";

    serviceWhatsApp.classList.add("is-disabled");

    serviceWhatsApp.setAttribute("aria-disabled", "true");

    serviceSelectionHint.textContent =
      "Choose a service to continue to WhatsApp.";

    return;
  }

  const message =
    "Hello Smartlink Online Cyber Services,\n\n" +
    "I would like assistance with the following service:\n\n" +
    "Category: " +
    activeServiceCategory +
    "\n" +
    "Selected Service: " +
    selectedService +
    "\n\n" +
    "Please share the requirements and charges.\n\n" +
    "Thank you.";

  const whatsappURL =
    "https://wa.me/254705298205?text=" + encodeURIComponent(message);

  serviceWhatsApp.href = whatsappURL;

  serviceWhatsApp.classList.remove("is-disabled");

  serviceWhatsApp.setAttribute("aria-disabled", "false");

  serviceSelectionHint.textContent =
    "Selected: " + selectedService + ". Click below to contact Smartlink.";
}

/* =========================================
   7. CLOSE SERVICE POPUP
========================================= */

function closeServiceModal() {
  if (!serviceModal) return;

  serviceModal.classList.remove("on");

  serviceModal.setAttribute("aria-hidden", "true");

  document.body.style.overflow = "";

  if (
    previousServiceFocus &&
    typeof previousServiceFocus.focus === "function"
  ) {
    previousServiceFocus.focus();
  }
}

if (serviceSelect) {
  serviceSelect.addEventListener("change", updateServiceWhatsApp);
}

if (serviceWhatsApp) {
  serviceWhatsApp.addEventListener("click", function (event) {
    if (!serviceSelect || !serviceSelect.value) {
      event.preventDefault();

      serviceSelectionHint.textContent = "Please select a service first.";
    }
  });
}

if (closeServiceButton) {
  closeServiceButton.addEventListener("click", closeServiceModal);
}

if (serviceModal) {
  serviceModal.addEventListener("click", function (event) {
    if (event.target === serviceModal) {
      closeServiceModal();
    }
  });
}

/* =========================================
   8. MAKE SERVICE CARDS CLICKABLE
========================================= */

document.querySelectorAll("#services [data-service]").forEach(function (card) {
  function activateCard() {
    const category = card.getAttribute("data-service");

    openServiceModal(category);
  }

  card.addEventListener("click", activateCard);

  card.addEventListener("keydown", function (event) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();

      activateCard();
    }
  });
});

/* CLOSE POPUPS WITH ESCAPE */

document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    if (serviceModal && serviceModal.classList.contains("on")) {
      closeServiceModal();
    }

    if (m && m.classList.contains("on")) {
      closeM();
    }
  }
});

/* =========================================
   9. DEMONSTRATION ACCOUNT SYSTEM
========================================= */

var S = {
  u: null,
  users: [],
  books: [],
};

try {
  var savedData = JSON.parse(localStorage.getItem("sl") || "null");

  if (savedData && typeof savedData === "object") {
    S.u = savedData.u || null;

    S.users = Array.isArray(savedData.users) ? savedData.users : [];

    S.books = Array.isArray(savedData.books) ? savedData.books : [];
  }
} catch (error) {
  console.warn("Saved website data could not be loaded.");
}

function save() {
  try {
    localStorage.setItem("sl", JSON.stringify(S));
  } catch (error) {
    console.warn("Website data could not be saved.");
  }
}

var m = document.getElementById("m");
var box = document.getElementById("box");

var svcs = [
  "KRA Services",
  "eCitizen Services",
  "Education Services",
  "Job Applications",
  "SHA / NHIF & NSSF",
  "Other Online Services",
];

function open_(html) {
  if (!m || !box) return;

  box.innerHTML =
    '<button class="x" type="button" onclick="closeM()" aria-label="Close">&times;</button>' +
    html;

  m.classList.add("on");

  m.setAttribute("aria-hidden", "false");

  closeMenu();

  document.body.style.overflow = "hidden";

  var firstInput = box.querySelector("input, select, textarea, button");

  if (firstInput) firstInput.focus();
}

function closeM() {
  if (!m) return;

  m.classList.remove("on");

  m.setAttribute("aria-hidden", "true");

  document.body.style.overflow = "";
}

if (m) {
  m.addEventListener("click", function (event) {
    if (event.target === m) closeM();
  });
}

function escapeHTML(value) {
  return String(value == null ? "" : value).replace(
    /[&<>"']/g,
    function (char) {
      return {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      }[char];
    },
  );
}

function v(id) {
  var element = document.getElementById(id);

  return element ? element.value.trim() : "";
}

function g(message) {
  var element = document.getElementById("g");

  if (element) element.textContent = message;
}

/* =========================================
   10. REGISTER
========================================= */

function reg() {
  open_(
    "<h3>Create account</h3>" +
      '<label for="n">Full name</label>' +
      '<input id="n" autocomplete="name" required>' +
      '<label for="e">Email</label>' +
      '<input id="e" type="email" autocomplete="email" required>' +
      '<label for="p">Password</label>' +
      '<input id="p" type="password" autocomplete="new-password" minlength="6" required>' +
      '<div class="msg" id="g" role="status"></div>' +
      '<div class="row">' +
      '<button class="btn o" type="button" onclick="doReg()">Register</button>' +
      '<button class="btn" type="button" onclick="login()">I have an account</button>' +
      "</div>",
  );
}

function doReg() {
  var name = v("n");
  var email = v("e").toLowerCase();
  var password = v("p");

  if (!name || !email || password.length < 6) {
    g("Fill all fields. Password must have at least 6 characters.");

    return;
  }

  var exists = S.users.some(function (user) {
    return user.e.toLowerCase() === email;
  });

  if (exists) {
    g("This email is already registered.");

    return;
  }

  S.users.push({
    n: name,
    e: email,
    p: password,
  });

  S.u = email;

  save();

  dash();
}

/* =========================================
   11. LOGIN
========================================= */

function login() {
  open_(
    "<h3>Log in</h3>" +
      '<label for="e">Email</label>' +
      '<input id="e" type="email" autocomplete="email" required>' +
      '<label for="p">Password</label>' +
      '<input id="p" type="password" autocomplete="current-password" required>' +
      '<div class="msg" id="g" role="status"></div>' +
      '<div class="row">' +
      '<button class="btn o" type="button" onclick="doLogin()">Log in</button>' +
      '<button class="btn" type="button" onclick="reg()">Register</button>' +
      "</div>",
  );
}

function doLogin() {
  var email = v("e").toLowerCase();
  var password = v("p");

  var user = S.users.find(function (item) {
    return item.e.toLowerCase() === email && item.p === password;
  });

  if (!user) {
    g("Incorrect email or password.");

    return;
  }

  S.u = user.e;

  save();

  dash();
}

/* =========================================
   12. CUSTOMER DASHBOARD
========================================= */

function dash() {
  var user = S.users.find(function (item) {
    return item.e === S.u;
  });

  if (!user) {
    login();

    return;
  }

  var mine = S.books.filter(function (booking) {
    return booking.e === user.e;
  });

  var options = svcs
    .map(function (service) {
      return "<option>" + escapeHTML(service) + "</option>";
    })
    .join("");

  var html =
    "<h3>Hi, " +
    escapeHTML(user.n.split(" ")[0]) +
    "</h3>" +
    '<p style="font-size:14px;color:var(--muted)">Book a service</p>' +
    '<label for="s">Service</label>' +
    '<select id="s">' +
    options +
    "</select>" +
    '<label for="d">Date</label>' +
    '<input id="d" type="date" min="' +
    new Date().toISOString().slice(0, 10) +
    '">' +
    '<label for="t">Time</label>' +
    '<input id="t" type="time">' +
    '<label for="o">Notes</label>' +
    '<textarea id="o" rows="2" placeholder="Additional details"></textarea>' +
    '<div class="msg" id="g" role="status"></div>' +
    '<div class="row">' +
    '<button class="btn o" type="button" onclick="book()">Book</button>' +
    '<button class="btn" type="button" onclick="out()">Log out</button>' +
    "</div>" +
    '<h3 style="font-size:18px;margin-top:22px">My bookings</h3>';

  if (mine.length) {
    html += mine
      .map(function (booking) {
        return (
          '<div class="bk">' +
          "<span>" +
          escapeHTML(booking.s) +
          "<br><small>" +
          escapeHTML(booking.d) +
          " " +
          escapeHTML(booking.t) +
          "</small></span>" +
          "<span>" +
          escapeHTML(booking.status || "Pending") +
          "</span></div>"
        );
      })
      .join("");
  } else {
    html += '<p style="font-size:13px;color:var(--muted)">No bookings yet.</p>';
  }

  open_(html);
}

/* =========================================
   13. SAVE BOOKING
========================================= */

function book() {
  var service = v("s");
  var date = v("d");
  var time = v("t");

  if (!service || !date || !time) {
    g("Choose a service, date and time.");

    return;
  }

  var selectedDate = new Date(date + "T00:00:00");

  var today = new Date();

  today.setHours(0, 0, 0, 0);

  if (selectedDate < today) {
    g("Please choose today or a future date.");

    return;
  }

  S.books.push({
    e: S.u,
    s: service,
    d: date,
    t: time,
    o: v("o"),
    status: "Pending",
  });

  save();

  dash();
}

/* =========================================
   14. LOGOUT
========================================= */

function out() {
  S.u = null;

  save();

  closeM();
}

/* =========================================
   15. EXISTING BOOKING BUTTONS
========================================= */

["book1", "book2", "book3", "book4"].forEach(function (id) {
  var button = document.getElementById(id);

  if (button) {
    button.addEventListener("click", entry);
  }
});

function entry(event) {
  if (event) event.preventDefault();

  S.u ? dash() : reg();
}

/* =========================================
   16. FOOTER ACCOUNT LINKS
========================================= */

var f1 = document.getElementById("f1");
var f2 = document.getElementById("f2");
var f3 = document.getElementById("f3");

if (f1) {
  f1.addEventListener("click", function (event) {
    event.preventDefault();

    reg();
  });
}

if (f2) {
  f2.addEventListener("click", function (event) {
    event.preventDefault();

    login();
  });
}

if (f3) {
  f3.addEventListener("click", function (event) {
    event.preventDefault();

    open_(
      "<h3>Admin Information</h3>" +
        '<p style="font-size:14px;color:var(--muted)">A secure admin dashboard requires a server-side backend and database. It is not available at the moment.</p>',
    );
  });
}

/* =========================================
   17. DARK AND LIGHT MODE
========================================= */

var root = document.documentElement;
var themeButton = document.getElementById("theme");

if (themeButton) {
  themeButton.addEventListener("click", function () {
    var darkNow = root.getAttribute("data-theme") === "dark";

    var newTheme = darkNow ? "light" : "dark";

    root.setAttribute("data-theme", newTheme);

    try {
      localStorage.setItem("sl-theme", newTheme);
    } catch (error) {
      console.warn("Theme preference could not be saved.");
    }
  });
}

try {
  var savedTheme = localStorage.getItem("sl-theme");

  if (savedTheme === "dark" || savedTheme === "light") {
    root.setAttribute("data-theme", savedTheme);
  }
} catch (error) {
  console.warn("Saved theme could not be loaded.");
}

/* =========================================
   18. WHATSAPP LINKS
========================================= */

document
  .querySelectorAll(".wa, .whatsapp-nav, .wa-chat")
  .forEach(function (link) {
    link.target = "_blank";
    link.rel = "noopener noreferrer";
  });

/* =========================================
   19. AUTOMATIC FOOTER YEAR
========================================= */

var yearElement = document.getElementById("year");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

/* =========================================
   20. TESTIMONIAL AUTO HORIZONTAL SLIDER
========================================= */

(function () {
  var track = document.getElementById("testimonialTrack");
  var prevBtn = document.getElementById("testimonialPrev");
  var nextBtn = document.getElementById("testimonialNext");

  if (!track) return;

  var autoTimer = null;
  var isPaused = false;

  function cardStep() {
    var firstCard = track.querySelector(".testimonial");
    if (!firstCard) return track.clientWidth;

    var gap = parseFloat(getComputedStyle(track).gap) || 0;
    return firstCard.getBoundingClientRect().width + gap;
  }

  function goNext() {
    var maxScroll = track.scrollWidth - track.clientWidth - 2;

    if (track.scrollLeft >= maxScroll) {
      track.scrollTo({ left: 0, behavior: "smooth" });
    } else {
      track.scrollBy({ left: cardStep(), behavior: "smooth" });
    }
  }

  function goPrev() {
    if (track.scrollLeft <= 2) {
      track.scrollTo({ left: track.scrollWidth, behavior: "smooth" });
    } else {
      track.scrollBy({ left: -cardStep(), behavior: "smooth" });
    }
  }

  function startAuto() {
    stopAuto();
    autoTimer = setInterval(function () {
      if (!isPaused) goNext();
    }, 6000);
  }

  function stopAuto() {
    if (autoTimer) {
      clearInterval(autoTimer);
      autoTimer = null;
    }
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", function () {
      goNext();
      startAuto();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", function () {
      goPrev();
      startAuto();
    });
  }

  /* Pause on hover / touch for better UX */
  track.addEventListener("mouseenter", function () {
    isPaused = true;
  });

  track.addEventListener("mouseleave", function () {
    isPaused = false;
  });

  track.addEventListener(
    "touchstart",
    function () {
      isPaused = true;
    },
    { passive: true },
  );

  track.addEventListener(
    "touchend",
    function () {
      isPaused = false;
    },
    { passive: true },
  );

  /* Pause when the tab is hidden, resume when visible */
  document.addEventListener("visibilitychange", function () {
    if (document.hidden) {
      stopAuto();
    } else {
      startAuto();
    }
  });

  /* Respect reduced-motion preference */
  var reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  if (!reduceMotion) {
    startAuto();
  }
})();

/* =========================================
   END OF SMARTLINK JAVASCRIPT
========================================= */
