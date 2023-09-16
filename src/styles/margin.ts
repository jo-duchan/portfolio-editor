import { MarginSize } from "type/option";

function marginStylePC(size: MarginSize) {
  switch (size) {
    case "NONE": {
      return "0";
    }
    case "XS": {
      return "84px";
    }
    case "S": {
      return "156px";
    }
    case "M": {
      return "228px";
    }
    case "L": {
      return "300px";
    }
    case "XL": {
      return "360px";
    }
    default: {
      return "0";
    }
  }
}

export { marginStylePC };
