import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import WebinarV7 from "./pages/WebinarV7.tsx";
import JornadaAutonomia from "./pages/JornadaAutonomia.tsx";
import FsscV7 from "./pages/FsscV7.tsx";
import Korin360 from "./pages/Korin360.tsx";
import MyTS360 from "./pages/MyTS360.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/webinar-v7" element={<WebinarV7 />} />
            <Route path="/jornada-autonomia" element={<JornadaAutonomia />} />
            <Route path="/fssc-v7" element={<FsscV7 />} />
            <Route path="/korin-360" element={<Korin360 />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;
