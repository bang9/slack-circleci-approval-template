require("dotenv").config();

import Express from "express";
import morgan from "morgan";

import SlackActionClient, { SlackAction } from "./actions";
import circleci from "./api/circleci.api";
import slack from "./api/slack.api";

import reactNativeTemplate from "./templates/react-native.template";
import { buttonGroupActions } from "./templates/actions/button-group.actions";
import { cancelWorkflowButton, seeWorkflowButton } from "./templates/buttons";
import { prodApproveMsgSection, dividerSection, workflowCancelMsgSection } from "./templates/sections";
import { SlackMessagePayload } from "./types/global";

const server = Express();
const appClient = new SlackActionClient<SlackMessagePayload>();

server.use(morgan("dev"));
server.use(Express.urlencoded({ extended: true }));

/** Slack Message Sender **/
server.post("/circleci/:action", (req, res) => {
    const { action } = req.params as { action: "react-native" };

    if (action === "react-native") {
        const { workflowId, branch, version } = req.body as {
            workflowId: string;
            branch: string;
            version: string;
        };
        const template = reactNativeTemplate({ workflowId, branch, version });
        slack.requestMessage(template);
    }

    res.sendStatus(200);
});

/** Slack Message Action Handler **/
server.post("/", (req, res) => {
    const payload: SlackMessagePayload = JSON.parse(req.body?.payload);
    appClient.process(payload);
    res.sendStatus(200);
});

server.listen(8080, () => {
    appClient
        .on(SlackAction.cancel_workflow, async ({ value: workflowId }, originalPayload) => {
            await circleci.cancelWorkflow(workflowId);

            const blocks = originalPayload.message.blocks;
            blocks.splice(-2);
            blocks.push(workflowCancelMsgSection(originalPayload.user.id));
            blocks.push(dividerSection());
            blocks.push(buttonGroupActions(seeWorkflowButton(workflowId)));
            await slack.requestMessage({ blocks, replace_original: true }, originalPayload.response_url);
        })
        .on(SlackAction.approve_production, async ({ value: workflowId }, originalPayload) => {
            const approvalJobName = process.env.APPROVAL_JOB_NAME;
            await circleci.approveJob(workflowId, approvalJobName);

            const blocks = originalPayload.message.blocks;
            blocks.splice(-2);
            blocks.push(prodApproveMsgSection(originalPayload.user.id));
            blocks.push(dividerSection());
            blocks.push(buttonGroupActions(seeWorkflowButton(workflowId), cancelWorkflowButton(workflowId)));
            await slack.requestMessage({ blocks, replace_original: true }, originalPayload.response_url);
        });
});
