
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Diagnostic from "./pages/Diagnostic";
import Results from "./pages/Results";
import Development from "./pages/Development";
import ProfileNew from "./pages/ProfileNew";
import Career from "./pages/Career";
import Resources from "./pages/Resources";
import Registration from "./pages/Registration";
import AvatarSelection from "./pages/AvatarSelection";
import NotFound from "./pages/NotFound";
import AIAssistant from "./components/AIAssistant";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/avatar-selection" element={<AvatarSelection />} />
          <Route path="/diagnostic" element={<Diagnostic />} />
          <Route path="/results" element={<Results />} />
          <Route path="/development" element={<Development />} />
          <Route path="/career" element={<Career />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/profile" element={<ProfileNew />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <AIAssistant />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;