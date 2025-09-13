# JTSC Examination System - Production Build

## 🔒 Source Code Protection

Dự án này đã được tích hợp system bảo vệ mã nguồn gồm:

### ✨ Tính năng bảo vệ:
- **JavaScript Obfuscation**: Mã nguồn JS được mã hóa và làm rối
- **CSS Minification**: CSS được nén tối đa
- **DevTools Protection**: Chặn F12, Ctrl+Shift+I, Ctrl+U
- **Right-click Protection**: Vô hiệu hóa menu chuột phải
- **DevTools Detection**: Phát hiện và cảnh báo khi mở DevTools

## 🚀 Cách sử dụng:

### 1. Cài đặt dependencies:
\`\`\`bash
npm install
\`\`\`

### 2. Build production (obfuscate & minify):
\`\`\`bash
npm run build
\`\`\`

### 3. Deploy:
- Upload toàn bộ thư mục \`/dist\` lên hosting
- Không upload thư mục gốc (source code)

### 4. Chạy local development:
\`\`\`bash
npm start
\`\`\`

## 📁 Cấu trúc sau build:

\`\`\`
dist/
├── index.html (có protection code)
├── style.min.css (minified)
├── js/ (tất cả file đều obfuscated)
│   ├── auth.js
│   ├── chatbot.js
│   ├── main.js
│   └── ...
├── documentpdf/
├── server.js
└── các file khác...
\`\`\`

## ⚠️ Lưu ý:

1. **Chỉ deploy thư mục \`dist/\`** - KHÔNG deploy source code gốc
2. File obfuscated sẽ khó đọc và debug
3. Backup source code gốc để phát triển
4. Test kỹ sau khi build trước khi deploy

## 🛡️ Mức độ bảo vệ:

- ✅ **Cấp độ 1**: Minify & Compress
- ✅ **Cấp độ 2**: Obfuscate variable names
- ✅ **Cấp độ 3**: Control flow flattening
- ✅ **Cấp độ 4**: Dead code injection
- ✅ **Cấp độ 5**: String array encoding
- ✅ **Cấp độ 6**: Self-defending code
- ✅ **Cấp độ 7**: Debug protection
- ✅ **Cấp độ 8**: DevTools detection

## 🔧 Tùy chỉnh:

Để thay đổi mức độ obfuscation, edit file \`build.js\` và điều chỉnh các tham số trong \`JavaScriptObfuscator.obfuscate()\`.

---
**⚡ Được tạo bởi JTSC Build System**
