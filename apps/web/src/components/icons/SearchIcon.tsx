export const SearchIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      aria-label={props["aria-label"]}
    >
      <path
        d="M10.331 13.669L2 22M10.6198 13.3802C8.02055 10.7809 8.02055 6.55984 10.6198 3.94946C13.2191 1.35018 17.4402 1.35018 20.0505 3.94946C22.6498 6.54874 22.6498 10.7698 20.0505 13.3802C17.4513 15.9794 13.2302 15.9794 10.6198 13.3802Z"
        stroke={props.fill}
        stroke-width="2.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};
