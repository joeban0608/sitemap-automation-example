const cheerio = require("cheerio");
const fs = require("fs");

const DOMAIN = "masaya365casino.win";
// 讀取本地的 index.html 文件
const html = fs.readFileSync(
  "Masaya365_game_app_0904_1847/index.html",
  "utf-8"
);

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

const robotsTxt = `User-agent: *
Allow: /
Disallow:
Sitemap: https://${DOMAIN}/sitemap.xml
`;

fs.writeFileSync("robots.txt", robotsTxt);
console.log("Sitemap 已生成: sitemap.xml");
