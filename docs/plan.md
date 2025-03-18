# ĐIỀU CHỈNH LỘ TRÌNH XÂY DỰNG LANDING PAGE B2B NGÀNH MAY MẶC

1. **Tách hệ thống tracking**: Sẽ tạo kế hoạch riêng cho tracking và analytics.

## LỘ TRÌNH ĐIỀU CHỈNH VỚI TĂNG CƯỜNG UI/UX

### GIAI ĐOẠN 1: KHỞI TẠO DỰ ÁN & THIẾT LẬP DESIGN SYSTEM

#### Task 1.1: Tạo dự án NextJS 15 với TypeScript

**Prompt cho AI:**

```
Tôi cần tạo một landing page B2B cho ngành may mặc sử dụng NextJS 15, React 19 và Tailwind CSS 4. Hãy giúp tôi:
1. Tạo dự án mới với cấu trúc thư mục hiệu quả
2. Cài đặt các dependencies cần thiết
3. Thiết lập Tailwind CSS với theme extension
4. Cấu hình ESLint và Prettier
5. Tạo cấu trúc thư mục theo chuẩn NextJS App Router

Vui lòng chỉ hướng dẫn các lệnh cần chạy và file cấu hình cần tạo, không bao gồm code thực tế của các pages hoặc components.
```

#### Task 1.2: Thiết lập design system tăng cường

**Prompt cho AI:**

```
Dựa trên tài liệu thiết kế, tôi cần thiết lập một design system hiện đại và ấn tượng trong file tailwind.config.ts và src/styles/variables.css. Cụ thể:

1. Cấu hình bảng màu với:
   - Màu chính: Primary (#2B4C7E - Navy Blue), Secondary (#5B8C5A - Forest Green), Accent (#FF6B35 - Vibrant Orange)
   - Text và Background colors
   - Gradient combinations cho UI elements ấn tượng (kết hợp các màu chính)
   - Opacity variants cho glass effects và overlays

2. Typography system hiện đại:
   - Font heading: Inter hoặc Montserrat với font weights đa dạng (600-900)
   - Font body: Open Sans hoặc Lato với hệ thống scale tỷ lệ vàng
   - Sử dụng clamp() cho fluid typography cross-viewport
   - Letter-spacing và line-height tối ưu cho readability

3. Shadow system đa lớp:
   - Soft shadows cho cards và containers
   - Highlight shadows khi hover (với elevation thay đổi)
   - Text shadows tinh tế cho text trên backgrounds phức tạp

4. Animation và transition presets:
   - Easing functions custom (cubic-bezier)
   - Duration presets (fast: 150ms, normal: 300ms, slow: 500ms)
   - Scale, fade, slide variants

Tạo một design system vừa professional cho B2B, vừa có visual impact mạnh mẽ. Code nên có đầy đủ comments và organization rõ ràng.
```

#### Task 1.3: Xây dựng UI Component Library với Micro-interactions

**Prompt cho AI:**

```
Tôi cần xây dựng một UI Component Library hiện đại với micro-interactions đặc trưng. Hãy tạo:

1. Button Component với hiệu ứng cao cấp:
   - 4 variants: Primary, Secondary, Accent, và Text
   - Animation khi hover: Subtle scale + shadow elevation + gradient shift
   - Click effect: Ripple + scale down
   - Loading state với animated spinner
   - Focus state với pulsing ring
   - Hỗ trợ icon (trước/sau) với animation riêng
   - Optional micro-text dưới button

2. Card Component với depth effects:
   - Hover effect: Elevation change + subtle rotation perspective
   - Backdrop filter cho glassmorphism (với fallback)
   - Border gradient options
   - Inner content reveal animation khi in viewport
   - Top highlight edge (độ sáng thay đổi theo hover)

3. Form elements với feedback trực quan:
   - Input fields với bottom border animation
   - Checkbox/Radio với spring animation
   - Select dropdown với smooth expanding
   - Success/error states với subtle motion
   - Focus states với light glow effect

4. ScrollReveal Container:
   - Component wrapper cho element reveal animations
   - Options: fade-up, fade-in, slide-in-left/right
   - Staggered child animations (delay theo thứ tự)
   - Custom intersection thresholds

Mỗi component nên có prop "motionIntensity" để control animation strength (cho accessibility). Implement với framer-motion để animations mượt mà và performant.
```

