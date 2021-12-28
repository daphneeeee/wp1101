import { Input } from "antd";
import { UserOutlined } from "@ant-design/icons";
import Title from "../components/Title";

const SignIn = ({ me, setMe, setSignedIn, displayStatus }) => {
  return (
    <>
      <Title>
        <h1>My Chat Room</h1>
      </Title>
      <Input.Search
        prefix={<UserOutlined />}
        value={me}
        placeholder="Enter your name"
        enterButton="Sign In"
        size="large"
        onChange={(e) => setMe(e.target.value)}
        style={{ width: 300, marginTop: 20 }}
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
