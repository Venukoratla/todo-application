import { useState } from "react";

const Droparea = ({ onDrop, id }) => {
  const [showDrop, setShowDrop] = useState(false);

  return (
    <section
      onDragEnter={() => setShowDrop(true)}
      onDragLeave={() => setShowDrop(false)}
      className={showDrop ? "droparea" : "hidearea"}
      onDrop={() => {
        onDrop(id);
        setShowDrop(false);
      }}
      onDragOver={(e) => e.preventDefault()}
    >
      Drop here...
    </section>
  );
};

export default Droparea;
