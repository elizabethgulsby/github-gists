export type Gist = {
    comments: number, 
    comments_url: string,
    commits_url: string,
    created_at: string,
    description: string,
    files: { [key: string]: {
        filename: string,
        language: string,
        raw_url: string,
        size: number,
        type: string
    } },
    forks_url: string,
    git_pull_url: string,
    git_push_url: string,
    html_url: string,
    id: string,
    node_id: string,
    owner: object,
    public: boolean,
    truncated: boolean,
    updated_at: string,
    url: string,
    user: string
}