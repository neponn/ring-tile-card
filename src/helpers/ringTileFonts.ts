function addLink(id: string, href: string, rel: string, co: boolean = false) {
  if (!document.getElementById(id)) {
    var link = document.createElement("link");
    link.id = id;
    link.rel = rel;
    link.href = href;
    if (co) link.crossOrigin = "anonymous";
    document.head.appendChild(link);
  }
}

export function addFonts() {
  addLink("gf1", "https://fonts.googleapis.com", "preconnect");
  addLink("gf2", "https://fonts.gstatic.com", "preconnect");
  addLink(
    "gf3",
    "https://fonts.googleapis.com/css2?family=Geist:wght@100..900&display=swap",
    "stylesheet",
    true
  );
}
// all fonts
//     "https://fonts.googleapis.com/css2?family=Arimo:wght@400..700&family=Geist:wght@100..900&family=Inter:opsz,wght@14..32,100..900&family=Public+Sans:wght@100..900&display=swap",

// Fonts
// Arimo --
// Inter -
// Public Sans --
// Geist +