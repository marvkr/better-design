import { Navbar } from "@/modules/home/ui/components/navbar";

interface Props {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <main className="flex flex-col min-h-screen">
      <Navbar />

      <div className="flex-1 flex flex-col justify-center px-4 pb-4">
        {children}
      </div>
    </main>
  );
};

export default Layout;
