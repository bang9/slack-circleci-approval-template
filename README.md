## Environment variable setup
Environment variables are required for Network request.

CircleCI token - https://app.circleci.com/settings/user/tokens<br/>
Slack Incoming hook url - https://api.slack.com/messaging/webhooks#posting_with_webhooks

```dotenv
SLACK_HOOK_URL=
CIRCLECI_TOKEN=
APPROVAL_JOB_NAME=
```


## Feature

### Support approve job and cancel workflow in slack
<img src="images/1.png" width="400" height="auto" >

### Tracking user who performed actions
<img src="images/2.png" width="400" height="auto" >

## How to use this template
1. Slack)     Create your slack app that supports incoming webhooks and interactive components
2. Slack)     Get Slack incoming webhook url
3. CircleCI)  Get CircleCI personal token
4. YourApp)   Add Environment variable that `SLACK_HOOK_URL`, `CIRCLECI_TOKEN` and serve your app
5. CircleCI)  Add Environment variable that `SLACK_ACTION_URL` from step 4
6. Slack)     Add url to interactivty request url from step 4
7. CircleCI)  Add `send-slack-message` job
    ```yaml
      send-slack-message:
        working_directory: ~/project
        docker:
          - image: circleci/node:latest
        steps:
          - checkout
          - run:
              name: "Setup environment variable"
              command: echo export APP_VERSION=$(node -e "console.log(require('./package.json').version)") >> $BASH_ENV
          - run:
              name: "Request message"
              command: |
                curl -d version=$APP_VERSION \
                  -d workflowId=$CIRCLE_WORKFLOW_ID \
                  -d branch=$CIRCLE_BRANCH \
                  $SLACK_ACTION_URL/circleci/react-native \
    ```
8. YourApp)   Add Environment variable that `APPROVAL_JOB_NAME`
9. CircleCI)  Add approval job same with `APPROVAL_JOB_NAME`
