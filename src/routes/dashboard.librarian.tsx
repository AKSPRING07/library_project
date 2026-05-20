import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { 
  BookOpen, Repeat, Clock, Sparkles, Plus, Trash2, CheckCircle2, XCircle, AlertTriangle, 
  TrendingUp, Users, BookMarked, Search, BarChart3, Database, FileText, Bell 
} from "lucide-react";
import { DashboardShell, StatCard } from "@/components/dashboard-shell";
import { motion, AnimatePresence } from "framer-motion";

export const Route = createFileRoute("/dashboard/librarian")({
  component: LibrarianDashboard,
  head: () => ({ meta: [{ title: "Librarian Control Center — Lumina" }] }),
});

function LibrarianDashboard() {
  const [activeTab, setActiveTab] = useState<"circulation" | "inventory" | "fines" | "analytics">("circulation");

  // --- INVENTORY MANAGEMENT STATE ---
  const [books, setBooks] = useState([
    { isbn: "978-0134685991", title: "Effective Java", author: "Joshua Bloch", category: "Computer Science", quantity: 5, location: "Aisle A, Shelf 3" },
    { isbn: "978-0132350884", title: "Clean Code", author: "Robert C. Martin", category: "Software Engineering", quantity: 3, location: "Aisle B, Shelf 2" },
    { isbn: "978-0262033848", title: "Introduction to Algorithms", author: "Thomas H. Cormen", category: "Mathematics", quantity: 2, location: "Aisle A, Shelf 5" },
    { isbn: "978-0596520687", title: "Designing Data-Intensive Applications", author: "Martin Kleppmann", category: "Systems Engineering", quantity: 4, location: "Aisle C, Shelf 1" },
  ]);
  const [newTitle, setNewTitle] = useState("");
  const [newAuthor, setNewAuthor] = useState("");
  const [newIsbn, setNewIsbn] = useState("");
  const [newCategory, setNewCategory] = useState("Computer Science");
  const [newQuantity, setNewQuantity] = useState(1);
  const [newLocation, setNewLocation] = useState("Aisle A, Shelf 1");
  const [searchQuery, setSearchQuery] = useState("");

  // --- CIRCULATION STATE ---
  const [issueIsbn, setIssueIsbn] = useState("");
  const [issueUserId, setIssueUserId] = useState("");
  const [circulationLogs, setCirculationLogs] = useState([
    { id: 1, type: "Issue", title: "Designing Data-Intensive Applications", user: "STU-2027-001 (Alex)", time: "10 mins ago", status: "Active" },
    { id: 2, type: "Return", title: "Effective Java", user: "STU-2027-042 (Sarah)", time: "1 hour ago", status: "Success" },
    { id: 3, type: "Issue", title: "Clean Code", user: "STU-2027-001 (Alex)", time: "Yesterday", status: "Active" },
  ]);

  // --- RESERVATION MANAGEMENT STATE ---
  const [reservations, setReservations] = useState([
    { id: 101, title: "Clean Code", user: "Alex Carter (STU-2027-001)", date: "2026-05-19", queue: 1 },
    { id: 102, title: "Introduction to Algorithms", user: "Dr. Evelyn Ross (FAC-9082)", date: "2026-05-20", queue: 2 },
  ]);

  // --- FINE TRACKING STATE ---
  const [fines, setFines] = useState([
    { id: 1, user: "STU-2027-014 (Jack Vance)", title: "Deep Learning Book", daysOverdue: 8, fineAmount: 16.00, status: "Unpaid" },
    { id: 2, user: "STU-2027-089 (Ethel Miller)", title: "The Pragmatic Programmer", daysOverdue: 3, fineAmount: 6.00, status: "Unpaid" },
  ]);

  // --- JOURNAL MANAGEMENT STATE ---
  const [journals, setJournals] = useState([
    { id: 1, title: "IEEE Transactions on Pattern Analysis", dbName: "IEEE Xplore", status: "Subscribed" },
    { id: 2, title: "ACM Computing Surveys", dbName: "ACM Digital Library", status: "Subscribed" },
    { id: 3, title: "Nature Quantum Engineering", dbName: "Nature Research", status: "Reviewing Extension" },
  ]);

  // --- HANDLERS ---
  const handleAddBook = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newAuthor.trim() || !newIsbn.trim()) {
      alert("Please fill in Book Title, Author and ISBN.");
      return;
    }
    const book = {
      isbn: newIsbn,
      title: newTitle,
      author: newAuthor,
      category: newCategory,
      quantity: newQuantity,
      location: newLocation,
    };
    setBooks([book, ...books]);
    // reset form
    setNewTitle("");
    setNewAuthor("");
    setNewIsbn("");
    setNewQuantity(1);
    alert(`"${newTitle}" added to inventory successfully!`);
  };

  const handleDeleteBook = (isbn: string) => {
    if (confirm("Are you sure you want to remove this book from catalog?")) {
      setBooks(books.filter(b => b.isbn !== isbn));
    }
  };

  const handleIssueBook = (e: React.FormEvent) => {
    e.preventDefault();
    if (!issueIsbn || !issueUserId) {
      alert("Please input both ISBN and Student/Staff ID.");
      return;
    }
    const matchedBook = books.find(b => b.isbn === issueIsbn || b.title.toLowerCase().includes(issueIsbn.toLowerCase()));
    if (!matchedBook) {
      alert("Book not found in inventory.");
      return;
    }
    
    const newLog = {
      id: Date.now(),
      type: "Issue",
      title: matchedBook.title,
      user: issueUserId,
      time: "Just now",
      status: "Active"
    };

    setCirculationLogs([newLog, ...circulationLogs]);
    setIssueIsbn("");
    setIssueUserId("");
    alert(`Successfully issued "${matchedBook.title}" to ${issueUserId}!`);
  };

  const handleReturnBook = (logId: number) => {
    setCirculationLogs(logs => logs.map(log => {
      if (log.id === logId) {
        return { ...log, type: "Return", status: "Success", time: "Just now" };
      }
      return log;
    }));
    alert("Return processed successfully!");
  };

  const handleApproveReservation = (id: number) => {
    const res = reservations.find(r => r.id === id);
    if (res) {
      const newLog = {
        id: Date.now(),
        type: "Issue",
        title: res.title,
        user: res.user,
        time: "Just now",
        status: "Active"
      };
      setCirculationLogs([newLog, ...circulationLogs]);
      setReservations(reservations.filter(r => r.id !== id));
      alert(`Approved and issued "${res.title}" to ${res.user}!`);
    }
  };

  const handleDeclineReservation = (id: number) => {
    setReservations(reservations.filter(r => r.id !== id));
    alert("Reservation declined.");
  };

  const handleCollectFine = (id: number) => {
    setFines(fines.map(f => {
      if (f.id === id) return { ...f, status: "Paid", fineAmount: 0 };
      return f;
    }));
    alert("Fine payment collected successfully.");
  };

  const handleWaiveFine = (id: number) => {
    setFines(fines.filter(f => f.id !== id));
    alert("Fine waived successfully.");
  };

  const filteredBooks = books.filter(b => 
    b.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    b.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.isbn.includes(searchQuery)
  );

  return (
    <DashboardShell title="Librarian Desk" role="Librarian" accent="Smart operations & inventory control">
      
      {/* Metrics Banner */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Loans processed today" value="1,248" delta="+2.5% vs yesterday" icon={Repeat} />
        <StatCard label="Overdue books" value={fines.filter(f => f.status === "Unpaid").length.toString()} delta="Requiring reminder alerts" icon={Clock} />
        <StatCard label="Pending reservations" value={reservations.length.toString()} delta="Awaiting desk approval" icon={BookMarked} />
        <StatCard label="Total catalog books" value={books.reduce((acc, curr) => acc + curr.quantity, 0).toString()} delta="Items indexed" icon={BookOpen} />
      </div>

      {/* Main Tabs Navigation */}
      <div className="mt-6 flex border-b border-white/5 text-sm gap-2">
        {[
          { id: "circulation", label: "Circulation Desk", icon: Repeat },
          { id: "inventory", label: "Inventory Management", icon: Database },
          { id: "fines", label: "Fines & Overdues", icon: Clock },
          { id: "analytics", label: "Monitoring & Analytics", icon: BarChart3 }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-2 px-4 py-3 border-b-2 font-medium transition ${activeTab === tab.id ? "border-neon text-neon" : "border-transparent text-muted-foreground hover:text-foreground"}`}
          >
            <tab.icon className="h-4 w-4" /> {tab.label}
          </button>
        ))}
      </div>

      {/* TAB CONTENT COMPONENT DISPLAY */}
      <div className="mt-6">
        <AnimatePresence mode="wait">
          
          {/* TAB 1: CIRCULATION DESK (Issue/Return & Reservations) */}
          {activeTab === "circulation" && (
            <motion.div 
              key="circulation"
              initial={{ opacity: 0, y: 6 }} 
              animate={{ opacity: 1, y: 0 }} 
              exit={{ opacity: 0, y: -6 }}
              className="grid gap-6 lg:grid-cols-3"
            >
              <div className="lg:col-span-2 space-y-6">
                
                {/* Quick Issue / Return Form Panel */}
                <div className="rounded-2xl glass p-5 shadow-sm">
                  <h2 className="flex items-center gap-2 font-display text-lg font-semibold text-foreground">
                    <Repeat className="h-4 w-4 text-neon" /> Book Issue / Return Panel
                  </h2>
                  <p className="text-xs text-muted-foreground mt-0.5">Quickly issue inventory stock to active student or faculty accounts</p>
                  
                  <form onSubmit={handleIssueBook} className="mt-4 grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-xs font-semibold text-muted-foreground mb-1.5">Book ISBN or Title</label>
                      <input 
                        type="text" 
                        value={issueIsbn}
                        onChange={(e) => setIssueIsbn(e.target.value)}
                        placeholder="e.g. 978-0132350884 or Clean Code" 
                        className="w-full rounded-xl bg-white/5 px-3 py-2.5 text-sm border border-white/5 outline-none focus:border-neon/30 text-foreground"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-muted-foreground mb-1.5">Borrower ID (Student or Staff)</label>
                      <input 
                        type="text" 
                        value={issueUserId}
                        onChange={(e) => setIssueUserId(e.target.value)}
                        placeholder="e.g. STU-2027-001 or FAC-9082" 
                        className="w-full rounded-xl bg-white/5 px-3 py-2.5 text-sm border border-white/5 outline-none focus:border-neon/30 text-foreground"
                      />
                    </div>
                    <div className="sm:col-span-2 flex justify-end gap-2">
                      <button type="submit" className="rounded-xl bg-neon-gradient px-4 py-2 text-xs font-semibold text-neon-foreground hover:shadow-glow transition">
                        Issue Book
                      </button>
                    </div>
                  </form>
                </div>

                {/* Circulation logs & active check-outs */}
                <div className="rounded-2xl glass p-5 shadow-sm">
                  <h2 className="font-display text-lg font-semibold text-foreground flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-neon" /> Real-Time Circulation Log
                  </h2>
                  <p className="text-xs text-muted-foreground mt-0.5">Monitor instant checkouts, check-ins, and return pipelines</p>
                  
                  <div className="mt-4 space-y-2">
                    {circulationLogs.map((log) => (
                      <div key={log.id} className="flex items-center justify-between rounded-xl bg-white/5 p-3.5 border border-white/5 hover:bg-white/10 transition">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className={`text-[10px] font-semibold px-2 py-0.5 rounded ${log.type === "Issue" ? "bg-blue-500/20 text-blue-300" : "bg-emerald-500/20 text-emerald-300"}`}>
                              {log.type}
                            </span>
                            <span className="text-sm font-semibold text-foreground">{log.title}</span>
                          </div>
                          <div className="text-xs text-muted-foreground mt-1">Borrower: {log.user} · {log.time}</div>
                        </div>
                        <div>
                          {log.type === "Issue" && log.status === "Active" ? (
                            <button 
                              onClick={() => handleReturnBook(log.id)}
                              className="rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 px-3 py-1.5 text-xs font-semibold hover:bg-emerald-500 hover:text-black transition"
                            >
                              Check-In / Return
                            </button>
                          ) : (
                            <span className="text-xs text-emerald-400 font-medium flex items-center gap-1">
                              <CheckCircle2 className="h-3 w-3" /> Returned
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Awaiting Reservations column */}
              <div className="rounded-2xl glass p-5 shadow-sm h-fit">
                <h2 className="font-display text-lg font-semibold text-foreground flex items-center gap-2">
                  <BookMarked className="h-4 w-4 text-neon" /> Reservation Management
                </h2>
                <p className="text-xs text-muted-foreground mt-0.5">Approve requests for queued or reserved assets</p>
                
                <div className="mt-4 space-y-3">
                  {reservations.length === 0 ? (
                    <div className="text-center py-8 text-xs text-muted-foreground">No pending reservations.</div>
                  ) : (
                    reservations.map((res) => (
                      <div key={res.id} className="rounded-xl border border-white/5 bg-white/5 p-3 space-y-3">
                        <div>
                          <div className="text-sm font-semibold text-foreground">{res.title}</div>
                          <div className="text-[11px] text-muted-foreground mt-0.5">{res.user}</div>
                          <div className="text-[10px] text-muted-foreground mt-1">Requested: {res.date} (Queue Rank: {res.queue})</div>
                        </div>
                        <div className="flex gap-2">
                          <button 
                            onClick={() => handleApproveReservation(res.id)}
                            className="flex-1 rounded-lg bg-neon-gradient py-1.5 text-xs font-bold text-neon-foreground flex items-center justify-center gap-1 hover:shadow-glow transition"
                          >
                            <CheckCircle2 className="h-3.5 w-3.5" /> Approve
                          </button>
                          <button 
                            onClick={() => handleDeclineReservation(res.id)}
                            className="rounded-lg bg-white/5 border border-white/10 px-3 py-1.5 text-xs text-muted-foreground hover:bg-white/10 transition"
                          >
                            Decline
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 2: INVENTORY & JOURNAL MANAGEMENT */}
          {activeTab === "inventory" && (
            <motion.div 
              key="inventory"
              initial={{ opacity: 0, y: 6 }} 
              animate={{ opacity: 1, y: 0 }} 
              exit={{ opacity: 0, y: -6 }}
              className="grid gap-6 lg:grid-cols-3"
            >
              {/* Left Column: Book List Database */}
              <div className="lg:col-span-2 space-y-6">
                <div className="rounded-2xl glass p-5 shadow-sm">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <h2 className="font-display text-lg font-semibold text-foreground flex items-center gap-2">
                        <Database className="h-4 w-4 text-neon" /> Catalog & Subscriptions
                      </h2>
                      <p className="text-xs text-muted-foreground mt-0.5">Filter, search, edit, and audit standard library records</p>
                    </div>
                    <div className="flex items-center gap-2 bg-white/5 rounded-xl px-3 py-2 border border-white/5 max-w-xs flex-1">
                      <Search className="h-3.5 w-3.5 text-muted-foreground" />
                      <input 
                        type="text" 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search ISBN, Title, Category..." 
                        className="w-full bg-transparent text-xs outline-none text-foreground placeholder:text-muted-foreground/60"
                      />
                    </div>
                  </div>

                  {/* Datagrid list */}
                  <div className="mt-4 overflow-x-auto">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="border-b border-white/10 text-muted-foreground font-semibold">
                          <th className="py-2.5">ISBN</th>
                          <th className="py-2.5">Title</th>
                          <th className="py-2.5">Category</th>
                          <th className="py-2.5">Quantity</th>
                          <th className="py-2.5">Location</th>
                          <th className="py-2.5 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        {filteredBooks.map((b) => (
                          <tr key={b.isbn} className="hover:bg-white/5 transition">
                            <td className="py-3 text-muted-foreground font-mono">{b.isbn}</td>
                            <td className="py-3 font-medium">
                              <div className="text-foreground">{b.title}</div>
                              <div className="text-[10px] text-muted-foreground">by {b.author}</div>
                            </td>
                            <td className="py-3 text-muted-foreground">{b.category}</td>
                            <td className="py-3 font-semibold text-foreground">{b.quantity}</td>
                            <td className="py-3 text-muted-foreground">{b.location}</td>
                            <td className="py-3 text-right">
                              <button 
                                onClick={() => handleDeleteBook(b.isbn)}
                                className="text-rose-400 hover:text-rose-300 p-1.5 hover:bg-rose-500/10 rounded-lg transition"
                                title="Remove book"
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Journal Catalog Database */}
                <div className="rounded-2xl glass p-5 shadow-sm">
                  <h2 className="font-display text-lg font-semibold text-foreground flex items-center gap-2">
                    <FileText className="h-4 w-4 text-neon" /> Subscribed Academic Journals
                  </h2>
                  <p className="text-xs text-muted-foreground mt-0.5">Manage institutional research journal feeds and subscription lists</p>

                  <div className="mt-4 grid gap-3 sm:grid-cols-3">
                    {journals.map((j) => (
                      <div key={j.id} className="rounded-xl bg-white/5 border border-white/5 p-3 flex flex-col justify-between">
                        <div>
                          <div className="text-xs font-semibold text-foreground leading-normal">{j.title}</div>
                          <div className="text-[10px] text-muted-foreground mt-1">Provider: {j.dbName}</div>
                        </div>
                        <div className="mt-3 flex items-center justify-between">
                          <span className={`text-[9px] px-1.5 py-0.5 rounded font-semibold ${j.status === "Subscribed" ? "bg-emerald-500/20 text-emerald-300" : "bg-amber-500/20 text-amber-300"}`}>
                            {j.status}
                          </span>
                          <button 
                            onClick={() => alert(`Reviewing subscriptions for ${j.title}`)}
                            className="text-[10px] text-neon hover:underline"
                          >
                            Modify
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Add Book Inventory Form */}
              <div className="rounded-2xl glass p-5 shadow-sm h-fit">
                <h2 className="font-display text-lg font-semibold text-foreground flex items-center gap-2">
                  <Plus className="h-4 w-4 text-neon" /> Add New Book Record
                </h2>
                <p className="text-xs text-muted-foreground mt-0.5">Index new title to physical aisles and digital metadata catalog</p>

                <form onSubmit={handleAddBook} className="mt-4 space-y-3 text-xs">
                  <div>
                    <label className="block font-semibold text-muted-foreground mb-1">Book Title</label>
                    <input 
                      type="text" 
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      placeholder="e.g. Effective Java"
                      className="w-full rounded-xl bg-white/5 px-3 py-2 border border-white/5 outline-none focus:border-neon/30 text-foreground"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-muted-foreground mb-1">Author Name</label>
                    <input 
                      type="text" 
                      value={newAuthor}
                      onChange={(e) => setNewAuthor(e.target.value)}
                      placeholder="e.g. Joshua Bloch"
                      className="w-full rounded-xl bg-white/5 px-3 py-2 border border-white/5 outline-none focus:border-neon/30 text-foreground"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-muted-foreground mb-1">ISBN Barcode</label>
                    <input 
                      type="text" 
                      value={newIsbn}
                      onChange={(e) => setNewIsbn(e.target.value)}
                      placeholder="e.g. 978-0134685991"
                      className="w-full rounded-xl bg-white/5 px-3 py-2 border border-white/5 outline-none focus:border-neon/30 text-foreground font-mono"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block font-semibold text-muted-foreground mb-1">Quantity</label>
                      <input 
                        type="number" 
                        min="1"
                        value={newQuantity}
                        onChange={(e) => setNewQuantity(parseInt(e.target.value))}
                        className="w-full rounded-xl bg-white/5 px-3 py-2 border border-white/5 outline-none focus:border-neon/30 text-foreground"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-muted-foreground mb-1">Category</label>
                      <select 
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value)}
                        className="w-full rounded-xl bg-white/5 px-3 py-2 border border-white/5 outline-none focus:border-neon/30 text-foreground"
                      >
                        <option>Computer Science</option>
                        <option>Software Engineering</option>
                        <option>Mathematics</option>
                        <option>Systems Engineering</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block font-semibold text-muted-foreground mb-1">Shelf Location</label>
                    <input 
                      type="text" 
                      value={newLocation}
                      onChange={(e) => setNewLocation(e.target.value)}
                      placeholder="e.g. Aisle A, Shelf 3"
                      className="w-full rounded-xl bg-white/5 px-3 py-2 border border-white/5 outline-none focus:border-neon/30 text-foreground"
                    />
                  </div>
                  
                  <button type="submit" className="w-full rounded-xl bg-neon-gradient py-2 font-bold text-neon-foreground hover:shadow-glow transition mt-2">
                    Add Book
                  </button>

                  <div className="border-t border-white/5 pt-3 mt-4">
                    <button 
                      type="button" 
                      onClick={() => alert("Mock bulk upload from CSV/Excel processed! 42 new books queued.")}
                      className="w-full rounded-xl border border-white/10 bg-white/5 py-2 font-semibold text-foreground hover:bg-white/10 transition text-center"
                    >
                      Bulk Import (.CSV)
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          )}

          {/* TAB 3: FINES & OVERDUES */}
          {activeTab === "fines" && (
            <motion.div 
              key="fines"
              initial={{ opacity: 0, y: 6 }} 
              animate={{ opacity: 1, y: 0 }} 
              exit={{ opacity: 0, y: -6 }}
              className="space-y-6"
            >
              <div className="rounded-2xl glass p-5 shadow-sm">
                <h2 className="font-display text-lg font-semibold text-foreground flex items-center gap-2">
                  <Clock className="h-4 w-4 text-neon" /> Overdue Fine Registry
                </h2>
                <p className="text-xs text-muted-foreground mt-0.5">Collect, track, or waive fines for delayed student returns</p>

                <div className="mt-4 space-y-3">
                  {fines.length === 0 ? (
                    <div className="text-center py-8 text-xs text-muted-foreground font-medium">All accounts are clear! No outstanding fines.</div>
                  ) : (
                    fines.map((fine) => (
                      <div key={fine.id} className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl border border-white/5 bg-white/5">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-semibold text-foreground">{fine.user}</span>
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${fine.status === "Paid" ? "bg-emerald-500/20 text-emerald-300" : "bg-rose-500/20 text-rose-300"}`}>
                              {fine.status}
                            </span>
                          </div>
                          <div className="text-xs text-muted-foreground mt-1">Book: <span className="text-foreground">{fine.title}</span></div>
                          <div className="text-[10px] text-muted-foreground mt-0.5">Overdue Limit: {fine.daysOverdue} days overdue</div>
                        </div>

                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <div className="text-xs text-muted-foreground">Fine balance</div>
                            <div className="text-lg font-bold text-neon">${fine.fineAmount.toFixed(2)}</div>
                          </div>
                          {fine.status === "Unpaid" ? (
                            <div className="flex gap-2">
                              <button 
                                onClick={() => handleCollectFine(fine.id)}
                                className="rounded-lg bg-neon-gradient px-3 py-1.5 text-xs font-bold text-neon-foreground hover:shadow-glow transition"
                              >
                                Collect Fine
                              </button>
                              <button 
                                onClick={() => handleWaiveFine(fine.id)}
                                className="rounded-lg bg-white/5 border border-white/10 hover:border-rose-500/50 hover:text-rose-400 px-3 py-1.5 text-xs text-muted-foreground transition"
                              >
                                Waive Fine
                              </button>
                            </div>
                          ) : (
                            <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
                              <CheckCircle2 className="h-4 w-4" /> Cleared
                            </span>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 4: MONITORING & ANALYTICS */}
          {activeTab === "analytics" && (
            <motion.div 
              key="analytics"
              initial={{ opacity: 0, y: 6 }} 
              animate={{ opacity: 1, y: 0 }} 
              exit={{ opacity: 0, y: -6 }}
              className="grid gap-6 lg:grid-cols-3"
            >
              {/* Analytics Graph Charts Simulation */}
              <div className="lg:col-span-2 space-y-6">
                
                {/* Book Turnover and Usage analytics */}
                <div className="rounded-2xl glass p-5 shadow-sm">
                  <h2 className="font-display text-lg font-semibold text-foreground flex items-center gap-2">
                    <BarChart3 className="h-4 w-4 text-neon" /> Book Checkout Turnover Index
                  </h2>
                  <p className="text-xs text-muted-foreground mt-0.5">Real-time hourly inventory and active loans flow metric</p>

                  <div className="mt-6 flex items-end justify-between gap-2 h-44 border-b border-l border-white/10 pb-2 pl-2">
                    {[
                      { label: "Mon", val: "h-24", amount: 480 },
                      { label: "Tue", val: "h-28", amount: 560 },
                      { label: "Wed", val: "h-36", amount: 720 },
                      { label: "Thu", val: "h-32", amount: 640 },
                      { label: "Fri", val: "h-40", amount: 800 },
                      { label: "Sat", val: "h-14", amount: 280 },
                      { label: "Sun", val: "h-10", amount: 200 }
                    ].map((bar, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center group relative">
                        {/* Tooltip popup */}
                        <div className="absolute bottom-full mb-1 opacity-0 group-hover:opacity-100 bg-black/95 text-neon font-mono text-[9px] px-1.5 py-0.5 rounded border border-white/10 transition z-10 pointer-events-none">
                          {bar.amount} checkouts
                        </div>
                        <div className={`w-full rounded-t-lg bg-neon-gradient opacity-80 group-hover:opacity-100 transition ${bar.val}`} />
                        <span className="text-[10px] text-muted-foreground mt-2">{bar.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* User monitoring activity log */}
                <div className="rounded-2xl glass p-5 shadow-sm">
                  <h2 className="font-display text-lg font-semibold text-foreground flex items-center gap-2">
                    <Users className="h-4 w-4 text-neon" /> Smart Desk Activity Monitoring
                  </h2>
                  <p className="text-xs text-muted-foreground mt-0.5">Live check-in audit of students and faculty accessing catalog services</p>

                  <div className="mt-4 space-y-2 text-xs">
                    {[
                      { user: "Student (Alex Carter)", action: "Searched catalog keyword: 'Machine Learning'", time: "2 mins ago" },
                      { user: "Student (Sarah Jenkins)", action: "Reserved: 'Probabilistic ML' via mobile portal", time: "11 mins ago" },
                      { user: "Faculty (Professor John Doe)", action: "Logged in via institutional gateway ID", time: "24 mins ago" },
                      { user: "Student (Jack Vance)", action: "Checked in 'Effective Java' at desk terminal A", time: "1 hour ago" }
                    ].map((act, i) => (
                      <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/5">
                        <div>
                          <span className="font-semibold text-foreground">{act.user}</span>
                          <span className="text-muted-foreground ml-1">{act.action}</span>
                        </div>
                        <span className="text-[10px] text-muted-foreground font-mono shrink-0">{act.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Quick Actions sidebar */}
              <div className="space-y-6">
                
                {/* System notification manager */}
                <div className="rounded-2xl glass p-5 shadow-sm h-fit">
                  <h2 className="font-display text-base font-semibold text-foreground flex items-center gap-2">
                    <Bell className="h-4 w-4 text-neon" /> Broadcast Circulars
                  </h2>
                  <p className="text-xs text-muted-foreground mt-0.5 font-medium">Broadcast smart alerts to reader catalog dashboards</p>

                  <div className="mt-4 space-y-3">
                    <button 
                      onClick={() => alert("Alert Broadcasted: 'Library closed on Friday for inventory auditing'")}
                      className="w-full rounded-xl bg-white/5 border border-white/10 hover:border-neon/30 py-2.5 text-xs text-left px-3 hover:bg-white/10 transition"
                    >
                      <div className="font-semibold text-foreground">Holiday Schedule</div>
                      <div className="text-[10px] text-muted-foreground mt-0.5">Notify readers about closed schedules.</div>
                    </button>
                    <button 
                      onClick={() => alert("Alert Broadcasted: 'Return overdue books before the semester ends'")}
                      className="w-full rounded-xl bg-white/5 border border-white/10 hover:border-neon/30 py-2.5 text-xs text-left px-3 hover:bg-white/10 transition"
                    >
                      <div className="font-semibold text-foreground">Semester Reminders</div>
                      <div className="text-[10px] text-muted-foreground mt-0.5">Send a quick fine amnesty reminder.</div>
                    </button>
                  </div>
                </div>

                {/* AI Insights panel */}
                <div className="rounded-2xl glass p-5 shadow-sm h-fit border border-neon/10">
                  <h2 className="font-display text-base font-semibold text-foreground flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-neon animate-pulse" /> Lumi AI Operations Insights
                  </h2>
                  
                  <div className="mt-4 space-y-3 text-xs leading-relaxed text-muted-foreground">
                    <div className="rounded-lg bg-neon/5 p-3 border border-neon/10 text-foreground">
                      <span className="font-semibold text-neon">Top Trend:</span> AI books have a <span className="font-bold">92% circulation turnover</span> rate this month. Consider expanding physical copies for Aisle C.
                    </div>
                    <div className="rounded-lg bg-white/5 p-3 text-foreground">
                      <span className="font-semibold text-amber-400">Peak hour:</span> Wednesday from <span className="font-bold">2 PM to 5 PM</span> accounts for 42% of physical checkouts. Aisle A staffing recommended.
                    </div>
                  </div>
                </div>

              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>

    </DashboardShell>
  );
}
