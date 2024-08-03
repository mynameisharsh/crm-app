import { ThemedLayoutV2, ThemedTitleV2 } from "@refinedev/antd"
import React from "react";
import Header from "./Header";

const Layout = ({ children }) => {
  return (
    <ThemedLayoutV2
      Header={Header}
      Title={(props) => <ThemedTitleV2 {...props} text="Refine" />}
    >
      {children}
    </ThemedLayoutV2>
  )
}

export default Layout;