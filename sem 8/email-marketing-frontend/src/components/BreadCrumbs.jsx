import React from "react";
import { Link } from "react-router-dom";

const BreadCrumbs = ({ items, currentPageIdx }) => {
  console.log(items);
  return (
    <ol className="breadcrumbs flex text-xs text-gray-600">
      {items.map((item, index) => (
        <li
          className={`${
            currentPageIdx >= index
              ? "text-black font-medium"
              : "cursor-not-allowed"
          }`}
        >
          {
            <Link
              to={item.href}
              className={`${
                currentPageIdx >= index
                  ? "text-black font-medium"
                  : "cursor-not-allowed"
              }`}
            >
              {item.label}
            </Link>
          }
          {index != items.length - 1 && (
            <i class="ri-arrow-right-s-line mx-1"></i>
          )}
        </li>
      ))}
    </ol>
  );
};

export default BreadCrumbs;
