let baseUrl = "http://test.ihappygroup.net"; //这里是一个默认的url，可以没有
switch (process.env.NODE_ENV) {
  case "development":
    baseUrl = "http://test.ihappygroup.net"; //这里是本地的请求url
    break;
  case "uat":
    baseUrl = "http://test2.ihappygroup.net"; //予发布url
    break;
  case "production":
    baseUrl = "http://scm.ihappygroup.net"; //生产环境url
    break;
}
export default baseUrl;