### GIAI ĐOẠN 2: PHÁT TRIỂN NAVIGATION & HERO SECTION

#### Task 2.1: Tạo Interactive Header với Dynamic Navigation

**Prompt cho AI:**

```
Tôi cần một Header và Navigation system đẳng cấp cho landing page B2B ngành may mặc. Header cần vừa professional vừa ấn tượng với:

1. Thiết kế Header hiện đại:
   - Subtle gradient background với độ trong suốt thay đổi khi scroll
   - Logo với subtle animation khi hover (light glow effect)
   - Hiệu ứng scroll: Transform từ large -> compact khi user scroll down
   - Backdrop filter (blur) khi compact mode
   - Hiệu ứng drop shadow xuất hiện mượt mà khi scroll

2. Navigation nâng cao:
   - Nav items với hover effect dạng underline animation (draw from center)
   - Active state với custom indicator (không chỉ là underline đơn giản)
   - Dropdown menus với staggered animation cho child items
   - Hover feedback tinh tế trên mỗi nav item

3. Mobile Navigation trải nghiệm cao:
   - Hamburger icon với morphing animation (3 lines -> X)
   - Slide-in menu với backdrop blur
   - Staggered animation cho nav items
   - Gesture support (swipe to close)
   - Subtle parallax effect cho background

4. Micro-interactions:
   - Notification dot với pulsing animation cho "new" features
   - CTA button với attention-drawing subtle pulse
   - Language switcher với smooth rotation icon

Đảm bảo performant với CSS có tính toán trước và hạn chế re-paint/re-flow. Sử dụng IntersectionObserver và requestAnimationFrame để tối ưu animation logics.
```

#### Task 2.2: Xây dựng Dynamic Hero Section với Parallax Effects

**Prompt cho AI:**

```
Tôi cần một Hero Section ấn tượng, đạt tiêu chuẩn thiết kế 2025 cho landing page B2B ngành may mặc. Hero section này cần:

1. Layout đa lớp với hiệu ứng depth:
   - Foreground, midground và background layers với parallax scrolling
   - Subtle floating animation cho key elements (không gây phân tâm)
   - Overlay gradient mềm mại thay đổi theo scroll position
   - Particle effect tinh tế (ít, nhẹ và tập trung vào key areas)

2. Typography với visual impact:
   - Headline với text reveal staggered animation khi load
   - Highlighting key words với color và subtle glow
   - Custom underline/strike-through elements cho key phrases
   - Subheadline với typing effect hoặc fade-in-stagger theo từng dòng
   - Responsive font-size transitions mượt mà

3. CTA buttons với sức hút cao:
   - Primary CTA với subtle pulse animation (attention-grabbing nhưng không aggressive)
   - Hover effect với expansion + glow border
   - Secondary CTA với hover reveal animation
   - Micro-interactions khi user di chuột gần CTA section

4. Background elements ấn tượng:
   - Subtle mesh gradient với subtle movement
   - Blur effects tạo depth
   - Overlay pattern với opacity thay đổi theo scroll
   - Optional: SVG shape morph animations (nhẹ và tinh tế)
   - Optional: Lottie animation thể hiện industry concept (nếu phù hợp)

5. Scroll indicator animation:
   - Custom designed scroll indicator với pulsing/bouncing effect
   - Fade out khi user bắt đầu scroll

Sử dụng kết hợp Framer Motion và CSS animations cho hiệu suất tối ưu. Đảm bảo tất cả animations đều respects prefers-reduced-motion và không làm ảnh hưởng đến page performance metrics.
```

### GIAI ĐOẠN 3: PHÁT TRIỂN CÁC SECTION CHÍNH VỚI VISUAL STORYTELLING

#### Task.3.1: Xây dựng Benefits Section với Card Interactions

**Prompt cho AI:**

