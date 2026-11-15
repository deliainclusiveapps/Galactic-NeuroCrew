export const ASTRONAUT_PROFILES = {
  boy: {
    id: 'boy',
    name: 'Leo',
    role: 'Junior Systems Pilot',
    summary: 'Loves building solar circuits and checking oxygen tanks.',
    suitPrimary: '#F8FAFC',
    suitTrim: '#0EA5E9',
    suitAccent: '#F59E0B',
    skin: '#E6B18A',
    hair: '#4A2C1D',
    patchColor: '#22D3EE'
  },
  girl: {
    id: 'girl',
    name: 'Maya',
    role: 'Junior Science Specialist',
    summary: 'Loves growing lunar greenhouse plants and reading space weather.',
    suitPrimary: '#F8FAFC',
    suitTrim: '#22D3EE',
    suitAccent: '#F59E0B',
    skin: '#C98A63',
    hair: '#291B18',
    patchColor: '#38BDF8'
  }
};

function renderFaceExpression(expression, skinColor, hairColor, isGirl) {
  let mouth = '<path d="M 88 97 Q 100 107 112 97" fill="none" stroke="#1E293B" stroke-width="3.2" stroke-linecap="round"/>';
  let eyes = `
    <circle cx="84" cy="81" r="4.8" fill="#0F172A"/>
    <circle cx="116" cy="81" r="4.8" fill="#0F172A"/>
    <circle cx="85.8" cy="79.5" r="1.6" fill="#FFFFFF"/>
    <circle cx="117.8" cy="79.5" r="1.6" fill="#FFFFFF"/>
  `;
  let brows = `
    <path d="M 76 72 Q 84 69 91 72" fill="none" stroke="${hairColor}" stroke-width="2.6" stroke-linecap="round"/>
    <path d="M 109 72 Q 116 69 124 72" fill="none" stroke="${hairColor}" stroke-width="2.6" stroke-linecap="round"/>
  `;

  if (expression === 'curious') {
    mouth = '<ellipse cx="100" cy="99" rx="5" ry="4" fill="#1E293B"/>';
    brows = `
      <path d="M 76 69 Q 84 65 91 70" fill="none" stroke="${hairColor}" stroke-width="2.6" stroke-linecap="round"/>
      <path d="M 109 72 Q 116 70 124 73" fill="none" stroke="${hairColor}" stroke-width="2.6" stroke-linecap="round"/>
    `;
  } else if (expression === 'focused') {
    mouth = '<path d="M 90 98 L 110 98" fill="none" stroke="#1E293B" stroke-width="3.2" stroke-linecap="round"/>';
    brows = `
      <path d="M 76 72 L 91 74" fill="none" stroke="${hairColor}" stroke-width="2.8" stroke-linecap="round"/>
      <path d="M 109 74 L 124 72" fill="none" stroke="${hairColor}" stroke-width="2.8" stroke-linecap="round"/>
    `;
  } else if (expression === 'alert') {
    mouth = '<path d="M 89 102 Q 100 94 111 102" fill="none" stroke="#1E293B" stroke-width="3.2" stroke-linecap="round"/>';
    brows = `
      <path d="M 76 74 L 91 70" fill="none" stroke="${hairColor}" stroke-width="2.8" stroke-linecap="round"/>
      <path d="M 109 70 L 124 74" fill="none" stroke="${hairColor}" stroke-width="2.8" stroke-linecap="round"/>
    `;
  } else if (expression === 'celebrating') {
    mouth = '<path d="M 86 95 Q 100 112 114 95 Z" fill="#FFFFFF" stroke="#1E293B" stroke-width="2.6" stroke-linejoin="round"/>';
    eyes = `
      <path d="M 79 81 Q 84 75 89 81" fill="none" stroke="#0F172A" stroke-width="3.2" stroke-linecap="round"/>
      <path d="M 111 81 Q 116 75 121 81" fill="none" stroke="#0F172A" stroke-width="3.2" stroke-linecap="round"/>
    `;
  }

  const hair = isGirl
    ? `
      <path d="M 65 76 C 65 46, 135 46, 135 76 C 126 62, 74 62, 65 76 Z" fill="${hairColor}"/>
      <circle cx="62" cy="84" r="9" fill="${hairColor}"/>
      <circle cx="138" cy="84" r="9" fill="${hairColor}"/>
      <circle cx="66" cy="77" r="3" fill="#22D3EE"/>
      <circle cx="134" cy="77" r="3" fill="#22D3EE"/>
    `
    : `
      <path d="M 67 74 C 68 47, 132 47, 133 74 C 125 63, 114 66, 104 60 C 94 67, 79 62, 67 74 Z" fill="${hairColor}"/>
    `;

  return `
    <circle cx="100" cy="84" r="33" fill="${skinColor}"/>
    ${hair}
    <circle cx="76" cy="91" r="4.5" fill="#F43F5E" opacity="0.22"/>
    <circle cx="124" cy="91" r="4.5" fill="#F43F5E" opacity="0.22"/>
    ${brows}
    ${eyes}
    ${mouth}
  `;
}

