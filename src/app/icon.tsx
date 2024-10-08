import { ImageResponse } from "next/og";

export const runtime = "edge";

export const size = {
  width: 500,
  height: 500,
};
export const contentType = "image/svg";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fillRule="evenodd"
          strokeLinejoin="round"
          strokeMiterlimit="2"
          clipRule="evenodd"
          viewBox="0 0 500 500"
        >
          <g transform="translate(256 250) scale(8.22758) translate(-24 -24)">
            <g fillRule="nonzero">
              <path
                fill="#2859C5"
                d="M10.868 13.772a2.477 2.477 0 011.623-.223 2.49 2.49 0 011.6 1.079c.085.129.158.267.218.411a12.655 12.655 0 0011.541 7.462h3.151a2.5 2.5 0 010 5H25.85c-4.236 0-8.23-1.514-11.349-4.131v8.631a2.5 2.5 0 11-5 0V16.072a2.496 2.496 0 011.367-2.3z"
              ></path>
              <path
                fill="#8FBFFA"
                d="M12 .5c-1.542 0-2.743.031-3.671.074-2.381.112-4.384 1.724-4.645 4.261C3.577 5.876 3.5 7.237 3.5 9s.077 3.124.184 4.165c.261 2.537 2.264 4.149 4.645 4.261.928.043 2.129.074 3.671.074 1.542 0 2.743-.031 3.671-.074 2.381-.112 4.384-1.724 4.645-4.261.107-1.041.184-2.402.184-4.165s-.077-3.124-.184-4.165C20.055 2.298 18.052.686 15.671.574A79.906 79.906 0 0012 .5z"
              ></path>
              <path
                fill="#8FBFFA"
                d="M36 16.5c-1.542 0-2.743.031-3.671.074-2.381.112-4.384 1.724-4.645 4.261-.107 1.041-.184 2.402-.184 4.165s.077 3.124.184 4.165c.261 2.537 2.264 4.149 4.645 4.261.928.043 2.129.074 3.671.074 1.542 0 2.743-.031 3.671-.074 2.381-.112 4.384-1.724 4.645-4.261.107-1.041.184-2.402.184-4.165s-.077-3.124-.184-4.165c-.261-2.537-2.264-4.149-4.645-4.261A79.906 79.906 0 0036 16.5z"
              ></path>
              <path
                fill="#8FBFFA"
                d="M12 30.5c-1.542 0-2.743.031-3.671.074-2.381.112-4.384 1.724-4.645 4.261C3.577 35.876 3.5 37.237 3.5 39s.077 3.124.184 4.165c.261 2.537 2.264 4.149 4.645 4.261.928.043 2.129.074 3.671.074 1.542 0 2.743-.031 3.671-.074 2.381-.112 4.384-1.724 4.645-4.261.107-1.041.184-2.402.184-4.165s-.077-3.124-.184-4.165c-.261-2.537-2.264-4.149-4.645-4.261A79.906 79.906 0 0012 30.5z"
              ></path>
            </g>
          </g>
        </svg>
      </div>
    ),
    {
      ...size,
    }
  );
}
