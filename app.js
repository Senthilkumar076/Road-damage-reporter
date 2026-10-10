/* Server address: works from http://localhost:3000 AND when index.html is opened by double-click */
const API = location.protocol === 'file:' ? 'http://localhost:3000' : '';

/* ===================== TEXTS (English + Tamil) ===================== */
const T = {
  en: {
    appTitle: 'Road Damage Reporting', navReport: 'Report', navReports: 'Reports', navHelp: 'Help',
    heroTitle: 'See a damaged road? Tell us in 1 minute!',
    heroSub: 'Report potholes, cracks and broken roads in your area. Together we can make our roads safe.',
    ctaReport: 'Report a Problem', ctaView: 'See All Reports',
    total: 'Total', pending: 'Pending', inprogress: 'In Progress', fixed: 'Fixed', fixedRate: 'Roads fixed so far',
    howTitle: 'How does it work?',
    how1t: 'Fill the form', how1d: 'Write what and where the problem is. It is very simple.',
    how2t: 'Add location & photo', how2d: 'Press one button to share your location and add a photo.',
    how3t: 'We track it', how3d: 'Everyone can see the report and follow until it is fixed.',
    newReport: 'Report a Road Problem', formHint: 'Fields marked with * are required.',
    step1: 'What is the problem?', step2: 'Where is it?', step3: 'Add a photo (optional)',
    fName: 'Your Name', fTitle: 'Short Title', phName: 'Example: Kumar', phTitle: 'Example: Big pothole near school',
    fType: 'Type of damage', fSeverity: 'How bad is it?',
    pothole: 'Pothole', crack: 'Crack', water: 'Water logging', broken: 'Broken road', other: 'Other',
    low: 'Low', medium: 'Medium', high: 'Dangerous',
    fDesc: 'More details (optional)', phDesc: 'Example: The pothole is very deep and bikes are slipping.',
    fAddress: 'Place / Street / Area', phAddress: 'Example: Gandhipuram Main Road, Coimbatore',
    shareLoc: 'Share my location', locHelp: 'Tip: stand near the damaged road, then press the button. Allow location when your browser asks.',
    gettingLoc: 'Getting your location...', locOk: 'Location added ✔', locFail: 'Could not get location. Please allow location access.',
    locNo: 'Location is not supported in this browser.', checkMap: 'Check on map',
    dropText: 'Click here or drag a photo', dropHint: 'JPG, PNG or WEBP, below 5 MB',
    submit: 'Submit Report', sending: 'Sending...', sent: 'Report submitted successfully! Thank you 🙏',
    failed: 'Something went wrong. Is the server running?', notImg: 'Please choose an image file.', bigImg: 'Image must be below 5 MB',
    allReports: 'All Reports', all: 'All', search: '🔍 Search by title or place...',
    sortNew: 'Newest first', sortVotes: 'Most "seen this too"',
    upvote: 'I saw this too', voted: 'Thanks for your vote!', viewMap: 'View on map', share: 'Share',
    adminLogin: 'Admin Login', logout: 'Logout', adminTitle: 'Admin Login', pwdPh: 'Enter password',
    login: 'Login', cancel: 'Cancel', wrongPwd: 'Wrong password', loggedIn: 'Admin login successful', loggedOut: 'Logged out',
    del: 'Delete', confirmDel: 'Delete this report?', deleted: 'Report deleted', statusSaved: 'Status updated',
    noReports: 'No reports found. Be the first to report a problem! 🙌',
    by: 'Reported by', on: 'on', shareText: 'Road problem reported',
    tipsTitle: 'Tips for a good report',
    tip1: 'Take a clear photo in daylight.', tip2: 'Share your location for exact place.',
    tip3: 'Write the street name or a nearby landmark.', tip4: 'Press "I saw this too" if the problem already exists.',
    faqTitle: 'Common questions',
    faq1q: 'Do I need to log in?', faq1a: 'No. Anyone can report a road problem without creating an account.',
    faq2q: 'Is my location safe?', faq2a: 'Your location is shared only when you press the button, and only the damaged road location is saved.',
    faq3q: 'What does "I saw this too" mean?', faq3a: 'It shows many people are facing the same problem, so it can be fixed sooner.',
    faq4q: 'Who changes the status to Fixed?', faq4a: 'Only the admin can change the status after the work is done.',
    footer: 'Made to keep our roads safe 🚗🏍️🚲', serverErr: 'Cannot reach the server. Run npm start first.'
  },
  ta: {
    appTitle: 'சாலை சேதம் புகார்', navReport: 'புகார்', navReports: 'புகார்கள்', navHelp: 'உதவி',
    heroTitle: 'சேதமடைந்த சாலையைப் பார்த்தீர்களா? 1 நிமிடத்தில் தெரிவியுங்கள்!',
    heroSub: 'உங்கள் பகுதியில் உள்ள குழிகள், விரிசல்கள், உடைந்த சாலைகளைப் புகாரளியுங்கள். சேர்ந்து சாலைகளைப் பாதுகாப்பாக்குவோம்.',
    ctaReport: 'புகார் அளிக்க', ctaView: 'அனைத்து புகார்கள்',
    total: 'மொத்தம்', pending: 'நிலுவையில்', inprogress: 'நடைபெறுகிறது', fixed: 'சரிசெய்யப்பட்டது', fixedRate: 'இதுவரை சரிசெய்யப்பட்ட சாலைகள்',
    howTitle: 'இது எப்படி வேலை செய்கிறது?',
    how1t: 'படிவத்தை நிரப்புங்கள்', how1d: 'என்ன பிரச்சனை, எங்கே என்று எழுதுங்கள். மிகவும் எளிது.',
    how2t: 'இடம் & படம் சேர்க்கவும்', how2d: 'ஒரு பொத்தானை அழுத்தி இருப்பிடத்தைப் பகிரவும், படத்தையும் சேர்க்கவும்.',
    how3t: 'நாங்கள் கண்காணிக்கிறோம்', how3d: 'சரிசெய்யப்படும் வரை அனைவரும் புகாரைப் பார்த்துப் பின்தொடரலாம்.',
    newReport: 'சாலைப் பிரச்சனையைப் புகாரளிக்க', formHint: '* குறியிட்ட புலங்கள் கட்டாயம்.',
    step1: 'என்ன பிரச்சனை?', step2: 'எங்கே உள்ளது?', step3: 'படம் சேர்க்கவும் (விருப்பம்)',
    fName: 'உங்கள் பெயர்', fTitle: 'சிறு தலைப்பு', phName: 'எ.கா: குமார்', phTitle: 'எ.கா: பள்ளி அருகில் பெரிய குழி',
    fType: 'சேத வகை', fSeverity: 'எவ்வளவு மோசம்?',
    pothole: 'குழி', crack: 'விரிசல்', water: 'தண்ணீர் தேக்கம்', broken: 'உடைந்த சாலை', other: 'மற்றவை',
    low: 'குறைவு', medium: 'நடுத்தரம்', high: 'ஆபத்து',
    fDesc: 'கூடுதல் விவரம் (விருப்பம்)', phDesc: 'எ.கா: குழி மிகவும் ஆழமாக உள்ளது, வாகனங்கள் வழுக்குகின்றன.',
    fAddress: 'இடம் / தெரு / பகுதி', phAddress: 'எ.கா: காந்திபுரம் மெயின் ரோடு, கோயம்புத்தூர்',
    shareLoc: 'என் இருப்பிடத்தைப் பகிர்', locHelp: 'குறிப்பு: சேதமடைந்த சாலை அருகில் நின்று பொத்தானை அழுத்தவும். உலாவி கேட்கும்போது அனுமதி கொடுக்கவும்.',
    gettingLoc: 'இருப்பிடம் பெறப்படுகிறது...', locOk: 'இருப்பிடம் சேர்க்கப்பட்டது ✔', locFail: 'இருப்பிடத்தைப் பெற முடியவில்லை. அனுமதி வழங்கவும்.',
    locNo: 'இந்த உலாவியில் இருப்பிடம் ஆதரிக்கப்படவில்லை.', checkMap: 'வரைபடத்தில் பார்',
    dropText: 'இங்கே கிளிக் செய்யவும் அல்லது படத்தை இழுத்து விடவும்', dropHint: 'JPG, PNG அல்லது WEBP, 5 MB-க்குள்',
    submit: 'புகார் அனுப்பு', sending: 'அனுப்பப்படுகிறது...', sent: 'புகார் வெற்றிகரமாக அனுப்பப்பட்டது! நன்றி 🙏',
    failed: 'ஏதோ தவறு நடந்தது. சர்வர் இயங்குகிறதா?', notImg: 'தயவுசெய்து படக் கோப்பைத் தேர்ந்தெடுக்கவும்.', bigImg: 'படம் 5 MB-க்குள் இருக்க வேண்டும்',
    allReports: 'அனைத்து புகார்கள்', all: 'அனைத்தும்', search: '🔍 தலைப்பு அல்லது இடம் மூலம் தேடு...',
    sortNew: 'புதியவை முதலில்', sortVotes: 'அதிகம் "நானும் பார்த்தேன்"',
    upvote: 'நானும் பார்த்தேன்', voted: 'உங்கள் வாக்கிற்கு நன்றி!', viewMap: 'வரைபடத்தில் பார்', share: 'பகிர்',
    adminLogin: 'நிர்வாகி உள்நுழைவு', logout: 'வெளியேறு', adminTitle: 'நிர்வாகி உள்நுழைவு', pwdPh: 'கடவுச்சொல்லை உள்ளிடவும்',
    login: 'உள்நுழை', cancel: 'ரத்து', wrongPwd: 'தவறான கடவுச்சொல்', loggedIn: 'நிர்வாகி உள்நுழைவு வெற்றி', loggedOut: 'வெளியேறினீர்கள்',
    del: 'நீக்கு', confirmDel: 'இந்த புகாரை நீக்கவா?', deleted: 'புகார் நீக்கப்பட்டது', statusSaved: 'நிலை மாற்றப்பட்டது',
    noReports: 'புகார்கள் இல்லை. முதல் புகாரை நீங்களே அளியுங்கள்! 🙌',
    by: 'புகாரளித்தவர்', on: 'தேதி', shareText: 'சாலைப் பிரச்சனை புகார்',
    tipsTitle: 'நல்ல புகாருக்கான குறிப்புகள்',
    tip1: 'பகல் வெளிச்சத்தில் தெளிவான படம் எடுக்கவும்.', tip2: 'சரியான இடத்திற்கு உங்கள் இருப்பிடத்தைப் பகிரவும்.',
    tip3: 'தெரு பெயர் அல்லது அருகிலுள்ள அடையாளத்தை எழுதவும்.', tip4: 'பிரச்சனை ஏற்கனவே இருந்தால் "நானும் பார்த்தேன்" அழுத்தவும்.',
    faqTitle: 'பொதுவான கேள்விகள்',
    faq1q: 'நான் உள்நுழைய வேண்டுமா?', faq1a: 'தேவையில்லை. கணக்கு உருவாக்காமல் யார் வேண்டுமானாலும் புகாரளிக்கலாம்.',
    faq2q: 'என் இருப்பிடம் பாதுகாப்பானதா?', faq2a: 'நீங்கள் பொத்தானை அழுத்தும்போது மட்டுமே இருப்பிடம் பகிரப்படும்; சேதமடைந்த சாலையின் இடம் மட்டுமே சேமிக்கப்படும்.',
    faq3q: '"நானும் பார்த்தேன்" என்றால் என்ன?', faq3a: 'பலர் ஒரே பிரச்சனையை எதிர்கொள்கிறார்கள் என்பதை இது காட்டும்; அதனால் விரைவில் சரிசெய்யப்படலாம்.',
    faq4q: 'நிலையை "சரிசெய்யப்பட்டது" என யார் மாற்றுவார்?', faq4a: 'பணி முடிந்த பிறகு நிர்வாகி மட்டுமே நிலையை மாற்ற முடியும்.',
    footer: 'நம் சாலைகளைப் பாதுகாப்பாக வைக்க உருவாக்கப்பட்டது 🚗🏍️🚲', serverErr: 'சர்வரை அணுக முடியவில்லை. முதலில் npm start இயக்கவும்.'
  }
};

