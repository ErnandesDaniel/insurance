import type { ReactNode } from "react";
import clsx from "clsx";
import "./Page.css";

interface PageProps {
  children: ReactNode;
  className?: string;
}
const Page = ({ children, className }: PageProps) => {
  return <div className={clsx("page", className)}>{children}</div>;
};

export default Page;