```
Tôi cần một Benefits Section ấn tượng với visual storytelling qua card interactions. Section này cần:

1. Grid layout với card choreography:
   - Staggered reveal animation khi section xuất hiện trong viewport
   - Hover effect cho mỗi card với 3D tilt effect (subtle, không quá mức)
   - Z-index change khi hover để tạo cảm giác card "nổi lên"
   - Border highlight animation (subtle gradient transition)

2. Card content presentation:
   - Icon với custom animation liên quan đến nội dung (ví dụ: icon máy may có thể có animation chuyển động)
   - Heading với underline reveal animation khi hover
   - Text content với subtle opacity transition
   - Backdrop filter cho glass effect (đảm bảo có fallback)

3. Hover states nâng cao:
   - Background subtle pattern/texture xuất hiện khi hover
   - Text lift effect khi hover (subtle z-translation)
   - CTA link với arrow animation (0 -> forward motion)
   - Subtle color shift (không quá mạnh, chỉ đủ để nhận biết)

4. Visual connectors giữa các cards:
   - Line/dot connectors giữa các cards thể hiện flow
   - Animation theo scroll position hoặc hover state
   - Subtle "pulse" animation truyền qua connector lines

5. Mobile experience tối ưu:
   - Scale và spacing tự điều chỉnh
   - Touch feedback thay vì hover effects
   - Horizontal scroll option với snap points
   - Visual indicators cho swipeable content

Sử dụng CSS Grid kết hợp flexbox cho layout, với GSAP hoặc Framer Motion cho animations phức tạp. Đảm bảo mỗi card không chỉ hiển thị benefit mà còn kể một phần câu chuyện của dịch vụ.
```

#### Task 3.2: Xây dựng Interactive Process Flow Section

**Prompt cho AI:**

```
Tôi cần một Process Flow Section tương tác cao với visual storytelling về quy trình làm việc. Section cần:

1. Tab system nâng cao:
   - Custom-designed tab indicators với animation mượt mà
   - Border/line animations khi chuyển tabs
   - Content transition với crossfade + movement
   - Inactive tabs với visual distinction rõ ràng nhưng vẫn attractive

2. Step visualization ấn tượng:
   - Timeline/flow representation với "active step" highlighting
   - Step connector animations (ví dụ: dash array animation theo scroll)
   - Số/icon cho mỗi step với counting/reveal animation
   - Progress indicator theo scroll position hoặc active tab

3. Content reveal choreography:
   - Staggered animation cho các content blocks
   - Illustration/icon với custom animation liên quan đến step content
   - Text reveal với sequential timing
   - Highlighted key points với visual emphasis (color, size, weight)

4. Interaction feedback:
   - Hover states cho các interactive elements với scale + elevation
   - Click/tap với tactile feedback (subtle bounce/spring)
   - Focus states với visual clarity
   - Active tab với "expanded" visual state

5. Mobile-optimized experience:
   - Vertical timeline thay vì horizontal trên mobile
   - Swipeable tabs với physics-based behavior
   - Collapsible/expandable sections
   - Touch-optimized hit areas

Triển khai với state management rõ ràng (React useState/useReducer) và CSS transitions có tính toán trước. Sử dụng SVG cho visual elements khi có thể để đảm bảo sharpness trên mọi màn hình.
```

#### Task 3.3: Xây dựng Social Proof Section với Dynamic Content

**Prompt cho AI:**

```
Tôi cần một Social Proof Section ấn tượng thể hiện uy tín thương hiệu trong ngành may mặc B2B. Section này cần:

1. Client Logos với visual presentation cao cấp:
   - Grid layout với perspective view (subtle 3D arrangement)
   - Hover effect với logo "lift" và spotlight effect
   - Auto-switching focus giữa các logos (nếu không có user interaction)
   - Logo reveal với staggered fade animation khi scroll into view
   - Grayscale → color transition khi hover/focus

2. Testimonial carousel nâng cao:
   - Slide transitions với 3D perspective (card rotation/flip)
   - Background shape animations theo slide content
   - Quote marks với custom animation (scale + rotation)
   - Avatar image với subtle floating animation
   - Company logo/name với reveal effect

3. Visual trust indicators:
   - Animated stats/numbers với counting effect
   - Custom-designed badges với hover information
   - Trust seals với subtle glow/pulse
   - Customer success metrics với graph/chart mini-animations

4. Dynamic content presentation:
   - Automatic switching với smooth transitions
   - Manual controls với custom-designed UI elements
   - Progress indicators với animated states
   - Pause on hover functionality
   - Swipe gestures với physics-based behavior

5. Responsive adaptations:
   - Reflow của grid system theo screen size
   - Touch-optimized controls cho mobile
   - Reduced motion options cho accessibility
   - Performance optimizations cho lower-end devices

Triển khai với một carousel solution tối ưu (Embla hoặc custom hook với IntersectionObserver). Sử dụng skeleton loading states để tránh layout shift khi dynamic content load.
```

