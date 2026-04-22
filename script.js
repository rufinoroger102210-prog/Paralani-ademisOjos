/* ══════════════════════════════════════════════════════
   SCRIPT PRINCIPAL — Detalle especial 💖
   ══════════════════════════════════════════════════════ */

const music   = document.getElementById('music');
const btn     = document.getElementById('playBtn');
const bouquet = document.getElementById('bouquet');
let played = false;

btn.onclick = () => {
    if (played) return;
    played = true;
    music.play().catch(() => {});
    btn.querySelector('.btn-label').textContent = '🌹 Sonando para ti, mi Dineily…';
    btn.disabled = true;
    animateBouquet();
    startFallingPetals();
};

/* ══════════════════════════════════════════
   CANVAS: PARTÍCULAS DE FONDO
   ══════════════════════════════════════════ */
(function initParticles() {
    const canvas = document.getElementById('particles');
    const ctx    = canvas.getContext('2d');
    let W, H, stars = [], fireflies = [];

    function resize() {
        W = canvas.width  = window.innerWidth;
        H = canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    for (let i = 0; i < 160; i++) {
        stars.push({
            x: Math.random() * 9999, y: Math.random() * 9999,
            r: .25 + Math.random() * 1.6,
            alpha: .1 + Math.random() * .6,
            speed: .3 + Math.random() * .8,
            phase: Math.random() * Math.PI * 2
        });
    }

    for (let i = 0; i < 55; i++) {
        fireflies.push({
            x: Math.random(), y: Math.random(),
            vx: (Math.random() - .5) * .0012,
            vy: (Math.random() - .5) * .0012,
            r: 1.5 + Math.random() * 2,
            alpha: 0,
            targetAlpha: .3 + Math.random() * .7,
            phase: Math.random() * Math.PI * 2,
            speed: .4 + Math.random() * .5,
            hue: Math.random() > .5 ? 330 : 280
        });
    }

    let t = 0;
    function draw() {
        t += .012;
        ctx.clearRect(0, 0, W, H);
        stars.forEach(s => {
            const tx = (s.x % W + W) % W;
            const ty = (s.y % H + H) % H;
            const tw = .4 + .6 * (.5 + .5 * Math.sin(t * s.speed + s.phase));
            ctx.beginPath();
            ctx.arc(tx, ty, s.r * tw, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255,245,230,${s.alpha * tw})`;
            ctx.fill();
            s.x += .015; s.y -= .005;
        });
        fireflies.forEach(f => {
            f.phase += .018 * f.speed;
            f.alpha = f.targetAlpha * (.5 + .5 * Math.sin(f.phase));
            f.x = ((f.x + f.vx + 1) % 1);
            f.y = ((f.y + f.vy + 1) % 1);
            const fx = f.x * W, fy = f.y * H;
            const grd = ctx.createRadialGradient(fx, fy, 0, fx, fy, f.r * 4);
            grd.addColorStop(0,   `hsla(${f.hue},100%,80%,${f.alpha})`);
            grd.addColorStop(.5,  `hsla(${f.hue},90%,60%,${f.alpha * .5})`);
            grd.addColorStop(1,   `hsla(${f.hue},80%,50%,0)`);
            ctx.beginPath();
            ctx.arc(fx, fy, f.r * 4, 0, Math.PI * 2);
            ctx.fillStyle = grd;
            ctx.fill();
        });
        requestAnimationFrame(draw);
    }
    draw();
})();

/* ══════════════════════════════════════════
   ANIMACIÓN ENTRADA POEMA
   ══════════════════════════════════════════ */
(function animatePoem() {
    const lines = document.querySelectorAll('.line.fade-in');
    lines.forEach(l => {
        const delay = parseFloat(l.style.getPropertyValue('--d') || '0') * 1000;
        setTimeout(() => l.classList.add('visible'), delay + 200);
    });
})();

/* ══════════════════════════════════════════
   PÉTALOS CAYENDO
   ══════════════════════════════════════════ */
function startFallingPetals() {
    for (let i = 0; i < 24; i++) {
        setTimeout(() => {
            const p    = document.createElement('div');
            p.className = 'falling-petal';
            const size = 10 + Math.random() * 14;
            const hue  = 320 + Math.random() * 30;
            p.innerHTML = `<svg width="${size}" height="${size*1.3}" viewBox="0 0 10 13">
              <ellipse cx="5" cy="7" rx="4" ry="5.5" fill="hsl(${hue},88%,72%)" opacity=".8"/>
            </svg>`;
            p.style.left = Math.random() * 100 + 'vw';
            p.style.top  = '-30px';
            p.style.setProperty('--pd',    (5 + Math.random() * 5) + 's');
            p.style.setProperty('--delay', (Math.random() * 3)      + 's');
            document.body.appendChild(p);
        }, i * 650);
    }
}

/* ══════════════════════════════════════════════════════════
   SISTEMA DE RAMO PROFESIONAL
   ══════════════════════════════════════════════════════════ */

function uid() { return Math.random().toString(36).slice(2, 7); }

/* ─────────────────────────────────────────
   ROSA — 5 capas de pétalos en espiral
   ───────────────────────────────────────── */
function makeRoseSVG(R, hue) {
    const id = uid();
    const c  = R;
    const PR = R * 0.80;

    const sepals = [0,72,144,216,288].map(a => {
        const ax = a * Math.PI/180;
        const sx = (c + Math.cos(ax) * PR * 0.55).toFixed(1);
        const sy = (c + Math.sin(ax) * PR * 0.55).toFixed(1);
        return `<ellipse cx="${sx}" cy="${sy}"
                rx="${(PR*.13).toFixed(1)}" ry="${(PR*.28).toFixed(1)}"
                fill="hsl(125,68%,22%)" opacity=".9"
                transform="rotate(${a},${sx},${sy})"/>`;
    }).join('');

    const p1 = [0,72,144,216,288].map(a => `
        <ellipse cx="${c}" cy="${(c-PR*.58).toFixed(1)}"
                 rx="${(PR*.37).toFixed(1)}" ry="${(PR*.50).toFixed(1)}"
                 fill="hsl(${hue},82%,48%)" opacity=".82"
                 transform="rotate(${a+4},${c},${c})"/>`).join('');

    const p2 = [36,108,180,252,324].map(a => `
        <ellipse cx="${c}" cy="${(c-PR*.44).toFixed(1)}"
                 rx="${(PR*.30).toFixed(1)}" ry="${(PR*.42).toFixed(1)}"
                 fill="hsl(${hue},87%,57%)" opacity=".88"
                 transform="rotate(${a},${c},${c})"/>`).join('');

    const p3 = [0,60,120,180,240,300].map((a,i) => `
        <ellipse cx="${c}" cy="${(c-PR*.26).toFixed(1)}"
                 rx="${(PR*(.21-i*.010)).toFixed(2)}" ry="${(PR*(.31-i*.012)).toFixed(2)}"
                 fill="hsl(${hue+5},88%,${63+i*3}%)" opacity="${(.93-i*.04).toFixed(2)}"
                 transform="rotate(${a+i*8},${c},${c})"/>`).join('');

    const p4 = [0,51,102,153,204,255,306].map((a,i) => `
        <ellipse cx="${c}" cy="${(c-PR*.10).toFixed(1)}"
                 rx="${(PR*(.12-i*.010)).toFixed(2)}" ry="${(PR*(.18-i*.013)).toFixed(2)}"
                 fill="hsl(${hue+8},82%,${74+i*2}%)" opacity="${(.90-i*.05).toFixed(2)}"
                 transform="rotate(${a+i*10},${c},${c})"/>`).join('');

    const size = R * 2;
    return `<svg xmlns="http://www.w3.org/2000/svg"
                 width="${size}" height="${size}" viewBox="0 0 ${size} ${size}"
                 style="overflow:visible">
      <defs>
        <radialGradient id="rbg${id}" cx="36%" cy="28%" r="66%">
          <stop offset="0%"   stop-color="hsl(${hue},100%,94%)"/>
          <stop offset="25%"  stop-color="hsl(${hue},94%,76%)"/>
          <stop offset="58%"  stop-color="hsl(${hue},88%,58%)"/>
          <stop offset="100%" stop-color="hsl(${hue},78%,36%)"/>
        </radialGradient>
        <filter id="rglow${id}" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="2.2" result="b"/>
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>
      <circle cx="${c}" cy="${c}" r="${(PR+5).toFixed(1)}"
              fill="none" stroke="hsl(${hue},100%,70%)"
              stroke-width="3" opacity=".16" filter="url(#rglow${id})"/>
      ${sepals}
      ${p1}${p2}
      <circle cx="${c}" cy="${c}" r="${(PR*.62).toFixed(1)}"
              fill="url(#rbg${id})" filter="url(#rglow${id})"/>
      ${p3}${p4}
      <circle cx="${c}" cy="${c}" r="${(PR*.10).toFixed(1)}"
              fill="hsl(${hue+10},75%,88%)"/>
      <ellipse cx="${(c-PR*.06).toFixed(1)}" cy="${(c-PR*.07).toFixed(1)}"
               rx="${(PR*.06).toFixed(1)}" ry="${(PR*.04).toFixed(1)}"
               fill="rgba(255,255,255,.70)" transform="rotate(-35,${(c-PR*.06).toFixed(1)},${(c-PR*.07).toFixed(1)})"/>
    </svg>`;
}

/* ─────────────────────────────────────────
   GIRASOL PREMIUM — 22 pétalos + Fibonacci
   ───────────────────────────────────────── */
function makeSunflowerSVG(R) {
    const id = uid();
    const c  = R;
    const N  = 22;
    const PR = R * 0.75;
    const PW = R * 0.18;
    const PH = R * 0.46;
    const CR = R * 0.46;

    const backP = Array.from({length: N}, (_,i) => `
        <ellipse cx="${c}" cy="${(c-PR*.82).toFixed(1)}"
                 rx="${(PW*.82).toFixed(1)}" ry="${(PH*.80).toFixed(1)}"
                 fill="hsl(44,78%,40%)" opacity=".60"
                 transform="rotate(${(360/N)*i + 180/N},${c},${c})"/>`).join('');

    const frontP = Array.from({length: N}, (_,i) => `
        <ellipse cx="${c}" cy="${(c-PR*.82).toFixed(1)}"
                 rx="${PW.toFixed(1)}" ry="${PH.toFixed(1)}"
                 fill="url(#spg${id})"
                 opacity="${(.78+.22*(i%2)).toFixed(2)}"
                 transform="rotate(${(360/N)*i},${c},${c})"/>`).join('');

    const seeds = (() => {
        let d = '';
        [[.07,5,3.5],[.16,8,3.0],[.27,13,2.6],[.37,13,2.2],
         [.47,17,1.9],[.57,21,1.6],[.67,25,1.3],[.77,25,1.1],[.87,29,0.9]]
        .forEach(([rr, n, sz]) => {
            for (let i = 0; i < n; i++) {
                const a  = ((360/n)*i + rr*42) * Math.PI/180;
                const bx = (c + rr*CR*Math.cos(a)).toFixed(1);
                const by = (c + rr*CR*Math.sin(a)).toFixed(1);
                d += `<ellipse cx="${bx}" cy="${by}"
                               rx="${sz.toFixed(1)}" ry="${(sz*.76).toFixed(1)}"
                               fill="hsl(22,65%,${Math.round(8+rr*22)}%)"
                               transform="rotate(${Math.round((360/n)*i)},${bx},${by})"
                               opacity=".88"/>`;
            }
        });
        d += `<circle cx="${c}" cy="${c}" r="3.2" fill="#100400" opacity=".95"/>`;
        return d;
    })();

    const size = R * 2;
    return `<svg xmlns="http://www.w3.org/2000/svg"
                 width="${size}" height="${size}" viewBox="0 0 ${size} ${size}"
                 style="overflow:visible">
      <defs>
        <radialGradient id="spg${id}" cx="46%" cy="14%" r="76%">
          <stop offset="0%"   stop-color="#fffdd0"/>
          <stop offset="28%"  stop-color="#ffdf00"/>
          <stop offset="68%"  stop-color="#e8a800"/>
          <stop offset="100%" stop-color="#9a6200"/>
        </radialGradient>
        <radialGradient id="scg${id}" cx="26%" cy="22%" r="72%">
          <stop offset="0%"   stop-color="#a04e14"/>
          <stop offset="40%"  stop-color="#7a3608"/>
          <stop offset="78%"  stop-color="#481a02"/>
          <stop offset="100%" stop-color="#260e00"/>
        </radialGradient>
        <radialGradient id="ssh${id}" cx="24%" cy="18%" r="56%">
          <stop offset="0%"   stop-color="rgba(255,240,160,.35)"/>
          <stop offset="100%" stop-color="rgba(0,0,0,0)"/>
        </radialGradient>
        <filter id="sfglow${id}" x="-35%" y="-35%" width="170%" height="170%">
          <feGaussianBlur stdDeviation="3" result="b"/>
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <filter id="cfglow${id}" x="-25%" y="-25%" width="150%" height="150%">
          <feGaussianBlur stdDeviation="4" result="b"/>
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>
      <circle cx="${c}" cy="${c}" r="${(PR+PH*.5+8).toFixed(1)}"
              fill="none" stroke="rgba(255,215,0,.18)"
              stroke-width="14" filter="url(#sfglow${id})"/>
      ${backP}${frontP}
      <circle cx="${c}" cy="${c}" r="${CR.toFixed(1)}"
              fill="url(#scg${id})" filter="url(#cfglow${id})"
              stroke="rgba(160,80,8,.6)" stroke-width="2.5"/>
      ${seeds}
      <circle cx="${c}" cy="${c}" r="${CR.toFixed(1)}" fill="url(#ssh${id})"/>
      <ellipse cx="${(c-CR*.28).toFixed(1)}" cy="${(c-CR*.32).toFixed(1)}"
               rx="${(CR*.24).toFixed(1)}" ry="${(CR*.13).toFixed(1)}"
               fill="rgba(255,235,150,.22)"
               transform="rotate(-28,${(c-CR*.28).toFixed(1)},${(c-CR*.32).toFixed(1)})"/>
    </svg>`;
}

/* ─────────────────────────────────────────
   HOJA GRANDE con nervaduras
   ───────────────────────────────────────── */
function makeLeafSVG(w, h, side, hue) {
    const id   = uid();
    const flip = side === 'right' ? `scale(-1,1) translate(-${w},0)` : '';
    const veins = [0.30, 0.50, 0.68, 0.82].map(t => {
        const lx = (w * 0.48 * t).toFixed(1);
        const ly = (h * (0.85 - t * 0.60)).toFixed(1);
        const ex = (w * (0.05 + t * 0.20)).toFixed(1);
        const ey = (h * (0.72 - t * 0.55)).toFixed(1);
        return `<line x1="${lx}" y1="${ly}" x2="${ex}" y2="${ey}"
                      stroke="hsl(${hue},52%,38%)" stroke-width=".9" opacity=".5"/>`;
    }).join('');

    return `<svg xmlns="http://www.w3.org/2000/svg"
                 width="${w}" height="${h}" viewBox="0 0 ${w} ${h}"
                 style="overflow:visible">
      <defs>
        <linearGradient id="lg${id}" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%"   stop-color="hsl(${hue},72%,14%)"/>
          <stop offset="40%"  stop-color="hsl(${hue},76%,30%)"/>
          <stop offset="75%"  stop-color="hsl(${hue},80%,44%)"/>
          <stop offset="100%" stop-color="hsl(${hue},68%,22%)"/>
        </linearGradient>
        <filter id="lsh${id}">
          <feDropShadow dx="-2" dy="-2" stdDeviation="3"
                        flood-color="hsl(${hue},60%,15%)" flood-opacity=".55"/>
        </filter>
      </defs>
      <g transform="${flip}">
        <path d="M${w*.48} ${h}
                 C${w*.44} ${h*.82} ${w*.06} ${h*.70} ${w*.02} ${h*.42}
                 C${w*.00} ${h*.22} ${w*.16} ${h*.06} ${w*.38} ${h*.00}
                 C${w*.60} ${h*.06} ${w*.76} ${h*.18} ${w*.80} ${h*.38}
                 C${w*.86} ${h*.64} ${w*.54} ${h*.80} ${w*.48} ${h}Z"
              fill="url(#lg${id})" filter="url(#lsh${id})"/>
        <line x1="${w*.48}" y1="${h}" x2="${w*.38}" y2="${h*.02}"
              stroke="hsl(${hue},50%,42%)" stroke-width="1.4" opacity=".6"/>
        ${veins}
        <ellipse cx="${w*.32}" cy="${h*.30}" rx="${w*.10}" ry="${h*.06}"
                 fill="rgba(255,255,220,.18)" transform="rotate(-20,${w*.32},${h*.30})"/>
      </g>
    </svg>`;
}

/* ─────────────────────────────────────────
   TALLO CURVO (bezier)
   ───────────────────────────────────────── */
function makeStemPath(x0, y0, x1, y1, thickness, hue) {
    const id  = uid();
    const cpx = (x0 + x1) / 2 + (x1 - x0) * 0.06;
    const cpy = y0 + (y1 - y0) * 0.55;
    const pad = thickness * 4 + 14;
    const minX = Math.min(x0, x1, cpx) - pad;
    const minY = Math.min(y0, y1, cpy) - pad;
    const maxX = Math.max(x0, x1, cpx) + pad;
    const maxY = Math.max(y0, y1, cpy) + pad;
    const W = maxX - minX;
    const H = maxY - minY;
    const lx0 = x0 - minX, ly0 = y0 - minY;
    const lx1 = x1 - minX, ly1 = y1 - minY;
    const lcx = cpx - minX, lcy = cpy - minY;

    const div = document.createElement('div');
    div.style.cssText = `position:absolute; left:${minX}px; top:${minY}px;
                         width:${W}px; height:${H}px; overflow:visible;
                         pointer-events:none; z-index:5;`;
    div.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg"
                          width="${W}" height="${H}" viewBox="0 0 ${W} ${H}"
                          style="overflow:visible">
      <defs>
        <linearGradient id="stg${id}" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stop-color="hsl(${hue},60%,10%)"/>
          <stop offset="35%"  stop-color="hsl(${hue},70%,25%)"/>
          <stop offset="65%"  stop-color="hsl(${hue},76%,36%)"/>
          <stop offset="100%" stop-color="hsl(${hue},60%,14%)"/>
        </linearGradient>
      </defs>
      <path d="M${lx0} ${ly0} Q${lcx} ${lcy} ${lx1} ${ly1}"
            fill="none" stroke="rgba(0,0,0,.22)"
            stroke-width="${thickness*2+2}" stroke-linecap="round"/>
      <path d="M${lx0} ${ly0} Q${lcx} ${lcy} ${lx1} ${ly1}"
            fill="none" stroke="url(#stg${id})"
            stroke-width="${thickness*2}" stroke-linecap="round"/>
      <path d="M${lx0} ${ly0} Q${lcx} ${lcy} ${lx1} ${ly1}"
            fill="none" stroke="rgba(160,255,140,.09)"
            stroke-width="${thickness*.5}" stroke-linecap="round"/>
    </svg>`;
    return div;
}

/* ══════════════════════════════════════════════════════════
   ANIMACIÓN PRINCIPAL DEL RAMO
   ══════════════════════════════════════════════════════════ */
function animateBouquet() {
    const BW  = bouquet.offsetWidth;
    const BH  = bouquet.getBoundingClientRect().height;
    const CX  = BW / 2;
    const BOT = BH;

    const S = Math.min(1, BH / 280, BW / 340);

    const ROSE_R = Math.max(18, Math.round(Math.min(BW * 0.072, 36) * S));
    const SUN_R  = Math.max(30, Math.round(Math.min(BW * 0.125, 58) * S));
    const STEM_T = Math.max(2,  Math.round(3 * S));
    const LEAF_W = Math.max(20, Math.round(32 * S));
    const LEAF_H = Math.max(28, Math.round(44 * S));

    /* ── Layout 3 filas de arco ── */
    const rows = [
        { n: 8, arcFrac: 0.88, yFrac: 0.20 },
        { n: 7, arcFrac: 0.65, yFrac: 0.42 },
        { n: 5, arcFrac: 0.42, yFrac: 0.60 },
    ];

    const flowerPos = [];
    rows.forEach((row, ri) => {
        const halfArc = (BW * row.arcFrac) / 2;
        const baseY   = BOT - BOT * row.yFrac - ROSE_R;
        for (let i = 0; i < row.n; i++) {
            const t   = row.n === 1 ? 0.5 : i / (row.n - 1);
            const x   = CX - halfArc + t * halfArc * 2;
            const arc = Math.sin(t * Math.PI) * ROSE_R * 1.4;
            flowerPos.push({ x, y: baseY - arc, row: ri, idx: flowerPos.length });
        }
    });

    const baseX = CX;
    const baseY = BOT - 6;

    const STEM_INT  = 5800 / flowerPos.length;
    const ROSE_START = 6200;
    const ROSE_INT   = 310;
    const SUN_START  = ROSE_START + flowerPos.length * ROSE_INT + 700;

    /* FASE 1: Tallos + Hojas */
    flowerPos.forEach((fp, i) => {
        setTimeout(() => {
            const hue = 118 + Math.round((i / flowerPos.length) * 22);
            const bx  = baseX + (fp.x - CX) * 0.16 + (Math.random()-.5) * BW * 0.06 * S;

            const stemDiv = makeStemPath(bx, baseY, fp.x, fp.y + ROSE_R * 0.75, STEM_T, hue);
            stemDiv.style.opacity    = '0';
            stemDiv.style.transition = 'opacity .7s ease';
            stemDiv.style.zIndex     = String(fp.row * 10 + 5);
            bouquet.appendChild(stemDiv);
            requestAnimationFrame(() => requestAnimationFrame(() => stemDiv.style.opacity = '1'));

            /* Hojas en filas 0 y 1 */
            if (fp.row < 2 && i % 2 === 0) {
                const side  = i % 4 === 0 ? 'left' : 'right';
                const lt    = 0.38 + Math.random() * 0.22;
                const lx    = bx + (fp.x - bx) * lt;
                const ly    = baseY + (fp.y + ROSE_R*.75 - baseY) * lt;
                const lOffX = side === 'left' ? -(LEAF_W * 0.95) : (LEAF_W * 0.1);
                const lOffY = -(LEAF_H * 0.52);

                const leafDiv = document.createElement('div');
                leafDiv.style.cssText = `
                    position:absolute;
                    left:${lx + lOffX}px; top:${ly + lOffY}px;
                    width:${LEAF_W}px; height:${LEAF_H}px;
                    opacity:0; transition:opacity .8s ease;
                    z-index:${fp.row * 10 + 4};
                    pointer-events:none;
                `;
                leafDiv.innerHTML = makeLeafSVG(LEAF_W, LEAF_H, side, hue);
                bouquet.appendChild(leafDiv);
                setTimeout(() => {
                    requestAnimationFrame(() => requestAnimationFrame(() => leafDiv.style.opacity = '1'));
                }, 250);
            }
        }, i * STEM_INT);
    });

    /* FASE 2: Rosas — de atrás hacia adelante */
    const sorted = [...flowerPos].sort((a,b) => a.row - b.row);
    sorted.forEach((fp, i) => {
        setTimeout(() => {
            const hue  = 315 + Math.round(Math.sin((fp.x / BW) * Math.PI) * 24);
            const tilt = ((fp.x - CX) / BW) * 18;
            const rDiv = document.createElement('div');
            rDiv.style.cssText = `
                position:absolute;
                left:${fp.x - ROSE_R}px;
                top:${fp.y - ROSE_R}px;
                width:${ROSE_R*2}px; height:${ROSE_R*2}px;
                transform: scale(0) rotate(${tilt-18}deg);
                opacity:0;
                transition:
                  transform .72s cubic-bezier(.34,1.56,.64,1),
                  opacity   .50s ease;
                z-index:${fp.row * 10 + 40};
                pointer-events:none;
            `;
            rDiv.innerHTML = makeRoseSVG(ROSE_R, hue);
            bouquet.appendChild(rDiv);
            requestAnimationFrame(() => requestAnimationFrame(() => {
                rDiv.style.transform = `scale(1) rotate(${tilt}deg)`;
                rDiv.style.opacity   = '1';
            }));
        }, ROSE_START + i * ROSE_INT);
    });

    /* FASE 3: Girasol central */
    setTimeout(() => {
        const top = flowerPos.reduce((a,b) => a.y < b.y ? a : b);
        const sunX = CX;
        const sunY = top.y - ROSE_R * 0.5 - SUN_R * 0.55;

        /* Tallo girasol */
        const sunStem = makeStemPath(baseX, baseY, sunX, sunY + SUN_R * 0.80, STEM_T+1, 120);
        sunStem.style.zIndex = '82';
        bouquet.appendChild(sunStem);

        /* Flor girasol */
        const sunDiv = document.createElement('div');
        sunDiv.style.cssText = `
            position:absolute;
            left:${sunX - SUN_R}px;
            top:${sunY - SUN_R}px;
            width:${SUN_R*2}px; height:${SUN_R*2}px;
            transform: scale(0) rotate(-22deg);
            opacity:0;
            transition:
              transform 1.2s cubic-bezier(.34,1.56,.64,1),
              opacity   .80s ease;
            z-index:90;
            pointer-events:none;
        `;
        sunDiv.innerHTML = makeSunflowerSVG(SUN_R);
        bouquet.appendChild(sunDiv);

        setTimeout(() => {
            requestAnimationFrame(() => requestAnimationFrame(() => {
                sunDiv.style.transform = 'scale(1) rotate(0deg)';
                sunDiv.style.opacity   = '1';
            }));
            setTimeout(() => burstGlow(sunX, sunY), 850);
        }, 350);

        /* Lazo en la base */
        setTimeout(() => addBow(baseX, baseY, S), 100);

    }, SUN_START);
}

/* ─────────────────────────────────────────
   LAZO DECORATIVO
   ───────────────────────────────────────── */
function addBow(cx, by, S) {
    const w = Math.round(58 * S), h = Math.round(34 * S);
    const div = document.createElement('div');
    div.style.cssText = `
        position:absolute;
        left:${cx - w/2}px; top:${by - h + 2}px;
        width:${w}px; height:${h}px;
        opacity:0; transition:opacity 1.1s ease;
        z-index:95; pointer-events:none;
    `;
    div.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg"
                          width="${w}" height="${h}" viewBox="0 0 58 34">
      <defs>
        <radialGradient id="bowg" cx="50%" cy="38%" r="60%">
          <stop offset="0%"   stop-color="#ffadd1"/>
          <stop offset="48%"  stop-color="#ff3d82"/>
          <stop offset="100%" stop-color="#b81252"/>
        </radialGradient>
      </defs>
      <path d="M29 17 C21 7 5 3 3 11 C1 19 17 23 29 17Z" fill="url(#bowg)" opacity=".93"/>
      <path d="M29 17 C23 9 9 7 7 13 C5 17 19 21 29 17Z" fill="rgba(255,255,255,.20)"/>
      <path d="M29 17 C37 7 53 3 55 11 C57 19 41 23 29 17Z" fill="url(#bowg)" opacity=".93"/>
      <path d="M29 17 C35 9 49 7 51 13 C53 17 39 21 29 17Z" fill="rgba(255,255,255,.20)"/>
      <ellipse cx="29" cy="17" rx="5.5" ry="4.8" fill="#e8105f"
               stroke="rgba(255,255,255,.28)" stroke-width="1"/>
      <ellipse cx="28" cy="15" rx="2.2" ry="1.4"
               fill="rgba(255,255,255,.48)" transform="rotate(-18,28,15)"/>
      <path d="M26 21 Q21 28 19 33" fill="none" stroke="#ff3d82" stroke-width="2.4" stroke-linecap="round"/>
      <path d="M32 21 Q37 28 39 33" fill="none" stroke="#ff3d82" stroke-width="2.4" stroke-linecap="round"/>
    </svg>`;
    bouquet.appendChild(div);
    requestAnimationFrame(() => requestAnimationFrame(() => div.style.opacity = '1'));
}

/* ─────────────────────────────────────────
   DESTELLO DORADO
   ───────────────────────────────────────── */
function burstGlow(cx, cy) {
    const rect  = bouquet.getBoundingClientRect();
    const burst = document.createElement('div');
    burst.style.cssText = `
        position:fixed;
        left:${rect.left + cx}px; top:${rect.top + cy}px;
        width:10px; height:10px;
        border-radius:50%;
        background:radial-gradient(circle,
          rgba(255,235,60,.65) 0%, rgba(255,185,0,.25) 40%, transparent 70%);
        transform:translate(-50%,-50%) scale(0);
        pointer-events:none; z-index:9999;
        transition: width 1.3s ease, height 1.3s ease,
                    opacity 1.3s ease, transform 1.3s ease;
    `;
    document.body.appendChild(burst);
    requestAnimationFrame(() => requestAnimationFrame(() => {
        burst.style.width     = '280px';
        burst.style.height    = '280px';
        burst.style.opacity   = '0';
        burst.style.transform = 'translate(-50%,-50%) scale(1)';
    }));
    setTimeout(() => burst.remove(), 1500);
}
