// QIS-Skills product catalog — reads data/skills-config.json for visibility & rendering.
(function () {
  'use strict';

  var DIAGRAMS = {
    'pipeline-node': function (step) {
      return '<svg viewBox="0 0 320 80" class="skill-diagram" aria-hidden="true">' +
        '<rect x="10" y="20" width="80" height="40" rx="8" fill="#1F3864" stroke="#E8B25A" stroke-width="2"/>' +
        '<text x="50" y="45" text-anchor="middle" fill="#E8B25A" font-size="12" font-family="monospace">Step ' + step + '</text>' +
        '<line x1="90" y1="40" x2="130" y2="40" stroke="#E8B25A" stroke-width="2" marker-end="url(#arrow)"/>' +
        '<rect x="130" y="20" width="80" height="40" rx="8" fill="#0D1629" stroke="rgba(238,242,248,0.3)" stroke-width="1"/>' +
        '<text x="170" y="45" text-anchor="middle" fill="#B7C2D6" font-size="11" font-family="monospace">Output</text>' +
        '<line x1="210" y1="40" x2="250" y2="40" stroke="#E8B25A" stroke-width="2" marker-end="url(#arrow)"/>' +
        '<rect x="250" y="20" width="60" height="40" rx="8" fill="#0D1629" stroke="rgba(238,242,248,0.3)" stroke-width="1"/>' +
        '<text x="280" y="45" text-anchor="middle" fill="#B7C2D6" font-size="11" font-family="monospace">Next</text>' +
        '<defs><marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6" fill="#E8B25A"/></marker></defs>' +
        '</svg>';
    },
    'playwright-flow': function () {
      return '<svg viewBox="0 0 400 120" class="skill-diagram" aria-hidden="true">' +
        '<rect x="10" y="40" width="70" height="40" rx="6" fill="#1F3864" stroke="#E8B25A"/><text x="45" y="65" text-anchor="middle" fill="#EEF2F8" font-size="10">Story</text>' +
        '<line x1="80" y1="60" x2="110" y2="60" stroke="#E8B25A" stroke-width="2"/>' +
        '<rect x="110" y="40" width="70" height="40" rx="6" fill="#1F3864" stroke="#E8B25A"/><text x="145" y="65" text-anchor="middle" fill="#EEF2F8" font-size="10">Locators</text>' +
        '<line x1="180" y1="60" x2="210" y2="60" stroke="#E8B25A" stroke-width="2"/>' +
        '<rect x="210" y="40" width="70" height="40" rx="6" fill="#1F3864" stroke="#E8B25A"/><text x="245" y="65" text-anchor="middle" fill="#EEF2F8" font-size="10">POM</text>' +
        '<line x1="280" y1="60" x2="310" y2="60" stroke="#E8B25A" stroke-width="2"/>' +
        '<rect x="310" y="40" width="80" height="40" rx="6" fill="#E8B25A" stroke="#E8B25A"/><text x="350" y="65" text-anchor="middle" fill="#0D1629" font-size="10" font-weight="bold">Playwright</text>' +
        '<text x="200" y="20" text-anchor="middle" fill="#B7C2D6" font-size="10" font-family="monospace">Requirements → Executable Suite</text>' +
        '</svg>';
    },
    'gate-checklist': function () {
      var gates = ['Assertions', 'Determinism', 'Data', 'Traceability', 'Coverage', 'Scope'];
      var svg = '<svg viewBox="0 0 360 100" class="skill-diagram" aria-hidden="true">';
      gates.forEach(function (g, i) {
        var x = 10 + (i % 3) * 115;
        var y = 10 + Math.floor(i / 3) * 45;
        svg += '<rect x="' + x + '" y="' + y + '" width="105" height="32" rx="6" fill="#1F3864" stroke="#E8B25A" stroke-width="1.5"/>' +
          '<text x="' + (x + 52) + '" y="' + (y + 20) + '" text-anchor="middle" fill="#EEF2F8" font-size="9">' + g + '</text>';
      });
      return svg + '</svg>';
    },
    'evidence-loop': function () {
      return '<svg viewBox="0 0 380 100" class="skill-diagram" aria-hidden="true">' +
        '<circle cx="50" cy="50" r="30" fill="#1F3864" stroke="#E8B25A" stroke-width="2"/><text x="50" y="54" text-anchor="middle" fill="#EEF2F8" font-size="9">Run</text>' +
        '<line x1="80" y1="50" x2="120" y2="50" stroke="#E8B25A" stroke-width="2"/>' +
        '<circle cx="150" cy="50" r="30" fill="#1F3864" stroke="#E8B25A" stroke-width="2"/><text x="150" y="54" text-anchor="middle" fill="#EEF2F8" font-size="9">Capture</text>' +
        '<line x1="180" y1="50" x2="220" y2="50" stroke="#E8B25A" stroke-width="2"/>' +
        '<circle cx="250" cy="50" r="30" fill="#1F3864" stroke="#E8B25A" stroke-width="2"/><text x="250" y="54" text-anchor="middle" fill="#EEF2F8" font-size="9">Upload</text>' +
        '<line x1="280" y1="50" x2="310" y2="50" stroke="#E8B25A" stroke-width="2"/>' +
        '<circle cx="340" cy="50" r="30" fill="#E8B25A" stroke="#E8B25A" stroke-width="2"/><text x="340" y="54" text-anchor="middle" fill="#0D1629" font-size="9">Link</text>' +
        '</svg>';
    },
    'triage-tree': function () {
      return '<svg viewBox="0 0 300 120" class="skill-diagram" aria-hidden="true">' +
        '<rect x="110" y="5" width="80" height="28" rx="6" fill="#E8B25A"/><text x="150" y="24" text-anchor="middle" fill="#0D1629" font-size="10" font-weight="bold">Issue</text>' +
        '<line x1="130" y1="33" x2="60" y2="55" stroke="#E8B25A"/><line x1="150" y1="33" x2="150" y2="55" stroke="#E8B25A"/><line x1="170" y1="33" x2="240" y2="55" stroke="#E8B25A"/>' +
        '<rect x="20" y="55" width="80" height="28" rx="6" fill="#1F3864" stroke="#E8B25A"/><text x="60" y="74" text-anchor="middle" fill="#EEF2F8" font-size="9">In-Sprint</text>' +
        '<rect x="110" y="55" width="80" height="28" rx="6" fill="#1F3864" stroke="#E8B25A"/><text x="150" y="74" text-anchor="middle" fill="#EEF2F8" font-size="9">Post-Sprint</text>' +
        '<rect x="200" y="55" width="80" height="28" rx="6" fill="#1F3864" stroke="#E8B25A"/><text x="240" y="74" text-anchor="middle" fill="#EEF2F8" font-size="9">Production</text>' +
        '<line x1="60" y1="83" x2="60" y2="95" stroke="#E8B25A"/><line x1="150" y1="83" x2="150" y2="95" stroke="#E8B25A"/><line x1="240" y1="83" x2="240" y2="95" stroke="#E8B25A"/>' +
        '<text x="60" y="112" text-anchor="middle" fill="#B7C2D6" font-size="8">Bug</text>' +
        '<text x="150" y="112" text-anchor="middle" fill="#B7C2D6" font-size="8">Defect</text>' +
        '<text x="240" y="112" text-anchor="middle" fill="#B7C2D6" font-size="8">Prod Issue</text>' +
        '</svg>';
    },
    'accessibility-audit': function () {
      return '<svg viewBox="0 0 340 90" class="skill-diagram" aria-hidden="true">' +
        '<rect x="10" y="25" width="90" height="40" rx="6" fill="#1F3864" stroke="#E8B25A"/><text x="55" y="50" text-anchor="middle" fill="#EEF2F8" font-size="9">HTML/JSX</text>' +
        '<line x1="100" y1="45" x2="130" y2="45" stroke="#E8B25A" stroke-width="2"/>' +
        '<rect x="130" y="25" width="80" height="40" rx="6" fill="#1F3864" stroke="#E8B25A"/><text x="170" y="50" text-anchor="middle" fill="#EEF2F8" font-size="9">TT v5.1</text>' +
        '<line x1="210" y1="45" x2="240" y2="45" stroke="#E8B25A" stroke-width="2"/>' +
        '<rect x="240" y="25" width="90" height="40" rx="6" fill="#E8B25A"/><text x="285" y="50" text-anchor="middle" fill="#0D1629" font-size="9" font-weight="bold">VPAT</text>' +
        '<text x="170" y="15" text-anchor="middle" fill="#B7C2D6" font-size="9" font-family="monospace">WCAG / Section 508 Audit</text>' +
        '</svg>';
    },
    'api-contract': function () {
      return '<svg viewBox="0 0 360 80" class="skill-diagram" aria-hidden="true">' +
        '<rect x="10" y="20" width="100" height="40" rx="6" fill="#1F3864" stroke="#E8B25A"/><text x="60" y="45" text-anchor="middle" fill="#EEF2F8" font-size="9">Endpoint</text>' +
        '<rect x="130" y="10" width="70" height="25" rx="4" fill="#0D1629" stroke="#4ade80"/><text x="165" y="27" text-anchor="middle" fill="#4ade80" font-size="8">Success</text>' +
        '<rect x="130" y="40" width="70" height="25" rx="4" fill="#0D1629" stroke="#f87171"/><text x="165" y="57" text-anchor="middle" fill="#f87171" font-size="8">Negative</text>' +
        '<rect x="210" y="25" width="70" height="30" rx="4" fill="#0D1629" stroke="#E8B25A"/><text x="245" y="45" text-anchor="middle" fill="#E8B25A" font-size="8">Security</text>' +
        '<line x1="110" y1="40" x2="130" y2="40" stroke="#E8B25A"/><line x1="200" y1="40" x2="280" y2="40" stroke="#E8B25A"/>' +
        '<rect x="280" y="20" width="70" height="40" rx="6" fill="#E8B25A"/><text x="315" y="45" text-anchor="middle" fill="#0D1629" font-size="9" font-weight="bold">MSTest</text>' +
        '</svg>';
    },
    'modernization-gates': function () {
      return '<svg viewBox="0 0 400 70" class="skill-diagram" aria-hidden="true">' +
        ['Intake', 'Feasibility', 'Runtime', 'Upgrade', 'Parity'].map(function (g, i) {
          return '<rect x="' + (10 + i * 78) + '" y="20" width="68" height="35" rx="6" fill="' + (i === 4 ? '#E8B25A' : '#1F3864') + '" stroke="#E8B25A" stroke-width="1.5"/>' +
            '<text x="' + (44 + i * 78) + '" y="42" text-anchor="middle" fill="' + (i === 4 ? '#0D1629' : '#EEF2F8') + '" font-size="8">' + g + '</text>' +
            (i < 4 ? '<line x1="' + (78 + i * 78) + '" y1="37" x2="' + (88 + i * 78) + '" y2="37" stroke="#E8B25A" stroke-width="2"/>' : '');
        }).join('') +
        '<text x="200" y="12" text-anchor="middle" fill="#B7C2D6" font-size="9" font-family="monospace">Gated Migration Pipeline</text>' +
        '</svg>';
    },
    'load-pipeline': function () {
      return '<svg viewBox="0 0 360 80" class="skill-diagram" aria-hidden="true">' +
        '<rect x="10" y="25" width="70" height="35" rx="6" fill="#1F3864" stroke="#E8B25A"/><text x="45" y="47" text-anchor="middle" fill="#EEF2F8" font-size="9">OpenAPI</text>' +
        '<line x1="80" y1="42" x2="105" y2="42" stroke="#E8B25A" stroke-width="2"/>' +
        '<rect x="105" y="25" width="70" height="35" rx="6" fill="#1F3864" stroke="#E8B25A"/><text x="140" y="47" text-anchor="middle" fill="#EEF2F8" font-size="9">BZT Script</text>' +
        '<line x1="175" y1="42" x2="200" y2="42" stroke="#E8B25A" stroke-width="2"/>' +
        '<rect x="200" y="25" width="70" height="35" rx="6" fill="#1F3864" stroke="#E8B25A"/><text x="235" y="47" text-anchor="middle" fill="#EEF2F8" font-size="9">Validate</text>' +
        '<line x1="270" y1="42" x2="295" y2="42" stroke="#E8B25A" stroke-width="2"/>' +
        '<rect x="295" y="25" width="55" height="35" rx="6" fill="#E8B25A"/><text x="322" y="47" text-anchor="middle" fill="#0D1629" font-size="9" font-weight="bold">Run</text>' +
        '</svg>';
    },
    'rum-strategy': function () {
      return '<svg viewBox="0 0 360 90" class="skill-diagram" aria-hidden="true">' +
        '<rect x="10" y="30" width="80" height="40" rx="6" fill="#1F3864" stroke="#E8B25A"/><text x="50" y="55" text-anchor="middle" fill="#EEF2F8" font-size="9">RUM Data</text>' +
        '<line x1="90" y1="50" x2="120" y2="50" stroke="#E8B25A" stroke-width="2"/>' +
        '<rect x="120" y="30" width="80" height="40" rx="6" fill="#1F3864" stroke="#E8B25A"/><text x="160" y="55" text-anchor="middle" fill="#EEF2F8" font-size="9">User Flows</text>' +
        '<line x1="200" y1="50" x2="230" y2="50" stroke="#E8B25A" stroke-width="2"/>' +
        '<rect x="230" y="30" width="60" height="40" rx="6" fill="#1F3864" stroke="#E8B25A"/><text x="260" y="55" text-anchor="middle" fill="#EEF2F8" font-size="9">KPIs</text>' +
        '<line x1="290" y1="50" x2="310" y2="50" stroke="#E8B25A" stroke-width="2"/>' +
        '<rect x="310" y="30" width="40" height="40" rx="6" fill="#E8B25A"/><text x="330" y="55" text-anchor="middle" fill="#0D1629" font-size="9" font-weight="bold">Tests</text>' +
        '<text x="180" y="18" text-anchor="middle" fill="#B7C2D6" font-size="9" font-family="monospace">Production behavior → Test strategy</text>' +
        '</svg>';
    },
    'rca-bridge': function () {
      return '<svg viewBox="0 0 360 80" class="skill-diagram" aria-hidden="true">' +
        '<rect x="10" y="25" width="70" height="35" rx="6" fill="#1F3864" stroke="#E8B25A"/><text x="45" y="47" text-anchor="middle" fill="#EEF2F8" font-size="9">Incident</text>' +
        '<line x1="80" y1="42" x2="105" y2="42" stroke="#E8B25A" stroke-width="2"/>' +
        '<rect x="105" y="15" width="150" height="55" rx="6" fill="#0D1629" stroke="#E8B25A"/>' +
        '<text x="180" y="35" text-anchor="middle" fill="#E8B25A" font-size="8">5-Whys · Ishikawa · Timeline</text>' +
        '<text x="180" y="52" text-anchor="middle" fill="#B7C2D6" font-size="8">Root Cause Analysis</text>' +
        '<line x1="255" y1="42" x2="280" y2="42" stroke="#E8B25A" stroke-width="2"/>' +
        '<rect x="280" y="25" width="70" height="35" rx="6" fill="#E8B25A"/><text x="315" y="47" text-anchor="middle" fill="#0D1629" font-size="9" font-weight="bold">Work Item</text>' +
        '</svg>';
    },
    'parity-compare': function () {
      return '<svg viewBox="0 0 340 90" class="skill-diagram" aria-hidden="true">' +
        '<rect x="20" y="20" width="100" height="50" rx="6" fill="#1F3864" stroke="#E8B25A"/><text x="70" y="50" text-anchor="middle" fill="#EEF2F8" font-size="10">Legacy</text>' +
        '<rect x="220" y="20" width="100" height="50" rx="6" fill="#1F3864" stroke="#E8B25A"/><text x="270" y="50" text-anchor="middle" fill="#EEF2F8" font-size="10">Modern</text>' +
        '<line x1="120" y1="45" x2="160" y2="45" stroke="#E8B25A" stroke-width="2"/>' +
        '<line x1="180" y1="45" x2="220" y2="45" stroke="#E8B25A" stroke-width="2"/>' +
        '<rect x="155" y="30" width="30" height="30" rx="15" fill="#E8B25A"/><text x="170" y="50" text-anchor="middle" fill="#0D1629" font-size="8" font-weight="bold">GAP</text>' +
        '<text x="170" y="82" text-anchor="middle" fill="#B7C2D6" font-size="9" font-family="monospace">Risk-rated parity analysis</text>' +
        '</svg>';
    },
    'mobile-arch': function () {
      return '<svg viewBox="0 0 340 80" class="skill-diagram" aria-hidden="true">' +
        '<rect x="10" y="20" width="90" height="45" rx="6" fill="#1F3864" stroke="#E8B25A"/><text x="55" y="40" text-anchor="middle" fill="#EEF2F8" font-size="9">Robot Pattern</text><text x="55" y="55" text-anchor="middle" fill="#B7C2D6" font-size="8">+ POM</text>' +
        '<line x1="100" y1="42" x2="125" y2="42" stroke="#E8B25A" stroke-width="2"/>' +
        '<rect x="125" y="20" width="90" height="45" rx="6" fill="#1F3864" stroke="#E8B25A"/><text x="170" y="47" text-anchor="middle" fill="#EEF2F8" font-size="9">Locator Discovery</text>' +
        '<line x1="215" y1="42" x2="240" y2="42" stroke="#E8B25A" stroke-width="2"/>' +
        '<rect x="240" y="20" width="90" height="45" rx="6" fill="#E8B25A"/><text x="285" y="47" text-anchor="middle" fill="#0D1629" font-size="9" font-weight="bold">Test Suite</text>' +
        '</svg>';
    },
    'android-flow': function () {
      return '<svg viewBox="0 0 300 70" class="skill-diagram" aria-hidden="true">' +
        '<rect x="10" y="15" width="80" height="40" rx="6" fill="#1F3864" stroke="#E8B25A"/><text x="50" y="40" text-anchor="middle" fill="#EEF2F8" font-size="9">Compose UI</text>' +
        '<line x1="90" y1="35" x2="115" y2="35" stroke="#E8B25A" stroke-width="2"/>' +
        '<rect x="115" y="15" width="80" height="40" rx="6" fill="#1F3864" stroke="#E8B25A"/><text x="155" y="40" text-anchor="middle" fill="#EEF2F8" font-size="9">TestTags</text>' +
        '<line x1="195" y1="35" x2="220" y2="35" stroke="#E8B25A" stroke-width="2"/>' +
        '<rect x="220" y="15" width="70" height="40" rx="6" fill="#E8B25A"/><text x="255" y="40" text-anchor="middle" fill="#0D1629" font-size="9" font-weight="bold">Kotlin</text>' +
        '</svg>';
    },
    'ios-flow': function () {
      return '<svg viewBox="0 0 300 70" class="skill-diagram" aria-hidden="true">' +
        '<rect x="10" y="15" width="80" height="40" rx="6" fill="#1F3864" stroke="#E8B25A"/><text x="50" y="40" text-anchor="middle" fill="#EEF2F8" font-size="9">Swift UI</text>' +
        '<line x1="90" y1="35" x2="115" y2="35" stroke="#E8B25A" stroke-width="2"/>' +
        '<rect x="115" y="15" width="80" height="40" rx="6" fill="#1F3864" stroke="#E8B25A"/><text x="155" y="40" text-anchor="middle" fill="#EEF2F8" font-size="9">a11y IDs</text>' +
        '<line x1="195" y1="35" x2="220" y2="35" stroke="#E8B25A" stroke-width="2"/>' +
        '<rect x="220" y="15" width="70" height="40" rx="6" fill="#E8B25A"/><text x="255" y="40" text-anchor="middle" fill="#0D1629" font-size="9" font-weight="bold">XCUITest</text>' +
        '</svg>';
    },
    'interrogation-tree': function () {
      return '<svg viewBox="0 0 280 100" class="skill-diagram" aria-hidden="true">' +
        '<rect x="100" y="5" width="80" height="25" rx="6" fill="#E8B25A"/><text x="140" y="22" text-anchor="middle" fill="#0D1629" font-size="9" font-weight="bold">Plan</text>' +
        '<line x1="120" y1="30" x2="50" y2="50" stroke="#E8B25A"/><line x1="160" y1="30" x2="230" y2="50" stroke="#E8B25A"/>' +
        '<rect x="10" y="50" width="80" height="25" rx="6" fill="#1F3864" stroke="#E8B25A"/><text x="50" y="67" text-anchor="middle" fill="#EEF2F8" font-size="8">Assumptions</text>' +
        '<rect x="190" y="50" width="80" height="25" rx="6" fill="#1F3864" stroke="#E8B25A"/><text x="230" y="67" text-anchor="middle" fill="#EEF2F8" font-size="8">Risks</text>' +
        '<line x1="50" y1="75" x2="140" y2="90" stroke="#E8B25A"/><line x1="230" y1="75" x2="140" y2="90" stroke="#E8B25A"/>' +
        '<rect x="90" y="82" width="100" height="18" rx="4" fill="#0D1629" stroke="#E8B25A"/><text x="140" y="95" text-anchor="middle" fill="#E8B25A" font-size="8">Shared Understanding</text>' +
        '</svg>';
    },
    'diagram-types': function () {
      return '<svg viewBox="0 0 320 60" class="skill-diagram" aria-hidden="true">' +
        ['Flow', 'Sequence', 'C4', 'ER', 'Timeline'].map(function (t, i) {
          return '<rect x="' + (10 + i * 62) + '" y="15" width="55" height="30" rx="6" fill="#1F3864" stroke="#E8B25A" stroke-width="1"/>' +
            '<text x="' + (37 + i * 62) + '" y="35" text-anchor="middle" fill="#EEF2F8" font-size="8">' + t + '</text>';
        }).join('') +
        '</svg>';
    },
    'ui-layers': function () {
      return '<svg viewBox="0 0 260 90" class="skill-diagram" aria-hidden="true">' +
        '<rect x="30" y="55" width="200" height="20" rx="4" fill="#1F3864" stroke="#E8B25A"/><text x="130" y="69" text-anchor="middle" fill="#EEF2F8" font-size="8">Components</text>' +
        '<rect x="50" y="35" width="160" height="20" rx="4" fill="#1F3864" stroke="#E8B25A"/><text x="130" y="49" text-anchor="middle" fill="#EEF2F8" font-size="8">Accessibility (WCAG)</text>' +
        '<rect x="70" y="15" width="120" height="20" rx="4" fill="#E8B25A"/><text x="130" y="29" text-anchor="middle" fill="#0D1629" font-size="8" font-weight="bold">Design System</text>' +
        '</svg>';
    }
  };

  var VISIBILITY_LABELS = {
    'featured': { text: 'Featured', class: 'badge--featured' },
    'public': { text: 'Public', class: 'badge--public' },
    'preview': { text: 'Preview', class: 'badge--preview' },
    'coming-soon': { text: 'Coming Soon', class: 'badge--soon' },
    'hidden': { text: 'Hidden', class: 'badge--hidden' }
  };

  var CATEGORY_LABELS = {
    core: 'Core Pipeline',
    specialist: 'Specialist',
    utility: 'Utilities'
  };

  function resolveVisibility(skill) {
    if (skill.visibility === 'hidden') return 'hidden';
    if (skill.publishAfter) {
      var pubDate = new Date(skill.publishAfter);
      if (pubDate <= new Date()) {
        if (skill.visibility === 'preview' || skill.visibility === 'coming-soon') return 'public';
      }
    }
    return skill.visibility;
  }

  function isVisible(skill) {
    var v = resolveVisibility(skill);
    return v !== 'hidden';
  }

  function renderDiagram(skill) {
    if (skill.image) {
      return '<figure class="skill-detail__figure"><img src="' + skill.image + '" alt="' + skill.name + ' diagram" loading="lazy" onerror="this.parentElement.style.display=\'none\'"/></figure>';
    }
    var fn = DIAGRAMS[skill.diagram];
    if (!fn) return '';
    return '<div class="skill-detail__diagram">' + fn(skill.pipelineStep) + '</div>';
  }

  function renderSkillCard(skill, index) {
    var vis = resolveVisibility(skill);
    var badge = VISIBILITY_LABELS[vis] || VISIBILITY_LABELS.public;
    var delay = Math.min(index * 0.05, 0.5);

    return '<article class="skill-card skill-card--' + vis + '" data-skill-id="' + skill.id + '" data-category="' + skill.category + '" data-visibility="' + vis + '" style="--delay:' + delay + 's">' +
      '<div class="skill-card__glow" aria-hidden="true"></div>' +
      '<div class="skill-card__header">' +
        '<span class="skill-card__icon" aria-hidden="true">' + skill.icon + '</span>' +
        '<span class="skill-card__badge ' + badge.class + '">' + badge.text + '</span>' +
      '</div>' +
      '<h3 class="skill-card__name">' + skill.name + '</h3>' +
      '<p class="skill-card__tagline">' + skill.tagline + '</p>' +
      '<p class="skill-card__highlight">' + skill.highlight + '</p>' +
      '<button class="skill-card__cta" type="button" aria-expanded="false" aria-controls="skill-detail-panel">View details →</button>' +
    '</article>';
  }

  function renderSkillDetail(skill) {
    var vis = resolveVisibility(skill);
    var badge = VISIBILITY_LABELS[vis] || VISIBILITY_LABELS.public;

    var inputsHtml = skill.inputs.map(function (i) { return '<li>' + i + '</li>'; }).join('');
    var outputsHtml = skill.outputs.map(function (o) { return '<li>' + o + '</li>'; }).join('');

    return '<div class="skill-detail__inner">' +
      '<button class="skill-detail__close" type="button" aria-label="Close skill details">×</button>' +
      '<div class="skill-detail__hero">' +
        '<span class="skill-detail__icon" aria-hidden="true">' + skill.icon + '</span>' +
        '<div>' +
          '<span class="skill-card__badge ' + badge.class + '">' + badge.text + '</span>' +
          '<h2 id="skill-detail-title">' + skill.name + '</h2>' +
          '<p class="skill-detail__slug"><code>' + skill.slug + '</code></p>' +
        '</div>' +
      '</div>' +
      '<p class="skill-detail__desc">' + skill.description + '</p>' +
      '<p class="skill-detail__highlight-callout">' + skill.highlight + '</p>' +
      renderDiagram(skill) +
      '<div class="skill-detail__io">' +
        '<div class="skill-detail__io-block"><h4>Inputs</h4><ul>' + inputsHtml + '</ul></div>' +
        '<div class="skill-detail__io-block"><h4>Outputs</h4><ul>' + outputsHtml + '</ul></div>' +
      '</div>' +
      (vis === 'coming-soon' ? '<p class="skill-detail__soon-note">This skill is not yet available for install. Check back after ' + (skill.publishAfter || 'launch') + '.</p>' :
        '<div class="skill-detail__access-note"><span class="skill-detail__lock-icon" aria-hidden="true">🔒</span><p>Source is in a private repo — <a href="mailto:emailanitesh@gmail.com?subject=QIS-Skills%20Access%20—%20' + encodeURIComponent(skill.name) + '">request access</a> or ask me to demo it live.</p></div>') +
    '</div>';
  }

  function renderPipeline(skills) {
    var core = skills.filter(function (s) { return s.category === 'core' && isVisible(s); })
      .sort(function (a, b) { return a.order - b.order; });

    var html = '<div class="pipeline-viz" role="img" aria-label="Six-skill quality pipeline">';
    core.forEach(function (skill, i) {
      html += '<div class="pipeline-viz__node" style="--node-delay:' + (i * 0.15) + 's">' +
        '<div class="pipeline-viz__dot"><span aria-hidden="true">' + skill.icon + '</span></div>' +
        '<span class="pipeline-viz__label">' + skill.name + '</span>' +
        (i < core.length - 1 ? '<div class="pipeline-viz__connector" aria-hidden="true"></div>' : '') +
      '</div>';
    });
    return html + '</div>';
  }

  function renderStats(skills) {
    var visible = skills.filter(isVisible);
    var featured = visible.filter(function (s) { return resolveVisibility(s) === 'featured'; });
    var publicCount = visible.filter(function (s) {
      var v = resolveVisibility(s);
      return v === 'public' || v === 'featured';
    }).length;

    return '<div class="product-stats">' +
      '<div class="product-stat"><span class="product-stat__value" data-count="' + visible.length + '">0</span><span class="product-stat__label">Skills available</span></div>' +
      '<div class="product-stat"><span class="product-stat__value" data-count="' + featured.length + '">0</span><span class="product-stat__label">Featured</span></div>' +
      '<div class="product-stat"><span class="product-stat__value" data-count="' + publicCount + '">0</span><span class="product-stat__label">Installable now</span></div>' +
      '<div class="product-stat"><span class="product-stat__value">MIT</span><span class="product-stat__label">Open source</span></div>' +
    '</div>';
  }

  function animateCounters() {
    document.querySelectorAll('.product-stat__value[data-count]').forEach(function (el) {
      var target = parseInt(el.getAttribute('data-count'), 10);
      var current = 0;
      var step = Math.max(1, Math.ceil(target / 20));
      var timer = setInterval(function () {
        current += step;
        if (current >= target) { current = target; clearInterval(timer); }
        el.textContent = current;
      }, 40);
    });
  }

  function initFilters(skills) {
    var filterBtns = document.querySelectorAll('[data-filter]');
    var cards = document.querySelectorAll('.skill-card');

    filterBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var filter = btn.getAttribute('data-filter');
        filterBtns.forEach(function (b) { b.classList.remove('is-active'); b.setAttribute('aria-pressed', 'false'); });
        btn.classList.add('is-active');
        btn.setAttribute('aria-pressed', 'true');

        cards.forEach(function (card) {
          var cat = card.getAttribute('data-category');
          var vis = card.getAttribute('data-visibility');
          var show = filter === 'all' ||
            (filter === 'featured' && vis === 'featured') ||
            (filter === cat);
          card.classList.toggle('is-hidden', !show);
        });
      });
    });
  }

  function initDetailPanel(skills) {
    var panel = document.getElementById('skill-detail-panel');
    var backdrop = document.getElementById('skill-detail-backdrop');
    if (!panel) return;

    var skillMap = {};
    skills.forEach(function (s) { skillMap[s.id] = s; });

    function openDetail(skillId) {
      var skill = skillMap[skillId];
      if (!skill) return;
      panel.innerHTML = renderSkillDetail(skill);
      panel.classList.add('is-open');
      backdrop.classList.add('is-open');
      document.body.classList.add('panel-open');
      panel.querySelector('.skill-detail__close').addEventListener('click', closeDetail);
      panel.querySelector('.skill-detail__install') && panel.querySelector('.skill-detail__install').focus();
    }

    function closeDetail() {
      panel.classList.remove('is-open');
      backdrop.classList.remove('is-open');
      document.body.classList.remove('panel-open');
    }

    backdrop.addEventListener('click', closeDetail);
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeDetail();
    });

    document.querySelectorAll('.skill-card__cta').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var card = btn.closest('.skill-card');
        openDetail(card.getAttribute('data-skill-id'));
      });
    });
  }

  function initScrollReveal() {
    if (!('IntersectionObserver' in window)) return;
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.skill-card, .pipeline-viz__node, .product-stat, .visibility-guide__step').forEach(function (el) {
      observer.observe(el);
    });
  }

  function renderCatalog(config) {
    var skills = config.skills.slice().sort(function (a, b) { return a.order - b.order; });
    var visibleSkills = skills.filter(isVisible);

    var pipelineEl = document.getElementById('pipeline-viz');
    if (pipelineEl) pipelineEl.innerHTML = renderPipeline(skills);

    var statsEl = document.getElementById('product-stats');
    if (statsEl) statsEl.innerHTML = renderStats(skills);

    var catalogEl = document.getElementById('skill-catalog');
    if (catalogEl) {
      catalogEl.innerHTML = visibleSkills.map(renderSkillCard).join('');
    }

    var countEl = document.getElementById('skill-count');
    if (countEl) countEl.textContent = visibleSkills.length;

    animateCounters();
    initFilters(visibleSkills);
    initDetailPanel(visibleSkills);
    initScrollReveal();
  }

  function showError() {
    var catalogEl = document.getElementById('skill-catalog');
    if (catalogEl) {
      catalogEl.innerHTML = '<p class="catalog-error">Could not load skill catalog. <a href="https://github.com/aniteshshaw/QIS-Skills">View skills on GitHub →</a></p>';
    }
  }

  var catalogEl = document.getElementById('skill-catalog');
  if (!catalogEl) return;

  fetch('../data/skills-config.json')
    .then(function (res) { return res.json(); })
    .then(renderCatalog)
    .catch(showError);
})();