/* ===================== STATE ===================== */
let lang = localStorage.getItem('lang') || 'en';
let token = sessionStorage.getItem('token') || '';
let voted = JSON.parse(localStorage.getItem('voted') || '[]');
let coords = { lat: '', lng: '' };
let locKey = '';
let statusFilter = 'all';
let selectedFile = null;

const $ = id => document.getElementById(id);
const t = k => (T[lang] && T[lang][k]) || k;
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

/* ===================== TOAST ===================== */
function toast(msg, type = 'info') {
  const d = document.createElement('div');
  d.className = 'toast ' + type; d.textContent = msg;
  $('toasts').appendChild(d);
  setTimeout(() => { d.style.opacity = '0'; d.style.transition = '.4s'; setTimeout(() => d.remove(), 400); }, 3000);
}

/* ===================== LANGUAGE ===================== */
function applyLang() {
  document.documentElement.lang = lang;
  document.title = t('appTitle');
  document.querySelectorAll('[data-i18n]').forEach(e => e.textContent = t(e.dataset.i18n));
  document.querySelectorAll('[data-ph]').forEach(e => e.placeholder = t(e.dataset.ph));
  $('btnEn').classList.toggle('active', lang === 'en');
  $('btnTa').classList.toggle('active', lang === 'ta');
  $('btnAdmin').textContent = '🔑 ' + (token ? t('logout') : t('adminLogin'));
  if (locKey) updateLocText();
  loadReports();
}
function setLang(l) { lang = l; localStorage.setItem('lang', l); applyLang(); }

