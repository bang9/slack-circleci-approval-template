export const buildInfoSection = (branch: string, version: string) => ({
    type: "section",
    fields: [
        {
            type: "mrkdwn",
            text: `*Branch:* ${branch}`
        },
        {
            type: "mrkdwn",
            text: `*Version:* ${version}`
        }
    ]
});
