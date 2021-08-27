import axios from "axios";

const slack = {
    async requestMessage(template: any, responseUrl?: string) {
        const url = responseUrl ?? process.env.SLACK_HOOK_URL;
        await axios.post(url, template);
    }
};

export default slack;
