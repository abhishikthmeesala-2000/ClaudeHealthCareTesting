// ── Data ──────────────────────────────────────────────────────────────────

const patients = [
  { id:'P001', name:'Alice Johnson',   age:34, gender:'Female', condition:'Hypertension',   lastVisit:'2026-05-20', status:'Active' },
  { id:'P002', name:'Bob Martinez',    age:58, gender:'Male',   condition:'Diabetes T2',    lastVisit:'2026-05-18', status:'Active' },
  { id:'P003', name:'Carol White',     age:27, gender:'Female', condition:'Asthma',         lastVisit:'2026-05-15', status:'Active' },
  { id:'P004', name:'David Chen',      age:45, gender:'Male',   condition:'Cardiac',        lastVisit:'2026-05-12', status:'Critical' },
  { id:'P005', name:'Eva Brown',       age:61, gender:'Female', condition:'Arthritis',      lastVisit:'2026-05-10', status:'Active' },
  { id:'P006', name:'Frank Lee',       age:39, gender:'Male',   condition:'Migraine',       lastVisit:'2026-05-08', status:'Inactive' },
  { id:'P007', name:'Grace Kim',       age:52, gender:'Female', condition:'Thyroid',        lastVisit:'2026-05-06', status:'Active' },
  { id:'P008', name:'Henry Park',      age:71, gender:'Male',   condition:'COPD',           lastVisit:'2026-05-03', status:'Critical' },
  { id:'P009', name:'Isabella Torres', age:29, gender:'Female', condition:'Anxiety',        lastVisit:'2026-04-30', status:'Active' },
  { id:'P010', name:'James Wilson',    age:46, gender:'Male',   condition:'Back Pain',      lastVisit:'2026-04-28', status:'Inactive' },
];

const appointments = [
  { time:'08:30', patient:'Alice Johnson',   doctor:'Dr. Reynolds', type:'Follow-up',    status:'Confirmed',  date:'2026-05-27' },
  { time:'09:00', patient:'David Chen',      doctor:'Dr. Carter',   type:'Cardiology',   status:'Confirmed',  date:'2026-05-27' },
  { time:'09:45', patient:'Carol White',     doctor:'Dr. Reynolds', type:'Routine Check',status:'Pending',    date:'2026-05-27' },
  { time:'10:30', patient:'Grace Kim',       doctor:'Dr. Patel',    type:'Lab Review',   status:'Confirmed',  date:'2026-05-27' },
  { time:'11:00', patient:'Bob Martinez',    doctor:'Dr. Reynolds', type:'Diabetes Mgmt',status:'Confirmed',  date:'2026-05-27' },
  { time:'11:45', patient:'Henry Park',      doctor:'Dr. Carter',   type:'Pulmonology',  status:'Cancelled',  date:'2026-05-27' },
  { time:'14:00', patient:'Eva Brown',       doctor:'Dr. Reynolds', type:'Orthopedic',   status:'Pending',    date:'2026-05-28' },
  { time:'14:30', patient:'Isabella Torres', doctor:'Dr. Patel',    type:'Psychiatry',   status:'Confirmed',  date:'2026-05-28' },
  { time:'15:15', patient:'Frank Lee',       doctor:'Dr. Reynolds', type:'Neurology',    status:'Confirmed',  date:'2026-05-28' },
  { time:'16:00', patient:'James Wilson',    doctor:'Dr. Carter',   type:'Orthopedic',   status:'Pending',    date:'2026-05-28' },
];

const records = [
  { type:'Lab Report',      name:'Complete Blood Count',    patient:'Alice Johnson',   date:'2026-05-20', icon:'🧪' },
  { type:'Imaging',         name:'Chest X-Ray',             patient:'Henry Park',      date:'2026-05-18', icon:'📷' },
  { type:'Prescription',    name:'Metformin 500mg',         patient:'Bob Martinez',    date:'2026-05-18', icon:'💊' },
  { type:'ECG',             name:'12-Lead ECG',             patient:'David Chen',      date:'2026-05-15', icon:'❤️' },
  { type:'Lab Report',      name:'HbA1c Panel',             patient:'Bob Martinez',    date:'2026-05-12', icon:'🧪' },
  { type:'Imaging',         name:'MRI Brain',               patient:'Frank Lee',       date:'2026-05-08', icon:'📷' },
  { type:'Prescription',    name:'Levothyroxine 50mcg',     patient:'Grace Kim',       date:'2026-05-06', icon:'💊' },
  { type:'Lab Report',      name:'Pulmonary Function Test', patient:'Henry Park',      date:'2026-05-03', icon:'🫁' },
];

