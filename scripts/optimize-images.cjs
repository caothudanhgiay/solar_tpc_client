/**
 * Script tối ưu hóa ảnh trong thư mục public/images
 * Sử dụng sharp (đã có sẵn qua Next.js) để:
 * - Chuyển JPG/PNG → WebP (chất lượng cao, dung lượng nhỏ hơn ~30-70%)
 * - Tối ưu hóa AVIF và WebP hiện có (giảm thêm ~10-20%)
 * - Ảnh gốc được thay thế bằng phiên bản đã tối ưu
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const IMAGES_DIR = path.join(__dirname, '..', 'public', 'images');

// Cấu hình chất lượng ảnh
const CONFIG = {
  webp: { quality: 80, effort: 6 },
  avif: { quality: 60, effort: 6 },
};

const CONVERT_TO_WEBP = ['.jpg', '.jpeg', '.png'];  // Các định dạng sẽ chuyển sang WebP
const REOPTIMIZE_WEBP = ['.webp'];                   // WebP sẽ được tối ưu lại
const REOPTIMIZE_AVIF = ['.avif'];                   // AVIF sẽ được tối ưu lại
const ALL_SUPPORTED = [...CONVERT_TO_WEBP, ...REOPTIMIZE_WEBP, ...REOPTIMIZE_AVIF];

function getFiles(dir) {
  const results = [];
  const items = fs.readdirSync(dir, { withFileTypes: true });
  for (const item of items) {
    const fullPath = path.join(dir, item.name);
    if (item.isDirectory()) {
      results.push(...getFiles(fullPath));
    } else {
      const ext = path.extname(item.name).toLowerCase();
      if (ALL_SUPPORTED.includes(ext)) {
        results.push(fullPath);
      }
    }
  }
  return results;
}

function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

async function optimizeImage(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const dir = path.dirname(filePath);
  const name = path.basename(filePath, ext);

  const originalSize = fs.statSync(filePath).size;

  let outputExt;
  let pipeline = sharp(filePath);

  if (CONVERT_TO_WEBP.includes(ext)) {
    // JPG/PNG → WebP
    outputExt = '.webp';
    pipeline = pipeline.webp(CONFIG.webp);
  } else if (REOPTIMIZE_WEBP.includes(ext)) {
    // Tối ưu lại WebP
    outputExt = '.webp';
    pipeline = pipeline.webp(CONFIG.webp);
  } else if (REOPTIMIZE_AVIF.includes(ext)) {
    // Tối ưu lại AVIF
    outputExt = '.avif';
    pipeline = pipeline.avif(CONFIG.avif);
  }

  const isSameFile = outputExt === ext;
  const tempPath = path.join(dir, `__tmp_${name}${outputExt}`);
  const outputPath = path.join(dir, `${name}${outputExt}`);

  try {
    await pipeline.toFile(tempPath);

    const newSize = fs.statSync(tempPath).size;

    if (newSize >= originalSize && isSameFile) {
      // Không cải thiện được → bỏ qua
      fs.unlinkSync(tempPath);
      const relPath = path.relative(IMAGES_DIR, filePath);
      console.log(`⏭️  ${relPath} — bỏ qua (${formatBytes(originalSize)}, không giảm được)`);
      return { filePath, originalSize, newSize: originalSize, skipped: true };
    }

    // Thay file gốc bằng file đã tối ưu
    if (isSameFile) {
      fs.unlinkSync(filePath);
      fs.renameSync(tempPath, filePath);
    } else {
      fs.renameSync(tempPath, outputPath);
      // Xóa file gốc (ví dụ .jpg sau khi có .webp)
      fs.unlinkSync(filePath);
    }

    const saving = ((originalSize - newSize) / originalSize * 100).toFixed(1);
    const relOriginal = path.relative(IMAGES_DIR, filePath);
    const relOutput = path.relative(IMAGES_DIR, isSameFile ? filePath : outputPath);

    if (isSameFile) {
      console.log(`✅ ${relOriginal} — ${formatBytes(originalSize)} → ${formatBytes(newSize)} (tiết kiệm ${saving}%)`);
    } else {
      console.log(`✅ ${relOriginal} → ${relOutput} — ${formatBytes(originalSize)} → ${formatBytes(newSize)} (tiết kiệm ${saving}%)`);
    }

    return { filePath, outputPath: isSameFile ? filePath : outputPath, originalSize, newSize };
  } catch (err) {
    // Dọn dẹp temp nếu có lỗi
    if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath);
    console.error(`❌ Lỗi khi xử lý ${path.relative(IMAGES_DIR, filePath)}: ${err.message}`);
    return null;
  }
}

async function main() {
  console.log('🚀 Bắt đầu tối ưu hóa ảnh...\n');
  console.log(`📁 Thư mục: ${IMAGES_DIR}\n`);

  const files = getFiles(IMAGES_DIR);
  console.log(`📸 Tìm thấy ${files.length} file ảnh:\n`);
  files.forEach(f => console.log(`   - ${path.relative(IMAGES_DIR, f)}`));
  console.log('\n' + '─'.repeat(65));

  let totalOriginal = 0;
  let totalNew = 0;
  let successCount = 0;
  let skippedCount = 0;

  for (const file of files) {
    const result = await optimizeImage(file);
    if (result) {
      totalOriginal += result.originalSize;
      totalNew += result.newSize;
      if (result.skipped) {
        skippedCount++;
      } else {
        successCount++;
      }
    }
  }

  console.log('─'.repeat(65));
  console.log(`\n📊 Kết quả tổng hợp:`);
  console.log(`   ✅ Đã tối ưu:      ${successCount} file`);
  console.log(`   ⏭️  Bỏ qua:         ${skippedCount} file`);
  console.log(`   Dung lượng ban đầu: ${formatBytes(totalOriginal)}`);
  console.log(`   Dung lượng sau tối ưu: ${formatBytes(totalNew)}`);
  const savedBytes = totalOriginal - totalNew;
  const savedPercent = (savedBytes / totalOriginal * 100).toFixed(1);
  console.log(`   💾 Tiết kiệm:      ${formatBytes(savedBytes)} (${savedPercent}%)`);
}

main().catch(console.error);
