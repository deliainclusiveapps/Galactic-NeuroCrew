import { renderAstronautSVG } from './characters.js';

export function renderPictogramSVG(id) {
  const map = {
    p1_1a: `
      <svg viewBox="0 0 120 96" class="pictogram-svg" aria-hidden="true">
        <rect x="2" y="2" width="116" height="92" rx="14" fill="#0A1E3D" stroke="#22D3EE" stroke-width="2.5"/>
        <ellipse cx="60" cy="86" rx="52" ry="12" fill="#334155"/>
        <path d="M16 78 A34 30 0 0 1 84 78 Z" fill="#CBD5E1" stroke="#38BDF8" stroke-width="2.5"/>
        <rect x="30" y="54" width="22" height="16" rx="4" fill="#0F172A" stroke="#7DD3FC" stroke-width="1.5"/>
        <circle cx="41" cy="61" r="5" fill="#FDE68A"/>
        <rect x="58" y="62" width="14" height="16" rx="3" fill="#10B981" stroke="#ECFDF5" stroke-width="1.5"/>
        <rect x="86" y="34" width="20" height="44" rx="8" fill="#38BDF8" stroke="#E0F2FE" stroke-width="2"/>
        <rect x="91" y="28" width="10" height="6" rx="2" fill="#F8FAFC"/>
        <text x="96" y="60" text-anchor="middle" fill="#071124" font-size="11" font-weight="800">O2</text>
        <path d="M96 14 L106 19 V26 C106 32 101 36 96 38 C91 36 86 32 86 26 V19 Z" fill="#10B981" stroke="#FFFFFF" stroke-width="1.5"/>
        <path d="M92 26 L95 29 L101 23" fill="none" stroke="#FFFFFF" stroke-width="2.2" stroke-linecap="round"/>
      </svg>`,
    p1_1b: `
      <svg viewBox="0 0 120 96" class="pictogram-svg" aria-hidden="true">
        <rect x="2" y="2" width="116" height="92" rx="14" fill="#0A1E3D" stroke="#F59E0B" stroke-width="2.5"/>
        <circle cx="96" cy="20" r="10" fill="#0EA5E9" stroke="#7DD3FC" stroke-width="1.5"/>
        <ellipse cx="60" cy="86" rx="54" ry="14" fill="#475569"/>
        <ellipse cx="86" cy="78" rx="15" ry="5" fill="#1E293B"/>
        <rect x="18" y="42" width="16" height="24" rx="4" fill="#94A3B8" stroke="#334155" stroke-width="1.8"/>
        <rect x="26" y="42" width="22" height="28" rx="8" fill="#F8FAFC" stroke="#0EA5E9" stroke-width="2"/>
        <circle cx="37" cy="28" r="14" fill="#F8FAFC" stroke="#0EA5E9" stroke-width="2"/>
        <rect x="28" y="22" width="19" height="11" rx="5" fill="#0284C7"/>
        <rect x="28" y="68" width="8" height="12" rx="3" fill="#0EA5E9"/>
        <rect x="39" y="68" width="8" height="12" rx="3" fill="#0EA5E9"/>
        <path d="M48 50 L62 44" stroke="#F8FAFC" stroke-width="6" stroke-linecap="round"/>
        <circle cx="65" cy="43" r="4" fill="#0EA5E9"/>
        <polygon points="75,78 86,65 98,78" fill="#94A3B8" stroke="#FDE68A" stroke-width="1.5"/>
        <path d="M74 22 L84 22 L79 31 Z" fill="#FBBF24"/>
      </svg>`,
    p1_2a: `
      <svg viewBox="0 0 120 96" class="pictogram-svg" aria-hidden="true">
        <rect x="2" y="2" width="116" height="92" rx="14" fill="#0A1E3D" stroke="#38BDF8" stroke-width="2.5"/>
        <rect x="14" y="22" width="32" height="54" rx="6" fill="#0F172A" stroke="#7DD3FC" stroke-width="2.2"/>
        <rect x="18" y="34" width="24" height="38" rx="4" fill="#38BDF8"/>
        <path d="M46 38 H66" stroke="#22D3EE" stroke-width="4" stroke-linecap="round"/>
        <polygon points="62,33 70,38 62,43" fill="#10B981"/>
        <rect x="70" y="26" width="34" height="48" rx="8" fill="#1E293B" stroke="#10B981" stroke-width="2.2"/>
        <path d="M87 34 C87 34 78 46 78 53 C78 58 82 62 87 62 C92 62 96 58 96 53 C96 46 87 34 87 34 Z" fill="#38BDF8"/>
        <path d="M82 51 L86 55 L93 47" fill="none" stroke="#FFFFFF" stroke-width="2.5" stroke-linecap="round"/>
        <path d="M66 64 H46" stroke="#10B981" stroke-width="4" stroke-linecap="round"/>
        <polygon points="50,59 42,64 50,69" fill="#38BDF8"/>
      </svg>`,
    p1_2b: `
      <svg viewBox="0 0 120 96" class="pictogram-svg" aria-hidden="true">
        <rect x="2" y="2" width="116" height="92" rx="14" fill="#0A1E3D" stroke="#F59E0B" stroke-width="2.5"/>
        <rect x="12" y="24" width="28" height="52" rx="6" fill="#0F172A" stroke="#38BDF8" stroke-width="2.2"/>
        <rect x="16" y="48" width="20" height="24" rx="3" fill="#38BDF8"/>
        <path d="M40 42 H66" stroke="#7DD3FC" stroke-width="6" stroke-linecap="round"/>
        <circle cx="53" cy="42" r="7" fill="#F59E0B" stroke="#FEF3C7" stroke-width="1.5"/>
        <polygon points="62,36 72,42 62,48" fill="#FBBF24"/>
        <rect x="72" y="22" width="34" height="54" rx="6" fill="#1E293B" stroke="#F59E0B" stroke-width="2.2"/>
        <circle cx="89" cy="40" r="9" fill="#0284C7" stroke="#BAE6FD" stroke-width="2"/>
        <rect x="79" y="56" width="20" height="12" rx="3" fill="#F59E0B"/>
      </svg>`,
    p1_3a: `
      <svg viewBox="0 0 120 96" class="pictogram-svg" aria-hidden="true">
        <rect x="2" y="2" width="116" height="92" rx="14" fill="#0A1E3D" stroke="#10B981" stroke-width="2.5"/>
        <path d="M16 74 A44 38 0 0 1 104 74 Z" fill="#CBD5E1" stroke="#22D3EE" stroke-width="2.5"/>
        <rect x="34" y="46" width="52" height="28" rx="6" fill="#0F172A" stroke="#10B981" stroke-width="2"/>
        <circle cx="48" cy="60" r="7" fill="#10B981"/>
        <path d="M62 54 H78 M62 60 H78 M62 66 H74" stroke="#38BDF8" stroke-width="2.5" stroke-linecap="round"/>
        <path d="M60 12 L78 19 V31 C78 40 70 46 60 49 C50 46 42 40 42 31 V19 Z" fill="#10B981" stroke="#FFFFFF" stroke-width="2"/>
        <path d="M53 30 L58 35 L68 25" fill="none" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round"/>
      </svg>`,
    p1_3b: `
      <svg viewBox="0 0 120 96" class="pictogram-svg" aria-hidden="true">
        <rect x="2" y="2" width="116" height="92" rx="14" fill="#0A1E3D" stroke="#F59E0B" stroke-width="2.5"/>
        <rect x="16" y="22" width="52" height="54" rx="7" fill="#1E293B" stroke="#F59E0B" stroke-width="2.5"/>
        <rect x="24" y="30" width="36" height="26" rx="4" fill="#0F172A"/>
        <circle cx="42" cy="43" r="9" fill="#F59E0B"/>
        <circle cx="42" cy="43" r="4" fill="#FEF3C7"/>
        <rect x="26" y="62" width="32" height="7" rx="3" fill="#94A3B8"/>
        <path d="M92 22 A12 12 0 0 0 77 36 L60 53 A5 5 0 0 0 67 60 L84 43 A12 12 0 0 0 98 28 L91 35 L85 29 Z" fill="#FDE68A" stroke="#F59E0B" stroke-width="1.5"/>
      </svg>`,
    p2_1a: `
      <svg viewBox="0 0 120 96" class="pictogram-svg" aria-hidden="true">
        <rect x="2" y="2" width="116" height="92" rx="14" fill="#0A1E3D" stroke="#FBBF24" stroke-width="2.5"/>
        <circle cx="24" cy="22" r="12" fill="#FBBF24"/>
        <line x1="36" y1="28" x2="50" y2="38" stroke="#FDE68A" stroke-width="2.5"/>
        <line x1="26" y1="36" x2="36" y2="48" stroke="#FDE68A" stroke-width="2.5"/>
        <polygon points="16,56 62,42 68,68 22,82" fill="#0284C7" stroke="#BAE6FD" stroke-width="2"/>
        <line x1="39" y1="49" x2="45" y2="75" stroke="#E0F2FE" stroke-width="1.6"/>
        <line x1="19" y1="69" x2="65" y2="55" stroke="#E0F2FE" stroke-width="1.6"/>
        <path d="M68 58 H82" stroke="#FBBF24" stroke-width="3.5"/>
        <rect x="82" y="38" width="24" height="36" rx="6" fill="#1E293B" stroke="#F59E0B" stroke-width="2"/>
        <path d="M88 50 Q94 44 100 50 Q94 56 88 62 Q94 68 100 62" fill="none" stroke="#F97316" stroke-width="3" stroke-linecap="round"/>
      </svg>`,
    p2_1b: `
      <svg viewBox="0 0 120 96" class="pictogram-svg" aria-hidden="true">
        <rect x="2" y="2" width="116" height="92" rx="14" fill="#0A1E3D" stroke="#10B981" stroke-width="2.5"/>
        <polygon points="12,54 48,42 54,66 18,78" fill="#0284C7" stroke="#BAE6FD" stroke-width="2"/>
        <path d="M52 60 H68" stroke="#FBBF24" stroke-width="4" stroke-linecap="round"/>
        <rect x="68" y="22" width="38" height="56" rx="7" fill="#1E293B" stroke="#10B981" stroke-width="2.5"/>
        <rect x="79" y="15" width="16" height="7" rx="2" fill="#94A3B8"/>
        <rect x="75" y="31" width="24" height="9" rx="2" fill="#10B981"/>
        <rect x="75" y="43" width="24" height="9" rx="2" fill="#10B981"/>
        <rect x="75" y="55" width="24" height="9" rx="2" fill="#10B981"/>
        <path d="M89 34 L82 47 H88 L85 58 L95 44 H89 Z" fill="#FBBF24"/>
      </svg>`,
    p2_2a: `
      <svg viewBox="0 0 120 96" class="pictogram-svg" aria-hidden="true">
        <rect x="2" y="2" width="116" height="92" rx="14" fill="#0A1E3D" stroke="#22D3EE" stroke-width="2.5"/>
        <rect x="12" y="42" width="20" height="32" rx="4" fill="#1E293B" stroke="#10B981" stroke-width="2"/>
        <path d="M32 58 H50" stroke="#10B981" stroke-width="5" stroke-linecap="round"/>
        <path d="M48 74 A30 26 0 0 1 108 74 Z" fill="#CBD5E1" stroke="#22D3EE" stroke-width="2.5"/>
        <circle cx="78" cy="58" r="9" fill="#0F172A" stroke="#10B981" stroke-width="2"/>
        <path d="M80 22 L71 36 H78 L75 46 L86 32 H79 Z" fill="#10B981"/>
      </svg>`,
    p2_2b: `
      <svg viewBox="0 0 120 96" class="pictogram-svg" aria-hidden="true">
        <rect x="2" y="2" width="116" height="92" rx="14" fill="#0A1E3D" stroke="#F59E0B" stroke-width="2.5"/>
        <rect x="14" y="44" width="20" height="32" rx="4" fill="#1E293B" stroke="#F59E0B" stroke-width="2"/>
        <path d="M34 58 H52" stroke="#FBBF24" stroke-width="5" stroke-linecap="round"/>
        <rect x="52" y="24" width="54" height="52" rx="7" fill="#1E293B" stroke="#38BDF8" stroke-width="2"/>
        <path d="M68 34 H78 M71 34 V44 L61 64 C60 66 62 68 64 68 H82 C84 68 86 66 85 64 L75 44 V34" fill="#38BDF8" stroke="#E0F2FE" stroke-width="1.8"/>
        <path d="M95 28 L88 39 H94 L91 49 L101 37 H95 Z" fill="#FBBF24"/>
      </svg>`,
    p2_3a: `
      <svg viewBox="0 0 120 96" class="pictogram-svg" aria-hidden="true">
        <rect x="2" y="2" width="116" height="92" rx="14" fill="#0A1E3D" stroke="#38BDF8" stroke-width="2.5"/>
        <rect x="10" y="54" width="100" height="34" rx="6" fill="#475569"/>
        <polygon points="36,68 60,58 84,68 74,84 46,84" fill="#38BDF8" stroke="#E0F2FE" stroke-width="1.8"/>
        <rect x="44" y="14" width="32" height="22" rx="5" fill="#F59E0B" stroke="#0F172A" stroke-width="2"/>
        <polygon points="52,36 68,36 60,72" fill="#E2E8F0" stroke="#0284C7" stroke-width="2"/>
        <line x1="54" y1="46" x2="66" y2="50" stroke="#0284C7" stroke-width="2"/>
        <line x1="56" y1="56" x2="64" y2="60" stroke="#0284C7" stroke-width="2"/>
      </svg>`,
    p2_3b: `
      <svg viewBox="0 0 120 96" class="pictogram-svg" aria-hidden="true">
        <rect x="2" y="2" width="116" height="92" rx="14" fill="#0A1E3D" stroke="#10B981" stroke-width="2.5"/>
        <path d="M16 74 A44 54 0 0 1 104 74" fill="none" stroke="#10B981" stroke-width="3" stroke-dasharray="5 4"/>
        <rect x="24" y="34" width="24" height="42" rx="8" fill="#38BDF8" stroke="#E0F2FE" stroke-width="2"/>
        <text x="36" y="60" text-anchor="middle" fill="#071124" font-size="11" font-weight="800">O2</text>
        <rect x="54" y="34" width="24" height="42" rx="6" fill="#0284C7" stroke="#BAE6FD" stroke-width="2"/>
        <path d="M66 44 C66 44 59 53 59 58 C59 62 62 65 66 65 C70 65 73 62 73 58 C73 53 66 44 66 44 Z" fill="#E0F2FE"/>
        <circle cx="94" cy="48" r="11" fill="#10B981"/>
        <path d="M89 48 L93 52 L100 44" fill="none" stroke="#FFFFFF" stroke-width="2.8" stroke-linecap="round"/>
      </svg>`,
    p3_1a: `
      <svg viewBox="0 0 120 96" class="pictogram-svg" aria-hidden="true">
        <rect x="2" y="2" width="116" height="92" rx="14" fill="#0A1E3D" stroke="#22D3EE" stroke-width="2.5"/>
        <rect x="26" y="16" width="76" height="44" rx="6" fill="#0F172A" stroke="#22D3EE" stroke-width="2.5"/>
        <circle cx="48" cy="38" r="11" fill="#F59E0B"/>
        <path d="M64 46 L73 30 L82 40 L92 26" fill="none" stroke="#22D3EE" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
        <circle cx="24" cy="64" r="12" fill="#F8FAFC" stroke="#0EA5E9" stroke-width="2"/>
        <rect x="16" y="59" width="16" height="9" rx="4" fill="#0284C7"/>
        <rect x="16" y="76" width="16" height="10" rx="4" fill="#F8FAFC" stroke="#0EA5E9" stroke-width="1.8"/>
      </svg>`,
    p3_1b: `
      <svg viewBox="0 0 120 96" class="pictogram-svg" aria-hidden="true">
        <rect x="2" y="2" width="116" height="92" rx="14" fill="#0A1E3D" stroke="#F59E0B" stroke-width="2.5"/>
        <circle cx="22" cy="24" r="11" fill="#F97316"/>
        <path d="M34 32 L50 40" stroke="#FBBF24" stroke-width="2.8" stroke-dasharray="4 3"/>
        <path d="M40 76 A32 28 0 0 1 104 76 Z" fill="#64748B" stroke="#F59E0B" stroke-width="3"/>
        <rect x="56" y="54" width="32" height="22" rx="4" fill="#1E293B" stroke="#FBBF24" stroke-width="2"/>
        <path d="M72 22 L90 29 V41 C90 50 82 56 72 59 C62 56 54 50 54 41 V29 Z" fill="#F59E0B" stroke="#FEF3C7" stroke-width="2"/>
        <rect x="65" y="34" width="14" height="12" rx="3" fill="#0F172A"/>
      </svg>`,
    p3_2a: `
      <svg viewBox="0 0 120 96" class="pictogram-svg" aria-hidden="true">
        <rect x="2" y="2" width="116" height="92" rx="14" fill="#0A1E3D" stroke="#F59E0B" stroke-width="2.5"/>
        <path d="M16 78 L30 24 H90 L104 78 Z" fill="#475569" stroke="#F59E0B" stroke-width="3"/>
        <rect x="38" y="38" width="44" height="40" rx="5" fill="#0F172A" stroke="#94A3B8" stroke-width="2"/>
        <circle cx="60" cy="54" r="10" fill="#F8FAFC" stroke="#0EA5E9" stroke-width="2"/>
        <rect x="53" y="50" width="14" height="7" rx="3" fill="#0284C7"/>
        <rect x="52" y="64" width="16" height="14" rx="5" fill="#F8FAFC"/>
      </svg>`,
    p3_2b: `
      <svg viewBox="0 0 120 96" class="pictogram-svg" aria-hidden="true">
        <rect x="2" y="2" width="116" height="92" rx="14" fill="#0A1E3D" stroke="#38BDF8" stroke-width="2.5"/>
        <rect x="26" y="22" width="68" height="54" rx="7" fill="#1E293B" stroke="#38BDF8" stroke-width="2.5"/>
        <rect x="30" y="26" width="14" height="46" rx="4" fill="#38BDF8"/>
        <rect x="76" y="26" width="14" height="46" rx="4" fill="#38BDF8"/>
        <path d="M60 32 L72 37 V47 C72 55 67 60 60 63 C53 60 48 55 48 47 V37 Z" fill="#F59E0B" stroke="#FEF3C7" stroke-width="1.8"/>
        <path d="M8 38 L22 44 M8 56 L22 52" stroke="#F97316" stroke-width="3" stroke-linecap="round"/>
      </svg>`,
    p3_3a: `
      <svg viewBox="0 0 120 96" class="pictogram-svg" aria-hidden="true">
        <rect x="2" y="2" width="116" height="92" rx="14" fill="#0A1E3D" stroke="#10B981" stroke-width="2.5"/>
        <path d="M60 14 L88 24 V44 C88 61 76 74 60 80 C44 74 32 61 32 44 V24 Z" fill="#10B981" stroke="#ECFDF5" stroke-width="2.5"/>
        <path d="M47 47 L56 56 L74 37" fill="none" stroke="#FFFFFF" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
        <circle cx="96" cy="68" r="11" fill="#0F172A" stroke="#22D3EE" stroke-width="2"/>
        <path d="M96 62 V68 L101 70" fill="none" stroke="#22D3EE" stroke-width="2.2" stroke-linecap="round"/>
      </svg>`,
    p3_3b: `
      <svg viewBox="0 0 120 96" class="pictogram-svg" aria-hidden="true">
        <rect x="2" y="2" width="116" height="92" rx="14" fill="#0A1E3D" stroke="#F59E0B" stroke-width="2.5"/>
        <polygon points="14,56 62,44 70,68 22,80" fill="#0284C7" stroke="#BAE6FD" stroke-width="2"/>
        <circle cx="38" cy="30" r="10" fill="#F8FAFC" stroke="#0EA5E9" stroke-width="2"/>
        <rect x="32" y="26" width="12" height="6" rx="3" fill="#0284C7"/>
        <line x1="48" y1="36" x2="62" y2="50" stroke="#FDE68A" stroke-width="3.5" stroke-linecap="round"/>
        <circle cx="90" cy="32" r="14" fill="#0F172A" stroke="#22D3EE" stroke-width="2.5"/>
        <path d="M81 32 L87 26 L92 37 L98 29" fill="none" stroke="#FBBF24" stroke-width="2.5" stroke-linecap="round"/>
      </svg>`,
    p4_1a: `
      <svg viewBox="0 0 120 96" class="pictogram-svg" aria-hidden="true">
        <rect x="2" y="2" width="116" height="92" rx="14" fill="#0A1E3D" stroke="#10B981" stroke-width="2.5"/>
        <path d="M18 76 A42 54 0 0 1 102 76" fill="#064E3B" opacity="0.55" stroke="#34D399" stroke-width="2"/>
        <rect x="30" y="68" width="60" height="10" rx="4" fill="#92400E"/>
        <path d="M60 68 V42" stroke="#10B981" stroke-width="4.5" stroke-linecap="round"/>
        <path d="M60 52 C42 52 38 38 48 34 C56 31 60 43 60 52 Z" fill="#34D399"/>
        <path d="M60 47 C78 47 82 33 72 29 C64 26 60 38 60 47 Z" fill="#10B981"/>
        <path d="M32 16 C32 16 25 25 25 30 C25 33.8 28.2 37 32 37 C35.8 37 39 33.8 39 30 C39 25 32 16 32 16 Z" fill="#38BDF8"/>
        <path d="M88 18 C88 18 82 25 82 29 C82 32.3 84.7 35 88 35 C91.3 35 94 32.3 94 29 C94 25 88 18 88 18 Z" fill="#38BDF8"/>
      </svg>`,
    p4_1b: `
      <svg viewBox="0 0 120 96" class="pictogram-svg" aria-hidden="true">
        <rect x="2" y="2" width="116" height="92" rx="14" fill="#0A1E3D" stroke="#E879F9" stroke-width="2.5"/>
        <rect x="22" y="16" width="76" height="10" rx="5" fill="#E879F9"/>
        <polygon points="28,26 92,26 102,58 18,58" fill="#E879F9" opacity="0.28"/>
        <rect x="30" y="68" width="60" height="10" rx="4" fill="#92400E"/>
        <circle cx="46" cy="56" r="9" fill="#34D399"/>
        <circle cx="60" cy="50" r="11" fill="#10B981"/>
        <circle cx="74" cy="56" r="9" fill="#34D399"/>
        <line x1="60" y1="68" x2="60" y2="54" stroke="#10B981" stroke-width="4"/>
      </svg>`,
    p4_2a: `
      <svg viewBox="0 0 120 96" class="pictogram-svg" aria-hidden="true">
        <rect x="2" y="2" width="116" height="92" rx="14" fill="#0A1E3D" stroke="#F59E0B" stroke-width="2.5"/>
        <rect x="18" y="18" width="84" height="24" rx="5" fill="#F8FAFC" stroke="#F59E0B" stroke-width="2.2"/>
        <rect x="18" y="48" width="84" height="24" rx="5" fill="#E2E8F0" stroke="#F59E0B" stroke-width="2.2"/>
        <circle cx="34" cy="30" r="6" fill="#F59E0B"/>
        <circle cx="52" cy="30" r="6" fill="#10B981"/>
        <rect x="66" y="24" width="26" height="12" rx="3" fill="#0284C7"/>
        <rect x="28" y="55" width="32" height="10" rx="3" fill="#0284C7"/>
        <rect x="66" y="55" width="24" height="10" rx="3" fill="#F59E0B"/>
      </svg>`,
    p4_2b: `
      <svg viewBox="0 0 120 96" class="pictogram-svg" aria-hidden="true">
        <rect x="2" y="2" width="116" height="92" rx="14" fill="#0A1E3D" stroke="#10B981" stroke-width="2.5"/>
        <path d="M16 74 A44 40 0 0 1 104 74 Z" fill="#064E3B" stroke="#34D399" stroke-width="2.5"/>
        <circle cx="42" cy="56" r="10" fill="#34D399"/>
        <circle cx="60" cy="48" r="12" fill="#10B981"/>
        <circle cx="78" cy="56" r="10" fill="#34D399"/>
        <circle cx="52" cy="58" r="5" fill="#F43F5E"/>
        <circle cx="69" cy="58" r="5" fill="#F43F5E"/>
        <polygon points="34,64 86,64 78,80 42,80" fill="#F59E0B" stroke="#FEF3C7" stroke-width="1.8"/>
      </svg>`,
    p4_3a: `
      <svg viewBox="0 0 120 96" class="pictogram-svg" aria-hidden="true">
        <rect x="2" y="2" width="116" height="92" rx="14" fill="#0A1E3D" stroke="#22D3EE" stroke-width="2.5"/>
        <rect x="30" y="16" width="60" height="66" rx="6" fill="#F8FAFC" stroke="#22D3EE" stroke-width="2.5"/>
        <rect x="44" y="10" width="32" height="10" rx="4" fill="#0284C7"/>
        <path d="M40 34 L45 39 L53 30" fill="none" stroke="#10B981" stroke-width="3.5" stroke-linecap="round"/>
        <line x1="58" y1="35" x2="80" y2="35" stroke="#334155" stroke-width="4" stroke-linecap="round"/>
        <path d="M40 52 L45 57 L53 48" fill="none" stroke="#10B981" stroke-width="3.5" stroke-linecap="round"/>
        <line x1="58" y1="53" x2="80" y2="53" stroke="#334155" stroke-width="4" stroke-linecap="round"/>
        <path d="M40 70 L45 75 L53 66" fill="none" stroke="#10B981" stroke-width="3.5" stroke-linecap="round"/>
        <line x1="58" y1="71" x2="76" y2="71" stroke="#334155" stroke-width="4" stroke-linecap="round"/>
      </svg>`,
    p4_3b: `
      <svg viewBox="0 0 120 96" class="pictogram-svg" aria-hidden="true">
        <rect x="2" y="2" width="116" height="92" rx="14" fill="#0A1E3D" stroke="#FBBF24" stroke-width="2.5"/>
        <path d="M22 54 Q38 36 54 54" fill="#1E293B" stroke="#22D3EE" stroke-width="2.5"/>
        <line x1="38" y1="54" x2="38" y2="76" stroke="#CBD5E1" stroke-width="5" stroke-linecap="round"/>
        <circle cx="88" cy="28" r="13" fill="#0284C7" stroke="#7DD3FC" stroke-width="2"/>
        <path d="M80 24 Q88 18 96 27 Q88 33 80 28 Z" fill="#10B981"/>
        <path d="M48 40 Q62 32 74 30" fill="none" stroke="#FBBF24" stroke-width="3" stroke-dasharray="5 4" stroke-linecap="round"/>
        <circle cx="86" cy="66" r="13" fill="#0F172A" stroke="#FBBF24" stroke-width="2.5"/>
        <path d="M86 58 V66 L92 69" fill="none" stroke="#FBBF24" stroke-width="2.5" stroke-linecap="round"/>
      </svg>`,
    p5_1a: `
      <svg viewBox="0 0 120 96" class="pictogram-svg" aria-hidden="true">
        <rect x="2" y="2" width="116" height="92" rx="14" fill="#0A1E3D" stroke="#10B981" stroke-width="2.5"/>
        <path d="M60 14 L86 24 V42 C86 57 74 68 60 74 C46 68 34 57 34 42 V24 Z" fill="#10B981" stroke="#ECFDF5" stroke-width="2"/>
        <circle cx="48" cy="40" r="5" fill="#FFFFFF"/>
        <circle cx="72" cy="40" r="5" fill="#FFFFFF"/>
        <path d="M48 52 Q60 61 72 52" fill="none" stroke="#FFFFFF" stroke-width="3.5" stroke-linecap="round"/>
        <rect x="14" y="54" width="14" height="24" rx="5" fill="#38BDF8"/>
        <path d="M98 54 C98 54 91 63 91 69 C91 73 94 76 98 76 C102 76 105 73 105 69 C105 63 98 54 98 54 Z" fill="#22D3EE"/>
      </svg>`,
    p5_1b: `
      <svg viewBox="0 0 120 96" class="pictogram-svg" aria-hidden="true">
        <rect x="2" y="2" width="116" height="92" rx="14" fill="#0A1E3D" stroke="#F59E0B" stroke-width="2.5"/>
        <ellipse cx="60" cy="84" rx="50" ry="10" fill="#475569"/>
        <rect x="24" y="42" width="66" height="22" rx="6" fill="#F59E0B" stroke="#FEF3C7" stroke-width="1.8"/>
        <circle cx="36" cy="68" r="9" fill="#1E293B" stroke="#E2E8F0" stroke-width="2.5"/>
        <circle cx="58" cy="68" r="9" fill="#1E293B" stroke="#E2E8F0" stroke-width="2.5"/>
        <circle cx="80" cy="68" r="9" fill="#1E293B" stroke="#E2E8F0" stroke-width="2.5"/>
        <line x1="48" y1="42" x2="48" y2="22" stroke="#E2E8F0" stroke-width="3.5"/>
        <circle cx="48" cy="18" r="6" fill="#22D3EE"/>
        <path d="M98 22 L90 35 H96 L93 46 L104 32 H98 Z" fill="#FBBF24"/>
      </svg>`,
    p5_2a: `
      <svg viewBox="0 0 120 96" class="pictogram-svg" aria-hidden="true">
        <rect x="2" y="2" width="116" height="92" rx="14" fill="#0A1E3D" stroke="#22D3EE" stroke-width="2.5"/>
        <path d="M22 74 A38 30 0 0 1 98 74 Z" fill="#CBD5E1" stroke="#22D3EE" stroke-width="2.5"/>
        <path d="M60 14 L78 22 V36 C78 47 70 54 60 58 C50 54 42 47 42 36 V22 Z" fill="#0EA5E9" stroke="#FFFFFF" stroke-width="2"/>
        <path d="M52 36 L58 42 L69 30" fill="none" stroke="#FFFFFF" stroke-width="3.5" stroke-linecap="round"/>
      </svg>`,
    p5_2b: `
      <svg viewBox="0 0 120 96" class="pictogram-svg" aria-hidden="true">
        <rect x="2" y="2" width="116" height="92" rx="14" fill="#0A1E3D" stroke="#F59E0B" stroke-width="2.5"/>
        <path d="M78 18 A13 13 0 0 0 62 34 L42 54 A5 5 0 0 0 50 62 L70 42 A13 13 0 0 0 86 26 L78 34 L71 27 Z" fill="#FBBF24" stroke="#FEF3C7" stroke-width="1.5"/>
        <path d="M22 28 H42 M37 22 L44 28 L37 34" fill="none" stroke="#22D3EE" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M72 72 H94 M89 66 L96 72 L89 78" fill="none" stroke="#10B981" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>`,
    p5_3a: `
      <svg viewBox="0 0 120 96" class="pictogram-svg" aria-hidden="true">
        <rect x="2" y="2" width="116" height="92" rx="14" fill="#0A1E3D" stroke="#10B981" stroke-width="2.5"/>
        <line x1="60" y1="16" x2="60" y2="76" stroke="#F8FAFC" stroke-width="4"/>
        <line x1="24" y1="30" x2="96" y2="30" stroke="#22D3EE" stroke-width="4" stroke-linecap="round"/>
        <polygon points="24,30 14,52 34,52" fill="#38BDF8"/>
        <polygon points="96,30 86,52 106,52" fill="#10B981"/>
        <circle cx="24" cy="48" r="6" fill="#E0F2FE"/>
        <circle cx="96" cy="48" r="6" fill="#A7F3D0"/>
        <rect x="38" y="74" width="44" height="8" rx="3" fill="#94A3B8"/>
      </svg>`,
    p5_3b: `
      <svg viewBox="0 0 120 96" class="pictogram-svg" aria-hidden="true">
        <rect x="2" y="2" width="116" height="92" rx="14" fill="#0A1E3D" stroke="#F59E0B" stroke-width="2.5"/>
        <rect x="24" y="44" width="54" height="20" rx="6" fill="#F59E0B" stroke="#FEF3C7" stroke-width="1.8"/>
        <circle cx="38" cy="68" r="8" fill="#1E293B" stroke="#E2E8F0" stroke-width="2.2"/>
        <circle cx="66" cy="68" r="8" fill="#1E293B" stroke="#E2E8F0" stroke-width="2.2"/>
        <line x1="64" y1="44" x2="64" y2="30" stroke="#E2E8F0" stroke-width="3"/>
        <circle cx="64" cy="27" r="4.5" fill="#22D3EE"/>
        <line x1="69" y1="27" x2="98" y2="44" stroke="#22D3EE" stroke-width="2.5" stroke-dasharray="4 3"/>
        <polygon points="90,56 100,40 110,56" fill="#94A3B8" stroke="#22D3EE" stroke-width="1.8"/>
        <rect x="22" y="16" width="54" height="8" rx="4" fill="#10B981"/>
      </svg>`
  };
  return map[id] || map.p5_3a;
}

