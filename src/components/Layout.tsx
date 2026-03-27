import Navbar from "@/components/Navbar";
import FooterCanigo from "@/components/FooterCanigo";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen gradient-dark flex flex-col">
      <Navbar />
      <main className="flex-1 pt-16">{children}</main>
      <FooterCanigo />
    </div>
  );
};

export default Layout;