const metrics = [
  { label:'Avg Blood Pressure', value:'124/82', sub:'mmHg', pct:62, color:'#2563eb' },
  { label:'Avg Blood Sugar',    value:'108',    sub:'mg/dL', pct:54, color:'#16a34a' },
  { label:'Avg Heart Rate',     value:'74',     sub:'bpm',   pct:74, color:'#ea580c' },
  { label:'Avg BMI',            value:'26.4',   sub:'kg/m²', pct:66, color:'#8b5cf6' },
  { label:'Critical Patients',  value:'2',      sub:'of 248',pct:8,  color:'#dc2626' },
  { label:'Recovered This Month',value:'18',    sub:'patients',pct:72,color:'#16a34a' },
];

// ── Helpers ───────────────────────────────────────────────────────────────

function statusBadge(s) {
  const map = { Active:'badge-green', Critical:'badge-red', Inactive:'badge-gray', Confirmed:'badge-green', Pending:'badge-orange', Cancelled:'badge-red' };
  return `<span class="badge ${map[s]||'badge-gray'}">${s}</span>`;
}

function initials(name) {
  return name.split(' ').map(w=>w[0]).join('').slice(0,2).toUpperCase();
}

// ── Navigation ────────────────────────────────────────────────────────────

function navigate(page) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));

  const target = document.getElementById(`page-${page}`);
  if (target) target.classList.add('active');

  const navItem = document.querySelector(`.nav-item[data-page="${page}"]`);
  if (navItem) navItem.classList.add('active');

  const titles = { dashboard:'Dashboard', patients:'Patients', appointments:'Appointments', records:'Medical Records', settings:'Settings' };
  document.getElementById('pageTitle').textContent = titles[page] || page;

  // Close sidebar on mobile
  document.getElementById('sidebar').classList.remove('open');
}

document.querySelectorAll('.nav-item, .btn-link').forEach(el => {
  el.addEventListener('click', e => {
    e.preventDefault();
    const page = el.dataset.page;
    if (page) navigate(page);
  });
});

document.getElementById('menuToggle').addEventListener('click', () => {
  document.getElementById('sidebar').classList.toggle('open');
});

// ── Dashboard ─────────────────────────────────────────────────────────────

function renderDashAppts() {
  const today = appointments.filter(a => a.date === '2026-05-27').slice(0, 5);
  document.getElementById('dashApptList').innerHTML = today.map(a => `
    <div class="appt-item">
      <div class="appt-time">${a.time}</div>
      <div class="appt-details">
        <div class="appt-name">${a.patient}</div>
        <div class="appt-type">${a.type} · ${a.doctor}</div>
      </div>
      ${statusBadge(a.status)}
    </div>`).join('');
}

function renderRecentPatients() {
  document.getElementById('dashRecentPatients').innerHTML = patients.slice(0, 5).map(p => `
    <div class="patient-row" onclick="navigate('patients')">
      <div class="patient-avatar">${initials(p.name)}</div>
      <div>
        <div class="patient-name">${p.name}</div>
        <div class="patient-meta">${p.condition} · ${p.lastVisit}</div>
      </div>
      <div style="margin-left:auto">${statusBadge(p.status)}</div>
    </div>`).join('');
}

function renderMetrics() {
  document.getElementById('metricsGrid').innerHTML = metrics.map(m => `
    <div class="metric-item">
      <div class="metric-label">${m.label}</div>
      <div class="metric-value" style="color:${m.color}">${m.value}</div>
      <div class="metric-sub">${m.sub}</div>
      <div class="metric-bar"><div class="metric-fill" style="width:${m.pct}%;background:${m.color}"></div></div>
    </div>`).join('');
}

// ── Patients Table ────────────────────────────────────────────────────────

function renderPatients(list) {
  document.getElementById('patientTableBody').innerHTML = list.map(p => `
    <tr>
      <td><code style="font-size:12px;color:var(--muted)">${p.id}</code></td>
      <td>
        <div style="display:flex;align-items:center;gap:8px">
          <div class="patient-avatar" style="width:28px;height:28px;font-size:10px">${initials(p.name)}</div>
          ${p.name}
        </div>
      </td>
      <td>${p.age}</td>
      <td>${p.gender}</td>
      <td>${p.condition}</td>
      <td>${p.lastVisit}</td>
      <td>${statusBadge(p.status)}</td>
      <td>
        <button class="tbl-btn" onclick="viewPatient('${p.id}')">View</button>
        <button class="tbl-btn" onclick="editPatient('${p.id}')">Edit</button>
      </td>
    </tr>`).join('');
}

