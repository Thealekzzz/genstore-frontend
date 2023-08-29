import React, { useState, useRef, useEffect } from "react";

import styles from "./ExpandableContent.module.css";
import plusIcon from "./imgs/plus.svg";

function ExpandableContent({ title, children, titleItem, isExpandable=true, style }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const contentRef = useRef(null);

  const toggleExpand = () => {
    if (isExpandable) {
      setIsExpanded(!isExpanded);

    }
  };

  const getContentHeight = () => {
    return contentRef.current.scrollHeight;
  };

  useEffect(() => {
    setIsExpanded(false);
  }, [isExpandable])

  return (
    <div 
      className={`${styles.Content} ${isExpanded && styles.ContentExpanded}`}
      style={{...style}}
    >
      <div className={styles.ContentHeader} onClick={toggleExpand}>
        <div className={styles.ContentTitle}>
          {title ? title : titleItem}
        </div>

        <img 
          src={plusIcon}
          className={styles.ContentIcon} 
          width={16} 
          alt="" 
          style={{transform: `rotateZ(${isExpanded ? "45deg" : "0"})`}}
        />

      </div>
      <div
        ref={contentRef}
        className={`${styles.ContentInner} ${
          isExpanded ? styles.ContentInnerExpanded : ""
        }`}
        style={{
          maxHeight: isExpanded ? `${getContentHeight()}px` : "0",
        }}
      >
        {children}
      </div>
    </div>
  );
}

export default ExpandableContent;