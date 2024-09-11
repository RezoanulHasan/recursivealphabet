import { useEffect } from "react";

const useTitle = (title: string) => {
  useEffect(() => {
    document.title = `${title}-Layouts and Tile Interaction`;
  }, [title]);
};

export default useTitle;
