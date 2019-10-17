declare module '*.png' {
  const content: string;
  export default content;
}
declare var process: {
  env: {
    API_URI_AUTHORIZATION: string;
    API_URI_TOKEN: string;
    API_CLIENT_ID: string;
    API_CLIENT_SECRET: string;
  };
};
