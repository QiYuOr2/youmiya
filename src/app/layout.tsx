import type { Metadata } from "next";
import "./globals.css";



export const metadata: Metadata = {
  title: "羊宫妃那集合 | 非公式",
  description: "羊宫妃那杂谈、相片、个人信息等",
};

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html>
      <body
      >
        {children}
      </body>
    </html>
  );
}