export function renderBadgeSVG(badgeId, unlocked = true) {
  const palette = {
    'lunar-arrival': { ring: '#38BDF8', title: 'LUNAR ARRIVAL', icon: 'rocket' },
    'energy-commander': { ring: '#FBBF24', title: 'ENERGY COMMANDER', icon: 'bolt' },
    'radiation-guardian': { ring: '#F59E0B', title: 'RADIATION GUARDIAN', icon: 'shield' },
    'sustainable-explorer': { ring: '#10B981', title: 'SUSTAINABLE EXPLORER', icon: 'leaf' },
    'mission-commander': { ring: '#22D3EE', title: 'MISSION COMMANDER', icon: 'star' }
  }[badgeId] || { ring: '#38BDF8', title: 'BADGE', icon: 'star' };

  const opacity = unlocked ? '1' : '0.35';
  const stroke = unlocked ? palette.ring : '#64748B';

  let centerGlyph = '';
  if (palette.icon === 'rocket') {
    centerGlyph = `
      <path d="M60 26 C70 38 70 58 60 72 C50 58 50 38 60 26 Z" fill="#F8FAFC"/>
      <circle cx="60" cy="46" r="5" fill="#0284C7"/>
      <polygon points="51,62 44,72 54,70" fill="#F59E0B"/>
      <polygon points="69,62 76,72 66,70" fill="#F59E0B"/>
    `;
  } else if (palette.icon === 'bolt') {
    centerGlyph = '<polygon points="64,25 46,55 59,55 54,79 75,47 61,47" fill="#FBBF24"/>';
  } else if (palette.icon === 'shield') {
    centerGlyph = `
      <path d="M60 27 L80 35 V51 C80 65 70 74 60 78 C50 74 40 65 40 51 V35 Z" fill="#F59E0B"/>
      <path d="M52 52 L58 58 L70 44" fill="none" stroke="#071124" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/>
    `;
  } else if (palette.icon === 'leaf') {
    centerGlyph = `
      <path d="M60 76 V46" stroke="#34D399" stroke-width="5" stroke-linecap="round"/>
      <path d="M60 54 C42 54 40 34 52 30 C60 28 60 44 60 54 Z" fill="#34D399"/>
      <path d="M60 48 C78 48 80 28 68 24 C60 22 60 38 60 48 Z" fill="#10B981"/>
    `;
  } else {
    centerGlyph = '<polygon points="60,24 68,43 88,45 72,58 77,78 60,67 43,78 48,58 32,45 52,43" fill="#22D3EE"/>';
  }

  return `
    <svg viewBox="0 0 120 120" class="badge-svg ${unlocked ? 'badge-pop' : ''}" opacity="${opacity}" role="img" aria-label="${palette.title} Badge">
      <polygon points="60,6 108,33 108,87 60,114 12,87 12,33" fill="#0B1933" stroke="${stroke}" stroke-width="5"/>
      <polygon points="60,14 100,37 100,83 60,106 20,83 20,37" fill="#13264A" stroke="${stroke}" stroke-width="1.5" opacity="0.9"/>
      ${centerGlyph}
    </svg>
  `;
}

