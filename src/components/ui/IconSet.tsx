import React from "react";
import styled from "styled-components";

// Type
export type IconType =
  | "PROGRESS"
  | "CLOSE"
  | "CHEVRON-DOWN"
  | "TITLE"
  | "TEXT"
  | "IMG"
  | "GAP"
  | "ADD_IMG"
  | "WACKY"
  | "ARROW_BACK";

interface Props {
  type?: IconType;
}

function IconSet({ type = undefined }: Props) {
  switch (type) {
    case "PROGRESS": {
      return (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12 4.80002C8.02354 4.80002 4.79999 8.02357 4.79999 12C4.79999 15.9765 8.02354 19.2 12 19.2C12.6627 19.2 13.2 19.7373 13.2 20.4C13.2 21.0628 12.6627 21.6 12 21.6C6.69806 21.6 2.39999 17.302 2.39999 12C2.39999 6.69809 6.69806 2.40002 12 2.40002C17.3019 2.40002 21.6 6.69809 21.6 12C21.6 12.6628 21.0627 13.2 20.4 13.2C19.7373 13.2 19.2 12.6628 19.2 12C19.2 8.02357 15.9764 4.80002 12 4.80002Z"
            fill="white"
          />
        </svg>
      );
    }
    case "CLOSE": {
      return (
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10.75 9.71875C11.0312 10.0312 11.0312 10.5 10.75 10.7812C10.4375 11.0938 9.96875 11.0938 9.6875 10.7812L6 7.0625L2.28125 10.7812C1.96875 11.0938 1.5 11.0938 1.21875 10.7812C0.90625 10.5 0.90625 10.0312 1.21875 9.71875L4.9375 6L1.21875 2.28125C0.90625 1.96875 0.90625 1.5 1.21875 1.21875C1.5 0.90625 1.96875 0.90625 2.25 1.21875L6 4.96875L9.71875 1.25C10 0.9375 10.4688 0.9375 10.75 1.25C11.0625 1.53125 11.0625 2 10.75 2.3125L7.03125 6L10.75 9.71875Z"
            fill="#68778D"
          />
        </svg>
      );
    }
    case "CHEVRON-DOWN": {
      return (
        <ChevronDown>
          <svg
            width="12"
            height="7"
            viewBox="0 0 12 7"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.6875 1.49219L6.46484 6.49609C6.30078 6.63281 6.13672 6.6875 6 6.6875C5.83594 6.6875 5.67188 6.63281 5.53516 6.52344L0.285156 1.49219C0.0117188 1.24609 0.0117188 0.808594 0.257812 0.5625C0.503906 0.289062 0.941406 0.289062 1.1875 0.535156L6 5.12891L10.7852 0.535156C11.0312 0.289062 11.4688 0.289062 11.7148 0.5625C11.9609 0.808594 11.9609 1.24609 11.6875 1.49219Z"
              fill="#68778D"
            />
          </svg>
        </ChevronDown>
      );
    }
    case "TITLE": {
      return (
        <svg
          width="48"
          height="48"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M35.3637 31V25.091H29.4546V22.3637H35.3637V16.4546H38.091V22.3637H44V25.091H38.091V31H35.3637Z"
            fill="black"
          />
          <path
            d="M16.0357 36V14.9062H7V11H29V14.9062H19.9643V36H16.0357Z"
            fill="black"
          />
        </svg>
      );
    }
    case "TEXT": {
      return (
        <svg
          width="48"
          height="48"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4 36.4545L14 11H17.6364L27.6364 36.4545H24.2273L21.6364 29.6364H10L7.40909 36.4545H4ZM11.0909 26.7273H20.5455L15.9091 14.4091H15.7273L11.0909 26.7273ZM35.3636 31V25.0909H29.4545V22.3636H35.3636V16.4545H38.0909V22.3636H44V25.0909H38.0909V31H35.3636Z"
            fill="black"
          />
        </svg>
      );
    }
    case "IMG": {
      return (
        <svg
          width="48"
          height="48"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11.4 42C9.9 42 8.625 41.475 7.575 40.425C6.525 39.375 6 38.1 6 36.6V11.4C6 9.9 6.525 8.625 7.575 7.575C8.625 6.525 9.9 6 11.4 6H36.6C38.1 6 39.375 6.525 40.425 7.575C41.475 8.625 42 9.9 42 11.4V36.6C42 38.1 41.475 39.375 40.425 40.425C39.375 41.475 38.1 42 36.6 42H11.4ZM11.4 39.3H36.6C37.365 39.3 38.0063 39.0413 38.5238 38.5238C39.0413 38.0063 39.3 37.365 39.3 36.6V11.4C39.3 10.635 39.0413 9.99375 38.5238 9.47625C38.0063 8.95875 37.365 8.7 36.6 8.7H11.4C10.635 8.7 9.99375 8.95875 9.47625 9.47625C8.95875 9.99375 8.7 10.635 8.7 11.4V36.6C8.7 37.365 8.95875 38.0063 9.47625 38.5238C9.99375 39.0413 10.635 39.3 11.4 39.3ZM14.28 34.35L20.4 28.23L23.685 31.47L27.6 26.52L33.855 34.35H14.28ZM16.796 19.95C15.9287 19.95 15.1875 19.6412 14.5725 19.0235C13.9575 18.4059 13.65 17.6634 13.65 16.796C13.65 15.9287 13.9588 15.1875 14.5765 14.5725C15.1941 13.9575 15.9366 13.65 16.804 13.65C17.6713 13.65 18.4125 13.9588 19.0275 14.5765C19.6425 15.1941 19.95 15.9366 19.95 16.804C19.95 17.6713 19.6412 18.4125 19.0235 19.0275C18.4059 19.6425 17.6634 19.95 16.796 19.95Z"
            fill="black"
          />
        </svg>
      );
    }
    case "GAP": {
      return (
        <svg
          width="48"
          height="48"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6 40V37H42V40H6ZM6 11V8H42V11H6ZM9 31.45C8.2 31.45 7.5 31.15 6.9 30.55C6.3 29.95 6 29.25 6 28.45V19.55C6 18.75 6.3 18.05 6.9 17.45C7.5 16.85 8.2 16.55 9 16.55H39C39.8 16.55 40.5 16.85 41.1 17.45C41.7 18.05 42 18.75 42 19.55V28.45C42 29.25 41.7 29.95 41.1 30.55C40.5 31.15 39.8 31.45 39 31.45H9ZM9 28.45H39V19.55H9V28.45Z"
            fill="black"
          />
        </svg>
      );
    }
    case "ADD_IMG": {
      return (
        <svg
          width="48"
          height="48"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9 42C8.175 42 7.46875 41.7063 6.88125 41.1188C6.29375 40.5313 6 39.825 6 39V9C6 8.175 6.29375 7.46875 6.88125 6.88125C7.46875 6.29375 8.175 6 9 6H29.45V9H9V39H39V18.6H42V39C42 39.825 41.7063 40.5313 41.1188 41.1188C40.5313 41.7063 39.825 42 39 42H9ZM35 17.1V13.05H30.95V10.05H35V6H38V10.05H42.05V13.05H38V17.1H35ZM12 33.9H36L28.8 24.3L22.45 32.65L17.75 26.45L12 33.9Z"
            fill="black"
          />
        </svg>
      );
    }
    case "ARROW_BACK": {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24"
          viewBox="0 -960 960 960"
          width="24"
        >
          <path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z" />
        </svg>
      );
    }
    case "WACKY": {
      return (
        <svg
          width="72"
          height="14"
          viewBox="0 0 72 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M19.11 0L13.5886 11.3861L11.473 7.04238L14.8636 0H12.9672L10.5209 5.08153L8.06156 0H6.17901L9.56162 7.04238L7.44473 11.3961L1.91135 0H0L6.79584 13.9985L8.09144 14L10.5166 9.0103L12.9384 14L14.234 13.9985L21 0H19.11Z"
            fill="#161616"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M22.7619 8.60549L25.5007 3.43477L28.2317 8.60549H22.7619ZM24.8427 1L18 14H19.915L21.8947 10.2486H29.0987L31.0773 14H33L26.1496 1H24.8427Z"
            fill="#161616"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M40.075 1.72094C41.3704 1.72094 42.6507 2.24648 43.8813 3.28542L44.2585 3.60396L45.4542 2.44152L45.0843 2.0585C43.7632 0.692868 42.0778 0 40.075 0C38.1315 0 36.4472 0.690332 35.0722 2.04981C33.6977 3.4111 33 5.07626 33 7.00129C33 8.9247 33.6977 10.5899 35.0722 11.9495C36.4461 13.3097 38.1295 14.0001 40.075 14.0001C42.0785 14.0001 43.764 13.3063 45.0843 11.9406L45.4542 11.5584L44.2585 10.3955L43.8813 10.7145C42.6496 11.7534 41.3704 12.2797 40.075 12.2797C38.585 12.2797 37.348 11.7735 36.2934 10.7335C35.2411 9.69236 34.7284 8.47124 34.7284 7.00129C34.7284 5.52972 35.2411 4.30878 36.2934 3.2664C37.348 2.22656 38.585 1.72094 40.075 1.72094"
            fill="#161616"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M57.9939 0.147458L58.0045 0.13623H55.4853L49.8331 5.74799V0.13623H48.1035V13.7592H49.8331V8.26303L55.4053 13.7592H57.9277L50.9868 6.99989L57.9939 0.147458Z"
            fill="#161616"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M59.1914 0.147461L64.7997 7.29236V13.6817H66.5296V7.29381L71.9997 0.154886H69.9684L65.6582 5.59967L61.3452 0.147461H59.1914Z"
            fill="#161616"
          />
        </svg>
      );
    }
    default: {
      return <></>;
    }
  }
}

export default React.memo(IconSet);

const ChevronDown = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
`;
