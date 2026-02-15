"use client";

import { useState, useEffect, useCallback } from "react";
import {
  FaTachometerAlt,
  FaNewspaper,
  FaCalendarAlt,
  FaUsers,
  FaImages,
  FaChartLine,
  FaCog,
  FaPlus,
  FaEdit,
  FaTrash,
  FaEye,
  FaSearch,
  FaBell,
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaSave,
  FaSpinner,
  FaCheck,
  FaBan,
  FaEnvelope,
} from "react-icons/fa";
import "./adminpage.css";
import Link from "next/link";
import { newsApi, eventsApi, galleryApi, membershipsApi } from "@/lib/api";
import { News, CreateNewsDto, UpdateNewsDto } from "@/types/news";
import { Event, CreateEventDto, UpdateEventDto } from "@/types/events";
import { Gallery, CreateGalleryDto, UpdateGalleryDto } from "@/types/gallery";
import { Membership } from "@/types/membership";

type NewsFormData = {
  title: string;
  excerpt: string;
  content: string;
  author: string;
  publishedDate: string;
  category: string;
  slug: string;
  featuredImage: string;
  tags: string;
  source: string;
  sourceUrl: string;
};

type EventFormData = {
  title: string;
  shortDescription: string;
  description: string;
  eventDate: string;
  location: string;
  slug: string;
  status: 'upcoming' | 'completed';
  mainImage: string;
  galleryImages: string;
  organizer: string;
  attendees: string;
};

type GalleryFormData = {
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  event: string;
  tags: string;
  isVisible: boolean;
  order: string;
};

const initialNewsForm: NewsFormData = {
  title: "",
  excerpt: "",
  content: "",
  author: "",
  publishedDate: new Date().toISOString().split('T')[0],
  category: "",
  slug: "",
  featuredImage: "",
  tags: "",
  source: "",
  sourceUrl: "",
};

const initialEventForm: EventFormData = {
  title: "",
  shortDescription: "",
  description: "",
  eventDate: new Date().toISOString().split('T')[0],
  location: "",
  slug: "",
  status: "upcoming",
  mainImage: "",
  galleryImages: "",
  organizer: "",
  attendees: "0",
};

