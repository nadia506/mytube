import { Outlet } from "react-router";
import SearchHeader from "./components/SearchHeader";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import { YoutubeApiProvider } from "./context/YoutubeApiContext";
import { DarkModeProvider } from "./context/DarkModeContext";

const queryClient = new QueryClient();
function App() {
  return (
    <DarkModeProvider>
      <SearchHeader></SearchHeader>
      <YoutubeApiProvider>
        <QueryClientProvider client={queryClient}>
          <Outlet></Outlet>
        </QueryClientProvider>
      </YoutubeApiProvider>
    </DarkModeProvider>
  );
}

export default App;
