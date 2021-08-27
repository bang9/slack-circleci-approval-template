import { SlackAction } from "../../actions";
import circleci from "../../api/circleci.api";

export const seeWorkflowButton = (workflowId: string) => ({
    type: "button",
    text: {
        type: "plain_text",
        emoji: true,
        text: "See workflow"
    },
    action_id: SlackAction.open_workflow,
    url: circleci.openWorkflowUrl(workflowId)
});