export function renderAstronautSVG(characterId, options = {}) {
  const id = characterId === 'girl' ? 'girl' : 'boy';
  const profile = ASTRONAUT_PROFILES[id];
  const expression = options.expression || 'happy';
  const pose = options.pose || (expression === 'celebrating' ? 'celebrating' : 'idle');
  const className = options.className || 'astronaut-svg';
  const ariaLabel = options.ariaLabel || `${profile.name} the child astronaut`;
  const isGirl = id === 'girl';

  let leftArmPath = 'M 63 142 C 44 152, 42 172, 52 184';
  let rightArmPath = 'M 137 142 C 156 152, 158 172, 148 184';
  let leftHand = { cx: 52, cy: 186 };
  let rightHand = { cx: 148, cy: 186 };
  let leftLegClass = '';
  let rightLegClass = '';

  if (pose === 'celebrating' || expression === 'celebrating') {
    leftArmPath = 'M 63 142 C 42 126, 36 106, 46 92';
    rightArmPath = 'M 137 142 C 158 126, 164 106, 154 92';
    leftHand = { cx: 46, cy: 90 };
    rightHand = { cx: 154, cy: 90 };
  } else if (pose === 'pointing-left') {
    leftArmPath = 'M 63 142 C 40 134, 24 128, 14 124';
    leftHand = { cx: 12, cy: 123 };
  } else if (pose === 'pointing-right') {
    rightArmPath = 'M 137 142 C 160 134, 176 128, 186 124';
    rightHand = { cx: 188, cy: 123 };
  } else if (pose === 'walking') {
    leftArmPath = 'M 63 142 C 48 156, 46 170, 56 178';
    rightArmPath = 'M 137 142 C 152 132, 158 148, 154 166';
    leftHand = { cx: 56, cy: 180 };
    rightHand = { cx: 154, cy: 168 };
    leftLegClass = 'astro-leg-left';
    rightLegClass = 'astro-leg-right';
  }

  return `
    <svg class="${className}" viewBox="0 0 200 245" role="img" aria-label="${ariaLabel}">
      <rect x="48" y="118" width="104" height="72" rx="18" fill="#94A3B8" stroke="#334155" stroke-width="3"/>
      <rect x="56" y="124" width="16" height="44" rx="6" fill="#0F172A"/>
      <rect x="128" y="124" width="16" height="44" rx="6" fill="#0F172A"/>

      <path d="${leftArmPath}" fill="none" stroke="${profile.suitPrimary}" stroke-width="20" stroke-linecap="round"/>
      <path d="${leftArmPath}" fill="none" stroke="${profile.suitTrim}" stroke-width="20" stroke-linecap="round" stroke-dasharray="1 28"/>
      <path d="${rightArmPath}" fill="none" stroke="${profile.suitPrimary}" stroke-width="20" stroke-linecap="round"/>
      <circle cx="${leftHand.cx}" cy="${leftHand.cy}" r="10" fill="${profile.suitTrim}" stroke="#0F172A" stroke-width="2.5"/>
      <circle cx="${rightHand.cx}" cy="${rightHand.cy}" r="10" fill="${profile.suitTrim}" stroke="#0F172A" stroke-width="2.5"/>

      <g class="${leftLegClass}">
        <rect x="70" y="184" width="24" height="40" rx="10" fill="${profile.suitPrimary}" stroke="#334155" stroke-width="3"/>
        <rect x="66" y="214" width="30" height="16" rx="8" fill="${profile.suitTrim}" stroke="#0F172A" stroke-width="2.5"/>
      </g>
      <g class="${rightLegClass}">
        <rect x="106" y="184" width="24" height="40" rx="10" fill="${profile.suitPrimary}" stroke="#334155" stroke-width="3"/>
        <rect x="104" y="214" width="30" height="16" rx="8" fill="${profile.suitTrim}" stroke="#0F172A" stroke-width="2.5"/>
      </g>

      <rect x="62" y="126" width="76" height="72" rx="26" fill="${profile.suitPrimary}" stroke="#334155" stroke-width="3"/>
      <rect x="62" y="166" width="76" height="12" fill="${profile.suitTrim}"/>
      <rect x="92" y="164" width="16" height="16" rx="4" fill="${profile.suitAccent}" stroke="#0F172A" stroke-width="2"/>
      <rect x="77" y="138" width="46" height="22" rx="6" fill="#0F172A"/>
      <rect x="82" y="143" width="14" height="12" rx="3" fill="${profile.patchColor}"/>
      <circle cx="105" cy="149" r="4" fill="#10B981"/>
      <circle cx="116" cy="149" r="4" fill="#F59E0B"/>

      <rect x="70" y="114" width="60" height="16" rx="8" fill="${profile.suitTrim}" stroke="#0F172A" stroke-width="2.5"/>

      <circle cx="100" cy="80" r="48" fill="${profile.suitPrimary}" stroke="#334155" stroke-width="3.5"/>
      <circle cx="100" cy="80" r="41" fill="#BAE6FD" stroke="${profile.suitTrim}" stroke-width="3"/>
      <rect x="62" y="48" width="76" height="62" rx="28" fill="#0C4A6E" opacity="0.22"/>
      ${renderFaceExpression(expression, profile.skin, profile.hair, isGirl)}
      <path d="M 70 54 Q 90 42 118 50" fill="none" stroke="#FFFFFF" stroke-width="4" stroke-linecap="round" opacity="0.55"/>
      <circle cx="147" cy="76" r="6" fill="${profile.suitAccent}" stroke="#0F172A" stroke-width="2"/>
      <line x1="149" y1="70" x2="152" y2="54" stroke="#94A3B8" stroke-width="3" stroke-linecap="round"/>
      <circle cx="152" cy="52" r="3.5" fill="#22D3EE"/>
    </svg>
  `;
}
