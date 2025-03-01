
import Navbar from "@/components/shared/Navbar";

const CommonLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      <main className=" w-[90%] mx-auto">{children}</main>
    
    </>
  );
};

export default CommonLayout;