/* ===================== STATS ===================== */
function animateNumber(el, to) {
  const from = parseInt(el.textContent) || 0;
  if (from === to) return;
  const steps = 20; let i = 0;
  const timer = setInterval(() => {
    i++; el.textContent = Math.round(from + (to - from) * (i / steps));
    if (i >= steps) clearInterval(timer);
  }, 25);
}
async function loadStats() {
  try {
    const s = await (await fetch(API + '/api/stats')).json();
    animateNumber($('sTotal'), s.total); animateNumber($('sPending'), s.pending);
    animateNumber($('sInprogress'), s.inprogress); animateNumber($('sFixed'), s.fixed);
    const pct = s.total ? Math.round((s.fixed / s.total) * 100) : 0;
    $('pctText').textContent = pct + '%'; $('pctBar').style.width = pct + '%';
  } catch { /* ignore */ }
}

/* ===================== REPORT LIST ===================== */
async function loadReports() {
  const q = encodeURIComponent($('search').value.trim());
  $('list').innerHTML = '<div class="skeleton"></div><div class="skeleton"></div>';
  let rows;
  try {
    rows = await (await fetch(`${API}/api/reports?status=${statusFilter}&q=${q}`)).json();
  } catch {
    $('list').innerHTML = `<p class="empty">⚠️ ${t('serverErr')}</p>`; return;
  }
  loadStats();
  if ($('sortBy').value === 'votes') rows.sort((a, b) => b.upvotes - a.upvotes);
  if (!rows.length) { $('list').innerHTML = `<p class="empty">${t('noReports')}</p>`; return; }

  const icons = { pothole: '🕳️', crack: '⚡', water: '🌊', broken: '🚧', other: '❓' };
  $('list').innerHTML = rows.map(r => {
    const hasLoc = r.latitude != null && r.longitude != null;
    const mapUrl = hasLoc ? `https://www.openstreetmap.org/?mlat=${r.latitude}&mlon=${r.longitude}#map=17/${r.latitude}/${r.longitude}` : '';
    const map = hasLoc ? `<a target="_blank" rel="noopener" href="${mapUrl}">📍 ${t('viewMap')}</a>` : '';
    const imgUrl = r.has_image ? `${API}/api/reports/${r.id}/image` : '';
    const admin = token ? `
      <select onchange="changeStatus(${r.id}, this.value)">
        ${['pending', 'inprogress', 'fixed'].map(s => `<option value="${s}" ${s === r.status ? 'selected' : ''}>${t(s)}</option>`).join('')}
      </select>
      <button class="btn-danger" onclick="delReport(${r.id})">🗑 ${t('del')}</button>` : '';
    const done = voted.includes(r.id) ? 'disabled' : '';
    return `<div class="report st-${r.status}">
      ${r.has_image ?`<img src="${imgUrl}" alt="" onclick="openImg('${imgUrl}')">` : ''}
      <div class="info">
        <h3>${icons[r.damage_type] || ''} ${esc(r.title)}</h3>
        <p><span class="badge ${r.status}">${t(r.status)}</span>
           <span class="badge sev-${r.severity}">${t(r.severity)}</span>
           <span class="badge b-type">${t(r.damage_type)}</span></p>
        <p>📌 ${esc(r.address)} ${map}</p>
        ${r.description ? `<p>${esc(r.description)}</p>` : ''}
        <p class="meta">👤 ${t('by')} ${esc(r.name)} • 📅 ${t('on')} ${esc(String(r.created_at).slice(0, 10))}</p>
        <div class="actions">
          <button class="btn-vote" id="v${r.id}" ${done} onclick="upvote(${r.id})">👍 ${t('upvote')} (<span id="vc${r.id}">${r.upvotes}</span>)</button>
          <button class="btn-share" onclick="shareReport(${r.id}, '${encodeURIComponent(r.title)}', '${encodeURIComponent(r.address)}', '${encodeURIComponent(mapUrl)}')">📲 ${t('share')}</button>
          ${admin}
        </div>
      </div></div>`;
  }).join('');
}

