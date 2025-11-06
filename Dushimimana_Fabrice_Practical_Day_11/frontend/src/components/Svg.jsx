/* eslint-disable */

function Svg({ type, onClick }) {
  return (
    <div className="svg" onClick={onClick}>
      {type === "password" ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24"
          height="24"
          aria-hidden="true"
        >
          <path fill="none" d="M0 0h24v24H0z" />
          <path
            d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z"
            stroke="currentColor"
            strokeWidth="1.6"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle
            cx="12"
            cy="12"
            r="3"
            stroke="currentColor"
            strokeWidth="1.6"
            fill="none"
          />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24"
          height="24"
          aria-hidden="true"
        >
          <path fill="none" d="M0 0h24v24H0z" />
          <path
            d="M2 2l20 20"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          <path
            d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z"
            stroke="currentColor"
            strokeWidth="1.6"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle
            cx="12"
            cy="12"
            r="3"
            stroke="currentColor"
            strokeWidth="1.6"
            fill="none"
          />
        </svg>
      )}
    </div>
  );
}

export default Svg;
