import React from "react";
type IconProps = React.HTMLAttributes<SVGElement>;
const AppLogo = (props: IconProps) => {
  return (
    <>
      <svg
        {...props}
        width="62"
        height="62"
        viewBox="0 0 400 400"
        fill="none"
        preserveAspectRatio="xMidYMid meet"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g
          transform="translate(0.000000,400.000000) scale(0.100000,-0.100000)"
          fill="#000000"
          stroke="none"
        >
          <path
            d="M0 2000 l0 -2000 2000 0 2000 0 0 2000 0 2000 -2000 0 -2000 0 0
        -2000z m1941 730 c25 -26 47 -40 64 -40 17 0 39 14 64 40 35 37 81 54 81
        30 0 -5 -9 -10 -19 -10 -10 0 -34 -14 -52 -31 -29 -27 -31 -32 -16 -40 23
        -14 47 -62 47 -97 0 -16 -9 -41 -20 -55 l-20 -25 26 -17 26 -17 -38 -39
        c-33 -34 -44 -39 -84 -39 -40 0 -51 5 -84 39 l-38 39 31 16 31 16 -21 40
        c-25 47 -19 87 16 120 22 21 23 24 8 46 -8 13 -30 29 -49 36 -38 14 -45 28
        -12 28 12 0 38 -17 59 -40z m-244 -131 c46 -22 232 -193 222 -204 -14 -13
        -197 -37 -266 -33 -62 3 -76 7 -110 34 -46 38 -60 83 -41 139 26 78 110 105
        195 64z m768 -9 c53 -50 57 -136 7 -183 -37 -36 -73 -47 -146 -47 -63 0 -235
        26 -246 37 -9 9 180 181 224 203 54 27 126 23 161 -10z m-307 -234 c74 -11
        67 -34 -18 -64 -55 -20 -79 -23 -155 -19 -153 7 -246 66 -133 84 62 10 233
        9 306 -1z m-153 -120 c78 0 111 5 153 21 28 12 52 19 52 17 0 -3 -6 -20 -14
        -38 -12 -28 -22 -35 -73 -49 -73 -21 -160 -22 -232 -2 -61 16 -77 28 -86 67
        l-7 27 54 -22 c42 -16 74 -21 153 -21z m-38 -102 c32 -3 85 -1 117 5 33 6 61
        9 63 7 2 -2 -10 -17 -26 -35 -28 -30 -32 -31 -108 -31 -100 0 -116 5 -138 42
        l-18 31 26 -7 c15 -3 52 -9 84 -12z m72 -134 c-35 -44 -42 -43 -80 12 l-20 28
        66 0 66 0 -32 -40z m-1158 -191 c44 -15 43 -14 27 -38 -10 -17 -19 -19 -52
        -14 -52 8 -66 -11 -66 -94 l0 -63 51 0 c47 0 50 -2 47 -22 -3 -20 -10 -23 -50
        -26 l-48 -3 0 -155 0 -154 -30 0 -30 0 0 155 0 155 -30 0 c-25 0 -30 4 -30 25
        0 21 5 25 30 25 l30 0 0 78 c0 55 5 84 16 100 28 40 75 51 135 31z m129 -284
        l0 -285 -30 0 -30 0 0 285 0 285 30 0 30 0 0 -285z m2070 120 c0 -91 3 -165 6
        -165 4 0 35 27 71 60 58 55 68 60 109 60 l45 0 -76 -66 c-41 -36 -75 -68 -75
        -71 0 -3 38 -54 85 -114 l85 -109 -43 0 c-42 0 -43 1 -111 90 -84 110 -96 108
        -96 -11 l0 -79 -30 0 -30 0 0 285 0 285 30 0 30 0 0 -165z m-1745 -49 c19 -8
        44 -30 55 -48 22 -37 27 -107 8 -126 -8 -8 -49 -12 -120 -12 l-108 0 0 -29 c0
        -17 11 -43 27 -61 26 -32 28 -32 91 -27 35 3 69 10 75 16 7 7 14 7 24 0 65 -54
        -142 -106 -214 -53 -84 61 -98 226 -25 308 39 44 123 58 187 32z m1264 -6 c49
        -25 74 -75 79 -160 3 -53 -1 -73 -20 -109 -35 -68 -66 -86 -148 -86 -54 0 -74
        4 -97 21 -42 31 -64 77 -70 143 -8 81 28 160 84 190 50 26 122 27 172 1z m361
        -14 c0 -29 -4 -34 -31 -40 -17 -3 -44 -15 -60 -27 l-29 -20 0 -125 0 -124 -35
        0 -35 0 0 180 0 180 24 0 c19 0 26 -7 31 -30 l7 -30 31 24 c26 19 54 32 95 45
        1 1 2 -14 2 -33z m-1387 -36 c23 -33 44 -60 47 -60 3 0 23 27 45 60 37 55 43
        59 78 60 44 0 46 6 -31 -98 -61 -83 -63 -69 23 -182 62 -82 61 -80 18 -80 -35
        1 -41 5 -88 69 l-50 69 -49 -69 c-44 -62 -53 -69 -83 -69 -18 0 -33 3 -33 8 0
        4 29 46 64 94 l65 86 -60 81 c-32 45 -59 83 -59 86 0 3 16 5 35 5 31 0 39 -6
        78 -60z m321 -67 c16 -71 31 -134 35 -141 5 -8 16 17 30 65 57 197 59 203 94
        203 l32 0 33 -117 c54 -190 50 -188 86 -28 l31 140 34 3 c39 4 41 24 -21 -205
        l-41 -153 -37 0 -36 0 -39 125 c-22 69 -42 121 -46 117 -4 -4 -23 -60 -43 -125
        l-37 -118 -37 3 -37 3 -41 150 c-62 228 -60 205 -21 205 l34 0 27 -127z"
          />
          <path
            d="M1221 1546 c-24 -13 -50 -51 -51 -73 0 -10 25 -13 91 -13 l91 0 -6
        28 c-8 34 -50 72 -79 72 -12 -1 -33 -7 -46 -14z"
          />
          <path
            d="M2461 1544 c-49 -35 -66 -138 -33 -204 32 -64 104 -76 153 -24 31 33
        40 144 15 193 -26 50 -90 66 -135 35z"
          />
        </g>
      </svg>
    </>
  );
};

export default AppLogo;
