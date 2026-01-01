import { Icon } from "@iconify/react";
import { useAuth } from "@/hooks/useAuth";
import Login from "@/pages/Login";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background">
        <Icon
          icon="line-md:loading-twotone-loop"
          className="size-12 text-foreground"
        />
      </div>
    );
  }

  if (!user) {
    return <Login />
  }

  return <>{children}</>;
}
