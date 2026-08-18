import { useState, Component } from 'react'
import { BrowserRouter, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom'

/* ================================================================
   ERROR BOUNDARY
================================================================ */
class ErrorBoundary extends Component {
  constructor(props) { super(props); this.state = { hasError: false, error: null }; }
  static getDerivedStateFromError(error) { return { hasError: true, error }; }
  componentDidCatch(error, info) { console.error('App crashed:', error, info); }
  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-8">
          <div className="bg-white rounded-2xl shadow-lg border border-red-100 p-8 max-w-2xl w-full">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-4xl">❌</span>
              <h2 className="text-xl font-bold text-red-700">Page Crash Detected</h2>
            </div>
            <p className="text-slate-600 mb-4">React component threw an error. Details below:</p>
            <pre className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-800 text-xs overflow-auto whitespace-pre-wrap">
              {this.state.error?.message}\n\n{this.state.error?.stack}
            </pre>
            <button onClick={() => this.setState({ hasError: false, error: null })}
              className="mt-4 px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-sm font-semibold transition-colors">
              Try Again
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

/* ================================================================
   HARDCODED DATA — 1 Admin, 20 Doctors, 30 Patients
================================================================ */
const ADMIN = {
  id: 'admin-1', name: 'System Administrator', email: 'admin@medcare.com',
  password: 'Admin@123', role: 'admin', status: 'active'
};

const DOCTORS_DATA = [
  { id:'d1',  name:'Dr. Rajesh Kumar',    email:'rajesh.kumar@medcare.com',    password:'Doc@123', role:'doctor', specialization:'Cardiology',        department:'Cardiac Care',     experience:12, qualifications:'MBBS, MD (Cardiology)',       status:'active',   joinDate:'2012-04-15' },
  { id:'d2',  name:'Dr. Priya Sharma',    email:'priya.sharma@medcare.com',    password:'Doc@123', role:'doctor', specialization:'Neurology',          department:'Neurosciences',    experience:8,  qualifications:'MBBS, DM (Neurology)',         status:'active',   joinDate:'2016-07-22' },
  { id:'d3',  name:'Dr. Amit Patel',      email:'amit.patel@medcare.com',      password:'Doc@123', role:'doctor', specialization:'Orthopedics',        department:'Bone & Joint',     experience:15, qualifications:'MBBS, MS (Ortho)',             status:'active',   joinDate:'2009-01-10' },
  { id:'d4',  name:'Dr. Sunita Singh',    email:'sunita.singh@medcare.com',    password:'Doc@123', role:'doctor', specialization:'Pediatrics',         department:'Child Health',     experience:10, qualifications:'MBBS, MD (Pediatrics)',        status:'active',   joinDate:'2014-09-05' },
  { id:'d5',  name:'Dr. Vikram Malhotra', email:'vikram.malhotra@medcare.com', password:'Doc@123', role:'doctor', specialization:'Dermatology',        department:'Skin Care',        experience:7,  qualifications:'MBBS, MD (Dermatology)',       status:'active',   joinDate:'2017-03-18' },
  { id:'d6',  name:'Dr. Anita Gupta',     email:'anita.gupta@medcare.com',     password:'Doc@123', role:'doctor', specialization:'Gynecology',         department:"Women's Health",   experience:11, qualifications:'MBBS, MS (Gynecology)',        status:'active',   joinDate:'2013-11-28' },
  { id:'d7',  name:'Dr. Suresh Verma',    email:'suresh.verma@medcare.com',    password:'Doc@123', role:'doctor', specialization:'Ophthalmology',      department:'Eye Care',         experience:9,  qualifications:'MBBS, MS (Ophthalmology)',     status:'active',   joinDate:'2015-06-14' },
  { id:'d8',  name:'Dr. Meera Joshi',     email:'meera.joshi@medcare.com',     password:'Doc@123', role:'doctor', specialization:'ENT',                department:'ENT Care',         experience:6,  qualifications:'MBBS, MS (ENT)',               status:'active',   joinDate:'2018-02-07' },
  { id:'d9',  name:'Dr. Arjun Nair',      email:'arjun.nair@medcare.com',      password:'Doc@123', role:'doctor', specialization:'Psychiatry',         department:'Mental Health',    experience:13, qualifications:'MBBS, MD (Psychiatry)',        status:'active',   joinDate:'2011-08-30' },
  { id:'d10', name:'Dr. Pooja Reddy',     email:'pooja.reddy@medcare.com',     password:'Doc@123', role:'doctor', specialization:'Endocrinology',      department:'Endocrine Care',   experience:9,  qualifications:'MBBS, DM (Endocrinology)',     status:'active',   joinDate:'2015-05-20' },
  { id:'d11', name:'Dr. Rajan Iyer',      email:'rajan.iyer@medcare.com',      password:'Doc@123', role:'doctor', specialization:'Gastroenterology',   department:'GI Care',          experience:14, qualifications:'MBBS, DM (Gastroenterology)', status:'active',   joinDate:'2010-12-02' },
  { id:'d12', name:'Dr. Deepika Rao',     email:'deepika.rao@medcare.com',     password:'Doc@123', role:'doctor', specialization:'Pulmonology',        department:'Respiratory Care', experience:8,  qualifications:'MBBS, MD (Pulmonology)',       status:'active',   joinDate:'2016-04-11' },
  { id:'d13', name:'Dr. Mohit Sharma',    email:'mohit.sharma@medcare.com',    password:'Doc@123', role:'doctor', specialization:'Urology',            department:'Urology',          experience:11, qualifications:'MBBS, MS (Urology)',           status:'active',   joinDate:'2013-07-19' },
  { id:'d14', name:'Dr. Kavya Menon',     email:'kavya.menon@medcare.com',     password:'Doc@123', role:'doctor', specialization:'Rheumatology',       department:'Rheumatology',     experience:7,  qualifications:'MBBS, DM (Rheumatology)',      status:'active',   joinDate:'2017-10-25' },
  { id:'d15', name:'Dr. Anil Kapoor',     email:'anil.kapoor@medcare.com',     password:'Doc@123', role:'doctor', specialization:'Oncology',           department:'Cancer Care',      experience:16, qualifications:'MBBS, MD (Oncology)',          status:'active',   joinDate:'2008-03-08' },
  { id:'d16', name:'Dr. Shreya Desai',    email:'shreya.desai@medcare.com',    password:'Doc@123', role:'doctor', specialization:'Nephrology',         department:'Kidney Care',      experience:10, qualifications:'MBBS, DM (Nephrology)',        status:'inactive', joinDate:'2014-06-17' },
  { id:'d17', name:'Dr. Vivek Pandey',    email:'vivek.pandey@medcare.com',    password:'Doc@123', role:'doctor', specialization:'Hematology',         department:'Blood Disorders',  experience:8,  qualifications:'MBBS, MD (Hematology)',        status:'active',   joinDate:'2016-09-03' },
  { id:'d18', name:'Dr. Nisha Kumar',     email:'nisha.kumar@medcare.com',     password:'Doc@123', role:'doctor', specialization:'Radiology',          department:'Imaging',          experience:12, qualifications:'MBBS, MD (Radiology)',         status:'active',   joinDate:'2012-01-24' },
  { id:'d19', name:'Dr. Kiran Bose',      email:'kiran.bose@medcare.com',      password:'Doc@123', role:'doctor', specialization:'Anesthesiology',     department:'Anesthesia',       experience:9,  qualifications:'MBBS, MD (Anesthesia)',        status:'active',   joinDate:'2015-11-14' },
  { id:'d20', name:'Dr. Rohit Shetty',    email:'rohit.shetty@medcare.com',    password:'Doc@123', role:'doctor', specialization:'Emergency Medicine', department:'Emergency',        experience:7,  qualifications:'MBBS, MD (Emergency)',         status:'active',   joinDate:'2017-08-22' },
];

const PATIENTS_DATA = [
  { id:'p1',  name:'Rahul Gupta',       email:'rahul.gupta@gmail.com',       password:'Pat@123', role:'patient', dob:'1985-03-15', bloodGroup:'A+',  phone:'9876543210', assignedDoctorId:'d1',  conditions:['Hypertension','High Cholesterol'],  status:'active', joinDate:'2023-01-10' },
  { id:'p2',  name:'Sneha Verma',       email:'sneha.verma@gmail.com',       password:'Pat@123', role:'patient', dob:'1990-07-22', bloodGroup:'B+',  phone:'9876543211', assignedDoctorId:'d1',  conditions:['Arrhythmia'],                        status:'active', joinDate:'2023-02-14' },
  { id:'p3',  name:'Manoj Tiwari',      email:'manoj.tiwari@gmail.com',      password:'Pat@123', role:'patient', dob:'1978-11-30', bloodGroup:'O+',  phone:'9876543212', assignedDoctorId:'d1',  conditions:['Coronary Artery Disease'],           status:'active', joinDate:'2023-03-05' },
  { id:'p4',  name:'Kavita Sharma',     email:'kavita.sharma@gmail.com',     password:'Pat@123', role:'patient', dob:'1995-05-18', bloodGroup:'AB+', phone:'9876543213', assignedDoctorId:'d2',  conditions:['Migraine','Epilepsy'],               status:'active', joinDate:'2023-01-20' },
  { id:'p5',  name:'Ajay Mishra',       email:'ajay.mishra@gmail.com',       password:'Pat@123', role:'patient', dob:'1988-09-08', bloodGroup:'A-',  phone:'9876543214', assignedDoctorId:'d2',  conditions:['Multiple Sclerosis'],                status:'active', joinDate:'2023-04-12' },
  { id:'p6',  name:'Priti Singh',       email:'priti.singh@gmail.com',       password:'Pat@123', role:'patient', dob:'1992-12-25', bloodGroup:'B-',  phone:'9876543215', assignedDoctorId:'d2',  conditions:["Parkinson's Disease"],               status:'active', joinDate:'2023-05-08' },
  { id:'p7',  name:'Vikas Yadav',       email:'vikas.yadav@gmail.com',       password:'Pat@123', role:'patient', dob:'1980-04-12', bloodGroup:'O-',  phone:'9876543216', assignedDoctorId:'d3',  conditions:['Knee Osteoarthritis','Spondylitis'], status:'active', joinDate:'2023-02-28' },
  { id:'p8',  name:'Ananya Roy',        email:'ananya.roy@gmail.com',        password:'Pat@123', role:'patient', dob:'1997-08-30', bloodGroup:'AB-', phone:'9876543217', assignedDoctorId:'d3',  conditions:['Fracture Recovery'],                 status:'active', joinDate:'2023-06-15' },
  { id:'p9',  name:'Riya Patel',        email:'riya.patel@gmail.com',        password:'Pat@123', role:'patient', dob:'2010-01-05', bloodGroup:'A+',  phone:'9876543218', assignedDoctorId:'d4',  conditions:['Asthma','Allergies'],                status:'active', joinDate:'2023-01-30' },
  { id:'p10', name:'Aryan Khanna',      email:'aryan.khanna@gmail.com',      password:'Pat@123', role:'patient', dob:'2015-06-20', bloodGroup:'B+',  phone:'9876543219', assignedDoctorId:'d4',  conditions:['Diabetes Type 1'],                   status:'active', joinDate:'2023-03-22' },
  { id:'p11', name:'Deepika Nair',      email:'deepika.nair@gmail.com',      password:'Pat@123', role:'patient', dob:'1993-09-14', bloodGroup:'O+',  phone:'9876543220', assignedDoctorId:'d5',  conditions:['Psoriasis','Eczema'],                status:'active', joinDate:'2023-04-18' },
  { id:'p12', name:'Suresh Menon',      email:'suresh.menon@gmail.com',      password:'Pat@123', role:'patient', dob:'1986-02-28', bloodGroup:'A+',  phone:'9876543221', assignedDoctorId:'d5',  conditions:['Acne','Rosacea'],                    status:'active', joinDate:'2023-05-10' },
  { id:'p13', name:'Neethu Krishnan',   email:'neethu.krishnan@gmail.com',   password:'Pat@123', role:'patient', dob:'1991-07-07', bloodGroup:'B+',  phone:'9876543222', assignedDoctorId:'d6',  conditions:['PCOS','Thyroid'],                    status:'active', joinDate:'2023-02-08' },
  { id:'p14', name:'Pooja Agarwal',     email:'pooja.agarwal@gmail.com',     password:'Pat@123', role:'patient', dob:'1996-11-15', bloodGroup:'AB+', phone:'9876543223', assignedDoctorId:'d6',  conditions:['Endometriosis'],                     status:'active', joinDate:'2023-07-20' },
  { id:'p15', name:'Ramesh Pillai',     email:'ramesh.pillai@gmail.com',     password:'Pat@123', role:'patient', dob:'1975-04-22', bloodGroup:'O+',  phone:'9876543224', assignedDoctorId:'d7',  conditions:['Glaucoma','Cataract'],               status:'active', joinDate:'2023-01-15' },
  { id:'p16', name:'Savita Jain',       email:'savita.jain@gmail.com',       password:'Pat@123', role:'patient', dob:'1988-08-19', bloodGroup:'A+',  phone:'9876543225', assignedDoctorId:'d8',  conditions:['Chronic Sinusitis','Tinnitus'],      status:'active', joinDate:'2023-03-30' },
  { id:'p17', name:'Karan Malhotra',    email:'karan.malhotra@gmail.com',    password:'Pat@123', role:'patient', dob:'1994-12-10', bloodGroup:'B+',  phone:'9876543226', assignedDoctorId:'d9',  conditions:['Depression','Anxiety'],              status:'active', joinDate:'2023-04-05' },
  { id:'p18', name:'Lata Bose',         email:'lata.bose@gmail.com',         password:'Pat@123', role:'patient', dob:'1969-03-28', bloodGroup:'O-',  phone:'9876543227', assignedDoctorId:'d10', conditions:['Diabetes Type 2','Hypothyroidism'],  status:'active', joinDate:'2023-02-20' },
  { id:'p19', name:'Nitin Saxena',      email:'nitin.saxena@gmail.com',      password:'Pat@123', role:'patient', dob:'1983-06-05', bloodGroup:'A+',  phone:'9876543228', assignedDoctorId:'d11', conditions:['IBS','GERD'],                        status:'active', joinDate:'2023-05-25' },
  { id:'p20', name:'Preeti Dubey',      email:'preeti.dubey@gmail.com',      password:'Pat@123', role:'patient', dob:'1990-10-14', bloodGroup:'B+',  phone:'9876543229', assignedDoctorId:'d12', conditions:['COPD','Sleep Apnea'],                status:'active', joinDate:'2023-06-10' },
  { id:'p21', name:'Santosh Kumar',     email:'santosh.kumar@gmail.com',     password:'Pat@123', role:'patient', dob:'1977-01-25', bloodGroup:'AB+', phone:'9876543230', assignedDoctorId:'d13', conditions:['Kidney Stones','BPH'],               status:'active', joinDate:'2023-03-14' },
  { id:'p22', name:'Anjali Srivastava', email:'anjali.srivastava@gmail.com', password:'Pat@123', role:'patient', dob:'1995-04-30', bloodGroup:'O+',  phone:'9876543231', assignedDoctorId:'d13', conditions:['UTI','Bladder Issues'],               status:'active', joinDate:'2023-07-08' },
  { id:'p23', name:'Rajiv Bhat',        email:'rajiv.bhat@gmail.com',        password:'Pat@123', role:'patient', dob:'1972-08-16', bloodGroup:'A+',  phone:'9876543232', assignedDoctorId:'d14', conditions:['Rheumatoid Arthritis','Gout'],        status:'active', joinDate:'2023-01-28' },
  { id:'p24', name:'Meena Chandran',    email:'meena.chandran@gmail.com',    password:'Pat@123', role:'patient', dob:'1965-11-22', bloodGroup:'B-',  phone:'9876543233', assignedDoctorId:'d15', conditions:['Breast Cancer (Stage 2)'],            status:'active', joinDate:'2023-02-16' },
  { id:'p25', name:'Sachin Rawat',      email:'sachin.rawat@gmail.com',      password:'Pat@123', role:'patient', dob:'1980-05-04', bloodGroup:'O+',  phone:'9876543234', assignedDoctorId:'d16', conditions:['Chronic Kidney Disease'],             status:'active', joinDate:'2023-04-22' },
  { id:'p26', name:'Sunita Pal',        email:'sunita.pal@gmail.com',        password:'Pat@123', role:'patient', dob:'1987-09-18', bloodGroup:'A+',  phone:'9876543235', assignedDoctorId:'d17', conditions:['Anemia','Thalassemia'],              status:'active', joinDate:'2023-03-07' },
  { id:'p27', name:'Aakash Mehta',      email:'aakash.mehta@gmail.com',      password:'Pat@123', role:'patient', dob:'2000-02-12', bloodGroup:'B+',  phone:'9876543236', assignedDoctorId:'d17', conditions:['Leukemia'],                          status:'active', joinDate:'2023-05-30' },
  { id:'p28', name:'Rekha Bansal',      email:'rekha.bansal@gmail.com',      password:'Pat@123', role:'patient', dob:'1973-07-27', bloodGroup:'AB-', phone:'9876543237', assignedDoctorId:'d18', conditions:['Suspected Tumor (Imaging Req.)'],    status:'active', joinDate:'2023-06-20' },
  { id:'p29', name:'Prakash Nanda',     email:'prakash.nanda@gmail.com',     password:'Pat@123', role:'patient', dob:'1968-12-08', bloodGroup:'O+',  phone:'9876543238', assignedDoctorId:'d19', conditions:['Pre-op Assessment'],                 status:'active', joinDate:'2023-07-01' },
  { id:'p30', name:'Geeta Rajan',       email:'geeta.rajan@gmail.com',       password:'Pat@123', role:'patient', dob:'1992-03-20', bloodGroup:'A+',  phone:'9876543239', assignedDoctorId:'d20', conditions:['Trauma','Emergency Care'],            status:'active', joinDate:'2023-07-15' },
];

const INITIAL_APPOINTMENTS = [
  { id:'apt1', patientId:'p1',  doctorId:'d1',  date:'2026-08-20', time:'09:00', reason:'Routine Checkup',       status:'scheduled', notes:'' },
  { id:'apt2', patientId:'p2',  doctorId:'d1',  date:'2026-08-20', time:'10:00', reason:'BP Review',             status:'scheduled', notes:'' },
  { id:'apt3', patientId:'p4',  doctorId:'d2',  date:'2026-08-20', time:'09:30', reason:'Headache Follow-up',    status:'scheduled', notes:'' },
  { id:'apt4', patientId:'p7',  doctorId:'d3',  date:'2026-08-21', time:'11:00', reason:'X-Ray Review',          status:'scheduled', notes:'' },
  { id:'apt5', patientId:'p9',  doctorId:'d4',  date:'2026-08-21', time:'10:00', reason:'Vaccination',           status:'scheduled', notes:'' },
  { id:'apt6', patientId:'p1',  doctorId:'d1',  date:'2026-08-10', time:'09:00', reason:'Initial Consultation',  status:'completed', notes:'Patient responded well to medication.' },
  { id:'apt7', patientId:'p17', doctorId:'d9',  date:'2026-08-19', time:'14:00', reason:'Therapy Session',       status:'scheduled', notes:'' },
  { id:'apt8', patientId:'p18', doctorId:'d10', date:'2026-08-22', time:'11:30', reason:'Sugar Level Review',    status:'scheduled', notes:'' },
  { id:'apt9', patientId:'p3',  doctorId:'d1',  date:'2026-08-12', time:'15:00', reason:'ECG & Stress Test',     status:'completed', notes:'ECG normal.' },
];

const INITIAL_PRESCRIPTIONS = [
  { id:'rx1', patientId:'p1',  doctorId:'d1',  date:'2026-08-10', doctorName:'Dr. Rajesh Kumar',
    medicines:[{name:'Amlodipine',dose:'5mg',frequency:'Once daily',duration:'30 days'},{name:'Atorvastatin',dose:'20mg',frequency:'Once at night',duration:'30 days'}],
    notes:'Low-sodium diet. Exercise 30 min daily.' },
  { id:'rx2', patientId:'p4',  doctorId:'d2',  date:'2026-08-05', doctorName:'Dr. Priya Sharma',
    medicines:[{name:'Sumatriptan',dose:'50mg',frequency:'As needed (SOS)',duration:'SOS'},{name:'Topiramate',dose:'25mg',frequency:'Twice daily',duration:'60 days'}],
    notes:'Avoid bright lights. Keep headache diary.' },
  { id:'rx3', patientId:'p17', doctorId:'d9',  date:'2026-08-12', doctorName:'Dr. Arjun Nair',
    medicines:[{name:'Sertraline',dose:'50mg',frequency:'Once daily',duration:'90 days'},{name:'Clonazepam',dose:'0.5mg',frequency:'Twice daily',duration:'30 days'}],
    notes:'Continue weekly therapy. Avoid alcohol.' },
  { id:'rx4', patientId:'p18', doctorId:'d10', date:'2026-08-08', doctorName:'Dr. Pooja Reddy',
    medicines:[{name:'Metformin',dose:'500mg',frequency:'Twice daily with meals',duration:'60 days'},{name:'Levothyroxine',dose:'50mcg',frequency:'Morning (empty stomach)',duration:'60 days'}],
    notes:'Monitor blood sugar daily. Low-carb diet.' },
];

/* ================================================================
   UTILITIES
================================================================ */
const getInitials = (name) => name ? name.split(' ').filter(Boolean).map(n => n[0]).join('').toUpperCase().slice(0, 2) : '??';
const fmtDate = (d) => d ? new Date(d).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : '—';
const today = new Date().toISOString().split('T')[0];

/* ================================================================
   SHARED UI COMPONENTS
================================================================ */
function Av({ name, size = 'md', color = 'blue' }) {
  const s = { sm: 'w-8 h-8 text-xs', md: 'w-10 h-10 text-sm', lg: 'w-14 h-14 text-lg' }[size];
  const c = { blue: 'bg-blue-600', emerald: 'bg-emerald-600', violet: 'bg-violet-600', red: 'bg-red-500', slate: 'bg-slate-600' }[color] || 'bg-slate-600';
  return <div className={`${s} ${c} rounded-full flex items-center justify-center text-white font-bold flex-shrink-0 select-none`}>{getInitials(name)}</div>;
}

function Badge({ status }) {
  const cfg = { active: 'bg-emerald-100 text-emerald-700', inactive: 'bg-slate-100 text-slate-500', scheduled: 'bg-blue-100 text-blue-700', completed: 'bg-emerald-100 text-emerald-700', cancelled: 'bg-red-100 text-red-700' };
  return <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${cfg[status] || 'bg-gray-100 text-gray-600'}`}>{status ? status.charAt(0).toUpperCase() + status.slice(1) : 'Unknown'}</span>;
}

function StatCard({ label, value, sub, icon, color }) {
  const c = {
    blue:    { wrap: 'bg-blue-50 border-blue-100',    icon: 'bg-blue-600',    val: 'text-blue-700' },
    emerald: { wrap: 'bg-emerald-50 border-emerald-100', icon: 'bg-emerald-600', val: 'text-emerald-700' },
    violet:  { wrap: 'bg-violet-50 border-violet-100', icon: 'bg-violet-600',  val: 'text-violet-700' },
    orange:  { wrap: 'bg-orange-50 border-orange-100', icon: 'bg-orange-500',  val: 'text-orange-600' },
  }[color] || { wrap: 'bg-gray-50 border-gray-100', icon: 'bg-gray-600', val: 'text-gray-700' };
  return (
    <div className={`${c.wrap} border rounded-2xl p-5 flex items-start gap-4`}>
      <div className={`${c.icon} w-12 h-12 rounded-xl flex items-center justify-center text-xl text-white flex-shrink-0`}>{icon}</div>
      <div>
        <p className="text-slate-500 text-sm font-medium">{label}</p>
        <p className={`text-3xl font-extrabold ${c.val} mt-0.5`}>{value}</p>
        {sub && <p className="text-slate-400 text-xs mt-1">{sub}</p>}
      </div>
    </div>
  );
}

function TopBar({ title, subtitle }) {
  return (
    <div className="bg-white border-b border-slate-100 px-8 py-4 flex items-center justify-between sticky top-0 z-10 shadow-sm">
      <div>
        <h2 className="text-slate-800 font-bold text-xl leading-tight">{title}</h2>
        {subtitle && <p className="text-slate-400 text-sm mt-0.5">{subtitle}</p>}
      </div>
      <p className="text-slate-400 text-sm hidden sm:block">{new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</p>
    </div>
  );
}

function Sidebar({ user, nav, onLogout }) {
  const navigate = useNavigate();
  const location = useLocation();
  const role = user.role;
  const grad  = { admin: 'from-blue-950 to-blue-900', doctor: 'from-emerald-950 to-emerald-900', patient: 'from-violet-950 to-violet-900' }[role];
  const badge = { admin: 'bg-blue-500', doctor: 'bg-emerald-500', patient: 'bg-violet-500' }[role];
  const hl    = { admin: 'border-blue-400', doctor: 'border-emerald-400', patient: 'border-violet-400' }[role];
  const avCol = { admin: 'blue', doctor: 'emerald', patient: 'violet' }[role];

  return (
    <aside className={`w-64 min-h-screen flex flex-col bg-gradient-to-b ${grad} flex-shrink-0`}>
      <div className="px-6 py-5 border-b border-white/10 flex items-center gap-3">
        <div className="w-10 h-10 bg-white/15 rounded-xl flex items-center justify-center text-2xl">🏥</div>
        <div>
          <p className="text-white font-bold text-base leading-none">MedCare Pro</p>
          <p className="text-white/40 text-xs mt-0.5">Healthcare Portal</p>
        </div>
      </div>
      <div className="px-5 py-4 border-b border-white/10 flex items-center gap-3">
        <Av name={user.name} color={avCol} />
        <div className="min-w-0">
          <p className="text-white text-sm font-semibold truncate">{user.name}</p>
          <span className={`${badge} text-white text-xs px-2 py-0.5 rounded-full mt-0.5 inline-block`}>
            {role.charAt(0).toUpperCase() + role.slice(1)}
          </span>
        </div>
      </div>
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {nav.map(item => {
          const isActive = location.pathname === item.path;
          return (
            <button key={item.path} onClick={() => navigate(item.path)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-150 text-left
                ${isActive ? `bg-white/15 text-white border-l-4 ${hl}` : 'text-white/55 hover:text-white hover:bg-white/10'}`}>
              <span className="text-base w-5 text-center">{item.icon}</span>{item.label}
            </button>
          );
        })}
      </nav>
      <div className="p-4 border-t border-white/10">
        <button onClick={onLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-white/50 hover:text-white hover:bg-white/10 text-sm font-medium transition-all">
          <span>🚪</span>Logout
        </button>
      </div>
    </aside>
  );
}