async function upvote(id) {
  try {
    const res = await (await fetch(`${API}/api/reports/${id}/upvote`, { method: 'POST' })).json();
    voted.push(id); localStorage.setItem('voted', JSON.stringify(voted));
    $('vc' + id).textContent = res.upvotes; $('v' + id).disabled = true;
    toast(t('voted'), 'ok');
  } catch { toast(t('serverErr'), 'err'); }
}

function shareReport(id, title, address, map) {
  const text = `🛣️ ${t('shareText')}: ${decodeURIComponent(title)}\n📌 ${decodeURIComponent(address)}\n${decodeURIComponent(map)}\n${location.origin}`;
  if (navigator.share) { navigator.share({ text }).catch(() => {}); return; }
  window.open('https://wa.me/?text=' + encodeURIComponent(text), '_blank');
}

async function changeStatus(id, status) {
  const res = await fetch(`${API}/api/reports/${id}/status`, {
    method: 'PUT', headers: { 'Content-Type': 'application/json', 'x-token': token }, body: JSON.stringify({ status })
  });
  if (res.ok) toast(t('statusSaved'), 'ok');
  else { toast(t('wrongPwd'), 'err'); logout(); }
  loadReports();
}

async function delReport(id) {
  if (!confirm(t('confirmDel'))) return;
  const res = await fetch(`${API}/api/reports/${id}`, { method: 'DELETE', headers: { 'x-token': token } });
  if (res.ok) toast(t('deleted'), 'ok'); else toast(t('wrongPwd'), 'err');
  loadReports();
}

