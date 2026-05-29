(() => {
  const sections = [
    {
      title: "Co musi kalkulacka umet",
      items: [
        "Sbirat cisla z tlacitek a klavesnice.",
        "Ukladat stav: prvni cislo, operator, druhe cislo, vysledek.",
        "Pocitat +, -, *, / a resit deleni nulou.",
        "Zvladnout mazani, reset a opakovane pocitani.",
        "Zobrazit aktualni vstup a historii vypoctu.",
      ],
    },
    {
      title: "Zakladni JavaScript, ktereho budes potrebovat",
      items: [
        "`const` a `let` pro promenne.",
        "Typy: `number`, `string`, `boolean`, `null`, `undefined`.",
        "Funkce pro logiku vypoctu.",
        "Podminky `if/else` a `switch`.",
        "Pole a objekty pro stav aplikace.",
        "Prace s DOM: `document.querySelector`, `textContent`, `classList`.",
        "Eventy: `click`, `keydown`, `input`.",
        "Asynchronni JS zatim neni pro kalkulacku nutny, ale pozdeji se hodi.",
      ],
    },
    {
      title: "Jak premyslet o aplikaci",
      items: [
        "Kalkulacka je maly stavovy stroj.",
        "Kazdy klik meni stav a prekresli displej.",
        "Logiku pocitani oddel od HTML a stylu.",
        "Jedna funkce by mela delat jednu vec: zapis cisla, nastav operator, spocitej vysledek.",
      ],
    },
    {
      title: "Stav, ktery je dobre mit",
      items: [
        "`displayValue` - co je zrovna videt na displeji.",
        "`firstValue` - prvni cislo.",
        "`operator` - plus, minus, krat, deleno.",
        "`waitingForSecondValue` - cekani na dalsi cislo.",
        "`history` - co bylo zadano pred vysledkem.",
      ],
    },
    {
      title: "Zakladni logika vypoctu",
      items: [
        "Kdyz uzivatel klikne na cislo, pridav ho na displej.",
        "Kdyz klikne na operator, uloz aktualni cislo a operator.",
        "Kdyz klikne na `=`, spocitej `firstValue operator secondValue`.",
        "Kdyz je operator ` / ` a druhe cislo je 0, vrat chybu.",
      ],
    },
    {
      title: "Minimalni priklad logiky",
      code: `const calculate = (a, operator, b) => {
  switch (operator) {
    case "+": return a + b;
    case "-": return a - b;
    case "*": return a * b;
    case "/": return b === 0 ? "Nelze delit nulou" : a / b;
    default: return b;
  }
};`,
    },
    {
      title: "DOM, ktere budes potrebovat",
      items: [
        "Vyber prvky: `document.querySelector('.display')`.",
        "Zmen text: `element.textContent = value`.",
        "Pridavej event listenery na tlacitka.",
        "Pouzij `data-*` atributy pro hodnoty tlacitek.",
      ],
    },
    {
      title: "Prace s tlacitky",
      items: [
        "Ciselna tlacitka: `0-9`.",
        "Operatorova tlacitka: `+ - * /`.",
        "Specialni tlacitka: `=` `C` `.` `+/-` `%`.",
        "Kazde tlacitko by melo mit jasnou roli.",
      ],
    },
    {
      title: "Osetreni chyb a okrajovych stavu",
      items: [
        "Dvojity operator po sobe nenechavat bez pravidel.",
        "Spravne resit desetinna carka nebo tecku.",
        "Po vysledku rozhodnout, zda se ma dale pocitat s vysledkem.",
        "Po `C` vse vrate na start.",
      ],
    },
    {
      title: "Keyboard support",
      items: [
        "Sleduj `keydown`.",
        "Mapuj klavesy `0-9`, `+`, `-`, `*`, `/`, `Enter`, `Backspace`, `Escape`.",
        "Klavesnice je dulezita pro pohodli i testovani.",
      ],
    },
    {
      title: "Co se naucit navic",
      items: [
        "Funkce jako `parseFloat`, `Number.isNaN` a `toString`.",
        "Formatovani cisel s `Intl.NumberFormat`.",
        "Validace vstupu.",
        "Refaktoring: oddelit UI od logiky.",
        "Zakladni testy logiky bez browseru.",
      ],
    },
    {
      title: "Typicka struktura projektu",
      code: `index.html
styles.css
test.js

// v JS:
// 1. najit DOM prvky
// 2. drzet stav
// 3. reagovat na kliky a klavesnici
// 4. renderovat displej`,
    },
    {
      title: "Postup, kdyz budes kalkulacku opravdu psat",
      items: [
        "1. Udelej HTML displej a tlacitka.",
        "2. Napoj kliky na jedinecnou funkci handleru.",
        "3. Pridej stavovy objekt.",
        "4. Napis calculate funkci.",
        "5. Pridej clear, backspace a keyboard support.",
        "6. Otestuj vsechny kombinace.",
      ],
    },
  ];

  const pageStyle = `
    :root {
      color-scheme: light;
      --bg: #f6f7fb;
      --card: #ffffff;
      --text: #1f2937;
      --muted: #4b5563;
      --accent: #2563eb;
      --border: #dbe2ea;
      --code: #0f172a;
    }
    * { box-sizing: border-box; }
    body {
      margin: 0;
      font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, sans-serif;
      background: linear-gradient(180deg, #eef4ff 0%, var(--bg) 30%, #eef2ff 100%);
      color: var(--text);
      line-height: 1.6;
    }
    main {
      max-width: 1100px;
      margin: 0 auto;
      padding: 32px 20px 56px;
    }
    .hero {
      background: rgba(255, 255, 255, 0.82);
      border: 1px solid var(--border);
      border-radius: 24px;
      padding: 32px;
      box-shadow: 0 18px 50px rgba(37, 99, 235, 0.08);
      margin-bottom: 24px;
      backdrop-filter: blur(8px);
    }
    .eyebrow {
      display: inline-block;
      padding: 6px 12px;
      border-radius: 999px;
      background: #dbeafe;
      color: var(--accent);
      font-size: 12px;
      font-weight: 700;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      margin-bottom: 14px;
    }
    h1, h2, h3 { line-height: 1.2; margin: 0 0 12px; }
    h1 { font-size: clamp(2rem, 4vw, 3.5rem); }
    h2 { font-size: 1.35rem; }
    p { margin: 0 0 14px; color: var(--muted); }
    .grid {
      display: grid;
      gap: 16px;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    }
    section.card {
      background: var(--card);
      border: 1px solid var(--border);
      border-radius: 20px;
      padding: 20px;
      box-shadow: 0 10px 28px rgba(15, 23, 42, 0.04);
    }
    ul {
      margin: 0;
      padding-left: 18px;
    }
    li { margin-bottom: 8px; color: var(--text); }
    pre {
      margin: 0;
      overflow: auto;
      padding: 16px;
      border-radius: 16px;
      background: #0b1220;
      color: #e5e7eb;
      font-size: 0.92rem;
      line-height: 1.5;
    }
    code {
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
      color: var(--code);
    }
    pre code { color: inherit; }
    .footer {
      margin-top: 24px;
      padding: 18px 20px;
      border: 1px solid var(--border);
      border-radius: 16px;
      background: rgba(255, 255, 255, 0.85);
      color: var(--muted);
    }
  `;

  const renderSection = (section) => {
    const itemsHtml = section.items
      ? `<ul>${section.items.map((item) => `<li>${item}</li>`).join("")}</ul>`
      : "";
    const codeHtml = section.code
      ? `<pre><code>${section.code.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;")}</code></pre>`
      : "";

    return `
      <section class="card">
        <h2>${section.title}</h2>
        ${itemsHtml}
        ${codeHtml}
      </section>
    `;
  };

  const mount = () => {
    document.title = "JavaScript kalkulacka - co vedet pred programovanim";

    document.body.innerHTML = `
      <style>${pageStyle}</style>
      <main>
        <header class="hero">
          <div class="eyebrow">JavaScript / calculator basics</div>
          <h1>Co potrebujes vedet, nez zacnes psat kalkulacku</h1>
          <p>
            Tahle stranka je kratky tahak: co musis znat o JavaScriptu, DOMu a logice
            aplikace, abys dokazal postavit jednoduchou kalkulacku v browseru.
          </p>
          <p>
            Nejdulezitejsi myslenka: kalkulacka neni jen pocitani, ale hlavne sprava stavu
            a spravne reakce na kliky a klavesnici.
          </p>
        </header>

        <div class="grid">
          ${sections.map(renderSection).join("")}
        </div>

        <div class="footer">
          Zacni malym prototypem: displej, cisla, operator, vysledek. Az pak pridavej
          desetinna cisla, backspace, keyboard support a historii.
        </div>
      </main>
    `;
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mount, { once: true });
  } else {
    mount();
  }
})();