document.getElementById('patientSearch').addEventListener('input', e => {
  const q = e.target.value.toLowerCase();
  renderPatients(patients.filter(p =>
    p.name.toLowerCase().includes(q) ||
    p.id.toLowerCase().includes(q) ||
    p.condition.toLowerCase().includes(q)
  ));
});

// ── Appointments Table ────────────────────────────────────────────────────

function renderAppointments(list) {
  document.getElementById('apptTableBody').innerHTML = list.map((a, i) => `
    <tr>
      <td>
        <div style="font-weight:600">${a.time}</div>
        <div style="font-size:11px;color:var(--muted)">${a.date}</div>
      </td>
      <td>${a.patient}</td>
      <td>${a.doctor}</td>
      <td>${a.type}</td>
      <td>${statusBadge(a.status)}</td>
      <td>
        <button class="tbl-btn" onclick="changeApptStatus(${i})">
          ${a.status === 'Confirmed' ? 'Cancel' : 'Confirm'}
        </button>
      </td>
    </tr>`).join('');
}

document.getElementById('apptSearch').addEventListener('input', e => {
  const q = e.target.value.toLowerCase();
  renderAppointments(appointments.filter(a =>
    a.patient.toLowerCase().includes(q) ||
    a.doctor.toLowerCase().includes(q) ||
    a.type.toLowerCase().includes(q)
  ));
});

function changeApptStatus(idx) {
  appointments[idx].status = appointments[idx].status === 'Confirmed' ? 'Cancelled' : 'Confirmed';
  renderAppointments(appointments);
  renderDashAppts();
  showToast('Appointment status updated');
}

// ── Records ───────────────────────────────────────────────────────────────

function renderRecords() {
  document.getElementById('recordsGrid').innerHTML = records.map(r => `
    <div class="record-card">
      <div class="record-icon">${r.icon}</div>
      <div class="record-type">${r.type}</div>
      <div class="record-name">${r.name}</div>
      <div style="margin-top:6px;font-size:12px;color:var(--muted)">Patient: ${r.patient}</div>
      <div class="record-date">${r.date}</div>
    </div>`).join('');
}

// ── Modals ────────────────────────────────────────────────────────────────

function openModal(title, html) {
  document.getElementById('modalTitle').textContent = title;
  document.getElementById('modalBody').innerHTML = html;
  document.getElementById('modalOverlay').classList.add('open');
}

function closeModal() {
  document.getElementById('modalOverlay').classList.remove('open');
}

document.getElementById('modalClose').addEventListener('click', closeModal);
document.getElementById('modalOverlay').addEventListener('click', e => {
  if (e.target === document.getElementById('modalOverlay')) closeModal();
});

function viewPatient(id) {
  const p = patients.find(x => x.id === id);
  if (!p) return;
  openModal(`Patient: ${p.name}`, `
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px">
      <div><div style="font-size:11px;color:var(--muted);text-transform:uppercase;margin-bottom:4px">Patient ID</div><div style="font-weight:600">${p.id}</div></div>
      <div><div style="font-size:11px;color:var(--muted);text-transform:uppercase;margin-bottom:4px">Status</div>${statusBadge(p.status)}</div>
      <div><div style="font-size:11px;color:var(--muted);text-transform:uppercase;margin-bottom:4px">Age</div><div style="font-weight:600">${p.age}</div></div>
      <div><div style="font-size:11px;color:var(--muted);text-transform:uppercase;margin-bottom:4px">Gender</div><div style="font-weight:600">${p.gender}</div></div>
      <div><div style="font-size:11px;color:var(--muted);text-transform:uppercase;margin-bottom:4px">Condition</div><div style="font-weight:600">${p.condition}</div></div>
      <div><div style="font-size:11px;color:var(--muted);text-transform:uppercase;margin-bottom:4px">Last Visit</div><div style="font-weight:600">${p.lastVisit}</div></div>
    </div>
    <div style="margin-top:16px;text-align:right">
      <button class="btn-secondary" onclick="closeModal()">Close</button>
    </div>`);
}

