"use client";

import { ReactNode, useEffect, useState } from "react";
import { Spinner } from "./ui/spinner";

interface NoSSRProps {
  children: ReactNode;
  fallback?: ReactNode;
}

export default function NoSSR({ children, fallback = null }: NoSSRProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Before hydration is complete, render the fallback (or nothing)
  if (!isMounted) {
    return (
      fallback || (
        <div className="flex min-h-screen w-full items-center justify-center">
          <Spinner className="size-9" />
        </div>
      )
    );
  }

  // After hydration, render the actual content
  return <>{children}</>;
}
