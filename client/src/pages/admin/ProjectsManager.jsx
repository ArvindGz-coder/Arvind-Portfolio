import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Pencil,
  Trash2,
  ExternalLink,
  Star,
  Search,
  Filter,
  Layers,
  Sparkles,
  AlertTriangle,
  RefreshCw,
  Eye,
  CheckCircle2,
} from "lucide-react";
import { GithubIcon } from "../../components/ui/Icons";
import adminApi from "../../services/adminApi";
import ProjectDrawer from "./ProjectDrawer";

const CATEGORIES = ["All", "Full Stack", "Frontend", "Backend", "Other"];

export default function ProjectsManager({
  onRefreshStats,
  standalone = false,
  onNavigateHome,
}) {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [successToast, setSuccessToast] = useState("");

  // Drawer state
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);

  // Filter & Search
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [filterFeaturedOnly, setFilterFeaturedOnly] = useState(false);

  // Delete modal confirmation
  const [projectToDelete, setProjectToDelete] = useState(null);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await adminApi.get("/projects");
      if (response.data.success) {
        setProjects(response.data.data);
      }
    } catch (err) {
      console.error("Fetch projects error:", err);
      setError(err.response?.data?.message || "Failed to load projects.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const triggerToast = (msg) => {
    setSuccessToast(msg);
    setTimeout(() => setSuccessToast(""), 3500);
  };

  // Open Add Drawer
  const handleOpenAdd = () => {
    setEditingProject(null);
    setDrawerOpen(true);
    setError("");
  };

  // Open Edit Drawer
  const handleOpenEdit = (project) => {
    setEditingProject(project);
    setDrawerOpen(true);
    setError("");
  };

  // Quick toggle featured status
  const handleToggleFeatured = async (project, e) => {
    e.stopPropagation();
    try {
      const updatedFeatured = !project.featured;
      const res = await adminApi.put(`/projects/${project._id}`, {
        featured: updatedFeatured,
      });
      if (res.data.success) {
        setProjects((prev) =>
          prev.map((p) =>
            p._id === project._id ? { ...p, featured: updatedFeatured } : p
          )
        );
        triggerToast(
          updatedFeatured
            ? `★ Pinned "${project.title}" to Featured showcase`
            : `Unpinned "${project.title}" from Featured`
        );
        if (onRefreshStats) onRefreshStats();
      }
    } catch (err) {
      console.error("Failed to toggle featured:", err);
    }
  };

  // Save Project from Drawer
  const handleSaveProject = async (formData) => {
    setSaving(true);
    setError("");

    const payload = {
      number: Number(formData.number) || 1,
      title: formData.title.trim(),
      description: formData.description.trim(),
      technologies: formData.technologies
        ? formData.technologies
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean)
        : [],
      category: formData.category,
      github: formData.github.trim(),
      demo: formData.demo.trim(),
      featured: Boolean(formData.featured),
      image: formData.image.trim(),
    };

    try {
      if (editingProject) {
        await adminApi.put(`/projects/${editingProject._id}`, payload);
        triggerToast(`Updated project "${payload.title}" successfully.`);
      } else {
        await adminApi.post("/projects", payload);
        triggerToast(`Deployed new project "${payload.title}" to database.`);
      }

      setDrawerOpen(false);
      setEditingProject(null);
      await fetchProjects();
      if (onRefreshStats) onRefreshStats();
    } catch (err) {
      console.error("Save project error:", err);
      setError(err.response?.data?.message || "Failed to save project.");
    } finally {
      setSaving(false);
    }
  };

  // Delete Project
  const confirmDelete = async () => {
    if (!projectToDelete) return;
    try {
      await adminApi.delete(`/projects/${projectToDelete._id}`);
      triggerToast(`Deleted "${projectToDelete.title}" from catalog.`);
      setProjects((prev) => prev.filter((p) => p._id !== projectToDelete._id));
      setProjectToDelete(null);
      if (onRefreshStats) onRefreshStats();
    } catch (err) {
      console.error("Delete error:", err);
      setError(err.response?.data?.message || "Failed to delete project.");
    }
  };

  // Filtered list
  const filteredProjects = projects.filter((p) => {
    const matchesCategory =
      selectedCategory === "All" || p.category === selectedCategory;
    const matchesFeatured = !filterFeaturedOnly || p.featured;
    const matchesSearch =
      searchQuery.trim() === "" ||
      p.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (Array.isArray(p.technologies) &&
        p.technologies.some((t) =>
          t.toLowerCase().includes(searchQuery.toLowerCase())
        ));

    return matchesCategory && matchesFeatured && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      <AnimatePresence>
        {successToast && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-6 right-6 z-50 flex items-center gap-2.5 rounded-2xl border border-emerald-500/40 bg-slate-950/95 px-5 py-3.5 text-sm font-mono text-emerald-300 shadow-[0_0_30px_rgba(16,185,129,0.3)] backdrop-blur-2xl"
          >
            <CheckCircle2 size={18} className="text-emerald-400" />
            <span>{successToast}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Control Bar: Title & Primary CTA */}
      <div className="flex flex-col justify-between gap-4 rounded-2xl border border-slate-800/80 bg-slate-900/40 p-6 backdrop-blur-xl shadow-2xl sm:flex-row sm:items-center">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-violet-400 animate-pulse" />
            <p className="text-xs font-mono uppercase tracking-widest text-violet-400">
              CRUD MAIN HUB
            </p>
          </div>
          <h2 className="mt-1 text-2xl font-bold font-heading text-white">
            Projects & Showcase Manager
          </h2>
          <p className="mt-1 text-xs text-slate-400">
            Create, calibrate, toggle visibility, and update your portfolio engineering artifacts.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchProjects}
            title="Refresh database records"
            className="rounded-xl border border-slate-800 bg-slate-950 p-2.5 text-slate-400 transition hover:border-slate-700 hover:text-white"
          >
            <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
          </button>

          <button
            onClick={handleOpenAdd}
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 px-5 py-2.5 text-xs font-bold font-mono text-white shadow-[0_0_25px_rgba(6,182,212,0.3)] transition hover:from-cyan-400 hover:to-violet-500"
          >
            <Plus size={16} />
            + Deploy New Project
          </button>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col gap-4 rounded-2xl border border-slate-800/80 bg-slate-900/40 p-4 backdrop-blur-xl md:flex-row md:items-center md:justify-between">
        {/* Search */}
        <div className="relative flex-1">
          <Search
            size={16}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500"
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search projects by title, stack, or architecture keyword..."
            className="w-full rounded-xl border border-slate-800 bg-slate-950/70 py-2 pl-10 pr-4 text-xs font-sans text-white placeholder-slate-500 outline-none transition focus:border-cyan-500/50"
          />
        </div>

        {/* Category Pills & Featured Filter */}
        <div className="flex flex-wrap items-center gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-xl px-3 py-1.5 text-xs font-mono transition-all ${
                selectedCategory === cat
                  ? "border border-cyan-500/40 bg-cyan-500/20 text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.15)]"
                  : "border border-slate-800 bg-slate-950/50 text-slate-400 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}

          <button
            onClick={() => setFilterFeaturedOnly(!filterFeaturedOnly)}
            className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-mono transition-all ${
              filterFeaturedOnly
                ? "border border-amber-500/40 bg-amber-500/20 text-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.2)]"
                : "border border-slate-800 bg-slate-950/50 text-slate-400 hover:text-white"
            }`}
          >
            <Star size={13} className={filterFeaturedOnly ? "fill-amber-400 text-amber-400" : ""} />
            Featured Only
          </button>
        </div>
      </div>

      {/* Projects Grid */}
      {loading ? (
        <div className="flex h-64 flex-col items-center justify-center rounded-2xl border border-slate-800 bg-slate-900/40">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-cyan-400 border-t-transparent" />
          <p className="mt-3 font-mono text-xs text-slate-400">
            Querying MongoDB projects collection...
          </p>
        </div>
      ) : filteredProjects.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-800 bg-slate-900/20 py-16 text-center">
          <Layers size={40} className="text-slate-600 mb-3" />
          <h3 className="font-heading text-lg font-bold text-white">
            No matching projects found
          </h3>
          <p className="mt-1 text-xs text-slate-400 max-w-sm">
            {searchQuery
              ? `No artifacts matching query "${searchQuery}". Try clearing filters.`
              : "No project entries exist in your database yet. Deploy your first build now!"}
          </p>
          <button
            onClick={handleOpenAdd}
            className="mt-4 flex items-center gap-2 rounded-xl bg-cyan-500/20 border border-cyan-500/40 px-4 py-2 text-xs font-mono text-cyan-300 hover:bg-cyan-500/30 transition"
          >
            <Plus size={14} /> Add First Project
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project._id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: index * 0.04 }}
              className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-900/40 backdrop-blur-xl shadow-xl transition-all duration-300 hover:border-cyan-500/40 hover:shadow-[0_0_30px_rgba(6,182,212,0.15)]"
            >
              {/* Project Card Header Image */}
              <div className="relative h-44 w-full overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950">
                {project.image ? (
                  <img
                    src={project.image}
                    alt={project.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                      e.target.style.display = "none";
                    }}
                  />
                ) : (
                  <div className="flex h-full w-full flex-col items-center justify-center text-slate-600">
                    <Layers size={32} className="opacity-40 mb-1" />
                    <span className="font-mono text-xs">#{project.number}</span>
                  </div>
                )}

                {/* Overlaid Badges */}
                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <span className="rounded-lg bg-black/70 px-2.5 py-1 text-[11px] font-mono text-cyan-400 backdrop-blur-md border border-cyan-500/30">
                    #{project.number} • {project.category}
                  </span>
                </div>

                {/* Featured Star Toggle Button */}
                <button
                  type="button"
                  onClick={(e) => handleToggleFeatured(project, e)}
                  title={project.featured ? "Featured Project" : "Click to Pin as Featured"}
                  className={`absolute top-3 right-3 flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-mono font-bold transition-all backdrop-blur-md ${
                    project.featured
                      ? "border border-amber-500/50 bg-amber-500/30 text-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.3)]"
                      : "border border-slate-700 bg-black/60 text-slate-400 hover:text-amber-400"
                  }`}
                >
                  <Star
                    size={12}
                    className={project.featured ? "fill-amber-400 text-amber-400" : ""}
                  />
                  {project.featured ? "FEATURED" : "PIN"}
                </button>
              </div>

              {/* Card Body */}
              <div className="flex flex-1 flex-col justify-between p-5">
                <div>
                  <h3 className="text-base font-bold font-heading text-white group-hover:text-cyan-300 transition-colors">
                    {project.title}
                  </h3>

                  <p className="mt-2 text-xs text-slate-400 leading-relaxed line-clamp-3">
                    {project.description}
                  </p>

                  {/* Tech stack pills */}
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {Array.isArray(project.technologies) &&
                      project.technologies.slice(0, 4).map((tech, i) => (
                        <span
                          key={i}
                          className="rounded-md border border-slate-800 bg-slate-950/60 px-2 py-0.5 text-[10px] font-mono text-cyan-300"
                        >
                          {tech}
                        </span>
                      ))}
                    {Array.isArray(project.technologies) &&
                      project.technologies.length > 4 && (
                        <span className="rounded-md border border-slate-800 bg-slate-950/60 px-2 py-0.5 text-[10px] font-mono text-slate-500">
                          +{project.technologies.length - 4} more
                        </span>
                      )}
                  </div>
                </div>

                {/* Action Footer Bar */}
                <div className="mt-5 flex items-center justify-between border-t border-slate-800/80 pt-4">
                  {/* External Links */}
                  <div className="flex items-center gap-3">
                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noreferrer"
                        title="Open Live Preview"
                        className="flex items-center gap-1 text-xs font-mono text-cyan-400 transition hover:underline"
                      >
                        <ExternalLink size={13} /> Demo
                      </a>
                    )}
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noreferrer"
                        title="Open Source Code"
                        className="flex items-center gap-1 text-xs font-mono text-slate-400 transition hover:text-white"
                      >
                        <GithubIcon size={13} /> Repo
                      </a>
                    )}
                  </div>

                  {/* Edit & Delete Action Triggers */}
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleOpenEdit(project)}
                      title="Edit Project"
                      className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-800 hover:text-cyan-400"
                    >
                      <Pencil size={15} />
                    </button>
                    <button
                      onClick={() => setProjectToDelete(project)}
                      title="Delete Project"
                      className="rounded-lg p-2 text-slate-400 transition hover:bg-red-500/20 hover:text-red-400"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Slide-in Project Drawer */}
      <ProjectDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onSave={handleSaveProject}
        editingProject={editingProject}
        saving={saving}
        error={error}
      />

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {projectToDelete && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setProjectToDelete(null)}
              className="fixed inset-0 bg-black/75 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative z-10 w-full max-w-md rounded-2xl border border-red-500/40 bg-slate-950 p-6 shadow-[0_0_50px_rgba(239,68,68,0.25)] backdrop-blur-2xl"
            >
              <div className="flex items-center gap-3 text-red-400">
                <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-2.5">
                  <AlertTriangle size={20} />
                </div>
                <h3 className="text-lg font-bold font-heading text-white">
                  Decommission Project?
                </h3>
              </div>

              <p className="mt-3 text-sm text-slate-300">
                Are you sure you want to delete{" "}
                <span className="font-bold text-white">
                  "{projectToDelete.title}"
                </span>
                ? This action drops the document from your MongoDB cluster permanently.
              </p>

              <div className="mt-6 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setProjectToDelete(null)}
                  className="rounded-xl border border-slate-800 px-4 py-2 text-xs font-mono text-slate-400 hover:bg-slate-900 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={confirmDelete}
                  className="rounded-xl bg-red-600 px-4 py-2 text-xs font-mono font-bold text-white shadow-[0_0_20px_rgba(239,68,68,0.3)] hover:bg-red-500"
                >
                  Confirm Delete
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
