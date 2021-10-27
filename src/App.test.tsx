import React from 'react';
import { shallow } from 'enzyme';
import { getGists } from './App';
import App from './App';
import { Button, Checkbox, Input } from '@mui/material';
import { GithubGist } from '../types/gist';
import { ChangeEvent } from 'react';


const mockedGithubGist: GithubGist = {
  comments: 0,
  comments_url: "https://api.github.com/gists/3a5794222d0c6164f82e03c2f932cdaf/comments",
  commits_url: "https://api.github.com/gists/3a5794222d0c6164f82e03c2f932cdaf/commits",
  created_at: "2021-09-29T14:50:21Z",
  description: "Test Gist 2",
  files:{
    "rfc.jsx": {
      filename: "rfc.jsx", 
      type: "text/plain", 
      language: "JavaScript", 
      raw_url: "https://gist.githubusercontent.com/elizabethgulsby…/5edbc0cb0d63a71668be6adfbbf20f8f3b4a224d/rfc.jsx", 
      size: 126
    },
  },
  forks_url: "https://api.github.com/gists/3a5794222d0c6164f82e03c2f932cdaf/forks",
  git_pull_url: "https://gist.github.com/3a5794222d0c6164f82e03c2f932cdaf.git",
  git_push_url: "https://gist.github.com/3a5794222d0c6164f82e03c2f932cdaf.git",
  html_url: "https://gist.github.com/3a5794222d0c6164f82e03c2f932cdaf",
  id: "3a5794222d0c6164f82e03c2f932cdaf",
  node_id: "G_kwDOAXHQeNoAIDNhNTc5NDIyMmQwYzYxNjRmODJlMDNjMmY5MzJjZGFm",
  owner: {
    login: "elizabethgulsby", 
    id: 24236152, 
    node_id: "MDQ6VXNlcjI0MjM2MTUy", 
    avatar_url: "https://avatars.githubusercontent.com/u/24236152?v=4", 
    gravatar_id: ""
  },
  public: true,
  truncated: false,
  updated_at: "2021-09-29T14:50:21Z",
  url: "https://api.github.com/gists/3a5794222d0c6164f82e03c2f932cdaf",
  user: "elizabethgulsby",
};

const fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ mockedGithubGist }),
  })
);

const mockGetGists = jest.fn();
const mockSetGists = jest.fn();

jest.spyOn(window.localStorage.__proto__, 'setItem');
window.localStorage.__proto__.setItem = jest.fn();

jest.spyOn(window.localStorage.__proto__, 'getItem');
window.localStorage.__proto__.getItem = jest.fn();

const changeEventFunction = (value: unknown = "") => ({ target: { value } } as React.ChangeEvent<HTMLInputElement>);

describe("App functionality", () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  it("should save favorited item to localStorage when checkbox is clicked", async () => {
    const wrapper = shallow(<App />);
    const button = wrapper.find(Button);
    const input = wrapper.find(Input);
    console.log(wrapper.debug());
    // input.invoke("onChange")?.(changeEventFunction("elizabethgulsby"));
    input.simulate("change",  ({ target: { id: "inputName", value: "elizabethgulsby" }} as ChangeEvent<HTMLInputElement>));
    // console.log(wrapper.debug());
    // console.log(wrapper.find(Input).props());
    expect(wrapper.find(Input).props().value).toBe("elizabethgulsby");
    // button.invoke("onClick");
    // wrapper.update();
    // console.log(wrapper.debug());
    // const checkbox = wrapper.find(Checkbox).at(1);
    // checkbox.invoke("onClick");
    // const gists = await getGists("elizabethgulsby", mockGetGists);
    // expect(gists).toEqual(mockedGithubGist);
    // expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    // expect(localStorage.getItem).toHaveLength(1);
  });

  it("should remove favorited item from localStorage when checkbox is un-clicked", async () => {
    const wrapper = shallow(<App />);
    const gists = await getGists("elizabethgulsby", mockSetGists);
    const checkbox = wrapper.find(Checkbox);
    // button.invoke("onClick");
    // wrapper.update();
    // console.log(wrapper.debug());
    // const checkbox = wrapper.find(Checkbox).at(1);
    // checkbox.invoke("onClick");
    // const gists = await getGists("elizabethgulsby", mockGetGists);
    // expect(gists).toEqual(mockedGithubGist);
    // expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    // expect(localStorage.getItem).toHaveLength(0);
  });
});
