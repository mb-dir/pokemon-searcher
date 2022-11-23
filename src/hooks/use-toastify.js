import { useState } from "react";

export const useToastify = () => {
  const [ isToastifyOpen, setIsToastifyOpen ] = useState(false);

  const close = () => setIsToastifyOpen(false);
  const open = () => setIsToastifyOpen(true);

  return [ isToastifyOpen, open, close ];
};