function editPatient(id) {
  const p = patients.find(x => x.id === id);
  if (!p) return;
  openModal(`Edit: ${p.name}`, `
    <div class="modal-form">
      <div class="form-row"><label>Name</label><input type="text" id="editName" value="${p.name}" /></div>
      <div class="form-row"><label>Age</label><input type="number" id="editAge" value="${p.age}" /></div>
      <div class="form-row"><label>Condition</label><input type="text" id="editCondition" value="${p.condition}" /></div>
      <div class="form-row"><label>Status</label>
        <select id="editStatus">
          <option ${p.status==='Active'?'selected':''}>Active</option>
          <option ${p.status==='Inactive'?'selected':''}>Inactive</option>
          <option ${p.status==='Critical'?'selected':''}>Critical</option>
        </select>
      </div>
      <div class="modal-actions">
        <button class="btn-secondary" onclick="closeModal()">Cancel</button>
        <button class="btn-primary" onclick="savePatient('${id}')">Save</button>
      </div>
    </div>`);
}

function savePatient(id) {
  const p = patients.find(x => x.id === id);
  if (!p) return;
  p.name      = document.getElementById('editName').value;
  p.age       = parseInt(document.getElementById('editAge').value);
  p.condition = document.getElementById('editCondition').value;
  p.status    = document.getElementById('editStatus').value;
  renderPatients(patients);
  renderRecentPatients();
  closeModal();
  showToast('Patient record updated');
}

// Add Patient
document.getElementById('addPatientBtn').addEventListener('click', () => {
  openModal('Add New Patient', `
    <div class="modal-form">
      <div class="form-row"><label>Full Name</label><input type="text" id="newName" placeholder="e.g. John Doe" /></div>
      <div class="form-row"><label>Age</label><input type="number" id="newAge" placeholder="e.g. 45" /></div>
      <div class="form-row"><label>Gender</label>
        <select id="newGender"><option>Male</option><option>Female</option><option>Other</option></select>
      </div>
      <div class="form-row"><label>Condition</label><input type="text" id="newCondition" placeholder="e.g. Hypertension" /></div>
      <div class="modal-actions">
        <button class="btn-secondary" onclick="closeModal()">Cancel</button>
        <button class="btn-primary" onclick="addPatient()">Add Patient</button>
      </div>
    </div>`);
});

function addPatient() {
  const name = document.getElementById('newName').value.trim();
  if (!name) { showToast('Name is required'); return; }
  const id = 'P' + String(patients.length + 1).padStart(3, '0');
  patients.unshift({
    id,
    name,
    age:       parseInt(document.getElementById('newAge').value) || 0,
    gender:    document.getElementById('newGender').value,
    condition: document.getElementById('newCondition').value || '—',
    lastVisit: new Date().toISOString().slice(0,10),
    status:   'Active'
  });
  renderPatients(patients);
  renderRecentPatients();
  document.getElementById('statPatients').textContent = patients.length;
  closeModal();
  showToast(`Patient ${name} added`);
}

// Add Appointment
document.getElementById('addApptBtn').addEventListener('click', () => {
  openModal('Schedule Appointment', `
    <div class="modal-form">
      <div class="form-row"><label>Patient Name</label><input type="text" id="newApptPatient" placeholder="e.g. Alice Johnson" /></div>
      <div class="form-row"><label>Date</label><input type="date" id="newApptDate" /></div>
      <div class="form-row"><label>Time</label><input type="time" id="newApptTime" /></div>
      <div class="form-row"><label>Type</label>
        <select id="newApptType">
          <option>Routine Check</option><option>Follow-up</option><option>Lab Review</option>
          <option>Cardiology</option><option>Neurology</option><option>Orthopedic</option>
        </select>
      </div>
      <div class="modal-actions">
        <button class="btn-secondary" onclick="closeModal()">Cancel</button>
        <button class="btn-primary" onclick="addAppointment()">Schedule</button>
      </div>
    </div>`);
});

function addAppointment() {
  const patient = document.getElementById('newApptPatient').value.trim();
  const date    = document.getElementById('newApptDate').value;
  const time    = document.getElementById('newApptTime').value;
  if (!patient || !date || !time) { showToast('All fields are required'); return; }
  appointments.unshift({ time, patient, doctor:'Dr. Reynolds', type: document.getElementById('newApptType').value, status:'Pending', date });
  renderAppointments(appointments);
  renderDashAppts();
  document.getElementById('statToday').textContent = appointments.filter(a => a.date === '2026-05-27').length;
  closeModal();
  showToast(`Appointment scheduled for ${patient}`);
}

// ── Global Search ─────────────────────────────────────────────────────────