### GIAI ĐOẠN 4: FORM ĐĂNG KÝ & LEAD CAPTURE EXPERIENCE

#### Task 4.1: Thiết kế Form Component với Progressive Enhancement

**Prompt cho AI:**

```
Tôi cần một Form Component system cao cấp với progressive enhancement và micro-interactions phong phú. Form system cần:

1. Input fields với enhanced interactions:
   - Label animations (float from placeholder to top on focus)
   - Border/underline animations theo focus state
   - Subtle background color transitions
   - Icon interactions (color change, subtle movements)
   - Character count với visual feedback
   - Autofill detection với style adaptations

2. Validation system với visual feedback tức thì:
   - Success states với checkmark animations
   - Error states với subtle shake + message fade in
   - Progress indicators cho password strength/field completion
   - Inline validation khi typing/blurring với icon transitions
   - Accessibility-focused error reporting (aria-live regions)

3. Select & dropdowns với enhanced UX:
   - Custom-styled selects với animation overflow
   - Dropdown open/close với spring physics
   - Option hover states với background transitions
   - Selected state với checkmark animations
   - Multi-select với token creation animations

4. Checkbox & radio với micro-interactions:
   - Custom-designed controls với state animations
   - Check/uncheck với morphing SVG transitions
   - Ripple effect khi clicked
   - Group selection với related items highlight
   - Focus states với keyboard navigation support

5. Form layout & progress:
   - Responsive grid với adaptive layouts
   - Field groups với visual connection lines
   - Multi-step với progress indicators (dots, bar, percentage)
   - Transition effects giữa form steps (slide, fade, etc.)
   - Form completion celebration animations

Sử dụng React Hook Form với Zod validation, kết hợp Framer Motion cho animations. Áp dụng ARIA attributes và keyboard support để đảm bảo accessibility trong khi vẫn giữ visual richness.
```

#### Task 4.2: Xây dựng Lead Capture Form với Contextual UI

**Prompt cho AI:**

```
Tôi cần một Lead Capture Form Section cao cấp với contextual UI thay đổi theo user input và progress. Form section này cần:

1. Multi-step form với trải nghiệm mượt mà:
   - Progress tracker với visual storytelling (thể hiện hành trình từ inquiry đến partnership)
   - Inter-step transitions với data-preservation (không mất dữ liệu khi back/forward)
   - Step-specific background elements/illustrations thay đổi theo nội dung
   - Conditional fields xuất hiện với smooth animations
   - Save & resume functionality với visual indicators

2. Contextual assistance:
   - Helper tooltips với just-in-time information (xuất hiện khi user focus vào field phức tạp)
   - Example values với subtle text animations
   - Inline suggestions dựa trên input (company name lookup, email domain suggestions)
   - Field completion estimations (thời gian còn lại để hoàn thành)
   - Contextual help links với modal/slideout panel

3. Psychological triggers embedded:
   - Social proof elements xuất hiện tại strategic points ("X companies đã đăng ký hôm nay")
   - Scarcity indicators với subtle animations ("Chỉ còn X slots cho tháng này")
   - Progress celebration microinteractions (confetti/checkmark khi hoàn thành mỗi step)
   - Personal touch elements (name usage, industry-specific content)
   - Trust builders với visual hierarchy (security badges, testimonial snippets)

4. Form container design nâng cao:
   - Floating card design với subtle shadow animations
   - Background elements thay đổi theo form progress
   - Border highlights theo active section
   - Side illustrations với parallax effect theo scroll trong form
   - Custom scrollbar styling với progress indication

5. Submit & post-submission:
   - Submit button với state animations (default, hover, active, loading)
   - Processing animation với visual feedback về steps đang xử lý
   - Success/error states với appropriate celebrations/guidance
   - Next steps guidance với visual cues
   - Share options với social connections

Triển khai với React Hook Form cho form management, kết hợp với context API để tracking progress và conditional logic. Animation nên sử dụng kết hợp CSS variables và React transition hooks.
```

#### Task 4.3: Xây dựng Thank You Page với Value Journey Continuation

**Prompt cho AI:**

