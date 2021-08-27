export const workflowCancelMsgSection = (userId: string) => ({
    type: "section",
    text: {
        type: "mrkdwn",
        text: `<@${userId}> 님이 워크플로우를 취소하셨습니다.`
    }
});
