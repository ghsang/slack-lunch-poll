import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import * as querystring from "querystring";
import axios from "axios";

const api = axios.create({
  timeout: 5000, // timeout 5초
  headers: { Authorization: `Bearer ${process.env.SLACK_BOT_TOKEN}` },
});

const postMessage = async (payload, text: string) => {
  await api.post("https://slack.com/api/chat.postMessage", {
    token: payload.token,
    channel: payload.channel.id,
    thread_ts: payload.container.message_ts,
    text: text,
  });
};

const httpTrigger: AzureFunction = async (
  context: Context,
  req: HttpRequest
): Promise<void> => {
  // Ack
  context.res = {};
  context.done();

  const body = querystring.decode(req.body);
  const payload = JSON.parse(body.payload as string);
  console.log(payload);

  await postMessage(
    payload,
    // @ts-ignore
    `${payload.actions[0].value} - <@${payload.user.id}>`
  );
};

export default httpTrigger;