```
Tôi cần một Thank You Page ấn tượng, không chỉ xác nhận form submission mà còn tiếp tục value journey cho user. Page này cần:

1. Celebration & confirmation experience:
   - Entry animation sequence (confetti, checkmark morphing, success message reveal)
   - Personalized thank you message với user name/company (nếu available)
   - Order ID display với highlighting effect
   - Sound effect nhẹ nhàng cho celebration (optional, respectful)
   - Branded visual elements với subtle animations

2. Order Information Card với visual richness:
   - Timeline visualization cho next steps
   - Current status indicator với pulsing highlight
   - Estimated timeline với visual progress
   - Contact person information với subtle hover card
   - Dynamically generated QR code cho easy reference/sharing

3. Immediate value delivery:
   - Resource cards với hover effects và download animations
   - Preview thumbnails với zoom-on-hover functionality
   - Download progress indicators with animated success states
   - Categorized resources với tab switching animations
   - "New" badges với subtle attention-drawing animations

4. Secondary Conversion pathways:
   - Related products/services showcase với carousel
   - Social media connection cards với brand-specific animations
   - Newsletter signup với simplified form và instant feedback
   - Upcoming events/webinar registration với countdown timers
   - Community invitation với member count animations

5. Contextual marketing elements:
   - Personalized recommendations based on form submissions
   - Industry-specific tips với expandable cards
   - Case study previews với hover-to-preview functionality
   - Educational content snippets với "read more" reveals
   - Dynamic FAQ expansion relevant to submitted inquiry

Triển khai với NextJS server components kết hợp client interactivity islands. Sử dụng conditional loading cho resources để tránh page bloat, và implement skeleton states cho async loading elements.
```

### GIAI ĐOẠN 5: CALL-TO-ACTION & CONVERSION ELEMENTS

#### Task 5.1: Tạo Advanced CTA System với Psychology Triggers

**Prompt cho AI:**

```
Tôi cần xây dựng một hệ thống CTA nâng cao, tích hợp psychology triggers và visual design ấn tượng. Hệ thống CTA cần:

1. Primary CTA với visual impact cao:
   - Custom shape với "cut-out" hoặc asymmetric design
   - Background với subtle gradient animation (slow pulse/shift)
   - Border glow với variable intensity theo user engagement
   - Text với micro-movement animation
   - Icon animation (arrow extending, pulse effect)
   - Hover state với expansion + shadow deepening

2. Strategic CTA placements với attention design:
   - Above-fold CTA với subtle attention animation
   - Scroll-triggered CTAs xuất hiện với timing tối ưu
   - Sticky CTA với entrance/exit animations
   - Context-aware CTA variations (thay đổi messaging theo section)
   - Scroll-progress-aware CTA (thay đổi visibility/wording theo content consumption)

3. Psychology triggers tích hợp:
   - Scarcity indicators với countdown animations ("Chỉ còn X ngày")
   - Social proof tooltips xuất hiện gần CTA ("X doanh nghiệp đã đăng ký")
   - FOMO-inducing micro-copy với subtle animations
   - Testimonial snippets xuất hiện theo scroll position
   - Before/after results preview (hover/tap to see difference)

4. Micro-copy optimization:
   - Action-oriented text với phần nhấn mạnh (bold, color)
   - Benefit-focused subtext với reveal animation
   - Objection handler với expandable details
   - Guarantee statements với trust icons
   - Power words với subtle highlight effects

5. Visual hierarchy enhancement:
   - Surrounding negative space animations (subtle movement drawing eye to CTA)
   - Background dimming effect để highlight CTA khi user scroll nearby
   - Visual connectors từ pain points/benefits đến CTA
   - "Spotlight" effect subtle animation trên CTA trong key moments
   - Z-index manipulation để tạo "pop-out" effect

Triển khai với các hooks theo dõi scroll position, viewport visibility, và user engagement metrics. Kết hợp CSS effects và React component state để tạo context-aware visual behaviors.
```

#### Task 5.2: Xây dựng Social Proof & Trust Building Elements

**Prompt cho AI:**

