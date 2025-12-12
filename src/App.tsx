import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Index from "./pages/Index";
import Equipment from "./pages/Equipment";
import EquipmentDetail from "./pages/EquipmentDetail";
import SolutionDetail from "./pages/SolutionDetail";
import ProjectDetail from "./pages/ProjectDetail";
import Projects from "./pages/Projects";
import News from "./pages/News";
import NewsDetail from "./pages/NewsDetail";
import About from "./pages/About";
import Contacts from "./pages/Contacts";
import Services from "./pages/Services";
import NotFound from "./pages/NotFound";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminLayout from "./components/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminNews from "./pages/admin/AdminNews";
import AdminEquipmentGroups from "./pages/admin/AdminEquipmentGroups";
import AdminEquipment from "./pages/admin/AdminEquipment";
import AdminSolutions from "./pages/admin/AdminSolutions";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/equipment" element={<Equipment />} />
              <Route path="/equipment/:id" element={<EquipmentDetail />} />
              <Route path="/solution/:id" element={<SolutionDetail />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/projects/:id" element={<ProjectDetail />} />
              <Route path="/news" element={<News />} />
              <Route path="/news/:id" element={<NewsDetail />} />
              <Route path="/about" element={<About />} />
              <Route path="/contacts" element={<Contacts />} />
              <Route path="/services" element={<Services />} />
              <Route path="/services/:id" element={<Services />} />
              {/* Admin routes */}
              <Route path="/admin" element={<AdminLogin />} />
              <Route path="/admin" element={<AdminLayout />}>
                <Route path="dashboard" element={<AdminDashboard />} />
                <Route path="news" element={<AdminNews />} />
                <Route path="equipment-groups" element={<AdminEquipmentGroups />} />
                <Route path="equipment" element={<AdminEquipment />} />
                <Route path="solutions" element={<AdminSolutions />} />
              </Route>
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
