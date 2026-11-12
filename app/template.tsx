import { RouteReady } from "@/components/route-ready";

export default function Template({ children }: { children: React.ReactNode }) {
  return <><RouteReady />{children}</>;
}
