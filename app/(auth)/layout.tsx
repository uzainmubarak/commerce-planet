import React from "react";
type Props = {
  children: React.ReactNode;
};

const AuthLayout: React.FC<Props> = ({ children }) => {
  return (
    <div className="flex items-center justify-center h-[100dvh]">
      {children}
    </div>
  );
};

export default AuthLayout;