function Modal({ title, onClose, children }) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <h4 className="font-bold text-slate-800 text-lg">{title}</h4>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-700 text-xl leading-none">✕</button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}

function PrivacyBanner({ text }) {
  return (
    <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-amber-800 text-sm flex gap-2 mb-6">
      <span>🔒</span><div><strong>RBAC Privacy Policy:</strong> {text}</div>
    </div>
  );
}

/* ================================================================
   LOGIN PAGE
================================================================ */
function LoginPage({ onLogin }) {
  const [email, setEmail] = useState('');
  const [pass, setPass]   = useState('');
  const [err, setErr]     = useState('');
  const [loading, setLoading] = useState(false);
  const [showP, setShowP] = useState(false);
  const navigate = useNavigate();
  const ALL = [ADMIN, ...DOCTORS_DATA, ...PATIENTS_DATA];

  const doLogin = (e) => {
    e.preventDefault();
    setLoading(true); setErr('');
    setTimeout(() => {
      const u = ALL.find(x => x.email.toLowerCase() === email.trim().toLowerCase() && x.password === pass);
      if (u) {
        onLogin(u);
        navigate(`/${u.role}`);
      } else {
        setErr('Invalid email or password. Please try again.');
      }
      setLoading(false);
    }, 500);
  };
  const quick = (u) => { setEmail(u.email); setPass(u.password); setErr(''); };

  const demoCards = [
    { icon: '🔑', title: 'Admin Panel',   sub: 'System stats & user management',      u: ADMIN,          col: 'border-blue-400/40 bg-blue-500/10 hover:bg-blue-500/20' },
    { icon: '🩺', title: 'Doctor Portal', sub: 'Dr. Rajesh Kumar — Cardiology',        u: DOCTORS_DATA[0], col: 'border-emerald-400/40 bg-emerald-500/10 hover:bg-emerald-500/20' },
    { icon: '🧑‍⚕️', title: 'Patient Portal', sub: 'Rahul Gupta — Cardiac Patient',  u: PATIENTS_DATA[0], col: 'border-violet-400/40 bg-violet-500/10 hover:bg-violet-500/20' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 flex items-center justify-center p-4">
      <div className="w-full max-w-5xl grid lg:grid-cols-2 gap-8">
        <div className="text-white flex flex-col justify-center py-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-white/15 rounded-2xl flex items-center justify-center text-3xl">🏥</div>
            <div>
              <p className="text-xl font-bold">MedCare Pro</p>
              <p className="text-white/40 text-sm">Healthcare RBAC Portal</p>
            </div>
          </div>
          <h1 className="text-4xl font-black mb-4 leading-tight">Secure Role-Based<br />Healthcare Access</h1>
          <p className="text-white/50 text-lg mb-8 leading-relaxed">Every user sees exactly what they're authorized to see — no more, no less.</p>
          <div className="space-y-3">
            {demoCards.map(c => (
              <button key={c.title} type="button" onClick={() => quick(c.u)} className={`w-full flex items-center gap-4 p-4 rounded-2xl border transition-all text-left ${c.col}`}>
                <span className="text-2xl">{c.icon}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-white font-bold text-sm">{c.title}</p>
                  <p className="text-white/50 text-xs truncate">{c.sub}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-white/60 text-xs">{c.u.email}</p>
                  <p className="text-white/35 text-xs">{c.u.password}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl p-10 flex flex-col justify-center">
          <h2 className="text-2xl font-black text-slate-800 mb-1">Welcome Back</h2>
          <p className="text-slate-400 mb-8">Sign in to access your secure portal</p>
          {err && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-5 text-sm">⚠️ {err}</div>}
          <form onSubmit={doLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Email Address</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="your@email.com"
                className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Password</label>
              <div className="relative">
                <input type={showP ? 'text' : 'password'} value={pass} onChange={e => setPass(e.target.value)} required placeholder="••••••••"
                  className="w-full px-4 py-3 pr-12 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all" />
                <button type="button" onClick={() => setShowP(p => !p)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-sm select-none">{showP ? '🙈' : '👁️'}</button>
              </div>
            </div>
            <button type="submit" disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3.5 rounded-xl font-bold transition-all shadow-lg disabled:opacity-50 text-sm">
              {loading ? '⏳ Signing in…' : 'Sign In →'}
            </button>
          </form>
          <p className="text-center text-slate-400 text-xs mt-6">🔐 Access strictly controlled by role-based permissions</p>
        </div>
      </div>
    </div>
  );
}

/* ================================================================
   UNAUTHORIZED PAGE (403 FORBIDDEN)
================================================================ */
function UnauthorizedPage({ user, onLogout }) {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6">
      <div className="bg-white rounded-3xl p-8 max-w-md w-full text-center shadow-2xl animate-fade-in">
        <div className="w-16 h-16 bg-red-100 text-red-600 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4">
          🚫
        </div>
        <h2 className="text-2xl font-black text-slate-800 mb-2">403 — Access Denied</h2>
        <p className="text-slate-500 text-sm mb-6">
          Your account role <span className="font-bold text-red-600">({user?.role?.toUpperCase() || 'GUEST'})</span> is not authorized to access this route.
        </p>
        <div className="flex gap-3">
          <button
            onClick={() => navigate(user ? `/${user.role}` : '/login')}
            className="flex-1 bg-slate-800 hover:bg-slate-900 text-white font-semibold py-3 rounded-xl text-sm transition-colors"
          >
            Go to My Dashboard
          </button>
          <button
            onClick={onLogout}
            className="px-4 bg-red-50 hover:bg-red-100 text-red-700 font-semibold py-3 rounded-xl text-sm transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

/* ================================================================
   PROTECTED ROUTE COMPONENT (MIDDLEWARE / RBAC GUARD)
================================================================ */
function ProtectedRoute({ user, allowedRoles, children }) {
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }
  return children;
}

/* ================================================================
   ADMIN PAGES
================================================================ */
function AdminOverview({ doctors, appointments }) {
  const activeDocs = doctors.filter(d => d.status === 'active').length;
  const todayApts  = appointments.filter(a => a.date === today).length;
  return (
    <div className="p-8 space-y-8 animate-fade-in">
      <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-5">
        <StatCard label="Total Patients"       value={30}             sub="Enrolled in system"              icon="🧑‍⚕️" color="violet" />
        <StatCard label="Registered Doctors"   value={doctors.length} sub={`${activeDocs} currently active`} icon="👨‍⚕️" color="emerald" />
        <StatCard label="Today's Appointments" value={todayApts}      sub={`Scheduled for ${fmtDate(today)}`} icon="📅"  color="blue"   />
        <StatCard label="Departments"          value={20}             sub="Specialized care units"          icon="🏢"  color="orange" />
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
        <h3 className="font-bold text-slate-800 text-lg mb-1">Recent Appointments</h3>
        <p className="text-slate-400 text-sm mb-4">Patient identifiers are hidden per RBAC policy</p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-slate-100">
              {['Appointment ID', 'Doctor', 'Department', 'Date & Time', 'Status'].map(h =>
                <th key={h} className="text-left py-3 px-4 text-slate-400 font-semibold">{h}</th>)}
            </tr></thead>
            <tbody>
              {appointments.slice(0, 6).map(apt => {
                const doc = doctors.find(d => d.id === apt.doctorId);
                return (
                  <tr key={apt.id} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-4 font-mono text-xs text-slate-400 uppercase">{apt.id}</td>
                    <td className="py-3 px-4 font-medium text-slate-700">{doc?.name}</td>
                    <td className="py-3 px-4 text-slate-500">{doc?.department}</td>
                    <td className="py-3 px-4 text-slate-500">{fmtDate(apt.date)} · {apt.time}</td>
                    <td className="py-3 px-4"><Badge status={apt.status} /></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-xl text-amber-700 text-xs">
          ⚠️ <strong>Privacy:</strong> Patient names, personal data, and medical notes are not accessible to admin per RBAC policy.
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
        <h3 className="font-bold text-slate-800 text-lg mb-4">Departments at a Glance</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {doctors.map(d => (
            <div key={d.id} className={`flex items-center gap-2 p-3 rounded-xl ${d.status === 'active' ? 'bg-emerald-50' : 'bg-slate-50'}`}>
              <div className={`w-2 h-2 rounded-full flex-shrink-0 ${d.status === 'active' ? 'bg-emerald-500' : 'bg-slate-400'}`}></div>
              <div className="min-w-0">
                <p className="text-slate-700 text-xs font-semibold truncate">{d.department}</p>
                <p className="text-slate-400 text-xs truncate">{d.specialization}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function AdminDoctors({ doctors, setDoctors }) {
  const [search, setSearch] = useState('');
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({});
  const filtered = doctors.filter(d => d.name.toLowerCase().includes(search.toLowerCase()) || d.specialization.toLowerCase().includes(search.toLowerCase()));
  const openEdit = d => { setEditing(d.id); setForm({ ...d }); };
  const save = () => { setDoctors(p => p.map(d => d.id === editing ? { ...form } : d)); setEditing(null); };

  return (
    <div className="p-8 animate-fade-in">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <h3 className="text-xl font-bold text-slate-800">Manage Doctors</h3>
          <p className="text-slate-400 text-sm">{filtered.length} doctors found</p>
        </div>
        <input type="text" placeholder="🔍 Search name or specialization…" value={search} onChange={e => setSearch(e.target.value)}
          className="px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-72" />
      </div>
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 border-b border-slate-100">
            <tr>{['Doctor', 'Specialization', 'Department', 'Exp.', 'Qualifications', 'Status', 'Actions'].map(h =>
              <th key={h} className="text-left py-4 px-5 text-slate-500 font-semibold whitespace-nowrap">{h}</th>)}
            </tr>
          </thead>
          <tbody>
            {filtered.map(d => (
              <tr key={d.id} className="border-b border-slate-50 hover:bg-slate-50/70 transition-colors">
                <td className="py-4 px-5">
                  <div className="flex items-center gap-3">
                    <Av name={d.name} color="emerald" size="sm" />
                    <div>
                      <p className="font-semibold text-slate-800 whitespace-nowrap">{d.name}</p>
                      <p className="text-slate-400 text-xs">{d.email}</p>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-5 text-slate-600 whitespace-nowrap">{d.specialization}</td>
                <td className="py-4 px-5 text-slate-600 whitespace-nowrap">{d.department}</td>
                <td className="py-4 px-5 text-slate-600">{d.experience} yrs</td>
                <td className="py-4 px-5 text-slate-500 whitespace-nowrap">{d.qualifications}</td>
                <td className="py-4 px-5"><Badge status={d.status} /></td>
                <td className="py-4 px-5">
                  <button onClick={() => openEdit(d)} className="bg-blue-50 text-blue-700 hover:bg-blue-100 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors">✏️ Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editing && (
        <Modal title="Edit Doctor Details" onClose={() => setEditing(null)}>
          <div className="space-y-4">
            {[['Full Name', 'name', 'text'], ['Email', 'email', 'email'], ['Specialization', 'specialization', 'text'], ['Department', 'department', 'text'], ['Qualifications', 'qualifications', 'text'], ['Experience (years)', 'experience', 'number']].map(([lbl, key, type]) => (
              <div key={key}>
                <label className="block text-sm font-semibold text-slate-700 mb-1">{lbl}</label>
                <input type={type} value={form[key] || ''} onChange={e => setForm(p => ({ ...p, [key]: e.target.value }))}
                  className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
            ))}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Status</label>
              <select value={form.status || 'active'} onChange={e => setForm(p => ({ ...p, status: e.target.value }))}
                className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="active">Active</option><option value="inactive">Inactive</option>
              </select>
            </div>
            <div className="bg-amber-50 p-3 rounded-xl border border-amber-200 text-amber-700 text-xs">
              ⚠️ Admin cannot view or modify this doctor's patient medical records.
            </div>
          </div>
          <div className="flex gap-3 mt-6">
            <button onClick={() => setEditing(null)} className="flex-1 py-2.5 border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 text-sm font-medium">Cancel</button>
            <button onClick={save} className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-semibold transition-colors">Save Changes</button>
          </div>
        </Modal>
      )}
    </div>
  );
}

function AdminPatients({ doctors }) {
  const [search, setSearch] = useState('');
  const filtered = PATIENTS_DATA.filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || p.email.toLowerCase().includes(search.toLowerCase()));
  return (
    <div className="p-8 animate-fade-in">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <h3 className="text-xl font-bold text-slate-800">Patient Directory</h3>
          <p className="text-slate-400 text-sm">{filtered.length} patients enrolled</p>
        </div>
        <input type="text" placeholder="🔍 Search by name or email…" value={search} onChange={e => setSearch(e.target.value)}
          className="px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-72" />
      </div>
      <PrivacyBanner text="Admin can view patient name, email, assigned doctor and status only. Personal details (DOB, blood group, phone, medical history, prescriptions) are restricted to authorized medical staff only." />
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 border-b border-slate-100">
            <tr>{['#', 'Patient Name', 'Email', 'Assigned Doctor', 'Enrolled', 'Status', 'Medical Data'].map(h =>
              <th key={h} className="text-left py-4 px-5 text-slate-500 font-semibold whitespace-nowrap">{h}</th>)}
            </tr>
          </thead>
          <tbody>
            {filtered.map((p, i) => {
              const doc = doctors.find(d => d.id === p.assignedDoctorId);
              return (
                <tr key={p.id} className="border-b border-slate-50 hover:bg-slate-50/70 transition-colors">
                  <td className="py-4 px-5 text-slate-400 text-xs font-mono">{i + 1}</td>
                  <td className="py-4 px-5">
                    <div className="flex items-center gap-3">
                      <Av name={p.name} color="violet" size="sm" />
                      <span className="font-semibold text-slate-800 whitespace-nowrap">{p.name}</span>
                    </div>
                  </td>
                  <td className="py-4 px-5 text-slate-500">{p.email}</td>
                  <td className="py-4 px-5 text-emerald-700 font-medium whitespace-nowrap">{doc?.name || 'Unassigned'}</td>
                  <td className="py-4 px-5 text-slate-500 whitespace-nowrap">{fmtDate(p.joinDate)}</td>
                  <td className="py-4 px-5"><Badge status={p.status} /></td>
                  <td className="py-4 px-5"><span className="bg-red-50 text-red-500 text-xs font-semibold px-2.5 py-1 rounded-lg border border-red-100">🔒 Restricted</span></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function AdminUsers({ doctors }) {
  const [filter, setFilter] = useState('all');
  const all = [{ ...ADMIN }, ...doctors.map(d => ({ ...d, role: 'doctor' })), ...PATIENTS_DATA.map(p => ({ ...p, role: 'patient' }))];
  const shown = filter === 'all' ? all : all.filter(u => u.role === filter);
  const avCol     = { admin: 'blue', doctor: 'emerald', patient: 'violet' };
  const roleBadge = { admin: 'bg-blue-100 text-blue-700', doctor: 'bg-emerald-100 text-emerald-700', patient: 'bg-violet-100 text-violet-700' };
  const access    = { admin: 'Full System Access', doctor: 'Medical Staff (Own Patients)', patient: 'Self-Service (Own Data)' };
  return (
    <div className="p-8 animate-fade-in">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <h3 className="text-xl font-bold text-slate-800">User Management</h3>
          <p className="text-slate-400 text-sm">{shown.length} of {all.length} users shown</p>
        </div>
        <div className="flex bg-slate-100 rounded-xl p-1">
          {['all', 'admin', 'doctor', 'patient'].map(r => (
            <button key={r} onClick={() => setFilter(r)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${filter === r ? 'bg-white shadow text-slate-800' : 'text-slate-500 hover:text-slate-700'}`}>
              {r.charAt(0).toUpperCase() + r.slice(1)}
            </button>
          ))}
        </div>
      </div>
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 border-b border-slate-100">
            <tr>{['User', 'Email', 'Role', 'Status', 'Joined', 'Access Level'].map(h =>
              <th key={h} className="text-left py-4 px-5 text-slate-500 font-semibold whitespace-nowrap">{h}</th>)}
            </tr>
          </thead>
          <tbody>
            {shown.map(u => (
              <tr key={u.id} className="border-b border-slate-50 hover:bg-slate-50/70 transition-colors">
                <td className="py-4 px-5">
                  <div className="flex items-center gap-3"><Av name={u.name} color={avCol[u.role]} size="sm" />
                    <span className="font-semibold text-slate-800 whitespace-nowrap">{u.name}</span>
                  </div>
                </td>
                <td className="py-4 px-5 text-slate-500">{u.email}</td>
                <td className="py-4 px-5"><span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${roleBadge[u.role]}`}>{u.role}</span></td>
                <td className="py-4 px-5"><Badge status={u.status || 'active'} /></td>
                <td className="py-4 px-5 text-slate-500 whitespace-nowrap">{u.joinDate ? fmtDate(u.joinDate) : '—'}</td>
                <td className="py-4 px-5 text-slate-500 text-xs">{access[u.role]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function AdminLayout({ user, doctors, setDoctors, appointments, onLogout }) {
  const location = useLocation();
  const nav = [
    { path: '/admin',          label: 'Overview',          icon: '📊' },
    { path: '/admin/doctors',  label: 'Manage Doctors',    icon: '🩺' },
    { path: '/admin/patients', label: 'Patient Directory', icon: '👤' },
    { path: '/admin/users',    label: 'User Management',   icon: '👥' },
  ];
  const titles = {
    '/admin':          { title: 'System Overview',         subtitle: 'Hospital-wide analytics & statistics' },
    '/admin/doctors':  { title: 'Manage Doctors',          subtitle: 'Edit doctor profiles and department status' },
    '/admin/patients': { title: 'Patient Directory',       subtitle: 'Enrolled patients — restricted admin view' },
    '/admin/users':    { title: 'User Management',         subtitle: 'All system users, roles and access levels' },
  };
  const titleInfo = titles[location.pathname] || titles['/admin'];

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar user={user} nav={nav} onLogout={onLogout} />
      <div className="flex-1 overflow-y-auto">
        <TopBar {...titleInfo} />
        <ErrorBoundary key={location.pathname}>
          <Routes>
            <Route path="/" element={<AdminOverview doctors={doctors} appointments={appointments} />} />
            <Route path="/doctors" element={<AdminDoctors doctors={doctors} setDoctors={setDoctors} />} />
            <Route path="/patients" element={<AdminPatients doctors={doctors} />} />
            <Route path="/users" element={<AdminUsers doctors={doctors} />} />
            <Route path="*" element={<Navigate to="/admin" replace />} />
          </Routes>
        </ErrorBoundary>
      </div>
    </div>
  );
}

/* ================================================================
   DOCTOR PAGES
================================================================ */
function DoctorOverview({ user, appointments }) {
  const mine     = appointments.filter(a => a.doctorId === user.id);
  const todayA   = mine.filter(a => a.date === today && a.status === 'scheduled');
  const done     = mine.filter(a => a.status === 'completed');
  const myPat    = PATIENTS_DATA.filter(p => p.assignedDoctorId === user.id);
  return (
    <div className="p-8 space-y-8 animate-fade-in">
      <div className="grid sm:grid-cols-3 gap-5">
        <StatCard label="My Patients"          value={myPat.length}  sub="Assigned to your care"    icon="👥" color="emerald" />
        <StatCard label="Today's Appointments" value={todayA.length} sub="Scheduled for today"      icon="📅" color="blue"    />
        <StatCard label="Completed Sessions"   value={done.length}   sub="Total consultations done" icon="✅" color="violet"  />
      </div>
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
        <h3 className="font-bold text-slate-800 text-lg mb-4">Today's Schedule</h3>
        {todayA.length === 0
          ? <div className="text-center py-8 text-slate-400"><p className="text-3xl mb-2">📭</p><p>No appointments today</p></div>
          : <div className="space-y-3">
              {todayA.map(apt => {
                const p = PATIENTS_DATA.find(x => x.id === apt.patientId);
                return (
                  <div key={apt.id} className="flex items-center gap-4 p-4 bg-emerald-50 rounded-xl border border-emerald-100">
                    <div className="text-center w-14"><p className="text-emerald-700 font-bold text-sm">{apt.time}</p><p className="text-slate-400 text-xs">Today</p></div>
                    <div className="w-px h-10 bg-emerald-200" />
                    <Av name={p?.name || '?'} color="violet" size="sm" />
                    <div className="flex-1"><p className="font-semibold text-slate-800">{p?.name}</p><p className="text-slate-400 text-xs">{apt.reason}</p></div>
                    <Badge status={apt.status} />
                  </div>
                );
              })}
            </div>
        }
      </div>
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
        <h3 className="font-bold text-slate-800 text-lg mb-4">My Patients — Quick View</h3>
        <div className="grid sm:grid-cols-2 gap-3">
          {myPat.map(p => (
            <div key={p.id} className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl">
              <Av name={p.name} color="violet" size="sm" />
              <div className="min-w-0">
                <p className="text-slate-800 font-semibold text-sm truncate">{p.name}</p>
                <p className="text-slate-400 text-xs truncate">{p.conditions?.slice(0, 2).join(', ')}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function DoctorPatients({ user, appointments, prescriptions, setPrescriptions }) {
  const myPat = PATIENTS_DATA.filter(p => p.assignedDoctorId === user.id);
  const [sel, setSel] = useState(null);
  const [rxModal, setRxModal] = useState(false);
  const [rxForm, setRxForm] = useState({ meds: [{ name: '', dose: '', freq: '', dur: '' }], notes: '' });
  const [msg, setMsg] = useState('');

  const addMed = () => setRxForm(p => ({ ...p, meds: [...p.meds, { name: '', dose: '', freq: '', dur: '' }] }));
  const updMed = (i, k, v) => setRxForm(p => ({ ...p, meds: p.meds.map((m, idx) => idx === i ? { ...m, [k]: v } : m) }));
  const saveRx = () => {
    if (!rxForm.meds[0].name.trim()) return;
    setPrescriptions(prev => [...prev, {
      id: `rx${Date.now()}`, patientId: sel.id, doctorId: user.id, date: today,
      medicines: rxForm.meds.map(m => ({ name: m.name, dose: m.dose, frequency: m.freq, duration: m.dur })),
      notes: rxForm.notes, doctorName: user.name
    }]);
    setRxModal(false);
    setRxForm({ meds: [{ name: '', dose: '', freq: '', dur: '' }], notes: '' });
    setMsg(`Prescription saved for ${sel.name}`);
    setTimeout(() => setMsg(''), 3500);
  };

  const patRx  = id => prescriptions.filter(rx => rx.patientId === id && rx.doctorId === user.id);
  const patApt = id => appointments.filter(a => a.patientId === id && a.doctorId === user.id);

  return (
    <div className="p-8 animate-fade-in">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-slate-800">My Patients</h3>
        <p className="text-slate-400 text-sm">{myPat.length} patients assigned — other patients' data is not accessible</p>
      </div>
      {msg && <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 px-4 py-3 rounded-xl mb-4 text-sm">✅ {msg}</div>}
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="space-y-2 max-h-[75vh] overflow-y-auto pr-1">
          {myPat.map(p => (
            <button key={p.id} onClick={() => { setSel(p); setRxModal(false); }}
              className={`w-full flex items-center gap-3 p-4 rounded-xl border transition-all text-left
                ${sel?.id === p.id ? 'border-emerald-300 bg-emerald-50' : 'bg-white border-slate-100 hover:border-emerald-200 hover:bg-emerald-50/30'}`}>
              <Av name={p.name} color="violet" size="sm" />
              <div className="flex-1 min-w-0">
                <p className="text-slate-800 font-semibold text-sm truncate">{p.name}</p>
                <p className="text-slate-400 text-xs truncate">{p.conditions?.[0]}</p>
              </div>
              {sel?.id === p.id && <span className="text-emerald-500 text-sm">→</span>}
            </button>
          ))}
        </div>

        {sel ? (
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-5">
                <div className="flex items-center gap-4">
                  <Av name={sel.name} color="violet" size="lg" />
                  <div>
                    <h4 className="text-xl font-bold text-slate-800">{sel.name}</h4>
                    <p className="text-slate-400 text-sm">{sel.email}</p>
                  </div>
                </div>
                <button onClick={() => setRxModal(true)} className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-xl text-sm font-bold transition-colors">
                  📝 Write Prescription
                </button>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                <div className="bg-violet-50 rounded-xl p-3 text-center"><p className="text-slate-500 text-xs mb-1">Date of Birth</p><p className="text-violet-700 font-bold text-sm">{fmtDate(sel.dob)}</p></div>
                <div className="bg-red-50 rounded-xl p-3 text-center"><p className="text-slate-500 text-xs mb-1">Blood Group</p><p className="text-red-600 font-black text-xl">{sel.bloodGroup}</p></div>
                <div className="bg-blue-50 rounded-xl p-3 text-center"><p className="text-slate-500 text-xs mb-1">Phone</p><p className="text-blue-700 font-bold text-xs">{sel.phone}</p></div>
                <div className="bg-emerald-50 rounded-xl p-3 text-center"><p className="text-slate-500 text-xs mb-1">Status</p><Badge status={sel.status} /></div>
              </div>
              <div>
                <p className="text-slate-500 text-sm font-semibold mb-2">Known Conditions</p>
                <div className="flex flex-wrap gap-2">
                  {sel.conditions?.map(c => <span key={c} className="bg-orange-50 text-orange-700 border border-orange-200 px-3 py-1 rounded-full text-xs font-medium">{c}</span>)}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
              <h4 className="font-bold text-slate-800 mb-3">Prescription History ({patRx(sel.id).length})</h4>
              {patRx(sel.id).length === 0
                ? <p className="text-slate-400 text-sm text-center py-4">No prescriptions yet.</p>
                : <div className="space-y-3">
                    {patRx(sel.id).map(rx => (
                      <div key={rx.id} className="bg-slate-50 rounded-xl p-4">
                        <p className="text-slate-600 font-semibold text-sm mb-2">📅 {fmtDate(rx.date)}</p>
                        {rx.medicines.map((m, i) => <p key={i} className="text-sm text-slate-600 ml-2">• <strong>{m.name}</strong> {m.dose} — {m.frequency} ({m.duration})</p>)}
                        {rx.notes && <p className="text-slate-400 text-xs mt-2 italic">Note: {rx.notes}</p>}
                      </div>
                    ))}
                  </div>
              }
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
              <h4 className="font-bold text-slate-800 mb-3">Appointment History ({patApt(sel.id).length})</h4>
              {patApt(sel.id).length === 0
                ? <p className="text-slate-400 text-sm text-center py-4">No appointments found.</p>
                : <div className="space-y-2">
                    {patApt(sel.id).map(apt => (
                      <div key={apt.id} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                        <span className="text-xl">📅</span>
                        <div className="flex-1"><p className="text-slate-700 font-medium text-sm">{apt.reason}</p><p className="text-slate-400 text-xs">{fmtDate(apt.date)} · {apt.time}</p></div>
                        <Badge status={apt.status} />
                      </div>
                    ))}
                  </div>
              }
            </div>
          </div>
        ) : (
          <div className="lg:col-span-2 flex items-center justify-center bg-white rounded-2xl border-2 border-dashed border-slate-200 p-12">
            <div className="text-center text-slate-400">
              <p className="text-4xl mb-3">👈</p>
              <p className="font-semibold">Select a patient to view records</p>
              <p className="text-sm mt-1">Only your assigned patients are visible</p>
            </div>
          </div>
        )}
      </div>

      {rxModal && sel && (
        <Modal title={`Write Prescription — ${sel.name}`} onClose={() => setRxModal(false)}>
          <div className="space-y-4">
            {rxForm.meds.map((m, i) => (
              <div key={i} className="bg-slate-50 rounded-xl p-4 space-y-2">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Medicine {i + 1}</p>
                <div className="grid grid-cols-2 gap-2">
                  <input placeholder="Medicine name*" value={m.name} onChange={e => updMed(i, 'name', e.target.value)} className="px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400" />
                  <input placeholder="Dose (e.g. 500mg)" value={m.dose} onChange={e => updMed(i, 'dose', e.target.value)} className="px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400" />
                  <input placeholder="Frequency" value={m.freq} onChange={e => updMed(i, 'freq', e.target.value)} className="px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400" />
                  <input placeholder="Duration (e.g. 30 days)" value={m.dur} onChange={e => updMed(i, 'dur', e.target.value)} className="px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400" />
                </div>
              </div>
            ))}
            <button onClick={addMed} className="w-full py-2 border-2 border-dashed border-emerald-300 text-emerald-600 rounded-xl text-sm font-medium hover:bg-emerald-50 transition-colors">+ Add Another Medicine</button>
            <textarea placeholder="Doctor's notes / instructions…" value={rxForm.notes} onChange={e => setRxForm(p => ({ ...p, notes: e.target.value }))} rows="3"
              className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400" />
          </div>
          <div className="flex gap-3 mt-5">
            <button onClick={() => setRxModal(false)} className="flex-1 py-2.5 border border-slate-200 rounded-xl text-slate-600 text-sm hover:bg-slate-50 font-medium">Cancel</button>
            <button onClick={saveRx} className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-sm font-bold transition-colors">Save Prescription</button>
          </div>
        </Modal>
      )}
    </div>
  );
}

function DoctorAppointments({ user, appointments }) {
  const mine = appointments.filter(a => a.doctorId === user.id).sort((a, b) => a.date < b.date ? 1 : -1);
  return (
    <div className="p-8 animate-fade-in">
      <div className="mb-6"><h3 className="text-xl font-bold text-slate-800">My Appointments</h3><p className="text-slate-400 text-sm">{mine.length} total</p></div>
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-x-auto">
        {mine.length === 0
          ? <div className="text-center py-12 text-slate-400"><p className="text-4xl mb-3">📭</p><p>No appointments yet</p></div>
          : <table className="w-full text-sm">
              <thead className="bg-slate-50 border-b border-slate-100">
                <tr>{['Patient', 'Date & Time', 'Reason', 'Status'].map(h =>
                  <th key={h} className="text-left py-4 px-5 text-slate-500 font-semibold">{h}</th>)}
                </tr>
              </thead>
              <tbody>
                {mine.map(apt => {
                  const p = PATIENTS_DATA.find(x => x.id === apt.patientId);
                  return (
                    <tr key={apt.id} className="border-b border-slate-50 hover:bg-slate-50/70">
                      <td className="py-4 px-5"><div className="flex items-center gap-3"><Av name={p?.name || '?'} color="violet" size="sm" /><span className="font-medium text-slate-800">{p?.name}</span></div></td>
                      <td className="py-4 px-5 text-slate-500 whitespace-nowrap">{fmtDate(apt.date)} · {apt.time}</td>
                      <td className="py-4 px-5 text-slate-500">{apt.reason}</td>
                      <td className="py-4 px-5"><Badge status={apt.status} /></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
        }
      </div>
    </div>
  );
}

function DoctorLayout({ user, appointments, prescriptions, setPrescriptions, onLogout }) {
  const location = useLocation();
  const nav = [
    { path: '/doctor',              label: 'Dashboard',    icon: '📊' },
    { path: '/doctor/patients',     label: 'My Patients',  icon: '👤' },
    { path: '/doctor/appointments', label: 'Appointments', icon: '📅' },
  ];
  const titles = {
    '/doctor':              { title: `Welcome, ${user.name}`, subtitle: `${user.specialization} · ${user.department}` },
    '/doctor/patients':     { title: 'My Patients',            subtitle: 'Records restricted to your assigned patients only' },
    '/doctor/appointments': { title: 'My Appointments',        subtitle: 'Your full consultation schedule' },
  };
  const titleInfo = titles[location.pathname] || titles['/doctor'];

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar user={user} nav={nav} onLogout={onLogout} />
      <div className="flex-1 overflow-y-auto">
        <TopBar {...titleInfo} />
        <ErrorBoundary key={location.pathname}>
          <Routes>
            <Route path="/" element={<DoctorOverview user={user} appointments={appointments} />} />
            <Route path="/patients" element={<DoctorPatients user={user} appointments={appointments} prescriptions={prescriptions} setPrescriptions={setPrescriptions} />} />
            <Route path="/appointments" element={<DoctorAppointments user={user} appointments={appointments} />} />
            <Route path="*" element={<Navigate to="/doctor" replace />} />
          </Routes>
        </ErrorBoundary>
      </div>
    </div>
  );
}

/* ================================================================
   PATIENT PAGES
================================================================ */
function PatientOverview({ user, doctors, appointments, prescriptions }) {
  const myApt    = appointments.filter(a => a.patientId === user.id);
  const myRx     = prescriptions.filter(rx => rx.patientId === user.id);
  const upcoming = myApt.filter(a => a.status === 'scheduled');
  const doc      = doctors.find(d => d.id === user.assignedDoctorId);
  return (
    <div className="p-8 space-y-8 animate-fade-in">
      <div className="grid sm:grid-cols-3 gap-5">
        <StatCard label="Upcoming Appointments" value={upcoming.length} sub="Scheduled consultations" icon="📅" color="violet" />
        <StatCard label="Active Prescriptions"  value={myRx.length}    sub="Current medications"      icon="💊" color="emerald" />
        <StatCard label="Total Consultations"   value={myApt.length}   sub="All-time visits"          icon="🩺" color="blue"    />
      </div>
      {doc && (
        <div className="bg-gradient-to-r from-violet-600 to-violet-700 rounded-2xl p-6 text-white">
          <p className="text-violet-200 text-sm font-semibold mb-3">Your Primary Doctor</p>
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center font-black text-xl">{getInitials(doc.name)}</div>
            <div>
              <h4 className="text-xl font-bold">{doc.name}</h4>
              <p className="text-violet-200">{doc.specialization} · {doc.department}</p>
              <p className="text-violet-300 text-sm">{doc.qualifications}</p>
            </div>
          </div>
        </div>
      )}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
        <h3 className="font-bold text-slate-800 text-lg mb-4">Upcoming Appointments</h3>
        {upcoming.length === 0
          ? <div className="text-center py-6 text-slate-400"><p className="text-3xl mb-2">📭</p><p>No upcoming appointments. Book one!</p></div>
          : <div className="space-y-3">
              {upcoming.map(apt => {
                const d = doctors.find(x => x.id === apt.doctorId);
                return (
                  <div key={apt.id} className="flex items-center gap-4 p-4 bg-violet-50 rounded-xl border border-violet-100">
                    <div className="text-center w-14"><p className="text-violet-700 font-bold text-sm">{apt.time}</p><p className="text-slate-400 text-xs">{new Date(apt.date).toLocaleDateString('en-IN', { month: 'short', day: '2-digit' })}</p></div>
                    <div className="w-px h-10 bg-violet-200" />
                    <div className="flex-1"><p className="font-semibold text-slate-800">{d?.name}</p><p className="text-slate-400 text-xs">{apt.reason}</p></div>
                    <Badge status={apt.status} />
                  </div>
                );
              })}
            </div>
        }
      </div>
      {myRx.length > 0 && (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
          <h3 className="font-bold text-slate-800 text-lg mb-4">Recent Prescriptions</h3>
          {myRx.slice(0, 2).map(rx => (
            <div key={rx.id} className="mb-4 bg-slate-50 rounded-xl p-4 border border-slate-100">
              <div className="flex justify-between mb-2"><p className="font-semibold text-slate-700 text-sm">{rx.doctorName}</p><p className="text-slate-400 text-xs">{fmtDate(rx.date)}</p></div>
              {rx.medicines.map((m, i) => <p key={i} className="text-sm text-slate-600">• <strong>{m.name}</strong> {m.dose} — {m.frequency}</p>)}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function PatientBook({ user, doctors, setAppointments }) {
  const [form, setForm] = useState({ doctorId: '', date: '', time: '', reason: '' });
  const [ok, setOk] = useState('');
  const [err, setErr] = useState('');
  const times  = ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30'];
  const active = doctors.filter(d => d.status === 'active');

  const submit = (e) => {
    e.preventDefault();
    if (!form.doctorId || !form.date || !form.time || !form.reason.trim()) { setErr('Please fill all fields.'); return; }
    const doc = doctors.find(d => d.id === form.doctorId);
    setAppointments(p => [...p, { id: `apt${Date.now()}`, patientId: user.id, doctorId: form.doctorId, date: form.date, time: form.time, reason: form.reason, status: 'scheduled', notes: '' }]);
    setOk(`✅ Appointment booked with ${doc?.name} on ${fmtDate(form.date)} at ${form.time}`);
    setForm({ doctorId: '', date: '', time: '', reason: '' }); setErr('');
    setTimeout(() => setOk(''), 6000);
  };

  return (
    <div className="p-8 animate-fade-in">
      <div className="mb-6"><h3 className="text-xl font-bold text-slate-800">Book an Appointment</h3><p className="text-slate-400 text-sm">Choose a specialist and your preferred slot</p></div>
      {ok  && <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 px-4 py-3 rounded-xl mb-5 text-sm">{ok}</div>}
      {err && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-5 text-sm">⚠️ {err}</div>}
      <div className="grid lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
          <form onSubmit={submit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Select Doctor</label>
              <select value={form.doctorId} onChange={e => setForm(p => ({ ...p, doctorId: e.target.value }))}
                className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-400">
                <option value="">— Choose a Doctor —</option>
                {active.map(d => <option key={d.id} value={d.id}>{d.name} — {d.specialization}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Preferred Date</label>
              <input type="date" min={today} value={form.date} onChange={e => setForm(p => ({ ...p, date: e.target.value }))}
                className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-400" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Time Slot</label>
              <div className="grid grid-cols-4 gap-2">
                {times.map(t => (
                  <button key={t} type="button" onClick={() => setForm(p => ({ ...p, time: t }))}
                    className={`py-2 rounded-xl text-xs font-semibold border transition-all
                      ${form.time === t ? 'bg-violet-600 text-white border-violet-600 shadow-lg shadow-violet-200' : 'bg-slate-50 text-slate-600 border-slate-200 hover:border-violet-400 hover:bg-violet-50'}`}>
                    {t}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Reason for Visit</label>
              <textarea rows="3" value={form.reason} onChange={e => setForm(p => ({ ...p, reason: e.target.value }))} placeholder="Describe your symptoms or reason…"
                className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-400" />
            </div>
            <button type="submit" className="w-full bg-gradient-to-r from-violet-600 to-violet-700 hover:from-violet-700 hover:to-violet-800 text-white py-3.5 rounded-xl font-bold transition-all shadow-lg text-sm">
              📅 Confirm Appointment
            </button>
          </form>
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-700 mb-3">Available Specialists ({active.length})</p>
          <div className="space-y-3 max-h-[520px] overflow-y-auto pr-1">
            {active.map(d => (
              <button key={d.id} type="button" onClick={() => setForm(p => ({ ...p, doctorId: d.id }))}
                className={`w-full flex items-center gap-4 p-4 rounded-xl border transition-all text-left
                  ${form.doctorId === d.id ? 'border-violet-400 bg-violet-50 shadow-sm' : 'bg-white border-slate-100 hover:border-violet-300 hover:bg-violet-50/30'}`}>
                <Av name={d.name} color="emerald" />
                <div className="flex-1 min-w-0">
                  <p className="text-slate-800 font-bold text-sm">{d.name}</p>
                  <p className="text-emerald-600 text-xs font-semibold">{d.specialization}</p>
                  <p className="text-slate-400 text-xs">{d.experience} yrs exp · {d.department}</p>
                </div>
                {form.doctorId === d.id && <span className="text-violet-600 font-black">✓</span>}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function PatientAppointments({ user, doctors, appointments }) {
  const mine = appointments.filter(a => a.patientId === user.id).sort((a, b) => a.date < b.date ? 1 : -1);
  return (
    <div className="p-8 animate-fade-in">
      <div className="mb-6"><h3 className="text-xl font-bold text-slate-800">My Appointments</h3><p className="text-slate-400 text-sm">{mine.length} total</p></div>
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-x-auto">
        {mine.length === 0
          ? <div className="text-center py-12 text-slate-400"><p className="text-4xl mb-3">📭</p><p>No appointments yet. Book one!</p></div>
          : <table className="w-full text-sm">
              <thead className="bg-slate-50 border-b border-slate-100">
                <tr>{['Doctor', 'Specialization', 'Date & Time', 'Reason', 'Status'].map(h =>
                  <th key={h} className="text-left py-4 px-5 text-slate-500 font-semibold">{h}</th>)}
                </tr>
              </thead>
              <tbody>
                {mine.map(apt => {
                  const d = doctors.find(x => x.id === apt.doctorId);
                  return (
                    <tr key={apt.id} className="border-b border-slate-50 hover:bg-slate-50/70">
                      <td className="py-4 px-5"><div className="flex items-center gap-3"><Av name={d?.name || '?'} color="emerald" size="sm" /><span className="font-medium text-slate-800 whitespace-nowrap">{d?.name}</span></div></td>
                      <td className="py-4 px-5 text-slate-500 whitespace-nowrap">{d?.specialization}</td>
                      <td className="py-4 px-5 text-slate-500 whitespace-nowrap">{fmtDate(apt.date)} · {apt.time}</td>
                      <td className="py-4 px-5 text-slate-500">{apt.reason}</td>
                      <td className="py-4 px-5"><Badge status={apt.status} /></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
        }
      </div>
    </div>
  );
}

function PatientPrescriptions({ user, prescriptions }) {
  const mine = prescriptions.filter(rx => rx.patientId === user.id).sort((a, b) => a.date < b.date ? 1 : -1);
  return (
    <div className="p-8 animate-fade-in">
      <div className="mb-6"><h3 className="text-xl font-bold text-slate-800">My Prescriptions</h3><p className="text-slate-400 text-sm">{mine.length} on record</p></div>
      {mine.length === 0
        ? <div className="bg-white rounded-2xl border-2 border-dashed border-slate-200 p-12 text-center text-slate-400"><p className="text-4xl mb-3">💊</p><p>No prescriptions yet</p></div>
        : <div className="space-y-4">
            {mine.map(rx => (
              <div key={rx.id} className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
                <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                  <div><p className="font-bold text-slate-800">{rx.doctorName}</p><p className="text-slate-400 text-sm">{fmtDate(rx.date)}</p></div>
                  <span className="bg-emerald-100 text-emerald-700 text-xs px-3 py-1 rounded-full font-bold">Active</span>
                </div>
                <div className="border-t border-slate-100 pt-4">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Prescribed Medicines</p>
                  <div className="space-y-2">
                    {rx.medicines.map((m, i) => (
                      <div key={i} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                        <span className="text-2xl">💊</span>
                        <div><p className="font-bold text-slate-800 text-sm">{m.name} <span className="text-slate-400 font-normal">({m.dose})</span></p><p className="text-slate-500 text-xs">{m.frequency} · {m.duration}</p></div>
                      </div>
                    ))}
                  </div>
                  {rx.notes && <div className="mt-3 p-3 bg-blue-50 rounded-xl text-blue-700 text-sm border border-blue-100">📝 <strong>Doctor's Note:</strong> {rx.notes}</div>}
                </div>
              </div>
            ))}
          </div>
      }
    </div>
  );
}

function PatientLayout({ user, doctors, appointments, setAppointments, prescriptions, onLogout }) {
  const location = useLocation();
  const nav = [
    { path: '/patient',              label: 'My Dashboard',     icon: '📊' },
    { path: '/patient/book',          label: 'Book Appointment',  icon: '📅' },
    { path: '/patient/appointments',  label: 'My Appointments',  icon: '📆' },
    { path: '/patient/prescriptions', label: 'My Prescriptions', icon: '💊' },
  ];
  const titles = {
    '/patient':              { title: `Hello, ${user.name.split(' ')[0]}! 👋`, subtitle: 'Your personal health dashboard' },
    '/patient/book':          { title: 'Book Appointment',                        subtitle: 'Schedule a consultation with any doctor' },
    '/patient/appointments':  { title: 'My Appointments',                        subtitle: 'Your own consultations only' },
    '/patient/prescriptions': { title: 'My Prescriptions',                       subtitle: 'Your personal prescriptions only' },
  };
  const titleInfo = titles[location.pathname] || titles['/patient'];

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar user={user} nav={nav} onLogout={onLogout} />
      <div className="flex-1 overflow-y-auto">
        <TopBar {...titleInfo} />
        <ErrorBoundary key={location.pathname}>
          <Routes>
            <Route path="/" element={<PatientOverview user={user} doctors={doctors} appointments={appointments} prescriptions={prescriptions} />} />
            <Route path="/book" element={<PatientBook user={user} doctors={doctors} setAppointments={setAppointments} />} />
            <Route path="/appointments" element={<PatientAppointments user={user} doctors={doctors} appointments={appointments} />} />
            <Route path="/prescriptions" element={<PatientPrescriptions user={user} prescriptions={prescriptions} />} />
            <Route path="*" element={<Navigate to="/patient" replace />} />
          </Routes>
        </ErrorBoundary>
      </div>
    </div>
  );
}

/* ================================================================
   MAIN APP ROUTER
================================================================ */
export default function App() {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('medcare_user');
      if (saved) {
        const u = JSON.parse(saved);
        if (u && u.role && ['admin', 'doctor', 'patient'].includes(u.role)) {
          return u;
        }
      }
    } catch (e) {}
    localStorage.removeItem('medcare_user');
    return null;
  });

  const [doctors, setDoctors]             = useState(DOCTORS_DATA);
  const [appointments, setAppointments]   = useState(INITIAL_APPOINTMENTS);
  const [prescriptions, setPrescriptions] = useState(INITIAL_PRESCRIPTIONS);

  const login = u => {
    if (!u || !u.role) return;
    setUser(u);
    localStorage.setItem('medcare_user', JSON.stringify(u));
  };
  const logout = () => {
    setUser(null);
    localStorage.removeItem('medcare_user');
  };

  return (
    <BrowserRouter>
      <ErrorBoundary>
        <Routes>
          {/* Public Login Route */}
          <Route path="/login" element={
            user ? <Navigate to={`/${user.role}`} replace /> : <LoginPage onLogin={login} />
          } />

          {/* Unauthorized Page */}
          <Route path="/unauthorized" element={<UnauthorizedPage user={user} onLogout={logout} />} />

          {/* Admin Protected Routes */}
          <Route path="/admin/*" element={
            <ProtectedRoute user={user} allowedRoles={['admin']}>
              <AdminLayout user={user} doctors={doctors} setDoctors={setDoctors} appointments={appointments} onLogout={logout} />
            </ProtectedRoute>
          } />

          {/* Doctor Protected Routes */}
          <Route path="/doctor/*" element={
            <ProtectedRoute user={user} allowedRoles={['doctor']}>
              <DoctorLayout user={user} appointments={appointments} prescriptions={prescriptions} setPrescriptions={setPrescriptions} onLogout={logout} />
            </ProtectedRoute>
          } />

          {/* Patient Protected Routes */}
          <Route path="/patient/*" element={
            <ProtectedRoute user={user} allowedRoles={['patient']}>
              <PatientLayout user={user} doctors={doctors} appointments={appointments} setAppointments={setAppointments} prescriptions={prescriptions} onLogout={logout} />
            </ProtectedRoute>
          } />

          {/* Fallback Root Route */}
          <Route path="/" element={
            user ? <Navigate to={`/${user.role}`} replace /> : <Navigate to="/login" replace />
          } />

          {/* Catch-all Wildcard Route for any wrong URL like /src/components/... */}
          <Route path="*" element={
            user ? <Navigate to={`/${user.role}`} replace /> : <Navigate to="/login" replace />
          } />
        </Routes>
      </ErrorBoundary>
    </BrowserRouter>
  );
}
