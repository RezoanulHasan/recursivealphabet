import { useEffect } from "react";

const useTitle = (title: string) => {
  useEffect(() => {
    document.title = `${title}-Whiteboard App`;
  }, [title]);
};

export default useTitle;
