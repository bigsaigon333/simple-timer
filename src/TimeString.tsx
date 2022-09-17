import { css } from "@emotion/react";

export default function TimeString({
  value,
  focused = false,
}: {
  value: string;
  focused?: boolean;
}): JSX.Element {
  const pad = "0".repeat(6 - value.length);

  const [H1, H2, M1, M2, S1, S2] = [...pad, ...value].map((char, index) => (
    <span
      css={css`
        font-size: 2rem;
        ${index < pad.length ? "color: gray;" : "color: white;"}
        ${index === 5 && focused && "border-right: 1px solid white;"}
      `}
    >
      {char}
    </span>
  ));

  return (
    <div
      css={css`
        display: inline-block;
      `}
    >
      {H1}
      {H2}
      <span
        css={css`
          margin-left: 1px;
          margin-right: 2px;
          ${value.length > 4 ? "color: white;" : "color: gray;"};
        `}
      >
        h
      </span>
      {M1}
      {M2}
      <span
        css={css`
          margin-left: 1px;
          margin-right: 2px;
          ${value.length > 2 ? "color: white;" : "color: gray;"}
        `}
      >
        m
      </span>
      {S1}
      {S2}
      <span
        css={css`
          ${!focused && "margin-left: 1px;"}
          margin-right: 2px;
          ${value.length > 0 ? "color: white;" : "color: gray;"}
        `}
      >
        s
      </span>
    </div>
  );
}
