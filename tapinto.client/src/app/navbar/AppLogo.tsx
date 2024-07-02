import { Typography } from "@mui/joy";
import { useSpring, animated, config } from "@react-spring/web";

interface IHB {
  src: string;
  alt?: string;
  disableAnimation?: boolean;
}

export default function AppLogo() {
  const HeartbeatAnimation = ({
    src,
    alt = "App Logo",
    disableAnimation = false,
  }: IHB) => {
    const { scale } = useSpring({
      immediate: disableAnimation,
      from: { scale: 1 },
      to: { scale: 1.2 },
      config: config.molasses,
      loop: true,
      delay: 2000,
    });
    return (
      <animated.img
        src={src}
        alt={alt}
        style={{
          zIndex: 10,
          fill: "ButtonHighlight",
          position: "relative",
          height: 40,
          width: 40,
          top: -4,
          fontFamily: "AsahinaSans",
          transform: scale.to((s) => `scale(${s})`),
        }}
      />
    );
  };

  return (
    <>
      <Typography
        level="h4"
        fontFamily={"Asahina Sans"}
        component="div"
        sx={(theme) => ({
          flexGrow: 1,
          color: `${theme.palette.text.primary}`,
        })}
      >
        MEMO
        <HeartbeatAnimation src={"../logo2.png"} alt={"App Logo"} />
        META
      </Typography>
    </>
  );
}
