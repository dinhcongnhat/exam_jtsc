// process-pdfs.js
const fs = require('fs');
const path = require('path');
const pdf = require('pdf-parse');

const pdfFolderPath = path.join(__dirname, 'documentpdf'); // Thư mục chứa PDF
const outputFilePath = path.join(__dirname, 'js', 'pdf-content.js'); // File output

async function processPdfs() {
    let allPdfText = '';
    console.log('Bắt đầu đọc file từ thư mục:', pdfFolderPath);

    try {
        const files = fs.readdirSync(pdfFolderPath);

        for (const file of files) {
            if (path.extname(file).toLowerCase() === '.pdf') {
                const pdfPath = path.join(pdfFolderPath, file);
                console.log(`Đang xử lý file: ${file}...`);

                const dataBuffer = fs.readFileSync(pdfPath);
                const data = await pdf(dataBuffer);

                // Thêm nội dung text vào biến tổng hợp
                allPdfText += `\n\n--- NỘI DUNG TỪ FILE: ${file} ---\n\n` + data.text;
            }
        }

        // Ghi toàn bộ nội dung đã trích xuất ra file js
        // Sử dụng JSON.stringify để escape các ký tự đặc biệt như dấu nháy, xuống dòng
        const fileContent = `export const pdfContent = ${JSON.stringify(allPdfText)};`;
        fs.writeFileSync(outputFilePath, fileContent);

        console.log(`✅ Xử lý thành công! Toàn bộ nội dung đã được lưu vào file: ${outputFilePath}`);

    } catch (error) {
        console.error('❌ Đã xảy ra lỗi trong quá trình xử lý PDF:', error);
    }
}

processPdfs();