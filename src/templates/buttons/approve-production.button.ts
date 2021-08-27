import { SlackAction } from "../../actions";

export const approveProductionButton = (workflowId: string) => ({
    type: "button",
    text: {
        type: "plain_text",
        emoji: true,
        text: "Approve production"
    },
    style: "primary",
    action_id: SlackAction.approve_production,
    value: workflowId
});
