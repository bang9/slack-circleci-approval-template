export const prodApproveMsgSection = (userId: string) => ({
    type: "section",
    text: {
        type: "mrkdwn",
        text: `<@${userId}> 님이 프로덕션 배포를 허가했습니다.`
    }
});
