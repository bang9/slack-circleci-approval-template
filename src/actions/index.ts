export enum SlackAction {
    open_workflow = "open_workflow",
    cancel_workflow = "cancel_workflow",
    approve_production = "approve_production"
}

type ActionPayload = { action_id: SlackAction; value: string };
type ActionHandler<T = any> = (payload: ActionPayload, originalPayload: T) => void;

class SlackActionClient<T extends { actions: ActionPayload[] }> {
    private _handlers: Record<SlackAction, ActionHandler<T>[]> = {
        [SlackAction.open_workflow]: [],
        [SlackAction.cancel_workflow]: [],
        [SlackAction.approve_production]: []
    };

    public on(action: SlackAction, handler: ActionHandler<T>) {
        this._handlers[action].push(handler);
        return this;
    }

    public process(payload: T) {
        payload.actions.forEach(actionPayload => {
            this._handlers[actionPayload.action_id].forEach(handler => {
                handler(actionPayload, payload);
            });
        });
    }
}

export default SlackActionClient;
