import { Typography } from "@mui/joy";
import { useSpring, animated, config } from "@react-spring/web";
import { useAppDispatch, useAppSelector } from "../store/store";
import { setLoading } from "../store/appSlice";
import { toast } from "react-toastify";
import { useEffect } from "react";

interface IHB {
  src: string;
  alt?: string;
  delay?: number;
  disableAnimation?: boolean;
}

export default function AppLogo() {
  const { Loading } = useAppSelector((state) => state.app);
  const dispatch = useAppDispatch();
  const HeartbeatAnimation = ({
    src,
    alt = "App Logo",
    delay = 5000,
    disableAnimation = false,
  }: IHB) => {
    const { scale } = useSpring({
      immediate: disableAnimation,
      from: { scale: 1 },
      to: { scale: 1.1 },
      config: config.molasses,
      loop: true,
      delay: delay,
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
          top: -8,
          left: 2,
          fontFamily: "Rockybilly",
          transform: scale.to((s) => `scale(${s})`),
        }}
      />
    );
  };

  useEffect(() => {
    if (Loading) {
      setTimeout(() => {
        dispatch(setLoading(!Loading));
      }, 5000);
    }
  }, [Loading, dispatch]);

  return (
    <>
      <Typography
        level="h4"
        component="div"
        onDoubleClick={() => {
          if (!Loading) {
            toast.success("Thank you for choosing MemoMeta, Happy learning");
            dispatch(setLoading(true));
          }
        }}
        sx={(theme) => ({
          position: "relative",
          top: "5px",
          fontFamily: "Rockybilly",
          fontSize: "14px",
          flexGrow: 1,
          color: `${theme.palette.text.primary}`,
        })}
      >
        Mind
        <HeartbeatAnimation src={"../logo2.png"} alt={"App Logo"} />
        Meta
      </Typography>
    </>
  );
}