document.getElementById('globalSearch').addEventListener('input', e => {
  const q = e.target.value.toLowerCase().trim();
  if (!q) return;
  const match = patients.find(p => p.name.toLowerCase().includes(q) || p.id.toLowerCase().includes(q));
  if (match) { navigate('patients'); document.getElementById('patientSearch').value = e.target.value; renderPatients(patients.filter(p => p.name.toLowerCase().includes(q))); }
});

// ── Toast ─────────────────────────────────────────────────────────────────

function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2800);
}

// ── Condition Distribution Chart ──────────────────────────────────────────

const CHART_COLORS = [
  '#2563eb','#16a34a','#ea580c','#dc2626',
  '#8b5cf6','#0891b2','#d97706','#db2777',
  '#65a30d','#6366f1',
];

function buildConditionData() {
  const counts = {};
  patients.forEach(p => {
    counts[p.condition] = (counts[p.condition] || 0) + 1;
  });
  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1]);
}

function renderConditionChart() {
  const canvas = document.getElementById('conditionChart');
  if (!canvas) return;

  // Fit canvas pixels to its CSS size
  const wrap = canvas.parentElement;
  canvas.width  = wrap.clientWidth  || 600;
  canvas.height = wrap.clientHeight || 260;

  const ctx   = canvas.getContext('2d');
  const data  = buildConditionData();
  const max   = data[0][1];
  const W     = canvas.width;
  const H     = canvas.height;
  const PAD   = { top: 16, right: 20, bottom: 36, left: 130 };
  const barH  = Math.min(28, (H - PAD.top - PAD.bottom) / data.length - 6);
  const gap   = (H - PAD.top - PAD.bottom - barH * data.length) / (data.length + 1);
  const chartW = W - PAD.left - PAD.right;

  ctx.clearRect(0, 0, W, H);

  // Grid lines & x-axis ticks
  const ticks = max <= 3 ? max : 4;
  ctx.strokeStyle = '#e2e8f0';
  ctx.lineWidth   = 1;
  ctx.fillStyle   = '#94a3b8';
  ctx.font        = '11px -apple-system, sans-serif';
  ctx.textAlign   = 'center';

  for (let i = 0; i <= ticks; i++) {
    const x = PAD.left + (chartW / ticks) * i;
    ctx.beginPath();
    ctx.moveTo(x, PAD.top);
    ctx.lineTo(x, H - PAD.bottom);
    ctx.stroke();
    ctx.fillText(Math.round((max / ticks) * i), x, H - PAD.bottom + 14);
  }

  // Bars
  data.forEach(([condition, count], i) => {
    const color = CHART_COLORS[i % CHART_COLORS.length];
    const y     = PAD.top + gap * (i + 1) + barH * i;
    const w     = (count / max) * chartW;

    // Bar background track
    ctx.fillStyle = '#f1f5f9';
    ctx.beginPath();
    ctx.roundRect(PAD.left, y, chartW, barH, 4);
    ctx.fill();

    // Filled bar
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.roundRect(PAD.left, y, w, barH, 4);
    ctx.fill();

    // Label (condition name)
    ctx.fillStyle = '#0f172a';
    ctx.textAlign = 'right';
    ctx.font      = '12px -apple-system, sans-serif';
    ctx.fillText(condition, PAD.left - 8, y + barH / 2 + 4);

    // Count badge at bar end
    ctx.fillStyle = color;
    ctx.textAlign = 'left';
    ctx.font      = 'bold 11px -apple-system, sans-serif';
    ctx.fillText(count, PAD.left + w + 6, y + barH / 2 + 4);
  });

  // Axis line
  ctx.strokeStyle = '#cbd5e1';
  ctx.lineWidth   = 1.5;
  ctx.beginPath();
  ctx.moveTo(PAD.left, PAD.top);
  ctx.lineTo(PAD.left, H - PAD.bottom);
  ctx.stroke();

  // Legend
  const legendEl = document.getElementById('chartLegend');
  if (legendEl) {
    legendEl.innerHTML = data.map(([condition], i) => `
      <div class="legend-item">
        <div class="legend-dot" style="background:${CHART_COLORS[i % CHART_COLORS.length]}"></div>
        ${condition}
      </div>`).join('');
  }
}

// Re-draw on window resize so the chart stays crisp
window.addEventListener('resize', renderConditionChart);

// ── Init ──────────────────────────────────────────────────────────────────

renderDashAppts();
renderRecentPatients();
renderMetrics();
renderPatients(patients);
renderAppointments(appointments);
renderRecords();
renderConditionChart();
