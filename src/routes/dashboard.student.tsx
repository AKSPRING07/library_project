import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { 
  BookOpen, Bookmark, Clock, Sparkles, Search, FileText, Bell, Send, CheckCircle2, AlertCircle, RefreshCw, Star, User, Mail, Shield, Check, Info, Library
} from "lucide-react";
import { DashboardShell, StatCard } from "@/components/dashboard-shell";
import { motion, AnimatePresence } from "framer-motion";

export const Route = createFileRoute("/dashboard/student")({
  component: StudentDashboard,
  head: () => ({ meta: [{ title: "Student Dashboard — Lumina" }] }),
});

function StudentDashboard() {
  const [activeTab, setActiveTab] = useState<string>("overview");

  // --- USER PROFILE STATE ---
  const [profileName, setProfileName] = useState("Alex Carter");
  const [profileId, setProfileId] = useState("STU-2027-001");
  const [profileDept, setProfileDept] = useState("Computer Science");
  const [profileEmail, setProfileEmail] = useState("alex@university.edu");
  const [profilePwd, setProfilePwd] = useState("••••••••");
  const [saveSuccess, setSaveSuccess] = useState(false);

  // --- GLOBAL DATA & STATES ---
  const [searchQuery, setSearchQuery] = useState("");
  const [catalogCategory, setCatalogCategory] = useState<string>("All");

  const catalogBooks = [
    { title: "Probabilistic Machine Learning", author: "Kevin P. Murphy", category: "Computer Science", publisher: "MIT Press", available: true, isbn: "978-0262046824" },
    { title: "Designing Machine Learning Systems", author: "Chip Huyen", category: "Computer Science", publisher: "O'Reilly", available: true, isbn: "978-1098107963" },
    { title: "Introduction to Algorithms", author: "Cormen, Leiserson, Rivest", category: "Mathematics", publisher: "MIT Press", available: false, isbn: "978-0262033848" },
    { title: "The Pragmatic Programmer", author: "David Thomas", category: "Software Engineering", publisher: "Addison-Wesley", available: true, isbn: "978-0135957059" },
    { title: "Clean Architecture", author: "Robert C. Martin", category: "Software Engineering", publisher: "Prentice Hall", available: false, isbn: "978-0134494166" },
    { title: "Quantum Error Correction Survey", author: "Emanuel Knill", category: "Mathematics", publisher: "Nature Quantum", available: true, isbn: "978-0470091357" },
    { title: "Scaling Laws for Sparse Mixtures", author: "William Fedus", category: "Computer Science", publisher: "arXiv ML", available: true, isbn: "978-0596520687" },
    { title: "Discrete Mathematics & Applications", author: "Kenneth Rosen", category: "Mathematics", publisher: "McGraw Hill", available: true, isbn: "978-0073383095" },
  ];

  const recommendedCatalog = [
    { title: "Artificial Intelligence: A Modern Approach", author: "Russell & Norvig", match: 98, desc: "Essential CS standard curriculum matching your major." },
    { title: "Patterns of Enterprise Application Architecture", author: "Martin Fowler", match: 92, desc: "Recommended for Software Engineering module track." },
    { title: "Deep Learning Foundations", author: "Ian Goodfellow", match: 95, desc: "Matching ML topics in your previous reading history." }
  ];

  // --- READERS SECTION STATE ---
  const [readBooks, setReadBooks] = useState([
    { id: 1, title: "Clean Code", author: "Robert C. Martin", dateCompleted: "2026-04-12", rating: 5, review: "Fantastic foundational text. Extremely practical clean programming workflows.", cover: "from-blue-600 to-indigo-600" },
    { id: 2, title: "Effective Java", author: "Joshua Bloch", dateCompleted: "2026-03-28", rating: 4, review: "A must-read for any OOP coder. Highly descriptive patterns.", cover: "from-amber-600 to-yellow-600" },
    { id: 3, title: "Compilers: Principles & Tools", author: "Aho & Ullman", dateCompleted: "2026-02-15", rating: 5, review: "The dragon book. Dense but irreplaceable for grammar parsing structures.", cover: "from-emerald-600 to-teal-600" }
  ]);

  const historyRecommendations = [
    { title: "Design Patterns", author: "Gang of Four", match: 97, reason: "Highly relevant to your 5-star rating on Clean Code." },
    { title: "Concurrency in Practice", author: "Brian Goetz", match: 93, reason: "Matches your 4-star checkout of Effective Java." },
    { title: "Vibe of Parsing Architectures", author: "Grune & Jacobs", match: 89, reason: "Historical compilation match based on Compiler Principles read." }
  ];

  // --- ANALYTICS SECTION STATE ---
  const totalBorrowedCount = 12; // Historical total books taken
  const totalReturnedCount = 9;  // Historical total books returned
  
  const [borrowedBooks, setBorrowedBooks] = useState([
    { id: 1, title: "Probabilistic ML", author: "Murphy", due: "2026-05-22", daysLeft: 2, status: "Due soon", cover: "from-amber-600 to-yellow-600", overdue: false },
    { id: 2, title: "Designing ML Systems", author: "Huyen", due: "2026-06-05", daysLeft: 16, status: "Active", cover: "from-blue-600 to-indigo-600", overdue: false },
    { id: 3, title: "The Pragmatic Programmer", author: "Thomas", due: "2026-06-12", daysLeft: 23, status: "Active", cover: "from-emerald-600 to-teal-600", overdue: false },
  ]);

  const [overdues, setOverdues] = useState([
    { id: 4, title: "Introduction to Algorithms", author: "Cormen", due: "2026-05-15", daysOverdue: 5, fine: 2.50, cover: "from-rose-600 to-pink-600" }
  ]);

  const [reservations, setReservations] = useState([
    { id: 1, title: "Clean Architecture", author: "Robert C. Martin", status: "Ready for Pickup", queuePosition: 0 },
    { id: 2, title: "Introduction to Algorithms", author: "Cormen", status: "Pending Approval", queuePosition: 3 },
  ]);

  const [notifications, setNotifications] = useState([
    { id: 1, text: "Your reservation for 'Designing Data-Intensive Applications' is approved!", unread: true },
    { id: 2, text: "Reminder: 'Probabilistic Machine Learning' is due in 2 days.", unread: true },
    { id: 3, text: "New journals matching 'Quantum Computing' added today.", unread: false }
  ]);

  // --- HANDLERS ---
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const handleRenew = (id: number) => {
    setBorrowedBooks(books => books.map(book => {
      if (book.id === id) {
        return {
          ...book,
          due: "2026-06-20",
          daysLeft: 31,
          status: "Renewed successfully"
        };
      }
      return book;
    }));
  };

  const handlePayFineAndReturn = (id: number) => {
    const matched = overdues.find(o => o.id === id);
    if (matched) {
      alert(`Paid $${matched.fine.toFixed(2)} fine! "${matched.title}" returned successfully.`);
      setOverdues(overdues.filter(o => o.id !== id));
    }
  };

  const handleRatingChange = (id: number, rate: number) => {
    setReadBooks(books => books.map(b => b.id === id ? { ...b, rating: rate } : b));
  };

  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
    }, 3000);
  };

  const handleCatalogRequest = (title: string, author: string, available: boolean) => {
    if (available) {
      alert(`Success! "${title}" is borrowed. It will appear in your Active Borrowings section.`);
      setBorrowedBooks([
        ...borrowedBooks,
        {
          id: Date.now(),
          title,
          author,
          due: "2026-06-20",
          daysLeft: 30,
          status: "Active",
          cover: "from-violet-600 to-purple-600",
          overdue: false
        }
      ]);
    } else {
      setReservations([
        ...reservations,
        {
          id: Date.now(),
          title,
          author,
          status: "Pending Approval",
          queuePosition: 2
        }
      ]);
      alert(`"${title}" is reserved! Checked out with Faculty priority queue status.`);
    }
  };

  const filteredCatalogBooks = catalogBooks.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          book.isbn.includes(searchQuery);
    const matchesCategory = catalogCategory === "All" || book.category === catalogCategory;
    return matchesSearch && matchesCategory;
  });

  let headerInfo = {
    title: `Welcome back, ${profileName.split(" ")[0]}`,
    subtitle: "Real-time view of your student workspace.",
    accent: "Personalized AI library hub"
  };

  if (activeTab === "catalog") {
    headerInfo = {
      title: "Library Catalog Database",
      subtitle: "Explore physical books, digital publications, and resource collections.",
      accent: "Discover new knowledge"
    };
  } else if (activeTab === "readers") {
    headerInfo = {
      title: "Continue exploring books",
      subtitle: "Review your reading history and personalized AI recommendations.",
      accent: "Your reading journey"
    };
  } else if (activeTab === "analytics") {
    headerInfo = {
      title: `Hey ${profileName.split(" ")[0]}, check your analytics`,
      subtitle: "Track your reading habits, borrowings, and overdue metrics.",
      accent: "Data-driven insights"
    };
  } else if (activeTab === "settings") {
    headerInfo = {
      title: "Account Settings",
      subtitle: "Manage your profile, preferences, and security.",
      accent: "Customize your experience"
    };
  }

  return (
    <DashboardShell 
      title={headerInfo.title}
      subtitle={headerInfo.subtitle}
      role="Student" 
      accent={headerInfo.accent}
      activeTab={activeTab}
      onTabChange={(tab) => setActiveTab(tab)}
    >
      <AnimatePresence mode="wait">
        
        {/* VIEW 1: OVERVIEW TAB */}
        {activeTab === "overview" && (
          <motion.div 
            key="overview"
            initial={{ opacity: 0, y: 5 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: -5 }}
            className="space-y-6"
          >
            {/* Due Date Alert Section (Glowing banner if any books are due soon) */}
            {borrowedBooks.some(b => b.daysLeft <= 2 && b.status !== "Renewed successfully") && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }} 
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-amber-500/30 bg-amber-500/10 p-4 shadow-glow"
              >
                <div className="flex items-center gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-xl bg-amber-500/20 text-amber-300">
                    <AlertCircle className="h-5 w-5 animate-pulse" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-amber-200">Urgent Borrowing Alert</div>
                    <p className="text-xs text-amber-300/80">"Probabilistic ML" is due in 2 days. Renew it now to avoid overdue fines!</p>
                  </div>
                </div>
                <button 
                  onClick={() => handleRenew(1)}
                  className="rounded-xl bg-amber-500 px-4 py-2 text-xs font-semibold text-black transition hover:bg-amber-400"
                >
                  Quick Renew
                </button>
              </motion.div>
            )}

            {/* Metrics */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <StatCard label="Borrowed books" value={borrowedBooks.length.toString()} delta="2 active loans" icon={BookOpen} />
              <StatCard label="Active reservations" value={reservations.length.toString()} icon={Bookmark} />
              <StatCard label="Overdue fines" value={`$${overdues.reduce((acc, curr) => acc + curr.fine, 0).toFixed(2)}`} delta={overdues.length > 0 ? `${overdues.length} book overdue` : "On time"} icon={Clock} />
              <StatCard label="AI Match Score" value="98%" delta="For recommendation quality" icon={Sparkles} />
            </div>

            {/* Overview body */}
            <div className="grid gap-6 lg:grid-cols-3">
              
              <div className="space-y-6 lg:col-span-2">
                {/* Search */}
                <div className="rounded-2xl glass p-5 shadow-sm">
                  <h2 className="flex items-center gap-2 font-display text-lg font-semibold text-foreground">
                    <Search className="h-4 w-4 text-neon" /> Smart Search
                  </h2>
                  <p className="mt-1 text-xs text-muted-foreground">Find books, journals, and digital assets instantly with AI autocomplete</p>
                  
                  <div className="mt-4 flex gap-2">
                    <div className="flex flex-1 items-center gap-2 rounded-xl bg-white/5 px-3 py-2 border border-white/5 focus-within:border-neon/30 transition">
                      <Search className="h-4 w-4 text-muted-foreground" />
                      <input 
                        type="text" 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search by title, author, key term, or publisher..." 
                        className="w-full bg-transparent text-sm outline-none text-foreground placeholder:text-muted-foreground/50" 
                      />
                    </div>
                    <button 
                      onClick={() => setActiveTab("catalog")}
                      className="rounded-xl bg-neon-gradient px-4 py-2 text-xs font-semibold text-neon-foreground hover:shadow-glow transition"
                    >
                      Search
                    </button>
                  </div>
                </div>

                {/* AI Recommendations */}
                <div className="rounded-2xl glass p-5 shadow-sm">
                  <h2 className="flex items-center gap-2 font-display text-lg font-semibold text-foreground">
                    <Sparkles className="h-4 w-4 text-neon animate-pulse" /> AI Personalized Recommendations
                  </h2>
                  <p className="mt-1 text-xs text-muted-foreground">Tailored matches based on your curriculum, research, and borrowing patterns</p>

                  <div className="mt-4 grid gap-3 sm:grid-cols-3">
                    {[
                      { title: "Probabilistic ML", author: "Murphy", match: 98, color: "from-amber-600 to-yellow-600" },
                      { title: "Designing ML Systems", author: "Huyen", match: 95, color: "from-indigo-600 to-purple-600" },
                      { title: "Deep Learning Book", author: "Goodfellow", match: 94, color: "from-rose-600 to-pink-600" },
                    ].map((book) => (
                      <div key={book.title} className="group relative overflow-hidden rounded-xl bg-white/5 border border-white/5 p-3 hover:border-neon/30 transition">
                        <div className={`mb-3 h-28 rounded-lg bg-gradient-to-br ${book.color} opacity-80 group-hover:scale-102 transition duration-300 flex items-end p-2`} />
                        <div className="text-xs font-semibold text-foreground truncate">{book.title}</div>
                        <div className="text-[10px] text-muted-foreground truncate">{book.author}</div>
                        <div className="mt-1.5 flex items-center justify-between text-[11px]">
                          <span className="text-neon font-medium">{book.match}% match</span>
                          <button 
                            onClick={() => handleCatalogRequest(book.title, book.author, true)}
                            className="text-muted-foreground hover:text-foreground hover:underline text-[10px]"
                          >
                            Quick Borrow
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Active Borrowings & Reservations */}
                <div className="rounded-2xl glass p-5 shadow-sm">
                  <h2 className="flex items-center gap-2 font-display text-lg font-semibold text-foreground">
                    <BookOpen className="h-4 w-4 text-neon" /> My Active Books
                  </h2>
                  <p className="mt-1 text-xs text-muted-foreground">Manage your current physical checkouts and priority hold requests</p>
                  
                  <div className="mt-6 grid gap-6 md:grid-cols-2">
                    {/* Borrowings Column */}
                    <div>
                      <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5 text-neon" /> Active Borrowings ({borrowedBooks.length})
                      </h3>
                      
                      <div className="space-y-3">
                        {borrowedBooks.map((book) => (
                          <div key={book.id} className="flex items-center justify-between gap-3 p-3 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 transition">
                            <div className="flex items-center gap-2.5 min-w-0">
                              <div className={`h-11 w-8 rounded bg-gradient-to-br ${book.cover} shrink-0 shadow-sm`} />
                              <div className="min-w-0">
                                <div className="text-xs font-bold text-foreground truncate">{book.title}</div>
                                <div className="text-[10px] text-muted-foreground truncate">by {book.author}</div>
                                <div className="mt-1 text-[9px] text-muted-foreground">Due: {book.due}</div>
                              </div>
                            </div>
                            
                            <div className="flex flex-col items-end gap-1.5 shrink-0">
                              <span className={`rounded-full px-2 py-0.5 text-[9px] font-semibold ${book.daysLeft <= 2 && book.status !== "Renewed successfully" ? "bg-amber-500/10 text-amber-300 border border-amber-500/20" : "bg-neon/10 text-neon border border-neon/20"}`}>
                                {book.daysLeft <= 2 && book.status !== "Renewed successfully" ? "Due soon" : `${book.daysLeft}d left`}
                              </span>
                              <button 
                                onClick={() => handleRenew(book.id)}
                                className="text-[10px] text-neon hover:underline cursor-pointer"
                              >
                                Renew
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Reservations Column */}
                    <div>
                      <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-1.5">
                        <Bookmark className="h-3.5 w-3.5 text-neon" /> Hold Reservations ({reservations.length})
                      </h3>
                      
                      <div className="space-y-3">
                        {reservations.map((res) => (
                          <div key={res.id} className="flex items-center justify-between gap-3 p-3 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 transition">
                            <div className="min-w-0">
                              <div className="text-xs font-bold text-foreground truncate">{res.title}</div>
                              <div className="text-[10px] text-muted-foreground truncate">by {res.author}</div>
                              <div className="mt-1 text-[9px] text-muted-foreground">Queue Position: #{res.queuePosition}</div>
                            </div>
                            
                            <span className={`shrink-0 rounded-full px-2 py-0.5 text-[9px] font-semibold ${res.status === "Ready for Pickup" ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "bg-blue-500/10 text-blue-400 border border-blue-500/20 animate-pulse"}`}>
                              {res.status}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Notifications */}
                <div className="rounded-2xl glass p-5 shadow-sm">
                  <div className="flex items-center justify-between">
                    <h2 className="flex items-center gap-2 font-display text-base font-semibold text-foreground">
                      <Bell className="h-4 w-4 text-neon" /> Notification Center
                    </h2>
                    <button onClick={() => setNotifications(prev => prev.map(n => ({ ...n, unread: false })))} className="text-[10px] text-neon hover:underline">Mark all read</button>
                  </div>
                  
                  <div className="mt-4 space-y-2">
                    {notifications.map(n => (
                      <div key={n.id} className={`p-3 rounded-xl text-xs border transition ${n.unread ? "border-neon/20 bg-neon/5" : "border-white/5 bg-white/5"}`}>
                        <div className="flex items-start gap-2">
                          {n.unread && <span className="h-1.5 w-1.5 rounded-full bg-neon shrink-0 mt-1" />}
                          <span className="text-foreground">{n.text}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </motion.div>
        )}

        {/* VIEW 2: CATALOG TAB */}
        {activeTab === "catalog" && (
          <motion.div 
            key="catalog"
            initial={{ opacity: 0, y: 5 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: -5 }}
            className="space-y-6"
          >
            {/* Search and filter options */}
            <div className="rounded-2xl glass p-5 shadow-sm">
              <h2 className="font-display text-lg font-semibold text-foreground flex items-center gap-2">
                <Library className="h-4 w-4 text-neon" /> Library Catalog Database
              </h2>
              <p className="text-xs text-muted-foreground mt-0.5">Explore physical books, digital publications, and resource collections</p>
              
              <div className="mt-4 flex flex-wrap gap-3">
                {/* Search query */}
                <div className="flex flex-1 min-w-[240px] items-center gap-2 rounded-xl bg-white/5 px-3 py-2.5 border border-white/5 focus-within:border-neon/30 transition">
                  <Search className="h-4 w-4 text-muted-foreground" />
                  <input 
                    type="text" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by Title, Author, or ISBN..." 
                    className="w-full bg-transparent text-sm outline-none text-foreground placeholder:text-muted-foreground/60"
                  />
                </div>
                
                {/* Category selectors */}
                <div className="flex items-center gap-1.5 bg-white/5 p-1 rounded-xl border border-white/5 text-xs">
                  {["All", "Computer Science", "Mathematics", "Systems Engineering", "Software Engineering"].map(cat => (
                    <button
                      key={cat}
                      onClick={() => setCatalogCategory(cat)}
                      className={`rounded-lg px-3 py-1.5 transition ${catalogCategory === cat ? "bg-neon-gradient text-neon-foreground" : "text-muted-foreground hover:text-foreground"}`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Books listing */}
            <div className="rounded-2xl glass p-5 shadow-sm">
              <h3 className="text-sm font-semibold text-foreground mb-3">Available Catalog Books</h3>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {filteredCatalogBooks.map((book) => (
                  <div key={book.isbn} className="rounded-xl border border-white/5 bg-white/5 p-4 flex flex-col justify-between hover:border-neon/20 transition">
                    <div>
                      <div className="flex items-center justify-between text-[10px] text-muted-foreground">
                        <span className="font-mono">{book.isbn}</span>
                        <span className="font-medium bg-white/5 px-1.5 py-0.5 rounded">{book.category}</span>
                      </div>
                      <h4 className="text-sm font-bold text-foreground mt-2 line-clamp-1">{book.title}</h4>
                      <p className="text-xs text-muted-foreground mt-0.5">by {book.author}</p>
                      <div className="text-[11px] text-muted-foreground mt-1">Publisher: {book.publisher}</div>
                    </div>
                    
                    <div className="mt-4 flex items-center justify-between border-t border-white/5 pt-3">
                      <span className={`text-xs font-semibold ${book.available ? "text-emerald-400" : "text-amber-400"}`}>
                        {book.available ? "Available" : "Checked Out"}
                      </span>
                      <button 
                        onClick={() => handleCatalogRequest(book.title, book.author, book.available)}
                        className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${book.available ? "bg-neon-gradient text-neon-foreground hover:shadow-glow" : "bg-white/5 border border-white/10 hover:border-neon text-neon"}`}
                      >
                        {book.available ? "Borrow" : "Reserve"}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommended Books after list */}
            <div className="rounded-2xl glass p-5 shadow-sm border border-neon/10">
              <h2 className="flex items-center gap-2 font-display text-lg font-semibold text-foreground">
                <Sparkles className="h-4 w-4 text-neon animate-pulse" /> AI Recommended Books
              </h2>
              <p className="text-xs text-muted-foreground mt-0.5">Lumi AI recommendation models tailored directly to your curriculum</p>

              <div className="mt-4 grid gap-4 sm:grid-cols-3">
                {recommendedCatalog.map((rec) => (
                  <div key={rec.title} className="rounded-xl border border-white/5 bg-white/5 p-4 flex flex-col justify-between hover:border-neon/30 transition">
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-neon">{rec.match}% AI Match</span>
                        <Star className="h-3.5 w-3.5 text-neon fill-neon" />
                      </div>
                      <h4 className="text-sm font-semibold text-foreground mt-2">{rec.title}</h4>
                      <p className="text-xs text-muted-foreground mt-0.5">by {rec.author}</p>
                      <p className="text-[11px] text-muted-foreground mt-2 leading-relaxed bg-white/5 p-2 rounded">{rec.desc}</p>
                    </div>
                    <button 
                      onClick={() => handleCatalogRequest(rec.title, rec.author, true)}
                      className="mt-4 w-full rounded-lg bg-white/5 border border-white/10 hover:border-neon hover:text-neon py-2 text-xs font-semibold transition"
                    >
                      Request Borrow
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* VIEW 3: READERS TAB */}
        {activeTab === "readers" && (
          <motion.div 
            key="readers"
            initial={{ opacity: 0, y: 5 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: -5 }}
            className="space-y-6"
          >
            {/* Previously read books list */}
            <div className="rounded-2xl glass p-5 shadow-sm">
              <h2 className="font-display text-lg font-semibold text-foreground flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-neon" /> My Reading History
              </h2>
              <p className="text-xs text-muted-foreground mt-0.5">Audit files, catalog releases, and literature you completed in the past</p>

              <div className="mt-4 space-y-3">
                {readBooks.map((book) => (
                  <div key={book.id} className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl border border-white/5 bg-white/5">
                    <div className="flex items-center gap-4">
                      <div className={`h-16 w-12 rounded bg-gradient-to-br ${book.cover} shrink-0`} />
                      <div>
                        <h4 className="text-sm font-bold text-foreground">{book.title}</h4>
                        <p className="text-xs text-muted-foreground">by {book.author}</p>
                        <p className="text-[10px] text-muted-foreground mt-1">Completed: {book.dateCompleted}</p>
                        <p className="text-xs text-foreground bg-white/5 p-2 rounded mt-2 max-w-xl">"{book.review}"</p>
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-2 shrink-0">
                      <div className="text-[10px] text-muted-foreground">My Rating</div>
                      <div className="flex gap-0.5">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button 
                            key={star} 
                            onClick={() => handleRatingChange(book.id, star)}
                            className="transition"
                          >
                            <Star className={`h-4 w-4 ${star <= book.rating ? "text-neon fill-neon" : "text-white/20"}`} />
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Reading history recommendations */}
            <div className="rounded-2xl glass p-5 shadow-sm border border-neon/10">
              <h2 className="flex items-center gap-2 font-display text-lg font-semibold text-foreground">
                <Sparkles className="h-4 w-4 text-neon animate-pulse" /> Recommendations Based On Reading History
              </h2>
              <p className="text-xs text-muted-foreground mt-0.5">AI targeted predictions matching your ratings and search queries</p>

              <div className="mt-4 grid gap-4 sm:grid-cols-3">
                {historyRecommendations.map((rec) => (
                  <div key={rec.title} className="rounded-xl border border-white/5 bg-white/5 p-4 flex flex-col justify-between hover:border-neon/30 transition">
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold text-neon bg-neon/10 px-2 py-0.5 rounded">{rec.match}% Match</span>
                        <Star className="h-3.5 w-3.5 text-neon fill-neon" />
                      </div>
                      <h4 className="text-sm font-semibold text-foreground mt-2.5">{rec.title}</h4>
                      <p className="text-xs text-muted-foreground mt-0.5">by {rec.author}</p>
                      <div className="text-xs text-muted-foreground/80 mt-3 leading-relaxed border-t border-white/5 pt-2">
                        <span className="font-semibold text-foreground">Lumi Match: </span>{rec.reason}
                      </div>
                    </div>
                    <button 
                      onClick={() => handleCatalogRequest(rec.title, rec.author, true)}
                      className="mt-4 w-full rounded-lg bg-neon-gradient py-2 text-xs font-bold text-neon-foreground hover:shadow-glow transition"
                    >
                      Instant Request
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* VIEW 4: ANALYTICS TAB */}
        {activeTab === "analytics" && (
          <motion.div 
            key="analytics"
            initial={{ opacity: 0, y: 5 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: -5 }}
            className="space-y-6"
          >
            {/* Taken and returned metrics */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <StatCard label="Total books taken" value={totalBorrowedCount.toString()} delta="Total checkouts" icon={BookOpen} />
              <StatCard label="Total books returned" value={totalReturnedCount.toString()} delta="9 return logs" icon={CheckCircle2} />
              <StatCard label="Active overdues" value={overdues.length.toString()} delta="Requires immediate check-in" icon={AlertCircle} />
              <StatCard label="Total unpaid fines" value={`$${overdues.reduce((acc, curr) => acc + curr.fine, 0).toFixed(2)}`} delta="Calculated on overdues" icon={Clock} />
            </div>

            {/* Details of overdue books */}
            <div className="rounded-2xl glass p-5 shadow-sm border border-rose-500/20">
              <h2 className="font-display text-lg font-semibold text-foreground flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-rose-400" /> Overdue Book Actions
              </h2>
              <p className="text-xs text-muted-foreground mt-0.5">Displaying overdue materials currently accumulating daily penalty rates</p>

              <div className="mt-4 space-y-3">
                {overdues.length === 0 ? (
                  <div className="text-center py-8 text-xs text-muted-foreground font-semibold flex flex-col items-center gap-2">
                    <CheckCircle2 className="h-6 w-6 text-emerald-400" />
                    No overdue books! All items returned on time.
                  </div>
                ) : (
                  overdues.map((book) => (
                    <div key={book.id} className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl border border-rose-500/10 bg-rose-500/5">
                      <div className="flex items-center gap-3">
                        <div className={`h-14 w-10 rounded bg-gradient-to-br ${book.cover} shrink-0`} />
                        <div>
                          <h4 className="text-sm font-bold text-rose-200">{book.title}</h4>
                          <p className="text-xs text-muted-foreground">by {book.author}</p>
                          <div className="flex items-center gap-3 text-[10px] text-rose-300 mt-1">
                            <span>Due Date: {book.due}</span>
                            <span>({book.daysOverdue} days overdue)</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 shrink-0">
                        <div className="text-right">
                          <div className="text-[10px] text-rose-300">Accumulated penalty</div>
                          <div className="text-base font-bold text-rose-200">${book.fine.toFixed(2)}</div>
                        </div>
                        <button 
                          onClick={() => handlePayFineAndReturn(book.id)}
                          className="rounded-lg bg-rose-500 hover:bg-rose-400 px-3.5 py-2 text-xs font-semibold text-black transition"
                        >
                          Pay Fine & Return
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Reading sequence log */}
            <div className="rounded-2xl glass p-5 shadow-sm">
              <h2 className="font-display text-lg font-semibold text-foreground flex items-center gap-2">
                <Clock className="h-4 w-4 text-neon" /> Reading Check-Out Logs
              </h2>
              <p className="text-xs text-muted-foreground mt-0.5">Chronological record of recent books borrowed, returned, or renewed</p>

              <div className="mt-4 space-y-2 text-xs">
                {[
                  { title: "Probabilistic ML", action: "Borrowed Book", time: "2 days ago", active: true },
                  { title: "Introduction to Algorithms", action: "Overdue Status Triggered", time: "5 days ago", warning: true },
                  { title: "Clean Code", action: "Returned Book (Cleared)", time: "1 month ago", cleared: true },
                  { title: "Effective Java", action: "Returned Book (Cleared)", time: "2 months ago", cleared: true },
                ].map((log, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/5">
                    <div>
                      <span className="font-semibold text-foreground">{log.title}</span>
                      <span className={`ml-2 text-[10px] px-2 py-0.5 rounded font-medium ${log.warning ? "bg-rose-500/10 text-rose-300" : log.cleared ? "bg-emerald-500/10 text-emerald-300" : "bg-blue-500/10 text-blue-300"}`}>
                        {log.action}
                      </span>
                    </div>
                    <span className="text-[10px] text-muted-foreground font-mono shrink-0">{log.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* VIEW 5: SETTINGS TAB */}
        {activeTab === "settings" && (
          <motion.div 
            key="settings"
            initial={{ opacity: 0, y: 5 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: -5 }}
            className="space-y-6"
          >
            {/* Account Settings profile form */}
            <div className="rounded-2xl glass p-5 shadow-sm max-w-2xl">
              <h2 className="font-display text-lg font-semibold text-foreground flex items-center gap-2">
                <User className="h-5 w-5 text-neon" /> Account Profile Settings
              </h2>
              <p className="text-xs text-muted-foreground mt-0.5">Update your institutional identity, contact email, and active security keys</p>

              {saveSuccess && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }} 
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 flex items-center gap-2 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-xs text-emerald-300"
                >
                  <Check className="h-4 w-4" /> Profile details saved and updated successfully!
                </motion.div>
              )}

              <form onSubmit={handleProfileSave} className="mt-6 space-y-4 text-xs">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block font-semibold text-muted-foreground mb-1.5">Full Name</label>
                    <div className="flex items-center gap-2 rounded-xl bg-white/5 border border-white/5 px-3 py-2 focus-within:border-neon/30 transition">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <input 
                        type="text" 
                        value={profileName}
                        onChange={(e) => setProfileName(e.target.value)}
                        placeholder="Alex Carter"
                        className="w-full bg-transparent text-sm outline-none text-foreground"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold text-muted-foreground mb-1.5">Student ID</label>
                    <div className="flex items-center gap-2 rounded-xl bg-white/5 border border-white/5 px-3 py-2 focus-within:border-neon/30 transition">
                      <Shield className="h-4 w-4 text-muted-foreground" />
                      <input 
                        type="text" 
                        value={profileId}
                        onChange={(e) => setProfileId(e.target.value)}
                        placeholder="STU-2027-001"
                        className="w-full bg-transparent text-sm outline-none text-foreground font-mono"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block font-semibold text-muted-foreground mb-1.5">Department</label>
                    <div className="flex items-center gap-2 rounded-xl bg-white/5 border border-white/5 px-3 py-2 focus-within:border-neon/30 transition">
                      <Bookmark className="h-4 w-4 text-muted-foreground" />
                      <input 
                        type="text" 
                        value={profileDept}
                        onChange={(e) => setProfileDept(e.target.value)}
                        placeholder="Computer Science"
                        className="w-full bg-transparent text-sm outline-none text-foreground"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold text-muted-foreground mb-1.5">Email Address</label>
                    <div className="flex items-center gap-2 rounded-xl bg-white/5 border border-white/5 px-3 py-2 focus-within:border-neon/30 transition">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <input 
                        type="email" 
                        value={profileEmail}
                        onChange={(e) => setProfileEmail(e.target.value)}
                        placeholder="alex@university.edu"
                        className="w-full bg-transparent text-sm outline-none text-foreground"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-muted-foreground mb-1.5">Password</label>
                  <div className="flex items-center gap-2 rounded-xl bg-white/5 border border-white/5 px-3 py-2 focus-within:border-neon/30 transition">
                    <Shield className="h-4 w-4 text-muted-foreground" />
                    <input 
                      type="password" 
                      value={profilePwd}
                      onChange={(e) => setProfilePwd(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-transparent text-sm outline-none text-foreground"
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  <button 
                    type="submit" 
                    className="rounded-xl bg-neon-gradient px-5 py-2.5 text-xs font-bold text-neon-foreground hover:shadow-glow transition"
                  >
                    Save Profile Updates
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        )}

      </AnimatePresence>
    </DashboardShell>
  );
}
