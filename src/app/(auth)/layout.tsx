import ThemeToggler from "@/components/theme-toggler";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-[100vh] flex items-center justify-center relative">
      <div className="absolute bottom-5 right-0">
        <ThemeToggler className="" />
      </div>
      {children}
    </div>
  );
};

export default AuthLayout;