```
Tôi cần xây dựng một hệ thống Social Proof và Trust Building Elements ấn tượng để tăng tỷ lệ chuyển đổi. Hệ thống này cần:

1. Customer Logos Display với motion design:
   - 3D carousel với perspective effect
   - Logo "spotlight" rotation mechanism
   - Dynamic logo arrangement theo industry/size
   - Hover để reveal relationship details (năm hợp tác, project highlights)
   - Visual connectors giữa các logos thể hiện mạng lưới industry

2. Dynamic Testimonial System:
   - Quote cards với depth effect (layered design)
   - Profile photos với subtle hover animations (zoom + clarity enhancement)
   - Company logo/industry icon với branded animations
   - Rating visualization với counting/filling animation
   - Audio snippet option với waveform visualization (nếu có testimonial audio)

3. Trust Badge Collection với visual enhancement:
   - Certification badges với glow highlight khi focused
   - Security indicators với micro-animations thể hiện protection
   - Industry association logos với hover info tooltips
   - Award icons với celebration animations khi hover
   - Experience metrics (years, clients, projects) với counting animations

4. Live Activity Indicators:
   - Recent conversion notifications với slide-in/fade-out
   - Current visitor counter với subtle updates
   - "Company X is viewing this page" notifications
   - Recent purchase/signup feed với location pins
   - Realtime (hoặc simulated) activity metrics

5. Case Study Previews:
   - "Before & After" comparisons với slider animation
   - Results metrics với counting animations
   - Industry-specific icons với micro-interactions
   - Expandable content với smooth reveal animations
   - Visual storytelling của transformation journey

Triển khai với combination của static và dynamic elements để đảm bảo performance. Sử dụng Intersection Observer để trigger animations khi elements vào viewport, và implement data-caching để tránh repeated network requests.
```

#### Task 5.3: Xây dựng FAQ Section với Interaction Design

**Prompt cho AI:**

```
Tôi cần một FAQ Section với interaction design nâng cao, không chỉ functional mà còn tạo trải nghiệm thú vị khi explore nội dung. Section này cần:

1. Accordion system với animation choreography:
   - Expansion animation với variable height transitions
   - Icon rotation/morphing khi toggle (plus → minus, arrow rotation)
   - Content reveal với staggered paragraph/list appearance
   - Background shape/pattern animations theo expansion state
   - Question text emphasis (weight/color change) khi active

2. Categorization & filtering UX:
   - Category pills/tabs với selection animations
   - Filter transition effects (fade/slide/reorder)
   - Empty state animations nếu không có results
   - Active filter indicators với visual feedback
   - Count badges với updating animations

3. Search & discovery experience:
   - Predictive search với dropdown animations
   - Highlight matches trong results với pulsing effect
   - Recent searches với fade-in history
   - "Popular questions" highlighting với subtle attention-grabbing effects
   - Related questions với connection lines

4. Engagement mechanics:
   - "Helpful?" feedback buttons với reaction animations
   - View counter với subtle visual treatment
   - "Was this helpful?" micro-surveys với animation feedback
   - "Still have questions?" CTA với dynamic positioning
   - Share option với social platform animations

5. Visual enhancements:
   - Question grouping với visual connectors
   - Section dividers với scroll-triggered animations
   - Icon illustrations liên quan đến từng question category
   - Background elements thay đổi theo active category
   - Collapse all/Expand all buttons với state animations

Triển khai với accessibility là ưu tiên hàng đầu (proper aria-expanded, aria-controls). Sử dụng Framer Motion's AnimatePresence để quản lý mount/unmount animations, và implement keyboard navigation với visual feedback cho tab/focus states.
```

### GIAI ĐOẠN 6: RESPONSIVE DESIGN & MOTION OPTIMIZATION

#### Task 6.1: Advanced Responsive Patterns

**Prompt cho AI:**

```
Tôi cần triển khai advanced responsive patterns để đảm bảo trải nghiệm nhất quán và ấn tượng trên mọi kích thước màn hình, từ mobile đến large displays. Cụ thể:

1. Content choreography nâng cao:
   - Priority-based reordering (không chỉ đơn giản stacking)
   - Component morphing (thay đổi layout structure, không chỉ kích thước)
   - Off-canvas patterns cho secondary content
   - Asymmetric grids với intelligent breakpoints (không chỉ theo standard breakpoints)
   - Container queries cho component-level responsiveness

2. Touch-first interactions:
   - Custom touch sliders với physics-based behavior
   - Swipe patterns với reveal/action mechanics
   - Haptic feedback integration (khi browser hỗ trợ)
   - Gesture hints với subtle animations
   - Touch targets với dynamic sizing theo content density

3. Viewport-aware animations:
   - Parallax depths scaled theo viewport height
   - Animation choreography thay đổi theo device capabilities
   - Scroll-triggered animations với timing adjustments
   - Reduced motion alternative journeys (không chỉ là tắt animation)
   - Performance-aware motion (dynamic adjustment)

4. Advanced media handling:
   - Art direction cho images (crop/focus thay đổi theo viewport)
   - Video quality/length modifications theo connection speed
   - Background shapes/patterns với responsive scaling
   - Lazy-loaded assets với blur-up technique và aspect ratio preservation
   - Responsive typography với variable fonts adjustments

5. Interaction parity across devices:
   - Hover intent detection, với touch alternatives
   - Keyboard accessibility với visual focus indicators
   - Voice input optimization (nếu relevant)
   - Offline capabilities với state persistence
   - Cross-device continuity hints (nếu applicable)

Implement using modern CSS (container queries, logical properties, :has selector) và JavaScript APIs (ResizeObserver, Interaction Media Queries). Structure code với mobile-first approach nhưng design theo systemic approach (không đơn thuần là breakpoints).
```

