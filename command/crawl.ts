import { Menu } from "./poll";

const getRestaurantMenus = async (browser, name): Promise<Menu[]> => {
  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });
  await submitAddress(page);
  await submitRestaurant(page, name);
  return await getMenus(page);
};

// This is just to get a restaurant search button
const submitAddress = async (page) => {
  await page.goto("https://www.yogiyo.co.kr/mobile/#/");
  await page.type(
    '[name="address_input"]',
    "서울특별시 서초구 서초동 1337-4 경농사옥"
  );
  await Promise.all([
    page.waitForResponse(
      (response) =>
        response.url().includes("/api/v1/restaurants-geo") && response.ok(),
      { timeout: 10 * 1000 }
    ),
    page.click("#button_search_address > button.btn.btn-default.ico-pick"),
  ]);
};

const submitRestaurant = async (page, name) => {
  await page.click("#category > ul > li.hidden-xs.menu-search > a");
  await page.type('[name="category_keyword"]', name);
  await Promise.all([
    page.waitForNavigation({ waitUntil: "networkidle0" }),
    page.click('[id="category_search_button"]'),
  ]);
};

const getMenus = async (page): Promise<Menu[]> => {
  const [response] = await Promise.all([
    page.waitForResponse(
      (response) => response.url().includes("/menu") && response.ok(),
      { timeout: 10 * 1000 }
    ),
    page.click("#content > div > div:nth-child(5) > div > div > div > div"),
  ]);

  const menus: Menu[] = (await response.json()).flatMap((d) =>
    d.items.map((i) => <Menu>{ name: i.name, price: i.price })
  );

  const uniqueMenus = menus.filter(
    (v, i, a) => a.findIndex((t) => t.name === v.name) === i
  );

  const sortedMenusByName = uniqueMenus.sort((x, y) => {
    return x.name < y.name ? -1 : x.name > y.name ? 1 : 0;
  });

  return sortedMenusByName;
};

export { getRestaurantMenus };
