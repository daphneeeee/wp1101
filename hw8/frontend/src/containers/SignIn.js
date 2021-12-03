import { Input } from "antd";
import { UserOutlined } from "@ant-design/icons";
import Title from "../components/Title";

const SignIn = ({ me, setMe, setSignedIn, displayStatus }) => {
  return (
    <>
      <Title style={{ marginTop: 120 }}>
        <h1>My Chat Room</h1>
      </Title>
      <Input.Search
        prefix={<UserOutlined />}
        value={me}
        enterButton="Sign In"
        onChange={(e) => setMe(e.target.value)}
        placeholder="Enter your name"
        size="large"
        style={{ width: 300, marginTop: 50, marginLeft: "39%" }}
        onSearch={(name) => {
          if (!name)
            displayStatus({
              type: "error",
              msg: "Missing user name",
            });
          else setSignedIn(true);
        }}
      />
    </>
  );
};
export default SignIn;
