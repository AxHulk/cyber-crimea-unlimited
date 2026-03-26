import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import Tournaments from "./pages/Tournaments.tsx";
import News from "./pages/News.tsx";
import About from "./pages/About.tsx";
import Arena from "./pages/Arena.tsx";
import Ratings from "./pages/Ratings.tsx";
import MediaHub from "./pages/MediaHub.tsx";
import Infrastructure from "./pages/Infrastructure.tsx";
import Auth from "./pages/Auth.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import B2B from "./pages/B2B.tsx";
import Article from "./pages/Article.tsx";
import VodArchive from "./pages/VodArchive.tsx";
import Gallery from "./pages/Gallery.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/tournaments" element={<Tournaments />} />
          <Route path="/news" element={<News />} />
          <Route path="/about" element={<About />} />
          <Route path="/arena" element={<Arena />} />
          <Route path="/ratings" element={<Ratings />} />
          <Route path="/media-hub" element={<MediaHub />} />
          <Route path="/media-hub/vod" element={<VodArchive />} />
          <Route path="/media-hub/gallery/:galleryId" element={<Gallery />} />
          <Route path="/media-hub/:id" element={<Article />} />
          <Route path="/infrastructure" element={<Infrastructure />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/b2b" element={<B2B />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
