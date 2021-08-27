import { SlackAction } from "../actions";

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            SLACK_HOOK_URL: string;
            CIRCLECI_TOKEN: string;
            APPROVAL_JOB_NAME: string;
        }
    }
}

export interface SlackMessagePayload {
    type: "block_actions";
    api_app_id: string;
    token: string;
    container: {
        type: string;
        message_ts: string;
        channel_id: string;
        is_ephemeral: boolean;
    };
    team: { id: string; domain: string };
    enterprise: null | any;
    is_enterprise_install: boolean;
    message: {
        type: string;
        subtype: string;
        text: string;
        ts: string;
        bot_id: string;
        blocks: any[];
    };
    state: { values: {} };
    trigger_id: string;
    response_url: string;
    actions: [
        {
            block_id: string;
            text: any[];
            action_ts: string;
            type: string;
            action_id: SlackAction;
            value: string;
        }
    ];
    channel: { id: string; name: string };
    user: {
        id: string;
        username: string;
        name: string;
        team_id: string;
    };
}
