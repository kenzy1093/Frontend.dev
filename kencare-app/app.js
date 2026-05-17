import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, updateDoc, deleteDoc, doc, query, orderBy } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyCcKoCeSrQyFYFlO44Sq9YyomHIkKNaWNc",
    authDomain: "kencare-66f5a.firebaseapp.com",
    projectId: "kencare-66f5a",
    storageBucket: "kencare-66f5a.firebasestorage.app",
    messagingSenderId: "178008977556",
    appId: "1:178008977556:web:5f15fd045806c4dfa2c481"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

let patientsData = [];
let chartInstance = null;
let revChartInstance = null;

let basePricing = JSON.parse(localStorage.getItem('kencare_pricing')) || {
    "Adult Visit": 5000, "Senior Visit": 4000, "Child Visit": 3500,
    "Basic School Medical": 2500, "Primary School Medical": 3000,
    "High School Medical": 3500, "Work Medical": 5000,
    "Result": 0, "Insurance Only": 0, "No Charge": 0
};

// --- Navigation ---
document.getElementById('mobile-menu-btn').addEventListener('click', () => document.getElementById('sidebar').classList.toggle('open'));

document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
        btn.classList.add('active');
        document.getElementById(btn.dataset.target).classList.add('active');
        document.getElementById('sidebar').classList.remove('open');
        if(btn.dataset.target === 'dashboard-view') initDashboard();
        if(btn.dataset.target === 'financial-view') renderFinance();
    });
});

document.getElementById('theme-toggle').addEventListener('click', () => {
    const isDark = document.body.getAttribute('data-theme') === 'dark';
    document.body.setAttribute('data-theme', isDark ? 'light' : 'dark');
});

// --- Search/Filter ---
document.getElementById('global-search').addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase();
    const filtered = patientsData.filter(p => p.firstName.toLowerCase().includes(term) || p.lastName.toLowerCase().includes(term));
    updateTable(filtered);
});

document.getElementById('toggle-advanced').addEventListener('click', () => document.getElementById('advanced-search-panel').classList.toggle('hidden'));

document.getElementById('apply-filters').addEventListener('click', () => {
    const start = document.getElementById('search-date-start').value;
    const end = document.getElementById('search-date-end').value;
    const key = document.getElementById('search-keywords').value.toLowerCase();
    const filtered = patientsData.filter(p => {
        const matchesDate = (!start || p.date >= start) && (!end || p.date <= end);
        const matchesKey = !key || `${p.symptoms} ${p.diagnosis}`.toLowerCase().includes(key);
        return matchesDate && matchesKey;
    });
    updateTable(filtered);
});

// --- Records ---
document.getElementById('patient-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const visit = {
        firstName: document.getElementById('p-firstname').value,
        lastName: document.getElementById('p-lastname').value,
        dob: document.getElementById('p-dob').value || "",
        visitType: document.getElementById('p-visit-type').value,
        symptoms: document.getElementById('p-symptoms').value,
        diagnosis: document.getElementById('p-diagnosis').value || "",
        procedure: document.getElementById('p-procedure').value || "",
        procCost: parseFloat(document.getElementById('p-proc-cost').value) || 0,
        date: document.getElementById('p-visit-date').value,
        timestamp: new Date(document.getElementById('p-visit-date').value).getTime()
    };
    await addDoc(collection(db, "patients"), visit);
    window.location.reload();
});

window.editVisit = (id) => {
    const p = patientsData.find(item => item.id === id);
    document.getElementById('edit-id').value = id;
    document.getElementById('edit-visit-date').value = p.date;
    document.getElementById('edit-dob').value = p.dob;
    document.getElementById('edit-firstname').value = p.firstName;
    document.getElementById('edit-lastname').value = p.lastName;
    document.getElementById('edit-visit-type').value = p.visitType;
    document.getElementById('edit-symptoms').value = p.symptoms;
    document.getElementById('edit-diagnosis').value = p.diagnosis;
    document.getElementById('edit-proc-cost').value = p.procCost;
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
    document.getElementById('edit-patient-view').classList.add('active');
};

document.getElementById('edit-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!confirm("Are you sure you want to update this record?")) return;
    const id = document.getElementById('edit-id').value;
    const data = {
        firstName: document.getElementById('edit-firstname').value,
        lastName: document.getElementById('edit-lastname').value,
        dob: document.getElementById('edit-dob').value,
        visitType: document.getElementById('edit-visit-type').value,
        symptoms: document.getElementById('edit-symptoms').value,
        diagnosis: document.getElementById('edit-diagnosis').value,
        procCost: parseFloat(document.getElementById('edit-proc-cost').value) || 0,
        date: document.getElementById('edit-visit-date').value,
        timestamp: new Date(document.getElementById('edit-visit-date').value).getTime()
    };
    await updateDoc(doc(db, "patients", id), data);
    window.location.reload();
});

