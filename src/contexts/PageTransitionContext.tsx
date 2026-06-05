import { createContext, useContext, useState, ReactNode } from "react";
import { useNavigate } from "react-router-dom";

type Phase = "idle" | "covering" | "revealing";

interface TransitionContextValue {
  phase: Phase;
  transitionTo: (to: string) => void;
}

const TransitionContext = createContext<TransitionContextValue>({
  phase: "idle",
  transitionTo: () => {},
});

export const usePageTransition = () => useContext(TransitionContext);

export const PageTransitionProvider = ({ children }: { children: ReactNode }) => {
  const [phase, setPhase] = useState<Phase>("idle");
  const navigate = useNavigate();

  const transitionTo = (to: string) => {
    if (phase !== "idle") return;
    setPhase("covering");
    setTimeout(() => {
      navigate(to);
      window.scrollTo({ top: 0, behavior: "auto" });
      setTimeout(() => {
        setPhase("revealing");
        setTimeout(() => setPhase("idle"), 520);
      }, 60);
    }, 340);
  };

  return (
    <TransitionContext.Provider value={{ phase, transitionTo }}>
      {children}
    </TransitionContext.Provider>
  );
};
