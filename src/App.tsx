import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { TriageProvider } from "@/context/TriageContext";
import Landing from "./pages/Landing";
import SymptomInput from "./pages/SymptomInput";
import FollowUp from "./pages/FollowUp";
import Results from "./pages/Results";
import History from "./pages/History";
import NotFound from "./pages/NotFound";
import Loading from "./pages/loading";
import LoadingAssessment from "./pages/loading-assesment";
import {CognitionField} from "./components/cognitionfiels";
import Navbar from "./components/navbar";
import {TrustBar} from "./components/trustbar";
const queryClient = new QueryClient();

export default function App() {
  return(
    <>
  
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <TriageProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/assess" element={<SymptomInput />} />
            <Route path="/loading" element={<Loading />} />
            <Route path="/follow-up" element={<FollowUp />} />
            <Route path="/results" element={<Results />} />
            <Route path="/loading-assessment" element={<LoadingAssessment />} />
            <Route path="/history" element={<History />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TriageProvider>
    </TooltipProvider>
  </QueryClientProvider>
  </>
  )
}