/* ===================== CHOICE BUTTONS ===================== */
function setupChoices(boxId, hiddenId) {
  $(boxId).addEventListener('click', e => {
    const b = e.target.closest('button'); if (!b) return;
    $(boxId).querySelectorAll('button').forEach(x => x.classList.remove('active'));
    b.classList.add('active'); $(hiddenId).value = b.dataset.val;
  });
}
setupChoices('typeBox', 'damage_type');
setupChoices('sevBox', 'severity');

$('description').oninput = e => $('descCount').textContent = e.target.value.length;

/* ===================== LOCATION ===================== */
function updateLocText() {
  const el = $('locStatus');
  el.className = 'loc-status ' + (locKey === 'locOk' ? 'ok' : locKey === 'gettingLoc' ? '' : 'err');
  if (locKey === 'locOk') {
    const url = `https://www.openstreetmap.org/?mlat=${coords.lat}&mlon=${coords.lng}#map=17/${coords.lat}/${coords.lng}`;
    el.innerHTML = `${t('locOk')} <a target="_blank" rel="noopener" href="${url}">${t('checkMap')}</a>`;
  } else el.textContent = t(locKey);
}
$('btnLoc').onclick = () => {
  if (!navigator.geolocation) { locKey = 'locNo'; updateLocText(); return; }
  locKey = 'gettingLoc'; updateLocText();
  navigator.geolocation.getCurrentPosition(
    pos => {
      coords.lat = pos.coords.latitude.toFixed(6); coords.lng = pos.coords.longitude.toFixed(6);
      locKey = 'locOk'; updateLocText(); toast(t('locOk'), 'ok');
    },
    () => { locKey = 'locFail'; updateLocText(); toast(t('locFail'), 'err'); },
    { enableHighAccuracy: true, timeout: 15000 }
  );
};

