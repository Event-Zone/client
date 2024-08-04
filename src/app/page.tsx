import Home from "./components/Home";
import Navbar from "./components/shared/Navbar";

export default function Main() {
  return (
    <main className="flex  min-h-screen flex-col  ">
      <Navbar />
      <Home />
    </main>
  );
}
