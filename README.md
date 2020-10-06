# Server for custom slack command: /lunch
- /lunch [음식점]을 슬랙에서 실행 -> 요기요에 등록된 음식점의 메뉴를 크롤링하여 투표 생성

# Showcase
![showcase](./img/showcase.gif)

# Requirements
- slack/apps/lunch -> Features -> OAuth & Permissions -> Scopes -> chat:write & commands
- slack/apps/lunch -> Features -> Interactivity & Shortcuts -> On
- slack/apps/lunch -> Features -> Slack Commands -> add /lunch

# Environment Variables (Should be set on Azure function environment var)
- SLACK_BOT_TOKEN: slack/apps/lunch -> Features -> OAuth & Permissions
