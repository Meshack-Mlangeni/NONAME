/* eslint-disable @typescript-eslint/no-explicit-any */
import { Divider, Typography, TypographySystem } from "@mui/joy";
import { ReactNode } from "react";

interface ISubSection {
  children?: ReactNode;
  hasDivider?: boolean;
  icon: any;
  size: keyof TypographySystem | "inherit" | undefined;
  title: string;
  discr: string;
}

export default function SubSection({
  children,
  hasDivider = false,
  icon,
  title,
  discr,
  size,
}: ISubSection) {
  return (
    <div style={{}}>
      <Typography level={size} sx={{ fontWeight: "700" }}>
        {icon}
        {title}
      </Typography>
      {discr && <Typography level="title-md">{discr}</Typography>}
      {hasDivider && <Divider sx={{ mt: 2, mb: 2 }} />}
      {children}
    </div>
  );
}