export function renderLevelCardThumbnail(levelId) {
  if (levelId === 1) {
    return `
      <svg viewBox="0 0 320 140" class="level-thumb-svg" aria-hidden="true">
        <rect width="320" height="140" fill="#08142B"/>
        <circle cx="255" cy="36" r="18" fill="#0EA5E9"/>
        <path d="M244 31 Q255 24 267 34 Q256 44 245 38 Z" fill="#10B981"/>
        <ellipse cx="160" cy="135" rx="190" ry="42" fill="#475569"/>
        <ellipse cx="75" cy="118" rx="22" ry="7" fill="#334155"/>
        <polygon points="105,64 135,64 145,94 95,94" fill="#E2E8F0"/>
        <line x1="100" y1="94" x2="90" y2="112" stroke="#F59E0B" stroke-width="3"/>
        <line x1="140" y1="94" x2="150" y2="112" stroke="#F59E0B" stroke-width="3"/>
        <path d="M182 108 A46 38 0 0 1 274 108 Z" fill="#CBD5E1"/>
        <rect x="214" y="88" width="28" height="20" rx="4" fill="#22D3EE"/>
      </svg>`;
  }
  if (levelId === 2) {
    return `
      <svg viewBox="0 0 320 140" class="level-thumb-svg" aria-hidden="true">
        <rect width="320" height="140" fill="#08142B"/>
        <circle cx="52" cy="34" r="18" fill="#FBBF24"/>
        <ellipse cx="160" cy="135" rx="190" ry="42" fill="#475569"/>
        <polygon points="56,66 132,54 142,88 66,100" fill="#0284C7" stroke="#BAE6FD" stroke-width="2"/>
        <rect x="165" y="72" width="38" height="40" rx="6" fill="#1E293B" stroke="#10B981" stroke-width="2.5"/>
        <rect x="173" y="84" width="22" height="18" fill="#10B981"/>
        <path d="M220 110 A38 30 0 0 1 296 110 Z" fill="#CBD5E1"/>
        <line x1="142" y1="88" x2="165" y2="92" stroke="#FBBF24" stroke-width="3"/>
      </svg>`;
  }
  if (levelId === 3) {
    return `
      <svg viewBox="0 0 320 140" class="level-thumb-svg" aria-hidden="true">
        <rect width="320" height="140" fill="#161436"/>
        <circle cx="268" cy="34" r="22" fill="#F59E0B"/>
        <circle cx="268" cy="34" r="30" fill="none" stroke="#FBBF24" stroke-width="2" stroke-dasharray="4 4"/>
        <ellipse cx="160" cy="135" rx="190" ry="42" fill="#475569"/>
        <rect x="52" y="66" width="90" height="46" rx="12" fill="#64748B" stroke="#F59E0B" stroke-width="3"/>
        <rect x="78" y="80" width="38" height="32" rx="4" fill="#0F172A"/>
        <line x1="205" y1="108" x2="205" y2="70" stroke="#CBD5E1" stroke-width="4"/>
        <path d="M188 72 Q205 56 222 72" fill="none" stroke="#22D3EE" stroke-width="3"/>
      </svg>`;
  }
  if (levelId === 4) {
    return `
      <svg viewBox="0 0 320 140" class="level-thumb-svg" aria-hidden="true">
        <rect width="320" height="140" fill="#08142B"/>
        <circle cx="268" cy="32" r="16" fill="#0EA5E9"/>
        <ellipse cx="160" cy="135" rx="190" ry="42" fill="#475569"/>
        <path d="M60 110 A58 46 0 0 1 176 110 Z" fill="#064E3B" stroke="#34D399" stroke-width="3"/>
        <circle cx="96" cy="96" r="9" fill="#34D399"/>
        <circle cx="118" cy="92" r="11" fill="#10B981"/>
        <circle cx="140" cy="97" r="8" fill="#34D399"/>
        <line x1="226" y1="108" x2="226" y2="68" stroke="#E2E8F0" stroke-width="4"/>
        <path d="M208 72 Q226 52 244 72" fill="#94A3B8" stroke="#22D3EE" stroke-width="2"/>
      </svg>`;
  }
  return `
    <svg viewBox="0 0 320 140" class="level-thumb-svg" aria-hidden="true">
      <rect width="320" height="140" fill="#071124"/>
      <circle cx="60" cy="28" r="14" fill="#FBBF24"/>
      <circle cx="268" cy="30" r="16" fill="#0EA5E9"/>
      <ellipse cx="160" cy="135" rx="190" ry="42" fill="#475569"/>
      <path d="M48 110 A36 28 0 0 1 120 110 Z" fill="#065F46" stroke="#34D399" stroke-width="2"/>
      <path d="M126 110 A44 36 0 0 1 214 110 Z" fill="#CBD5E1" stroke="#22D3EE" stroke-width="2.5"/>
      <rect x="226" y="78" width="44" height="32" rx="6" fill="#64748B" stroke="#F59E0B" stroke-width="2"/>
      <rect x="148" y="96" width="26" height="14" rx="4" fill="#F59E0B"/>
    </svg>`;
}

