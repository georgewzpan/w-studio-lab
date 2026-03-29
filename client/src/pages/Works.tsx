/**
 * W Studio Lab — /works 占位页
 * 工程AI作品集（脱敏展示）
 */
import PlaceholderPage from "./PlaceholderPage";

export default function Works() {
  return (
    <PlaceholderPage
      moduleId="works"
      title="工程AI作品集"
      subtitle="从招投标到客服的AI全栈实践"
      description="职务作品脱敏展示，仅限技术架构与功能说明。包含：BidMaster AI（AI辅助投标全栈平台，TypeScript前后端 + AI Agent，面向某检测机构）；UTIC客服中心（AI增强型服务门户，本地知识库 + Dify外挂，14530条数据零延迟检索）。"
      tags={["TypeScript全栈", "Claude API", "Dify", "阿里云ECS", "FastAPI", "AI Agent"]}
      status="active"
      statusLabel="已有产出"
    />
  );
}
