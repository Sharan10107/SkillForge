import { Routes, Route } from 'react-router-dom';

import Home from '../pages/Home';
import About from '../pages/About';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import ForgotPassword from '../pages/ForgotPassword';
import ResetPassword from '../pages/ResetPassword';
import VerifyEmail from '../pages/VerifyEmail';
import ExploreProjects from '../pages/ExploreProjects';
import ProjectDetail from '../pages/ProjectDetail';
import PublicPortfolio from '../pages/PublicPortfolio';
import Contact from '../pages/Contact';
import FAQ from '../pages/FAQ';
import Privacy from '../pages/Privacy';
import Terms from '../pages/Terms';
import NotFound from '../pages/NotFound';

import DashboardLayout from '../components/layout/DashboardLayout';
import Dashboard from '../pages/Dashboard';
import MyProjects from '../pages/MyProjects';
import CreateProject from '../pages/CreateProject';
import EditProject from '../pages/EditProject';
import Bookmarks from '../pages/Bookmarks';
import Profile from '../pages/Profile';
import Settings from '../pages/Settings';
import Notifications from '../pages/Notifications';

import AdminDashboard from '../pages/admin/AdminDashboard';
import AdminUsers from '../pages/admin/AdminUsers';
import AdminProjects from '../pages/admin/AdminProjects';
import AdminReports from '../pages/admin/AdminReports';

import ProtectedRoute from '../components/auth/ProtectedRoute';

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/verify-email" element={<VerifyEmail />} />
      <Route path="/explore" element={<ExploreProjects />} />
      <Route path="/projects/:slug" element={<ProjectDetail />} />
      <Route path="/u/:slug" element={<PublicPortfolio />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/faq" element={<FAQ />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/terms" element={<Terms />} />

      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/settings" element={<Settings />} />

        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/projects" element={<MyProjects />} />
          <Route path="/dashboard/projects/new" element={<CreateProject />} />
          <Route path="/dashboard/projects/:id/edit" element={<EditProject />} />
          <Route path="/dashboard/bookmarks" element={<Bookmarks />} />
          <Route path="/dashboard/profile" element={<Profile />} />
        </Route>
      </Route>

      {/* Admin Routes */}
      <Route element={<ProtectedRoute adminOnly />}>
        <Route element={<DashboardLayout />}>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<AdminUsers />} />
          <Route path="/admin/projects" element={<AdminProjects />} />
          <Route path="/admin/reports" element={<AdminReports />} />
        </Route>
      </Route>

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}