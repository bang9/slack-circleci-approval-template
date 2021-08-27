import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

interface CircleClient extends AxiosInstance {
    getUri(config?: AxiosRequestConfig): string;
    request<T>(config: AxiosRequestConfig): Promise<T>;
    get<T>(url: string, config?: AxiosRequestConfig): Promise<T>;
    delete<T>(url: string, config?: AxiosRequestConfig): Promise<T>;
    head<T>(url: string, config?: AxiosRequestConfig): Promise<T>;
    options<T>(url: string, config?: AxiosRequestConfig): Promise<T>;
    post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
    put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
    patch<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
}

const client: CircleClient = axios.create({
    baseURL: "https://circleci.com/api/v2",
    headers: {
        Accept: "application/json",
        "Circle-Token": process.env.CIRCLECI_TOKEN
    }
});

client.interceptors.response.use(res => res.data);

const circleci = {
    async approveJob(workflowId: string, approvalJobName: string): Promise<{ message: string }> {
        const { items } = await client.get(`/workflow/${workflowId}/job`);
        const { id } = items.find((job: any) => job.name === approvalJobName);
        return client.post(`/workflow/${workflowId}/approve/${id}`);
    },
    async cancelWorkflow(workflowId: string): Promise<{ message: string }> {
        return client.post(`/workflow/${workflowId}/cancel`);
    },

    openWorkflowUrl(workflowId: string) {
        return `https://app.circleci.com/pipelines/workflows/${workflowId}`;
    }
};

export default circleci;
