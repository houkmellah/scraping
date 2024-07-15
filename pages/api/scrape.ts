import puppeteer from "puppeteer";

const fetchData = async ({
  url,
  elementSelector,
}: {
  url: string;
  elementSelector: string;
}) => {
  let browser;
  try {
    browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    const page = await browser.newPage();

    await page.setRequestInterception(true);
    page.on("request", (request) => {
      if (["image", "stylesheet", "font"].includes(request.resourceType()))
        request.abort();
      else request.continue();
    });

    await page.goto(url, { timeout: 1000000, waitUntil: "networkidle0" });

    const navItems = await page.evaluate((selector) => {
      const navElement = document.querySelector(selector);
      if (!navElement) return [];
      const liElements = navElement.querySelectorAll("li");
      return Array.from(liElements).map((li) => ({
        text: li.textContent?.trim() || "",
        href: li.querySelector("a")?.href || null,
      }));
    }, elementSelector);

    return navItems;
  } catch (error) {
    console.error("Error in fetchData:", error);
    throw error;
  } finally {
    if (browser) await browser.close();
  }
};

export default async function handler(req: any, res: any) {
  const url = "http://www.prenom-marocain.com/";
  try {
    const allArticles = await fetchData({
      url: url,
      elementSelector: ".page-nav",
    });
    if (allArticles.length) {
      allArticles.map(async (article: any) => {
        if (article.href) {
          const data = await fetchData({
            url: article.href,
            elementSelector: ".two-thirds",
          });
          console.log("Data ====>", data);
        }
      });
    }
    res.status(200).json({ result: allArticles });
  } catch (error) {
    console.error("Error to fetch data ====>", error);
    res.status(500).json({ error: "An error occurred while scraping data" });
  }
}
