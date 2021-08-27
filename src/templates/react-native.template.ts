import { seeWorkflowButton } from "./buttons";
import { cancelWorkflowButton } from "./buttons";
import { approveProductionButton } from "./buttons";
import { buildInfoSection } from "./sections";
import { dividerSection } from "./sections";
import { buttonGroupActions } from "./actions/button-group.actions";
import { reactNativeHeaders } from "./headers/react-native.headers";

type Options = {
    branch: string;
    version: string;
    workflowId: string;
};

const reactNativeTemplate = ({ branch, version, workflowId }: Options) => ({
    blocks: [
        reactNativeHeaders(),
        buildInfoSection(branch, version),
        dividerSection(),
        buttonGroupActions(
            approveProductionButton(workflowId),
            seeWorkflowButton(workflowId),
            cancelWorkflowButton(workflowId)
        )
    ]
});

export default reactNativeTemplate;
