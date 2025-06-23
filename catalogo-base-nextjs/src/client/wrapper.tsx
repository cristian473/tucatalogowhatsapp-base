'use client'
import { ReduxProvider } from "@/redux/provider";

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  return (
    <ReduxProvider>
      {children}
    </ReduxProvider>
  )
}