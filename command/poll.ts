interface Text {
  type: string;
  emoji?: boolean;
  text: string;
}

interface Accessory {
  type: string;
  text: Text;
  value: string;
}

interface Menu {
  name: string;
  price: string;
}

interface Block {
  type: string;
}

interface Header extends Block {
  text: Text;
}

interface Divider extends Block {}

interface Candidate extends Block {
  text: Text;
  accessory: Accessory;
}

const makePoll = (title: string, menus: Menu[]): Block[] => {
  return [
    makeHeader(title),
    makeDivider(),
    ...menus.map((m) => makeCandidate(m)),
  ];
};

const makeHeader = (title: string): Header => {
  return {
    type: "section",
    text: { type: "mrkdwn", text: title },
  };
};

const makeDivider = (): Divider => {
  return { type: "divider" };
};

const makeCandidate = (menu: Menu): Candidate => {
  return {
    type: "section",
    text: {
      type: "mrkdwn",
      text: `${menu.name} - ${menu.price}`,
    },
    accessory: {
      type: "button",
      text: {
        type: "plain_text",
        text: "Vote",
      },
      value: menu.name,
      action_id: "button_click",
    },
  } as Candidate;
};

export { makePoll, Menu };
