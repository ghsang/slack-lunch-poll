import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import axios from "axios";
import * as querystring from "querystring";
import { getRestaurantMenus } from "./crawl";
import { chunk } from "./util";
import { makePoll, Menu } from "./poll";

const api = axios.create({
  timeout: 5000, // timeout 5초
  headers: { Authorization: `Bearer ${process.env.SLACK_BOT_TOKEN}` },
});

const postMessage = async (body, text: string) => {
  await api.post(body.response_url as string, {
    token: body.token,
    channel: body.channel_id,
    text: text,
  });
};

const postPoll = async (body, blocks) => {
  await api.post("https://slack.com/api/chat.postMessage", {
    token: body.token,
    channel: body.channel_id,
    blocks: blocks,
    response_type: "in_channel",
  });
};

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  // Ack
  context.res = {};
  context.done();

  const body = querystring.decode(req.body);
  console.log(body);

  const restaurantName = (body.text as string).trim();

  const puppeteer = require("puppeteer");
  const browser = await puppeteer.launch({ args: ["--no-sandbox"] });

  try {
    const menus = await getRestaurantMenus(browser, restaurantName);
    console.log(menus);
    postPollPages(body, menus);
  } catch (err) {
    await postMessage(
      body,
      "메뉴를 불러오는데 실패했습니다. 음식점 이름을 확인해주세요."
    );
    console.error(err);
  } finally {
    await browser.close();
  }
};

const postPollPages = async (body, menus: Menu[]) => {
  // slack block has limit 50
  const chunkedMenus = chunk(menus, 40);

  const numPages = chunkedMenus.length;

  for (const [idx, elems] of chunkedMenus.entries()) {
    await postPoll(
      body,
      makePoll(`오늘 점심은? (${idx + 1}/${numPages})`, elems)
    );

    // sleep to keep page ordering
    await new Promise((r) => setTimeout(r, 1000));
  }
};

export default httpTrigger;