export function renderMissionSceneSVG({
  levelId,
  challenge,
  characterId,
  expression,
  resources,
  donkiInfo,
  activeHotspot,
  selectedOptionId,
  appliedEffect
}) {
  const o2Color = resources.oxygen >= 50 ? '#22D3EE' : resources.oxygen >= 30 ? '#F59E0B' : '#F43F5E';
  const h2oColor = resources.water >= 50 ? '#38BDF8' : resources.water >= 30 ? '#F59E0B' : '#F43F5E';
  const energyColor = resources.energy >= 50 ? '#10B981' : resources.energy >= 30 ? '#F59E0B' : '#F43F5E';
  const shieldColor = resources.radiationShield >= 50 ? '#F59E0B' : '#F43F5E';
  const foodScale = Math.max(0.6, Math.min(1.25, resources.food / 70));

  let astroX = challenge.astroX || 610;
  let astroY = 188;
  let astroPose = appliedEffect ? 'celebrating' : challenge.astroPose || 'idle';

  if (appliedEffect === 'shelter-enter' || appliedEffect === 'shelter-boost' || appliedEffect === 'safety-hold') {
    astroX = 278;
    astroY = 204;
  } else if (appliedEffect === 'oxygen-eva') {
    astroX = 152;
    astroPose = 'walking';
  } else if (appliedEffect === 'greenhouse-water' || appliedEffect === 'greenhouse-lights') {
    astroX = 250;
  } else if (appliedEffect === 'final-science') {
    astroX = 630;
    astroPose = 'walking';
  }

  const astronautSVG = renderAstronautSVG(characterId, {
    expression,
    pose: astroPose,
    className: 'scene-astronaut-svg',
    ariaLabel: 'Selected child astronaut inside lunar outpost'
  });

  const stars = `
    <circle cx="48" cy="36" r="2" fill="#E2E8F0"/>
    <circle cx="115" cy="70" r="1.6" fill="#22D3EE"/>
    <circle cx="210" cy="32" r="2.2" fill="#F8FAFC"/>
    <circle cx="310" cy="54" r="1.8" fill="#BAE6FD"/>
    <circle cx="430" cy="28" r="2" fill="#F8FAFC"/>
    <circle cx="520" cy="64" r="1.5" fill="#FDE68A"/>
    <circle cx="620" cy="40" r="2.2" fill="#E2E8F0"/>
    <circle cx="780" cy="52" r="2" fill="#F8FAFC"/>
    <circle cx="820" cy="96" r="1.6" fill="#22D3EE"/>
  `;

  const earth = `
    <g class="scene-hotspot" data-inspect="earth" tabindex="0" role="button" aria-label="Inspect Earth in the lunar sky">
      <circle cx="775" cy="78" r="36" fill="#0284C7" stroke="#7DD3FC" stroke-width="2.5"/>
      <path d="M754 66 Q774 52 794 70 Q786 88 762 84 Z" fill="#10B981"/>
      <path d="M756 96 Q775 91 791 100" fill="none" stroke="#F8FAFC" stroke-width="3" stroke-linecap="round" opacity="0.8"/>
      <text x="775" y="128" text-anchor="middle" fill="#BAE6FD" font-size="11" font-weight="700">EARTH</text>
    </g>
  `;

  const lunarGround = `
    <ellipse cx="430" cy="398" rx="520" ry="105" fill="#334155"/>
    <ellipse cx="430" cy="412" rx="520" ry="92" fill="#475569"/>
    <ellipse cx="110" cy="346" rx="46" ry="12" fill="#1E293B"/>
    <ellipse cx="715" cy="354" rx="60" ry="15" fill="#1E293B"/>
    <ellipse cx="465" cy="368" rx="38" ry="10" fill="#334155"/>
    <polygon points="150,350 172,334 192,350" fill="#64748B"/>
    <polygon points="620,360 638,346 654,360" fill="#64748B"/>
  `;

  let environmentLayer = '';

  if (levelId === 1) {
    const o2Active = challenge.id === '1.1' || appliedEffect?.startsWith('oxygen');
    const h2oActive = challenge.id === '1.2' || appliedEffect?.startsWith('water');
    const alertActive = challenge.id === '1.3' && !appliedEffect;

    environmentLayer = `
      <g class="scene-hotspot" data-inspect="lander" tabindex="0" role="button" aria-label="Inspect Lunar Lander">
        <polygon points="72,216 138,216 156,272 54,272" fill="#E2E8F0" stroke="#475569" stroke-width="2.5"/>
        <rect x="82" y="186" width="46" height="30" rx="6" fill="#F59E0B"/>
        <line x1="66" y1="272" x2="48" y2="318" stroke="#CBD5E1" stroke-width="5"/>
        <line x1="144" y1="272" x2="162" y2="318" stroke="#CBD5E1" stroke-width="5"/>
        <rect x="38" y="314" width="22" height="7" rx="3" fill="#F59E0B"/>
        <rect x="150" y="314" width="22" height="7" rx="3" fill="#F59E0B"/>
        <text x="105" y="335" text-anchor="middle" fill="#E2E8F0" font-size="11" font-weight="700">LANDER</text>
      </g>

      <g class="scene-hotspot" data-inspect="solar-array" tabindex="0" role="button" aria-label="Inspect Lander Solar Panel">
        <polygon points="565,248 648,236 658,274 575,286" fill="#0284C7" stroke="#BAE6FD" stroke-width="2"/>
        <line x1="612" y1="280" x2="612" y2="316" stroke="#94A3B8" stroke-width="5"/>
      </g>

      <g class="scene-hotspot ${o2Active ? 'scene-focus-ring' : ''}" data-inspect="oxygen-tank" tabindex="0" role="button" aria-label="Inspect Oxygen Supply Tanks">
        <rect x="198" y="220" width="38" height="86" rx="14" fill="#0F172A" stroke="${o2Active ? '#22D3EE' : '#94A3B8'}" stroke-width="${o2Active ? 4 : 2}"/>
        <rect x="204" y="${226 + (100 - resources.oxygen) * 0.72}" width="26" height="${Math.max(8, resources.oxygen * 0.72)}" rx="6" fill="${o2Color}" class="tank-level-transition"/>
        <text x="217" y="324" text-anchor="middle" fill="#A5F3FC" font-size="11" font-weight="700">O2 ${resources.oxygen}%</text>
      </g>

      <g class="scene-hotspot ${h2oActive ? 'scene-focus-ring' : ''}" data-inspect="water-tank" tabindex="0" role="button" aria-label="Inspect Water Containers and Recycler">
        <rect x="248" y="226" width="36" height="80" rx="10" fill="#0F172A" stroke="${h2oActive ? '#38BDF8' : '#94A3B8'}" stroke-width="${h2oActive ? 4 : 2}"/>
        <rect x="253" y="${232 + (100 - resources.water) * 0.66}" width="26" height="${Math.max(8, resources.water * 0.66)}" rx="5" fill="${h2oColor}" class="tank-level-transition"/>
        <rect x="288" y="264" width="24" height="42" rx="5" fill="#1E293B" stroke="#38BDF8" stroke-width="2"/>
        <circle cx="300" cy="285" r="5" fill="${appliedEffect === 'water-conserve' ? '#10B981' : '#38BDF8'}"/>
        <text x="275" y="324" text-anchor="middle" fill="#BAE6FD" font-size="11" font-weight="700">H2O ${resources.water}%</text>
      </g>

      <g class="scene-hotspot ${challenge.id === '1.3' ? 'scene-focus-ring' : ''}" data-inspect="habitat" tabindex="0" role="button" aria-label="Inspect Lunar Habitat Module">
        <path d="M352 312 A112 92 0 0 1 576 312 Z" fill="#CBD5E1" stroke="${alertActive ? '#F43F5E' : '#334155'}" stroke-width="3.5"/>
        <rect x="410" y="242" width="110" height="46" rx="8" fill="#0F172A" stroke="#22D3EE" stroke-width="2.5"/>
        <rect x="422" y="252" width="32" height="26" rx="4" fill="#38BDF8" opacity="0.88"/>
        <rect x="462" y="252" width="46" height="26" rx="4" fill="#1E293B"/>
        <circle cx="485" cy="265" r="8" fill="${alertActive ? '#F43F5E' : '#10B981'}" class="${alertActive ? 'calm-beacon' : ''}"/>
        <rect x="444" y="288" width="44" height="24" fill="#475569"/>
        <text x="464" y="206" text-anchor="middle" fill="#F8FAFC" font-size="12" font-weight="700">LUNAR HABITAT</text>
      </g>

      <rect x="676" y="274" width="52" height="38" rx="6" fill="#F59E0B" stroke="#0F172A" stroke-width="2"/>
      <text x="702" y="297" text-anchor="middle" fill="#071124" font-size="10" font-weight="800">SUPPLY</text>
    `;
  } else if (levelId === 2) {
    const solarGlow = appliedEffect === 'solar-collect' || selectedOptionId === 'collect-sunlight' ? '#FBBF24' : '#BAE6FD';
    const habitatPowerOn = appliedEffect === 'power-habitat' || appliedEffect === 'survival-protect' || challenge.id !== '2.3';
    const labPowerOn = appliedEffect === 'power-science' || appliedEffect === 'science-drill' || challenge.id === '2.3';

    environmentLayer = `
      <circle cx="96" cy="70" r="32" fill="#FBBF24" class="sun-glow"/>
      <line x1="128" y1="92" x2="176" y2="154" stroke="#FDE68A" stroke-width="3" stroke-dasharray="6 5" class="energy-flow-line"/>
      <line x1="112" y1="106" x2="146" y2="164" stroke="#FDE68A" stroke-width="3" stroke-dasharray="6 5" class="energy-flow-line"/>

      <g class="scene-hotspot ${challenge.id === '2.1' ? 'scene-focus-ring' : ''}" data-inspect="solar-array" tabindex="0" role="button" aria-label="Inspect Solar Array">
        <polygon points="72,210 214,174 230,230 88,266" fill="#0284C7" stroke="${solarGlow}" stroke-width="3.5"/>
        <line x1="142" y1="192" x2="158" y2="248" stroke="#E0F2FE" stroke-width="2"/>
        <line x1="80" y1="238" x2="222" y2="202" stroke="#E0F2FE" stroke-width="2"/>
        <line x1="152" y1="248" x2="152" y2="314" stroke="#94A3B8" stroke-width="8"/>
        <text x="152" y="334" text-anchor="middle" fill="#FDE68A" font-size="11" font-weight="700">SOLAR ARRAY</text>
      </g>

      <path d="M230 264 L296 264" stroke="${energyColor}" stroke-width="6" stroke-dasharray="10 6" class="energy-flow-line"/>

      <g class="scene-hotspot ${challenge.id === '2.2' ? 'scene-focus-ring' : ''}" data-inspect="battery-bank" tabindex="0" role="button" aria-label="Inspect Outpost Battery Storage">
        <rect x="298" y="210" width="76" height="102" rx="10" fill="#0F172A" stroke="${energyColor}" stroke-width="3.5"/>
        <rect x="312" y="${224 + (100 - resources.energy) * 0.7}" width="48" height="${Math.max(8, resources.energy * 0.7)}" rx="5" fill="${energyColor}" class="tank-level-transition"/>
        <text x="336" y="330" text-anchor="middle" fill="#A7F3D0" font-size="11" font-weight="700">BATTERY ${resources.energy}%</text>
      </g>

      <path d="M374 264 L452 264" stroke="${habitatPowerOn ? energyColor : '#475569'}" stroke-width="6" stroke-dasharray="10 6" class="${habitatPowerOn ? 'energy-flow-line' : ''}"/>
      <path d="M374 282 L638 282" stroke="${labPowerOn ? '#FBBF24' : '#475569'}" stroke-width="5" stroke-dasharray="8 6" class="${labPowerOn ? 'energy-flow-line' : ''}"/>

      <g class="scene-hotspot" data-inspect="habitat" tabindex="0" role="button" aria-label="Inspect Habitat Life Support Hub">
        <path d="M446 312 A88 72 0 0 1 622 312 Z" fill="#CBD5E1" stroke="${habitatPowerOn ? '#10B981' : '#334155'}" stroke-width="3"/>
        <rect x="494" y="252" width="80" height="40" rx="6" fill="#0F172A" stroke="#22D3EE" stroke-width="2"/>
        <circle cx="516" cy="272" r="8" fill="${habitatPowerOn ? '#10B981' : '#475569'}"/>
        <circle cx="552" cy="272" r="8" fill="${habitatPowerOn ? '#22D3EE' : '#475569'}"/>
        <text x="534" y="226" text-anchor="middle" fill="#F8FAFC" font-size="11" font-weight="700">HABITAT SYSTEMS</text>
      </g>

      <g class="scene-hotspot ${challenge.id === '2.3' ? 'scene-focus-ring' : ''}" data-inspect="solar-array" tabindex="0" role="button" aria-label="Inspect Science Ice-Drill Lab">
        <rect x="642" y="242" width="96" height="70" rx="10" fill="#1E293B" stroke="${labPowerOn ? '#FBBF24' : '#64748B'}" stroke-width="3"/>
        <polygon points="682,256 698,256 690,296" fill="${labPowerOn ? '#FBBF24' : '#94A3B8'}"/>
        <text x="690" y="232" text-anchor="middle" fill="#FDE68A" font-size="11" font-weight="700">SCIENCE LAB</text>
      </g>
    `;
  } else if (levelId === 3) {
    const sunActive = donkiInfo && donkiInfo.hasActiveEvents;
    const sunColor = sunActive ? '#F97316' : '#FBBF24';
    const isSheltered = appliedEffect === 'shelter-enter' || appliedEffect === 'shelter-boost' || appliedEffect === 'safety-hold';
    const donkiShort = sunActive ? `${donkiInfo.events[0].type} ALERT` : 'QUIET SUN';

    environmentLayer = `
      <g class="scene-hotspot" data-inspect="solar-monitor" tabindex="0" role="button" aria-label="Inspect Solar Activity">
        <circle cx="108" cy="76" r="36" fill="${sunColor}" class="sun-glow"/>
        <circle cx="108" cy="76" r="50" fill="none" stroke="${sunColor}" stroke-width="2.5" stroke-dasharray="7 6" class="energy-flow-line"/>
        <path d="M156 96 Q225 125 278 156" fill="none" stroke="${sunColor}" stroke-width="3" stroke-dasharray="6 5" class="energy-flow-line"/>
        <text x="108" y="142" text-anchor="middle" fill="#FDE68A" font-size="11" font-weight="700">SOLAR WEATHER</text>
      </g>

      <g class="scene-hotspot ${challenge.id === '3.2' ? 'scene-focus-ring' : ''}" data-inspect="radiation-shelter" tabindex="0" role="button" aria-label="Inspect Reinforced Radiation Shelter">
        <path d="M192 314 L226 200 H386 L420 314 Z" fill="#475569" stroke="${shieldColor}" stroke-width="4"/>
        <rect x="242" y="220" width="128" height="94" rx="8" fill="#0F172A" stroke="#94A3B8" stroke-width="2.5"/>
        <rect x="250" y="228" width="${isSheltered ? 112 : 44}" height="82" rx="4" fill="#334155" stroke="${appliedEffect === 'shelter-boost' ? '#38BDF8' : shieldColor}" stroke-width="3" class="shelter-door-transition"/>
        <text x="306" y="186" text-anchor="middle" fill="#FEF3C7" font-size="12" font-weight="700">RADIATION SHELTER (${resources.radiationShield}%)</text>
      </g>

      <g class="scene-hotspot ${challenge.id !== '3.2' ? 'scene-focus-ring' : ''}" data-inspect="weather-radar" tabindex="0" role="button" aria-label="Inspect Space Weather Monitoring Station">
        <rect x="468" y="218" width="132" height="94" rx="10" fill="#0F172A" stroke="#22D3EE" stroke-width="3"/>
        <path d="M482 266 L502 246 L522 258 L544 234 L568 250 L586 242" fill="none" stroke="${sunColor}" stroke-width="3" stroke-linecap="round"/>
        <text x="534" y="294" text-anchor="middle" fill="#A5F3FC" font-size="10" font-weight="700">DONKI: ${donkiShort}</text>
        <line x1="534" y1="218" x2="534" y2="174" stroke="#CBD5E1" stroke-width="4"/>
        <circle cx="534" cy="170" r="7" fill="${sunColor}" class="calm-beacon"/>
      </g>

      <path d="M635 314 A58 48 0 0 1 751 314 Z" fill="#CBD5E1" stroke="#334155" stroke-width="2.5"/>
    `;
  } else if (levelId === 4) {
    const lightsBright = appliedEffect === 'greenhouse-lights' || selectedOptionId === 'greenhouse-lighting';
    const waterFlow = appliedEffect === 'greenhouse-water' || selectedOptionId === 'water-care-plants';
    const signalActive = challenge.id === '4.3' || appliedEffect?.startsWith('comms');

    environmentLayer = `
      <g class="scene-hotspot ${challenge.id === '4.1' ? 'scene-focus-ring' : ''}" data-inspect="greenhouse" tabindex="0" role="button" aria-label="Inspect Lunar Greenhouse">
        <path d="M98 314 A148 118 0 0 1 394 314 Z" fill="#064E3B" stroke="#34D399" stroke-width="3.5"/>
        ${lightsBright ? '<polygon points="155,215 337,215 365,286 127,286" fill="#E879F9" opacity="0.22"/>' : ''}
        <rect x="148" y="208" width="196" height="8" rx="4" fill="${lightsBright ? '#E879F9' : '#64748B'}"/>
        <line x1="128" y1="274" x2="364" y2="274" stroke="${waterFlow ? '#38BDF8' : '#0284C7'}" stroke-width="4" stroke-dasharray="6 5" class="${waterFlow ? 'energy-flow-line' : ''}"/>
        <rect x="132" y="286" width="228" height="26" rx="4" fill="#78350F"/>

        <g transform="translate(174, 286) scale(${foodScale * 0.8})">
          <line x1="0" y1="0" x2="0" y2="-28" stroke="#34D399" stroke-width="4"/>
          <circle cx="-9" cy="-24" r="9" fill="#10B981"/>
          <circle cx="9" cy="-22" r="9" fill="#34D399"/>
        </g>
        <g transform="translate(246, 286) scale(${foodScale})">
          <line x1="0" y1="0" x2="0" y2="-42" stroke="#34D399" stroke-width="4"/>
          <circle cx="-13" cy="-38" r="13" fill="#34D399"/>
          <circle cx="13" cy="-35" r="12" fill="#10B981"/>
        </g>
        <g transform="translate(318, 286) scale(${foodScale * 1.1})">
          <line x1="0" y1="0" x2="0" y2="-48" stroke="#34D399" stroke-width="4"/>
          <circle cx="-14" cy="-42" r="14" fill="#10B981"/>
          <circle cx="14" cy="-40" r="13" fill="#34D399"/>
          <circle cx="0" cy="-54" r="11" fill="#6EE7B7"/>
        </g>
        <text x="246" y="182" text-anchor="middle" fill="#A7F3D0" font-size="12" font-weight="700">LUNAR GREENHOUSE (FOOD ${resources.food}%)</text>
      </g>

      <g class="scene-hotspot ${challenge.id === '4.2' ? 'scene-focus-ring' : ''}" data-inspect="greenhouse" tabindex="0" role="button" aria-label="Inspect Stored Food Crates">
        <rect x="424" y="246" width="76" height="66" rx="8" fill="#1E293B" stroke="#F59E0B" stroke-width="3"/>
        <rect x="434" y="256" width="56" height="20" rx="3" fill="#F8FAFC"/>
        <rect x="434" y="282" width="56" height="20" rx="3" fill="#CBD5E1"/>
        <text x="462" y="236" text-anchor="middle" fill="#FDE68A" font-size="11" font-weight="700">FOOD CRATES</text>
      </g>

      <g class="scene-hotspot ${signalActive ? 'scene-focus-ring' : ''}" data-inspect="antenna" tabindex="0" role="button" aria-label="Inspect Deep-Space Communication Antenna">
        <line x1="585" y1="314" x2="585" y2="212" stroke="#CBD5E1" stroke-width="6"/>
        <path d="M542 218 Q585 166 628 218" fill="#1E293B" stroke="#22D3EE" stroke-width="3"/>
        <line x1="585" y1="198" x2="606" y2="174" stroke="#F8FAFC" stroke-width="3"/>
        <path d="M622 162 Q690 128 746 100" fill="none" stroke="${signalActive ? '#FBBF24' : '#22D3EE'}" stroke-width="3.5" stroke-dasharray="8 6" class="energy-flow-line"/>
        <rect x="524" y="320" width="132" height="24" rx="6" fill="#0F172A" stroke="#22D3EE" stroke-width="1.5"/>
        <text x="590" y="336" text-anchor="middle" fill="#A5F3FC" font-size="10" font-weight="700">SIGNAL DELAY ~2.6s</text>
      </g>
    `;
  } else {
    const evId = challenge.eventMeta ? challenge.eventMeta.id : '';
    const dustOverlay = evId === 'sim-dust-solar' && !appliedEffect;
    const waterWarn = evId === 'sim-water-valve' && !appliedEffect;
    const lampWarn = evId === 'sim-greenhouse-lamp' && !appliedEffect;
    const solarAlert = evId === 'nasa-donki-informed' && !appliedEffect;

    environmentLayer = `
      <circle cx="88" cy="64" r="28" fill="${solarAlert ? '#F97316' : '#FBBF24'}" class="sun-glow"/>
      <g class="scene-hotspot" data-inspect="solar-array" tabindex="0" role="button" aria-label="Inspect Solar Array">
        <polygon points="48,236 150,214 160,256 58,278" fill="${dustOverlay ? '#78350F' : '#0284C7'}" stroke="#BAE6FD" stroke-width="2.5"/>
        <line x1="104" y1="266" x2="104" y2="314" stroke="#94A3B8" stroke-width="5"/>
        <text x="104" y="332" text-anchor="middle" fill="#FDE68A" font-size="10" font-weight="700">${dustOverlay ? 'DUST ALERT' : 'SOLAR'}</text>
      </g>

      <g class="scene-hotspot" data-inspect="greenhouse" tabindex="0" role="button" aria-label="Inspect Greenhouse Dome">
        <path d="M174 314 A70 56 0 0 1 314 314 Z" fill="#065F46" stroke="${lampWarn ? '#F43F5E' : '#34D399'}" stroke-width="3"/>
        <circle cx="222" cy="292" r="10" fill="#10B981"/>
        <circle cx="244" cy="284" r="13" fill="#34D399"/>
        <circle cx="268" cy="292" r="10" fill="#10B981"/>
        <text x="244" y="332" text-anchor="middle" fill="#A7F3D0" font-size="10" font-weight="700">${waterWarn ? 'WATER SLOW' : 'GREENHOUSE'}</text>
      </g>

      <g class="scene-hotspot" data-inspect="habitat" tabindex="0" role="button" aria-label="Inspect Central Command Habitat">
        <path d="M328 314 A98 82 0 0 1 524 314 Z" fill="#CBD5E1" stroke="#22D3EE" stroke-width="3.5"/>
        <rect x="382" y="258" width="90" height="36" rx="6" fill="#0F172A" stroke="#22D3EE" stroke-width="2"/>
        <circle cx="406" cy="276" r="7" fill="${o2Color}"/>
        <circle cx="427" cy="276" r="7" fill="${energyColor}"/>
        <circle cx="448" cy="276" r="7" fill="${shieldColor}"/>
        <text x="426" y="220" text-anchor="middle" fill="#F8FAFC" font-size="11" font-weight="700">COMMAND HUB</text>
      </g>

      <g class="scene-hotspot" data-inspect="radiation-shelter" tabindex="0" role="button" aria-label="Inspect Radiation Shelter">
        <path d="M538 314 L554 252 H626 L642 314 Z" fill="#475569" stroke="${solarAlert ? '#F97316' : '#F59E0B'}" stroke-width="3"/>
        <rect x="572" y="270" width="36" height="44" rx="4" fill="#1E293B"/>
      </g>

      <g class="scene-hotspot" data-inspect="antenna" tabindex="0" role="button" aria-label="Inspect Communication Dish">
        <line x1="668" y1="314" x2="668" y2="238" stroke="#CBD5E1" stroke-width="5"/>
        <path d="M644 242 Q668 214 692 242" fill="#1E293B" stroke="#22D3EE" stroke-width="2.5"/>
        <path d="M684 218 Q728 168 760 116" fill="none" stroke="#22D3EE" stroke-width="2.5" stroke-dasharray="6 5" class="energy-flow-line"/>
      </g>

      <g class="scene-hotspot" data-inspect="rover" tabindex="0" role="button" aria-label="Inspect Lunar Rover">
        <rect x="698" y="274" width="72" height="26" rx="6" fill="#F59E0B" stroke="#0F172A" stroke-width="2"/>
        <circle cx="714" cy="304" r="10" fill="#1E293B" stroke="#CBD5E1" stroke-width="2.5"/>
        <circle cx="754" cy="304" r="10" fill="#1E293B" stroke="#CBD5E1" stroke-width="2.5"/>
        <line x1="726" y1="274" x2="726" y2="254" stroke="#E2E8F0" stroke-width="3"/>
        <circle cx="726" cy="250" r="4.5" fill="#22D3EE"/>
        <text x="734" y="332" text-anchor="middle" fill="#FDE68A" font-size="10" font-weight="700">ROVER</text>
      </g>
    `;
  }

  const statusPill = activeHotspot
    ? `<rect x="18" y="14" width="540" height="36" rx="8" fill="#0F172A" stroke="#22D3EE" stroke-width="2" opacity="0.94"/>
       <text x="32" y="36" fill="#E0F2FE" font-size="12" font-weight="700">${activeHotspot}</text>`
    : appliedEffect
      ? `<rect x="18" y="14" width="460" height="34" rx="8" fill="#064E3B" stroke="#10B981" stroke-width="2" opacity="0.94"/>
         <text x="32" y="35" fill="#ECFDF5" font-size="12" font-weight="700">Decision Applied: Outpost systems updated!</text>`
      : '';

  return `
    <svg viewBox="0 0 860 390" class="mission-scene-svg" role="img" aria-label="Interactive 2D lunar mission environment for Level ${levelId}">
      <defs>
        <linearGradient id="spaceSky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#040B1A"/>
          <stop offset="100%" stop-color="#0E1E3F"/>
        </linearGradient>
      </defs>
      <rect width="860" height="390" fill="url(#spaceSky)"/>
      ${stars}
      ${earth}
      ${lunarGround}
      ${environmentLayer}
      <g class="astro-stage-actor" transform="translate(${astroX}, ${astroY}) scale(0.64)">
        <g class="astro-idle-bob">
          ${astronautSVG}
        </g>
      </g>
      ${statusPill}
    </svg>
  `;
}
