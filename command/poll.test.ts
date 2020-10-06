import { makePoll } from "./poll";

test("makePoll makes slack payload when receiving title and menus", () => {
  const title = "점심은 무엇을 드실건가요?";
  const menus = [
    { name: "부대찌개", price: "10000" },
    { name: "햄버거", price: "20000" },
  ];
  const expected = [
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: title,
      },
    },
    { type: "divider" },
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: "부대찌개 - 10000",
      },
      accessory: {
        type: "button",
        text: { type: "plain_text", text: "Vote" },
        value: "부대찌개",
        action_id: "button_click",
      },
    },
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: "햄버거 - 20000",
      },
      accessory: {
        type: "button",
        text: { type: "plain_text", text: "Vote" },
        value: "햄버거",
        action_id: "button_click",
      },
    },
  ];

  expect(makePoll(title, menus)).toStrictEqual(expected);
});
