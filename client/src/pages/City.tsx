/**
 * W Studio Lab — /city 占位页
 * 城市数字实验室
 */
import PlaceholderPage from "./PlaceholderPage";

export default function City() {
  return (
    <PlaceholderPage
      moduleId="city"
      title="城市数字实验室"
      subtitle="历史建筑与城市空间的数字化"
      description="浦东不可移动文物WebGIS可视化管理系统：241处文物空间分布、多维筛选、保护级别分析、Web-GIS交互。数据致谢 SJTU-IRCAHC。同时涵盖城市规划与GIS相关研究实践。"
      tags={["WebGIS", "Leaflet", "GIS", "Python", "空间分析", "文物保护"]}
      status="active"
      statusLabel="已有产出"
      externalLink="https://pudongviz-lsnmlvkw.manus.space/"
      externalLinkLabel="进入浦东文物 WebGIS 系统"
    />
  );
}
