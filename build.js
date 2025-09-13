const fs = require('fs');
const path = require('path');
const JavaScriptObfuscator = require('javascript-obfuscator');
const { minify } = require('terser');
const CleanCSS = require('clean-css');

// Tạo thư mục dist nếu chưa có
const distDir = path.join(__dirname, 'dist');
if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir);
}

// Tạo thư mục dist/js nếu chưa có
const distJsDir = path.join(distDir, 'js');
if (!fs.existsSync(distJsDir)) {
    fs.mkdirSync(distJsDir);
}

console.log('🚀 Bắt đầu build và obfuscate mã nguồn...');

// Danh sách các file JavaScript cần obfuscate
const jsFiles = [
    'js/auth.js',
    'js/chatbot.js',
    'js/firebase-config.js',
    'js/main.js',
    'js/pdf-content.js',
    'js/quiz-data.js',
    'js/quiz.js',
    'js/results.js',
    'js/text-worker.js',
    'js/ui.js'
];

// Obfuscate từng file JavaScript
jsFiles.forEach(async (file) => {
    try {
        const filePath = path.join(__dirname, file);
        if (fs.existsSync(filePath)) {
            const sourceCode = fs.readFileSync(filePath, 'utf8');
            
            // Cấu hình obfuscator - mức độ bảo mật cao
            const obfuscationResult = JavaScriptObfuscator.obfuscate(sourceCode, {
                compact: true,
                controlFlowFlattening: true,
                controlFlowFlatteningThreshold: 0.75,
                deadCodeInjection: true,
                deadCodeInjectionThreshold: 0.4,
                debugProtection: true,
                debugProtectionInterval: 2000,
                disableConsoleOutput: true,
                domainLock: [], // Có thể thêm domain để lock
                identifierNamesGenerator: 'hexadecimal',
                log: false,
                numbersToExpressions: true,
                renameGlobals: false,
                rotateStringArray: true,
                selfDefending: true,
                shuffleStringArray: true,
                simplify: true,
                splitStrings: true,
                splitStringsChunkLength: 10,
                stringArray: true,
                stringArrayCallsTransform: true,
                stringArrayEncoding: ['base64'],
                stringArrayIndexShift: true,
                stringArrayRotate: true,
                stringArrayShuffle: true,
                stringArrayWrappersCount: 2,
                stringArrayWrappersChainedCalls: true,
                stringArrayWrappersParametersMaxCount: 4,
                stringArrayWrappersType: 'function',
                stringArrayThreshold: 0.75,
                transformObjectKeys: true,
                unicodeEscapeSequence: false
            });
            
            const outputPath = path.join(distDir, file);
            fs.writeFileSync(outputPath, obfuscationResult.getObfuscatedCode());
            console.log(`✅ Obfuscated: ${file}`);
        }
    } catch (error) {
        console.error(`❌ Error obfuscating ${file}:`, error.message);
    }
});

// Minify CSS
try {
    const cssPath = path.join(__dirname, 'style.css');
    if (fs.existsSync(cssPath)) {
        const cssContent = fs.readFileSync(cssPath, 'utf8');
        const minifiedCSS = new CleanCSS({
            level: 2,
            returnPromise: false
        }).minify(cssContent);
        
        fs.writeFileSync(path.join(distDir, 'style.min.css'), minifiedCSS.styles);
        console.log('✅ Minified: style.css → style.min.css');
    }
} catch (error) {
    console.error('❌ Error minifying CSS:', error.message);
}

// Copy các file khác
const filesToCopy = [
    'index.html',
    'quick-test.html',
    'test-random-quiz.html',
    'server.js',
    'process_text.py',
    'process-pdfs.js',
    'Logo.png'
];

filesToCopy.forEach(file => {
    try {
        const srcPath = path.join(__dirname, file);
        const destPath = path.join(distDir, file);
        
        if (fs.existsSync(srcPath)) {
            fs.copyFileSync(srcPath, destPath);
            console.log(`📋 Copied: ${file}`);
        }
    } catch (error) {
        console.error(`❌ Error copying ${file}:`, error.message);
    }
});

// Copy thư mục documentpdf
try {
    const srcDocDir = path.join(__dirname, 'documentpdf');
    const destDocDir = path.join(distDir, 'documentpdf');
    
    if (fs.existsSync(srcDocDir)) {
        if (!fs.existsSync(destDocDir)) {
            fs.mkdirSync(destDocDir);
        }
        
        const files = fs.readdirSync(srcDocDir);
        files.forEach(file => {
            fs.copyFileSync(
                path.join(srcDocDir, file),
                path.join(destDocDir, file)
            );
        });
        console.log('📋 Copied: documentpdf/');
    }
} catch (error) {
    console.error('❌ Error copying documentpdf:', error.message);
}

// Tạo index.html production với đường dẫn minified
setTimeout(() => {
    try {
        const indexPath = path.join(distDir, 'index.html');
        let indexContent = fs.readFileSync(indexPath, 'utf8');
        
        // Thay thế đường dẫn CSS
        indexContent = indexContent.replace(
            '<link rel="stylesheet" href="style.css">',
            '<link rel="stylesheet" href="style.min.css">'
        );
        
        // Thêm comment để ẩn source
        indexContent = indexContent.replace(
            '<head>',
            `<head>
    <!-- Source code is protected and obfuscated -->
    <script>
        // Disable right-click context menu
        document.addEventListener('contextmenu', e => e.preventDefault());
        
        // Disable F12, Ctrl+Shift+I, Ctrl+U
        document.addEventListener('keydown', function(e) {
            if (e.key === 'F12' || 
                (e.ctrlKey && e.shiftKey && e.key === 'I') ||
                (e.ctrlKey && e.key === 'u') ||
                (e.ctrlKey && e.shiftKey && e.key === 'C')) {
                e.preventDefault();
                return false;
            }
        });
        
        // Detect DevTools
        let devtools = {open: false, orientation: null};
        setInterval(() => {
            if (window.outerHeight - window.innerHeight > 160 || 
                window.outerWidth - window.innerWidth > 160) {
                if (!devtools.open) {
                    devtools.open = true;
                    console.clear();
                    console.log('%cAccess Denied!', 'color: red; font-size: 50px; font-weight: bold;');
                }
            } else {
                devtools.open = false;
            }
        }, 500);
    </script>`
        );
        
        fs.writeFileSync(indexPath, indexContent);
        console.log('✅ Updated index.html with protection');
        
    } catch (error) {
        console.error('❌ Error updating index.html:', error.message);
    }
    
    console.log('\n🎉 Build completed! Production files are in /dist folder');
    console.log('📁 Deploy the /dist folder to your hosting service');
}, 2000);
