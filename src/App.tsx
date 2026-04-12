import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LayoutDashboard, 
  CreditCard, 
  Users, 
  ClipboardList, 
  BarChart3, 
  FileText, 
  Download, 
  Send,
  Mail,
  Phone,
  MapPin,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  X,
  ExternalLink,
  LogIn,
  LogOut,
  User as UserIcon,
  ShieldCheck,
  Trash2,
  Plus
} from 'lucide-react';
import { auth, googleProvider, signInWithPopup, signOut, onAuthStateChanged, User, storage } from './firebase';
import { doc, setDoc, getDoc, collection, onSnapshot, addDoc, deleteDoc, query, orderBy, Timestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db } from './firebase';

enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId: string | undefined;
    email: string | null | undefined;
    emailVerified: boolean | undefined;
    isAnonymous: boolean | undefined;
    tenantId: string | null | undefined;
    providerInfo: {
      providerId: string;
      displayName: string | null;
      email: string | null;
      photoUrl: string | null;
    }[];
  }
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData.map(provider => ({
        providerId: provider.providerId,
        displayName: provider.displayName,
        email: provider.email,
        photoUrl: provider.photoURL
      })) || []
    },
    operationType,
    path
  }
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  // We don't want to crash the app, but we want to log it for the agent
}

const slides = [
  {
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=1920&h=600",
    title: "Logistics Post",
    description: "Connecting India, Empowering Business with the world's largest postal network."
  },
  {
    image: "https://images.unsplash.com/photo-1616401784845-180882ba9ba8?auto=format&fit=crop&q=80&w=1920&h=600",
    title: "Speed Post",
    description: "Guaranteed Next-Day Delivery for your urgent parcels and documents."
  },
  {
    image: "https://images.unsplash.com/photo-1580136608079-72029d0de130?auto=format&fit=crop&q=80&w=1920&h=600",
    title: "World of Stamps",
    description: "Explore a whole new world of stamps from 1854 to today."
  },
  {
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=1920&h=600",
    title: "Digital India Post",
    description: "Modernizing postal services for a digital and connected India."
  }
];

function HeroSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const next = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prev = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <div className="relative h-[400px] md:h-[500px] overflow-hidden bg-gray-900">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
        >
          <div className="absolute inset-0 bg-black/50 z-10" />
          <img 
            src={slides[current].image} 
            alt={slides[current].title}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 z-20 flex items-center justify-center text-center px-4">
            <div className="max-w-4xl">
              <motion.h2 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg"
              >
                {slides[current].title}
              </motion.h2>
              <motion.p 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-lg md:text-xl text-gray-200 drop-shadow-md"
              >
                {slides[current].description}
              </motion.p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      <button 
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-white/20 hover:bg-white/40 text-white transition-colors"
      >
        <ChevronLeft size={32} />
      </button>
      <button 
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-white/20 hover:bg-white/40 text-white transition-colors"
      >
        <ChevronRight size={32} />
      </button>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-3 h-3 rounded-full transition-all ${i === current ? 'bg-[#FFC220] w-8' : 'bg-white/50'}`}
          />
        ))}
      </div>
    </div>
  );
}

export default function App() {
  const [showAdvanceModal, setShowAdvanceModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [showBPRModal, setShowBPRModal] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [resources, setResources] = useState<any[]>([]);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [resourceToDelete, setResourceToDelete] = useState<{ id: string; title: string } | null>(null);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadMethod, setUploadMethod] = useState<'link' | 'file'>('link');

  const showNotify = (message: string, type: 'success' | 'error' = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const userRef = doc(db, 'users', currentUser.uid);
        const userSnap = await getDoc(userRef);
        
        if (!userSnap.exists()) {
          const newUser = {
            uid: currentUser.uid,
            email: currentUser.email,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
            role: currentUser.email === 'teacherkalandi@gmail.com' ? 'admin' : 'user'
          };
          await setDoc(userRef, newUser);
          setIsAdmin(newUser.role === 'admin');
        } else {
          setIsAdmin(userSnap.data()?.role === 'admin' || currentUser.email === 'teacherkalandi@gmail.com');
        }
      } else {
        setIsAdmin(false);
      }
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (user) {
      const q = query(collection(db, 'resources'), orderBy('createdAt', 'desc'));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setResources(data);
      });
      return () => unsubscribe();
    }
  }, [user]);

  const confirmDelete = async () => {
    if (!resourceToDelete) return;
    try {
      await deleteDoc(doc(db, 'resources', resourceToDelete.id));
      showNotify('Resource deleted successfully');
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `resources/${resourceToDelete.id}`);
      showNotify('Failed to delete resource. Check permissions.', 'error');
    } finally {
      setResourceToDelete(null);
    }
  };

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-[#E31837] border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-500 font-medium">Loading Portal...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Header */}
      <header className="bg-[#E31837] text-white shadow-md border-b-2 border-[#FFC220]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3 md:gap-4">
            {/* Indian National Emblem */}
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg" 
              alt="Emblem of India" 
              className="h-12 md:h-16 w-auto brightness-0 invert" 
              referrerPolicy="no-referrer"
            />
            <h1 className="text-lg md:text-2xl font-bold tracking-tight leading-tight">
              Business Development Branch
              <span className="block text-[10px] md:text-xs font-normal opacity-80">Dhenkanal Postal Division</span>
            </h1>
          </div>
          
          <div className="flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-4">
                {isAdmin && (
                  <button 
                    onClick={() => setShowAdminPanel(!showAdminPanel)}
                    className="hidden md:flex items-center gap-2 px-4 py-2 bg-[#FFC220] text-gray-900 rounded-lg font-semibold hover:bg-yellow-400 transition-colors text-sm"
                  >
                    <ShieldCheck size={16} />
                    {showAdminPanel ? 'Exit Admin' : 'Admin Panel'}
                  </button>
                )}
                <div className="flex items-center gap-3 bg-white/10 p-1.5 pr-4 rounded-full border border-white/20">
                <img 
                  src={user.photoURL || ''} 
                  alt={user.displayName || ''} 
                  className="w-8 h-8 rounded-full border border-white/50"
                  referrerPolicy="no-referrer"
                />
                <div className="hidden md:block">
                  <p className="text-xs font-bold leading-none">{user.displayName}</p>
                  <p className="text-[10px] opacity-70 leading-none mt-1">Logged In</p>
                </div>
                <button 
                  onClick={handleLogout}
                  className="p-1.5 hover:bg-white/20 rounded-full transition-colors"
                  title="Logout"
                >
                  <LogOut size={18} />
                </button>
              </div>
            </div>
          ) : (
            <button 
              onClick={handleLogin}
                className="flex items-center gap-2 bg-[#FFC220] text-gray-900 px-4 py-2 rounded-lg font-bold text-sm hover:bg-[#e6af1d] transition-colors shadow-sm"
              >
                <LogIn size={18} />
                Login
              </button>
            )}
            {/* India Post Logo */}
            <div className="bg-white p-1 md:p-1.5 rounded-md shadow-sm shrink-0 hidden sm:block">
              <img 
                src="https://upload.wikimedia.org/wikipedia/en/3/32/India_Post.svg" 
                alt="India Post Logo" 
                className="h-8 md:h-12 w-auto" 
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Bar */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-start md:justify-center gap-1 md:gap-8">
          {[
            { name: 'Dashboard', href: '#dashboard' },
            { name: 'Documents', href: '#documents', type: 'document' },
            { name: 'Forms', href: '#forms', type: 'form' },
            ...(isAdmin ? [{ name: 'Admin Panel', onClick: () => setShowAdminPanel(!showAdminPanel) }] : [])
          ].map((item) => (
            <div 
              key={item.name} 
              className="relative group"
              onMouseEnter={() => item.type && setActiveDropdown(item.type)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <a 
                href={item.href || '#'} 
                onClick={(e) => {
                  if (item.onClick) {
                    e.preventDefault();
                    item.onClick();
                  }
                }}
                className={`px-4 py-3 text-sm font-bold border-b-2 transition-all flex items-center gap-1 ${
                  (item.name === 'Admin Panel' && showAdminPanel)
                    ? 'text-[#E31837] border-[#E31837]'
                    : 'text-gray-700 border-transparent hover:text-[#E31837] hover:border-[#E31837]'
                }`}
              >
                {item.name}
                {item.type && <ChevronDown size={14} className={`transition-transform ${activeDropdown === item.type ? 'rotate-180' : ''}`} />}
              </a>

              {/* Dropdown Menu */}
              <AnimatePresence>
                {item.type && activeDropdown === item.type && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute left-0 top-full w-64 bg-white shadow-xl rounded-b-xl border border-gray-100 py-2 z-50 overflow-hidden"
                  >
                    <div className="max-h-64 overflow-y-auto custom-scrollbar">
                      {resources.filter(r => r.type === item.type).length === 0 ? (
                        <div className="px-4 py-3 text-xs text-gray-400 italic">No {item.name.toLowerCase()} yet</div>
                      ) : (
                        resources.filter(r => r.type === item.type).map((res) => (
                          <a
                            key={res.id}
                            href={res.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#E31837] transition-colors border-b border-gray-50 last:border-0"
                          >
                            {item.type === 'document' ? <FileText size={14} className="shrink-0 text-blue-500" /> : <ClipboardList size={14} className="shrink-0 text-green-500" />}
                            <span className="truncate">{res.title}</span>
                          </a>
                        ))
                      )}
                    </div>
                    <div className="px-4 py-2 bg-gray-50 border-t border-gray-100">
                      <a href={item.href} className="text-[10px] font-bold text-[#E31837] uppercase tracking-wider hover:underline">
                        View All {item.name}
                      </a>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </nav>

      <HeroSlider />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        
        {/* Admin Panel */}
        {isAdmin && showAdminPanel && (
          <section className="max-w-4xl mx-auto mb-12 bg-white rounded-2xl shadow-lg border-2 border-[#FFC220] p-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <ShieldCheck className="text-[#E31837]" />
                Admin Management Panel
              </h2>
              <button 
                onClick={() => setShowAdminPanel(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Add New Resource Form */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Add New Resource</h3>
                <div className="flex gap-2 p-1 bg-gray-100 rounded-lg mb-4">
                  <button 
                    onClick={() => setUploadMethod('link')}
                    className={`flex-1 py-1.5 text-xs font-bold rounded-md transition-all ${uploadMethod === 'link' ? 'bg-white text-[#E31837] shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                  >
                    Link / URL
                  </button>
                  <button 
                    onClick={() => setUploadMethod('file')}
                    className={`flex-1 py-1.5 text-xs font-bold rounded-md transition-all ${uploadMethod === 'file' ? 'bg-white text-[#E31837] shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                  >
                    Direct PDF Upload
                  </button>
                </div>
                <form 
                  onSubmit={async (e) => {
                    e.preventDefault();
                    if (uploading) return;

                    const formData = new FormData(e.currentTarget);
                    const title = formData.get('title') as string;
                    const type = formData.get('type') as string;
                    let url = formData.get('url') as string;
                    const file = (e.currentTarget.querySelector('input[type="file"]') as HTMLInputElement)?.files?.[0];

                    if (!title || !type) {
                      showNotify('Please fill in all required fields', 'error');
                      return;
                    }

                    try {
                      setUploading(true);
                      
                      if (uploadMethod === 'file' && file) {
                        if (file.type !== 'application/pdf') {
                          showNotify('Only PDF files are allowed', 'error');
                          setUploading(false);
                          return;
                        }
                        const storageRef = ref(storage, `resources/${Date.now()}_${file.name}`);
                        const snapshot = await uploadBytes(storageRef, file);
                        url = await getDownloadURL(snapshot.ref);
                      }

                      if (!url) {
                        showNotify('Please provide a URL or select a file', 'error');
                        setUploading(false);
                        return;
                      }

                      await addDoc(collection(db, 'resources'), {
                        title,
                        url,
                        type,
                        createdAt: Timestamp.now(),
                        createdBy: user?.uid,
                        method: uploadMethod
                      });
                      
                      showNotify('Resource uploaded successfully');
                      (e.target as HTMLFormElement).reset();
                    } catch (error) {
                      console.error("Error adding resource:", error);
                      showNotify('Failed to upload resource', 'error');
                    } finally {
                      setUploading(false);
                    }
                  }}
                  className="space-y-4"
                >
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                    <input name="title" type="text" required className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#E31837] focus:border-transparent outline-none" placeholder="e.g. BD Manual 2024" />
                  </div>
                  
                  {uploadMethod === 'link' ? (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Resource URL (Google Drive/Link)</label>
                      <input name="url" type="url" required className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#E31837] focus:border-transparent outline-none" placeholder="https://drive.google.com/..." />
                    </div>
                  ) : (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Select PDF File</label>
                      <div className="relative group">
                        <input 
                          name="file" 
                          type="file" 
                          accept=".pdf" 
                          required 
                          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#E31837] focus:border-transparent outline-none file:mr-4 file:py-1 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-[#FFF9E6] file:text-[#E31837] hover:file:bg-[#FFC220]/20 cursor-pointer" 
                        />
                      </div>
                      <p className="text-[10px] text-gray-400 mt-1 italic">Max file size: 5MB recommended</p>
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                    <select name="type" className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#E31837] focus:border-transparent outline-none">
                      <option value="document">Document</option>
                      <option value="form">Form</option>
                    </select>
                  </div>
                  
                  <button 
                    type="submit" 
                    disabled={uploading}
                    className={`w-full py-3 rounded-lg font-bold transition-all flex items-center justify-center gap-2 shadow-md ${
                      uploading ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#E31837] text-white hover:bg-[#c4152f]'
                    }`}
                  >
                    {uploading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Uploading...
                      </>
                    ) : (
                      <>
                        <Plus size={20} />
                        {uploadMethod === 'file' ? 'Upload PDF File' : 'Add Resource Link'}
                      </>
                    )}
                  </button>
                </form>
              </div>

              {/* Manage Existing Resources */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Manage Resources</h3>
                <div className="max-h-[400px] overflow-y-auto space-y-3 pr-2">
                  {resources.length === 0 ? (
                    <p className="text-gray-500 text-center py-8 italic">No resources uploaded yet.</p>
                  ) : (
                    resources.map((res) => (
                      <div key={res.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
                        <div className="flex items-center gap-3 overflow-hidden">
                          {res.type === 'document' ? <FileText size={18} className="text-blue-500 flex-shrink-0" /> : <ClipboardList size={18} className="text-green-500 flex-shrink-0" />}
                          <span className="text-sm font-medium text-gray-700 truncate">{res.title}</span>
                        </div>
                        <button 
                          onClick={() => setResourceToDelete({ id: res.id, title: res.title })}
                          className="p-1.5 text-gray-400 hover:text-red-500 transition-colors"
                          title="Delete Resource"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </section>
        )}

        {!user ? (
          <section className="bg-white rounded-2xl p-12 shadow-sm border border-gray-300 flex flex-col items-center text-center gap-6">
            <div className="w-20 h-20 bg-[#FFF9E6] rounded-full flex items-center justify-center text-[#E31837]">
              <ShieldCheck size={48} />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Secure Access Required</h2>
              <p className="text-gray-600 max-w-lg mx-auto">
                Please login with your official Google account to access the Business Development Branch portal and its core modules.
              </p>
            </div>
            <button 
              onClick={handleLogin}
              className="flex items-center gap-3 bg-[#E31837] text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-[#c4152f] transition-all shadow-lg hover:shadow-xl active:scale-95"
            >
              <LogIn size={24} />
              Login with Google
            </button>
          </section>
        ) : (
          <>
            {/* Welcome Section */}
            <section className="bg-white rounded-2xl p-8 shadow-sm border border-gray-300 flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome, {user.displayName}!</h2>
                <p className="text-gray-600 max-w-2xl">
                  Access all your business development tools, reports, and customer management interfaces in one centralized location.
                </p>
              </div>
              <div className="bg-[#FFF9E6] p-4 rounded-xl border border-[#FFC220]/30 text-[#E31837] font-semibold">
                System Status: Online
              </div>
            </section>

            {/* Cards Section */}
            <section id="dashboard">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <LayoutDashboard className="text-[#E31837]" />
                Core Modules
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Card 1: BD Interface */}
                <a href="https://dhenkanal-postal-division-interface.vercel.app/" target="_blank" rel="noopener noreferrer" className="bg-blue-50 rounded-xl shadow-sm border-2 border-blue-200 p-6 hover:shadow-md transition-all group cursor-pointer hover:border-blue-500">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-500 transition-colors">
                    <LayoutDashboard className="text-blue-600 group-hover:text-white transition-colors" size={24} />
                  </div>
                  <h4 className="text-lg font-bold text-gray-900 mb-2">BD Interface</h4>
                  <p className="text-gray-600 text-sm">Main interface for business development operations and tracking.</p>
                </a>

                {/* Card 2: BNPL */}
                <a href="https://bnpl-services.vercel.app/" target="_blank" rel="noopener noreferrer" className="bg-emerald-50 rounded-xl shadow-sm border-2 border-emerald-200 p-6 hover:shadow-md transition-all group cursor-pointer hover:border-emerald-500">
                  <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-emerald-500 transition-colors">
                    <CreditCard className="text-emerald-600 group-hover:text-white transition-colors" size={24} />
                  </div>
                  <h4 className="text-lg font-bold text-gray-900 mb-2">BNPL</h4>
                  <p className="text-gray-600 text-sm">Book Now Pay Later services, customer credit management and invoicing.</p>
                </a>

                {/* Card 3: Advance Customer */}
                <button 
                  onClick={() => setShowAdvanceModal(true)}
                  className="bg-amber-50 text-left rounded-xl shadow-sm border-2 border-amber-200 p-6 hover:shadow-md transition-all group cursor-pointer hover:border-amber-500 w-full"
                >
                  <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-amber-500 transition-colors">
                    <Users className="text-amber-600 group-hover:text-white transition-colors" size={24} />
                  </div>
                  <h4 className="text-lg font-bold text-gray-900 mb-2">Advance Customer</h4>
                  <p className="text-gray-600 text-sm">Manage advance deposit accounts, bulk customers, and special clients.</p>
                </button>

                {/* Card 5: BD Orders/Rules */}
                <a href="https://bd-products-orders.vercel.app/" target="_blank" rel="noopener noreferrer" className="bg-indigo-50 rounded-xl shadow-sm border-2 border-indigo-200 p-6 hover:shadow-md transition-all group cursor-pointer hover:border-indigo-500">
                  <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-indigo-500 transition-colors">
                    <ClipboardList className="text-indigo-600 group-hover:text-white transition-colors" size={24} />
                  </div>
                  <h4 className="text-lg font-bold text-gray-900 mb-2">BD Orders/Rules</h4>
                  <p className="text-gray-600 text-sm">Latest departmental orders, guidelines, and business rules.</p>
                </a>

                {/* Card 6: BD report */}
                <button 
                  onClick={() => setShowReportModal(true)}
                  className="bg-rose-50 text-left rounded-xl shadow-sm border-2 border-rose-200 p-6 hover:shadow-md transition-all group cursor-pointer hover:border-rose-500 w-full"
                >
                  <div className="w-12 h-12 bg-rose-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-rose-500 transition-colors">
                    <BarChart3 className="text-rose-600 group-hover:text-white transition-colors" size={24} />
                  </div>
                  <h4 className="text-lg font-bold text-gray-900 mb-2">BD Report</h4>
                  <p className="text-gray-600 text-sm">Generate revenue reports, performance analytics, and MIS data.</p>
                </button>

                {/* Card 7: ePost */}
                <a href="#" className="bg-cyan-50 rounded-xl shadow-sm border-2 border-cyan-200 p-6 hover:shadow-md transition-all group cursor-pointer hover:border-cyan-500">
                  <div className="w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-cyan-500 transition-colors">
                    <Mail className="text-cyan-600 group-hover:text-white transition-colors" size={24} />
                  </div>
                  <h4 className="text-lg font-bold text-gray-900 mb-2">ePost</h4>
                  <p className="text-gray-600 text-sm">Send and receive messages as soft copies through the internet.</p>
                </a>

                {/* Card 8: ePayment */}
                <a href="#" className="bg-violet-50 rounded-xl shadow-sm border-2 border-violet-200 p-6 hover:shadow-md transition-all group cursor-pointer hover:border-violet-500">
                  <div className="w-12 h-12 bg-violet-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-violet-500 transition-colors">
                    <CreditCard className="text-violet-600 group-hover:text-white transition-colors" size={24} />
                  </div>
                  <h4 className="text-lg font-bold text-gray-900 mb-2">ePayment</h4>
                  <p className="text-gray-600 text-sm">Electronic payment solutions for bills, taxes, and other services.</p>
                </a>

                {/* Card 9: Direct Post */}
                <a href="#" className="bg-orange-50 rounded-xl shadow-sm border-2 border-orange-200 p-6 hover:shadow-md transition-all group cursor-pointer hover:border-orange-500">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-orange-500 transition-colors">
                    <Send className="text-orange-600 group-hover:text-white transition-colors" size={24} />
                  </div>
                  <h4 className="text-lg font-bold text-gray-900 mb-2">Direct Post</h4>
                  <p className="text-gray-600 text-sm">Un-addressed direct mail service for advertising and promotion.</p>
                </a>

                {/* Card 10: Mediapost */}
                <a href="#" className="bg-fuchsia-50 rounded-xl shadow-sm border-2 border-fuchsia-200 p-6 hover:shadow-md transition-all group cursor-pointer hover:border-fuchsia-500">
                  <div className="w-12 h-12 bg-fuchsia-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-fuchsia-500 transition-colors">
                    <LayoutDashboard className="text-fuchsia-600 group-hover:text-white transition-colors" size={24} />
                  </div>
                  <h4 className="text-lg font-bold text-gray-900 mb-2">Mediapost</h4>
                  <p className="text-gray-600 text-sm">Advertising opportunities on postal stationery and vehicles.</p>
                </a>

                {/* Card 11: Retail Post */}
                <a href="#" className="bg-teal-50 rounded-xl shadow-sm border-2 border-teal-200 p-6 hover:shadow-md transition-all group cursor-pointer hover:border-teal-500">
                  <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-teal-500 transition-colors">
                    <ClipboardList className="text-teal-600 group-hover:text-white transition-colors" size={24} />
                  </div>
                  <h4 className="text-lg font-bold text-gray-900 mb-2">Retail Post</h4>
                  <p className="text-gray-600 text-sm">One-stop shop for various third-party services and products.</p>
                </a>
              </div>

              {/* Modals */}
              {/* Advance Customer Modal */}
              <AnimatePresence>
                {showAdvanceModal && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.9, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9, y: 20 }}
                      className="bg-white rounded-2xl shadow-2xl border-t-4 border-[#E31837] w-full max-w-2xl overflow-hidden"
                    >
                      <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gray-50">
                        <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                          <Users className="text-[#E31837]" />
                          Advance Customer Options
                        </h3>
                        <button 
                          onClick={() => setShowAdvanceModal(false)}
                          className="p-2 hover:bg-gray-200 rounded-full transition-colors text-gray-500"
                        >
                          <X size={24} />
                        </button>
                      </div>
                      <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6 bg-white">
                        <a 
                          href="https://docs.google.com/spreadsheets/d/1vn6sGUOy2STwsFihUUjmdcww0IRZBpXiUMy_9JRgY-A/edit?gid=1288268905#gid=1288268905" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="group p-6 rounded-xl border-2 border-gray-200 hover:border-[#E31837] hover:bg-[#FFF9E6]/30 transition-all flex flex-col items-center text-center gap-4"
                        >
                          <div className="w-16 h-16 bg-[#FFF9E6] rounded-full flex items-center justify-center group-hover:bg-[#E31837] transition-colors">
                            <FileText className="text-[#E31837] group-hover:text-white" size={32} />
                          </div>
                          <div>
                            <h4 className="font-bold text-gray-900 mb-1">Advance Customer Data</h4>
                            <p className="text-xs text-gray-500">View detailed spreadsheets and datasets</p>
                          </div>
                          <ExternalLink size={16} className="text-[#E31837] opacity-0 group-hover:opacity-100 transition-opacity" />
                        </a>
                        <a 
                          href="https://advance-customer-facility-dashboard.vercel.app/" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="group p-6 rounded-xl border-2 border-gray-200 hover:border-[#E31837] hover:bg-[#FFF9E6]/30 transition-all flex flex-col items-center text-center gap-4"
                        >
                          <div className="w-16 h-16 bg-[#FFF9E6] rounded-full flex items-center justify-center group-hover:bg-[#E31837] transition-colors">
                            <BarChart3 className="text-[#E31837] group-hover:text-white" size={32} />
                          </div>
                          <div>
                            <h4 className="font-bold text-gray-900 mb-1">Advance Customer PPT</h4>
                            <p className="text-xs text-gray-500">View presentations and dashboards</p>
                          </div>
                          <ExternalLink size={16} className="text-[#E31837] opacity-0 group-hover:opacity-100 transition-opacity" />
                        </a>
                      </div>
                      <div className="p-4 bg-gray-50 border-t border-gray-100 text-center">
                        <button 
                          onClick={() => setShowAdvanceModal(false)}
                          className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold rounded-lg transition-colors"
                        >
                          Close
                        </button>
                      </div>
                    </motion.div>
                  </div>
                )}
              </AnimatePresence>

              {/* BD Report Modal */}
              <AnimatePresence>
                {showReportModal && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.9, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9, y: 20 }}
                      className="bg-white rounded-2xl shadow-2xl border-t-4 border-rose-500 w-full max-w-4xl overflow-hidden"
                    >
                      <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gray-50">
                        <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                          <BarChart3 className="text-rose-600" />
                          BD Report Modules
                        </h3>
                        <button 
                          onClick={() => setShowReportModal(false)}
                          className="p-2 hover:bg-gray-200 rounded-full transition-colors text-gray-500"
                        >
                          <X size={24} />
                        </button>
                      </div>
                      <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 bg-white overflow-y-auto max-h-[70vh]">
                        <button 
                          onClick={() => setShowBPRModal(true)}
                          className="group p-6 rounded-xl border-2 border-gray-200 hover:border-rose-500 hover:bg-rose-50 transition-all flex flex-col items-center text-center gap-4"
                        >
                          <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center group-hover:bg-rose-500 transition-colors">
                            <BarChart3 className="text-rose-600 group-hover:text-white" size={32} />
                          </div>
                          <h4 className="font-bold text-gray-900">Business Performance Report</h4>
                        </button>
                        <a href="#" className="group p-6 rounded-xl border-2 border-gray-200 hover:border-rose-500 hover:bg-rose-50 transition-all flex flex-col items-center text-center gap-4">
                          <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center group-hover:bg-rose-500 transition-colors">
                            <FileText className="text-rose-600 group-hover:text-white" size={32} />
                          </div>
                          <h4 className="font-bold text-gray-900">Gangajal Report</h4>
                        </a>
                        <a href="#" className="group p-6 rounded-xl border-2 border-gray-200 hover:border-rose-500 hover:bg-rose-50 transition-all flex flex-col items-center text-center gap-4">
                          <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center group-hover:bg-rose-500 transition-colors">
                            <FileText className="text-rose-600 group-hover:text-white" size={32} />
                          </div>
                          <h4 className="font-bold text-gray-900">Flag Sale Report</h4>
                        </a>
                        <a href="#" className="group p-6 rounded-xl border-2 border-gray-200 hover:border-rose-500 hover:bg-rose-50 transition-all flex flex-col items-center text-center gap-4">
                          <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center group-hover:bg-rose-500 transition-colors">
                            <FileText className="text-rose-600 group-hover:text-white" size={32} />
                          </div>
                          <h4 className="font-bold text-gray-900">Rakhi Cover Selling Report</h4>
                        </a>
                        <a href="https://bdachievement-report.edgeone.app/" target="_blank" rel="noopener noreferrer" className="group p-6 rounded-xl border-2 border-gray-200 hover:border-rose-500 hover:bg-rose-50 transition-all flex flex-col items-center text-center gap-4">
                          <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center group-hover:bg-rose-500 transition-colors">
                            <BarChart3 className="text-rose-600 group-hover:text-white" size={32} />
                          </div>
                          <h4 className="font-bold text-gray-900">BD Achievements</h4>
                        </a>
                        <a href="#" className="group p-6 rounded-xl border-2 border-gray-200 hover:border-rose-500 hover:bg-rose-50 transition-all flex flex-col items-center text-center gap-4">
                          <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center group-hover:bg-rose-500 transition-colors">
                            <ClipboardList className="text-rose-600 group-hover:text-white" size={32} />
                          </div>
                          <h4 className="font-bold text-gray-900">BD Month Wise Report</h4>
                        </a>
                      </div>
                      <div className="p-4 bg-gray-50 border-t border-gray-100 text-center">
                        <button 
                          onClick={() => setShowReportModal(false)}
                          className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold rounded-lg transition-colors"
                        >
                          Close
                        </button>
                      </div>
                    </motion.div>
                  </div>
                )}
              </AnimatePresence>

              {/* Business Performance Report (BPR) Modal */}
              <AnimatePresence>
                {showBPRModal && (
                  <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.9, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9, y: 20 }}
                      className="bg-white rounded-2xl shadow-2xl border-t-4 border-rose-600 w-full max-w-lg overflow-hidden"
                    >
                      <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gray-50">
                        <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                          <BarChart3 className="text-rose-600" />
                          Business Performance Reports
                        </h3>
                        <button 
                          onClick={() => setShowBPRModal(false)}
                          className="p-2 hover:bg-gray-200 rounded-full transition-colors text-gray-500"
                        >
                          <X size={24} />
                        </button>
                      </div>
                      <div className="p-8 space-y-4 bg-white">
                        <a 
                          href="https://bdrevenuachievemen2025-26.edgeone.app/" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center justify-between p-4 rounded-xl border-2 border-gray-100 hover:border-rose-500 hover:bg-rose-50 transition-all group"
                        >
                          <span className="font-bold text-gray-700 group-hover:text-rose-600">BPR Report 2025-26</span>
                          <ExternalLink size={18} className="text-rose-600" />
                        </a>
                        <a 
                          href="#" 
                          className="flex items-center justify-between p-4 rounded-xl border-2 border-gray-100 hover:border-rose-500 hover:bg-rose-50 transition-all group"
                        >
                          <span className="font-bold text-gray-700 group-hover:text-rose-600">BPR Report 2026-27</span>
                          <ExternalLink size={18} className="text-rose-600" />
                        </a>
                        <a 
                          href="#" 
                          className="flex items-center justify-between p-4 rounded-xl border-2 border-gray-100 hover:border-rose-500 hover:bg-rose-50 transition-all group"
                        >
                          <span className="font-bold text-gray-700 group-hover:text-rose-600">BPR Report 2027-28</span>
                          <ExternalLink size={18} className="text-rose-600" />
                        </a>
                      </div>
                      <div className="p-4 bg-gray-50 border-t border-gray-100 text-center">
                        <button 
                          onClick={() => setShowBPRModal(false)}
                          className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold rounded-lg transition-colors"
                        >
                          Back to Reports
                        </button>
                      </div>
                    </motion.div>
                  </div>
                )}
              </AnimatePresence>
            </section>

            <div className="max-w-4xl mx-auto space-y-12">
              {/* Documents Section */}
              <section id="documents" className="bg-white rounded-2xl shadow-sm border border-gray-300 p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <FileText className="text-[#E31837]" />
                  Documents & Resources
                </h3>
                <div className="space-y-4">
                  {resources.filter(r => r.type === 'document').length === 0 ? (
                    <div className="text-center py-8 text-gray-500 italic">
                      No documents available at the moment.
                    </div>
                  ) : (
                    resources.filter(r => r.type === 'document').map((doc, i) => (
                      <div key={i} className="flex items-center justify-between p-4 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors">
                        <div className="flex items-center gap-3">
                          <FileText className="text-gray-400" size={20} />
                          <span className="font-medium text-gray-700">{doc.title}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          {isAdmin && (
                            <button 
                              onClick={() => setResourceToDelete({ id: doc.id, title: doc.title })}
                              className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors"
                              title="Delete Document"
                            >
                              <Trash2 size={18} />
                            </button>
                          )}
                          <a 
                            href={doc.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="p-2 text-[#E31837] hover:bg-[#FFF9E6] rounded-md transition-colors" 
                            title="Download"
                          >
                            <Download size={18} />
                          </a>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </section>

              {/* Forms Section */}
              <section id="forms" className="bg-white rounded-2xl shadow-sm border border-gray-300 p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <ClipboardList className="text-[#E31837]" />
                  Forms & Applications
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {resources.filter(r => r.type === 'form').length === 0 ? (
                    <div className="col-span-full text-center py-8 text-gray-500 italic">
                      No forms available at the moment.
                    </div>
                  ) : (
                    resources.filter(r => r.type === 'form').map((form, i) => (
                      <div key={i} className="relative group">
                        <a 
                          href={form.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-4 rounded-xl border border-gray-200 hover:border-[#E31837] transition-all cursor-pointer group block pr-12"
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-medium text-gray-700 group-hover:text-[#E31837]">{form.title}</span>
                            <Download size={16} className="text-gray-400 group-hover:text-[#E31837]" />
                          </div>
                        </a>
                        {isAdmin && (
                          <button 
                            onClick={(e) => {
                              e.preventDefault();
                              setResourceToDelete({ id: form.id, title: form.title });
                            }}
                            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors opacity-0 group-hover:opacity-100"
                            title="Delete Form"
                          >
                            <Trash2 size={16} />
                          </button>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </section>
            </div>
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12 mt-12 border-t-4 border-[#FFC220]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-[#FFC220] rounded-full flex items-center justify-center text-gray-900 font-bold text-sm">
                IP
              </div>
              <h4 className="text-white font-bold text-lg">Business Development</h4>
            </div>
            <p className="text-sm text-gray-400 mb-4">
              Empowering India Post's business growth through digital solutions and streamlined customer management.
            </p>
            <div className="pt-4 border-t border-gray-800">
              <p className="text-xs text-gray-500 italic">
                Prepared by Kalandi Charan Sahoo, OA, DO, Dhenkanal Postal Division.
              </p>
            </div>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-[#FFC220] transition-colors">India Post Official</a></li>
              <li><a href="#" className="hover:text-[#FFC220] transition-colors">Employee Portal</a></li>
              <li><a href="#" className="hover:text-[#FFC220] transition-colors">Helpdesk Support</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Contact Us</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2"><Mail size={16} className="text-[#FFC220]" /> bd.support@indiapost.gov.in</li>
              <li className="flex items-center gap-2"><Phone size={16} className="text-[#FFC220]" /> 1800-266-6868</li>
            </ul>
          </div>
        </div>
      </footer>

      {/* Toast Notification */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className={`fixed bottom-8 right-8 z-[100] px-6 py-3 rounded-xl shadow-2xl flex items-center gap-3 border-l-4 ${
              notification.type === 'success' 
                ? 'bg-white text-gray-900 border-green-500' 
                : 'bg-white text-gray-900 border-red-500'
            }`}
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              notification.type === 'success' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
            }`}>
              {notification.type === 'success' ? <ShieldCheck size={18} /> : <X size={18} />}
            </div>
            <p className="font-bold text-sm">{notification.message}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {resourceToDelete && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white rounded-2xl shadow-2xl border-t-4 border-red-500 w-full max-w-md overflow-hidden"
            >
              <div className="p-6">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center text-red-500 mb-4">
                  <Trash2 size={24} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Confirm Deletion</h3>
                <p className="text-gray-600 mb-6">
                  Are you sure you want to delete <strong>"{resourceToDelete.title}"</strong>? This action cannot be undone.
                </p>
                <div className="flex items-center justify-end gap-3">
                  <button 
                    onClick={() => setResourceToDelete(null)}
                    className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg font-medium transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={confirmDelete}
                    className="px-4 py-2 bg-red-500 text-white hover:bg-red-600 rounded-lg font-medium transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