#### Task 6.2: Performance-Optimized Motion Design

**Prompt cho AI:**

```
Tôi cần triển khai performance-optimized motion design cho landing page, đảm bảo animations mượt mà trong khi vẫn duy trì page performance metrics tốt. System này cần:

1. Performance-first animation strategies:
   - CSS-driven animations cho common patterns (transform & opacity)
   - Hardware acceleration triggers có chọn lọc (will-change, transform3d)
   - JavaScript animations batching to avoid layout thrashing
   - Scheduling animations với requestAnimationFrame và throttling
   - Composited layers management để tránh memory bloat

2. Progressive enhancement cho motion:
   - Base experience without JS for core functionality
   - Motion enhancement layers loaded conditionally
   - Capability detection cho advanced features
   - Graceful degradation paths cho mỗi animation
   - Feature detection cho modern APIs (Web Animations, etc.)

3. Optimization techniques:
   - De-duplication của animation logic với custom hooks
   - Asset preloading cho critical animation elements
   - Caching của computed animations khi possible
   - Conditional loading của heavy animation libraries
   - Off-main-thread animations khi có thể (Web Workers)

4. Measuring & monitoring:
   - Custom performance markers cho animation impact
   - FPS monitoring utilities (dev mode)
   - Layout shift detection related to animations
   - Bundle size impact analysis cho animation code
   - Memory usage patterns optimization

5. Device-aware adjustments:
   - Reduced motion complexity cho low-end devices
   - Battery-status-aware motion scaling
   - Network-condition-aware asset loading
   - CPU/GPU load detection và adaptation
   - Thermal throttling awareness

Triển khai với Framer Motion cho React components (sử dụng LayoutGroup và shared layout animations để reduce cost). Use `data-` attributes cho animation triggers và CSS custom properties cho animation parameters để dễ dàng tối ưu hóa global animation scale.
```

## TÁCH RIÊNG: KẾ HOẠCH XÂY DỰNG HỆ THỐNG TRACKING & ANALYTICS

### Tracking & Analytics Plan 1: Set up Core Tracking Infrastructure

**Prompt cho AI:**

```
Tôi cần thiết lập core infrastructure cho tracking và analytics trên landing page B2B ngành may mặc. Infrastructure này cần:

1. Set up Google Tag Manager và Google Analytics 4:
   - Cấu trúc Container với proper environments (dev, staging, production)
   - Data Layer design cho B2B context (custom dimensions & metrics)
   - Enhanced measurement configuration
   - Basic triggers và tags structure
   - Data retention và privacy controls

2. Event tracking taxonomy design:
   - User journey event hierarchy (awareness → consideration → conversion)
   - Event naming convention với format chi tiết
   - Parameter standardization cho consistency
   - Mandatory vs optional parameters
   - Versioning strategy cho future changes

3. Core tracking integration:
   - NextJS integration với GTM/GA4
   - Server-side vs client-side tracking considerations
   - Setup deferring cho non-critical tracking
   - Consent management integration hooks
   - Error/exception tracking foundations

4. Performance optimization:
   - Async/defer loading strategy
   - Tag firing priority management
   - Payload minimization techniques
   - Cache control cho tracking libraries
   - Reduce tracking impact on Core Web Vitals

5. Testing và debugging environment:
   - Developer tools cho tracking validation
   - Local debugging configuration
   - Preview mode setup
   - Data testing framework
   - Integration tests cho tracking consistency

Provide implementation code examples cho NextJS app directory và recommendations cho cấu trúc tracking organization trong codebase.
```