const initialGalleryForm: GalleryFormData = {
  title: "",
  description: "",
  imageUrl: "",
  category: "",
  event: "",
  tags: "",
  isVisible: true,
  order: "0",
};

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [newsList, setNewsList] = useState<News[]>([]);
  const [eventsList, setEventsList] = useState<Event[]>([]);
  const [galleryList, setGalleryList] = useState<Gallery[]>([]);
  const [membershipsList, setMembershipsList] = useState<Membership[]>([]);

  const [showNewsModal, setShowNewsModal] = useState(false);
  const [showEventModal, setShowEventModal] = useState(false);
  const [showGalleryModal, setShowGalleryModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<{type: 'news' | 'events' | 'gallery' | 'memberships', id: string} | null>(null);

  const [editingNews, setEditingNews] = useState<News | null>(null);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [editingGallery, setEditingGallery] = useState<Gallery | null>(null);

  const [newsForm, setNewsForm] = useState<NewsFormData>(initialNewsForm);
  const [eventForm, setEventForm] = useState<EventFormData>(initialEventForm);
  const [galleryForm, setGalleryForm] = useState<GalleryFormData>(initialGalleryForm);

  const [searchFilter, setSearchFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [news, events, gallery, memberships] = await Promise.all([
        newsApi.getAll(),
        eventsApi.getAll(),
        galleryApi.getAll(),
        membershipsApi.getAll(),
      ]);
      setNewsList(news);
      setEventsList(events);
      setGalleryList(gallery);
      setMembershipsList(memberships);
    } catch (err) {
      setError("Failed to load data. Please check if the backend is running.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const stats = {
    totalMembers: membershipsList.length,
    pendingMembers: membershipsList.filter(m => m.status === 'pending').length,
    activeEvents: eventsList.filter(e => e.status === 'upcoming').length,
    totalNews: newsList.length,
    monthlyViews: 45789,
  };

  const renderDashboard = () => (
    <div className="dashboard-content">
      <div className="page-header">
        <h1>Dashboard Overview</h1>
        <p>Welcome back! Here's what's happening with your community.</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon blue">
            <FaUsers />
          </div>
          <div className="stat-info">
            <h3>{stats.totalMembers.toLocaleString()}</h3>
            <p>Total Members</p>
            <span className="stat-trend positive">+12% this month</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon green">
            <FaCalendarAlt />
          </div>
          <div className="stat-info">
            <h3>{stats.activeEvents}</h3>
            <p>Active Events</p>
            <span className="stat-trend positive">+3 this week</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon orange">
            <FaNewspaper />
          </div>
          <div className="stat-info">
            <h3>{stats.totalNews}</h3>
            <p>Published Articles</p>
            <span className="stat-trend positive">+8 this month</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon purple">
            <FaEye />
          </div>
          <div className="stat-info">
            <h3>{stats.monthlyViews.toLocaleString()}</h3>
            <p>Monthly Views</p>
            <span className="stat-trend positive">+24% growth</span>
          </div>
        </div>
      </div>

      <div className="charts-grid">
        <div className="chart-card">
          <div className="chart-header">
            <h3>Member Growth</h3>
            <select className="chart-filter">
              <option>Last 7 days</option>
              <option>Last 30 days</option>
              <option>Last 90 days</option>
            </select>
          </div>
          <div className="chart-placeholder">
            <div className="bar-chart">
              <div className="bar" style={{ height: "60%" }}></div>
              <div className="bar" style={{ height: "75%" }}></div>
              <div className="bar" style={{ height: "55%" }}></div>
              <div className="bar" style={{ height: "85%" }}></div>
              <div className="bar" style={{ height: "70%" }}></div>
              <div className="bar" style={{ height: "90%" }}></div>
              <div className="bar" style={{ height: "80%" }}></div>
            </div>
            <div className="chart-labels">
              <span>Mon</span>
              <span>Tue</span>
              <span>Wed</span>
              <span>Thu</span>
              <span>Fri</span>
              <span>Sat</span>
              <span>Sun</span>
            </div>
          </div>
        </div>

        <div className="chart-card">
          <div className="chart-header">
            <h3>Event Attendance</h3>
            <select className="chart-filter">
              <option>This Month</option>
              <option>Last Month</option>
              <option>This Year</option>
            </select>
          </div>
          <div className="chart-placeholder">
            <div className="pie-chart">
              <svg viewBox="0 0 200 200">
                <circle cx="100" cy="100" r="80" fill="none" stroke="#0d47a1" strokeWidth="40" strokeDasharray="126 377" transform="rotate(-90 100 100)" />
                <circle cx="100" cy="100" r="80" fill="none" stroke="#2196f3" strokeWidth="40" strokeDasharray="94 377" strokeDashoffset="-126" transform="rotate(-90 100 100)" />
                <circle cx="100" cy="100" r="80" fill="none" stroke="#64b5f6" strokeWidth="40" strokeDasharray="157 377" strokeDashoffset="-220" transform="rotate(-90 100 100)" />
              </svg>
              <div className="pie-legend">
                <div className="legend-item">
                  <span className="legend-color" style={{ background: "#0d47a1" }}></span>
                  <span>Workshops (35%)</span>
                </div>
                <div className="legend-item">
                  <span className="legend-color" style={{ background: "#2196f3" }}></span>
                  <span>Conferences (25%)</span>
                </div>
                <div className="legend-item">
                  <span className="legend-color" style={{ background: "#64b5f6" }}></span>
                  <span>Webinars (40%)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="activity-section">
        <h3>Recent Activity</h3>
        <div className="activity-list">
          <div className="activity-item">
            <div className="activity-icon blue"><FaUsers /></div>
            <div className="activity-content">
              <p><strong>New member joined:</strong> Sarah Wilson</p>
              <span className="activity-time">2 hours ago</span>
            </div>
          </div>
          <div className="activity-item">
            <div className="activity-icon green"><FaNewspaper /></div>
            <div className="activity-content">
              <p><strong>Article published:</strong> Advanced Threat Detection</p>
              <span className="activity-time">5 hours ago</span>
            </div>
          </div>
          <div className="activity-item">
            <div className="activity-icon orange"><FaCalendarAlt /></div>
            <div className="activity-content">
              <p><strong>Event registered:</strong> Cloud Security Workshop</p>
              <span className="activity-time">1 day ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const handleNewsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const dto: CreateNewsDto | UpdateNewsDto = {
        title: newsForm.title,
        content: newsForm.content,
        excerpt: newsForm.excerpt,
        publishedDate: newsForm.publishedDate,
        author: newsForm.author || undefined,
        category: newsForm.category || undefined,
        slug: newsForm.slug || generateSlug(newsForm.title),
        featuredImage: newsForm.featuredImage,
        tags: newsForm.tags ? newsForm.tags.split(',').map(t => t.trim()) : undefined,
        source: newsForm.source || undefined,
        sourceUrl: newsForm.sourceUrl || undefined,
      };

      if (editingNews) {
        await newsApi.update(editingNews.id, dto as UpdateNewsDto);
      } else {
        await newsApi.create(dto as CreateNewsDto);
      }
      
      await fetchData();
      setShowNewsModal(false);
      setEditingNews(null);
      setNewsForm(initialNewsForm);
    } catch (err) {
      setError("Failed to save news article");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleEventSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const dto: CreateEventDto | UpdateEventDto = {
        title: eventForm.title,
        description: eventForm.description,
        shortDescription: eventForm.shortDescription,
        eventDate: eventForm.eventDate,
        location: eventForm.location,
        slug: eventForm.slug || generateSlug(eventForm.title),
        status: eventForm.status,
        mainImage: eventForm.mainImage,
        galleryImages: eventForm.galleryImages ? eventForm.galleryImages.split(',').map(i => i.trim()) : undefined,
        organizer: eventForm.organizer || undefined,
        attendees: eventForm.attendees ? parseInt(eventForm.attendees) : undefined,
      };

      if (editingEvent) {
        await eventsApi.update(editingEvent.id, dto as UpdateEventDto);
      } else {
        await eventsApi.create(dto as CreateEventDto);
      }
      
      await fetchData();
      setShowEventModal(false);
      setEditingEvent(null);
      setEventForm(initialEventForm);
    } catch (err) {
      setError("Failed to save event");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleGallerySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const dto: CreateGalleryDto | UpdateGalleryDto = {
        title: galleryForm.title,
        description: galleryForm.description || undefined,
        imageUrl: galleryForm.imageUrl,
        category: galleryForm.category || undefined,
        event: galleryForm.event || undefined,
        tags: galleryForm.tags ? galleryForm.tags.split(',').map(t => t.trim()) : undefined,
        isVisible: galleryForm.isVisible,
        order: galleryForm.order ? parseInt(galleryForm.order) : undefined,
      };

      if (editingGallery) {
        await galleryApi.update(editingGallery.id, dto as UpdateGalleryDto);
      } else {
        await galleryApi.create(dto as CreateGalleryDto);
      }
      
      await fetchData();
      setShowGalleryModal(false);
      setEditingGallery(null);
      setGalleryForm(initialGalleryForm);
    } catch (err) {
      setError("Failed to save gallery item");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!showDeleteConfirm) return;
    setLoading(true);
    try {
      if (showDeleteConfirm.type === 'news') {
        await newsApi.delete(showDeleteConfirm.id);
      } else if (showDeleteConfirm.type === 'events') {
        await eventsApi.delete(showDeleteConfirm.id);
      } else if (showDeleteConfirm.type === 'gallery') {
        await galleryApi.delete(showDeleteConfirm.id);
      } else if (showDeleteConfirm.type === 'memberships') {
        await membershipsApi.delete(showDeleteConfirm.id);
      }
      await fetchData();
      setShowDeleteConfirm(null);
    } catch (err) {
      setError("Failed to delete item");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const openEditNews = (news: News) => {
    setEditingNews(news);
    setNewsForm({
      title: news.title,
      excerpt: news.excerpt,
      content: news.content,
      author: news.author || "",
      publishedDate: news.publishedDate.split('T')[0],
      category: news.category || "",
      slug: news.slug,
      featuredImage: news.featuredImage,
      tags: news.tags?.join(", ") || "",
      source: news.source || "",
      sourceUrl: news.sourceUrl || "",
    });
    setShowNewsModal(true);
  };

  const openEditEvent = (event: Event) => {
    setEditingEvent(event);
    setEventForm({
      title: event.title,
      shortDescription: event.shortDescription,
      description: event.description,
      eventDate: event.eventDate.split('T')[0],
      location: event.location,
      slug: event.slug,
      status: event.status,
      mainImage: event.mainImage,
      galleryImages: event.galleryImages?.join(", ") || "",
      organizer: event.organizer || "",
      attendees: event.attendees?.toString() || "0",
    });
    setShowEventModal(true);
  };

  const openEditGallery = (item: Gallery) => {
    setEditingGallery(item);
    setGalleryForm({
      title: item.title,
      description: item.description || "",
      imageUrl: item.imageUrl,
      category: item.category || "",
      event: item.event || "",
      tags: item.tags?.join(", ") || "",
      isVisible: item.isVisible,
      order: item.order.toString(),
    });
    setShowGalleryModal(true);
  };

  const filteredNews = newsList.filter(news => {
    const matchesSearch = news.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
                          news.excerpt.toLowerCase().includes(searchFilter.toLowerCase());
    const matchesStatus = statusFilter === "all" || 
                          (statusFilter === "published" && news.publishedDate <= new Date().toISOString()) ||
                          (statusFilter === "draft" && news.publishedDate > new Date().toISOString());
    return matchesSearch && matchesStatus;
  });

  const filteredEvents = eventsList.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
                          event.location.toLowerCase().includes(searchFilter.toLowerCase());
    const matchesStatus = statusFilter === "all" || event.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const renderNews = () => (
    <div className="dashboard-content">
      <div className="page-header">
        <div>
          <h1>News Management</h1>
          <p>Create and manage news articles</p>
        </div>
        <button className="btn-primary" onClick={() => { setEditingNews(null); setNewsForm(initialNewsForm); setShowNewsModal(true); }}>
          <FaPlus /> Add News
        </button>
      </div>

      <div className="content-filters">
        <div className="search-box">
          <FaSearch />
          <input type="text" placeholder="Search news..." value={searchFilter} onChange={(e) => setSearchFilter(e.target.value)} />
        </div>
        <select className="filter-select" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="all">All Status</option>
          <option value="published">Published</option>
          <option value="draft">Draft</option>
        </select>
      </div>

      <div className="content-table">
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Date</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredNews.map((news) => (
              <tr key={news.id}>
                <td>
                  <div className="table-title">
                    <strong>{news.title}</strong>
                    <span className="excerpt">{news.excerpt}</span>
                  </div>
                </td>
                <td>{news.author || "N/A"}</td>
                <td>{new Date(news.publishedDate).toLocaleDateString()}</td>
                <td>{news.category || "N/A"}</td>
                <td>
                  <div className="action-buttons">
                    <button className="btn-icon" title="Edit" onClick={() => openEditNews(news)}>
                      <FaEdit />
                    </button>
                    <button className="btn-icon danger" title="Delete" onClick={() => setShowDeleteConfirm({type: 'news', id: news.id})}>
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filteredNews.length === 0 && (
              <tr>
                <td colSpan={5} style={{ textAlign: "center", padding: "2rem" }}>
                  No news articles found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderEvents = () => (
    <div className="dashboard-content">
      <div className="page-header">
        <div>
          <h1>Events Management</h1>
          <p>Create and manage community events</p>
        </div>
        <button className="btn-primary" onClick={() => { setEditingEvent(null); setEventForm(initialEventForm); setShowEventModal(true); }}>
          <FaPlus /> Add Event
        </button>
      </div>

      <div className="content-filters">
        <div className="search-box">
          <FaSearch />
          <input type="text" placeholder="Search events..." value={searchFilter} onChange={(e) => setSearchFilter(e.target.value)} />
        </div>
        <select className="filter-select" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="all">All Events</option>
          <option value="upcoming">Upcoming</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      <div className="events-grid-view">
        {filteredEvents.map((event) => (
          <div key={event.id} className="event-card-admin">
            <div className={`event-status-badge ${event.status}`}>
              {event.status}
            </div>
            <h3>{event.title}</h3>
            <div className="event-details">
              <p><FaCalendarAlt /> {new Date(event.eventDate).toLocaleDateString()}</p>
              <p><FaUsers /> {event.attendees || 0} attendees</p>
              <p>📍 {event.location}</p>
            </div>
            <div className="event-actions">
              <button className="btn-secondary" onClick={() => openEditEvent(event)}>
                <FaEdit /> Edit
              </button>
              <button className="btn-danger" onClick={() => setShowDeleteConfirm({type: 'events', id: event.id})}>
                <FaTrash /> Delete
              </button>
            </div>
          </div>
        ))}
        {filteredEvents.length === 0 && (
          <div style={{ textAlign: "center", padding: "2rem", gridColumn: "1 / -1" }}>
            No events found
          </div>
        )}
      </div>
    </div>
  );

  const renderGallery = () => (
    <div className="dashboard-content">
      <div className="page-header">
        <div>
          <h1>Gallery Management</h1>
          <p>Upload and manage gallery images</p>
        </div>
        <button className="btn-primary" onClick={() => { setEditingGallery(null); setGalleryForm(initialGalleryForm); setShowGalleryModal(true); }}>
          <FaPlus /> Add Image
        </button>
      </div>

      <div className="content-filters">
        <div className="search-box">
          <FaSearch />
          <input type="text" placeholder="Search gallery..." value={searchFilter} onChange={(e) => setSearchFilter(e.target.value)} />
        </div>
      </div>

      <div className="gallery-grid-admin">
        {galleryList.filter(item => item.title.toLowerCase().includes(searchFilter.toLowerCase())).map((item) => (
          <div key={item.id} className="gallery-card-admin">
            <div className="gallery-image-container">
              <img src={item.imageUrl} alt={item.title} />
              {!item.isVisible && <div className="hidden-overlay">Hidden</div>}
            </div>
            <div className="gallery-info">
              <h4>{item.title}</h4>
              <p>{item.category || "No category"}</p>
              <div className="gallery-actions">
                <button className="btn-icon" title="Edit" onClick={() => openEditGallery(item)}>
                  <FaEdit />
                </button>
                <button className="btn-icon danger" title="Delete" onClick={() => setShowDeleteConfirm({type: 'gallery', id: item.id})}>
                  <FaTrash />
                </button>
              </div>
            </div>
          </div>
        ))}
        {galleryList.length === 0 && (
          <div style={{ textAlign: "center", padding: "2rem", gridColumn: "1 / -1" }}>
            No gallery items found
          </div>
        )}
      </div>
    </div>
  );

  const handleMembershipStatusChange = async (id: string, status: 'approved' | 'declined' | 'pending') => {
    setLoading(true);
    try {
      await membershipsApi.update(id, { status });
      await fetchData();
    } catch (err) {
      setError("Failed to update membership status");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filteredMemberships = membershipsList.filter(m => {
    const matchesSearch = 
      m.firstName.toLowerCase().includes(searchFilter.toLowerCase()) ||
      m.lastName.toLowerCase().includes(searchFilter.toLowerCase()) ||
      m.email.toLowerCase().includes(searchFilter.toLowerCase());
    const matchesStatus = statusFilter === "all" || m.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const renderMembers = () => (
    <div className="dashboard-content">
      <div className="page-header">
        <div>
          <h1>Membership Management</h1>
          <p>Review and manage membership applications</p>
        </div>
      </div>

      <div className="content-filters">
        <div className="search-box">
          <FaSearch />
          <input type="text" placeholder="Search members..." value={searchFilter} onChange={(e) => setSearchFilter(e.target.value)} />
        </div>
        <select className="filter-select" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="declined">Declined</option>
        </select>
      </div>

      <div className="members-stats">
        <div className="member-stat-card pending">
          <FaUsers />
          <div>
            <span className="stat-number">{membershipsList.filter(m => m.status === 'pending').length}</span>
            <span className="stat-label">Pending</span>
          </div>
        </div>
        <div className="member-stat-card approved">
          <FaCheck />
          <div>
            <span className="stat-number">{membershipsList.filter(m => m.status === 'approved').length}</span>
            <span className="stat-label">Approved</span>
          </div>
        </div>
        <div className="member-stat-card declined">
          <FaBan />
          <div>
            <span className="stat-number">{membershipsList.filter(m => m.status === 'declined').length}</span>
            <span className="stat-label">Declined</span>
          </div>
        </div>
      </div>

      <div className="content-table">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Organization</th>
              <th>Status</th>
              <th>Applied</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredMemberships.map((member) => (
              <tr key={member.id}>
                <td>
                  <div className="table-title">
                    <strong>{member.firstName} {member.lastName}</strong>
                    {member.occupation && <span className="excerpt">{member.occupation}</span>}
                  </div>
                </td>
                <td>
                  <a href={`mailto:${member.email}`} className="email-link">
                    <FaEnvelope /> {member.email}
                  </a>
                </td>
                <td>{member.phone}</td>
                <td>{member.organization || "N/A"}</td>
                <td>
                  <span className={`status-badge ${member.status}`}>
                    {member.status}
                  </span>
                </td>
                <td>{new Date(member.createdAt).toLocaleDateString()}</td>
                <td>
                  <div className="action-buttons">
                    {member.status === 'pending' && (
                      <>
                        <button 
                          className="btn-icon success" 
                          title="Approve" 
                          onClick={() => handleMembershipStatusChange(member.id, 'approved')}
                          disabled={loading}
                        >
                          <FaCheck />
                        </button>
                        <button 
                          className="btn-icon danger" 
                          title="Decline" 
                          onClick={() => handleMembershipStatusChange(member.id, 'declined')}
                          disabled={loading}
                        >
                          <FaBan />
                        </button>
                      </>
                    )}
                    {member.status !== 'pending' && (
                      <button 
                        className="btn-icon" 
                        title="Reset to Pending" 
                        onClick={() => handleMembershipStatusChange(member.id, 'pending')}
                        disabled={loading}
                      >
                        <FaSpinner />
                      </button>
                    )}
                    <button 
                      className="btn-icon danger" 
                      title="Delete" 
                      onClick={() => setShowDeleteConfirm({type: 'memberships', id: member.id})}
                    >
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filteredMemberships.length === 0 && (
              <tr>
                <td colSpan={7} style={{ textAlign: "center", padding: "2rem" }}>
                  No membership applications found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="admin-dashboard">
      <aside className={`sidebar ${sidebarOpen ? "open" : "closed"}`}>
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <span className="logo-text">GCCF Admin</span>
          </div>
          <button className="sidebar-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>
            {sidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        <nav className="sidebar-nav">
          <button className={`nav-item ${activeTab === "dashboard" ? "active" : ""}`} onClick={() => setActiveTab("dashboard")}>
            <FaTachometerAlt />
            {sidebarOpen && <span>Dashboard</span>}
          </button>
          <button className={`nav-item ${activeTab === "news" ? "active" : ""}`} onClick={() => setActiveTab("news")}>
            <FaNewspaper />
            {sidebarOpen && <span>News</span>}
          </button>
          <button className={`nav-item ${activeTab === "events" ? "active" : ""}`} onClick={() => setActiveTab("events")}>
            <FaCalendarAlt />
            {sidebarOpen && <span>Events</span>}
          </button>
          <button className={`nav-item ${activeTab === "gallery" ? "active" : ""}`} onClick={() => setActiveTab("gallery")}>
            <FaImages />
            {sidebarOpen && <span>Gallery</span>}
          </button>
          <button className={`nav-item ${activeTab === "members" ? "active" : ""}`} onClick={() => setActiveTab("members")}>
            <FaUsers />
            {sidebarOpen && <span>Members</span>}
          </button>
          <button className={`nav-item ${activeTab === "analytics" ? "active" : ""}`} onClick={() => setActiveTab("analytics")}>
            <FaChartLine />
            {sidebarOpen && <span>Analytics</span>}
          </button>
          <button className={`nav-item ${activeTab === "settings" ? "active" : ""}`} onClick={() => setActiveTab("settings")}>
            <FaCog />
            {sidebarOpen && <span>Settings</span>}
          </button>
        </nav>

        <div className="sidebar-footer">
          <button className="nav-item">
            <FaSignOutAlt />
            {sidebarOpen && <Link className="logout-btn" href="/">Logout</Link>}
          </button>
        </div>
      </aside>

      <main className="dashboard-main">
        <header className="dashboard-header">
          <div className="header-left">
            <button className="mobile-menu-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>
              <FaBars />
            </button>
            <h2>Admin Panel</h2>
          </div>
          <div className="header-right">
            <button className="header-icon">
              <FaBell />
              <span className="notification-badge">3</span>
            </button>
            <div className="admin-profile">
              <img src="/Hi.jpg" alt="Admin" />
              <div className="profile-info">
                <span className="profile-name">Admin User</span>
                <span className="profile-role">Administrator</span>
              </div>
            </div>
          </div>
        </header>

        <div className="dashboard-body">
          {error && (
            <div className="error-banner" style={{ background: "#fee", padding: "1rem", marginBottom: "1rem", borderRadius: "8px", color: "#c00" }}>
              {error}
              <button onClick={() => setError(null)} style={{ marginLeft: "1rem", color: "#c00", border: "none", background: "none", cursor: "pointer" }}>
                <FaTimes />
              </button>
            </div>
          )}
          
          {loading && activeTab === "dashboard" ? (
            <div style={{ textAlign: "center", padding: "2rem" }}>
              <FaSpinner className="spin" style={{ fontSize: "2rem" }} />
            </div>
          ) : (
            <>
              {activeTab === "dashboard" && renderDashboard()}
              {activeTab === "news" && renderNews()}
              {activeTab === "events" && renderEvents()}
              {activeTab === "gallery" && renderGallery()}
              {activeTab === "members" && renderMembers()}
              {activeTab === "analytics" && (
                <div className="dashboard-content">
                  <h1>Analytics</h1>
                  <p>Coming soon...</p>
                </div>
              )}
              {activeTab === "settings" && (
                <div className="dashboard-content">
                  <h1>Settings</h1>
                  <p>Coming soon...</p>
                </div>
              )}
            </>
          )}
        </div>
      </main>

      {showNewsModal && (
        <div className="modal-overlay" onClick={() => setShowNewsModal(false)}>
          <div className="modal-content news-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editingNews ? "Edit Article" : "Add New Article"}</h2>
              <button onClick={() => setShowNewsModal(false)}><FaTimes /></button>
            </div>
            <form onSubmit={handleNewsSubmit}>
              <div className="modal-body">
                <div className="form-group">
                  <label>Title *</label>
                  <input type="text" placeholder="Enter article title" value={newsForm.title} 
                    onChange={(e) => setNewsForm({...newsForm, title: e.target.value, slug: generateSlug(e.target.value)})} required />
                </div>
                <div className="form-group">
                  <label>Excerpt *</label>
                  <textarea placeholder="Brief description..." rows={3} value={newsForm.excerpt}
                    onChange={(e) => setNewsForm({...newsForm, excerpt: e.target.value})} required />
                </div>
                <div className="form-group">
                  <label>Content *</label>
                  <textarea placeholder="Full article content..." rows={8} value={newsForm.content}
                    onChange={(e) => setNewsForm({...newsForm, content: e.target.value})} required />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Author</label>
                    <input type="text" placeholder="Author name" value={newsForm.author}
                      onChange={(e) => setNewsForm({...newsForm, author: e.target.value})} />
                  </div>
                  <div className="form-group">
                    <label>Category</label>
                    <input type="text" placeholder="Category" value={newsForm.category}
                      onChange={(e) => setNewsForm({...newsForm, category: e.target.value})} />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Published Date *</label>
                    <input type="date" value={newsForm.publishedDate}
                      onChange={(e) => setNewsForm({...newsForm, publishedDate: e.target.value})} required />
                  </div>
                  <div className="form-group">
                    <label>Slug</label>
                    <input type="text" placeholder="url-slug" value={newsForm.slug}
                      onChange={(e) => setNewsForm({...newsForm, slug: e.target.value})} />
                  </div>
                </div>
                <div className="form-group">
                  <label>Featured Image URL *</label>
                  <input type="url" placeholder="https://example.com/image.jpg" value={newsForm.featuredImage}
                    onChange={(e) => setNewsForm({...newsForm, featuredImage: e.target.value})} required />
                </div>
                <div className="form-group">
                  <label>Tags (comma separated)</label>
                  <input type="text" placeholder="tag1, tag2, tag3" value={newsForm.tags}
                    onChange={(e) => setNewsForm({...newsForm, tags: e.target.value})} />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Source</label>
                    <input type="text" placeholder="Source name" value={newsForm.source}
                      onChange={(e) => setNewsForm({...newsForm, source: e.target.value})} />
                  </div>
                  <div className="form-group">
                    <label>Source URL</label>
                    <input type="url" placeholder="https://source.com/article" value={newsForm.sourceUrl}
                      onChange={(e) => setNewsForm({...newsForm, sourceUrl: e.target.value})} />
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn-secondary" onClick={() => setShowNewsModal(false)}>Cancel</button>
                <button type="submit" className="btn-primary" disabled={loading}>
                  {loading ? <FaSpinner className="spin" /> : <FaSave />}
                  {editingNews ? " Update" : " Publish"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showEventModal && (
        <div className="modal-overlay" onClick={() => setShowEventModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editingEvent ? "Edit Event" : "Add New Event"}</h2>
              <button onClick={() => setShowEventModal(false)}><FaTimes /></button>
            </div>
            <form onSubmit={handleEventSubmit}>
              <div className="modal-body">
                <div className="form-group">
                  <label>Event Title *</label>
                  <input type="text" placeholder="Enter event title" value={eventForm.title}
                    onChange={(e) => setEventForm({...eventForm, title: e.target.value, slug: generateSlug(e.target.value)})} required />
                </div>
                <div className="form-group">
                  <label>Short Description *</label>
                  <textarea placeholder="Brief description..." rows={2} value={eventForm.shortDescription}
                    onChange={(e) => setEventForm({...eventForm, shortDescription: e.target.value})} required />
                </div>
                <div className="form-group">
                  <label>Full Description *</label>
                  <textarea placeholder="Event description..." rows={5} value={eventForm.description}
                    onChange={(e) => setEventForm({...eventForm, description: e.target.value})} required />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Date *</label>
                    <input type="date" value={eventForm.eventDate}
                      onChange={(e) => setEventForm({...eventForm, eventDate: e.target.value})} required />
                  </div>
                  <div className="form-group">
                    <label>Status *</label>
                    <select value={eventForm.status} onChange={(e) => setEventForm({...eventForm, status: e.target.value as 'upcoming' | 'completed'})}>
                      <option value="upcoming">Upcoming</option>
                      <option value="completed">Completed</option>
                    </select>
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Location *</label>
                    <input type="text" placeholder="Event location" value={eventForm.location}
                      onChange={(e) => setEventForm({...eventForm, location: e.target.value})} required />
                  </div>
                  <div className="form-group">
                    <label>Organizer</label>
                    <input type="text" placeholder="Organizer name" value={eventForm.organizer}
                      onChange={(e) => setEventForm({...eventForm, organizer: e.target.value})} />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Slug</label>
                    <input type="text" placeholder="url-slug" value={eventForm.slug}
                      onChange={(e) => setEventForm({...eventForm, slug: e.target.value})} />
                  </div>
                  <div className="form-group">
                    <label>Attendees</label>
                    <input type="number" placeholder="0" value={eventForm.attendees}
                      onChange={(e) => setEventForm({...eventForm, attendees: e.target.value})} />
                  </div>
                </div>
                <div className="form-group">
                  <label>Main Image URL *</label>
                  <input type="url" placeholder="https://example.com/image.jpg" value={eventForm.mainImage}
                    onChange={(e) => setEventForm({...eventForm, mainImage: e.target.value})} required />
                </div>
                <div className="form-group">
                  <label>Gallery Images (comma separated URLs)</label>
                  <textarea placeholder="https://image1.jpg, https://image2.jpg" rows={2} value={eventForm.galleryImages}
                    onChange={(e) => setEventForm({...eventForm, galleryImages: e.target.value})} />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn-secondary" onClick={() => setShowEventModal(false)}>Cancel</button>
                <button type="submit" className="btn-primary" disabled={loading}>
                  {loading ? <FaSpinner className="spin" /> : <FaSave />}
                  {editingEvent ? " Update" : " Create Event"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showGalleryModal && (
        <div className="modal-overlay" onClick={() => setShowGalleryModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editingGallery ? "Edit Image" : "Add New Image"}</h2>
              <button onClick={() => setShowGalleryModal(false)}><FaTimes /></button>
            </div>
            <form onSubmit={handleGallerySubmit}>
              <div className="modal-body">
                <div className="form-group">
                  <label>Title *</label>
                  <input type="text" placeholder="Image title" value={galleryForm.title}
                    onChange={(e) => setGalleryForm({...galleryForm, title: e.target.value})} required />
                </div>
                <div className="form-group">
                  <label>Description</label>
                  <textarea placeholder="Image description..." rows={3} value={galleryForm.description}
                    onChange={(e) => setGalleryForm({...galleryForm, description: e.target.value})} />
                </div>
                <div className="form-group">
                  <label>Image URL *</label>
                  <input type="url" placeholder="https://example.com/image.jpg" value={galleryForm.imageUrl}
                    onChange={(e) => setGalleryForm({...galleryForm, imageUrl: e.target.value})} required />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Category</label>
                    <input type="text" placeholder="Category" value={galleryForm.category}
                      onChange={(e) => setGalleryForm({...galleryForm, category: e.target.value})} />
                  </div>
                  <div className="form-group">
                    <label>Event</label>
                    <input type="text" placeholder="Related event" value={galleryForm.event}
                      onChange={(e) => setGalleryForm({...galleryForm, event: e.target.value})} />
                  </div>
                </div>
                <div className="form-group">
                  <label>Tags (comma separated)</label>
                  <input type="text" placeholder="tag1, tag2, tag3" value={galleryForm.tags}
                    onChange={(e) => setGalleryForm({...galleryForm, tags: e.target.value})} />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Order</label>
                    <input type="number" placeholder="0" value={galleryForm.order}
                      onChange={(e) => setGalleryForm({...galleryForm, order: e.target.value})} />
                  </div>
                  <div className="form-group">
                    <label style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                      <input type="checkbox" checked={galleryForm.isVisible}
                        onChange={(e) => setGalleryForm({...galleryForm, isVisible: e.target.checked})} />
                      Visible
                    </label>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn-secondary" onClick={() => setShowGalleryModal(false)}>Cancel</button>
                <button type="submit" className="btn-primary" disabled={loading}>
                  {loading ? <FaSpinner className="spin" /> : <FaSave />}
                  {editingGallery ? " Update" : " Add Image"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showDeleteConfirm && (
        <div className="modal-overlay" onClick={() => setShowDeleteConfirm(null)}>
          <div className="modal-content" style={{ maxWidth: "400px" }} onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Confirm Delete</h2>
              <button onClick={() => setShowDeleteConfirm(null)}><FaTimes /></button>
            </div>
            <div className="modal-body">
              <p>Are you sure you want to delete this item? This action cannot be undone.</p>
            </div>
            <div className="modal-footer">
              <button className="btn-secondary" onClick={() => setShowDeleteConfirm(null)}>Cancel</button>
              <button className="btn-danger" onClick={handleDelete} disabled={loading}>
                {loading ? <FaSpinner className="spin" /> : <FaTrash />} Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}