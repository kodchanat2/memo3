import { Icon } from "@iconify/react";
import { useAuth } from "@/hooks/useAuth";
import Login from "@/pages/Login";
import AITextLoading from "../kokonutui/ai-text-loading";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex flex-col h-screen w-full items-center justify-center bg-background">
        <Icon
          icon="line-md:loading-twotone-loop"
          className="size-12 text-foreground"
        />
        <AITextLoading texts={["Loading...", "Almost there..."]} />
      </div>
    );
  }

  if (!user) {
    return <Login />
  }

  return <>{children}</>;
}