/* ===================== IMAGE UPLOAD ===================== */
function compressImage(file) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const max = 1000; let w = img.width, h = img.height;
      if (Math.max(w, h) > max) { const k = max / Math.max(w, h); w = Math.round(w * k); h = Math.round(h * k); }
      const c = document.createElement('canvas'); c.width = w; c.height = h;
      c.getContext('2d').drawImage(img, 0, 0, w, h);
      c.toBlob(b => b ? resolve(b) : reject(), 'image/jpeg', 0.75);
      URL.revokeObjectURL(img.src);
    };
    img.onerror = reject;
    img.src = URL.createObjectURL(file);
  });
}
async function setFile(f) {
  if (!f) return;
  if (!f.type.startsWith('image/')) { toast(t('notImg'), 'err'); return; }
  if (f.size > 5 * 1024 * 1024) { toast(t('bigImg'), 'err'); return; }
  try {
    selectedFile = await compressImage(f);
    $('preview').src = URL.createObjectURL(selectedFile);
    $('drop').classList.add('has-img');
  } catch { toast(t('notImg'), 'err'); }
}
function clearFile() {
  selectedFile = null; $('image').value = ''; $('preview').src = '';
  $('drop').classList.remove('has-img');
}
$('drop').onclick = e => { if (e.target.id !== 'btnRemove') $('image').click(); };
$('image').onchange = e => setFile(e.target.files[0]);
$('btnRemove').onclick = e => { e.stopPropagation(); clearFile(); };
['dragover', 'dragenter'].forEach(ev => $('drop').addEventListener(ev, e => { e.preventDefault(); $('drop').classList.add('over'); }));
['dragleave', 'drop'].forEach(ev => $('drop').addEventListener(ev, e => { e.preventDefault(); $('drop').classList.remove('over'); }));
$('drop').addEventListener('drop', e => setFile(e.dataTransfer.files[0]));

/* ===================== SUBMIT ===================== */
$('reportForm').onsubmit = async e => {
  e.preventDefault();
  const fd = new FormData();
  ['name', 'title', 'damage_type', 'severity', 'description', 'address'].forEach(k => fd.append(k, $(k).value.trim()));
  fd.append('latitude', coords.lat); fd.append('longitude', coords.lng);
  if (selectedFile) fd.append('image', selectedFile);
  $('btnSubmit').disabled = true; $('formMsg').className = 'msg'; $('formMsg').textContent = t('sending');
  try {
    const res = await fetch(API + '/api/reports', { method: 'POST', body: fd });
       if (!res.ok) throw new Error((await res.json().catch(() => ({}))).error || 'failed');
    $('formMsg').className = 'msg ok'; $('formMsg').textContent = t('sent'); toast(t('sent'), 'ok');
    e.target.reset(); clearFile(); $('descCount').textContent = '0';
    document.querySelectorAll('#typeBox .choice').forEach((b, i) => b.classList.toggle('active', i === 0)); $('damage_type').value = 'pothole';
    document.querySelectorAll('#sevBox .sev').forEach((b, i) => b.classList.toggle('active', i === 0)); $('severity').value = 'low';
    coords = { lat: '', lng: '' }; locKey = ''; $('locStatus').textContent = '';
    loadReports();
    setTimeout(() => $('listSec').scrollIntoView({ behavior: 'smooth' }), 800);
     } catch (err) {
     const msg = err.message && err.message !== 'failed' && !err.message.includes('fetch') ? err.message : t('failed');
     $('formMsg').className = 'msg err'; $('formMsg').textContent = msg; toast(msg, 'err');
   }
  $('btnSubmit').disabled = false;
};

/* ===================== FILTERS ===================== */
$('chips').addEventListener('click', e => {
  const c = e.target.closest('.chip'); if (!c) return;
  document.querySelectorAll('.chip').forEach(x => x.classList.remove('active'));
  c.classList.add('active'); statusFilter = c.dataset.status; loadReports();
});
let timer;
$('search').oninput = () => { clearTimeout(timer); timer = setTimeout(loadReports, 300); };
$('sortBy').onchange = loadReports;

