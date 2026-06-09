"use client";
import React, { useRef, useMemo } from "react";
import { useScroll, useTransform, motion, MotionValue } from "framer-motion";

export const ContainerScroll = ({
  titleComponent,
  children,
}: {
  titleComponent: string | React.ReactNode;
  children: React.ReactNode;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const scaleDimensions = useMemo(
    () => (isMobile ? [0.7, 0.9] : [1.05, 1]),
    [isMobile]
  );

  const rotate = useTransform(scrollYProgress, [0, 1], [20, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], scaleDimensions);
  const translate = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <div
      className="h-[50rem] md:h-[65rem] flex items-center justify-center relative p-2 md:p-20"
      ref={containerRef}
    >
      <div
        className="py-10 md:py-20 w-full relative"
        style={isMobile ? undefined : { perspective: "1000px" }}
      >
        <Header
          translate={isMobile ? null : translate}
          titleComponent={titleComponent}
        />
        <Card
          rotate={isMobile ? null : rotate}
          translate={isMobile ? null : translate}
          scale={isMobile ? null : scale}
        >
          {children}
        </Card>
      </div>
    </div>
  );
};

export const Header = ({
  translate,
  titleComponent,
}: {
  translate: MotionValue<number> | null;
  titleComponent: React.ReactNode;
}) => {
  if (!translate) {
    return (
      <div className="max-w-5xl mx-auto text-center">
        {titleComponent}
      </div>
    );
  }
  return (
    <motion.div
      style={{ translateY: translate }}
      className="max-w-5xl mx-auto text-center"
    >
      {titleComponent}
    </motion.div>
  );
};

export const Card = ({
  rotate,
  scale,
  children,
}: {
  rotate: MotionValue<number> | null;
  scale: MotionValue<number> | null;
  translate: MotionValue<number> | null;
  children: React.ReactNode;
}) => {
  const sharedClass =
    "max-w-5xl mx-auto h-[30rem] md:h-[40rem] w-full border-4 border-[#6C6C6C] p-2 md:p-6 bg-[#222222] rounded-[30px]";
  const inner = (
    <div className="h-full w-full overflow-hidden rounded-2xl bg-[hsl(240_14%_5%)]">
      {children}
    </div>
  );

  if (!rotate || !scale) {
    return <div className={`${sharedClass} mt-6`}>{inner}</div>;
  }

  return (
    <motion.div
      style={{ rotateX: rotate, scale }}
      className={`${sharedClass} -mt-12`}
    >
      {inner}
    </motion.div>
  );
};
