import { HTMLAttributes } from "react";

const Field = (props: HTMLAttributes<HTMLDivElement>) => {
  return <div className="flex flex-col gap-1" {...props} />;
};

export default Field;