### Tracking & Analytics Plan 2: Customer Journey Tracking

**Prompt cho AI:**

```
Tôi cần xây dựng customer journey tracking toàn diện cho landing page B2B ngành may mặc. System này cần:

1. Landing page entry tracking:
   - UTM parameter capture và storage
   - Referrer analysis và categorization
   - Entry point mapping (direct, social, email, etc.)
   - Initial source attribution model
   - Campaign tracking parameter normalization

2. Content engagement tracking:
   - Scroll depth triggers (percentages và key sections)
   - Time-on-page với actual engagement detection
   - Content interaction events (expandables, tooltips, media)
   - Navigation pattern tracking
   - Exit intent detection

3. Lead qualification signals:
   - Form interaction tracking (field focus, completion rates)
   - Micro-conversion events (download, video views)
   - Industry-specific engagement events
   - Product interest signals
   - Buying intent indicators

4. Conversion funnel analysis:
   - Multi-step form progression tracking
   - Abandonment point identification
   - Field error rates và patterns
   - Conversion success tracking
   - Post-conversion engagement

5. Customer segmentation signals:
   - Company size indicators
   - Industry classification
   - Role/seniority signals
   - Product interest categorization
   - Engagement level scoring

Implement với data layer standardization và provide example implementation với common tracking patterns specific to ngành may mặc B2B. Include recommendations cho custom dimensions và metrics trong GA4.
```

### Tracking & Analytics Plan 3: Advanced Analytics & Reporting

**Prompt cho AI:**

```
Tôi cần thiết lập advanced analytics và reporting system cho landing page B2B ngành may mặc để drive data-informed decisions. System này cần:

1. Custom dashboard setup:
   - Real-time performance metrics visualization
   - Conversion funnel analysis views
   - A/B testing result comparisons
   - Source/medium contribution analysis
   - Content engagement heatmaps

2. Advanced attribution modeling:
   - Multi-touch attribution setup
   - Campaign influence weighting
   - First-click vs last-click comparison
   - Time-decay model implementation
   - Cross-device & cross-session tracking

3. Audience segmentation framework:
   - Industry-based cohort analysis
   - Engagement level segmentation
   - Company size segmentation
   - Behavioral pattern grouping
   - Look-alike audience development

4. ROI & conversion metrics:
   - Cost-per-lead calculation integration
   - Quality score development
   - Conversion probability modeling
   - Customer lifetime value estimation
   - Campaign efficiency metrics

5. Predictive analytics foundations:
   - Lead scoring model inputs
   - Conversion probability factors
   - Churn risk indicators
   - Upsell/cross-sell opportunity signals
   - Seasonal trend detection

Provide example configurations, visualization recommendations, và integration points với marketing platforms. Include GA4 exploration templates và BigQuery export setup cho advanced analysis.
```

---

## PHỤ LỤC: HƯỚNG DẪN SỬ DỤNG LỘ TRÌNH ĐÃ ĐIỀU CHỈNH

1. **Làm việc theo giai đoạn**: Hoàn thành từng giai đoạn trước khi chuyển sang giai đoạn tiếp theo để đảm bảo có nền tảng vững chắc.

2. **Cung cấp tài liệu bổ sung**: Khi cung cấp tài liệu chi tiết thêm, hãy đề cập đến task cụ thể cần bổ sung thông tin.

3. **Cách tối ưu prompt cho AI**:

   - Thêm hình ảnh tham khảo (screenshots, links) khi có thể
   - Mô tả chi tiết visual style mong muốn
   - Chia nhỏ prompt thành bullet points rõ ràng
   - Cung cấp ví dụ cụ thể về interaction/animation mong muốn

4. **Làm việc với code output**:
   - Yêu cầu AI giải thích các kỹ thuật animation phức tạp
   - Nếu code quá dài, yêu cầu AI chia thành nhiều phần (part 1, part 2, etc.)
   - Yêu cầu AI cung cấp inline comments cho code phức tạp

Lộ trình đã được điều chỉnh này tập trung mạnh vào UI/UX ấn tượng với chi tiết về micro-interactions, animation, và visual storytelling, phù hợp để tạo landing page B2B hiện đại và hấp dẫn.
