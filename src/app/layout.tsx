import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter'
import "../app/globals.css";
import { AuthProvider } from '@/components/authentification/AuthContext';
import { useRouter } from 'next/router';
import { LoadingProvider } from "@/components/loading/loadingProvider";
import "/public/assets/css/style.css"
import "/public/assets/css/responsive.css"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Binabox",
  description: "We help you connect with your certual world.",
  icons: {
    icon: 'public/assets/images/logo/logo.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
    <html lang="en">
      <body className={inter.className}>
      <LoadingProvider>
      <AppRouterCacheProvider>
        {children}
      </AppRouterCacheProvider>
      </LoadingProvider>
        </body>
    </html>
    </AuthProvider>

  );
}
