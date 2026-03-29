/**
 * W Studio Lab — /energy 占位页
 * 能碳与新能源
 */
import PlaceholderPage from "./PlaceholderPage";

export default function Energy() {
  return (
    <PlaceholderPage
      moduleId="energy"
      title="能碳与新能源"
      subtitle="WRF+AI精细化光伏功率预测系统"
      description="基于WRF区域气象模式与AI偏差订正技术，针对江苏常州分布式光伏场景，聚焦双细则考核痛点，构建精细化光伏功率预测系统。同时涵盖碳管理平台技术架构展示与双碳信息化实践记录。"
      tags={["WRF", "ERA5", "XGBoost", "PVLib", "FastAPI", "Vue"]}
      status="dev"
      statusLabel="开发中"
      comingSoonNote="光伏预测系统目前在开发中，预计接入WRF区域模式 + AI偏差订正模块。完成后将展示精度对比、功率曲线预测与双细则考核分析。"
    />
  );
}