/* ===================== ADMIN ===================== */
function logout() { token = ''; sessionStorage.removeItem('token'); applyLang(); }
$('btnAdmin').onclick = () => {
  if (token) { logout(); toast(t('loggedOut'), 'info'); return; }
  $('adminModal').classList.add('show'); $('adminPwd').value = ''; $('adminPwd').focus();
};
$('btnCancel').onclick = () => $('adminModal').classList.remove('show');
$('adminModal').onclick = e => { if (e.target.id === 'adminModal') $('adminModal').classList.remove('show'); };
async function doLogin() {
  const password = $('adminPwd').value;
  if (!password) return;
  try {
    const res = await fetch(API + '/api/admin/login', {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ password })
    });
    if (!res.ok) return toast(t('wrongPwd'), 'err');
    token = (await res.json()).token; sessionStorage.setItem('token', token);
    $('adminModal').classList.remove('show'); toast(t('loggedIn'), 'ok'); applyLang();
  } catch { toast(t('serverErr'), 'err'); }
}
$('btnLogin').onclick = doLogin;
$('adminPwd').onkeydown = e => { if (e.key === 'Enter') doLogin(); };

/* ===================== IMAGE VIEWER + BACK TO TOP ===================== */
function openImg(src) { $('lightImg').src = src; $('lightbox').classList.add('show'); }
$('lightbox').onclick = () => $('lightbox').classList.remove('show');
document.addEventListener('keydown', e => { if (e.key === 'Escape') { $('lightbox').classList.remove('show'); $('adminModal').classList.remove('show'); } });
window.addEventListener('scroll', () => { $('toTop').style.display = window.scrollY > 400 ? 'block' : 'none'; });
$('toTop').onclick = () => window.scrollTo({ top: 0, behavior: 'smooth' });

/* ===================== LANGUAGE BUTTONS + START ===================== */
$('btnEn').onclick = () => setLang('en');
$('btnTa').onclick = () => setLang('ta');
applyLang();
/* ===== Warn about similar problems (avoid duplicates) ===== */
const S = {
  en: { title: '⚠️ Similar problems already reported', hint: 'Please check first. If it is the same problem, press "I saw this too" instead of sending a new report.', saw: 'I saw this too', people: 'people saw this', thanks: 'Thanks! Your vote is added.' },
  ta: { title: '⚠️ இதே போன்ற புகார்கள் ஏற்கனவே உள்ளன', hint: 'முதலில் பார்க்கவும். அதே பிரச்சனை என்றால் புதிய புகார் அனுப்பாமல் "நானும் பார்த்தேன்" அழுத்தவும்.', saw: 'நானும் பார்த்தேன்', people: 'பேர் பார்த்துள்ளனர்', thanks: 'நன்றி! உங்கள் வாக்கு சேர்க்கப்பட்டது.' }
};
let simTimer;
async function checkSimilar() {
  const box = $('similarBox');
  const text = ($('title').value + ' ' + $('address').value).trim();
  if (text.length < 4) { box.style.display = 'none'; return; }
  try {
    const rows = await (await fetch(API + '/api/similar?text=' + encodeURIComponent(text))).json();
    if (!rows.length) { box.style.display = 'none'; return; }
    const s = S[lang];
    box.innerHTML = `<h4>${s.title}</h4><p>${s.hint}</p>` + rows.map(r => `
      <div class="sim-item">
        <div><strong>${esc(r.title)}</strong><small>📌 ${esc(r.address)} • ${t(r.status)} • 👍 ${r.upvotes} ${s.people}</small></div>
        <button type="button" class="btn-vote" ${voted.includes(r.id) ? 'disabled' : ''} onclick="similarVote(${r.id})">👍 ${s.saw}</button>
      </div>`).join('');
    box.style.display = 'block';
  } catch { box.style.display = 'none'; }
}
async function similarVote(id) {
  try {
    await fetch(`${API}/api/reports/${id}/upvote`, { method: 'POST' });
    voted.push(id); localStorage.setItem('voted', JSON.stringify(voted));
    toast(S[lang].thanks, 'ok'); checkSimilar(); loadReports();
  } catch { toast(t('serverErr'), 'err'); }
}
['title', 'address'].forEach(id => $(id).addEventListener('input', () => { clearTimeout(simTimer); simTimer = setTimeout(checkSimilar, 500); }));
$('btnEn').addEventListener('click', checkSimilar);
$('btnTa').addEventListener('click', checkSimilar);
$('reportForm').addEventListener('reset', () => { $('similarBox').style.display = 'none'; });