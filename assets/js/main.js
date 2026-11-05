/* YPF Bombal — arma el carrusel de reseñas a partir de resenas.js.
   No hace falta editar este archivo para cambiar reseñas. */
(function () {
  "use strict";

  var MAPS_URL = "https://maps.app.goo.gl/xTmYdKANFXLwx7mq9";
  var track = document.getElementById("reviews-track");
  var dotsBox = document.getElementById("reviews-dots");
  var prevBtn = document.querySelector('.carousel__btn[data-dir="-1"]');
  var nextBtn = document.querySelector('.carousel__btn[data-dir="1"]');
  var data = Array.isArray(window.RESENAS) ? window.RESENAS : [];

  var STAR = '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="m12 2.8 2.8 5.8 6.4.9-4.6 4.5 1.1 6.3L12 17.3l-5.7 3 1.1-6.3-4.6-4.5 6.4-.9z"/></svg>';
  var PIN = '<svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path fill="currentColor" d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5Z"/></svg>';

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function placeholderCard(i, total) {
    return (
      '<li class="card card--placeholder" aria-label="Espacio reservado ' + (i + 1) + " de " + total + '">' +
      '<span class="card__tag">Espacio reservado</span>' +
      "<p>Acá se va a mostrar una reseña real de Google Maps.</p>" +
      "</li>"
    );
  }

  function reviewCard(r, i, total) {
    var name = (r.nombre || "").trim() || "Cliente de Google Maps";
    var stars = Math.max(0, Math.min(5, Math.round(Number(r.estrellas) || 0)));
    var starsHtml = "";
    for (var s = 1; s <= 5; s++) starsHtml += STAR.replace("<svg", '<svg class="' + (s <= stars ? "on" : "off") + '"');
    var link = r.enlace && /^https?:\/\//.test(r.enlace) ? r.enlace : MAPS_URL;

    return (
      '<li class="card" aria-label="Reseña ' + (i + 1) + " de " + total + '">' +
      '<div class="card__top">' +
      '<span class="card__avatar" aria-hidden="true">' + esc(name.charAt(0)) + "</span>" +
      '<div class="card__who"><p class="card__name">' + esc(name) + "</p>" +
      (r.fecha ? '<p class="card__date">' + esc(r.fecha) + "</p>" : "") +
      "</div></div>" +
      (stars ? '<div class="stars" role="img" aria-label="' + stars + ' de 5 estrellas">' + starsHtml + "</div>" : "") +
      '<div class="card__body"><p class="card__text">' + esc(r.comentario) + "</p></div>" +
      '<a class="card__source" href="' + esc(link) + '" target="_blank" rel="noopener">' + PIN +
      " Reseña publicada en Google Maps</a>" +
      "</li>"
    );
  }

  // Render
  var total = data.length;
  track.innerHTML = data
    .map(function (r, i) { return r && r.ejemplo ? placeholderCard(i, total) : reviewCard(r || {}, i, total); })
    .join("");

  // "Ver más" solo si el texto quedó cortado
  Array.prototype.forEach.call(track.querySelectorAll(".card__text"), function (p) {
    if (p.scrollHeight - p.clientHeight > 4) {
      var b = document.createElement("button");
      b.type = "button";
      b.className = "card__more";
      b.textContent = "Ver más";
      b.setAttribute("aria-expanded", "false");
      b.addEventListener("click", function () {
        var card = p.closest(".card");
        var open = card.classList.toggle("is-open");
        b.textContent = open ? "Ver menos" : "Ver más";
        b.setAttribute("aria-expanded", String(open));
      });
      p.parentNode.appendChild(b);
    }
  });

  // Puntos e indicador
  var cards = track.children;
  dotsBox.innerHTML = Array.prototype.map.call(cards, function () { return "<span></span>"; }).join("");
  var dots = dotsBox.children;

  function current() {
    var center = track.scrollLeft + track.clientWidth / 2, best = 0, dist = Infinity;
    for (var i = 0; i < cards.length; i++) {
      var c = cards[i], mid = c.offsetLeft + c.offsetWidth / 2, d = Math.abs(mid - center);
      if (d < dist) { dist = d; best = i; }
    }
    return best;
  }
  function update() {
    var idx = current();
    for (var i = 0; i < dots.length; i++) dots[i].classList.toggle("is-active", i === idx);
    var max = track.scrollWidth - track.clientWidth - 2;
    prevBtn.disabled = track.scrollLeft <= 2;
    nextBtn.disabled = track.scrollLeft >= max;
  }
  function go(dir) {
    var target = cards[Math.max(0, Math.min(cards.length - 1, current() + dir))];
    if (!target) return;
    track.scrollTo({ left: target.offsetLeft - (track.clientWidth - target.offsetWidth) / 2, behavior: "smooth" });
  }

  prevBtn.addEventListener("click", function () { go(-1); });
  nextBtn.addEventListener("click", function () { go(1); });
  track.addEventListener("keydown", function (e) {
    if (e.key === "ArrowRight") { e.preventDefault(); go(1); }
    if (e.key === "ArrowLeft") { e.preventDefault(); go(-1); }
  });
  var raf;
  track.addEventListener("scroll", function () { cancelAnimationFrame(raf); raf = requestAnimationFrame(update); }, { passive: true });
  window.addEventListener("resize", update);
  update();

  // Ocultar controles si no hay nada que deslizar
  if (cards.length < 2) document.querySelector(".carousel__controls").hidden = true;
})();
