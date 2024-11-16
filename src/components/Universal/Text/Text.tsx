import type { ReactNode } from "react";

interface TextProps {
  children: ReactNode;
  fontSize?: number;
  className?: string;
}
const Text = ({ children, fontSize, className }: TextProps) => {
  return (
    <div
      style={{
        fontSize: fontSize,
        fontFamily:
          "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,'Noto Sans',sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol','Noto Color Emoji'",
      }}
      className={className}
    >
      {children}
    </div>
  );
};

export default Text;
