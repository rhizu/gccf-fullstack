"use client";

import { useState, useEffect, useCallback } from "react";
import {
  FaUsers,
  FaNewspaper,
  FaCalendarAlt,
  FaImages,
  FaDownload,
  FaFilter,
  FaSpinner,
  FaChartLine,
  FaChartBar,
  FaClock,
  FaCheck,
  FaBan,
  FaHourglassHalf,
} from "react-icons/fa";
import "./analytics.css";
import {
  analyticsApi,
  DashboardStats,
  MemberGrowthData,
  ActivityItem,
  EventStats,
  NewsActivity,
  MembershipByRange,
} from "@/lib/api";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend,
  AreaChart,
  Area,
} from "recharts";

type DatePreset = "7days" | "30days" | "90days" | "custom";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8", "#82ca9d"];

export default function AnalyticsPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [datePreset, setDatePreset] = useState<DatePreset>("30days");
  const [customStartDate, setCustomStartDate] = useState("");
  const [customEndDate, setCustomEndDate] = useState("");
  const [exporting, setExporting] = useState<string | null>(null);

  const [dashboardStats, setDashboardStats] = useState<DashboardStats | null>(null);
  const [memberGrowthData, setMemberGrowthData] = useState<MemberGrowthData[]>([]);
  const [eventStats, setEventStats] = useState<EventStats | null>(null);
  const [newsActivity, setNewsActivity] = useState<NewsActivity | null>(null);
  const [membershipStats, setMembershipStats] = useState<MembershipByRange | null>(null);
  const [recentActivity, setRecentActivity] = useState<ActivityItem[]>([]);

  const getDateRange = useCallback(() => {
    const now = new Date();
    let start: Date;
    let end: Date = now;

    switch (datePreset) {
      case "7days":
        start = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      case "30days":
        start = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        break;
      case "90days":
        start = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
        break;
      case "custom":
        start = customStartDate ? new Date(customStartDate) : new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        end = customEndDate ? new Date(customEndDate) : now;
        break;
      default:
        start = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    }

    return {
      startDate: start.toISOString().split("T")[0],
      endDate: end.toISOString().split("T")[0],
    };
  }, [datePreset, customStartDate, customEndDate]);

  const fetchAnalytics = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { startDate, endDate } = getDateRange();

      const [
        stats,
        memberGrowth,
        eventData,
        newsData,
        membershipData,
        activity,
      ] = await Promise.all([
        analyticsApi.getDashboardStats(),
        analyticsApi.getMemberGrowth(datePreset === "7days" ? 7 : datePreset === "30days" ? 30 : 90),
        analyticsApi.getEventStats(startDate, endDate),
        analyticsApi.getNewsActivity(startDate, endDate),
        analyticsApi.getMembershipByRange(startDate, endDate),
        analyticsApi.getRecentActivity(15),
      ]);

      setDashboardStats(stats);
      setMemberGrowthData(memberGrowth);
      setEventStats(eventData);
      setNewsActivity(newsData);
      setMembershipStats(membershipData);
      setRecentActivity(activity);
    } catch (err) {
      setError("Failed to load analytics. Please check if the backend is running.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [getDateRange, datePreset]);

  useEffect(() => {
    fetchAnalytics();
  }, [fetchAnalytics]);

  const handleExport = async (type: "members" | "events" | "news") => {
    setExporting(type);
    try {
      const { startDate, endDate } = getDateRange();
      const data = await analyticsApi.exportData(type, startDate, endDate);

      const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${type}-report-${startDate}-to-${endDate}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Export failed:", err);
    } finally {
      setExporting(null);
    }
  };

  const getRelativeTime = (date: Date | string) => {
    const now = new Date();
    const then = new Date(date);
    const diff = now.getTime() - then.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return "Just now";
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return then.toLocaleDateString();
  };

  const membershipPieData = membershipStats?.byStatus.map((s) => ({
    name: s.status.charAt(0).toUpperCase() + s.status.slice(1),
    value: s.count,
  })) || [];

  const eventPieData = eventStats
    ? [
        { name: "Upcoming", value: eventStats.upcoming },
        { name: "Completed", value: eventStats.completed },
      ]
    : [];

  const combinedGrowthData = memberGrowthData.map((m) => ({
    date: m.date,
    members: m.members,
    newMembers: m.newMembers,
  }));

  if (loading) {
    return (
      <div className="analytics-loading">
        <FaSpinner className="spin" style={{ fontSize: "2rem" }} />
        <p>Loading analytics...</p>
      </div>
    );
  }

  return (
    <div className="analytics-page">
      <div className="analytics-header">
        <div>
          <h1>Analytics Dashboard</h1>
          <p>Comprehensive insights into your community and content</p>
        </div>
        <div className="export-buttons">
          <button
            className="export-btn"
            onClick={() => handleExport("members")}
            disabled={!!exporting}
          >
            <FaDownload />
            {exporting === "members" ? " Exporting..." : " Members"}
          </button>
          <button
            className="export-btn"
            onClick={() => handleExport("events")}
            disabled={!!exporting}
          >
            <FaDownload />
            {exporting === "events" ? " Exporting..." : " Events"}
          </button>
          <button
            className="export-btn"
            onClick={() => handleExport("news")}
            disabled={!!exporting}
          >
            <FaDownload />
            {exporting === "news" ? " Exporting..." : " News"}
          </button>
        </div>
      </div>

      {error && <div className="analytics-error">{error}</div>}

      <div className="date-filter-bar">
        <div className="filter-group">
          <FaFilter />
          <label>Date Range:</label>
          <select
            value={datePreset}
            onChange={(e) => setDatePreset(e.target.value as DatePreset)}
          >
            <option value="7days">Last 7 Days</option>
            <option value="30days">Last 30 Days</option>
            <option value="90days">Last 90 Days</option>
            <option value="custom">Custom Range</option>
          </select>
        </div>
        {datePreset === "custom" && (
          <div className="custom-dates">
            <input
              type="date"
              value={customStartDate}
              onChange={(e) => setCustomStartDate(e.target.value)}
            />
            <span>to</span>
            <input
              type="date"
              value={customEndDate}
              onChange={(e) => setCustomEndDate(e.target.value)}
            />
          </div>
        )}
      </div>

      <div className="stats-overview">
        <div className="overview-card">
          <div className="overview-icon blue">
            <FaUsers />
          </div>
          <div className="overview-content">
            <h3>{dashboardStats?.totalMembers || 0}</h3>
            <p>Total Members</p>
            <span className={`trend ${(dashboardStats?.monthGrowth || 0) >= 0 ? "positive" : "negative"}`}>
              {dashboardStats?.monthGrowth || 0}% this month
            </span>
          </div>
        </div>
        <div className="overview-card">
          <div className="overview-icon green">
            <FaCalendarAlt />
          </div>
          <div className="overview-content">
            <h3>{eventStats?.total || 0}</h3>
            <p>Total Events</p>
            <span className="trend">
              {eventStats?.upcoming || 0} upcoming
            </span>
          </div>
        </div>
        <div className="overview-card">
          <div className="overview-icon orange">
            <FaNewspaper />
          </div>
          <div className="overview-content">
            <h3>{newsActivity?.total || 0}</h3>
            <p>Articles Published</p>
            <span className="trend">
              {newsActivity?.byCategory.length || 0} categories
            </span>
          </div>
        </div>
        <div className="overview-card">
          <div className="overview-icon purple">
            <FaImages />
          </div>
          <div className="overview-content">
            <h3>{dashboardStats?.totalGallery || 0}</h3>
            <p>Gallery Items</p>
            <span className="trend">
              {dashboardStats?.pendingMembers || 0} pending
            </span>
          </div>
        </div>
      </div>

      <div className="charts-grid-2col">
        <div className="chart-card full-width">
          <div className="chart-header">
            <h3>
              <FaChartLine /> Member Growth
            </h3>
          </div>
          <div className="chart-body">
            {combinedGrowthData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={combinedGrowthData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                  <XAxis
                    dataKey="date"
                    tick={{ fontSize: 11 }}
                    tickFormatter={(value) =>
                      new Date(value).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })
                    }
                  />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip
                    contentStyle={{
                      borderRadius: "8px",
                      border: "none",
                      boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                    }}
                    formatter={(value) => [value as number, "Members"]}
                    labelFormatter={(label) =>
                      new Date(label).toLocaleDateString()
                    }
                  />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="members"
                    stroke="#2196f3"
                    fill="#2196f3"
                    fillOpacity={0.2}
                    name="Total Members"
                  />
                  <Area
                    type="monotone"
                    dataKey="newMembers"
                    stroke="#4caf50"
                    fill="#4caf50"
                    fillOpacity={0.2}
                    name="New Members"
                  />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div className="no-data">No membership data available</div>
            )}
          </div>
        </div>

        <div className="chart-card">
          <div className="chart-header">
            <h3>
              <FaChartBar /> Membership Status
            </h3>
          </div>
          <div className="chart-body">
            {membershipPieData.length > 0 ? (
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={membershipPieData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                    label={({ name, percent }) =>
                      `${name}: ${((percent || 0) * 100).toFixed(0)}%`
                    }
                  >
                    {membershipPieData.map((_, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={
                          COLORS[index % COLORS.length]
                        }
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="no-data">No membership data</div>
            )}
          </div>
        </div>

        <div className="chart-card">
          <div className="chart-header">
            <h3>
              <FaChartBar /> Event Status
            </h3>
          </div>
          <div className="chart-body">
            {eventPieData.some((d) => d.value > 0) ? (
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={eventPieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    dataKey="value"
                    label={({ name, percent }) =>
                      `${name}: ${((percent || 0) * 100).toFixed(0)}%`
                    }
                  >
                    <Cell fill="#4caf50" />
                    <Cell fill="#ff9800" />
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="no-data">No event data</div>
            )}
          </div>
        </div>

        <div className="chart-card full-width">
          <div className="chart-header">
            <h3>
              <FaChartBar /> News by Category
            </h3>
          </div>
          <div className="chart-body">
            {newsActivity?.byCategory && newsActivity.byCategory.length > 0 ? (
              <ResponsiveContainer width="100%" height={250}>
                <BarChart
                  data={newsActivity.byCategory}
                  layout="vertical"
                  margin={{ left: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                  <XAxis type="number" tick={{ fontSize: 11 }} />
                  <YAxis
                    type="category"
                    dataKey="category"
                    tick={{ fontSize: 11 }}
                    width={100}
                  />
                  <Tooltip
                    contentStyle={{
                      borderRadius: "8px",
                      border: "none",
                      boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                    }}
                  />
                  <Bar dataKey="count" fill="#8884d8" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="no-data">No news data available</div>
            )}
          </div>
        </div>
      </div>

      <div className="activity-section-full">
        <div className="section-header">
          <h3>
            <FaClock /> Recent Activity
          </h3>
        </div>
        <div className="activity-feed">
          {recentActivity.length > 0 ? (
            recentActivity.map((activity, index) => (
              <div key={index} className="activity-row">
                <div
                  className={`activity-type-icon ${
                    activity.type === "member"
                      ? "blue"
                      : activity.type === "news"
                      ? "green"
                      : "orange"
                  }`}
                >
                  {activity.type === "member" ? (
                    <FaUsers />
                  ) : activity.type === "news" ? (
                    <FaNewspaper />
                  ) : (
                    <FaCalendarAlt />
                  )}
                </div>
                <div className="activity-details">
                  <p className="activity-title">{activity.title}</p>
                  <p className="activity-action">{activity.action}</p>
                </div>
                <div className="activity-time">
                  {getRelativeTime(activity.timestamp)}
                </div>
              </div>
            ))
          ) : (
            <div className="no-data">No recent activity</div>
          )}
        </div>
      </div>
    </div>
  );
}
