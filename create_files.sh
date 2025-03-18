#!/bin/bash  
# Kịch bản tạo cấu trúc file và thư mục cho dự án b2b-fashion-landing  
# Nếu file đã tồn tại thì sẽ không ghi đè  

# -------------------------  
# Tạo các thư mục  
# -------------------------  

# public  
mkdir -p public/images/industrial  
mkdir -p public/images/materials  
mkdir -p public/images/team  
mkdir -p public/images/sustainability  
mkdir -p public/icons/custom  
mkdir -p public/illustrations  
mkdir -p public/animations  

# src/app  
mkdir -p "src/app/(marketing)"  
mkdir -p src/app/api  

# src/components  
mkdir -p src/components/icons  
mkdir -p src/components/illustrations  
mkdir -p src/components/layout  
mkdir -p src/components/sections  
mkdir -p src/components/ui  

# src/context, hooks, lib và styles  
mkdir -p src/context  
mkdir -p src/hooks  
mkdir -p src/lib  
mkdir -p src/styles  

# -------------------------  
# Tạo các file (nếu chưa tồn tại)  
# -------------------------  

# src/app  
if [ ! -f "src/app/(marketing)/page.tsx" ]; then  
  touch "src/app/(marketing)/page.tsx"  
fi  
if [ ! -f "src/app/globals.css" ]; then  
  touch "src/app/globals.css"  
fi  
if [ ! -f "src/app/layout.tsx" ]; then  
  touch "src/app/layout.tsx"  
fi  

# src/components/icons  
if [ ! -f "src/components/icons/Icon.tsx" ]; then  
  touch "src/components/icons/Icon.tsx"  
fi  

# src/components/illustrations  
if [ ! -f "src/components/illustrations/ProcessFlow.tsx" ]; then  
  touch "src/components/illustrations/ProcessFlow.tsx"  
fi  

# src/components/layout  
if [ ! -f "src/components/layout/Footer.tsx" ]; then  
  touch "src/components/layout/Footer.tsx"  
fi  
if [ ! -f "src/components/layout/Header.tsx" ]; then  
  touch "src/components/layout/Header.tsx"  
fi  
if [ ! -f "src/components/layout/Layout.tsx" ]; then  
  touch "src/components/layout/Layout.tsx"  
fi  

# src/components/sections  
if [ ! -f "src/components/sections/Contact.tsx" ]; then  
  touch "src/components/sections/Contact.tsx"  
fi  
if [ ! -f "src/components/sections/Hero.tsx" ]; then  
  touch "src/components/sections/Hero.tsx"  
fi  
if [ ! -f "src/components/sections/Process.tsx" ]; then  
  touch "src/components/sections/Process.tsx"  
fi  
if [ ! -f "src/components/sections/Services.tsx" ]; then  
  touch "src/components/sections/Services.tsx"  
fi  
if [ ! -f "src/components/sections/Testimonials.tsx" ]; then  
  touch "src/components/sections/Testimonials.tsx"  
fi  

# src/components/ui  
if [ ! -f "src/components/ui/Button.tsx" ]; then  
  touch "src/components/ui/Button.tsx"  
fi  
if [ ! -f "src/components/ui/Card.tsx" ]; then  
  touch "src/components/ui/Card.tsx"  
fi  
if [ ! -f "src/components/ui/Checkbox.tsx" ]; then  
  touch "src/components/ui/Checkbox.tsx"  
fi  
if [ ! -f "src/components/ui/Container.tsx" ]; then  
  touch "src/components/ui/Container.tsx"  
fi  
if [ ! -f "src/components/ui/Input.tsx" ]; then  
  touch "src/components/ui/Input.tsx"  
fi  
if [ ! -f "src/components/ui/Radio.tsx" ]; then  
  touch "src/components/ui/Radio.tsx"  
fi  
if [ ! -f "src/components/ui/Section.tsx" ]; then  
  touch "src/components/ui/Section.tsx"  
fi  
if [ ! -f "src/components/ui/Select.tsx" ]; then  
  touch "src/components/ui/Select.tsx"  
fi  

# src/lib  
if [ ! -f "src/lib/utils.ts" ]; then  
  touch "src/lib/utils.ts"  
fi  

# src/styles  
if [ ! -f "src/styles/variables.css" ]; then  
  touch "src/styles/variables.css"  
fi  

# Các file ở root  
if [ ! -f ".eslintrc.json" ]; then  
  touch ".eslintrc.json"  
fi  
if [ ! -f ".prettierrc.js" ]; then  
  touch ".prettierrc.js"  
fi  
if [ ! -f "next.config.mjs" ]; then  
  touch "next.config.mjs"  
fi  
if [ ! -f "package.json" ]; then  
  touch "package.json"  
fi  
if [ ! -f "tailwind.config.ts" ]; then  
  touch "tailwind.config.ts"  
fi  
if [ ! -f "tsconfig.json" ]; then  
  touch "tsconfig.json"  
fi  

echo "Đã tạo xong cấu trúc thư mục và file (nếu chưa tồn tại)."  