import { SlackAction } from "../../actions";

export const cancelWorkflowButton = (workflowId: string) => ({
    type: "button",
    text: {
        type: "plain_text",
        emoji: true,
        text: "Cancel"
    },
    style: "danger",
    action_id: SlackAction.cancel_workflow,
    value: workflowId
});
