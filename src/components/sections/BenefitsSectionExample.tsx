// Example implementation of BenefitsSection in your page
import React from "react";
import BenefitsSection from "@/components/sections/BenefitsSection";
import { GearIcon, FactoryIcon } from "@/components/icons/BasicIcons";
import CssAnimatedIcons from "@/components/icons/CssAnimatedIcons";

export default function HomeBenefits() {
  const benefits = [
    {
      id: "efficiency",
      icon: <GearIcon size={32} />,
      title: "Tối ưu hóa hiệu suất",
      description:
        "Giảm thiểu thời gian chết, tăng năng suất và giảm chi phí vận hành thông qua các quy trình tự động hóa và được tối ưu hóa.",
      linkText: "Tìm hiểu giải pháp",
      linkHref: "/services/optimization",
      accentColor: "var(--color-primary)",
    },
    {
      id: "quality",
      icon: (
        <CssAnimatedIcons.WashingMachine
          size={32}
          color="currentColor"
          secondaryColor="var(--color-accent)"
        />
      ),
      title: "Công nghệ giặt tiên tiến",
      description:
        "Đảm bảo chất lượng sản phẩm nhất quán thông qua kiểm soát quy trình nghiêm ngặt và thiết bị hiện đại.",
      linkText: "Xem công nghệ của chúng tôi",
      linkHref: "/services/quality-control",
      accentColor: "var(--color-accent)",
    },
    {
      id: "analytics",
      icon: (
        <CssAnimatedIcons.DataAnalytics
          size={32}
          color="currentColor"
          secondaryColor="var(--color-secondary)"
        />
      ),
      title: "Phân tích dữ liệu thông minh",
      description:
        "Thu thập và phân tích dữ liệu từ quy trình sản xuất để tối ưu hóa liên tục và dự đoán nhu cầu trong tương lai.",
      linkText: "Khám phá analytics",
      linkHref: "/services/analytics",
      accentColor: "var(--color-secondary)",
    },
    {
      id: "manufacturing",
      icon: (
        <CssAnimatedIcons.SewingMachine
          size={32}
          color="currentColor"
          secondaryColor="var(--color-accent)"
        />
      ),
      title: "May mặc công nghiệp",
      description:
        "Dây chuyền sản xuất may mặc hiện đại với công nghệ tự động hóa giúp tăng năng suất và độ chính xác.",
      linkText: "Giải pháp may mặc",
      linkHref: "/services/manufacturing",
      accentColor: "var(--color-accent)",
    },
    {
      id: "sustainability",
      icon: (
        <CssAnimatedIcons.Sustainability
          size={32}
          color="currentColor"
          secondaryColor="var(--color-secondary)"
        />
      ),
      title: "Giải pháp bền vững",
      description:
        "Giảm tác động môi trường thông qua các quy trình tối ưu hóa hiệu quả năng lượng và quản lý chất thải.",
      linkText: "Cam kết xanh của chúng tôi",
      linkHref: "/about/sustainability",
      accentColor: "var(--color-secondary)",
    },
    {
      id: "scale",
      icon: <FactoryIcon size={32} />,
      title: "Khả năng mở rộng",
      description:
        "Giải pháp linh hoạt phù hợp với mọi quy mô doanh nghiệp, dễ dàng mở rộng theo nhu cầu tăng trưởng của bạn.",
      linkText: "Quy mô giải pháp",
      linkHref: "/services/scalability",
      accentColor: "var(--color-primary)",
    },
  ];

  return (
    <BenefitsSection
      title="Tại sao doanh nghiệp tin chọn TextileTech?"
      subtitle="Chúng tôi cung cấp giải pháp toàn diện giúp doanh nghiệp của bạn tối ưu hoá quy trình, nâng cao chất lượng và tăng lợi nhuận."
      benefits={benefits}
      showConnectors={true}
      motionIntensity="medium"
      className="bg-background-light"
    />
  );
}
