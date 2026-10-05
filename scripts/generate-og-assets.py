import os
import subprocess

og_svg = '''<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0a0d0b"/>
      <stop offset="50%" stop-color="#0f1411"/>
      <stop offset="100%" stop-color="#141a16"/>
    </linearGradient>
    <linearGradient id="accentGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#346316"/>
      <stop offset="100%" stop-color="#559128"/>
    </linearGradient>
    <radialGradient id="glow" cx="80%" cy="20%" r="60%">
      <stop offset="0%" stop-color="#346316" stop-opacity="0.3"/>
      <stop offset="100%" stop-color="#0a0d0b" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <!-- Background Base & Glow -->
  <rect width="1200" height="630" fill="url(#bgGrad)"/>
  <rect width="1200" height="630" fill="url(#glow)"/>

  <!-- Inner Elevated Card Container -->
  <rect x="40" y="40" width="1120" height="550" rx="20" fill="#111613" stroke="#253028" stroke-width="1.5"/>

  <!-- Header Section: Avatar Monogram & Identity -->
  <g transform="translate(90, 85)">
    <rect width="64" height="64" rx="14" fill="url(#accentGrad)"/>
    <text x="32" y="43" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif" font-size="26" font-weight="800" fill="#ffffff" text-anchor="middle">SM</text>
    <text x="86" y="32" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif" font-size="28" font-weight="700" fill="#f4f6f4">Sheesh Mirza</text>
    <text x="86" y="56" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif" font-size="16" font-weight="500" fill="#7a8d80">Software Engineer · AI Systems Builder · Creator</text>
  </g>

  <!-- Domain Badge Top Right -->
  <g transform="translate(960, 95)">
    <rect width="150" height="40" rx="8" fill="#1b231d" stroke="#346316" stroke-width="1"/>
    <circle cx="24" cy="20" r="5" fill="#559128"/>
    <text x="38" y="25" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif" font-size="15" font-weight="600" fill="#e8ebe9">smirza.in</text>
  </g>

  <!-- Main Value Proposition & Priorities -->
  <g transform="translate(90, 215)">
    <text x="0" y="35" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif" font-size="44" font-weight="800" fill="#ffffff" letter-spacing="-0.5">Software Engineering &amp; System Designing</text>
    <text x="0" y="90" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif" font-size="44" font-weight="800" fill="#559128" letter-spacing="-0.5">Artificial Intelligence &amp; Intelligent Automation</text>
    <text x="0" y="145" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif" font-size="22" font-weight="400" fill="#9db0a3">Architectural notes, problem discovery, startups, and behavioral psychology.</text>
  </g>

  <!-- Pillar Pills Row -->
  <g transform="translate(90, 420)">
    <!-- Pill 1 -->
    <rect x="0" y="0" width="235" height="38" rx="6" fill="#1a221c" stroke="#2f3e33" stroke-width="1"/>
    <text x="117" y="24" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif" font-size="13" font-weight="600" fill="#c3d1c7" text-anchor="middle">System Design &amp; Backend</text>

    <!-- Pill 2 -->
    <rect x="250" y="0" width="245" height="38" rx="6" fill="#1a221c" stroke="#2f3e33" stroke-width="1"/>
    <text x="372" y="24" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif" font-size="13" font-weight="600" fill="#c3d1c7" text-anchor="middle">AI Agents &amp; MCP Protocols</text>

    <!-- Pill 3 -->
    <rect x="510" y="0" width="210" height="38" rx="6" fill="#1a221c" stroke="#2f3e33" stroke-width="1"/>
    <text x="615" y="24" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif" font-size="13" font-weight="600" fill="#c3d1c7" text-anchor="middle">Startups &amp; Problem Solving</text>

    <!-- Pill 4 -->
    <rect x="735" y="0" width="230" height="38" rx="6" fill="#1a221c" stroke="#2f3e33" stroke-width="1"/>
    <text x="850" y="24" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif" font-size="13" font-weight="600" fill="#c3d1c7" text-anchor="middle">Human Psychology &amp; Habits</text>
  </g>

  <!-- Footer Subtle Strip -->
  <line x1="90" y1="495" x2="1110" y2="495" stroke="#212a23" stroke-width="1"/>
  <text x="90" y="525" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif" font-size="14" font-weight="500" fill="#66776b">Open Source Repositories · Medium Technical Essays · YouTube Video Essays</text>
  <text x="1110" y="525" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif" font-size="14" font-weight="600" fill="#559128" text-anchor="end">Official Portfolio &amp; Knowledge Base</text>
</svg>'''

with open("/tmp/og-master.svg", "w", encoding="utf-8") as f:
    f.write(og_svg)

icon_svg = '''<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#346316"/>
      <stop offset="100%" stop-color="#559128"/>
    </linearGradient>
  </defs>
  <rect width="64" height="64" rx="14" fill="url(#bg)"/>
  <text x="32" y="42" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif" font-size="26" font-weight="800" fill="#ffffff" text-anchor="middle">SM</text>
</svg>'''

with open("public/icon.svg", "w", encoding="utf-8") as f:
    f.write(icon_svg)

with open("/tmp/icon-master.svg", "w", encoding="utf-8") as f:
    f.write(icon_svg)

# Render OG card
subprocess.run(["qlmanage", "-t", "-s", "1200", "-o", "/tmp", "/tmp/og-master.svg"], check=True)
subprocess.run(["sips", "--cropToHeightWidth", "630", "1200", "/tmp/og-master.svg.png", "--out", "public/og-image.png"], check=True)

# Render icons
subprocess.run(["qlmanage", "-t", "-s", "512", "-o", "/tmp", "/tmp/icon-master.svg"], check=True)
subprocess.run(["sips", "-z", "180", "180", "/tmp/icon-master.svg.png", "--out", "public/apple-touch-icon.png"], check=True)
subprocess.run(["sips", "-z", "32", "32", "/tmp/icon-master.svg.png", "--out", "public/favicon.ico"], check=True)

print("Generated all branding and OpenGraph assets in public/")
