import React, { useState } from 'react';
import OriginalDocSidebar from '@theme-original/DocSidebar';
import { useLocation } from '@docusaurus/router';
import { useActiveDocContext } from '@docusaurus/plugin-content-docs/client';

export default function DocSidebarWrapper(props) {
  const location = useLocation();
  const { activeDoc } = useActiveDocContext();
  const [expandedSections, setExpandedSections] = useState({});

  const toggleSection = (sectionId) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  // 获取当前文档的 TOC
  const currentDocTOC = activeDoc?.toc || [];

  return (
    <div className="custom-sidebar-wrapper">
      <OriginalDocSidebar {...props} />
      
      {/* 在侧边栏底部添加当前页面的目录 */}
      {currentDocTOC.length > 0 && (
        <div className="doc-toc-in-sidebar">
          <div className="toc-title">📑 本页目录</div>
          {currentDocTOC.map((item) => (
            <div key={item.id} className="toc-item">
              <a 
                href={`#${item.id}`}
                className={`toc-link level-${item.level}`}
              >
                {item.value}
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}