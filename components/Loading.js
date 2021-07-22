import { Circle } from "better-react-spinkit";

const Loading = () => {
  return (
    <center style={{ display: "grid", placeItems: "center", height: "100vh" }}>
      <img
        src="https://aspireinternetdesign.com/cms/wp-content/uploads/2014/12/benefits-of-live-chat-on-website.jpg"
        style={{ marginBottom: 10 }}
        height={200}
      />
      <Circle color="#3CBC28" size={60} />
    </center>
  );
};

export default Loading;
