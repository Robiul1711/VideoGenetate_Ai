import { useEffect, useState } from "react";

// framer motion
import { motion } from "framer-motion";

// react icons
import { CiSearch } from "react-icons/ci";

const AnimatePlaceholder = ({
  placeholders,
  searchValue,
  setSearchValue,
  className,
}) => {
  const [placeholderText, setPlaceholderText] = useState("");
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isFoucsed, setIsFocused] = useState(false);

  useEffect(() => {
    if (searchValue) return;
    const currentText = placeholders[placeholderIndex];
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (charIndex < currentText.length) {
            setPlaceholderText(currentText.substring(0, charIndex + 1));
            setCharIndex(charIndex + 1);
          } else {
            setTimeout(() => setIsDeleting(true), 1500);
          }
        } else {
          if (charIndex > 0) {
            setPlaceholderText(currentText.substring(0, charIndex - 1));
            setCharIndex(charIndex - 1);
          } else {
            setIsDeleting(false);
            setPlaceholderIndex((placeholderIndex + 1) % placeholders.length);
          }
        }
      },
      isDeleting ? 50 : 100
    );
    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, placeholderIndex, searchValue, placeholders]);

  return (
    <div className="relative w-full  rounded-xl">
      {/* <CiSearch
                className="absolute left-4 top-1/2 dark:text-slate-500 transform -translate-y-1/2 text-gray-400 text-[1.5rem]"/> */}

      <textarea
        type="text"
       
        disabled
        value={searchValue}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onChange={(e) => setSearchValue(e.target.value)}
        className="w-full p-4 bg-white/10 text-white cursor-not-allowed outline-none  font-medium border border-Primary/40 rounded-xl "
        rows={5}
      />
      {!searchValue && !isFoucsed && (
        <div className="absolute left-4 top-6 transform -translate-y-1/2 pointer-events-none">
          <span className="text-Primary text-xl">{placeholderText}</span>
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.8, repeat: Infinity }}
            className="text-Primary ml-1 t"
          >
            |
          </motion.span>
        </div>
      )}
    </div>
  );
};

export default AnimatePlaceholder;
