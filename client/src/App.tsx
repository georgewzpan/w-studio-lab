/**
 * W Studio Lab — App Router
 * Routes: / | /weather | /energy | /env | /city | /works | /notes
 */
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Weather from "./pages/Weather";
import Energy from "./pages/Energy";
import Env from "./pages/Env";
import City from "./pages/City";
import Works from "./pages/Works";
import Notes from "./pages/Notes";
import ShareWeather from "./pages/ShareWeather";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/weather" component={Weather} />
      <Route path="/energy" component={Energy} />
      <Route path="/env" component={Env} />
      <Route path="/city" component={City} />
      <Route path="/works" component={Works} />
      <Route path="/notes" component={Notes} />
      <Route path="/share/weather" component={ShareWeather} />
      <Route path="/404" component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      {/* defaultTheme="dark" matches Theme A (黑金) CSS variables */}
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
