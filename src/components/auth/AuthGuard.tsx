import { Icon } from "@iconify/react";
import { useAuth } from "@/hooks/useAuth";
import Login from "@/pages/Login";
import AITextLoading from "../kokonutui/ai-text-loading";
import { AnimatePresence, motion } from "motion/react";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  return (
    <AnimatePresence mode="wait" >
      <motion.div
        key={loading ? "loading" : "content"}
        initial={{ opacity: 1, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, }}
        transition={{ duration: 0.3 }}
        className="w-full"
      >
        {loading ? <LoadingMask /> : !user ? <Login /> : children}
      </motion.div>
    </AnimatePresence>
  )
}

function LoadingMask() {
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