document.getElementById('cancel-edit').addEventListener('click', () => { if(confirm("Cancel editing?")) window.location.reload(); });

window.deleteVisit = async (id) => { if(confirm("Permanently delete?")) { await deleteDoc(doc(db,"patients",id)); window.location.reload(); }};

// --- Logic ---
function updateTable(data = patientsData) {
    const tbody = document.getElementById('table-body');
    tbody.innerHTML = data.map(p => `<tr><td>${p.date}</td><td>${p.lastName}, ${p.firstName}</td><td>${p.visitType}</td><td><button class="edit-btn" onclick="window.editVisit('${p.id}')"><i class="fa-solid fa-pen"></i></button><button class="delete-btn" onclick="window.deleteVisit('${p.id}')"><i class="fa-solid fa-trash"></i></button></td></tr>`).join('');
}

function initDashboard() {
    const ctx = document.getElementById('visitsChart');
    if(!ctx) return;
    const types = [...new Set(patientsData.map(p => p.visitType))];
    const datasets = types.map((t, i) => {
        const counts = [0,0,0,0];
        patientsData.filter(p => p.visitType === t).forEach(p => {
            const day = new Date(p.date).getDate();
            if(day <= 7) counts[0]++; else if(day <= 14) counts[1]++; else if(day <= 21) counts[2]++; else counts[3]++;
        });
        return { label: t, data: counts, backgroundColor: ['#2563eb','#10b981','#f59e0b','#ef4444','#8b5cf6'][i%5] };
    });
    if(chartInstance) chartInstance.destroy();
    chartInstance = new Chart(ctx.getContext('2d'), { type:'bar', data:{ labels:['Wk 1','Wk 2','Wk 3','Wk 4'], datasets }, options:{ responsive:true, maintainAspectRatio:false, scales:{ x:{stacked:true}, y:{stacked:true}} }});
    document.getElementById('stat-total').innerText = patientsData.length;
    document.getElementById('stat-today').innerText = patientsData.filter(p => p.date === new Date().toISOString().split('T')[0]).length;
}

function renderFinance() {
    const tbody = document.getElementById('pricing-body');
    tbody.innerHTML = Object.entries(basePricing).map(([t, p]) => `<tr><td>${t}</td><td>$<input type="number" class="price-input" data-type="${t}" value="${p}"></td></tr>`).join('');
    const ctx = document.getElementById('revenueChart');
    if(!ctx) return;
    const dailyRev = new Array(31).fill(0);
    patientsData.forEach(p => { const d = new Date(p.date); if(d.getMonth() === new Date().getMonth()) dailyRev[d.getDate()-1] += (basePricing[p.visitType] || 0) + (p.procCost || 0); });
    let total = 0; const revData = dailyRev.map(v => total += v);
    if(revChartInstance) revChartInstance.destroy();
    revChartInstance = new Chart(ctx.getContext('2d'), { type:'line', data:{ labels: Array.from({length:31}, (_,i)=>i+1), datasets:[{ label:'Revenue ($)', data:revData, borderColor:'#10b981', fill:true, backgroundColor:'rgba(16,185,129,0.1)' }]}, options:{ responsive:true, maintainAspectRatio:false }});
}

document.getElementById('save-pricing').addEventListener('click', () => {
    document.querySelectorAll('.price-input').forEach(i => basePricing[i.dataset.type] = parseFloat(i.value));
    localStorage.setItem('kencare_pricing', JSON.stringify(basePricing));
    alert("Pricing Saved!");
    renderFinance();
});

document.getElementById('export-excel').addEventListener('click', () => {
    let t = 0;
    const d = patientsData.map(p => { 
        const cost = (basePricing[p.visitType]||0)+(p.procCost||0); t += cost;
        return { Date: p.date, Name: `${p.lastName}, ${p.firstName}`, Age: p.dob ? (new Date().getFullYear()-new Date(p.dob).getFullYear()) : "N/A", Type: p.visitType, Cost: cost };
    });
    d.push({ Date: "TOTAL", Name: "", Age: "", Type: "", Cost: t });
    const ws = XLSX.utils.json_to_sheet(d);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Report");
    XLSX.writeFile(wb, "KenCare_Report.xlsx");
});

window.onload = async () => {
    const snap = await getDocs(query(collection(db, "patients"), orderBy("timestamp", "desc")));
    patientsData = snap.docs.map(d => ({ id: d.id, ...d.data() }));
    document.getElementById('p-visit-date').value = new Date().toISOString().split('T')[0];
    updateTable();
    initDashboard();
};