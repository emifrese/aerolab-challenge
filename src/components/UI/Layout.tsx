import React from "react";

import styles from "../../App/App.module.scss";

const Layout: React.FC = ({children}) => {
  return <div className={styles.container}>{children}</div>;
};

export default Layout;
