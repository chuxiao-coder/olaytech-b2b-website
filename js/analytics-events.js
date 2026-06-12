(function () {
  var id = window.OLAYTECH_GA4_ID || "";
  if (/^G-[A-Z0-9]+$/i.test(id)) {
    var s = document.createElement("script");
    s.async = true;
    s.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(id);
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function(){ dataLayer.push(arguments); };
    gtag("js", new Date());
    gtag("config", id);
  }

  function sendEvent(name, params) {
    if (typeof window.gtag === "function") {
      window.gtag("event", name, params || {});
    }
  }

  document.addEventListener("click", function (e) {
    var a = e.target.closest && e.target.closest("a");
    if (!a) return;
    var href = a.getAttribute("href") || "";
    var text = (a.textContent || "").trim().slice(0, 80);
    if (href.indexOf("contact.html") !== -1 || /quote|inquiry|contact/i.test(text)) {
      sendEvent("lead_click", { link_text: text, link_url: href, page_path: location.pathname });
    }
    if (href.indexOf("wa.me") !== -1 || /whatsapp/i.test(text)) {
      sendEvent("whatsapp_click", { link_text: text, link_url: href, page_path: location.pathname });
    }
    if (href.indexOf("mailto:") === 0) {
      sendEvent("email_click", { link_text: text, link_url: href, page_path: location.pathname });
    }
  });

  document.addEventListener("submit", function (e) {
    var form = e.target;
    if (!form || form.tagName !== "FORM") return;
    sendEvent("form_submit", { form_id: form.id || "", page_path: location.pathname });
  });
})();
