import { getRestaurantMenus } from "../command/crawl";
import { Menu } from "../command/poll";

// This is very fragile test depending real restaurant menus
test(
  "getRestaurantMenus return menus having name and price",
  async () => {
    const expected = [
      {
        name: "떡 추가",
        price: "1500",
      },
      {
        name: "무 추가",
        price: "500",
      },
      {
        name: "뼈 소금구이치킨",
        price: "17000",
      },
      {
        name: "뼈 양념치킨（매운맛）",
        price: "18000",
      },
      {
        name: "뼈 양념치킨（보통맛）",
        price: "18000",
      },
      {
        name: "뼈 양념치킨（순한맛）",
        price: "18000",
      },
      {
        name: "순살소금구이치킨",
        price: "19000",
      },
      {
        name: "순살양념（매운맛）",
        price: "20000",
      },
      {
        name: "순살양념（보통맛）",
        price: "20000",
      },
      {
        name: "순살양념（순한맛）",
        price: "20000",
      },
      {
        name: "음료 대 변경",
        price: "1500",
      },
      {
        name: "즉석밥 추가",
        price: "1500",
      },
      {
        name: "햇반",
        price: "1500",
      },
    ];

    const puppeteer = require("puppeteer");
    const browser = await puppeteer.launch({ args: ["--no-sandbox"] });
    try {
      const result = await getRestaurantMenus(browser, "지코바치킨-서초1호점");
      expect(result).toStrictEqual(expected);
    } finally {
      await browser.close();
    }
  },
  30 * 1000 // Timeout 30 seconds
);
