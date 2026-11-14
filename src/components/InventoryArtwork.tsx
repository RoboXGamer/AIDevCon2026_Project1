export default function InventoryArtwork() {
  return <svg viewBox="0 0 350 210" role="img" aria-label="Stacked shipping boxes" className="inventory-artwork">
    <defs>
      <linearGradient id="box-front" x2="1" y2="1"><stop stopColor="#dfb49b"/><stop offset="1" stopColor="#ad7d65"/></linearGradient>
      <linearGradient id="box-side" x2="1" y2="1"><stop stopColor="#b98b71"/><stop offset="1" stopColor="#815b4c"/></linearGradient>
      <linearGradient id="box-top" x2="1" y2="1"><stop stopColor="#f4d7c1"/><stop offset="1" stopColor="#cda58f"/></linearGradient>
      <filter id="box-shadow"><feDropShadow dx="0" dy="12" stdDeviation="9" floodColor="#03020c" floodOpacity=".45"/></filter>
    </defs>
    <ellipse cx="183" cy="192" rx="145" ry="12" fill="#080611" opacity=".45"/>
    <g filter="url(#box-shadow)">
      <g transform="translate(149 17)"><path d="M0 19 80 4 135 24 56 42Z" fill="url(#box-top)"/><path d="M0 19 56 42 56 142 0 117Z" fill="url(#box-front)"/><path d="M56 42 135 24 135 120 56 142Z" fill="url(#box-side)"/><path d="M36 12 89 34 89 59 73 63 73 38 20 16Z" fill="#c5988d"/><path d="M0 19 56 42 135 24" fill="none" stroke="#f6dac6" strokeOpacity=".6"/></g>
      <g transform="translate(35 83)"><path d="M0 23 91 3 152 27 64 50Z" fill="url(#box-top)"/><path d="M0 23 64 50 64 124 0 97Z" fill="url(#box-front)"/><path d="M64 50 152 27 152 100 64 124Z" fill="url(#box-side)"/><path d="M38 15 99 40 99 62 82 66 82 44 22 19Z" fill="#c99e86"/><path d="M0 23 64 50 152 27" fill="none" stroke="#ffe4cd" strokeOpacity=".7"/><g transform="matrix(1 .4 0 1 13 63)"><rect width="33" height="23" rx="2" fill="#eee9eb"/>{[3,6,8,12,15,17,21,24,28].map((n,i)=><rect key={n} x={n} y="4" width={i%3===0?2:1} height="15" fill="#514659"/>)}</g></g>
      <g transform="translate(241 116)"><path d="M0 12 46 2 76 15 31 27Z" fill="url(#box-top)"/><path d="M0 12 31 27 31 77 0 63Z" fill="url(#box-front)"/><path d="M31 27 76 15 76 64 31 77Z" fill="url(#box-side)"/><path d="M20 8 49 22 49 40 41 42 41 25 12 10Z" fill="#d4a38b"/><path d="M0 12 31 27 76 15" fill="none" stroke="#ffe4cd" strokeOpacity=".6"/></g>
    </g>
  </svg>
}
