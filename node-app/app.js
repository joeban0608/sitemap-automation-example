const cheerio = require("cheerio");
const fs = require("fs");
const path = require("path");

const DOMAIN = "masaya365casino.win";

// 讀取本地的 index.html 文件
const htmlPath = path.join(__dirname, "../frontend-app/dist/index.html"); // 正確的 index.html 路徑
const html = fs.readFileSync(htmlPath, "utf-8");

// 使用 Cheerio 加載 HTML
const $ = cheerio.load(html);

// 存放 URL 的數組
let links = [];

// 抓取所有的 <a> 標籤並提取 href 屬性
$("a").each((index, element) => {
  const href = $(element).attr("href");

  // 確保 href 存在並且是相對或絕對路徑
  if (href && (href.startsWith("/") || href.startsWith("http"))) {
    links.push(href);
  }
});

// 使用 Set 去重
links = [...new Set(links)];

// 添加來自所有 .js 檔案的鏈接
const jsDirectoryPath = path.join(__dirname, "../frontend-app/dist/assets"); // 指定 js 檔案所在目錄
const jsLinks = extractLinksFromJsFiles(jsDirectoryPath, DOMAIN);
links = [...new Set([...links, ...jsLinks])]; // 合併鏈接並去重

// 過濾出包含 DOMAIN 的鏈接
links = links.filter((link) => link.includes(DOMAIN));
console.log("links", links);

// 生成 sitemap XML 結構
let sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;

const date = new Date();
// 格式化日期為 YYYY-MM-DD
const formattedDate = date.toISOString().split("T")[0];

// 將抓取到的鏈接插入到 sitemap XML 中
links.forEach((link) => {
  sitemapContent += `
  <url>
    <loc>${link}</loc>
    <lastmod>${formattedDate}</lastmod>
  </url>
  `;
});

// 關閉 urlset 標籤
sitemapContent += `</urlset>`;

// 將生成的 sitemap 寫入 sitemap.xml 文件
fs.writeFileSync("sitemap.xml", sitemapContent);

// 生成 robots.txt
const robotsTxt = `User-agent: *
Allow: /
Disallow:
Sitemap: https://${DOMAIN}/sitemap.xml
`;

fs.writeFileSync("robots.txt", robotsTxt);
console.log("Sitemap 已生成: sitemap.xml");

function extractLinksFromJsFiles(dir, domain) {
  let jsLinks = [];

  // 遞歸搜尋指定目錄下的所有 .js 文件
  function searchJsFiles(directory) {
    const files = fs.readdirSync(directory);
    files.forEach((file) => {
      const filePath = path.join(directory, file);
      if (fs.lstatSync(filePath).isDirectory()) {
        searchJsFiles(filePath);
      } else if (path.extname(file) === ".js") {
        const jsContent = fs.readFileSync(filePath, "utf-8");
        console.log("filePath", filePath);

        // 使用更具針對性的正則表達式提取子域名路徑
        const pathRegex = /\/(news|games|sports)(\/[^\s"'<>]*)?/g; // 匹配/news、/games、/sports 路径

        const matches = jsContent.match(pathRegex);
        if (matches) {
          matches.forEach((match) => {
            if (!jsLinks.includes(`https://${domain}${match}`)) {
              jsLinks.push(`https://${domain}${match}`);
            }
          });
        }
      }
    });
  }

  searchJsFiles(dir);
  return [...new Set(jsLinks)]; // 去重
}
